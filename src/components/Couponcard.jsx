import  { useState,useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getAllCoupons } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";



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

const RelatedCoupons = (category) => {

  const [emblaRef] = useEmblaCarousel({ loop: true });
  const navigate = useNavigate();
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

        const filteredCoupons = coupons.filter((coupon) => {
          try {
            const couponCategories = JSON.parse(coupon.categories); // Convert string to array
            return couponCategories[0].includes(category.category); // Check if category exists
          } catch (error) {
            console.error("Error parsing categories:", error);
            return false; // Skip invalid data
          }
        });

        const handleSelectCoupon = (slug) => {
          navigate(`/CouponsDetails/${slug}`);
     
        };
     


  return (
    <div className="p-6">
    <h2 className="text-lg font-semibold mb-6 text-center">Related Coupons</h2>
            {/* <p className="text-gray-400 text-xs">{coupon.valid}</p> */}

            <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        coupons && coupons.length > 0 ? (
          <>
            {/* Desktop View */}
            <div className="hidden lg:grid grid-cols-3 gap-6 px-6 lg:px-16"   
            >
              {filteredCoupons.map((coupon) => (
                <div key={coupon.id} className="border rounded-lg shadow-sm p-4 text-center" onClick={() => handleSelectCoupon(coupon.title)}>
                  <div className="flex justify-center mb-4">
                    <img
                      src={coupon.logo_url}
                      alt={coupon.logo_url}
                      className="h-8 object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {coupon.payout_model === "percentage" ? `${coupon.payout}%` : `${coupon.currency}. ${coupon.payout}`}  
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {stripHtmlTags(coupon.description)}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="lg:hidden overflow-hidden px-4"  ref={emblaRef}>
              <div className="flex space-x-4">
                {filteredCoupons.map((coupon) => (
                  <div key={coupon.id} className="min-w-full border rounded-lg shadow-sm p-4 text-center" onClick={() => handleSelectCoupon(coupon.title)}>
                    <div className="flex justify-center mb-4">
                      <img
                        src={coupon.logo_url}
                        alt={coupon.logo_url}
                        className="h-12 object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {coupon.payout_model === "percentage" ? `${coupon.payout}%` : `Rs. ${coupon.payout}`}  
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {stripHtmlTags(coupon.description)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">No coupons available</div>
        )
      )}
    </div> 

    </div>
  );
};

export default RelatedCoupons;
