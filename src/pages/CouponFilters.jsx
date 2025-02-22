
import { Search, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAllcategoreCoupons } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";

export default function MobileAndTablet() {
  const { categoryName } = useParams(); // Get slug from URL
  console.log("ss",categoryName)

  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchCoupons = async () => {
    //         const data = await getAllCoupons();
    //         if (data.success) {
    //             setCoupons(data.data);
    //         }
    //         setLoading(false);
    //     };

    //     fetchCoupons();
    // }, []);
useEffect(() => {
        const fetchCoupon = async () => {
            const data = await getAllcategoreCoupons(categoryName);
            if (data.success) {
              setCoupons(data.data);
            }
            setLoading(false);
        };

        fetchCoupon();
    }, []);
console.log("coupon",coupons)

    // if (loading) return <h2>Loading Coupons...</h2>;

const handleFilterSelection = (e, categoryName) => {
  if (e.target.checked) {
    setSelectedFilters([...selectedFilters, categoryName]);
  } else {
    setSelectedFilters(selectedFilters.filter((item) => item !== categoryName));
  }
};

const [selectedBrands, setSelectedBrands] = useState([]);

const handleBrandFilterSelection = (e, brandName) => {
  if (e.target.checked) {
    setSelectedBrands([...selectedBrands, brandName]);
  } else {
    setSelectedBrands(selectedBrands.filter((item) => item !== brandName));
  }
};


  return (
    <>
      <Header />
      <div className=" min-h-screen bg-gray-50">
        {/* Breadcrumb & Header */}
        <div className="mx-auto   bg-[#BCCCDC] p-6 border-b">
            <div className="container mx-auto px-0 md:px-4 lg:px-4">
          <div className="container text-sm text-gray-500 mb-2">
            Home / Coupon / Mobile
          </div>
          <h1 className="text-2xl font-bold">Mobile And Tablet</h1>
          <p className="text-gray-500 text-sm">
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.
          </p>
        </div></div>


        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row  items-start mb-4">
            {/* Sidebar */}
            <div className="bg-[#1B4B5A] text-white p-8  w-full lg:w-1/4 mb-6 lg:mb-0 lg:sticky lg:top-6">
              <h2 className="text-xl font-semibold mb-3">
                Top Stores in Mobile and Tablets
              </h2>
              <p className="text-sm mb-6 leading-relaxed">
                The best deals, offers, coupons & more than 1,350 offers you can
                find here.
              </p>
              <button className="border border-white text-white hover:bg-white/10 px-5 py-2 rounded w-full sm:w-auto">
                VIEW ALL STORES
              </button>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-grow bg-blue-100 p-4 md:p-8 lg:p-8  w-full">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative bg-white  shadow-lg p-6 text-center mt-6"
                >
                  {/* Store Logo */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded shadow-md p-3">
                    <img
                      src="/img/brand1.png"
                      alt="Logo"
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="mt-12">
                    <h2 className="text-sm md:text-lg lg:text-lg font-semibold">
                      Amazon | 53 Offers
                    </h2>
                    <p className="mt-4 bg-[#4F93AD] text-white text-[10px] md:text-sm lg:text-sm font-medium py-1 px-2 md:px-6 lg:px-6 md:py-2 lg:py-2 rounded-md inline-block">
                      23% Cashback
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            {/* Mobile Filter Toggle Button and Sort Button */}
            <div className="flex  md:flex-row justify-between gap-4 md:order-1 mb-4 md:mb-0">
              {/* Mobile Filter Toggle Button */}
              <button
                className="md:hidden bg-[#4F93AD] text-white text-sm px-4 py-1 md:py-2 lg:py-2 rounded-lg"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>

              {/* Sort Button */}
              <select className="text-sm border bg-[#4F93AD] text-white rounded-md px-2 py-1 md:py-2 lg:py-2 md:hidden">
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>

            {/* Left Sidebar (Visible on larger screens) */}
            <div
              className={`w-64 flex-shrink-0 fixed inset-y-0 left-0 bg-white p-4 shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
                showFilters ? "translate-x-0 z-50" : "-translate-x-full"
              } md:z-0`}
            >
              <div className="flex justify-between items-center mb-4 border-b border-dashed border-grey-700">
                <h3 className="font-semibold">Filters</h3>
                <span className="hover:underline sm:block hidden">clear</span>
                <button
                  className="text-blue-600 text-sm md:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  ✕ Close
                </button>
              </div>


              {/* Filter Content */}
              <div className="relative mb-4">
                <svg
                  className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32A8 8 0 1114.32 12.9l4.387 4.387a1 1 0 01-1.415 1.414L12.9 14.32zM8 14a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 w-full border border-gray-300 rounded-full py-1"
                />
              </div>

              {/* Filter Sections */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Product Categories</h3>
                <div className="space-y-2">
  {categories.map((category) => (
    <div key={category.name} className="flex items-center justify-between text-sm">
      {/* Checkbox for selecting filter */}
      <label className="flex items-center gap-2">
        <input 
          type="checkbox" 
          className="form-checkbox text-[#4F93AD]" 
          value={category.name}
          onChange={(e) => handleFilterSelection(e, category.name)}
        />
        <span>{category.name}</span>
      </label>
      <span className="text-gray-500">{category.count}</span>
    </div>
  ))}
</div>

              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-lg">Price</h3>
                {/* Range Slider */}
                <div className="relative mb-4">
                  <input
                    type="range"
                    min="100"
                    max="2500"
                    defaultValue="100"
                    step="50"
                    className="w-full appearance-none h-1 bg-gray-300 rounded outline-none cursor-pointer"
                  />
                </div>

                {/* Min & Max Inputs */}
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <label className="block text-sm text-gray-600 mb-1">
                      Min Price
                    </label>
                    <input
                      type="text"
                      defaultValue="100"
                      className="w-24 border border-gray-300 rounded-full py-1 px-3 text-center"
                    />
                  </div>
                  <div className="text-center">
                    <label className="block text-sm text-gray-600 mb-1">
                      Max Price
                    </label>
                    <input
                      type="text"
                      defaultValue="1250"
                      className="w-24 border border-gray-300 rounded-full py-1 px-3 text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Brand Filters */}
              <div>
                <h3 className="font-semibold mb-3">Brands</h3>
                <div className="space-y-2">
  {brands.map((brand) => (
    <div key={brand.name} className="flex items-center justify-between text-sm">
      {/* Checkbox for selecting brand filter */}
      <label className="flex items-center gap-2">
        <input 
          type="checkbox" 
          className="form-checkbox text-[#4F93AD]" 
          value={brand.name}
          onChange={(e) => handleBrandFilterSelection(e, brand.name)}
        />
        <span>{brand.name}</span>
      </label>
      <span className="text-gray-500">{brand.count}</span>
    </div>
  ))}
</div>

              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex justify-between items-center">
                  {/* Tabs Container */}
                  <div className="flex gap-4 overflow-x-auto md:overflow-x-visible">
                    {tabs.map((tab) => (
                      <button
                        key={tab.name}
                        className={`text-sm font-medium px-4 py-2 rounded hover:bg-gray-200 ${
                          tab.active ? "text-blue-600" : "text-gray-500"
                        }`}
                      >
                        {tab.name}({tab.count})
                      </button>
                    ))}
                  </div>

                  {/* Sort Dropdown (Visible on mobile, hidden on larger screens) */}
                  <select className="text-sm border rounded-md px-2 py-1 md:block hidden">
                    <option>Newest</option>
                    <option>Oldest</option>
                  </select>
                </div>
              </div>

              {/* Offer Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <OfferCard key={i} />
                ))}
              </div>

              <button className="underline rounded px-4 py-2 w-full mt-6 text-center">
                Show More
              </button>
            </div>
          </div>
        </div>
      </div>
      <Subscribe />
      <Footer />
    </>
  );
}

function OfferCard() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Image */}
        <img
          src="/img/brand1.png"
          alt="Amazon"
          className=""
        />

        {/* Title and Description */}
        <div>
          <h3 className="font-semibold mb-1">26% OFF on Mobiles</h3>
          <p className="text-sm text-gray-500 mb-2">
            Amazon Coupons, Latest Coupons & best type 26% On Mobile Mobiles
          </p>
          <p className="text-sm text-gray-500">Valid Till: 28 January 2025</p>
        </div>
        <button className="bg-[#5396AF]  text-white hover:text-black font-medium px-4 py-1 rounded">
          Get Deal
        </button>
        <span className="w-full border-t" />
        {/* Buttons */}
        <div className="flex justify-between items-center w-full">
          <button className="text-sm text-[#5396AF] hover:underline">
            Show Details
          </button>
          <button className="text-sm text-[#5396AF] hover:underline ">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

const categories = [
  { name: "Mobile & Tablets", count: 345 },
  { name: "Laptops", count: 145 },
  { name: "Beauty & Health", count: 254 },
  { name: "Food & Drinks", count: 190 },
  { name: "Fashion", count: 122 },
  { name: "Travel", count: 109 },
];

const brands = [
  { name: "Nike", count: 89 },
  { name: "Puma", count: 187 },
  { name: "Gucci", count: 66 },
  { name: "Adidas", count: 44 },
];

const tabs = [
  { name: "ALL", count: 488, active: true },
  { name: "Cashback", count: 388, active: false },
  { name: "Coupons", count: 147, active: false },
  { name: "Deals", count: 243, active: false },
];

