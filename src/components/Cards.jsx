// import useEmblaCarousel from "embla-carousel-react";
// import { useNavigate } from "react-router-dom";
// const TrendingCategories = () => {
//   const navigate = useNavigate();
//   const categories = [
//     {
//       id: 1,
//       title: "Fashion",
//       slug: "ecommerce",
//       discount: "80% Off on Fashion",
//       image: "/img/card1.webp", // Replace with your image paths
//       button: "Get Deal",
//     },
//     {
//       id: 2,
//       title: "Electronics",
//       slug: "Electronics",
//       discount: "60% Off on Gadget",
//       image: "/img/card2.webp", // Replace with your image paths
//       button: "Get Deal",
//     },
//     {
//       id: 4,
//       title: "Travel",
//       slug: "Travel",
//       discount: "Upto 8% Rewards",
//       image: "/img/card.webp", // Replace with your image paths
//       button: "Get Deal",
//     },
//     {
//       id: 3,
//       title: "health & cosmetic",
//       slug: "health",

//       discount: "60% Off on Order",
//       image: "/img/card3.webp", // Replace with your image paths
//       button: "Get Deal",
//     },
//   ];

//   // Embla Carousel Hook
//   const [emblaRef] = useEmblaCarousel({
//     loop: true,
//     align: "start",
//     skipSnaps: false, //
//   });

//   const slug = "All";

//   const getDeal = (categoryName) => {
//     navigate(`/CouponFilters/${categoryName}`)

//   };

//   return (
//     <div className="bg-white px-4 py-8 lg:px-16 lg:py-12">
//       {/* Heading Section */}
//       <div className="text-center mb-8">
//         <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900">Trending Categories</h2>
//         <p className="text-gray-600 text-sm md:text-lg lg:text-lg">
//         Find the hottest discounts today and maximize your shopping experience with exclusive offers on all your favorite products and services.
//         </p>
//       </div>

//       {/* Slider for Mobile Screens */}
//       <div className="lg:hidden overflow-hidden" ref={emblaRef}>
//   <div className="flex gap-x-4 px-4">
//     {categories.map((category) => (
//       <div
//         key={category.id}
//         className="min-w-[70%] sm:min-w-[40%] bg-[#90AEAE] rounded-lg shadow-lg p-6 flex flex-col items-center"
//       >
//         {/* Image */}
//         <div className="relative group mb-4">
//           <img
//             src={category.image}
//             alt={category.title}
//             className="w-28 h-28 rounded-full object-cover transition-transform duration-300 hover:shadow-xl hover:scale-105"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
//         </div>

//         {/* Title */}
//         <h3 className="text-white">{category.title}</h3>

//         {/* Discount */}
//         <p className="text-white mt-2 text-lg font-semibold">{category.discount}</p>

//         {/* Spacer to push the button to the bottom */}
//         <div className="flex-grow"></div>
// <br/>
//         {/* Button */}
//         <button
// onClick={() => getDeal(category.slug)}
//         className="px-3 md:px-6 lg:px-6 py-1 md:py-2 lg:py-2 text-sm md:text-base lg:text-base border border-gray-800 text-gray-800 bg-white rounded-full hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition mt-auto">
//           {category.button}
//         </button>
//       </div>
//     ))}
//   </div>
// </div>

//       {/* Grid Layout for Larger Screens */}
//       <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {categories.map((category) => (
//           <div
//             key={category.id}
//             className="bg-[#90AEAE] rounded-lg shadow-lg p-6 text-center flex flex-col items-center"
//           >
//             {/* Image */}
//             <div className="relative group">

//             <img
//               src={category.image}
//               alt={category.title}
//               className="w-50 h-50 rounded-full object-cover mb-4 transition-transform duration-300 hover:shadow-xl hover:scale-105"
//             />
//               <div className="absolute inset-0 bg-black bg-opacity-40 mb-4 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
// </div>

//             {/* Title */}
//             <h3 className="text-white">
//               {category.title}
//             </h3>
//             {/* Discount */}
//             <p className="text-white mt-2 mb-4 text-xl font-semibold">{category.discount}</p>
//             {/* Button */}
//             <button

// onClick={() => getDeal(category.slug)}
//             className="px-3 md:px-6 lg:px-6 py-1 md:py-2 lg:py-2 text-sm md:text-base lg:text-base border border-gray-800 bg-white text-gray-800 rounded-full hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition">
//               {category.button}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Button Section */}
//       <div className="mt-8 text-center">
//         <button className="px-3 md:px-6 lg:px-6 py-1 md:py-2 lg:py-2 border border-gray-800 text-sm md:text-base lg:text-base text-gray-800 rounded-full hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition"
//               onClick={() => getDeal(slug)}
// >
//           See More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TrendingCategories;

import { useState, useEffect, useRef } from "react";
import { getAllCategories } from "../utils/api";
import { Link } from "react-router-dom";

const TrendingCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllCategories();
      console.log("data", data);
      setCategories(data.data);
    };

    fetchCoupons();
  }, []);
  const AUTO_DELAY = 3000;

  const getVisibleCount = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    if (window.innerWidth < 1280) return 4;
    return 5;
  };

  const [visible, setVisible] = useState(getVisibleCount());
  const [index, setIndex] = useState(visible);
  const [animate, setAnimate] = useState(true);
  const timerRef = useRef(null);

  // 🔁 Update visible items on resize
  useEffect(() => {
    const handleResize = () => {
      const newVisible = getVisibleCount();
      setVisible(newVisible);
      setIndex(newVisible);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    ...categories.slice(-visible),
    ...categories,
    ...categories.slice(0, visible),
  ];

  const startAuto = () => {
    stopAuto();
    timerRef.current = setInterval(() => {
      setIndex((i) => i + 1);
    }, AUTO_DELAY);
  };

  const stopAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [visible]);

  useEffect(() => {
    if (index === categories.length + visible) {
      setTimeout(() => {
        setAnimate(false);
        setIndex(visible);
      }, 500);
    }

    if (index === 0) {
      setTimeout(() => {
        setAnimate(false);
        setIndex(categories.length);
      }, 500);
    }
  }, [index, visible]);

  useEffect(() => {
    if (!animate) requestAnimationFrame(() => setAnimate(true));
  }, [animate]);

  return (
    <div className="w-full py-12 sm:py-16 bg-white">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
        Categories
      </h2>

      <div
        className="relative overflow-hidden mx-auto px-4 sm:px-6"
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}>
        {/* Slider */}
        <div
          className={`flex ${
            animate ? "transition-transform duration-500 ease-in-out" : ""
          }`}
          style={{
            transform: `translateX(-${index * (100 / visible)}%)`,
          }}>
          {items.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / visible}%` }}>
              <Link
                key={item.id}
                to={`/CategoreNew/${item.categore
                  ?.toLowerCase()
                  ?.replace(/\s+/g, "-")}`}
                className="flex flex-col items-center text-center group">
                <div className="flex flex-col items-center">
                  <div className="w-56 h-56 rounded-full border overflow-hidden">
                    <img
                      src={item.icon}
                      alt={item.categore}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="lg:mt-4 mt-6 text-lg lg:text-xl font-semibold text-center capitalize">
                    {item.categore}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => setIndex((i) => i - 1)}
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2
                     w-9 h-9 sm:w-10 sm:h-10
                     rounded-full border bg-white z-10 shadow">
          ←
        </button>

        <button
          onClick={() => setIndex((i) => i + 1)}
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2
                     w-9 h-9 sm:w-10 sm:h-10
                     rounded-full border bg-white z-10 shadow">
          →
        </button>
      </div>
    </div>
  );
};

export default TrendingCategories;
