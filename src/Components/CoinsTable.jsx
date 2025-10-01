const CoinsTable = ({coins,favs,toggle,offset=0,fmtMoney,fmtNum,fmtPct}) => {
    return (  
        <div className="container">

       <table className="table">
      <thead>
        <tr>
      <th className="num">#</th>
      <th className="col-asset">Coins</th>
      <th className="num">Price</th>
      <th className="num">1h</th>
      <th className="num">24h</th>
      <th className="num">7d</th>
      <th className="num">24h Vol</th>
      <th className="num">Market Cap</th>
      </tr>
      </thead>

      <tbody>
         {coins.map((c,i) => (
          <tr key={c.id}>
            <td className="num">{c.market_cap_rank || i + 1}</td>

            <td className="col-asset ">
            <div className="coin-cell">
                <button 
                className="star-btn"
                 aria-pressed={favs.has(c.id)?"true" : "false"} 
                 onClick={()=>toggle(c.id)}
                 title={favs.has(c.id) ? "Remove from favorites" : "Add to favorites"}
                 >

              <span className="star">
                {favs.has(c.id) ? '★' : '☆'}
              </span>

           </button>

                <img 
                src={c.image}
                alt={c.name}  
                className="coin-cell__img"
                loading="lazy"
                 onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
                />

                <div className="coin-cell__text">     
                <div className="coin-cell__name"> {c.name} </div>
                <div className="coin-cell__symbol">{c.symbol.toUpperCase()}</div> 
                 </div>
               </div>
          </td>

             {/* Price */}
            <td className="num">{fmtMoney.format(c.current_price)}</td>

            {/* 1h change */}
            <td className={`num change ${c.price_change_percentage_1h_in_currency >= 0 ? 'pos' : 'neg'}`}>
                {fmtPct(c.price_change_percentage_1h_in_currency)}
            </td>

            {/* 24h change */}
            <td className={`num change ${c.price_change_percentage_24h_in_currency >= 0 ? 'pos' : 'neg'}`}>
                {fmtPct(c.price_change_percentage_24h_in_currency)}
            </td>

            {/* 7d change */}
            <td  className={`num change ${c.price_change_percentage_7d_in_currency >= 0 ? 'pos' : 'neg'}`}>
                {fmtPct(c.price_change_percentage_7d_in_currency)}
            </td>

            {/* Volume */}
            <td className="num">{fmtNum.format(c.total_volume)}</td>

            {/* Market Cap */}
            <td className="num">{fmtNum.format(c.market_cap)}</td>
          </tr>

          ))}

      </tbody>
    </table>
       </div>
    );
}
 
export default CoinsTable;