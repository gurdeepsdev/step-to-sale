import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../utils/api";

export default function CategorySection() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllCategories();
      console.log("data", data);
      setCategories(data.data);
    };

    fetchCoupons();
  }, []);
  const slug = "CategoreNew";

  // const getDeal = (categoryName) => {
  //   navigate(`/CouponNew/${categoryName}`)

  // };
  const getDeal = (categoryName) => {
    navigate("/CategoreNew");
  };
  const getDeals = (categoryName) => {
    navigate(`/CategoreNew/${categoryName.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div className="w-screen md:w-full max-w-4xl mx-auto p-2 bg-white rounded-lg shadow-md mt-0 md:mt-0 lg:mt-0">
      {/* <h2 className="text-xl font-semibold text-center mb-4">Popular Categories</h2> */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        {categories.map((category) => (
          <div
            key={category.title}
            onClick={() => getDeals(category.categore)}
            className="cursor-pointer hover:text-red-500 text-lg font-medium text-gray-700 hover:pl-1 transition-all capitalize">
            {category.categore}
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button
          className="bg-[#DA1919] text-white border px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white hover:text-black flex items-center mx-auto"
          onClick={() => getDeal(slug)}>
          View All Categories <span className="ml-2">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
