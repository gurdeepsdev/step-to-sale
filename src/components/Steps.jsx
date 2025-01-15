import React from "react";
import useEmblaCarousel from "embla-carousel-react";

const HowItWorks = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: true, // Enable infinite loop for mobile slider
    align: "start", // Align to the start of each step
    dragFree: true, // Allow drag-free mode
  });

  return (
    <div className="px-6 py-4 lg:px-16 lg:py-10 md:py-10 bg-white text-center">
      <div className="mb-4 md:mb-12 lg:mb-12 flex items-center justify-center">
        {/* Left Line */}
        <div className="w-1/3 h-[1px] bg-black"></div>

        {/* Text Content with Rounded Border */}
        <div className="mx-2 md:mx-4 lg:mx-4 text-center border border-black rounded-full  md:px-6 lg:px-6 py-2">
          <h2 className="text-sm font-[500] lg:text-3xl text-gray-800">
            Step To Sale
          </h2>
          <p className="text-black mt-2 text-[8px] md:text-lg lg:text-lg whitespace-nowrap px-4">
            Your Gateway to Great Deals
          </p>
        </div>

        {/* Right Line */}
        <div className="w-1/3 h-[1px] bg-black"></div>
      </div>

      {/* How it works Section */}
      <div>
        <h2 className="text-xl font-semibold lg:text-5xl md:text-5xl text-black-800 mb-4 md:mb-8 lg:mb-8">
          How it works with Step To Sale
        </h2>

        {/* Slider Section for mobile screens */}
        <div className="block lg:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex space-x-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center w-[80%] sm:w-[40%]">
              <img
                src="/img/step2.png" // Replace with your actual image path
                alt="Sign Up & Shop"
                className=""
              />
              <p className="mt-4 text-gray-600 text-[8px] mt-2 px-2 lg:px-4 border border-dashed border-gray-400 p-2 rounded-md">
                Sign up and start shopping on Step To Sale
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center w-[80%] sm:w-[40%]">
              <img
                src="/img/step3.png" // Replace with your actual image path
                alt="Earn Cashback"
                className=""
              />
              <p className="mt-4 text-gray-600 text-[8px] mt-2 px-2 lg:px-4 border border-dashed border-gray-400 p-2 rounded-md">
                Cashback gets added to your account on every successful purchase
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center w-[80%] sm:w-[40%]">
              <img
                src="/img/step1.png" // Replace with your actual image path
                alt="Get Paid!"
                className=""
              />
              <p className="mt-4 text-gray-600 text-[8px] mt-2 px-2 lg:px-4 border border-dashed border-gray-400 p-2 rounded-md">
                Withdraw the amount to your bank account
              </p>
            </div>
          </div>
        </div>

        {/* Grid Section for larger screens */}
        <div className="hidden lg:grid grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center ">
            <img
              src="/img/step2.png" // Replace with your actual image path
              alt="Sign Up & Shop"
              className=""
            />
            <p className="mt-4 text-gray-600 text-sm mt-2 px-2 lg:px-4 border border-dashed border-gray-400 p-2 rounded-md">
              Sign up and start shopping on Step To Sale
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <img
              src="/img/step3.png" // Replace with your actual image path
              alt="Earn Cashback"
              className=""
            />
            <p className="mt-4 text-gray-600 text-sm mt-2 px-2 lg:px-4 border border-dashed border-gray-400 p-2 rounded-md">
              Cashback gets added to your account on every successful purchase
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <img
              src="/img/step1.png" // Replace with your actual image path
              alt="Get Paid!"
              className=""
            />
            <p className="mt-4 text-gray-600 text-sm mt-2 px-2 lg:px-4 border border-dashed border-gray-400 p-2 rounded-md">
              Withdraw the amount to your bank account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
