import React from "react";

const CategoryPopup = () => {
  return (
    <div className="relative">
      <div className="absolute top-6 left-0 w-[950px] max-w-[98%] sm:max-w-[95%] md:w-[900px] bg-white shadow-lg p-4 z-50 border">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Category Column */}
          <div>
            <h3 className="font-bold text-red-600 mb-2">Mobile & Tablets</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Mobile</li>
              <li>Tablets</li>
              <li>Accessories</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-red-600 mb-2">Fashion</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Clothes</li>
              <li>T-Shirts</li>
              <li>Shoes</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-red-600 mb-2">Beauty & Health</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Makeup</li>
              <li>Skincare</li>
              <li>Wellness</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-red-600 mb-2">Food & Drinks</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Pizza</li>
              <li>Burger</li>
              <li>Health Drinks</li>
            </ul>
          </div>
        </div>

        {/* View All Categories */}
        <div className="text-center mt-4">
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-semibold">
            View All Categories <span className="ml-2">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPopup;
