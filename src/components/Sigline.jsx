import React from 'react';

const SignupBanner = () => {
  return (
    <div className="max-w-container mx-auto bg-[#244856] py-4 px-2">
      {/* Content Wrapper */}
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-white text-sm md:text-xl lg:text-xl  font-semibold">
        Join us for instant cashback!
        </h2>

        {/* Subtitle */}
        <p className="text-white mt-1 text-xs md:text-base lg:text-base">
        Discover discounts, deals, and more—sign up to start your savings journey instantly!

</p>

        {/* Button */}
        <button className="mt-2 bg-[#E74833] hover:bg-white text-white hover:text-black  text-sm md:text-base lg:text-base font-semibold py-1 px-6 rounded-full transition duration-300">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignupBanner;
