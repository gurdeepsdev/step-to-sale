import React from "react";
import Couponcard from "../components/Couponcard";
import Header from "../components/Header";
import { AiOutlineLike,AiOutlineDislike} from "react-icons/ai";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import { IoMdShare } from "react-icons/io";



const OfferCard = () => {
  return (
    <>
    <Header/>

    <div className="px-6 md:px-6 lg:px-6 md:px-12 lg:px-20 py-6 md:py-12 lg:py-12 bg-[#90AEAE] items-center">
  {/* Header */}
  <div className="flex justify-between items-center px-4 md:px-6 lg:px-6 py-4 mx-0 md:mx-16 lg:mx-16">
    <button className="text-white text-sm md:text-lg lg:text-lg font-medium flex items-center hover:underline">
      ← Go Back
    </button>
    <button className="text-white text-sm md:text-lg lg:text-lg font-medium flex items-center hover:underline gap-1">
    <span>Share</span><span><IoMdShare size={24}/></span>
    </button>
  </div>
  {/* Outer Container */}
  <div className="bg-white rounded-lg shadow-lg mx-0 md:mx-16 lg:mx-16">
    {/* Main Content */}
    <div className="flex flex-col md:flex-row">
      {/* Left Section (60%) */}
      <div className="md:w-3/5 px-4 py-6 md:px-6 lg:px-6 md:py-8 lg:py-8 border-r border-gray-300">
        <div className="text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon"
            className="w-36 mx-auto"
          />
          <h2 className="text-lg md:text-2xl lg:text-2xl font-bold mt-4 text-gray-800">
            Get 25% OFF on{" "}
            <span className="text-orange-500">Redmi Mobiles</span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Amazon Great Indian Sale - Get 25% OFF on Redmi Mobiles
          </p>
        </div>

        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center rounded-full">
            {/* Left Section: Button */}
            <button className="bg-blue-500 text-white px-6 py-3 rounded-l-full text-lg font-medium hover:bg-blue-600 transition">
              Show Coupon
            </button>
            {/* Right Section: Code */}
            <span className="bg-white text-blue-500 px-1 py-3 text-lg font-semibold border-t border-b border-r border-dotted border-blue-500 rounded-r-full">
              D8GH
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mt-6 leading-relaxed">
          <p>
            Offer's Details: Lorem ipsum dolor sit amet consectetur. Turpis ac
            pretium justo enim. Tellus at at cras aliquam ac.
          </p>
          <p className="mt-2 mb-2 text-center">Valid until 14 Feb 2025</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <span>Did it work? </span>

          {/* Yes Button */}
          <button className="flex items-center bg-green-300 text-green-600 px-2 py-1 rounded-md  text-sm font-medium hover:bg-green-600 hover:text-white transition">
            <AiOutlineLike className="w-5 h-5 mr-2" /> Yes
          </button>

          {/* No Button */}
          <button className="flex items-center bg-red-300 text-red-600 px-2 py-1 rounded-md shadow-md text-sm font-medium hover:bg-red-600 hover:text-white transition">
            <AiOutlineDislike className="w-5 h-5 mr-2" /> No
          </button>
        </div>
      </div>

      {/* Right Section (40%) */}
      <div className="md:w-2/5 px-6 py-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
          Terms and Conditions
        </h3>
        <ul className="text-sm text-gray-600 space-y-3 leading-relaxed list-disc list-inside">
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>
            Turpis ac pretium justo enim. Tellus at at cras aliquam ac.
          </li>
          <li>Tellus at at cras aliquam ac volutpat in hac.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Tellus ac pretium justo enim.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

    <Couponcard/>
    <Subscribe/>
    <Footer/>
    </>
  );
};

export default OfferCard;
