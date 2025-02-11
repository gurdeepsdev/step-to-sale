// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// const ApplyCoupon = () => {
//   const [couponId, setCouponId] = useState("");
//   const [amountEarned, setAmountEarned] = useState("");
//   const [userId, setUserId] = useState("29");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (userId) {
//       socket.on(`notification-${userId}`, (data) => {
//         alert(data.message);
//       });
//     }
//     return () => {
//       socket.off(`notification-${userId}`);
//     };
//   }, [userId]);

//   const handleApplyCoupon = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/applyCoupon", {
//         userId,
//         couponId,
//         amountEarned,
//       });
//       setMessage(response.data.message);
//     } catch (error) {
//       console.error("Error applying coupon:", error);
//       setMessage("Failed to apply coupon");
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
//       <h2 className="text-xl font-bold mb-4">Apply Coupon</h2>
//       <input
//         type="text"
//         placeholder="Coupon ID"
//         className="w-full p-2 border rounded mb-2"
//         value={couponId}
//         onChange={(e) => setCouponId(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Amount Earned"
//         className="w-full p-2 border rounded mb-2"
//         value={amountEarned}
//         onChange={(e) => setAmountEarned(e.target.value)}
//       />
//       <button
//         className="w-full bg-blue-500 text-white p-2 rounded"
//         onClick={handleApplyCoupon}
//       >
//         Apply Coupon
//       </button>
//       {message && <p className="mt-2 text-green-500">{message}</p>}
//     </div>
//   );
// };

// export default ApplyCoupon;

import { Users, MousePointerClick, Coins } from "lucide-react"

export default function ReferAndEarn() {
  const steps = [
    {
      icon: Users,
      title: "INVITE YOUR FRIENDS",
      description:
        "Share your unique referral code with your friends and family. Spread the word about Step to Sale and help others discover it",
      step: 1,
      accentColor: "bg-teal-600",
    },
    {
      icon: MousePointerClick,
      title: "YOUR FRIEND SIGNS UP",
      description:
        "When your friend joins Step to Sale using your referral code, you receive 20% of their earning while they attract",
      step: 2,
      accentColor: "bg-orange-500",
    },
    {
      icon: Coins,
      title: "GET REWARDED",
      description:
        "Once your friend successfully join your club, you start getting rewarded! The more you refer, the more you earn - there's",
      step: 3,
      accentColor: "bg-blue-500",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Refer and Earn</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Earn rewards effortlessly by referring your friends to Step to Sale. Follow these simple steps to start
          earning today!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative flex">
            {/* Accent curve */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-8 ${step.accentColor} h-32 rounded-l-full`} />

            {/* Card */}
            <div className="relative ml-6 bg-white rounded-3xl p-6 shadow-lg  items-center  justify-center gap-4">
              <div className=" w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
                <step.icon className="w-8 h-8 text-gray-800" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              <div
                className={`absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 ${step.accentColor} rounded-full flex items-center justify-center text-white font-bold text-sm`}
              >
                {step.step}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



