const BASE_URL=import.meta.env.VITE_CG_BASE_URL;

  export default async function fetchCoins({
    perPage=50,
    page=1,
    order='market_cap_desc',
    ids,
    signal,
  } = {}){    
    const url=new URL('coins/markets',BASE_URL)
    url.searchParams.set('vs_currency','usd')
    
    url.searchParams.set('order', order);   
    url.searchParams.set('page',String(page))
    url.searchParams.set('per_page',String(perPage))
    if(ids?.length) url.searchParams.set("ids",ids.join(","))
    url.searchParams.set('price_change_percentage','1h,24h,7d')
    url.searchParams.set('sparkline','true')
   
    const res=await fetch(url);
    if(!res.ok)throw new Error(`HTTP ${res.status}`);
    const data=await res.json();
    console.log(data);
    return data;
  }