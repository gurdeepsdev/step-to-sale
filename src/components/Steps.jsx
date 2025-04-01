import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

const HowItWorks = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  // Loading state to show skeleton before content
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to ensure smooth rendering
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-6 py-4 lg:px-16 lg:py-10 md:py-10 bg-white text-center">
      {isLoading ? (
        // ✅ Show Skeleton Loader to prevent CLS
        <div className="animate-pulse">
          <div className="mb-4 md:mb-12 lg:mb-12 flex items-center justify-center">
            <div className="w-1/3 h-[1px] bg-gray-300"></div>
            <div className="mx-2 md:mx-4 lg:mx-4 text-center border border-gray-300 rounded-full md:px-6 lg:px-6 py-2 w-40 h-10 bg-gray-200"></div>
            <div className="w-1/3 h-[1px] bg-gray-300"></div>
          </div>

          {/* Skeleton for Images */}
          <div className="grid grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded"></div>
              <div className="mt-4 w-32 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded"></div>
              <div className="mt-4 w-32 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded"></div>
              <div className="mt-4 w-32 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Actual Content */}
          <div className="mb-4 md:mb-12 lg:mb-12 flex items-center justify-center">
            <div className="w-1/3 h-[1px] bg-black"></div>
            <div className="mx-2 md:mx-4 lg:mx-4 text-center border border-black rounded-full md:px-6 lg:px-6 py-2">
              <h2 className="text-sm font-[500] lg:text-3xl text-gray-800">
                Step To Sale
              </h2>
              <p className="text-black mt-2 text-[8px] md:text-lg lg:text-lg whitespace-nowrap px-4">
                Your Gateway to Great Deals
              </p>
            </div>
            <div className="w-1/3 h-[1px] bg-black"></div>
          </div>

          <div>
            <h2 className="text-xl font-semibold lg:text-5xl md:text-5xl text-black-800 mb-4 md:mb-8 lg:mb-8">
              How it works with Step To Sale
            </h2>

            {/* Mobile Slider */}
            <div className="block lg:hidden overflow-hidden" ref={emblaRef}>
              <div className="flex space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex flex-col items-center w-[80%] sm:w-[40%]">
                    <img
                      src={`/img/step${step}.png`}
                      alt={`Step ${step}`}
                      width={"200px"} // ✅ Fix CLS: Set explicit width & height
                      height={"200px"}
                    />
                    <p className="mt-4 text-gray-600 text-sm px-2 lg:px-4 border border-dashed border-gray-400 p-2 rounded-md">
                      {step === 1
                        ? "Sign up and start shopping on Step To Sale"
                        : step === 2
                        ? "Cashback gets added to your account on every successful purchase"
                        : "Withdraw the amount to your bank account"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-3 gap-12">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <img
                    src={`/img/step${step}.png`}
                    alt={`Step ${step}`}
                    width={"200"} // ✅ Fix CLS: Set explicit width & height
                    height={"200"}
                  />
                  <p className="mt-4 text-gray-600 text-sm px-2 lg:px-4 border border-dashed border-gray-400 p-2 rounded-md">
                    {step === 1
                      ? "Sign up and start shopping on Step To Sale"
                      : step === 2
                      ? "Cashback gets added to your account on every successful purchase"
                      : "Withdraw the amount to your bank account"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HowItWorks;





