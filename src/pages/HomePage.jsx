import { useEffect, useState,useMemo } from "react";
import fetchCoins from "../services/coingecko";
import Header from "../Components/Header";
import CoinsTable from "../Components/CoinsTable";
import { useFavorites } from "../Components/FavouriteContext";

const HomePage = () => {

    const [coins,setCoins]=useState([]);
    const [error,setError]=useState(null);
    const [page, setPage] = useState(1);
    const [sortBy,setSortBy]=useState('market_cap_desc');
    const [limit,setLimit]=useState(50)
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const PAGE_SIZE=50;

    const {favs, toggle} = useFavorites();

    useEffect(()=>{
        fetchCoins({perPage:limit,order:sortBy,page}) 
        .then(setCoins)
        .catch((e)=>setError(e.message))
        
    },[limit,sortBy,page]);

    //Filter coins to showw only favorites if toggle is on
    const displayCoins=useMemo(()=>{
         let result = coins;

         // Filter by favorites
        if(showFavoritesOnly){
           result= result.filter(c =>favs.has(c.id));
        }

        //Filter by Search
        if(searchQuery.trim()){
            const needle=searchQuery.trim().toLowerCase();
            result=result.filter(c=>
                c.name.toLowerCase().includes(needle)||
                c.symbol.toLowerCase().includes(needle)
            )
        }
        return result;
    },[coins,favs,showFavoritesOnly,searchQuery])



        // Formatters - created once with useMemo
        const fmtMoney = useMemo(() => 
            new Intl.NumberFormat("en-US", { 
                style: "currency", 
                currency: "USD", 
                maximumFractionDigits: 2 
            }), []
        );
        
        const fmtNum = useMemo(() => 
            new Intl.NumberFormat("en-US", { notation: "compact" }), []
        );
        
        const fmtPct = (v) => (v == null ? "—" : `${v.toFixed(2)}%`);
        
    //Handlers
    const handleLimitChange=(n)=>{
        setLimit(n);
        setPage(1);
    }

    const handleSortingChange=(v)=>{
        setSortBy(v) 
    }
    
    const offset = (page - 1) * PAGE_SIZE;
   
  

    // Loading state
    if (!coins.length && !error) {
        return (
            <div style={{textAlign: 'center', padding: '2rem'}}>
                <p>Loading coins...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div style={{textAlign: 'center', padding: '2rem', color: 'red'}}>
                <p>Failed to load coins: {error}</p>
            </div>
        );
    }

    return ( 
        <>
        <Header 
        sortBy={sortBy}
        onSortChange={handleSortingChange}
        />
  
        {/* Controls panel */}
        <div className="container">
            <div style={{
                display:'flex',
                gap:'1rem',
                alignItems:'center',
                flexWrap:'wrap',
                padding:'1rem 0',
                borderBottom:'1px solid #e5e7eb',
                marginBottom:'1rem'
            }}>

               {/* Search */}
                    <input
                        type="search"
                        className="search__input"
                        placeholder="Search coins..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />


                     {/* Show dropdown */}
                    <div className="filter">
                        <label htmlFor="limit">Show</label>
                        <select
                            id="limit"
                            value={limit}
                            className="select"
                            onChange={(e) => handleLimitChange(Number(e.target.value))}
                        >
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="150">150</option>
                            <option value="200">200</option>
                        </select>
                    </div>

                      {/* Favorites toggle */}
                    <button 
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className="sort__select"
                        style={{
                            background: showFavoritesOnly ? '#16a34a' : '#fff',
                            color: showFavoritesOnly ? '#fff' : '#111827',
                            cursor: 'pointer',
                            border: '1px solid #e5e7eb',
                            minWidth: 'auto',
                            paddingLeft: '16px',
                            paddingRight: '16px'
                        }}
                    >
                        {showFavoritesOnly ? '★ Favorites' : '☆ All'} 
                        {favs.size > 0 && ` (${favs.size})`}
                    </button>

                    {/* Results count */}
                    <span style={{color: '#6b7280', fontSize: '0.9rem', marginLeft: 'auto'}}>
                        Showing {displayCoins.length} coins
                    </span>
                </div>
            </div>

        <CoinsTable
            coins={displayCoins}
            favs={favs}
            toggle={toggle}
            offset={offset}
            fmtMoney={fmtMoney}
            fmtNum={fmtNum}
            fmtPct={fmtPct}
        />


      

       </>
     );
}
 
export default HomePage;