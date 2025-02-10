import React, { useState } from "react";

const InstantWithdrawal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");
  const [transferMethod, setTransferMethod] = useState("bank");

  const handleWithdraw = () => {
    alert(`Withdrawing ${amount} via ${transferMethod}`);
  };

  if (!isOpen) return null; // Hide modal if isOpen is false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>

        <h1 className="text-xl font-bold text-center text-gray-800 mb-4">Instant Withdrawal</h1>

        {/* Amount Input */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="50 Rs"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Transfer Methods */}
        <div className="mb-4">
          <div className="flex items-center justify-between w-full mb-2">
            <label htmlFor="transferToBank" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="radio"
                id="transferToBank"
                name="transferMethod"
                value="bank"
                checked={transferMethod === "bank"}
                onChange={() => setTransferMethod("bank")}
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              Transfer to Bank
            </label>
            <img src="/img/bank.png" className="h-6 w-6" alt="Bank" />
          </div>

          <div className="border border-b mt-2 mb-2"></div>

          <div className="flex items-center justify-between w-full">
            <label htmlFor="transferToUPI" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="radio"
                id="transferToUPI"
                name="transferMethod"
                value="upi"
                checked={transferMethod === "upi"}
                onChange={() => setTransferMethod("upi")}
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              Transfer to UPI
            </label>
            <img src="/img/upi.png" className="h-6 w-6" alt="UPI" />
          </div>
        </div>

        {/* Withdraw Button */}
        <button
          onClick={handleWithdraw}
          className="w-full bg-[#244856] hover:bg-white hover:text-[#244856] hover:border border-[#244856] text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Withdraw
        </button>

        <div className="border border-b mt-4"></div>
        <p className="mt-2 text-sm text-center text-gray-500">0 Minimum withdraw amount.</p>
      </div>
    </div>
  );
};

export default InstantWithdrawal;
