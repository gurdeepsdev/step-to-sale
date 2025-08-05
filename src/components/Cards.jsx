import useEmblaCarousel from "embla-carousel-react";
import { useNavigate } from "react-router-dom";
const TrendingCategories = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      title: "Fashion",
      slug: "ecommerce",
      discount: "80% Off on Fashion",
      image: "/img/card1.webp", // Replace with your image paths
      button: "Get Deal",
    },
    {
      id: 2,
      title: "Mobile & Tablets",
      slug: "Electronics",
      discount: "60% Off on Gadget",
      image: "/img/card2.webp", // Replace with your image paths
      button: "Get Deal",
    },
    {
      id: 4,
      title: "Food & Dining",
      slug: "Food-&-Dining",
      discount: "Upto 8% Rewards",
      image: "/img/card.webp", // Replace with your image paths
      button: "Get Deal",
    },
    {
      id: 3,
      title: "health & cosmetic",
      slug: "health",
     
      discount: "60% Off on Order",
      image: "/img/card3.webp", // Replace with your image paths
      button: "Get Deal",
    },
  ];



  // Embla Carousel Hook
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false, //
  });

  const slug = "All";


  const getDeal = (categoryName) => {
    navigate(`/CouponFilters/${categoryName}`)

  };
  

 
  return (
    <div className="bg-white px-4 py-8 lg:px-16 lg:py-12">
      {/* Heading Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900">Trending Categories</h2>
        <p className="text-gray-600 text-sm md:text-lg lg:text-lg">
        Find the hottest discounts today and maximize your shopping experience with exclusive offers on all your favorite products and services.
        </p>
      </div>

      {/* Slider for Mobile Screens */}
      <div className="lg:hidden overflow-hidden" ref={emblaRef}>
  <div className="flex gap-x-4 px-4">
    {categories.map((category) => (
      <div
        key={category.id}
        className="min-w-[70%] sm:min-w-[40%] bg-[#90AEAE] rounded-lg shadow-lg p-6 flex flex-col items-center"
      >
        {/* Image */}
        <div className="relative group mb-4">
          <img
            src={category.image}
            alt={category.title}
            className="w-28 h-28 rounded-full object-cover transition-transform duration-300 hover:shadow-xl hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>

        {/* Title */}
        <h3 className="text-white">{category.title}</h3>

        {/* Discount */}
        <p className="text-white mt-2 text-lg font-semibold">{category.discount}</p>

        {/* Spacer to push the button to the bottom */}
        <div className="flex-grow"></div>
<br/>
        {/* Button */}
        <button 
onClick={() => getDeal(category.slug)}
        className="px-3 md:px-6 lg:px-6 py-1 md:py-2 lg:py-2 text-sm md:text-base lg:text-base border border-gray-800 text-gray-800 bg-white rounded-full hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition mt-auto">
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
            <button 

onClick={() => getDeal(category.slug)}
            className="px-3 md:px-6 lg:px-6 py-1 md:py-2 lg:py-2 text-sm md:text-base lg:text-base border border-gray-800 bg-white text-gray-800 rounded-full hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition">
              {category.button}
            </button>
          </div>
        ))}
      </div>

      {/* Button Section */}
      <div className="mt-8 text-center">
        <button className="px-3 md:px-6 lg:px-6 py-1 md:py-2 lg:py-2 border border-gray-800 text-sm md:text-base lg:text-base text-gray-800 rounded-full hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition"
              onClick={() => getDeal(slug)}
>
          See More
        </button>
      </div>
    </div>
  );
};

export default TrendingCategories;

