
import { Search, ChevronRight } from "lucide-react"
import Header from "../components/Header";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";


export default function MobileAndTablet() {
  return (
    <>
    <Header/>
    <div className=" min-h-screen bg-gray-50">
 
      {/* Breadcrumb & Header */}
      <div className="mx-auto   bg-[#BCCCDC] p-6 border-b">
        <div className="container text-sm text-gray-500 mb-2">Home / Coupon / Mobile</div>
        <h1 className="text-2xl font-bold">Mobile And Tablet</h1>
        <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.</p>
      </div>

    



      <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row lg:space-x-6 items-start mb-4">
  {/* Sidebar */}
  <div className="bg-[#1B4B5A] text-white p-6 rounded-lg w-full lg:w-1/4 mb-6 lg:mb-0">
    <h2 className="text-xl font-semibold mb-3">Top Stores in Mobile and Tablets</h2>
    <p className="text-sm mb-6 leading-relaxed">
      The best deals, offers, coupons & more than 1,350 offers you can find here.
    </p>
    <button className="border border-white text-white hover:bg-white/10 px-5 py-2 rounded">
      VIEW ALL STORES
    </button>
  </div>

  {/* Cards Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-grow bg-blue-100 p-6 rounded-lg">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="relative bg-white rounded-2xl shadow-lg p-6 text-center">
        {/* Store Logo */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded shadow-md p-3">
          <img
            src="https://via.placeholder.com/60"
            alt="Logo"
            className="w-16 h-16"
          />
        </div>

        {/* Card Content */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold">Amazon | 53 Offers</h2>
          <p className="mt-4 bg-[#4F93AD] text-white text-sm font-medium py-2 px-6 rounded-md inline-block">
            23% Cashback
          </p>
        </div>
      </div>
    ))}
  </div>
</div>



    <div className="flex gap-6">
      {/* Left Sidebar */}
      <div className="w-64 flex-shrink-0">
       

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filters</h3>
            <button className="text-blue-600 text-sm">Clear</button>
          </div>

          <div className="relative mb-4">
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.9 14.32A8 8 0 1114.32 12.9l4.387 4.387a1 1 0 01-1.415 1.414L12.9 14.32zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" /></svg>
            <input type="text" placeholder="Search" className="pl-10 w-full border border-gray-300 rounded py-2" />
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm">
                Mobile
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm">
                Accessories
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Product Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.name} className="flex justify-between text-sm">
                  <span>{category.name}</span>
                  <span className="text-gray-500">{category.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
  <h3 className="font-semibold mb-3 text-lg">Price</h3>

  {/* Range Slider */}
  <div className="relative mb-4">
    <input type="range" min="100" max="2500" defaultValue="100" step="50" className="w-full appearance-none h-1 bg-gray-300 rounded outline-none cursor-pointer" />
  </div>

  {/* Min & Max Inputs */}
  <div className="flex justify-between items-center">
    <div className="text-center">
      <label className="block text-sm text-gray-600 mb-1">Min Price</label>
      <input type="text" defaultValue="100" className="w-24 border border-gray-300 rounded-full py-1 px-3 text-center" />
    </div>
    <div className="text-center">
      <label className="block text-sm text-gray-600 mb-1">Max Price</label>
      <input type="text" defaultValue="1250" className="w-24 border border-gray-300 rounded-full py-1 px-3 text-center" />
    </div>
  </div>
</div>


          <div>
            <h3 className="font-semibold mb-3">Brands</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.name} className="flex justify-between text-sm">
                  <span>{brand.name}</span>
                  <span className="text-gray-500">{brand.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
 
    
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center ">
          <div className="flex gap-4">
  {tabs.map((tab) => (
    <button
      key={tab.name}
      className={`text-sm font-medium px-4 py-2 rounded hover:bg-gray-200 ${
        tab.active ? "text-blue-600" : "text-gray-500"
      }`}
    >
      {tab.name} ({tab.count})
    </button>
  ))}
</div>

            <select className="text-sm border rounded-md px-2 py-1">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
<Subscribe/>
<Footer/>
</>
  )
}

function OfferCard() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
    <div className="flex flex-col items-center gap-4">
      {/* Image */}
      <img
        src="https://v0.dev/placeholder.svg?height=40&width=40"
        alt="Amazon"
        className="w-10 h-10"
      />
  
      {/* Title and Description */}
      <div >
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
        <button className="text-sm text-[#5396AF] hover:underline">Show Details</button>
        <button className="text-sm text-[#5396AF] hover:underline ">Share</button>
      </div>
    </div>
  </div>
 
  )
}

const categories = [
  { name: "Mobile & Tablets", count: 345 },
  { name: "Laptops", count: 145 },
  { name: "Beauty & Health", count: 254 },
  { name: "Food & Drinks", count: 190 },
  { name: "Fashion", count: 122 },
  { name: "Travel", count: 109 },
]

const brands = [
  { name: "Nike", count: 89 },
  { name: "Puma", count: 187 },
  { name: "Gucci", count: 66 },
  { name: "Adidas", count: 44 },
]

const tabs = [
  { name: "ALL", count: 488, active: true },
  { name: "Cashback", count: 388, active: false },
  { name: "Coupons", count: 147, active: false },
  { name: "Deals", count: 243, active: false },
]

