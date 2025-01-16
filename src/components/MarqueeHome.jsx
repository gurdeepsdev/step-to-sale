import React from "react";
import "./Marquee.css"; // Import custom CSS for the animation

const Footer = () => {
  return (
      <div className="overflow-hidden bg-[#244856] py-4">
        <div className="flex space-x-8 animate-marquee whitespace-nowrap">
          {/* Marquee Content */}
          <div className="flex space-x-8">
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
              POPULAR CATEGORIES
            </span>
            <span className="text-red-500 font-bold text-xl md:text-4xl lg:text-4xl">
              &#8226;
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
              TOP STORES
            </span>
            <span className="text-red-500 font-bold text-xl md:text-4xl lg:text-4xl">
              &#8226;
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
              Coupon Codes
            </span>
            <span className="text-red-500 font-bold text-xl md:text-4xl lg:text-4xl">
              &#8226;
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
              Deal Zone
            </span>
            <span className="text-red-500 font-bold text-xl md:text-4xl lg:text-4xl">
              &#8226;
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
              Share and Earn
            </span>
          </div>
          <span className="text-red-500 font-bold text-xl md:text-4xl lg:text-4xl">
              &#8226;
            </span>
          {/* Duplicate the content for seamless effect */}
          <div className="flex space-x-8">
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
              POPULAR CATEGORIES
            </span>
            <span className="text-red-500 font-bold text-xl md:text-2xl lg:text-3xl">
              &#8226;
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
              TOP STORES
            </span>
            <span className="text-red-500 font-bold text-xl md:text-2xl lg:text-3xl">
              &#8226;
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
              Coupon Codes
            </span>
            <span className="text-red-500 font-bold text-xl md:text-2xl lg:text-3xl">
              &#8226;
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
              Deal Zone
            </span>
            <span className="text-red-500 font-bold text-xl md:text-2xl lg:text-3xl">
              &#8226;
            </span>
            <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
              Share and Earn
            </span>
          </div>
        </div>
      </div>
  );
};

export default Footer;
