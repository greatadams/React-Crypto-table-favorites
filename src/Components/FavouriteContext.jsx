import { createContext, useContext,useState } from "react";

const Ctx =createContext(null);

export function FavouritesProvider  ({children})  {
   
    const [favs,setFavs] =useState(new Set())
    const toggle=(id)=>{
        setFavs(prev=>{
            const next = new Set(prev);
            next.has(id)?next.delete(id):next.add(id);
            return next;
        })
    }
    return ( 
        <>
          <Ctx.Provider value={{favs,toggle}}>
            {children}
            </Ctx.Provider>

        </>
     );
}
 
export const useFavorites=()=>useContext(Ctx)