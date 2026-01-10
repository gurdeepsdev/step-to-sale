import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import '@fontsource/mulish'; // Defaults to 400 weight
import '@fontsource/mulish/300.css'; // Light
import '@fontsource/mulish/600.css'; // Semi-Bold
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'; // Ensure Tailwind CSS is included here
import Cookies from "js-cookie";
import ProtectedRoute from './ProtectedRoute';
import ScrollToTop from "./components/ScrollToTop";
import Coupontopcodes from "./pages/Coupontopcodes";

// Pages
import Home from "./pages/Home"; 
import Flexpage from "./pages/Flexpage"; 
import CouponsGroup from "./pages/CouponsGroup"; 
import CouponsDetails from "./pages/CouponsDetails";
import CouponFilters from "./pages/CouponFilters";
import Account from "./pages/Account";
import Aboutus from "./policies/Aboutus";
import Contactus from "./policies/Contactus";
import PrivacyPolicy from "./policies/PrivacyPolicy";
import TermsConditions from "./policies/TermsConditions ";
import LinkRedirect from './pages/LinkRedirect';
import CouponCode from './pages/Coupon-Code';
import Offers from './pages/Offers';
import HowitWorks from "./pages/HowitWorks";
import TopStores from "./pages/TopStoreswith";
import Deals from "./pages/Deals";
import CategoreNew from "./pages/CategoreNew";
import SubCategore from "./pages/SubCategore";
import NewOffers from "./pages/NewOffers";
import OffersDetails from "./pages/OffersDetails";


import Singup from "./auth/Singup";

// ✅ Inject Clocker script on specific route
const ClockerInjector = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const match = path.match(/^\/CouponsDetails\/(.+)/);
    if (match) {
      const slug = match[1]; // e.g., "Trip.com"
      const campaignMap = {
          "Trip.com": "8o2dc1",
          "Mister-Spex": "8c0a6o",
          "shopify":"ba8s30",       

        // Add more mappings if needed
      };

      const cid = campaignMap[slug];
      if (cid) {
        const script = document.createElement("script");
        script.src = `//steptosale.com/tk/?cid=${cid}`;
        script.async = true;
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
        };
      }
    }
  }, [location.pathname]);

  return null;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation(); // inside Router context ✅

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Inject campaign-specific PHP loader
  useEffect(() => {
    const path = location.pathname;
    const match = path.match(/^\/CouponsDetails\/(.+)/);
    console.log("📍 Current Path:", path);

    if (match) {
      const slug = match[1];
      console.log("🟢 Matched slug:", slug);

      // Campaign map: Slug → Campaign ID
      const campaignMap = {
        "Trip.com": "8o2dc1",
        "Mister-Spex": "8c0a6o",
        "shopify": "ba8s30",
         "StubHub-NORAM":"d9i5b4",
	"Lounge-By-Zalando":"p460af",
	"Hotels.com":"502nak",
	"Etihad-Airways":"54fem0",
       "Fiverr%20WW": "986ceb",
	"MACY'S":"9fc08g",
        "DTLR-VILLA":"n670ea",
         "Foxtale":"70ga3o", 
           "Condor":"61d2eo",
              "Expedia":"930apd"
        // Add more here
      };

      const cid = campaignMap[slug];

      if (cid) {
        console.log("✅ Injecting custom index.php for:", cid);

        // You have multiple PHP files like: index_amz567.php, index_8o2dc1.php, etc.
        const script = document.createElement("script");

script.src = `https://steptosale.com/tk/index.php?cid=${cid}`;

       // script.src = `https://steptosale.com/tk/?cid=${cid}.php`;
//script.src = `https://steptosale.com/tk/index_${cid}.php`;
        
script.async = true;
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
        };
      } else {
        console.warn("❌ No campaign ID for slug:", slug);
      }
    } else {
      console.warn("❌ Path didn't match CouponsDetails route");
    }
  }, [location.pathname]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CouponsDetails/:slug" element={<CouponsDetails />} />
        <Route path="/Offers/:slug" element={<Offers />} />
        <Route path="/Singup" element={<Singup />} />
        <Route path="/CouponFilters/:categoryName" element={<CouponFilters />} />
        <Route path="/HowitWorks" element={<HowitWorks />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/Contactus" element={<Contactus />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TermsConditions" element={<TermsConditions />} />
        <Route path="/Flexpage" element={<Flexpage />} />
        <Route path="/CouponCode/:slug" element={<CouponCode />} />
        <Route path="/CouponsGroup/:title" element={<CouponsGroup />} />
        <Route path="/:slug" element={<LinkRedirect />} />
        <Route path="/Coupontopcodes" element={<Coupontopcodes />} />
        <Route path="/TopStores" element={<TopStores />} />
        <Route path="/Deals" element={<Deals />} />
        <Route path="/CategoreNew" element={<CategoreNew />} />
        <Route path="/CategoreNew/:slug" element={<SubCategore />} />
        <Route path="/NewOffers" element={<NewOffers />} />
        <Route path="/OffersDetails/:slug" element={<OffersDetails />} />

        
        
        
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/Account" element={<Account />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;



