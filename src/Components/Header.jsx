
const Header = ({coins,sortBy,limit,onLimitChange,onSortChange}) => {
  //search function

    return (
 
         <nav className="nav">
            <div className="brand">Cryptoßuzz</div>

           <div className="controls">
            <div className="sort">
             <label htmlFor="sortBy" className="sort__label">Sort By</label>
            <select 
            id="sortBy"
            className="sort__select"
            value={sortBy}
            onChange={(e)=> onSortChange(e.target.value)}
            >

            <option value="market_cap_asc">Market Cap(Low→High)</option>
            <option value="market_cap_desc">Market Cap(High→Low)</option>
            <option value="price_asc">Price Cap(Low→High)</option>
            <option value="price_desc">Price Cap(High→Low)</option>
            <option value="volume_asc">Volume Cap(Low→High)</option>
            <option value="volume_desc">Volume Cap(High→Low)</option>
            </select>
            </div>
           
           </div>
         
           
        </nav>

      
     );
}
 
export default Header;
