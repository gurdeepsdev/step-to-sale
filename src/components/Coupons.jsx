import  { useEffect, useState } from "react";
import { getAllCoupons } from "../utils/api";
import { useNavigate } from "react-router-dom";


import useEmblaCarousel from "embla-carousel-react";



const decodeHtmlEntities = (html) => {
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html").body.textContent || "";
};

const stripHtmlTags = (html) => {
  return decodeHtmlEntities(html)
    .replace(/<[^>]+>/g, "") // Remove HTML tags
    .replace(/\u00A0|&nbsp;/g, " ") // Convert &nbsp; or Unicode NBSP to a normal space
    .trim();
};


const Coupons = () => {
    const navigate = useNavigate();
  
  const  backgroundImage = "/img/coupon.png";

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });


      const [coupons, setCoupons] = useState([]);
      const [loading, setLoading] = useState(true);

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

            // Handle click on suggestion
     const handleSelectCoupon = (slug) => {
      navigate(`/CouponsDetails/${slug}`);
  
    };

    const handleSelectViewall = () => {
      navigate("/Coupontopcodes");
    };
    const [showAll, setShowAll] = useState(false);

    // Show only 10 initially, show all when `showAll` is true
    const displayedCoupons = showAll ? coupons : coupons.slice(0, 6);
  return (
    <section className="px-8   md:px-12 lg:px-20">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Top Coupons</h2>
        <p className="text-gray-700">
        Find the best discounts, limited-time offers, and more — all in one place!
        </p>
      </div>

      {/* Slider Section for Mobile Screens */}
  {/* Slider Section for Mobile Screens */}
<div className="block lg:hidden overflow-x-auto no-scrollbar -mx-4 px-4">
  <div className="flex gap-4">
    {coupons.map((coupon) => (
      <div
        key={coupon.id}
        onClick={() => handleSelectCoupon(coupon.title)}

        className="flex-shrink-0 w-[85%] bg-white rounded-lg border shadow p-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white space-y-2">
          {/* Title */}
          <div className="text-xs font-semibold uppercase">
            {coupon.title}
          </div>

          {/* Payout */}
          <div className="text-xl font-bold">
            {coupon.payout_model === "percentage" ? `${coupon.payout}%` : `Rs. ${coupon.payout}`}
          </div>

          {/* Description */}
          <p className="text-[10px] leading-tight">
            {stripHtmlTags(coupon.description)}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Grid Section for Larger Screens */}
      <div className="hidden lg:grid grid-cols-3 gap-6" >
  {displayedCoupons.map((coupon) => (
    <div
      key={coupon.id}
      onClick={() => handleSelectCoupon(coupon.title)}
      className="relative bg-cover bg-center text-white p-4 border hover:shadow-lg min-h-[120px] lg:min-h-[120px] flex flex-col justify-between"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
   {/* Fixed Placement: Left Section */}
<div className="flex flex-col items-center px-2 rotate-[270deg] absolute left-2 top-1/2 -translate-y-1/2 w-[50px] md:w-[90px] text-center"           
>
  <span className="text-xs uppercase whitespace-normal break-words leading-tight">
    {coupon.title}
  </span>
</div>


      {/* Fixed Placement: Right Section */}
      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <h3 className="text-2xl font-bold">
          {coupon.payout_model === "percentage" ? `${coupon.payout}%` : `Rs. ${coupon.payout}`}
        </h3>
        <p className="text-[10px] lg:text-[12px] w-full max-w-[150px] truncate">
          { stripHtmlTags(coupon.description)}
        </p>
      </div>
    </div>
  ))}
</div>



      {/* Button */}
      <div className="mt-8 text-center">
        <button className="px-3 md:px-6 lg:px-6 py-1 md:py-2 lg:py-2 text-sm md:text-base lg:text-base border border-gray-700 text-gray-700 hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition rounded-full"
           onClick={() => handleSelectViewall()}
>
          See More
        </button>
      </div>
    </section>
  );
};

export default Coupons;
