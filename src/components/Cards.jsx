import React from "react";
import useEmblaCarousel from "embla-carousel-react";

const TrendingCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Fashion",
      discount: "80% Off on Fashion",
      image: "/img/card1.png", // Replace with your image paths
      button: "Get Deal",
    },
    {
      id: 2,
      title: "Mobile & Tablets",
      discount: "60% Off on Gadget",
      image: "/img/card2.png", // Replace with your image paths
      button: "Get Deal",
    },
    {
      id: 3,
      title: "Beauty & Health",
      discount: "Upto 8% Rewards",
      image: "/img/card.png", // Replace with your image paths
      button: "Get Deal",
    },
    {
      id: 4,
      title: "Food & Dining",
      discount: "60% Off on Order",
      image: "/img/card3.png", // Replace with your image paths
      button: "Get Deal",
    },
  ];

  // Embla Carousel Hook
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  return (
    <div className="bg-white px-4 py-8 lg:px-16 lg:py-12">
      {/* Heading Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900">Trending Categories</h2>
        <p className="text-gray-600 text-sm md:text-lg lg:text-lg">
          Lorem ipsum dolor sit amet consectetur. Sed sed eu sit consectetur.
        </p>
      </div>

      {/* Slider for Mobile Screens */}
      <div className="lg:hidden overflow-hidden" ref={emblaRef}>
        <div className="flex space-x-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[80%] sm:min-w-[60%] bg-[#90AEAE] rounded-lg shadow-lg p-6 text-center flex flex-col items-center"
            >
              {/* Image */}
              <div className="relative group">

              <img
                src={category.image}
                alt={category.title}
                className="w-38 h-38 rounded-full object-cover mb-4 transition-transform duration-300 hover:shadow-xl hover:scale-105"
              />
                     <div className="absolute inset-0 bg-black bg-opacity-40 mb-4 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                     </div>
              {/* Title */}
              <h3 className="text-white">
                {category.title}
              </h3>
              {/* Discount */}
              <p className="text-white mt-2 mb-4 text-lg font-semibold ">{category.discount}</p>
              {/* Button */}
              <button className="px-4 py-2 border border-gray-800 text-gray-800 bg-white  rounded-full hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition">
                {category.button}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Layout for Larger Screens */}
      <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-[#90AEAE] rounded-lg shadow-lg p-6 text-center flex flex-col items-center"
          >
            {/* Image */}
            <div className="relative group">

            <img
              src={category.image}
              alt={category.title}
              className="w-50 h-50 rounded-full object-cover mb-4 transition-transform duration-300 hover:shadow-xl hover:scale-105"
            />
              <div className="absolute inset-0 bg-black bg-opacity-40 mb-4 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
</div>

            {/* Title */}
            <h3 className="text-white">
              {category.title}
            </h3>
            {/* Discount */}
            <p className="text-white mt-2 mb-4 text-xl font-semibold">{category.discount}</p>
            {/* Button */}
            <button className="px-4 py-2 border border-gray-800 bg-white text-gray-800 rounded-full hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition">
              {category.button}
            </button>
          </div>
        ))}
      </div>

      {/* Button Section */}
      <div className="mt-8 text-center">
        <button className="px-6 py-2 border border-gray-800 text-gray-800 rounded-full hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition">
          See More
        </button>
      </div>
    </div>
  );
};

export default TrendingCategories;