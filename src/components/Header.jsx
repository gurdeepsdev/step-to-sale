import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosClose,IoIosSearch } from "react-icons/io";

import { FaRegBell,FaBars } from "react-icons/fa";
import { LuCircleUserRound } from "react-icons/lu";
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
    flag: "https://media.istockphoto.com/id/1165087486/vector/india-flag.jpg?s=612x612&w=0&k=20&c=HT-bdr0kaqa1VG8KK7dB4phWvzHF63mndpjQJ91GWCo=",
  });

  const toggleCountrysMenu = () => {
    setShowCountryToggle((prev) => !prev);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryToggle(false); // Close the dropdown after selection
  };

  const countries = [
    { code: "IN", flag: "/img/india.jpg", name: "India" },
    { code: "USA", flag: "/img/usa.webp", name: "USA" },
    { code: "Ca", flag: "/img/can.webp", name: "Canada" },
  ];

  return (
    <>
      <div className=" bg-white shadow sticky top-0 bg-white z-50 ">
        {/* Top Navbar */}
        <div className="flex justify-between items-center px-6 sm:px-16  border-b">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-[90px] h-[50px] lg:w-[112px] lg:h-[64px] bg-gradient-to-b from-red-500 to-red-700 flex items-center justify-center">
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
         
            </div>
          </div>


          <div>
            {/* Mobile Sidebar */}
            <div className={`sm:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-50 ${showSidebar ? 'block' : 'hidden'}`}>
              <div className="bg-white p-4 w-64 h-full">
                <button className="w-full text-right" onClick={toggleSidebar}>
                  <IoIosClose className="text-4xl" />
                </button>
                <div className="space-y-4 mt-4">
                  <button onClick={toggleCountryMenu} className="w-full flex items-center space-x-2">
                    <span>🇮🇳</span>
                    <span>Country</span>
                  </button>
                  <button onClick={() => console.log("Notifications clicked")} className="w-full flex items-center space-x-2">
                    <FaRegBell />
                    <span>Notifications</span>
                  </button>
                  <button onClick={toggleProfileMenu} className="w-full flex items-center space-x-2">
                    <LuCircleUserRound />
                    <span>Profile</span>
                  </button>
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
                    <span className="text-sm"><img src={selectedCountry.flag} className="h-12 w-14"></img></span>
                    <span className="ml-2 text-sm font-medium">{selectedCountry.code}</span>
                    <span className="ml-1 text-gray-500"><RiArrowDropDownLine className="text-5xl" /></span>
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
                          <span className="text-xl"><img src={country.flag} className="h-5 w-7"></img></span>
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
                    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-3xl"
                  >
                    <FaRegBell />
                  </button>
                </div>

                {/* Profile Icon with Balance */}
                <div className="relative flex items-center ">
                  <button
                    onClick={toggleProfileMenu}
                    className="w-10 h-10 rounded-full  flex items-center justify-center text-3xl focus:outline-none"
                  >
                    <LuCircleUserRound />
                  </button>
                  <span className="ml-0 text-sm font-medium text-red-600">₹0</span>

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
              <IoIosSearch />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navbar */}
        <div className="flex justify-center py-1 bg-[#244856] text-center">
  <a href="#" className="text-white hover:text-red-500 px-1 text-[12px] sm:px-2 sm:text-sm md:px-3 md:text-lg lg:text-lg">
    Popular Categories
  </a>
  <a href="#" className="text-white hover:text-red-500 px-1 text-[12px] sm:px-2 sm:text-sm md:px-3 md:text-lg lg:text-lg">
    Top Stores
  </a>
  <a href="#" className="text-white hover:text-red-500 px-1 text-[12px] sm:px-2 sm:text-sm md:px-3 md:text-lg lg:text-lg">
    Coupon Codes
  </a>
  {/* <a href="#" className="text-white hover:text-red-500 px-1 text-[10px] sm:px-2 sm:text-sm md:px-3 md:text-lg lg:text-lg">
    Deal Zone
  </a> */}
  <a href="#" className="text-white hover:text-red-500 px-1 text-[12px] sm:px-2 sm:text-sm md:px-3 md:text-lg lg:text-lg">
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
