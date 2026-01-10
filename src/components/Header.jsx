import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Headerpop from "../components/Headerpop";
import HeaderpopOver from "../components/HeaderpopOver";

import api, { getAllCoupons } from "../utils/api"; // Import API utility

const Header = () => {
  const { userId, balance } = useContext(AuthContext);
  const [showCategories, setShowCategories] = useState(false);
  const [showTopstores, setShowTopstores] = useState(false);

  const [showCountryToggle, setShowCountryToggle] = useState(false);
  const [showProfileToggle, setShowProfileToggle] = useState(false);
  const [showNotificationsSidebar, setShowNotificationsSidebar] =
    useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false); // State for mobile search toggle
  const [showSidebar, setShowSidebar] = useState(false); // To toggle the sidebar on mobile

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleProfileMenu = () => {
    const accesstoken = Cookies.get("token");

    if (accesstoken) {
      // alert("hellow")
      navigate("/Account");
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
    setShowProfileToggle(false);
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
    navigate("/Deals");

    // setShowTopstores(!showTopstores)
    // setShowCategories(false)
  };

  // Handle click on suggestion
  const handelCategories = () => {
    setShowTopstores(false);
    setShowCategories(!showCategories);
  };
  const slug = "All";

  const getDeal = (categoryName) => {
    navigate(`/CouponFilters/${categoryName}`);
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
                <Link to="/">
                  <span className="text-white text-2xl font-bold">
                    <img
                      src="/img/logo.png"
                      alt="Company Logo - StepToSale"
                      title="StepToSale Official Logo"
                    />
                  </span>
                </Link>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mx-4 hidden sm:block"></div>

            <div>
              {/* Mobile Sidebar */}

              {/* Main Header Section */}
              <div className="flex items-center justify-between p-0 ">
                {/* Mobile Search Icon */}
                <div className="relative sm:hidden flex items-center space-x-4">
                  {/* Search Icon */}
                  <button
                    onClick={toggleMobileSearch}
                    className="rounded-full hover:bg-gray-100 flex items-center justify-center text-xl">
                    <IoIosSearch />
                  </button>

                  {/* Menu Icon */}
                </div>

                <div className="flex items-center gap-2 sm:gap-3 relative hidden sm:flex">
                  {/* Notifications Icon */}

                  {/* Wallet Icon */}

                  {/* Profile Icon */}

                  <div className="relative w-96 max-w-full">
                    <input
                      value={searchTerm}
                      onChange={handleSearchChange}
                      type="text"
                      placeholder="Search For Brands, Categories"
                      className="w-full pl-4 pr-10 py-2 border border-black rounded-full text-sm focus:ring-2 focus:ring-red-400"
                    />

                    {/* Search Icon */}
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>

                    {/* Suggestions Dropdown */}
                    {filteredCoupons.length > 0 && (
                      <ul className="absolute z-50 bg-white w-full border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                        {filteredCoupons.map((coupon) => (
                          <li
                            key={coupon.id}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelectCoupon(coupon.title)}>
                            {coupon.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* <div className="relative flex items-center">
    <button
      onClick={toggleProfileMenu}
      className="w-10 h-10 rounded-full flex items-center justify-center text-2xl focus:outline-none"
    >
      <LuCircleUserRound />
    </button> */}

                  {/* Profile dropdown */}
                  {/* <div
      className={`absolute right-0 mt-[280px] w-80 bg-white shadow-lg rounded-md py-6 z-10 transform transition-all duration-500 ${
        showProfileToggle
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    > */}
                  {/* Title Section */}
                  {/* <div className="text-center mb-6">
        <h1 className="text-lg font-semibold text-gray-800 mb-2">
          Join us for instant cashback!
        </h1>
        <p className="text-sm text-gray-500 px-6">
          Discover discounts, deals, and more—sign up Now!
        </p>
      </div> */}

                  {/* Buttons */}
                  {/* <div className="flex justify-center items-center gap-4">
        <button
          className="bg-[#E74833] hover:bg-white text-white hover:text-black px-6 border py-2 font-medium rounded-full transition duration-300"
          onClick={() => handleButtonClick(false)}
        >
          Login
        </button>
        <button
          className="hover:bg-[#E74833] bg-white hover:text-white text-black px-6 border py-2 rounded-full shadow transition duration-300"
          onClick={() => handleButtonClick(true)}
        >
          Sign up
        </button>
      </div> */}

                  {/* Redeem */}
                  {/* <div className="text-center mt-4">
        <button
          className="text-gray-700 font-medium underline hover:text-black transition duration-300"
          onClick={() => console.log("Redeem clicked")}
        >
          Redeem
        </button>
      </div>
    </div> */}
                  {/* </div> */}
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
                      onClick={() => handleSelectCoupon(coupon.title)}>
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
        <div className="flex justify-center py-2 bg-[#C2000E] text-center">
          <a
            onClick={handelCategories}
            className="text-white hover:text-black px-2 text-[10px] sm:px-2 lg:px-6 md:px-6 sm:text-sm md:px-3 md:text-lg lg:text-lg    cursor-pointer">
            Popular Categories
          </a>
          {/* Show CategoryPopup only when showCategories is true */}
          {showCategories && (
            <div className="absolute left-1/2 md:right-0 transform -translate-x-[50%] md:-translate-x-2/3 mt-6 md:mt-10  w-auto">
              <Headerpop />
            </div>
          )}
          <a
            onClick={handelStores}
            className="
    text-white
    hover:text-black
    cursor-pointer
    px-2
    text-[10px]
    sm:px-2 sm:text-sm
    md:px-3 md:text-lg
    lg:px-6 lg:text-lg
  ">
            Deals
          </a>

          {showTopstores && (
            <div className="absolute left-1/2 md:right-0 transform -translate-x-[50%] md:-translate-x-2/3 mt-6 md:mt-10  w-auto">
              <HeaderpopOver />
            </div>
          )}
          <a
            href="/Coupontopcodes"
            className="text-white hover:text-black px-2 text-[10px] sm:px-2  lg:px-6 md:px-6 sm:text-sm md:px-3 md:text-lg lg:text-lg">
            Top Coupon
          </a>
          <a
            href="/NewOffers"
            className="text-white hover:text-black px-2 text-[10px] sm:px-2 lg:px-6 md:px-6 sm:text-sm md:px-3 md:text-lg lg:text-lg">
            Popular Stores
          </a>
          {/* <Link to="/HowitWorks" className="text-white hover:text-red-500 px-0 md:px-2 lg:px-2 text-[10px] sm:px-2 lg:px-6 md:px-6 sm:text-sm md:px-3 md:text-lg lg:text-lg flex items-center space-x-2">
            <span className=" hidden sm:block" alt="Share Button - StepToSale" title="StepToSale Share Button"> Share and Earn</span>
            <span alt="Share Button - StepToSale" title="StepToSale Share Button"><FaRegShareSquare /></span>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Header;
