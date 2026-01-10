import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllCategories } from "../utils/api";
export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllCategories();
      console.log("data", data);
      setCategories(data.data);
    };

    fetchCoupons();
  }, []);
  return (
    <>
      <Header />

      {/* Heading */}
      <PageHeader
        breadcrumb="Home / Popular Categories"
        title="Popular Categories"
        description="Find your favorite shopping categories and enjoy real discounts every day."
      />
      <section className="w-full py-12 sm:py-16 bg-white">
        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-10
          ">
            {categories.map((item) => (
              <Link
                key={item.id}
                to={`/CategoreNew/${item.categore
                  ?.toLowerCase()
                  ?.replace(/\s+/g, "-")}`}
                className="flex flex-col items-center text-center group">
                <div
                  key={item.id}
                  className="flex flex-col items-center text-center">
                  {/* Image */}
                  <div className="w-56 h-56 rounded-full border overflow-hidden">
                    <img
                      src={item.icon}
                      alt={item.categore}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <p className="mt-6 text-lg lg:text-xl font-semibold">
                    {item.categore}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}
