import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { FavouritesProvider } from './Components/FavouriteContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>


  <FavouritesProvider>
  <App />
  </FavouritesProvider>
     
  
   
 
  </StrictMode>,
)
