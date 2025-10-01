import { useEffect, useState } from "react";
import { useFavorites } from "../Components/FavouriteContext";
import fetchCoins from "../services/coingecko";
import CoinsTable from "../Components/CoinsTable";
import { Link } from "react-router-dom";
const Portforlio = () => {
    const {favs,toggle}=useFavorites();
    const [coins,setCoins]=useState([])
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if(!favs.size){
            setCoins([]);
            return
        }
        setLoading(true); // ← Start loading
        fetchCoins({ ids: [...favs], perPage: 250, page: 1 })
        .then(setCoins)
        .catch(console.error)
    },[favs])

     // Memoized formatters
    const fmtMoney = useMemo(() => 
        new Intl.NumberFormat("en-US", {
            style: "currency", 
            currency: "USD", 
            maximumFractionDigits: 2
        }), []
    );
    
    const fmtNum = useMemo(() => 
        new Intl.NumberFormat("en-US", {notation: "compact"}), []
    );
    
    const fmtPct = (v) => (v == null ? "—" : `${v.toFixed(2)}%`);
    

    // Empty state
    if (!favs.size) {
        return (
            <div style={{textAlign: 'center', padding: '2rem'}}>
                <p>No favorites yet. Star some coins to add them here!</p>
            </div>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div style={{textAlign: 'center', padding: '2rem'}}>
                <p>Loading your favorites...</p>
            </div>
        );
    }


     

  
    return ( 
        <>
       <div className="nav">
       <div className="brand">Cryptoßuzz</div>
       </div>

      
       <CoinsTable 
        coins={coins} 
        favs={favs}
        toggle={toggle}
        fmtMoney={fmtMoney}
        fmtNum={fmtNum}
        fmtPct={fmtPct} 
            />
        </>
     );
}
 
export default Portforlio;