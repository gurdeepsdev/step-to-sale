import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const ApplyCoupon = () => {
  const [couponId, setCouponId] = useState("");
  const [amountEarned, setAmountEarned] = useState("");
  const [userId, setUserId] = useState("29");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userId) {
      socket.on(`notification-${userId}`, (data) => {
        alert(data.message);
      });
    }
    return () => {
      socket.off(`notification-${userId}`);
    };
  }, [userId]);

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/applyCoupon", {
        userId,
        couponId,
        amountEarned,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error applying coupon:", error);
      setMessage("Failed to apply coupon");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Apply Coupon</h2>
      <input
        type="text"
        placeholder="Coupon ID"
        className="w-full p-2 border rounded mb-2"
        value={couponId}
        onChange={(e) => setCouponId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount Earned"
        className="w-full p-2 border rounded mb-2"
        value={amountEarned}
        onChange={(e) => setAmountEarned(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded"
        onClick={handleApplyCoupon}
      >
        Apply Coupon
      </button>
      {message && <p className="mt-2 text-green-500">{message}</p>}
    </div>
  );
};

export default ApplyCoupon;
