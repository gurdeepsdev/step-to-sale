import { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@fontsource/mulish'; // Defaults to 400 weight
import '@fontsource/mulish/300.css'; // Light
import '@fontsource/mulish/600.css'; // Semi-Bold
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'; // Ensure Tailwind CSS is included here
import Cookies from "js-cookie";
import ProtectedRoute from './ProtectedRoute';

import Home from "./pages/Home"; 
import CouponsDetails from "./pages/CouponsDetails";
import CouponFilters from "./pages/CouponFilters";
import Account from "./pages/Account";
import My from "./pages/My";




import Singup from "./auth/Singup";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);
  return (
    <Router>
      <div>
 

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
              <Route path="/CouponsDetails" element={<CouponsDetails/>} /> 
              <Route path="/Singup" element={<Singup/>} /> 
              <Route path="/CouponFilters" element={<CouponFilters/>} />  
              <Route path="/My" element={<My/>} /> 
{/* Correct usage of ProtectedRoute */}
<Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/Account" element={<Account />} />  {/* Account is now directly the element */}
          </Route>

     
        </Routes>
      </div>
    </Router>
  );
};

export default App;

