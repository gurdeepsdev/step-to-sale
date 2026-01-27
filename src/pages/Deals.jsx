import React from "react";
import Header from "../components/Header";
import { useEffect, useState, useContext } from "react";
import { getAllCoupons } from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";

import PageHeader from "../components/PageHeader.jsx";

const PopularOffers = () => {
  const [coupons, setCoupons] = useState([]);
  const [banners, setBanners] = useState([]);
  console.log("banners", coupons);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllCoupons();
      console.log("data", data);
      //if (Array.isArray(data) && data.length > 0) {
      setCoupons(data.data);
      //}
      setLoading(false);
    };

    fetchCoupons();
  }, []);

  const handleSelectCoupon = (slug) => {
    navigate(`/CouponsDetails/${slug}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCoupons = coupons.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(coupons.length / itemsPerPage);
  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllCoupons();
      if (data.success) {
        const allBanners = data.data
          .filter((coupon) => coupon.banner_url)
          .map((coupon) => ({
            banner_url: coupon.banner_url,
            title: coupon.title,
          }));
        setBanners(allBanners);
      }
      setLoading(false);
    };

    fetchCoupons();
  }, []);
  const decodeHtmlEntities = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent.trim();
  };

  const stripHtmlTags = (html) => {
    return decodeHtmlEntities(html)
      .replace(/<[^>]+>/g, "") // Remove HTML tags
      .replace(/\u00A0|&nbsp;/g, " ") // Convert &nbsp; or Unicode NBSP to a normal space
      .trim();
  };
  const formatPrice = (amount, currency) => {
    if (!amount) return "";

    // If already has a currency symbol, return as-is
    if (typeof amount === "string" && /[$₹]/.test(amount)) {
      return amount;
    }

    const symbol = currency === "INR" ? "₹" : "$";
    return `${symbol}${amount}`;
  };

  return (
    <>
      <Header />

      {/* Heading */}
      <PageHeader
        breadcrumb="Home / Deals"
        title="Deals of the Day"
        description="Grab the best deals available today and save more on every purchase."
      />
      <div className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coupons.map((deal) => (
              <div className="border rounded-3xl p-4 flex flex-col hover:shadow-lg transition">
                {/* Image */}
                <div className="h-40 sm:h-48 rounded-2xl mb-4 overflow-hidden">
                  <img
                    src={deal.banner_url2}
                    alt={deal.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Title */}
                <p className="text-lg mb-1 text-center font-bold">
                  {deal.title}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 text-center">
                  {stripHtmlTags(deal.description)}
                </p>
                {/* Price */}
                <div className="text-center mb-4">
                  {deal.currency === "%" ? (
                    <span className="text-xl font-bold">
                      {parseFloat(deal.payout)}% OFF
                    </span>
                  ) : deal.discount ? (
                    <>
                      <span className="line-through text-gray-400 mr-2">
                        {formatPrice(deal.payout, deal.currency)}
                      </span>
                      <span className="text-xl font-bold">
                        {formatPrice(deal.discount_payout, deal.currency)}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-bold">
                      {formatPrice(deal.payout, deal.currency)}
                    </span>
                  )}
                </div>

                {/* Button */}
                <button
                  onClick={() => window.open(deal.tracking_link, "_blank")}
                  className="mt-auto py-3 rounded-full border border-[#DA1919] text-black hover:bg-[#DA1919] hover:text-white transition">
                  Grab Deals
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="py-10 px-4 sm:px-8 lg:px-16 bg-white">
  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
    Top Stores
  </h2>
  <p className="text-center text-gray-600 mb-8">
    Maximize Your Savings with the Best Online Deals & Handpicked Offers – Shop Smart, Save More!
  </p>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {currentCoupons.map((offer, idx) => (
      <div
        key={idx}
        className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
        onClick={() => handleSelectCoupon(offer.title)}
      >
        <div className="flex justify-center items-center h-12 mb-4">
          {offer.logo_url && offer.logo_url !== "null"
            ? <img src={offer.logo_url} alt={offer.title} className="max-h-12 object-contain" />
            : <span className="text-sm text-gray-400">null Logo</span>}
        </div>

        <div className="text-center font-medium text-sm text-gray-700 truncate mb-2">
          {offer.title || "Get Offers"}
        </div>

        <div className="text-center">
          <span className="inline-block bg-gray-100 text-sm font-semibold text-gray-800 rounded-full px-3 py-1">
            {offer.payout_model?.toLowerCase() === "percentage"
              ? `${offer.payout || "0.00"}%`
              : `${offer.currency || "Rs."} ${offer.payout || "0.00"}`}
          </span>
        </div>
      </div>
    ))}
  </div>

  <div className="flex justify-center mt-8 space-x-2">
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`px-3 py-1 border rounded ${
          page === currentPage
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        {page}
      </button>
    ))}
  </div>
</div> */}
    </>
  );
};

export default PopularOffers;
