import  { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import Signup from "../auth/Singup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Headerpop from "../components/Headerpop"
import HeaderpopOver from "../components/HeaderpopOver"

import api, { getAllCoupons } from "../utils/api"; // Import API utility

// import { io } from "socket.io-client";





import { FaRegBell, FaBars, FaRegShareSquare } from "react-icons/fa";
import { LuCircleUserRound } from "react-icons/lu";

// const socket = io("http://localhost:5000"); // Adjust to match your backend URL


const Header = () => {

  const {  userId, balance } = useContext(AuthContext);
  const [showCategories, setShowCategories] = useState(false);
  const [showTopstores, setShowTopstores] = useState(false);

  const [showCountryToggle, setShowCountryToggle] = useState(false);
  const [showProfileToggle, setShowProfileToggle] = useState(false);
  const [showNotificationsSidebar, setShowNotificationsSidebar] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false); // State for mobile search toggle
  const [showSidebar, setShowSidebar] = useState(false);  // To toggle the sidebar on mobile
  
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);





  const toggleProfileMenu = () => {
    const accesstoken = Cookies.get("token");

    if (accesstoken) {
      // alert("hellow")
      navigate('/Account');
    } else {
      setShowProfileToggle(!showProfileToggle);
      setShowCountryToggle(false);
      setShowNotificationsSidebar(false);
      setShowMobileSearch(false);
    }
  };





  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);


    try {
      const response = await api.get(`/api/notification/${userId}`);

      setNotifications(response.data);
    } catch (err) {
      console.error("API Error:", err);
      if (err.response) {
        setError(err.response.data.message || "Failed to load transactions");
      } else {
        setError("Network error. Please try again.");
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between SignUp and SignIn forms

  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const handleButtonClick = (formType) => {
    setIsSignUp(formType); // Set the form type ("signin" or "signup")
    setShowModal(true); // Show the modal
    setShowProfileToggle(false)
  };



  const toggleCountryMenu = () => {
    setShowCountryToggle(!showCountryToggle);
    setShowProfileToggle(false);
    setShowNotificationsSidebar(false);
    setShowMobileSearch(false);
  };



  const toggleNotificationsSidebar = () => {
    setShowNotificationsSidebar(!showNotificationsSidebar);
    setShowCountryToggle(false);
    setShowProfileToggle(false);
    setShowMobileSearch(false);
    setShowSidebar(false);
    // getUserData()
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    setShowCountryToggle(false);
    setShowProfileToggle(false);
    setShowNotificationsSidebar(false);
  };

  const [selectedCountry, setSelectedCountry] = useState({
    code: "IN",
    flag: "/img/india.webp",
  });



  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryToggle(false); // Close the dropdown after selection
  };

  const countries = [
    { code: "IN", flag: "/img/india.webp", name: "India" },
    { code: "US", flag: "/img/usa.webp", name: "USA" },
    { code: "Ca", flag: "/img/can.webp", name: "Canada" },
  ];


  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoupons, setFilteredCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllCoupons();
      if (data.success) {
        setCoupons(data.data);
      }
      setLoading(false);
    };

    fetchCoupons();
  }, []);

  // Handle input change and filter suggestions
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter coupons where title includes the search term (case-insensitive)
    if (value.trim() === "") {
      setFilteredCoupons([]);
    } else {
      setFilteredCoupons(
        coupons.filter((coupon) =>
          coupon.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  // Handle click on suggestion
  const handleSelectCoupon = (slug) => {
    navigate(`/CouponsDetails/${slug}`);
    setSearchTerm(""); // Clear input after selection
    setFilteredCoupons([]); // Hide suggestions
  };

    // Handle click on suggestion
    const handelStores = () => {
      setShowTopstores(!showTopstores)
      setShowCategories(false)

    };

        // Handle click on suggestion
        const handelCategories = () => {
          setShowTopstores(false)
          setShowCategories(!showCategories)

    
        };
        const slug = "All";

  const getDeal = (categoryName) => {
    navigate(`/CouponFilters/${categoryName}`)

  };

  return (
    <>
      <div className=" bg-white shadow sticky top-0 bg-white z-50 ">
        {/* Top Navbar */}
        <div className="max-w-container mx-auto">
        <div className="flex justify-between items-center px-6 sm:px-16  border-b">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-[90px] h-[50px] lg:w-[112px] lg:h-[64px] bg-gradient-to-b from-red-500 to-red-700 flex items-center justify-center">
              <Link to='/'><span className="text-white text-2xl font-bold"><img src="/img/logo.png"></img></span></Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mx-4 hidden sm:block">
            <div className="relative">
              <input
                value={searchTerm}
                onChange={handleSearchChange}
                type="text"
                placeholder="Search For Brands, Categories"
                className="w-96 max-w-full pl-4 pr-10 py-2 border border-black rounded-full text-sm focus:ring-2 focus:ring-red-400"
              />
{/* Suggestions Dropdown */}
{filteredCoupons.length > 0 && (
                <ul className="absolute z-50 bg-white w-96 border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {filteredCoupons.map((coupon) => (
                    <li
                      key={coupon.id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelectCoupon(coupon.title)}
                    >
                      {coupon.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
         

          <div>
            {/* Mobile Sidebar */}
            <div className={`sm:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-50 ttransform transition-transform duration-500 ${showSidebar ? "translate-x-0" : "-translate-x-full"
              } `}>
              <div className="bg-white p-4 w-64 h-full">
                <button className="w-full text-right" onClick={toggleSidebar}>
                  <IoIosClose className="text-4xl" />
                </button>
                <div className="space-y-4 mt-4">
                  <button
                    onClick={toggleCountryMenu}
                    className="w-full flex items-center space-x-2"
                  >
                    <span className="text-sm"><img src={selectedCountry.flag} className="h-6 w-7"></img></span>
                    <span className="ml-2 text-sm font-medium">{selectedCountry.code}</span>
                    <span className="ml-1 text-gray-500"><RiArrowDropDownLine className="text-5xl" /></span>
                  </button>



                  <button onClick={toggleNotificationsSidebar}
                    className="w-full flex items-center space-x-2 ">
                    <FaRegBell />
                    <span>Notifications</span>
                  </button>
                  {/* Notifications Sidebar */}
                  {showNotificationsSidebar && (
                    <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-20  ">
                      <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="font-medium">Notifications</h2>
                        <button
                          onClick={toggleNotificationsSidebar}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          ✖️
                        </button>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="bg-gray-100 p-3 rounded-lg">Notification 1</div>
                        <div className="bg-gray-100 p-3 rounded-lg">Notification 2</div>
                        <div className="bg-gray-100 p-3 rounded-lg">Notification 3</div>
                      </div>
                    </div>
                  )}
                  <button onClick={toggleProfileMenu} className="w-full flex items-center space-x-2">
                    <LuCircleUserRound />
                    <span>Profile</span>
                  </button>
                  {showProfileToggle && (
                    <div className="absolute mt-40 w-[220px] bg-white shadow-lg rounded-md py-4 z-10 flex flex-col items-center space-y-4">
                      {/* Title */}
                      <div className="text-center px-2 py-2">
                        <h1 className="text-sm font-semibold mb-2">Join us for instant cashback!</h1>
                        <p className="text-xs text-gray-500">Discover discounts, deals, and more—sign up Now!</p>
                      </div>

                      {/* Buttons */}
                      <div className="flex justify-center space-x-4">
                        <button
                          className="bg-[#E74833] hover:bg-white text-white hover:text-black font-medium px-4 text-sm md:text-base lg:text-base py-1 rounded-full transition duration-300 border"
                          onClick={() => handleButtonClick(false)}
                        >
                          Login
                        </button>
                        <button
                          className="bg-[#E74833] hover:bg-white text-white hover:text-black font-medium px-4 text-sm md:text-base lg:text-base py-1 rounded-full transition duration-300 border"
                          onClick={() => handleButtonClick(true)}
                        >
                          Sign Up
                        </button>
                      </div>

                      {/* Redeem */}
                      <button
                        className="text-gray-700 font-medium underline hover:text-black transition duration-300"
                        onClick={() => console.log("Redeem clicked")}
                      >
                        Redeem
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>


            {/* Main Header Section */}
            <div className="flex items-center justify-between p-0 ">

              {/* Mobile Search Icon */}
              <div className="relative sm:hidden flex items-center space-x-4">
                {/* Search Icon */}
                <button
                  onClick={toggleMobileSearch}
                  className="rounded-full hover:bg-gray-100 flex items-center justify-center text-xl"
                >
                  <IoIosSearch />
                </button>

                {/* Menu Icon */}
                <button
                  className=" text-xl"
                  onClick={toggleSidebar}
                >
                  <FaBars />
                </button>
              </div>


              {/* Right Section (Visible on Large Screens) */}
              <div className="flex items-center space-x-4 relative hidden sm:flex">


                {/* Country Selector */}
                <div className="relative">
                  {/* Dropdown Trigger */}
                  <button
                    onClick={toggleCountryMenu}
                    className="flex items-center   px-3 py-2 focus:outline-none"
                  >
                    <span className="text-sm"><img src={selectedCountry.flag} className="h-9 w-11"></img></span>
                    <span className="ml-2 text-sm font-medium">{selectedCountry.code}</span>
                    <span className="ml-1 text-gray-500"><RiArrowDropDownLine className="text-5xl" /></span>
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute right-0 mt-2 w-32 bg-white shadow rounded-md py-2 z-10 transform transition-all duration-500 ${showCountryToggle ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                      }`}
                  >
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
                        onClick={() => handleCountrySelect(country)}
                      >
                        <span className="text-xl">
                          <img src={country.flag} className="h-6 w-7" alt={`${country.name} flag`} />
                        </span>
                        <span className="ml-2 text-sm font-medium">{country.name}</span>
                      </button>
                    ))}

                  </div>

                </div>

                {/* Notifications Icon */}
                <div className="relative">
  <button
    onClick={toggleNotificationsSidebar}
    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-3xl relative"
  >
    <FaRegBell />
    
    {/* Red dot when notifications exist */}
    {notifications.length > 0 && (
      <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
    )}
  </button>
</div>


                {/* Profile Icon with Balance */}
                {/* Profile Icon with Balance */}
                <div className="relative flex items-center">
                  <button
                    onClick={toggleProfileMenu}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-3xl focus:outline-none"
                  >
                    <LuCircleUserRound />
                  </button>


                  <span className="ml-2 text-sm font-medium text-red-600">₹{balance}</span>
                  <div
                    className={`absolute right-0 mt-[280px] w-80 bg-white shadow-lg rounded-md py-6 z-10 transform transition-all duration-500 ${showProfileToggle ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                      }`}
                  >
                    {/* Title Section */}
                    <div className="text-center mb-6">
                      <h1 className="text-lg font-semibold text-gray-800 mb-2">Join us for instant cashback!
                      </h1>
                      <p className="text-sm text-gray-500 px-6">Discover discounts, deals, and more—sign up Now!
                      </p>
                    </div>

                    {/* Buttons Section */}
                    <div className="flex justify-center items-center  space-x-4">
                      <button
                        className="bg-[#E74833] hover:bg-white text-white hover:text-black px-6  border py-2 bg-red-500 text-white font-medium rounded-full  transition duration-300"
                        // onClick={() => setIsSignUp(false)} 
                        onClick={() => handleButtonClick(false)}

                      >
                        Login
                      </button>
                      <button
                        className="hover:bg-[#E74833] bg-white hover:text-white text-black px-6  border py-2 rounded-full shadow  transition duration-300"
                        onClick={() => handleButtonClick(true)}
                      >
                        Sign up
                      </button>
                    </div>


                    {/* Redeem Section */}
                    <div className="text-center">
                      <button
                        className="text-gray-700 font-medium underline hover:text-black transition duration-300"
                        onClick={() => console.log("Redeem clicked")}
                      >
                        Redeem
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
</div>
        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="px-4 py-2 sm:hidden">
            <div className="relative">
              <input
                value={searchTerm}
                onChange={handleSearchChange}
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:ring-2 focus:ring-red-400"
              />
              {/* Suggestions Dropdown */}
              {filteredCoupons.length > 0 && (
                <ul className="absolute z-50 bg-white w-96 border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {filteredCoupons.map((coupon) => (
                    <li
                      key={coupon.id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelectCoupon(coupon.title)}
                    >
                      {coupon.title}
                    </li>
                  ))}
                </ul>
              )}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <IoIosSearch />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navbar */}
        <div className="flex justify-center py-2 bg-[#244856] text-center">
          <p onClick={handelCategories}
            className="text-white hover:text-red-500 px-2 text-[10px] sm:px-2 lg:px-6 md:px-6 sm:text-sm md:px-3 md:text-lg lg:text-lg">
            Popular Categories
          </p>
          {/* Show CategoryPopup only when showCategories is true */}
          {showCategories && (
            <div
              className="absolute left-1/2 md:right-0 transform -translate-x-[50%] md:-translate-x-2/3 mt-6 md:mt-10  w-auto"
            >
              <Headerpop />
            </div>
          )}

          <p onClick={handelStores} className="text-white hover:text-red-500 px-2 text-[10px] sm:px-2 lg:px-6 md:px-6 sm:text-sm md:px-3 md:text-lg lg:text-lg">
            Top Stores
          </p>
          {showTopstores && (
            <div
              className="absolute left-1/2 md:right-0 transform -translate-x-[50%] md:-translate-x-2/3 mt-6 md:mt-10  w-auto"
            >
              <HeaderpopOver />
            </div>
          )}
          <a href="#" className="text-white hover:text-red-500 px-2 text-[10px] sm:px-2  lg:px-6 md:px-6 sm:text-sm md:px-3 md:text-lg lg:text-lg">
            Coupon Codes
          </a>
          <p    onClick={() => getDeal(slug)}
           className="text-white hover:text-red-500 px-2 text-[10px] sm:px-2 lg:px-6 md:px-6 sm:text-sm md:px-3 md:text-lg lg:text-lg">
            Deal Zone
          </p>
          <Link to="/HowitWorks" className="text-white hover:text-red-500 px-0 md:px-2 lg:px-2 text-[10px] sm:px-2 lg:px-6 md:px-6 sm:text-sm md:px-3 md:text-lg lg:text-lg flex items-center space-x-2">
            <span className=" hidden sm:block"> Share and Earn</span>
            <span><FaRegShareSquare /></span>
          </Link>

        </div>


        <>
          {/* Mask */}
          {showNotificationsSidebar && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300"
              onClick={toggleNotificationsSidebar} // Close sidebar on mask click
            ></div>
          )}

          {/* Sidebar */}
          <div
            className={`fixed top-0 right-0 w-64 sm:w-80 h-full bg-white shadow-lg z-20 transform transition-transform duration-500 ${showNotificationsSidebar ? "translate-x-0" : "translate-x-full"
              }`}
          >
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-medium text-lg">Notifications</h2>
              <button
                onClick={toggleNotificationsSidebar}
                className="text-gray-500 hover:text-gray-700"
              >
                ✖️
              </button>
            </div>

         {/* Notification Items */}
{/* Notification Items */}
<div className="p-4 space-y-4 overflow-y-auto">
  {notifications.length === 0 ? (
    <p className="text-center text-gray-500">No notifications exist yet</p>
  ) : (
    notifications.map((item, index) => {
      // Extracting only the date (YYYY-MM-DD)
      const formattedDate = new Date(item.created_at).toISOString().split("T")[0];

      return (
        <div
          key={index}
          className="flex items-center bg-gray-100 rounded-lg p-3 shadow-md space-x-4"
        >
          {/* Image */}
          <img
            src="/img/logo.png" // Replace with actual image URL
            alt="Sale"
            className="w-16 h-16 rounded-lg object-fill"
          />
          {/* Notification Content */}
          <div>
            <h3 className="font-bold text-sm sm:text-base">#20{item.id}99</h3>
            <p className="text-gray-600 text-sm">{item.message}</p>
            <p className="text-gray-500 text-xs mt-1">Date - {formattedDate}</p>
          </div>
        </div>
      );
    })
  )}
</div>


          </div>
        </>

      </div>
      {/* <Signup isSignUp={isSignUp}  setIsSignUp={setIsSignUp}/> */}
      <Signup
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        showModal={showModal}
        setShowModal={setShowModal} // Ensure this is passed correctly


      />

      {/* {showModal && <Sigline setShowModal={setShowModal} />} */}

    </>

  );
};

export default Header;
