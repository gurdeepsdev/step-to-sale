import  { useContext } from "react";
import { FiX, FiCopy } from "react-icons/fi"; // Icons for close & copy
import { FaWhatsapp } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import Swal from 'sweetalert2'

const steps = [
  {
    title: "SEARCH",
    description: "From thousands of stores for your favorite brand.",
    icon: "/img/Search.webp",
    border: "/img/Searchborder.webp",
    color: "text-red-600",
  },
  {
    title: "SELECT",
    description: "From dozens of coupons and deals that suits you best.",
    icon: "/img/Select.webp",
    border: "/img/Selectborder.webp",
    color: "text-green-600",
  },
  {
    title: "CLICK",
    description: "On the coupon/deal that you need.",
    icon: "/img/Click.webp",
    border: "/img/Clickborder.webp",
    color: "text-blue-600",
  },
  {
    title: "APPLY",
    description: "Use the coupon or deal and save money.",
    icon: "/img/Apply.webp",
    border: "/img/Applyborder.webp",
    color: "text-orange-600",
  },
];

const Worksub = () => {
  return (
    <section className="pb-10 bg-white overflow-hidden">
      {/* Heading */}
      <div className="text-center lg:mb-24 px-4">
        <h2 className="text-4xl font-bold">How it Works</h2>
      </div>

      {/* Steps */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 py-10">
        {steps.map((step, i) => {
          const isTop = i % 2 !== 0;

          return (
            <div
              key={i}
              className={`relative flex justify-center ${
                isTop
                  ? "lg:-translate-y-20 lg:pt-0 pt-10"
                  : "lg:translate-y-20 translate-y-20"
              }`}
            >
              {/* BORDER WRAPPER */}
              <div className="relative w-[240px] h-[240px]">
                {/* Border Image */}
                <img
                  src={step.border}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />

                {/* INNER CONTENT */}
                <div
                  className={`absolute inset-[20%] ${
                    isTop ? "pb-[100px]" : "pt-[100px]"
                  } flex flex-col items-center justify-center text-center`}
                >
                  <h3
                    className={`${step.color} font-semibold tracking-widest`}
                    style={{ fontSize: "clamp(1rem, 2.2vw, 1.25rem)" }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-gray-600 mt-2 leading-snug"
                    style={{ fontSize: "clamp(0.8rem, 2vw, 0.95rem)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>

              {/* ICON */}
              <div
                className={`absolute ${
                  isTop
                    ? "lg:bottom-[-150px] bottom-[-75px]"
                    : "lg:top-[-150px] top-[-75px]"
                } lg:w-44 lg:h-44 w-28 h-28 flex items-center justify-center`}
              >
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// export default HowItWorks;

// const Worksub = ({isOpen, setIsOpen }) => {
//       const { token, referral_code } = useContext(AuthContext);
    
//     // const [isOpen, setIsOpen] = useState(false);
//     const referralLink = `https://steptosale.com?ref=${referral_code}`;
  
//     const handleWhatsAppShare = () => {
//       const message = `Hey! Your earning journey starts here! Use my referral code ${referral_code} on StepToSale and start making money. Join now: ${referralLink}`;
//       window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
//     };
//     const handleSMSShare = () => {
//         const message = `Hey! Your earning journey starts here! Use my referral code ${referral_code} on StepToSale and start making money. Join now: ${referralLink}`;
//         window.open(`sms:?body=${encodeURIComponent(message)}`);
//     };

//     const copyToClipboard = () => {
//         navigator.clipboard.writeText(referral_code);
//         Swal.fire({
//           icon: 'success',
//           title: 'successful',
//           text: 'Referral link copied!',
//         });
//       };



//       const handleReferClick = () => {
      
//         if (token) {
//           setIsOpen(true); // Open modal if logged in
//         } else {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Oops...',
//                 text: 'Please login first!',
//               });
//         }
//       };

//   return (
//     <div className="bg-[#90AEAE] text-white py-4 md:py-8 lg:py-8 px-4">
//       <div className="max-w-container mx-auto">
//       <div className="mx-2 lg:mx-16 flex flex-col lg:flex-row justify-between items-center lg:gap-8 ">
//         {/* Left: Text Section */}
//         <div className="lg:w-2/3 text-left">
//           <h2 className="text-md md:text-lg lg:text-lg  font-semibold">
//             Earn 20% of your friend's earnings when they join Step to Sale with your code!
//           </h2>
//         </div>

//         {/* Right: Button Section */}
//         <div className="lg:w-1/3 flex justify-end mt-2 md:mt-0 lg:mt-0">
//           <button className="bg-[#E74833] hover:bg-white text-white hover:text-black font-medium px-4 py-1 md:py-2 lg:py-2 md:px-6 lg:px-6 text-xs md:text-lg lg:text-lg rounded-full"
//       onClick={handleReferClick}
// >
//             Refer Now
//           </button>
//         </div>
//       </div>
//             {/* Modal */}
//             {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-98 text-center relative">
//             {/* Close Button */}
//             <button
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//               onClick={() => setIsOpen(false)}
//             >
//               <FiX size={20} />
//             </button>

//             {/* Title */}
//             <h2 className="text-lg font-semibold text-black mt-2">Boost Your Wallet: Profit by Sharing with Friends</h2>

//             {/* Sharing Icons */}
//             <div className="flex justify-center gap-24 my-4">
//               <button onClick={handleWhatsAppShare}>
//                 <FaWhatsapp size={50} className="text-green-500 text-4xl hover:scale-110 transition-transform" />
//               </button>
//               <button onClick={handleSMSShare}>
//                 <IoChatbubbleEllipsesOutline size={50} className="text-blue-500 text-4xl hover:scale-110 transition-transform" />
//               </button>
//             </div>

//             {/* OR Separator */}
//             <div className="flex items-center my-4">
//               <hr className="flex-grow border-gray-300" />
//               <span className="mx-2 text-gray-500 border py-1 px-6 rounded">or</span>
//               <hr className="flex-grow border-gray-300" />
//             </div>
// <div className="text-center text-black font-semibold mb-4">
// <h4>Copy your referral code</h4>
// </div>
//             {/* Referral Link Input with Copy Button */}
//             <div className="flex items-center border text-black border-gray-300 rounded-lg overflow-hidden">
//               <input
//                 type="text"
//                 value={referral_code}
//                 readOnly
//                 className="w-full p-2 text-sm  outline-none"
//               />
//               <button
//                 onClick={copyToClipboard}
//                 className="bg-white px-4 py-2 text-black hover:bg-gray-200 flex items-center gap-2"
//               >
//                 <FiCopy />
//                 Copy 
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
// </div>
//     </div>
//   );
// };

export default Worksub;
