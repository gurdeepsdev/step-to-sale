import React from "react";
import useEmblaCarousel from "embla-carousel-react";

const RelatedCoupons = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const coupons = [
    { id: 1, logo: "img/brand1", discount: "25% OFF", description: "Exclusive Offer - Get 25% OFF on Redmi Mobiles", valid: "Valid until 14 Feb 2025" },
    { id: 2, logo: "img/brand", discount: "23% OFF", description: "Exclusive Offer - Get 23% OFF on Realme Mobiles", valid: "Valid until 14 Feb 2025" },
    { id: 3, logo: "img/brand2", discount: "25% OFF", description: "Exclusive Offer - Get 25% OFF on Redmi Mobiles", valid: "Valid until 14 Feb 2025" },
    { id: 4, logo: "img/brand3", discount: "23% OFF", description: "Exclusive Offer - Get 23% OFF on Realme Mobiles", valid: "Valid until 14 Feb 2025" },
    { id: 5, logo: "img/brand4", discount: "25% OFF", description: "Exclusive Offer - Get 25% OFF on Redmi Mobiles", valid: "Valid until 14 Feb 2025" },
    { id: 6, logo: "img/brand1", discount: "23% OFF", description: "Exclusive Offer - Get 23% OFF on Realme Mobiles", valid: "Valid until 14 Feb 2025" },
  ];

  return (
    <div className="p-6">
    <h2 className="text-lg font-semibold mb-6 text-center">Related Coupons</h2>
    
    {/* Desktop View */}
    <div className="hidden lg:grid grid-cols-3 gap-6 px-6 lg:px-16"> {/* Increased padding */}
      {coupons.map((coupon) => (
        <div key={coupon.id} className="border rounded-lg shadow-sm p-4 text-center">
          <div className="flex justify-center mb-4">
            <img
              src={`/${coupon.logo}.png`}
              alt={coupon.logo}
              className="h-8 object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold mb-2">{coupon.discount}</h3>
          <p className="text-gray-600 text-sm mb-4">{coupon.description}</p>
          <p className="text-gray-400 text-xs">{coupon.valid}</p>
        </div>
      ))}
    </div>
  

   {/* Mobile View (Slider) */}
<div className="lg:hidden overflow-hidden px-4" ref={emblaRef}>
  <div className="flex space-x-4">
    {coupons.map((coupon) => (
      <div key={coupon.id} className="min-w-full border rounded-lg shadow-sm p-4 text-center">
        <div className="flex justify-center mb-4">
          <img
            src={`/${coupon.logo}.png`}
            alt={coupon.logo}
            className="h-12 object-contain"
          />
        </div>
        <h3 className="text-2xl font-bold mb-2">{coupon.discount}</h3>
        <p className="text-gray-600 text-sm mb-4">{coupon.description}</p>
        <p className="text-gray-400 text-xs">{coupon.valid}</p>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default RelatedCoupons;
