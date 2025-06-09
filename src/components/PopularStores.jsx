import  { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getAllCoupons } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";





const PopularStores = () => {
 
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

      useEffect(() => {
          const fetchCoupons = async () => {
              const data = await getAllCoupons();
              if (data.success) {
                  setCoupons(data.data);
              }
              setLoading(false);
          };
  
          fetchCoupons();
      }, []);

  
  const [emblaRef] = useEmblaCarousel({
    loop: false, // Disable infinite loop
    align: "start", // Align items to the start
    dragFree: true, // Enable drag-free mode
    slidesToScroll: 2, // Scroll two slides at a time
  });

  const [showAll, setShowAll] = useState(false);

  // Show only 10 initially, show all when `showAll` is true
  const displayedCoupons = showAll ? coupons : coupons.slice(0, 10);

  const handleSelectCoupon = (slug) => {
    navigate(`/CouponsDetails/${slug}`);

  };


  return (
    <div className="bg-white py-12 px-6 md:px-16 lg:px-16 mx-0 md:mx-16 lg:mx-16">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900">Popular Stores</h2>
        <p className="text-gray-600 text-sm md:text-lg lg:text-lg">
        Explore Top Deals from Your Favorite Stores—Your Savings Start Here!
        </p>
      </div>

      {/* Slider Section for small screens (only visible on mobile) */}
      <div className="block lg:hidden overflow-hidden" ref={emblaRef}>
        <div className="flex space-x-4">
          {coupons.map((store) => (
             <div
             key={store.id}
             className="group relative border rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:bg-[#874F42] transition"
           >
             <img
               src={store.logo_url}
               alt={`${store.logo_url} Logo`}
               className="h-12 mb-4 group-hover:opacity-0 transition-opacity object-contain"
             />
             <p className="font-semibold border border-gray-400 rounded-full px-4 transition-opacity group-hover:opacity-0 whitespace-nowrap">
               {/* {store.offer} */}
                {/* {store.currency}{" "} */}
               {store.payout_model === "percentage" ? `${store.payout}%` : `Rs. ${store.payout}`}  
             </p>
             <p className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity"                       onClick={() => handleSelectCoupon(store.title)}
             >
               {/* {store.countries}  */}
              Get Offers
             </p>
           </div>


          ))}
        </div>
      </div>

      {/* Grid Section for larger screens (only visible on larger screens) */}
      <div className="hidden lg:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {displayedCoupons.map((store) => (
        <div
        key={store.id}
        className="group relative border rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:bg-[#874F42] transition"
      >
        <img
          src={store.logo_url}
          alt={`${store.logo_url} Logo`}
          className="h-12 mb-4 group-hover:opacity-0 transition-opacity object-contain"
        />
        <p className="font-semibold border border-gray-400 rounded-full px-4 transition-opacity group-hover:opacity-0">
        {/* {store.currency}{" "} */}
        {store.payout_model === "percentage" ? `${store.payout}%` : `Rs. ${store.payout}`}         </p>
        <p className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity"   onClick={() => handleSelectCoupon(store.title)}
        >
          {/* {store.countries} */}
          Get Offers
          </p>
      </div>
      
        ))}
      </div>


      {/* Button */}
      <div className="mt-8 text-center">
        <button className="px-3 md:px-6 lg:px-6 py-1 md:py-2 lg:py-2 border border-gray-800 text-gray-800 text-sm md:text-base lg:text-base rounded-full hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition"
                    onClick={() => setShowAll(true)}
>
          See All Stores
        </button>
      </div>
    </div>
  );
};

export default PopularStores;

