import React, { useState,useEffect,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import api from "../utils/api"; // Import API utility

const CouponAlert = () => {
      const { token, userId, balance, username, referralCode, phone_number } = useContext(AuthContext);
      const apiUrl = import.meta.env.VITE_API_URL;

      const [email, setEmail] = useState("");

const handleSubmit = (e) => {
  e.preventDefault(); // Prevent form reload
  submitEmail(email);
};


const submitEmail = async (email) => {
  // Simple email regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  try {
    console.log("Submitting email:", email);

    const response = await api.post("/api/subscribe-details", { email: email.trim().toLowerCase() });

    console.log("API Response:", response.data);
    alert(response.data.message);
  } catch (err) {
    console.error("API Error:", err);
    if (err.response) {
      alert(err.response.data.message || "Failed to subscribe");
    } else {
      alert("Network error. Please try again.");
    }
  }
};

  

  return (
    <div className="bg-[#90AEAE] text-white  py-4 md:py-8 lg:py-8 px-4">
    <div className=" mx-2 lg:mx-16 flex flex-col lg:flex-row items-center lg:gap-8">
      {/* Left: Image Section */}
      <div className="lg:w-1/2 flex justify-center lg:justify-start">
        <img
          src="/img/subscribe.png" // Replace with your image URL
          alt="Subscribe Illustration"
          className="w-56 h-auto lg:w-64"
        />
      </div>

      {/* Right: Centered Text and Form Section */}
      <div className="lg:w-2/3 flex flex-col justify-center items-center lg:items-end text-center lg:text-left">
        {/* Heading */}
        <h2 className="text-[18px] lg:text-2xl font-[500] mb-2 md:mb-4 lg:mb-4  text-center lg:px-12  md:px-12 px-0 ">
        Get Top Deals Straight to Your Inbox!
        </h2>

        {/* Subtext */}
         <p className="text-[10px] lg:text-base leading-relaxed mb-4 md:mb-6 lg:mb-6 text-center">
      Never miss a deal again! Sign up now to receive exclusive offers, discounts, and savings directly in your inbox—delivered just for you.
        </p> 

        {/* Input and Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[28rem]">
          <input
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           required
            placeholder="Enter your email address"
            className="flex-grow px-2 lg:px-10 py-1 rounded-full border border-gray-300 text-gray-800 focus:outline-none"
          />
          <button className="bg-[#E74833] hover:bg-white text-white hover:text-black font-medium px-4 py-1 rounded-full"
          onClick={handleSubmit}>
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CouponAlert;
