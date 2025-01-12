import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";



const Header = () => {
  const [showCountryToggle, setShowCountryToggle] = useState(false);
  const [showProfileToggle, setShowProfileToggle] = useState(false);
  const [showNotificationsSidebar, setShowNotificationsSidebar] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false); // State for mobile search toggle
  const [showSidebar, setShowSidebar] = useState(false);  // To toggle the sidebar on mobile

  const toggleSidebar = () => setShowSidebar(!showSidebar);


  const toggleCountryMenu = () => {
    setShowCountryToggle(!showCountryToggle);
    setShowProfileToggle(false);
    setShowNotificationsSidebar(false);
    setShowMobileSearch(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileToggle(!showProfileToggle);
    setShowCountryToggle(false);
    setShowNotificationsSidebar(false);
    setShowMobileSearch(false);
  };

  const toggleNotificationsSidebar = () => {
    setShowNotificationsSidebar(!showNotificationsSidebar);
    setShowCountryToggle(false);
    setShowProfileToggle(false);
    setShowMobileSearch(false);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    setShowCountryToggle(false);
    setShowProfileToggle(false);
    setShowNotificationsSidebar(false);
  };

  const [showCountrysToggle, setShowCountrysToggle] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "IN",
    flag: "🇮🇳",
  });

  const toggleCountrysMenu = () => {
    setShowCountryToggle((prev) => !prev);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryToggle(false); // Close the dropdown after selection
  };

  const countries = [
    { code: "IN", flag: "🇮🇳", name: "India" },
    { code: "USA", flag: "🇺🇸", name: "USA" },
    { code: "UK", flag: "🇬🇧", name: "UK" },
  ];

  return (
    <>
    <div className="max-w-container mx-auto bg-white shadow">
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-6 sm:px-16 py-3 border-b">
        {/* Logo */}
        <div className="flex items-center">
          <div className="class=w-[112px] h-[64px] bg-gradient-to-b from-red-500 to-red-700 flex items-center justify-center">
            <span className="text-white text-2xl font-bold"><img src="/img/logo.png"></img></span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mx-4 hidden sm:block">
  <div className="relative">
    <input
      type="text"
      placeholder="Search For Brands, Categories"
      className="w-96 max-w-full pl-4 pr-10 py-2 border border-black rounded-full text-sm focus:ring-2 focus:ring-red-400"
    />
    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
      🔍
    </div>
  </div>
</div>


        <div>
      {/* Mobile Sidebar */}
      <div className={`sm:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-50 ${showSidebar ? 'block' : 'hidden'}`}>
        <div className="bg-white p-4 w-64 h-full">
          <button className="w-full text-left" onClick={toggleSidebar}>Close Sidebar</button>
          <div className="space-y-4 mt-4">
            {/* <button onClick={() => console.log("Search clicked")} className="w-full">🔍 Search</button> */}
            <button onClick={toggleCountryMenu} className="w-full">🇮🇳 Country</button>
            <button onClick={() => console.log("Notifications clicked")} className="w-full">🔔 Notifications</button>
            <button onClick={toggleProfileMenu} className="w-full">👤 Profile</button>
          </div>
        </div>
      </div>

      {/* Main Header Section */}
      <div className="flex items-center justify-between p-4 ">

           {/* Mobile Search Icon */}
       <div className="relative sm:hidden">
            <button
              onClick={toggleMobileSearch}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-lg"
            >
              🔍
            </button>
          </div>
        {/* Mobile Menu Button */}
        <button className="w-8 h-8 sm:hidden text-lg" onClick={toggleSidebar}>
          ☰
        </button>

        {/* Right Section (Visible on Large Screens) */}
        <div className="flex items-center space-x-4 relative hidden sm:flex">
          {/* Search Icon */}
          {/* <div className="relative">
            <button
              onClick={() => console.log("Search clicked")}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-lg"
            >
              🔍
            </button>
          </div> */}

          {/* Country Selector */}
          <div className="relative">
      {/* Dropdown Trigger */}
      <button
        onClick={toggleCountryMenu}
        className="flex items-center   px-3 py-2 focus:outline-none"
      >
        <span className="text-4xl">{selectedCountry.flag}</span>
        <span className="ml-2 text-sm font-medium">{selectedCountry.code}</span>
        <span className="ml-1 text-gray-500"><RiArrowDropDownLine className="text-5xl"/></span>
      </button>

      {/* Dropdown Menu */}
      {showCountryToggle && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow rounded-md py-2 z-10">
          {countries.map((country) => (
            <button
              key={country.code}
              className="flex items-center px-4 py-2 w-full hover:bg-gray-100"
              onClick={() => handleCountrySelect(country)}
            >
              <span className="text-xl">{country.flag}</span>
              <span className="ml-2 text-sm font-medium">{country.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>

          {/* Notifications Icon */}
          <div className="relative">
            <button
            onClick={toggleNotificationsSidebar}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-lg"
            >
              🔔
            </button>
          </div>

          {/* Profile Icon with Balance */}
          <div className="relative flex items-center ">
            <button
              onClick={toggleProfileMenu}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg focus:outline-none"
            >
              👤
            </button>
            <span className="ml-2 text-sm font-medium">₹0</span>

            {showProfileToggle && (
              <div className="absolute right-0 mt-40 w-40 bg-white shadow rounded-md py-2 z-10">
                <button
                  className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                  onClick={() => console.log("Login clicked")}
                >
                  Login
                </button>
                <button
                  className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                  onClick={() => console.log("Signup clicked")}
                >
                  Signup
                </button>
              </div>
            )}
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
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:ring-2 focus:ring-red-400"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔍
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navbar */}
      <div className="flex flex-wrap justify-center py-3 bg-[#244856] text-center">
        <a href="#" className="text-white hover:text-red-500 whitespace-nowrap px-1 sm:px-3 text-xs sm:text-sm md:text-base">
          Popular Categories
        </a>
        <a href="#" className="text-white hover:text-red-500 whitespace-nowrap px-1 sm:px-3 text-xs sm:text-sm md:text-base">
          Top Stores
        </a>
        <a href="#" className="text-white hover:text-red-500 whitespace-nowrap px-1 sm:px-3 text-xs sm:text-sm md:text-base">
          Coupon Codes
        </a>
        <a href="#" className="hidden sm:block text-white hover:text-red-500 whitespace-nowrap px-1 sm:px-3 text-xs sm:text-sm md:text-base">
          Deal Zone
        </a>
        <a href="#" className="text-white hover:text-red-500 whitespace-nowrap px-1 sm:px-3 text-xs sm:text-sm md:text-base">
          Share and Earn
        </a>
      </div>

      {/* Notifications Sidebar */}
      {showNotificationsSidebar && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-20">
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
    </div>

    </>

  );
};

export default Header;
