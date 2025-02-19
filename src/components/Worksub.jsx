import React, { useState,useEffect,useContext } from "react";
import { FiX, FiCopy } from "react-icons/fi"; // Icons for close & copy
import { FaWhatsapp } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";

const Worksub = ({isOpen, setIsOpen }) => {
      const { token, userId, balance, username, email, referralCode } = useContext(AuthContext);
    
    // const [isOpen, setIsOpen] = useState(false);
    const referralLink = `https://steptosale.com?ref=${referralCode}`;
  
    const handleWhatsAppShare = () => {
      const message = `Hey! Your earning journey starts here! Use my referral code ${referralCode} on StepToSale and start making money. Join now: ${referralLink}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    };
    const handleSMSShare = () => {
        const message = `Hey! Your earning journey starts here! Use my referral code ${referralCode} on StepToSale and start making money. Join now: ${referralLink}`;
        window.open(`sms:?body=${encodeURIComponent(message)}`);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralCode);
        alert("Referral link copied!"); // Optional feedback
      };

  return (
    <div className="bg-[#90AEAE] text-white py-4 md:py-8 lg:py-8 px-4">
      <div className="mx-2 lg:mx-16 flex flex-col lg:flex-row justify-between items-center lg:gap-8">
        {/* Left: Text Section */}
        <div className="lg:w-2/3 text-left">
          <h2 className="text-md md:text-lg lg:text-lg  font-semibold">
            Earn 20% of your friend's earnings when they join Step to Sale with your code!
          </h2>
        </div>

        {/* Right: Button Section */}
        <div className="lg:w-1/3 flex justify-end mt-2 md:mt-0 lg:mt-0">
          <button className="bg-[#E74833] hover:bg-white text-white hover:text-black font-medium px-4 py-1 md:py-2 lg:py-2 md:px-6 lg:px-6 text-xs md:text-lg lg:text-lg rounded-full"
                  onClick={() => setIsOpen(true)}
>
            Refer Now
          </button>
        </div>
      </div>
            {/* Modal */}
            {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-98 text-center relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              <FiX size={20} />
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold text-black mt-2">Boost Your Wallet: Profit by Sharing with Friends</h2>

            {/* Sharing Icons */}
            <div className="flex justify-center gap-24 my-4">
              <button onClick={handleWhatsAppShare}>
                <FaWhatsapp size={50} className="text-green-500 text-4xl hover:scale-110 transition-transform" />
              </button>
              <button onClick={handleSMSShare}>
                <IoChatbubbleEllipsesOutline size={50} className="text-blue-500 text-4xl hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* OR Separator */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500 border py-1 px-6 rounded">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
<div className="text-center text-black font-semibold mb-4">
<h4>Copy your referral code</h4>
</div>
            {/* Referral Link Input with Copy Button */}
            <div className="flex items-center border text-black border-gray-300 rounded-lg overflow-hidden">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="w-full p-2 text-sm  outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="bg-white px-4 py-2 text-black hover:bg-gray-200 flex items-center gap-2"
              >
                <FiCopy />
                Copy 
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Worksub;
