import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllbrands } from "../utils/api";

const Offer = () => {
  const [Offers, setOffers] = useState([]);
  console.log("Offers", Offers);
  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllbrands();
      console.log("data", data);
      if (Array.isArray(data) && data.length > 0) {
        setOffers(data);
      }
    };

    fetchCoupons();
  }, []);
  return (
    <>
      <Header></Header>
      <PageHeader
        breadcrumb="Home / Popular Stores"
        title="Popular Stores"
        description="Shop from popular stores you trust and enjoy savings on every order."
      />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Offers.map((item) => (
            <OfferCard key={item.id} {...item} />
          ))}
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default Offer;

const OfferCard = ({
  coupon_code,
  title,
  img,
  offer,
  total_count,
  currency,
  coupon_count,
  description,
}) => {
  return (
    <Link to={`/OffersDetails/${title}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col items-center text-center">
        {/* Logo */}

        <div className="w-20 h-20 bg-white rounded-xl shadow flex items-center justify-center mb-4">
          <img
            src={img}
            alt={coupon_code}
            className="w-14 h-14 object-contain"
          />
        </div>

        {/* Title */}
        <p className="text-sm text-gray-800 mb-4">{total_count} Offers</p>

        {/* Cashback Badge */}
        <span className="bg-red-600 text-white text-sm font-medium px-5 py-2 rounded-lg">
          Get Coupon
        </span>
      </div>
    </Link>
  );
};
