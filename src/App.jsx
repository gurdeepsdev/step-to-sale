import {  useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@fontsource/mulish'; // Defaults to 400 weight
import '@fontsource/mulish/300.css'; // Light
import '@fontsource/mulish/600.css'; // Semi-Bold
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'; // Ensure Tailwind CSS is included here
import Cookies from "js-cookie";
import ProtectedRoute from './ProtectedRoute';
import ScrollToTop from "../src/components/ScrollToTop";

import Home from "./pages/Home"; 
import Flexpage from "./pages/Flexpage"; 

import CouponsDetails from "./pages/CouponsDetails";
import CouponFilters from "./pages/CouponFilters";
import Account from "./pages/Account";
import Aboutus from "./policies/Aboutus";
import Contactus from "./policies/Contactus";
import PrivacyPolicy from "./policies/PrivacyPolicy";

import TermsConditions from "./policies/TermsConditions ";





import HowitWorks from "./pages/HowitWorks";





import Singup from "./auth/Singup";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially null

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Prevents incorrect redirection
  }
  return (
    <Router>
         <ScrollToTop /> 
      <div>
 

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
              <Route path="/CouponsDetails/:slug" element={<CouponsDetails/>} /> 
              <Route path="/Singup" element={<Singup/>} /> 
              <Route path="/CouponFilters/:categoryName" element={<CouponFilters/>} />  
              <Route path="/HowitWorks" element={<HowitWorks/>} /> 
              <Route path="/Aboutus" element={<Aboutus/>} /> 
              <Route path="/Contactus" element={<Contactus/>} /> 
              <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} /> 
              <Route path="/TermsConditions" element={<TermsConditions/>} /> 
              <Route path="/Flexpage" element={<Flexpage/>} /> 

              
              
              


     {/* Protected Route */}
     <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/Account" element={<Account />} />
        </Route>
          
     
        </Routes>
      </div>
    </Router>
  );
};

export default App;

