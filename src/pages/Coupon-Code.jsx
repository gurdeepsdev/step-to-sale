import { useState, useEffect, useContext, useMemo } from "react";
import { FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import { getsingleOffer } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { IoMdShare } from "react-icons/io";
import Header from "../components/Header";
import Couponcard from "../components/Couponcard";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

const decodeHtmlEntities = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent.trim();
};

const stripHtmlTags = (html) => {
  return decodeHtmlEntities(html)
    .replace(/<[^>]+>/g, "") // Remove HTML tags
    .replace(/\u00A0|&nbsp;/g, " ") // Convert &nbsp; or Unicode NBSP to normal space
    .trim();
};

const parseCategory = (categoryString) => {
  try {
    const categoriesArray = JSON.parse(categoryString);
    const categoryFull = categoriesArray[0].replace("&amp;", "&");
    const [category, subcategory] = categoryFull.split(" & ");
    return { category, subcategory };
  } catch (error) {
    console.error("Error parsing category:", error);
    return { category: "", subcategory: "" };
  }
};

const CouponCard = () => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState(null);
  const [couponId, setCouponid] = useState(null);
  const [categoryString, setCategoryString] = useState(null);
  const [kppi, setKpi] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();
  const { userId, token } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const couponCode = "SAILYCO5";
  // const storeURL = "https://saily.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this link: ");
    const whatsappUrl = `https://wa.me/?text=${text}${url}`;
    window.open(whatsappUrl, "_blank");
  };

  const generateClickId = () => crypto.randomUUID();

//   const handleSelectCoupon = async (id) => {
//     setIsLoading(true);

//     const PUBLIC_COUPON_IDS = [
//       "6373", "6372", "6367", "6369", "6342", "6343", "6344", "6345",
//       "6346", "6347", "6348", "6349", "6350", "6351", "6352", "6353",
//       "6354", "6355", "6356", "6357", "6358", "6359", "6360", "6361",
//       "6362", "6363", "6364", "6365", "6366", "6368", "6383"
//     ];

//     const STATIC_USER_ID = "9";
//     const isPublicCoupon = PUBLIC_COUPON_IDS.includes(String(id));
//     const isGuest = !token;
//     const finalUserId = isPublicCoupon ? STATIC_USER_ID : userId;
//     const clickId = isPublicCoupon && isGuest ? generateClickId() : undefined;

//     try {
//       const params = new URLSearchParams({
//         user_id: finalUserId,
//         coupon_id: id,
//       });

//       if (clickId) params.append("click_id", clickId);

//       const response = await fetch(`${apiUrl}/api/get-click?${params.toString()}`, {
//         method: "GET",
//         redirect: "follow",
//       });

//       const data = await response.json();
// console.log("data",data)
//       if (data.success && data.url) {
//          setTimeout(() => {
//           window.location.href = data.url;
//          }, 3000); // Wait 3 seconds before redirect
//       } else {
//         setIsLoading(false);
//         Swal.fire({
//           icon: "error",
//           title: "Click failed",
//           text: data.message || "Could not generate tracking link.",
//         });
//       }
//     } catch (err) {
//       setIsLoading(false);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Something went wrong!",
//       });
//     }
//   };

  useEffect(() => {
    const fetchCoupon = async () => {
      if (!slug) return;
      setLoading(true);
      const decodedSlug = decodeURIComponent(slug);

      const data = await getsingleOffer(decodedSlug);
console.log("data",data.url)
      // if (data.success) {
        setCoupon(data);
        // setCategoryString(data.data.categories);
        setCouponid(data.id);
        // setKpi(data.data.kpi);
      //}

      setLoading(false);
    };

    fetchCoupon();
  }, [slug]);

  const [showRedirectLoader, setShowRedirectLoader] = useState(false);

  // Auto click trigger after 3 sec of data loading
  useEffect(() => {
    if (!coupon || !coupon.url) return;
  
    // Show spinner in place of coupon code
    setShowRedirectLoader(true);
  
    const timer = setTimeout(() => {
      window.open(coupon.url, '_blank');
    }, 2000); // 4 seconds
  
    return () => clearTimeout(timer);
  }, [coupon]);
  
  const { category, subcategory } = useMemo(() => {
    return categoryString ? parseCategory(categoryString) : { category: "", subcategory: "" };
  }, [categoryString]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }



  // if (!coupon) return <h2>Coupon Not Found</h2>;

  return (
    <>
      <Header />
      {isLoading && (
  <div className="fixed inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mb-4"></div>
      <p className="text-lg font-medium text-gray-700">Loading...</p>
    </div>
  </div>
)}

      <div className="px-6 md:px-6 lg:px-6 md:px-12 lg:px-20 py-6 md:py-12 lg:py-12 bg-[#90AEAE] items-center">
        <div className="flex justify-between items-center px-4 md:px-6 lg:px-6 py-4 mx-0 md:mx-16 lg:mx-16">
          <button
            className="text-white text-sm md:text-lg font-medium flex items-center hover:underline"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
          <button className="text-white text-sm md:text-lg font-medium flex items-center hover:underline gap-1">
            <span onClick={shareToWhatsApp}>Share</span>
            <IoMdShare className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
        </div>

        <div className="max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
               {coupon.description} 
            </h2>
            <img
                    src={coupon.img}

              alt={coupon.img}
              className="h-12 object-contain"
            />
          </div>

          <hr className="my-4" />
     {/* CTA – conditional button */}
     <div >
  {coupon.title?.trim().toLowerCase() == "offer" ? (
    /* Green “Grab Offer” button */
    <p className="text-center mb-3">
    Offer is activated
    <a
      href={coupon.url}
      className="text-blue-600 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      
    </a>
    :
  </p>
  ) : (
    /* Default blue “Get Coupon” button */
    <p className="text-center mb-3">
    Use this coupon code at{" "}
    <a
      href={coupon.url}
      className="text-blue-600 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {slug}
    </a>
    :
  </p>
  )}
</div>
         
              {/* CTA – conditional button */}
<div>
  {coupon.title?.trim().toLowerCase() == "offer" ? (
    /* Green “Grab Offer” button */
    <div className="flex justify-center items-center mb-4">
            <div className="border-2 border-dashed border-black bg-gray-100 px-4 py-3 flex items-center gap-4">
            <span className="text-xl font-bold tracking-wider">
  {showRedirectLoader ? (
    <span className="inline-block w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
  ) : (
    coupon.title
  )}
</span>

              <button
                onClick={handleCopy}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center text-sm"
              >
               
                OFFER ACTIVATED
              </button>
            </div>
          </div>
  ) : (
    /* Default blue “Get Coupon” button */
    <div className="flex justify-center items-center mb-4">
    <div className="border-2 border-dashed border-black bg-gray-100 px-4 py-3 flex items-center gap-4">
    <span className="text-xl font-bold tracking-wider">
{showRedirectLoader ? (
<span className="inline-block w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
) : (
coupon.title
)}
</span>

      <button
        onClick={handleCopy}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center text-sm"
      >
        <FaCopy className="mr-1" />
        {copied ? "Copied!" : "Copy Code"}
      </button>
    </div>
  </div>
  )}
</div>

         

          <div className="text-center">
            <a
              href={coupon.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              <FaExternalLinkAlt className="mr-1" />
              Go To {slug} Website
            </a>
          </div>
        </div>
      </div>

      <Couponcard category={category} />
      <Subscribe />
      <Footer />
    </>
  );
};

export default CouponCard;

