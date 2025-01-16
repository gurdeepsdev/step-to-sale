import React from "react";

const CouponAlert = () => {
  return (
    <div className="bg-[#90AEAE] text-white  py-4 md:py-8 lg:py-8 px-4">
    <div className=" mx-2 lg:mx-16 flex flex-col lg:flex-row items-center lg:gap-8">
      {/* Left: Image Section */}
      <div className="lg:w-1/3 flex justify-center lg:justify-start">
        <img
          src="/img/subscribe.png" // Replace with your image URL
          alt="Subscribe Illustration"
          className="w-56 h-auto lg:w-64"
        />
      </div>

      {/* Right: Centered Text and Form Section */}
      <div className="lg:w-2/3 flex flex-col justify-center items-center lg:items-end text-center lg:text-left">
        {/* Heading */}
        <h2 className="text-[18px] lg:text-2xl font-[500] mb-2 md:mb-4 lg:mb-4  text-center">
          Get The Latest & Best Coupon/Offer Alerts
        </h2>

        {/* Subtext */}
        <p className="text-[10px] lg:text-base leading-relaxed mb-2 md:mb-6 lg:mb-6 text-center">
          Get The Latest & Best Coupon/Offer Alerts
          Get The Latest & Best<br/> Coupon/Offer Alerts 
          Get The Latest & Best Coupon/Offer.
        </p>

        {/* Input and Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[28rem]">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow px-2 lg:px-10 py-1 rounded-full border border-gray-300 text-gray-800 focus:outline-none"
          />
          <button className="bg-[#E74833] hover:bg-white text-white hover:text-black font-medium px-4 text-sm md:text-base lg:text-base py-1 rounded-full">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CouponAlert;
