import React from "react";
import useEmblaCarousel from "embla-carousel-react";

const couponsData = [
  {
    id: 1,
    title: "50% off",
    descriptionLine1: "up to ₹150 on all restaurants |",
    descriptionLine2: "Valid For New Users",
    brand: "ZOMATO",
    backgroundImage: "/img/coupon.png",
  },
  {
    id: 2,
    title: "50% off",
    descriptionLine1: "up to ₹150 on all restaurants |",
    descriptionLine2: "Valid For New Users",
    brand: "ZOMATO",
    backgroundImage: "/img/coupon.png",
  },
  {
    id: 3,
    title: "50% off",
    descriptionLine1: "up to ₹150 on all restaurants |",
    descriptionLine2: "Valid For New Users",
    brand: "ZOMATO",
    backgroundImage: "/img/coupon.png",
  },
  {
    id: 4,
    title: "50% off",
    descriptionLine1: "up to ₹150 on all restaurants |",
    descriptionLine2: "Valid For New Users",
    brand: "ZOMATO",
    backgroundImage: "/img/coupon.png",
  },
  {
    id: 5,
    title: "50% off",
    descriptionLine1: "up to ₹150 on all restaurants |",
    descriptionLine2: "Valid For New Users",
    brand: "ZOMATO",
    backgroundImage: "/img/coupon.png",
  },
  {
    id: 6,
    title: "50% off",
    descriptionLine1: "up to ₹150 on all restaurants |",
    descriptionLine2: "Valid For New Users",
    brand: "ZOMATO",
    backgroundImage: "/img/coupon.png",
  },
];

const Coupons = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

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
      <div className="block lg:hidden overflow-hidden" ref={emblaRef}>
        <div className="flex space-x-4">
          {couponsData.map((coupon) => (
            <div
              key={coupon.id}
              className="flex-shrink-0 w-[80%] p-4 rounded-lg border hover:shadow-lg"
              style={{ backgroundImage: `url(${coupon.backgroundImage})` }}
            >
              <div className="relative bg-cover bg-center text-white p-2 flex items-center">
                {/* Left Section */}
                <div className="flex flex-col items-center py-2 px-2 rotate-[270deg]">
                  <span className="text-sm uppercase">{coupon.brand}</span>
                </div>
                {/* Right Section */}
                <div className="flex-1 py-2 px-0 rounded-lg">
                  <h3 className="text-[14px] font-bold">{coupon.title}</h3>
                  <p className="text-[10px] lg:text-[12px]">
                    {coupon.descriptionLine1}
                    <br />
                    {coupon.descriptionLine2}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Section for Larger Screens */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {couponsData.map((coupon) => (
          <div
            key={coupon.id}
            className="relative bg-cover bg-center text-white p-4 border hover:shadow-lg"
            style={{ backgroundImage: `url(${coupon.backgroundImage})` }}
          >
            <div className="flex items-center">
              {/* Left Section */}
              <div className="flex flex-col items-center py-2 px-2 rotate-[270deg]">
                <span className="text-sm uppercase">{coupon.brand}</span>
              </div>
              {/* Right Section */}
              <div className="flex-1 py-2 px-0 rounded-lg">
                <h3 className="text-2xl font-bold">{coupon.title}</h3>
                <p className="text-[10px] lg:text-[12px]">
                  {coupon.descriptionLine1}
                  <br />
                  {coupon.descriptionLine2}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-8 text-center">
        <button className="px-3 md:px-6 lg:px-6 py-1 md:py-2 lg:py-2 text-sm md:text-base lg:text-base border border-gray-700 text-gray-700 hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition rounded-full">
          See More
        </button>
      </div>
    </section>
  );
};

export default Coupons;
