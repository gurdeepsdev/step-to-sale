import React from "react";
import useEmblaCarousel from "embla-carousel-react";

const PopularStores = () => {
  const stores = [
    { id: 1, name: "Amazon", logo: "/img/brand1.png", offers: 23, offer: "Upto 5.2%" },
    { id: 2, name: "Flipkart", logo: "/img/brand2.png", offers: 48, offer: "Upto 7%" },
    { id: 3, name: "Myntra", logo: "/img/brand3.png", offers: 15, offer: "Flat 3.9%" },
    { id: 4, name: "Nike", logo: "/img/brand4.png", offers: 30, offer: "Upto 10%" },
    { id: 5, name: "Puma", logo: "/img/brand5.png", offers: 18, offer: "Upto 4%" },
    { id: 6, name: "Adidas", logo: "/img/brand4.png", offers: 12, offer: "Upto 6%" },
  ];

  const [emblaRef] = useEmblaCarousel({
    loop: false, // Disable infinite loop
    align: "start", // Align items to the start
    dragFree: true, // Enable drag-free mode
    slidesToScroll: 2, // Scroll two slides at a time
  });

  return (
    <div className="bg-white py-12 px-6 md:px-16 lg:px-16 mx-0 md:mx-16 lg:mx-16">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900">Popular Stores</h2>
        <p className="text-gray-600 text-sm md:text-lg lg:text-lg">
          Lorem ipsum dolor sit amet consectetur. Sed sed eu sit consectetur.
        </p>
      </div>

      {/* Slider Section for small screens (only visible on mobile) */}
      <div className="block lg:hidden overflow-hidden" ref={emblaRef}>
        <div className="flex space-x-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="p-6 border rounded-lg shadow-md flex flex-col items-center justify-center  w-[90%] sm:w-[50%] md:w-[45%] lg:w-[30%] hover:bg-[#874F42] "
            >
              <img
                src={store.logo}
                alt={`${store.name} Logo`}
                className="h-12 mb-4"
              />
              <p className="text-gray-800 text-xs font-semibold border  rounded-full px-6 py-2 ">
                {store.offer}
              </p>
            </div>


          ))}
        </div>
      </div>

      {/* Grid Section for larger screens (only visible on larger screens) */}
      <div className="hidden lg:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stores.map((store) => (
          <div
            key={store.id}
            className="group relative border rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:bg-[#874F42] transition"
          >
            <img
              src={store.logo}
              alt={`${store.name} Logo`}
              className="h-12 mb-4 group-hover:opacity-0 transition-opacity"
            />
            <p className="font-semibold border border-gray-400 rounded-full px-4 hover:border-[#874F42] hover:text-white hover:bg-[#874F42]">
              {store.offer}
            </p>
            <p className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              {store.offers} Offers
            </p>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-8 text-center">
        <button className="px-6 py-2 border border-gray-800 text-gray-800 rounded-full hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition">
          See All Stores
        </button>
      </div>
    </div>
  );
};

export default PopularStores;