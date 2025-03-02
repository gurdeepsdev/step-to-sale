import  { useState } from "react";

// Import your components or pages
import Header from "../components/Header";
import Steps from "../components/Steps";
import Carousel from "../components/Carousel"; // Update the path based on your project structure
import PopularStores from "../components/PopularStores";
import MarqueeHome from "../components/MarqueeHome";
import Cards from "../components/Cards";
import Testimoials from "../components/Testimoials";
import Signup from "../auth/Singup";
import Sigline from "../components/Sigline";
import Finance from "../components/Finance";
import Subscribe from "../components/Subscribe";
import FaQ from "../components/FaQ";
import Coupons from "../components/Coupons";
import Footer from "../components/Footer";
import Withdraw from "../components/Withdraw";








const App = () => {

     const [isSignUp, setIsSignUp] = useState(true); // State to toggle between SignUp and SignIn forms
  
    // const [activeForm, setActiveForm] = useState(null); // "signin" or "signup"
    const [showModal, setShowModal] = useState(false); // Modal visibility state
  
    const handleButtonClick = (formType) => {
      setIsSignUp(formType); // Set the form type ("signin" or "signup")
      setShowModal(true); // Show the modal
    };
  return (
  <div className="max-w-container mx-auto">
    <Header/>
     <Carousel/>  
    <Steps/>
    <Withdraw/>

    <Sigline callFunction={handleButtonClick} />
    <PopularStores/>
    <MarqueeHome/>
    <Cards/>
    <Coupons/>
    <Finance/>
    <Testimoials/>
    <Subscribe/>
    <FaQ/>
    <Footer/>
      {/* <Signup isSignUp={isSignUp}  setIsSignUp={setIsSignUp}/> */}
      <Signup
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        showModal={showModal}
        setShowModal={setShowModal} // Ensure this is passed correctly


/>
  </div>
  );
};

export default App;
