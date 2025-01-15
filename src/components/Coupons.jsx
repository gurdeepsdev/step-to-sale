import React from "react";

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
  return (
    <section className="p-8 py-12  md:px-12 lg:px-20 ">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Top Coupons</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur. Sed sed eu sit consectetur.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {couponsData.map((coupon) => (
          <div
            key={coupon.id}
            className="relative bg-cover bg-center text-white p-2  flex items-center space-x-0 border"
            style={{ backgroundImage: `url(${coupon.backgroundImage})` }}

          >
            {/* Left Section */}
            <div className="flex flex-col items-center py-2 px-2 lg:px-4 rotate-[270deg]" >
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
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 border border-gray-700 text-gray-700 hover:bg-[#E74833] hover:border-[#E74833] hover:text-white transition rounded-full">
          See More
        </button>
      </div>
    </section>
  );
};

export default Coupons;