import { BrowserRouter,Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import Portforlio from "./pages/Portforlio";




export default function App() {
   
 
  return(

     <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<Portforlio />} />
      </Routes>
    </BrowserRouter>
  
  )
 
  
}