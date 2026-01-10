import React, { useState, useEffect } from "react";
import { FiCheckCircle, FiShare2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { getOffer, fetchTopStores, getAllbrands } from "../utils/api";
import Header from "../components/Header";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";

/* =======================
   DUMMY DYNAMIC DATA
======================= */

const tabs = [
  { key: "all", label: "All", count: 7 },
  //   { key: "coupon", label: "Coupon", count: 2 },
  //   { key: "offer", label: "Offer", count: 5 },
  { key: "product", label: "Product", count: 0, badge: "New" },
];
const OfferDetails = () => {
  const { slug } = useParams();
  console.log("slug", slug);
  const [activeTab, setActiveTab] = useState("All");
  const [coupons, setCoupons] = useState([]);
  const [branimg, setBranimg] = useState();
  const [brandtitle, setBtitle] = useState();
  const [str, setStors] = useState([]);
  const [total, setTotal] = useState();
  useEffect(() => {
    const fetchCoupon = async () => {
      const data = await getOffer(slug);
      console.log("data", data);
      const normalized = data.map((item) => ({
        ...item,
        type: item.coupon_code ? "Coupon" : "Deal",
      }));

      setCoupons(normalized);
      setBranimg(normalized[0]?.img);
      setTotal(normalized.length);
      setBtitle(normalized[0]?.title);
    };

    fetchCoupon();
  }, [slug]);

  const filteredOffers =
    activeTab === "All" ? coupons : coupons.filter((o) => o.type === activeTab);
  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllbrands();
      console.log("data", data);
      setStors(data);
    };

    fetchCoupons();
  }, []);
  // const filteredCoupons =
  //   activeTab === "all"
  //     ? sampleCoupons
  //     : sampleCoupons.filter((c) => c.type === activeTab);

  //   // Handle click on suggestion
  const handleSelectCoupon = (slug) => {
    navigate(`/CouponCode/${encodeURIComponent(slug)}`);
  };

  return (
    <section className="bg-gray-100">
      <Header></Header>
      {/* HEADER */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-sm text-gray-400">
            Home / Electronics / {brandtitle}
          </p>

          <h1 className="text-2xl font-semibold mt-2">
            Coupons And Offers - January 2026
          </h1>
          <p className="text-gray-400 text-sm mb-4">Coupon & Deals</p>

          {/* FILTER TABS */}
          <div className="flex gap-3 flex-wrap">
            {["All", "Coupon", "Deal"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 border rounded text-sm ${
                  activeTab === tab
                    ? "bg-white text-black"
                    : "border-gray-500 text-gray-300"
                }`}>
                {tab} (
                {tab === "All"
                  ? coupons.length
                  : coupons.filter((o) => o.type === tab).length}
                )
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR */}
        <aside className="space-y-6">
          {/* LOGO */}
          <div className="bg-white p-6 rounded shadow">
            <img
              src={branimg}
              alt="Brand logo"
              className="mx-auto h-16 object-contain"
            />
          </div>

          {/* ABOUT */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold mb-3">
              ABOUT {brandtitle?.toUpperCase()}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {filteredOffers[0]?.about}
            </p>
          </div>
        </aside>

        {/* OFFERS LIST */}
        <div className="lg:col-span-3 space-y-6">
          {filteredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </section>
  );
};

export default OfferDetails;

/* =======================
   OFFER CARD
======================= */
// const OfferCard = ({ offer }) => {
//   const shareToWhatsApp = () => {
//     const url = encodeURIComponent(window.location.href);
//     const text = encodeURIComponent("Check out this link: ");
//     window.open(`https://wa.me/?text=${text}${url}`, "_blank");
//   };

//   return (
//     <div className="bg-white rounded shadow p-6">
//       <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//         {/* DISCOUNT */}
//         <div className="bg-gray-200 text-black font-semibold text-xl w-24 h-24 flex items-center justify-center rounded">
//           {offer.offer}
//         </div>

//         {/* CONTENT */}
//         <div className="flex-1">
//           <p className="text-gray-800 font-medium">
//             {offer.description || "No description available"}
//           </p>
//         </div>

//         {/* BUTTON */}
//         {offer.coupon_code ? (
//           /* COUPON */
//           <div className="relative h-[44px] w-[190px] overflow-hidden rounded-md">
//             <button className="absolute inset-0 bg-white text-black text-sm font-bold pr-4 flex items-center justify-end border-2 border-dashed border-gray-400">
//               {offer.coupon_code}
//             </button>

//             <div className="absolute inset-y-0 left-0 bg-red-600 text-white pl-6 pr-10 flex items-center text-sm font-semibold">
//               Coupon
//             </div>
//           </div>
//         ) : (
//           /* DEAL */
//           <button className="bg-red-600 h-[44px] w-[190px] rounded-md text-white text-sm font-semibold hover:bg-red-700 transition">
//             Deal
//           </button>
//         )}
//       </div>

//       {/* FOOTER */}
//       <div className="flex items-center gap-6 mt-4 pt-4 border-t text-sm text-gray-600">
//         <span
//           className="flex items-center gap-1 cursor-pointer"
//           onClick={shareToWhatsApp}>
//           <FiShare2 size={16} /> Share
//         </span>
//       </div>
//     </div>
//   );
// };
/* =======================
   OFFER CARD
======================= */
const OfferCard = ({ offer }) => {
  console.log("offer", offer);
  const shareToWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this link: ");
    const whatsappUrl = `https://wa.me/?text=${text}${url}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <div className="bg-white rounded shadow p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* DISCOUNT */}
        <div className="bg-[#9696968C] text-black font-semibold text-xl w-24 h-24 flex items-center justify-center rounded text-center">
          {Number(offer.offer) === 0 ? (
            <span className="text-red-600 uppercase">Hot Deal !</span>
          ) : (
            <>
              {offer.offer}
              {offer.currency}
            </>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <p className="text-gray-800 font-medium">{offer.description}</p>
        </div>
        {/* BUTTON */}
        {offer.coupon_code ? (
          <Link to={offer.url} target="_blank" rel="noopener noreferrer">
            <div className="relative h-[44px] w-[190px] overflow-hidden rounded-md">
              {/* BACK: Coupon Code */}

              <button
                className="
      absolute inset-0
      z-0
      bg-white
      text-black
      text-sm
      font-bold
      pr-4
      flex items-center justify-end
      border-2 border-dashed border-gray-400
    ">
                {offer.coupon_code}
              </button>

              {/* FRONT: Coupon Label */}
              <div
                className="
      absolute inset-y-0 left-0
      z-10
      bg-red-600
      text-white
      pl-8 pr-14
      flex items-center
      text-sm font-semibold
      whitespace-nowrap
    ">
                Coupon
              </div>
            </div>
          </Link>
        ) : (
          <Link to={offer.url} target="_blank" rel="noopener noreferrer">
            <button className="bg-red-600 h-[44px] w-[190px] overflow-hidden rounded-md text-white px-6 py-2 text-sm font-semibold hover:bg-red-700 transition">
              Deal
            </button>
          </Link>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t text-sm text-gray-600">
        {offer.verified && (
          <span className="flex items-center gap-1">
            <FiCheckCircle size={16} /> Verified
          </span>
        )}
        <span
          className="flex items-center gap-1 cursor-pointer"
          onClick={shareToWhatsApp}>
          <FiShare2 size={16} /> Share
        </span>
      </div>
    </div>
  );
};
