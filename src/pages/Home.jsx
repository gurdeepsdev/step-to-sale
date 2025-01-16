import React from "react";

// Import your components or pages
import Header from "../components/Header";
import Steps from "../components/Steps";
import Sigline from "../components/Sigline";
import Carousel from "../components/Carousel"; // Update the path based on your project structure
import PopularStores from "../components/PopularStores";
import MarqueeHome from "../components/MarqueeHome";
import Cards from "../components/Cards";
import Testimoials from "../components/Testimoials";

import Finance from "../components/Finance";
import Subscribe from "../components/Subscribe";
import FaQ from "../components/FaQ";
import Coupons from "../components/Coupons";
import Footer from "../components/Footer";








const App = () => {
  return (
  <div className="max-w-container mx-auto">
    <Header/>
     <Carousel/>  
    <Steps/>
    <Sigline/>
    <PopularStores/>
    <MarqueeHome/>
    <Cards/>
    <Coupons/>
    <Finance/>
    <Testimoials/>
    <Subscribe/>
    <FaQ/>
    <Footer/>
  </div>
  );
};

export default App;
