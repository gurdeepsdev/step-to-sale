
import  { useEffect, useState } from "react";
import { getAllcategoreCoupons , fetchTopStores} from "../utils/api";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";

export default function MobileAndTablet() {
  const { categoryName } = useParams(); // Get slug from URL
  const navigate = useNavigate();

  const [showFilters, setShowFilters] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);



useEffect(() => {
        const fetchCoupon = async () => {
            const data = await getAllcategoreCoupons(categoryName);
            if (data.success) {
              setCoupons(data.data);
            }
            setLoading(false);
        };
        const getStores = async () => {
          const data = await fetchTopStores();
          if (data.success === false) {
              setError(data.message);
          } else {
              setStores(data);
          }
          setLoading(false);
      };
  
      getStores();

        fetchCoupon();
    }, []);

    // if (loading) return <h2>Loading Coupons...</h2>;




const details = [
  {
    id: 1,
    title: "Trend Big, Spend Less!",
    description: "Discover the hottest fashion deals, exclusive coupons, and unbeatable savings. Stay stylish without breaking the bank!.",
    categoryName:"ecommerce"
  },
  {
    id: 2,
    title: "Glow, Save, Repeat!",
    categoryName:"health",

    description: "Unlock amazing discounts on beauty and wellness essentials. Look good, feel great—without the hefty price tag!",
  
  },
  {
    id: 3,
    title: "Feast on Savings!",
    description: "Satisfy your cravings with delicious discounts on top restaurants and food brands. Eat more, spend less!",
    categoryName:"Food-&-Dining"

  },
  {
    id: 4,
    title: "Upgrade for Less!",
    description: "Shop the best mobile and tablet deals with top-rated offers. Stay connected without overspending!",
    categoryName:"Mobile-&-Tablets"

  },
  {
    id: 4,
    title: "Everything Deals & Discounts in One Place",
    description: "Find the best discounts, cashback, and coupon codes from all your favorite Brands. and Get Money Back on Everything You Buy!",
    categoryName:"All"

  },
];

const [selectedCategory, setSelectedCategory] = useState("All");
const [selectedBrand, setSelectedBrand] = useState("All");
const [selectedType, setSelectedType] = useState("ALL");


const [selectedCategories, setSelectedCategories] = useState([]);
const [displayedCou, setDisplayedCoupons] = useState([]);



const handleCategoryChange = (e) => {
  const { value, checked } = e.target;

  setSelectedCategories((prev) => 
    checked ? [...prev, value] : prev.filter((category) => category !== value)
  );
};

const filteredOffers = coupons.filter((coupon) => {
  return (
    (selectedCategories.length === 0 || selectedCategories.includes(coupon.category)) &&
    (selectedBrand === "All" || coupon.brand === selectedBrand) &&
    (selectedType === "ALL" || coupon.type === selectedType)
  );
});

    // Show only 10 initially, show all when `showAll` is true
    const displayedCoupons = showAll ? filteredOffers : filteredOffers.slice(0, 6);

 // Function to clear all filters
 const clearFilters = () => {
  setSelectedCategory("All");
  setSelectedBrand("All");
  setSelectedType("ALL");
};
const filteredDetails = details.filter((detail) => detail.categoryName === (categoryName || categoryName));

const [searchTerm, setSearchTerm] = useState("");
const [filteredCoupons, setFilteredCoupons] = useState([]);  // Handle input change and filter suggestions
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter coupons where title includes the search term (case-insensitive)
    if (value.trim() === "") {
      setFilteredCoupons([]);
    } else {
      setFilteredCoupons(
        coupons.filter((coupon) =>
          coupon.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  // Handle click on suggestion
  const handleSelectCoupon = (slug) => {
    navigate(`/CouponsDetails/${slug}`);
    setSearchTerm(""); // Clear input after selection
    setFilteredCoupons([]); // Hide suggestions
  };

  return (
    <>
      <Header />
      <div className=" min-h-screen bg-gray-50">
      <h1 className="text-center pt-4">Blank page for Flex Offer

</h1>
      </div>
      <Subscribe />
      <Footer />
    </>
  );
}


const decodeHtmlEntities = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const stripHtmlTags = (html) => {
  return decodeHtmlEntities(html)
    .replace(/<[^>]+>/g, "") // Remove HTML tags
    .replace(/\u00A0|&nbsp;/g, " ") // Convert &nbsp; or Unicode NBSP to normal space
    .replace(/&amp;/g, "&") // Strictly replace &amp; with &
    .trim();
};
const OfferCard = ({ displayedCoupons }) => {
  const navigate = useNavigate();

     // Handle click on suggestion
     const handleSelectCoupon = (slug) => {
      navigate(`/CouponsDetails/${slug}`);
  
    };

    const shareToWhatsApp = () => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent("Check out this link: ");
      const whatsappUrl = `https://wa.me/?text=${text}${url}`;
      window.open(whatsappUrl, "_blank");
    };
    
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Image */}
        <img
          src={displayedCoupons.logo_url}
          alt="Amazon"
          className="object-fit h-10 w-auto"
        />


        {/* Title and Description */}
        <div>
          <h3 className="font-semibold mb-1">{displayedCoupons.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{stripHtmlTags(displayedCoupons.description)}</p>
          {/* <p className="text-sm text-gray-500">Valid Till: {coupons.validTill}</p> */}
        </div>

        {/* Button */}
        <button className="bg-[#5396AF] text-white hover:text-black font-medium px-4 py-1 rounded"
                        onClick={() => handleSelectCoupon(displayedCoupons.title)}
>
          Get Deal
        </button>

        <span className="w-full border-t" />

        {/* Footer Buttons */}
        <div className="flex justify-between items-center w-full">
          <button className="text-sm text-[#5396AF] hover:underline"
                                  onClick={() => handleSelectCoupon(displayedCoupons.title)}
>
            More Details
          </button>
          <button className="text-sm text-[#5396AF] hover:underline"
          onClick={shareToWhatsApp}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

const categories = [
  { name: "Mobile & Tablets", count: 345 },
  { name: "Laptops", count: 145 },
  { name: "Beauty & Health", count: 254 },
  { name: "Food & Drinks", count: 190 },
  { name: "Fashion", count: 122 },
  { name: "Travel", count: 109 },
];

const brands = [
  { name: "Nike", count: 89 },
  { name: "Puma", count: 187 },
  { name: "Gucci", count: 66 },
  { name: "Adidas", count: 44 },
];

// const tabs = [
//   { name: "ALL", count: 488, active: true },
//   { name: "Cashback", count: 388, active: false },
//   { name: "Coupons", count: 147, active: false },
//   { name: "Deals", count: 243, active: false },
// ];

