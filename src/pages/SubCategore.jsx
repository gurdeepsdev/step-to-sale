import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getOffersByCategory,getAllbrands } from "../utils/api";
import { Link } from "react-router-dom";
export default function CategoryOffers() {
  const { slug } = useParams();
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
  const capitalizeSlug = (slug) =>
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  const formatTitle = (slug) =>
    slug
      .replace(/-/g, " ") // replace ALL hyphens
      .toUpperCase();
  return (
    <>
      <Header></Header>
      <PageHeader
        breadcrumb={`Home / ${capitalizeSlug(slug)}`}
        title={formatTitle(slug)}
        description="Best offers available in this category"
      />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Offers.map((item) => (
            <OfferCard1 key={item.id} {...item} />
          ))}
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}

const OfferCard = ({ img, title, description, offer, url }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col items-center text-center">
      {/* Logo */}
      <div className="w-20 h-20 bg-white rounded-xl shadow flex items-center justify-center mb-4">
        <img src={img} alt={title} className="w-14 h-14 object-contain" />
      </div>

      {/* Title */}
      <p className="text-sm text-gray-800 font-bold mb-4">{title}</p>
      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 text-center">{description}</p>
      {/* Cashback */}
      <button
        onClick={() => window.open(url)}
        className="bg-red-600 text-white text-sm font-medium px-5 py-2 rounded-lg">
        {offer} Cashback
      </button>
    </div>
  );
};
const OfferCard1 = ({
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
          {offer}
          {currency} Cashback
        </span>
      </div>
    </Link>
  );
};
