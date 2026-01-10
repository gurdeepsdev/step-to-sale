// import { useEffect, useState } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import { getAllbrands } from "../utils/api";
// import { useParams, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const PopularStores = () => {
//   const [coupons, setCoupons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCoupons = async () => {
//       const data = await getAllbrands();
//       console.log("data", data);
//       if (Array.isArray(data) && data.length > 0) {
//         setCoupons(data);
//       }
//       setLoading(false);
//     };

//     fetchCoupons();
//   }, []);
//   console.log("fdf", coupons);
//   const [emblaRef] = useEmblaCarousel({
//     loop: false, // Disable infinite loop
//     align: "start", // Align items to the start
//     dragFree: true, // Enable drag-free mode
//     slidesToScroll: 2, // Scroll two slides at a time
//   });

//   const [showAll, setShowAll] = useState(false);

//   // Show only 10 initially, show all when `showAll` is true
//   const displayedCoupons = showAll ? coupons : coupons.slice(0, 10);

//   const handleSelectCoupon = (coupon_code) => {
//     navigate(`/Offers/${coupon_code}`);
//     console.log("ff", coupon_code);
//   };

//   const handleSelectViewall = () => {
//     navigate("/NewOffers");
//   };
//   console.log("displayedCoupons", displayedCoupons);
//   return (
//     <div className="bg-white py-12 px-6 md:px-16 lg:px-16 mx-0 md:mx-16 lg:mx-16">
//       {/* Header Section */}
//       <div className="text-center mb-8">
//         <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900">
//           Popular Stores
//         </h2>
//         <p className="text-gray-600 text-sm md:text-lg lg:text-lg">
//           Explore Top Deals from Your Favorite Stores—Your Savings Start Here!
//         </p>
//       </div>

//       {/* Slider Section for small screens (only visible on mobile) */}
//       <div className="block lg:hidden overflow-hidden" ref={emblaRef}>
//         <div className="flex space-x-4">
//           {coupons.map((store) => (
//             <Link to={`/OffersDetails/${store.title}`} key={store.id}>
//               <div className="group relative border rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:bg-[#874F42] transition">
//                 <img
//                   src={store.img}
//                   alt={`${store.img} Logo`}
//                   className="h-12 mb-4 group-hover:opacity-0 transition-opacity object-contain"
//                 />
//                 <p className="font-semibold border border-gray-400 rounded-full px-4 transition-opacity group-hover:opacity-0 whitespace-nowrap">
//                   {store.total_count} Offers
//                   {/* {store.offer} */}
//                   {/* {store.currency}{" "} */}
//                   {/* {store.payout_model === "percentage" ? `${store.payout}%` : `Rs. ${store.payout}`}   */}
//                 </p>
//                 <p className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
//                   {/* {store.countries}  */}
//                   Get Offers
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Grid Section for larger screens (only visible on larger screens) */}
//       <div className="hidden lg:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//         {displayedCoupons.map((store) => (
//           <Link to={`/OffersDetails/${store.title}`} key={store.id}>
//             <div
//               key={store.id}
//               className="group relative border rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:bg-[#874F42] transition">
//               <img
//                 src={store.img}
//                 alt={`${store.img} Logo`}
//                 className="h-12 mb-4 group-hover:opacity-0 transition-opacity object-contain"
//               />
//               <p className="font-semibold border border-gray-400 rounded-full px-4 transition-opacity group-hover:opacity-0">
//                 {store.total_count} Offers{" "}
//               </p>
//               <p className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
//                 {/* {store.countries} */}
//                 Get Offers
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* Button */}
//       <div className="mt-8 text-center">
//         <button
//           className="px-3 md:px-6 lg:px-6 py-1 md:py-2 lg:py-2 border border-gray-800 text-gray-800 text-sm md:text-base lg:text-base rounded-full hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition"
//           onClick={() => handleSelectViewall()}>
//           See All Stores
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PopularStores;

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getAllbrands } from "../utils/api";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PopularStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    slidesToScroll: 1,
  });

  useEffect(() => {
    const fetchStores = async () => {
      const data = await getAllbrands();
      if (Array.isArray(data)) setStores(data);
      setLoading(false);
    };
    fetchStores();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (loading) return null;

  return (
    <div className="bg-white py-14 px-4 md:px-12 relative">
      {/* HEADER */}
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
        Popular Stores
      </h2>

      {/* LEFT BUTTON */}
      <button
        onClick={scrollPrev}
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2
                     w-9 h-9 sm:w-10 sm:h-10
                     rounded-full border bg-white z-10 shadow">
        ←
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={scrollNext}
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2
                     w-9 h-9 sm:w-10 sm:h-10
                     rounded-full border bg-white z-10 shadow">
        →
      </button>

      {/* CAROUSEL */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6">
          {stores.map((store) => (
            <Link
              to={`/OffersDetails/${store.title}`}
              key={store.id}
              className="min-w-[220px]">
              <div className="rounded-2xl border border-red-400 bg-red-50 p-5 flex flex-col items-center gap-4">
                {/* LOGO BOX */}
                <div className="bg-red-600 rounded-xl w-full h-28 flex items-center justify-center">
                  <img
                    src={store.img}
                    alt={store.title}
                    className="h-14 object-contain"
                  />
                </div>

                {/* OFFER PILL */}
                <div className="bg-white border rounded-md px-6 py-2 text-sm font-medium shadow-sm">
                  Upto {store.total_count ?? 0}%
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularStores;
