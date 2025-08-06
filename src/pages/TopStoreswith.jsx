
import  { useEffect, useState, useContext } from "react";
import { getOffer , fetchTopStores,getAllbrands} from "../utils/api";import { CheckCircle2, ChevronDown } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from 'sweetalert2';

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
  const { categoryName,slug } = useParams(); // Get slug from URL
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
        console.log("dataw",data[0].img)

        // if (data.success) {
          setCoupons(data);
          setBranimg(data[0].img)
          setTotal(data.length)
          setBtitle(data[0].seo_title)
        //}
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
console.log("coupons",coupons)
// if (loading) return <h2>Loading Coupons...</h2>;


   useEffect(() => {
          const fetchCoupons = async () => {
              const data = await getAllbrands();
              console.log("data",data)
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
      const handleSelectCoupon = (coupon_code) => {
        navigate(`/Offers/${coupon_code}`);
     console.log("ff",coupon_code)
      };


    console.log("str",str)

  
             
            
                  useEffect(() => {
                      const fetchCoupons = async () => {
                          const data = await getAllbrands();
                          console.log("data",data)
                          if (Array.isArray(data) && data.length > 0) {
                            setCoupons(data);
                          }
                          setLoading(false);
                      };
              
                      fetchCoupons();
                  }, []);
    
            // Decide how many cards to render
            // const visible = showAll ? coupons : coupons.slice(0, 5);
        
         
              
    
    
     // Show only 10 initially, show all when `showAll` is true
  return (
    <>
         <Header />
    
    <div className="min-h-screen w-full bg-white text-gray-800">
      {/* Hero */}
      <header className="bg-[#244856] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
  <h2 className="text-2xl font-bold mb-4">Top Deals</h2>

  {/* Mobile & Tablet Slider */}
  <div className="lg:hidden">
    <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
      {coupons.map((store) => (
        <div
          key={store.id}
          className="min-w-[150px] max-w-[180px] bg-white border rounded-xl shadow hover:shadow-lg transition p-4 flex-shrink-0 relative group text-center"
        >
          <img
            src={store.img}
            alt={`${store.img} Logo`}
            className="h-12 mx-auto mb-2 object-contain group-hover:opacity-0 transition-opacity"
          />
          <p className="text-sm font-medium border border-gray-300 text-black rounded-full px-2 py-1 group-hover:opacity-0 transition-opacity">
          {store.coupon_count} Offers
          </p>
          <button
            className="absolute inset-0 flex items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity"
            onClick={() => handleSelectCoupon(store.coupon_code)}
          >
            Get Offers
          </button>
        </div>
      ))}
    </div>
  </div>

  {/* Desktop Grid */}
  <div className="hidden lg:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
    {coupons.map((store) => (
      <div
        key={store.id}
        className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 relative group text-center"
      >
        <img
          src={store.img}
          alt={`${store.img} Logo`}
          className="h-12 mx-auto mb-2 object-contain group-hover:opacity-0 transition-opacity"
        />
        <p className="text-sm font-medium border border-gray-300 text-black rounded-full px-2 py-1 group-hover:opacity-0 transition-opacity">
          {store.coupon_count} Offers
        </p>
        <button
          className="absolute inset-0 flex items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity"
          onClick={() => handleSelectCoupon(store.coupon_code)}
        >
          Get Offers
        </button>
      </div>
    ))}
  </div>
</div>


        {/* Tabs */}
      
      </header>

      {/* Body */}
      <main className="mx-auto max-w-7xl px-4 py-2 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="space-y-8 md:col-span-1">
          {/* About Card */}
          <section className="hidden sm:block rounded-lg border bg-white p-6 ">
            <h2 className="text-lg font-semibold mb-3">Your Hub for Every Deal
 
  </h2>
            <p className="text-sm leading-relaxed">
            Step to Sale connects you with amazing savings on everything from daily 
            necessities to dream purchases. Explore our carefully chosen collection of up-to-date coupons, 
            special offers, and amazing product discounts!

            </p>
          </section>

          {/* Popular Store Card */}
          <section className="hidden sm:block rounded-lg border bg-white p-6">
            <h2 className="text-lg font-semibold mb-3">POPULAR STORE</h2>
            <div className="grid grid-cols-3 gap-4">
              {
               str
              .map((src, idx) => (
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
      className="flex flex-row overflow-hidden rounded-lg border bg-white shadow-sm"
    >
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
              return t.slice(0, 3) + "*".repeat(Math.max(0, t.length - 3));
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
      onClick={() => handleSelectCoupon(coupon.title)}
    >
      GET&nbsp;OFFER
    </button>
  ) : (
    /* Default blue “Get Coupon” button */
    <button
      className="relative inline-flex items-center rounded bg-blue-600 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      onClick={() => handleSelectCoupon(coupon.title)}
    >
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