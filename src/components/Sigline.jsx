import React from 'react';

const SignupBanner = () => {
  return (
    <div className="max-w-container mx-auto bg-[#244856] py-4 px-2">
      {/* Content Wrapper */}
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-white text-sm md:text-xl lg:text-xl  font-semibold">
          Signup to earn CD Cashback every time you shop
        </h2>

        {/* Subtitle */}
        <p className="text-white mt-1 text-xs md:text-base lg:text-base">
          Lorem ipsum dolor sit amet consectetur. Sed sed eu sit consectetur.
        </p>

        {/* Button */}
        <button className="mt-2 bg-[#E74833] hover:bg-orange-600 text-white text-sm md:text-base font-semibold py-1 px-6 rounded-full transition duration-300">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignupBanner;
