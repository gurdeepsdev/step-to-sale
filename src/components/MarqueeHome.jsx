import React from "react";

const Marquee = () => {
  return (
    <div className="overflow-hidden bg-gray-100 py-4">
      <div className="flex space-x-8 animate-marquee whitespace-nowrap">
        {/* Duplicate the content for a seamless effect */}
        <div className="flex space-x-8">
          <span className="text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl">
            POPULAR CATEGORIES
          </span>
          <span className="text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl">
            TOP STORES
          </span>
          <span className="text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl">
            Coupon Codes
          </span>
          <span className="text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl">
            Deal Zone
          </span>
          <span className="text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl">
            Share and Earn
          </span>
        </div>
        <div className="flex space-x-8">
          <span className="text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl">
            POPULAR CATEGORIES
          </span>
          <span className="text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl">
            TOP STORES
          </span>
          <span className="text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl">
            Coupon Codes
          </span>
          <span className="text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl">
            Deal Zone
          </span>
          <span className="text-gray-800 font-bold text-xl md:text-2xl lg:text-3xl">
            Share and Earn
          </span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
