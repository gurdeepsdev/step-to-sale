import  { useEffect, useState, useContext } from "react";
import { getCouponBySlug } from "../utils/api";
import Couponcard from "../components/Couponcard";
import Header from "../components/Header";
import { AiOutlineLike,AiOutlineDislike} from "react-icons/ai";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import { IoMdShare } from "react-icons/io";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import parse from "html-react-parser";
import Swal from 'sweetalert2';
import axios from 'axios'
import { Helmet } from "react-helmet";
import metaData from "../meta/metaData.json";

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

const OfferCard = () => {

    const {userId,token} = useContext(AuthContext);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [message, setMessage] = useState("");

    const [des, setDes] = useState("");
    const [terms, setTerms] = useState([]);
    const { slug } = useParams(); // Get slug from URL
    const [coupon, setCoupon] = useState(null);
    const [couponId, setCouponid] = useState(null);

    const [categoryString, setCategoryString] = useState(null);

    const [loading, setLoading] = useState(true);
    const [kppi, setKpi] = useState("");

    const navigate = useNavigate();
    const [feedback, setFeedback] = useState(null);
    const [stats, setStats] = useState({ percentage: 0, yesCount: 0, noCount: 0 });

    useEffect(() => {
      fetchFeedbackStats();
  }, []);

  const fetchFeedbackStats = async () => {
      try {
          const { data } = await axios.get(`${apiUrl}/api/${couponId}/feedback`);
          setStats(data);
      } catch (error) {
          console.error("Error fetching feedback stats",error);
      }
  };


  const submitFeedback = async (feedbackType) => {
    try {
        

        if (!token || !userId) {
          Swal.fire({
            icon: "warning",
            title: "Oops... Please login",
            text: "Login first to access this offer!",
          });
            console.error("User not authenticated");
            return;
        }

        await axios.post(
            `${apiUrl}/api/feedback`,
            {
                user_id:userId, // Include user_id in request body
                coupon_id: couponId,
                feedback: feedbackType,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        setMessage("your feedback is submitted ")
        setFeedback(feedbackType);
        fetchFeedbackStats(); // Refresh feedback stats after submission
    } catch (error) {
        console.error("Error submitting feedback:", error.response?.data || error.message);
    }
};


    useEffect(() => {
      const fetchCoupon = async () => {
          if (!slug) return; // ✅ Prevents unnecessary calls when slug is empty
  
          setLoading(true);
          const data = await getCouponBySlug(slug);
  
          if (data.success) {
              setCoupon(data.data);
              setCategoryString(data.data.categories)
              setCouponid(data.data.id);
              setKpi(data.data.kpi);

          }
  
          setLoading(false);
      };
  
      fetchCoupon();
  }, [slug]); // Runs only when slug changes

const shareToWhatsApp = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Check out this link: ");
  const whatsappUrl = `https://wa.me/?text=${text}${url}`;
  window.open(whatsappUrl, "_blank");
};


console.log(coupon,"coupon")
// Function to Decode HTML Entities
const decodeHtmlEntities = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

// Function to Extract Title and Terms from HTML
const extractKpiData = (kppi) => {
  if (!kppi) return { title: "", terms: [] };

  // ✅ Step 1: Decode HTML Entities
  const decodedHtml = decodeHtmlEntities(kppi);

  // ✅ Step 2: Parse the HTML into a Document
  const parser = new DOMParser();
  const doc = parser.parseFromString(decodedHtml, "text/html");

  // ✅ Step 3: Extract Title (First Non-Empty Text)
  let title = "";
  const elements = doc.body.childNodes; // Get all elements in body

  for (let el of elements) {
    const text = el.textContent.trim();
    if (text && !text.startsWith("-")) { // Ensure it's not a bullet point
      title = text;
      break;
    }
  }

  // ✅ Step 4: Extract Terms (From <b> or Other Tags)
  let terms = [];
  
  // Try extracting from <b> tags first
  const boldElements = doc.querySelectorAll("b");
  terms = Array.from(boldElements)
    .map((b) => b.textContent.trim())
    .filter((term) => term.length > 0);

  // ✅ Fallback: If No Bold Elements, Get Remaining Text
  if (terms.length === 0) {
    terms = Array.from(elements)
      .slice(1) // Skip first element (title)
      .map((el) => el.textContent.trim())
      .filter((term) => term.length > 0);
  }

  // ✅ Step 5: Format Terms with Bullet Points
  const formattedTerms = terms.flatMap((term) =>
    term.split("\n").map((line) => (line.startsWith("-") ? `• ${line.slice(1).trim()}` : `• ${line}`))
  );

  return { title, terms: formattedTerms };
};

// Usage in React
useEffect(() => {
  const { title, terms } = extractKpiData(kppi);
  setDes(title);
  setTerms(terms);
}, [kppi]);

const generateClickId = () => crypto.randomUUID();

const handleReferClick = async () => {
  console.log("handleReferClick called after 4 seconds!");

  // ---------------------------------
const PUBLIC_COUPON_IDS = ["6373","6372","6376","6367","6369","6342", "6343","6344","6345","6346","6347","6348","6349","6350","6351","6352","6353","6354","6355","6356","6357","6358","6359",
"6458","6459","6460","6455","6461","6462" ,"6451","6452","6453","6454","6449","6448", "6360","6361","6362","6363","6364","6365","6366","6368","6378","6383","6384","6395","6396","6410","6420","6421","6417","6422","6423","6424","6434","6433","6432","6439","6440","6441","6442"]
const STATIC_USER_ID = "9"; // guest user
  const isPublicCoupon = PUBLIC_COUPON_IDS.includes(String(couponId));
  const isGuest = !token;
  const allowAnonymous = isPublicCoupon;

  if (isGuest && !allowAnonymous) {
    Swal.fire({
      icon: "warning",
      title: "Oops... Please login",
      text: "Login first to access this offer!",
    });
    return;
  }

  const finalUserId = isPublicCoupon ? STATIC_USER_ID : userId;
  const clickId = isPublicCoupon && isGuest ? generateClickId() : undefined;
  // Always open new tab immediately to avoid popup blockers
  const newTab = window.open("about:blank", "_blank");

  try {
    const params = new URLSearchParams({
      user_id: finalUserId,
      coupon_id: couponId,
    });
    if (clickId) params.append("click_id", clickId);

    const response = await fetch(`${apiUrl}/api/get-click?${params.toString()}`, {
      method: "GET",
      redirect: "follow",
    });

    const data = await response.json();

    if (data.success && data.trackingUrl) {
      // Use this trick to safely change location after tab is opened
      newTab.location.href = data.trackingUrl;
    } else {
      newTab.close();
      Swal.fire({
        icon: "error",
        title: "Click failed",
        text: data.message || "Could not generate tracking link.",
      });
    }
  } catch (err) {
    console.error("Error during auto click redirect:", err);
    newTab.close();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};

  
if (loading) {
  return (
    <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
  </div>
  );
}
    if (!coupon) return <h2>Coupon Not Found</h2>;
    const parseCategory = (categoryString) => {
      try {
          // Convert string to an array
          const categoriesArray = JSON.parse(categoryString);
  
          // Take the first category from the array and decode HTML entities
          const categoryFull = categoriesArray[0].replace("&amp;", "&");
  
          // Split into category and subcategory
          const [category, subcategory] = categoryFull.split(" & ");
  
          return { category, subcategory };
      } catch (error) {
          console.error("Error parsing category:", error);
          return { category: "", subcategory: "" };
      }
  };
  
  // Example Usage
  // const categories = "[\"health &amp; personal care\"]"; // Example input
  const { category, subcategory } = parseCategory(categoryString);
  
  // const handleReferClick = async () => {
  //   if (!token) {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Oops... Please login",
  //       text: "Login first to access this offer!",
  //     });
  //     return;
  //   }
  
  //   // Open a blank tab immediately (to bypass popup blockers)
  //   const newTab = window.open("", "_blank");
  
  //   try {
  //     const response = await fetch(
  //       `${apiUrl}/api/get-click?user_id=${userId}&coupon_id=${couponId}`,
  //       { method: "GET", redirect: "follow" }
  //     );
  
  //     const data = await response.json();
  
  //     if (data.success && data.trackingUrl) {
  //       newTab.location.href = data.trackingUrl; // Redirect opened tab
  //     } else {
  //       alert(data.message || "Click tracking failed!");
  //       newTab.close(); // Close tab if no valid URL
  //     }
  //   } catch (error) {
  //     console.error("Error tracking click:", error);
  //     alert("Something went wrong!");
  //     newTab.close(); // Close tab on error
  //   }
  // };
  

//   const handleClick = async () => {
//     try {
//         const response = await fetch(
//             `${apiUrl}/api/get-click?user_id=${userId}&coupon_id=${couponId}`,
//             { method: "GET", redirect: "follow" } // Allow redirects
//         );
//         const data = await response.json();

//         if (data.success && data.redirectUrl) {
//           // window.open(data.redirectUrl, "_blank");


//           // Open Trackier tracking link in a new tab (user's IP will be logged)
//       window.open(data.trackingUrl, "_blank"); 

//       // Redirect user to the merchant site
//       // window.location.href = data.redirectUrl;

//         } else {
//             alert(data.message || "Click tracking failed!");
//         }

       
//     } catch (error) {
//         console.error("Error tracking click:", error);
//         alert("Something went wrong!");
//     }
// };

// const handleReferClick = () => {
      
//   if (token) {
//     handleClick(); // Open modal if logged in
//   } else {
//       Swal.fire({
//           icon: 'warning',
//           title: 'Oops... Please login',
//           text: 'Login first to access this offer!',
//         });
//   }
// };

  return (
    <>
     {couponId && (
        <Helmet>
          <title>{metaData[couponId]?.title || coupon?.title || "Best Coupon Deals Online"}</title>
          <meta
            name="description"
            content={
              metaData[couponId]?.description || coupon?.description || "Discover great deals and discounts."
            }
          />
            <script type="application/ld+json">
          {JSON.stringify(metaData[couponId]?.jsonLd)}
        </script>
        </Helmet>
      )}
    <Header/>
    {/* {loading && <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>} */}
    <div className="px-6 md:px-6 lg:px-6 md:px-12 lg:px-20 py-6 md:py-12 lg:py-12 bg-[#90AEAE] items-center">
  {/* Header */}
  <div className="flex justify-between items-center px-4 md:px-6 lg:px-6 py-4 mx-0 md:mx-16 lg:mx-16">
    <button className="text-white text-sm md:text-lg lg:text-lg font-medium flex items-center hover:underline"
          onClick={() => navigate(-1)} // Goes back to the previous page
>
{coupon.title === "Omio"
    ? "← Regresar"
    : " ← Go Back"}
     
    </button>
    <button className="text-white text-sm md:text-lg lg:text-lg font-medium flex items-center hover:underline gap-1">
    <span onClick={shareToWhatsApp}>
    {coupon.title === "Omio"
    ? "Compartir"
    : " Share"}</span>  <IoMdShare className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />

    </button>
  </div>
  {/* Outer Container */}
  <div className="bg-white rounded-lg shadow-lg mx-0 md:mx-16 lg:mx-16">
    {/* Main Content */}
    <div className="flex flex-col md:flex-row">
      {/* Left Section (60%) */}
      <div className="md:w-3/5 px-4 py-6 md:px-6 lg:px-6 md:py-8 lg:py-8 border-r border-gray-300">
        <div className="text-center">
          <img
            src={coupon.logo_url}
            alt="Amazon"
            className="w-36 mx-auto"
          />
          {/* {stripHtmlTags(coupon.kpi)} */}
          <h2 className="text-lg md:text-xl lg:text-xl font-bold mt-4 text-gray-800">
  {coupon.title === "Omio"
    ? "Ahorre en grande, viaje con inteligencia ¡Su aventura le está esperando!"
    : stripHtmlTags(coupon.description)}
</h2>
            {/* <span className="text-orange-500">Redmi Mobiles</span> */}
          {/* <p className="text-gray-600 mt-2 text-sm">
          {stripHtmlTags(coupon.kpi)}
          
            Amazon Great Indian Sale - Get 25% OFF on Redmi Mobiles
          </p>  */}
        </div>

        <div className="flex items-center justify-center mt-6">
  {coupon.code ? (
    // If coupon.code exists, show the "Show Coupon" button and the code
    <div className="flex items-center rounded-full">
      <button className="bg-[#5396AF] text-white px-4 py-1 md:px-6 lg:px-6 md:py-2 lg:py-2 rounded-l-full text-lg font-medium hover:bg-blue-600 transition">
        
        {coupon.title === "Omio"
    ? "Mostrar cupón"
    : "Show Coupon"} 
      </button>
      <span className="bg-white text-black px-2 py-1 md:py-1 lg:py-1 text-lg font-semibold border-t border-b border-r border-dotted border-[#5396AF] rounded-r-full">
        {coupon.code}
      </span>
    </div>
  ) : (
    // If coupon.code does NOT exist, show the "Get Deal" button
    <button className="bg-red-600  text-white hover:text-black px-6 py-2 rounded-full text-lg font-medium hover:bg-white transition hover:border"
    onClick={handleReferClick} >
    {coupon.title === "Omio"
    ? "Obtener oferta"
    : "Get Deal"} 
    </button>
  )}
</div>


        <div className="text-sm text-gray-600 mt-6 leading-relaxed">
          <p>
          {coupon.title === "Omio"
    ? "Descubra más, estrésese menos: reserva fácil."
    : (des)} 
          </p>
          <p className="mt-2 mb-2 text-center"></p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <span>
          {coupon.title === "Omio"
    ? "¿Funcionó?"
    : "Did it work?"}  </span>

          {/* Yes Button */}
          <button className={`flex items-center bg-green-300  text-green-600 px-2 py-1 rounded-md  text-sm font-medium hover:bg-green-600 hover:text-white transition  ${feedback === "yes" ? "bg-green-500 text-white" : "bg-gray-200"}`}
                              onClick={() => submitFeedback("yes")}
>
            <AiOutlineLike className="w-5 h-5 mr-2" /> Yes
          </button>

          {/* No Button */}
          <button className={`flex items-center bg-red-300 text-red-600 px-2 py-1 rounded-md shadow-md text-sm font-medium hover:bg-red-600 hover:text-white transition `}
                              onClick={() => submitFeedback("no")}
>
            <AiOutlineDislike className="w-5 h-5 mr-2" /> No
          </button>
         
        </div>
        <p className="text-center mt-6"> {message}</p>

      </div>

      {/* Right Section (40%) */}
      <div className="md:w-2/5 px-6 py-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
        {coupon.title === "Omio"
    ? "Términos y condiciones"
    : " Terms and Conditions"} 
        </h3>
        {coupon.title === "Omio" ? (
  <>
   <ul className="list-disc list-inside text-justify space-y-2">
  <li>Elegibilidad: Abierto a todos los clientes de Step to Sale.</li>
  <li>Reserva: Debe reservar a través de Step to Sale; se excluyen las reservas directas de Omio.</li>
  <li>Código promocional: Use el código SAILANDSAVE para obtener un 7% de descuento en reservas de ferry.</li>
  <li>Detalles del descuento: Válido en compras de hasta 100 €; debe reservarse antes del 30 de junio de 2025 (23:59 CET).</li>
  <li>Limitaciones del cupón: Un cupón por reserva; no se puede combinar ni transferir.</li>
  <li>Pagos y reembolsos: Siga las políticas de Omio.</li>
  <li>Cambios y cancelaciones: Sujeto a las condiciones de Omio.</li>
  <li>Modificaciones: Las condiciones pueden actualizarse en cualquier momento sin previo aviso.</li>
</ul>


  </>
) : (
  terms.map((term, index) => (
    <li className="list-none text-justify" key={index}>{parse(term)}</li>
  ))
)}

      </div>
    </div>
  </div>
</div>
<div className="p-3 border rounded-lg shadow-md">
            {/* <p className="text-lg font-semibold">Working: {stats.percentage}% ({stats.yesCount} Yes / {stats.noCount} No)</p> */}
            {/* <div className="flex gap-4 mt-2">
                <button 
                    className={`px-4 py-2 rounded-md ${feedback === "yes" ? "bg-green-500 text-white" : "bg-gray-200"}`}
                    onClick={() => submitFeedback("yes")}
                >
                    Yes
                </button>
                <button 
                    className={`px-4 py-2 rounded-md ${feedback === "no" ? "bg-red-500 text-white" : "bg-gray-200"}`}
                    onClick={() => submitFeedback("no")}
                >
                    No
                </button>
            </div> */}
        </div>
<Couponcard category={category} />
    <Subscribe/>
    <Footer/>
    </>
  );
};

export default OfferCard;

