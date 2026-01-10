import { useEffect, useState, useContext } from "react";
import { getOffer, fetchTopStores, getAllbrands } from "../utils/api";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
/**
 * Responsive coupon page inspired by the provided screenshot.
 *
 * 🔧 How to use:
 * 1. Ensure Tailwind CSS is configured (https://tailwindcss.com/docs/guides/vite-react).
 * 2. Copy this file into your React project (e.g. `src/pages/CouponPage.jsx`).
 * 3. Import and render <CouponPage /> in App.jsx or a route.
 *
 * All layout/styling is handled with Tailwind utility classes, so no extra CSS is required.
 * Feel free to swap the sample data with your real API data.
 */

const sampleCoupons = [
  {
    id: 1,
    discount: "25%",
    title: "25% Off Sitewide",
    code: "SAVEBIG25",
    timesUsed: 9999,
    type: "coupon",
  },
  {
    id: 2,
    discount: "10%",
    title: "10% Off Select Mattresses",
    code: "DREAM10",
    timesUsed: 989,
    type: "coupon",
  },
];

const tabs = [
  { key: "all", label: "All", count: 7 },
  //   { key: "coupon", label: "Coupon", count: 2 },
  //   { key: "offer", label: "Offer", count: 5 },
  { key: "product", label: "Product", count: 0, badge: "New" },
];

export default function CouponPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { categoryName, slug } = useParams(); // Get slug from URL
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [showFilters, setShowFilters] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [branimg, setBranimg] = useState();
  const [brandtitle, setBtitle] = useState();

  const [total, setTotal] = useState();

  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);

  const [str, setStors] = useState([]);
  useEffect(() => {
    const fetchCoupon = async () => {
      const data = await getOffer(slug);
      console.log("dataw", data[0].img);

      // if (data.success) {
      setCoupons(data);
      setBranimg(data[0].img);
      setTotal(data.length);
      setBtitle(data[0].seo_title);
      //}
      setLoading(false);
    };

    fetchCoupon();
  }, [slug]);

  console.log("coupons", coupons);
  // if (loading) return <h2>Loading Coupons...</h2>;

  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllbrands();
      console.log("data", data);
      //   if (Array.isArray(data) && data.length > 0) {
      setStors(data);
      // }
      setLoading(false);
    };

    fetchCoupons();
  }, []);
  const filteredCoupons =
    activeTab === "all"
      ? sampleCoupons
      : sampleCoupons.filter((c) => c.type === activeTab);

  //   // Handle click on suggestion
  const handleSelectCoupon = (slug) => {
    navigate(`/CouponCode/${encodeURIComponent(slug)}`);
  };

  console.log("str", str);
  return (
    <>
      <Header />

      <div className="min-h-screen w-full bg-white text-gray-800">
        {/* Hero */}
        <header className="bg-[#244856] text-white">
          <div className="mx-auto max-w-7xl px-2 py-2 flex flex-col md:flex-row md:items-stretch gap-6">
            <div className="flex items-center justify-center md:justify-start">
              <img
                src={branimg}
                alt="Brand logo"
                className="h-full max-h-[100px] w-auto object-contain" // <- grow tall but with max cap
              />
            </div>

            <div className="flex-1 text-center md:text-left flex flex-col justify-center">
              <h1 className="text-2xl md:text-3xl font-semibold">
                {brandtitle} Coupons And Offers - August 2025
              </h1>
              <div className="mt-1 flex flex-wrap justify-center md:justify-start items-center gap-2 text-sm">
                <span className="font-medium">{total} Coupons & Offers</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-400" /> Verified
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <nav className="mx-auto max-w-7xl px-4 pb-4">
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {tabs.map(({ key, label, count, badge }) => {
                const isActive = activeTab === key;
                return (
                  <li key={key}>
                    <button
                      className={
                        "relative w-full rounded border px-4 py-2 text-sm font-medium transition " +
                        (isActive
                          ? "bg-white text-blue-600 shadow"
                          : "bg-transparent text-white hover:bg-white/10")
                      }
                      onClick={() => setActiveTab(key)}>
                      {label} ({total})
                      {badge && (
                        <span className="ml-1 rounded bg-green-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          {badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>

        {/* Body */}
        <main className="mx-auto max-w-7xl px-4 py-2 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="space-y-8 md:col-span-1">
            {/* About Card */}
            <section className="hidden sm:block rounded-lg border bg-white p-6 ">
              <h2 className="text-lg font-semibold mb-3">
                Your Hub for Every Deal
              </h2>
              <p className="text-sm leading-relaxed">
                Step to Sale connects you with amazing savings on everything
                from daily necessities to dream purchases. Explore our carefully
                chosen collection of up-to-date coupons, special offers, and
                amazing product discounts!
              </p>
            </section>

            {/* Popular Store Card */}
            <section className="hidden sm:block rounded-lg border bg-white p-6">
              <h2 className="text-lg font-semibold mb-3">POPULAR STORE</h2>
              <div className="grid grid-cols-3 gap-4">
                {str.map((src, idx) => (
                  <img
                    key={idx}
                    src={src.img}
                    alt="brand"
                    className="h-12 w-full object-contain border rounded"
                  />
                ))}
              </div>
            </section>
          </aside>

          {/* Coupon List */}
          <section className="space-y-6 md:col-span-3">
            {coupons.map((coupon) => (
              <article
                key={coupon.id}
                /* row everywhere, no height bloat on mobile */
                className="flex flex-row overflow-hidden rounded-lg border bg-white shadow-sm">
                {/* Discount badge – narrower + smaller on mobile */}
                <div className="flex items-center justify-center bg-blue-50 w-24 sm:w-32 p-3 sm:p-6 text-center">
                  <div>
                    <p className="text-xl sm:text-3xl font-bold text-blue-600 leading-none">
                      {coupon.offer}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-blue-600 mt-1">
                      OFF
                    </p>
                    <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-wide text-gray-500">
                      Hot Coupon
                    </p>
                  </div>
                </div>

                {/* Details – tighter padding, line‑clamped */}
                <div className="flex-1 p-4 sm:p-6 space-y-2 sm:space-y-4">
                  <h3 className="text-sm sm:text-lg font-semibold line-clamp-2">
                    {coupon.description}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="h-4 w-4" /> Verified
                    </span>
                    <span className="text-gray-500">
                      {(() => {
                        const t = coupon.title || "";
                        return (
                          t.slice(0, 3) + "*".repeat(Math.max(0, t.length - 3))
                        );
                      })()}
                    </span>
                  </div>
                </div>

                {/* CTA – slimmer button on mobile */}
                {/* CTA – conditional button */}
                <div className="flex items-center p-4 sm:p-6">
                  {coupon.title?.trim().toLowerCase() == "offer" ? (
                    /* Green “Grab Offer” button */
                    <button
                      className="inline-flex items-center rounded bg-green-600 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                      onClick={() => handleSelectCoupon(coupon.title)}>
                      GET&nbsp;OFFER
                    </button>
                  ) : (
                    /* Default blue “Get Coupon” button */
                    <button
                      className="relative inline-flex items-center rounded bg-blue-600 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      onClick={() => handleSelectCoupon(coupon.title)}>
                      GET&nbsp;COUPON
                      <span className="absolute inset-y-0 right-0 w-8 sm:w-12 bg-pattern-dots bg-cover" />
                    </button>
                  )}
                </div>
              </article>
            ))}

            {filteredCoupons.length === 0 && (
              <p className="text-center text-gray-500">No items in this tab.</p>
            )}
          </section>
        </main>
      </div>
      <Subscribe />
      <Footer />
    </>
  );
}

/* Optional: custom background pattern utility (Tailwind `content-[]` syntax) */
// In your tailwind.config.js, you can extend background images:
// theme: {
//   extend: {
//     backgroundImage: {
//       "pattern-dots":
//         "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%274%27 height=%274%27 viewBox=%270 0 4 4%27%3E%3Ccircle fill=%27%23000000%27 cx=%270.5%27 cy=%270.5%27 r=%270.5%27/%3E%3C/svg%3E')",
//     },
//   },
// },

// import  { useEffect, useState, useContext } from "react";
// import { getOffer , fetchTopStores} from "../utils/api";
// import { useParams, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import Swal from 'sweetalert2';

// import Header from "../components/Header";
// import Subscribe from "../components/Subscribe";
// import Footer from "../components/Footer";

// export default function MobileAndTablet() {
//   const { categoryName,slug } = useParams(); // Get slug from URL
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_API_URL;

//   const [showFilters, setShowFilters] = useState(false);
//   const [coupons, setCoupons] = useState([]);
//   const [branimg, setBranimg] = useState();

//   const [loading, setLoading] = useState(true);
//   const [showAll, setShowAll] = useState(false);
//   const [stores, setStores] = useState([]);
//   const [error, setError] = useState(null);

// useEffect(() => {
//         const fetchCoupon = async () => {
//             const data = await getOffer(slug);
//             // if (data.success) {
//               setCoupons(data);
//               setBranimg(data[0].brand_img)
//             //}
//             setLoading(false);
//         };
//         const getStores = async () => {
//           const data = await fetchTopStores();
//           if (data.success === false) {
//               setError(data.message);
//           } else {
//               setStores(data);
//           }
//           setLoading(false);
//       };

//       getStores();

//         fetchCoupon();
//     }, []);
// console.log("coupons",coupons)
//     // if (loading) return <h2>Loading Coupons...</h2>;

// const details = [
//   {
//     id: 1,
//     title: "Trend Big, Spend Less!",
//     description: "Discover the hottest fashion deals, exclusive coupons, and unbeatable savings. Stay stylish without breaking the bank!.",
//     categoryName:"ecommerce"
//   },
//   {
//     id: 2,
//     title: "Glow, Save, Repeat!",
//     categoryName:"health",

//     description: "Unlock amazing discounts on beauty and wellness essentials. Look good, feel great—without the hefty price tag!",

//   },
//   {
//     id: 3,
//     title: "Feast on Savings!",
//     description: "Satisfy your cravings with delicious discounts on top restaurants and food brands. Eat more, spend less!",
//     categoryName:"Food-&-Dining"

//   },
//   {
//     id: 4,
//     title: "Upgrade for Less!",
//     description: "Shop the best mobile and tablet deals with top-rated offers. Stay connected without overspending!",
//     categoryName:"Mobile-&-Tablets"

//   },
//   {
//     id: 4,
//     title: "Everything Deals & Discounts in One Place",
//     description: "Find the best discounts, cashback, and coupon codes from all your favorite Brands. and Get Money Back on Everything You Buy!",
//     categoryName:"All"

//   },
// ];

// const [selectedCategory, setSelectedCategory] = useState("All");
// const [selectedBrand, setSelectedBrand] = useState("All");
// const [selectedType, setSelectedType] = useState("ALL");

// const [selectedCategories, setSelectedCategories] = useState([]);
// const [displayedCou, setDisplayedCoupons] = useState([]);

// const handleCategoryChange = (e) => {
//   const { value, checked } = e.target;

//   setSelectedCategories((prev) =>
//     checked ? [...prev, value] : prev.filter((category) => category !== value)
//   );
// };

// const filteredOffers = coupons.filter((coupon) => {
//   return (
//     (selectedCategories.length === 0 || selectedCategories.includes(coupon.category)) &&
//     (selectedBrand === "All" || coupon.brand === selectedBrand) &&
//     (selectedType === "ALL" || coupon.type === selectedType)
//   );
// });

//     // Show only 10 initially, show all when `showAll` is true
//     const displayedCoupons = showAll ? filteredOffers : filteredOffers.slice(0, 6);

//  // Function to clear all filters
//  const clearFilters = () => {
//   setSelectedCategory("All");
//   setSelectedBrand("All");
//   setSelectedType("ALL");
// };
// const filteredDetails = details.filter((detail) => detail.categoryName === (categoryName || categoryName));

// const [searchTerm, setSearchTerm] = useState("");
// const [filteredCoupons, setFilteredCoupons] = useState([]);  // Handle input change and filter suggestions
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     // Filter coupons where title includes the search term (case-insensitive)
//     if (value.trim() === "") {
//       setFilteredCoupons([]);
//     } else {
//       setFilteredCoupons(
//         coupons.filter((coupon) =>
//           coupon.title.toLowerCase().includes(value.toLowerCase())
//         )
//       );
//     }
//   };

//   // Handle click on suggestion
//   const handleSelectCoupon = (slug) => {
//     navigate(`/CouponsDetails/${slug}`);
//     setSearchTerm(""); // Clear input after selection
//     setFilteredCoupons([]); // Hide suggestions
//   };

//   return (
//     <>
//       <Header />
//       <div className=" min-h-screen bg-gray-50">
//         {/* Breadcrumb & Header */}
//         <div className="mx-auto   bg-[#BCCCDC] p-6 border-b">
//         {filteredDetails.map((detail) => (

//             <div key={detail.id} className="container mx-auto px-0 md:px-4 lg:px-4">

//           <div className="container text-sm text-gray-500 mb-2 ursor-pointer hover:underline"
//                     onClick={() => navigate(-1)} // Goes back to the previous page
// >
//             Home / {detail.categoryName}
//           </div>
//           <h1 className="text-2xl font-bold">{categoryName}</h1>
//           <p className="text-gray-500 text-sm">
//           {detail.title}          </p>
//         </div>
//               ))}

//         </div>

//         <div className="container mx-auto px-4 py-6">
//           <div className="flex flex-col lg:flex-row  items-start mb-4">
//             {/* Sidebar */}
//             <div className="bg-[#1B4B5A] text-white p-8  w-full lg:w-1/4 mb-6 lg:mb-0 lg:sticky lg:top-6">
//               <h2 className="text-xl font-semibold mb-3">
//                 Top Stores in {categoryName}
//               </h2>
//               {/* {filteredDetails.map((detail) => (
//               <p key={detail.id} className="text-sm mb-6 leading-relaxed">
//                {detail.description}
//               </p>
//               ))} */}
//                <img
//         src={`https://api.steptosale.com${branimg}`}

//         //   src={displayedCoupons.brand_img}
//           alt="Amazon"
//           className="object-contain h-16 w-auto "
//         />
//               <button className="border border-white text-white hover:bg-white/10 px-5 py-2 rounded w-full sm:w-auto">
//                 VIEW ALL STORES
//               </button>
//             </div>

//             {loading && <p className="text-gray-500 text-center">Loading...</p>}
//             {error && <p className="text-red-500 text-center">{error}</p>}

//             {!loading && !error && (
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-grow bg-blue-100 p-4 md:p-8 lg:p-8  w-full">
//                     {coupons.length > 0 ? (
//                         coupons.map((store, index) => (
//                             <div
//                                 key={index}
//                                 className="relative bg-white shadow-lg p-6 text-center mt-6"
//                             >
//                                 {/* Store Logo (Placeholder Image) */}
//                                 <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded shadow-md p-3">
//                                     <img
//                                             src={`https://api.steptosale.com${store.brand_img}`}

//                                         alt={store.title}
//                                         className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
//                                         onError={(e) => (e.target.src = "/img/default.png")} // Fallback image
//                                     />
//                                 </div>

//                                 {/* Card Content */}
//                                 <div className="mt-12">
//                                     <h2 className="text-sm md:text-lg lg:text-lg font-semibold">
//                                         {store.title} | {store.offer_count} Offers
//                                     </h2>
//                                     <p className="mt-4 bg-[#4F93AD] text-white text-[10px] md:text-sm lg:text-sm font-medium py-1 px-2 md:px-6 lg:px-6 md:py-2 lg:py-2 rounded-md inline-block">
//                                         {/* Random Cashback (for demo) */}
//                                         {Math.floor(Math.random() * 50) + 10}% Cashback
//                                     </p>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500 text-center col-span-4">No stores found</p>
//                     )}
//                 </div>
//             )}
//           </div>
//           <div className="flex flex-col md:flex-row gap-2">
//             {/* Mobile Filter Toggle Button and Sort Button */}
//             <div className="flex  md:flex-row justify-between gap-4 md:order-1 mb-4 md:mb-0">
//               {/* Mobile Filter Toggle Button */}
//               <button
//                 className="md:hidden bg-[#4F93AD] text-white text-sm px-4 py-1 md:py-2 lg:py-2 rounded-lg"
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 {showFilters ? "Hide Filters" : "Show Filters"}
//               </button>

//               {/* Sort Button */}
//               <select className="text-sm border bg-[#4F93AD] text-white rounded-md px-2 py-1 md:py-2 lg:py-2 md:hidden">
//                 <option>Newest</option>
//                 <option>Oldest</option>
//               </select>
//             </div>

//             {/* Left Sidebar (Visible on larger screens) */}
//             <div
//               className={`w-64 flex-shrink-0 fixed inset-y-0 left-0 bg-white p-4 shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
//                 showFilters ? "translate-x-0 z-50" : "-translate-x-full"
//               } md:z-0`}
//             >
//               <div className="flex justify-between items-center mb-4 border-b border-dashed border-grey-700">
//                 <h3 className="font-semibold">Filters</h3>
//                 <span className="hover:underline sm:block hidden"           onClick={clearFilters}
//                 >clear</span>
//                 <button
//                   className="text-blue-600 text-sm md:hidden"
//                   onClick={() => setShowFilters(false)}
//                 >
//                   ✕ Close
//                 </button>
//               </div>

//               {/* Filter Content */}
//               <div className="relative mb-4">
//                 <svg
//                   className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M12.9 14.32A8 8 0 1114.32 12.9l4.387 4.387a1 1 0 01-1.415 1.414L12.9 14.32zM8 14a6 6 0 100-12 6 6 0 000 12z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="pl-10 w-full border border-gray-300 rounded-full py-1"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                 />
//                 {/* Suggestions Dropdown */}
// {filteredCoupons.length > 0 && (
//                 <ul className="absolute z-50 bg-white w-96 border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
//                   {filteredCoupons.map((coupon) => (
//                     <li
//                       key={coupon.id}
//                       className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//                       onClick={() => handleSelectCoupon(coupon.title)}
//                     >
//                       {coupon.title}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               </div>

//               {/* Filter Sections */}
//               <div className="mb-6">
//                 <h3 className="font-semibold mb-3">Product Categories</h3>
//                 <div className="space-y-2">
//   {categories.map((category) => (
//     <div key={category.name} className="flex items-center justify-between text-sm">
//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           className="form-checkbox text-[#4F93AD]"
//           value={category.name}
//           checked={selectedCategories.includes(category.name)}

//           onChange={handleCategoryChange}

//         />
//         <span>{category.name}</span>
//       </label>
//       <span className="text-gray-500">{category.count}</span>
//     </div>
//   ))}
// </div>

//               </div>

//               {/* <div className="mb-6">
//                 <h3 className="font-semibold mb-3 text-lg">Price</h3>

//                 <div className="relative mb-4">
//                   <input
//                     type="range"
//                     min="100"
//                     max="2500"
//                     defaultValue="100"
//                     step="50"
//                     className="w-full appearance-none h-1 bg-gray-300 rounded outline-none cursor-pointer"
//                   />
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <div className="text-center">
//                     <label className="block text-sm text-gray-600 mb-1">
//                       Min Price
//                     </label>
//                     <input
//                       type="text"
//                       defaultValue="100"
//                       className="w-24 border border-gray-300 rounded-full py-1 px-3 text-center"
//                     />
//                   </div>
//                   <div className="text-center">
//                     <label className="block text-sm text-gray-600 mb-1">
//                       Max Price
//                     </label>
//                     <input
//                       type="text"
//                       defaultValue="1250"
//                       className="w-24 border border-gray-300 rounded-full py-1 px-3 text-center"
//                     />
//                   </div>
//                 </div>
//               </div> */}

//               {/* Brand Filters */}
//               <div>
//                 <h3 className="font-semibold mb-3">Brands</h3>
//                 <div className="space-y-2">
//   {brands.map((brand) => (
//     <div key={brand.name} className="flex items-center justify-between text-sm">
//       {/* Checkbox for selecting brand filter */}
//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           className="form-checkbox text-[#4F93AD]"
//           value={brand.name}
//           checked={selectedCategories.includes(brand.name)}

//           onChange={handleCategoryChange}
//           // onChange={(e) => setSelectedBrand(e.target.value)}

//         />
//         <span>{brand.name}</span>
//       </label>
//       <span className="text-gray-500">{brand.count}</span>
//     </div>
//   ))}
// </div>

//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1">
//               <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
//                 <div className="flex justify-between items-center">
//                   {/* Tabs Container */}
//                   <div className="flex gap-4 overflow-x-auto md:overflow-x-visible">
//                   <button

//                         className={`text-sm font-medium px-4 py-2 rounded hover:bg-gray-200 `}

//                         onClick={(e) => setSelectedType(e.target.value)}

//                       >
//                         All({coupons.length})
//                       </button>
//                     {/* {tabs.map((tab) => (
//                       <button
//                         key={tab.name}
//                         className={`text-sm font-medium px-4 py-2 rounded hover:bg-gray-200 ${
//                           tab.active ? "text-blue-600" : "text-gray-500"

//                         }`}
//                         value={tab.name}

//                         onClick={(e) => setSelectedType(e.target.value)}

//                       >
//                         {tab.name}({tab.count})
//                       </button>
//                     ))} */}
//                   </div>

//                   {/* Sort Dropdown (Visible on mobile, hidden on larger screens) */}
//                   {/* <select className="text-sm border rounded-md px-2 py-1 md:block hidden"
//                   >
//                     <option>Newest</option>
//                     <option>Oldest</option>
//                   </select> */}
//                 </div>
//               </div>

//               {/* Offer Cards Grid */}
//               <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
//               {displayedCoupons.length > 0 ? (
//           displayedCoupons.map((displayedCoupons) => <OfferCard key={displayedCoupons.id} displayedCoupons={displayedCoupons} />)
//         ) : (
//           <p className="text-center text-gray-500">No offers found.</p>
//         )}

//               </div>

//               <button className="underline rounded px-4 py-2 w-full mt-6 text-center"
//                                           onClick={() => setShowAll(true)}
// >
//                 Show More
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Subscribe />
//       <Footer />
//     </>
//   );
// }

// const decodeHtmlEntities = (html) => {
//   const txt = document.createElement("textarea");
//   txt.innerHTML = html;
//   return txt.value;
// };

// const stripHtmlTags = (html) => {
//   return decodeHtmlEntities(html)
//     .replace(/<[^>]+>/g, "") // Remove HTML tags
//     .replace(/\u00A0|&nbsp;/g, " ") // Convert &nbsp; or Unicode NBSP to normal space
//     .replace(/&amp;/g, "&") // Strictly replace &amp; with &
//     .trim();
// };
// const OfferCard = ({ displayedCoupons }) => {
//   const navigate = useNavigate();

//      // Handle click on suggestion
//     //  const handleSelectCoupon = (slug) => {
//     //   navigate(`/CouponsDetails/${slug}`);

//     // };

//     const handleSelectCoupon = (slug) => {
//       navigate(`/CouponCode/${slug}`);
//     };

//     const {userId,token} = useContext(AuthContext);
//     const [couponId, setCouponid] = useState('6383');
//     const apiUrl = import.meta.env.VITE_API_URL;

//     const generateClickId = () => crypto.randomUUID();
//     const [isLoading, setIsLoading] = useState(false); // Add this in your component state

//     // const handleSelectCoupon = async (id) => {
//     //   setIsLoading(true); // Show loading indicator

//     //   const PUBLIC_COUPON_IDS = [
//     //     "6373", "6372", "6367", "6369", "6342", "6343", "6344", "6345",
//     //     "6346", "6347", "6348", "6349", "6350", "6351", "6352", "6353",
//     //     "6354", "6355", "6356", "6357", "6358", "6359", "6360", "6361",
//     //     "6362", "6363", "6364", "6365", "6366", "6368", "6383"
//     //   ];

//     //   const STATIC_USER_ID = "9";
//     //   const isPublicCoupon = PUBLIC_COUPON_IDS.includes(String(id));
//     //   const isGuest = !token;
//     //   const allowAnonymous = isPublicCoupon;
//     //   const finalUserId = isPublicCoupon ? STATIC_USER_ID : userId;
//     //   const clickId = isPublicCoupon && isGuest ? generateClickId() : undefined;

//     //   try {
//     //     const params = new URLSearchParams({
//     //       user_id: finalUserId,
//     //       coupon_id: id,
//     //     });

//     //     if (clickId) params.append("click_id", clickId);

//     //     const response = await fetch(`${apiUrl}/api/get-click?${params.toString()}`, {
//     //       method: "GET",
//     //       redirect: "follow",
//     //     });

//     //     const data = await response.json();

//     //     if (data.success && data.trackingUrl) {
//     //       // Wait for 4 seconds before redirect
//     //       setTimeout(() => {
//     //         window.location.href = data.trackingUrl;
//     //       }, 4000);
//     //     } else {
//     //       setIsLoading(false);
//     //       Swal.fire({
//     //         icon: "error",
//     //         title: "Click failed",
//     //         text: data.message || "Could not generate tracking link.",
//     //       });
//     //     }
//     //   } catch (err) {
//     //     console.error("Error during redirect:", err);
//     //     setIsLoading(false);
//     //     Swal.fire({
//     //       icon: "error",
//     //       title: "Oops...",
//     //       text: "Something went wrong!",
//     //     });
//     //   }
//     // };

//     const shareToWhatsApp = () => {
//       const url = encodeURIComponent(window.location.href);
//       const text = encodeURIComponent("Check out this link: ");
//       const whatsappUrl = `https://wa.me/?text=${text}${url}`;
//       window.open(whatsappUrl, "_blank");
//     };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm">
//       <div className="flex flex-col gap-4">
//         {/* Image */}
//         <img
//         src={`https://api.steptosale.com${displayedCoupons.brand_img}`}

//         //   src={displayedCoupons.brand_img}
//           alt="Amazon"
//           className="object-contain h-16 w-auto "
//         />

//         {/* Title and Description */}
//         <div>
//           <h3 className="font-semibold mb-1">{displayedCoupons.title}</h3>
//           <p className="text-sm text-gray-500 mb-2">{stripHtmlTags(displayedCoupons.description)}</p>
//           {/* <p className="text-sm text-gray-500">Valid Till: {coupons.validTill}</p> */}
//         </div>

//         {/* Button */}
//         {isLoading && (
//   <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex items-center justify-center z-50">
//     <div className="text-center flex flex-col items-center">
//       <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
//       <p className="text-xl font-semibold text-gray-700">Please wait, redirecting...</p>
//     </div>
//   </div>
// )}

//         <button className="bg-[#5396AF] text-white hover:text-black font-medium px-4 py-1 rounded"
//                         onClick={() => handleSelectCoupon(displayedCoupons.title)}
// >
//           Get Deal
//         </button>

//         <span className="w-full border-t" />

//         {/* Footer Buttons */}
//         <div className="flex justify-between items-center w-full">
//           <button className="text-sm text-[#5396AF] hover:underline"
//                                   onClick={() => handleSelectCoupon(displayedCoupons.title)}
// >
//             More Details
//           </button>
//           <button className="text-sm text-[#5396AF] hover:underline"
//           onClick={shareToWhatsApp}>
//             Share
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const categories = [
//   { name: "Mobile & Tablets", count: 345 },
//   { name: "Laptops", count: 145 },
//   { name: "Beauty & Health", count: 254 },
//   { name: "Food & Drinks", count: 190 },
//   { name: "Fashion", count: 122 },
//   { name: "Travel", count: 109 },
// ];

// const brands = [
//   { name: "Nike", count: 89 },
//   { name: "Puma", count: 187 },
//   { name: "Gucci", count: 66 },
//   { name: "Adidas", count: 44 },
// ];

// // const tabs = [
// //   { name: "ALL", count: 488, active: true },
// //   { name: "Cashback", count: 388, active: false },
// //   { name: "Coupons", count: 147, active: false },
// //   { name: "Deals", count: 243, active: false },
// // ];
