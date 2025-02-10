import React, { useState } from "react";
import { MdAccountCircle, MdHistoryEdu } from "react-icons/md";
import { IoMdWallet } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { Copy, Check } from "lucide-react";
import Swal from 'sweetalert2'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import InstantWithdrawal from "../components/Withdraw"; // Import your component



const Account = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [copied, setCopied] = useState(false);
  const referralCode = "ICRTSHU45JFI";
  const [isModalOpen, setIsModalOpen] = useState(false);

  


  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const transactions = [
    {
      id: "#21454844",
      date: "31 January 2025",
      amount: 250,
      status: "Credit",
    },
    {
        id: "#21454844",
        date: "31 January 2025",
        amount: 250,
        status: "Credit",
      },
      {
        id: "#21454844",
        date: "31 January 2025",
        amount: 250,
        status: "Debit",
      },
      {
        id: "#21454844",
        date: "31 January 2025",
        amount: 250,
        status: "Credit",
      },
  ];

  const [profileImage, setProfileImage] = useState("/img/profile.png");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL); // Update the profile image preview
    }
  };

  const handleLogout = (event) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout your account?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#244856",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token', { path: '/' }); 
        Cookies.remove('balance', { path: '/' });  
        Cookies.remove('email', { path: '/' }); 
        Cookies.remove('referral_code', { path: '/' });   
        Cookies.remove('userId', { path: '/' }); 
        Cookies.remove('username', { path: '/' });  
        
        // Remove the cookie *here*
        // ... any other logout logic (e.g., API call) ...
        Swal.fire({ // Show the success message *after* logout
          title: "Logout!",
          text: "You are logged out successfully.",
          icon: "success",
          showConfirmButton: false, // Hide the OK button
          timer: 1500 // Auto-close after 1.5 seconds (adjust as needed)
        }).then(() => {        
          window.location.href = '/'; // Redirect *after* the success message (and cookie removal)
        });
      } else {
        // User clicked "Cancel" - do nothing (or optionally, display a message)
        Swal.fire("Logout Cancelled", "", "info"); // Optional: show a "cancelled" message
      }
    });
  };
  

  return (
    <>
      <Header />
      <div className="max-w-container mx-auto px-2 py-2 md:px-6 lg:-6 md:py-4 lg:py-4 lg:px-16 lg:py-10 md:py-10">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-1/4 bg-white shadow-lg border rounded-lg">
            <nav className="flex flex-col py-4 px-2 md:py-6 lg:py-6 md:px-4 lg:px-4">
              <button
                className={`flex items-center gap-2 text-left mb-4 p-2 text-xs md:text-lg lg:text-lg text-gray-800 hover:bg-gray-100 rounded-md border-b ${
                  activeSection === "profile" ? "bg-gray-200 font-semibold" : ""
                }`}
                onClick={() => setActiveSection("profile")}
              >
                <MdAccountCircle className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7" />
                <span>Profile</span>
              </button>

              <button
                className={`flex items-center gap-2 text-left mb-4 p-2 text-xs md:text-lg lg:text-lg text-gray-800 hover:bg-gray-100 rounded-md border-b ${
                  activeSection === "history" ? "bg-gray-200 font-semibold" : ""
                }`}
                onClick={() => setActiveSection("history")}
              >
                <MdHistoryEdu className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7" />
                <span>History</span>
              </button>

              <button
                className={`flex items-center gap-2 text-left mb-4 p-2 text-xs md:text-lg lg:text-lg text-gray-800 hover:bg-gray-100 rounded-md border-b ${
                  activeSection === "wallet" ? "bg-gray-200 font-semibold" : ""
                }`}
                onClick={() => setActiveSection("wallet")}
              >
                <IoMdWallet className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7" />
                <span>Wallet</span>
              </button>

              <button
                className={`flex items-center gap-2 text-left mb-4 p-2 text-xs md:text-lg lg:text-lg text-gray-800 hover:bg-gray-100 rounded-md border-b ${
                  activeSection === "change" ? "bg-gray-200 font-semibold" : ""
                }`}
                onClick={() => setActiveSection("change")}
              >
                <RiLockPasswordFill className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7" />
                <span>Change Password</span>
              </button>

              <button className="flex items-center gap-2 text-left p-2 text-xs md:text-lg lg:text-lg text-gray-800 hover:bg-gray-100 rounded-md border-b"
                              onClick={handleLogout}
>
                <IoLogOut className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7" />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-10 lg:p-10">
            {activeSection === "profile" && (
              <div className="">
                {/* <h2 className="text-xl font-semibold mb-4">Profile</h2> */}
                {/* Profile content */}
                <div className=" mx-auto  bg-white p-0 md:p-6 lg:p-6">
      <h2 className="text-xl md:text-2xl lg:text-2xl font-semibold mb-2 md:mb-8 lg:mb-8 border-b border-b-2 ">Profile</h2>
      <div className="flex flex-col items-center mb-6">
      {/* Image Display */}
      <label htmlFor="image-upload" className="cursor-pointer">
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-200"
        />
      </label>
      
      {/* Hidden File Input */}
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Upload Button */}
      <button
        onClick={() => document.getElementById("image-upload").click()}
        className="mt-2 bg-[#244856] text-white px-2 py-1 text-sm rounded-lg"
      >
        Upload Image
      </button>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mt-1 text-gray-700 bg-gray-100"
            disabled
            value="James"
          />
        </div>
        <div>
          <label className="block text-gray-600">Mobile Number</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mt-1 text-gray-700 bg-gray-100"
            disabled
            value="81998*****"

          />
        </div>
        <div className="relative">
          <label className="block text-gray-600">Email</label>
          <div className="flex">
            <input
              type="text"
              className="w-full p-2 border rounded-lg mt-1 text-gray-700 bg-gray-100"
              disabled
              value="James@gmail.com"

            />
            {/* <button className="ml-2 bg-red-500 text-white px-3 py-2 rounded-lg text-sm mt-1">Add</button> */}
          </div>
        </div>
        {/* <div>
          <label className="block text-gray-600">Country</label>
          <select className="w-full p-2 border rounded-lg mt-1 text-gray-700 bg-gray-100">
            <option value="IN">🇮🇳 IN</option>
            <option value="US">🇺🇸 US</option>
          </select>
        </div> */}
 <div >
        <label className="block text-gray-600">Referral Code</label>
        <div className="flex">
          <input
            type="text"
            value={referralCode}
            className="w-full p-2 border rounded-lg mt-1 text-gray-700 bg-gray-100"
            disabled
          />
          <button
            onClick={handleCopy}
            className="ml-2 bg-[#244856] text-white px-3 py-2 rounded-lg text-sm mt-1 flex items-center"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />} Copy
          </button>
        </div>
      </div>

      </div>
   
    </div>              </div>
            )}

            {activeSection === "history" && (

<div className=" min-h-screen flex flex-col items-center p-0 md:p-6 lg:p-6 ">
<div className="max-w-4xl w-full">
  <h1 className="text-xl md:text-2xl lg:text-2xl font-semibold mb-2 md:mb-8 lg:mb-8 border-b border-b-2">Transaction History</h1>
  {/* <div className="bg-blue-200 text-center py-6 rounded-lg mb-6">
    <h2 className="text-3xl font-bold">50Rs</h2>
    <p className="text-lg font-medium">Available Balance</p>
  </div> */}

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
    {transactions.map((transaction, index) => (
      <div
        key={index}
        className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
      >
        <div className="flex justify-between items-center  mb-2">
          <p className="text-sm text-black font-semibold">
            Transaction ID
          </p>
          <p className="text-sm text-blue-600 font-medium">
            {transaction.id}
          </p>
        </div>
        <div className="flex justify-between items-center  mb-2">
          <p className="text-sm text-gray-500 ">Date and Time</p>
          <p className="text-sm  text-gray-500 ">{transaction.date}</p>
        </div>
        <div className="flex justify-between items-center   mb-2">
          <p className="text-sm text-gray-500 ">Amount</p>
          <p className="text-sm font-medium text-green-600">
            {transaction.amount}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 ">Status</p>
          <p className="text-sm font-medium text-green-600">
            {transaction.status}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
</div>
            )}

            {activeSection === "wallet" && (
             <div className=" min-h-screen flex flex-col items-center p-0 md:p-6 lg:p-6">
             <div className="max-w-4xl w-full">
               <h1 className="text-xl md:text-2xl lg:text-2xl font-semibold mb-4 border-b border-b-2">Wallet</h1>
               <div className="bg-blue-200 text-center py-6 rounded-lg mb-6">
                 <h2 className="text-3xl font-bold">50Rs</h2>
                 <p className="text-lg font-medium">Available Balance</p>
                 <button
              type="submit"
              className=" bg-[#244856] text-white mt-2 py-1 px-8 rounded-md hover:bg-[#244856] focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsModalOpen(true)}

            >
              Redeem
            </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4">
               <div>
                 <label className="block text-gray-600">Account Holder Name</label>
                 <input
                   type="text"
                   value="James"
                   className="w-full p-2 border rounded-lg mt-1 text-gray-700 bg-gray-100"
                   disabled
                 />
               </div>
               <div>
                 <label className="block text-gray-600">Account Number</label>
                 <input
                   type="text"
                   value="+91 987898****"
                   className="w-full p-2 border rounded-lg mt-1 text-gray-700 bg-gray-100"
                   disabled
                 />
               </div>
               <div className="relative">
                 <label className="block text-gray-600">IFSC code</label>
                 <div className="flex">
                   <input
                     type="text"
                     value="James@gmail.com"
                     className="w-full p-2 border rounded-lg mt-1 text-gray-700 bg-gray-100"
                     disabled
                   />
                 </div>
               </div>
             
        <div >
               <label className="block text-gray-600">CRN Number</label>
               <div className="flex">
                 <input
                   type="text"
                   value={referralCode}
                   className="w-full p-2 border rounded-lg mt-1 text-gray-700 bg-gray-100"
                   disabled
                 />
             
               </div>
             </div>
            
             </div>
             <button
              type="submit"
              className="w-full bg-[#244856] text-white mt-4 py-1 px-4 rounded-md hover:bg-[#244856] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
            <div className="flex flex-col items-center justify-center p-4">
  <div className="flex items-center w-full ">
    {/* Horizontal line */}
    <div className="flex-1 h-px bg-gray-300"></div>
    {/* OR text */}
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-white px-8 text-gray-500 border px-4 py-1 rounded text-sm">
        OR
      </span>
    </div>
    {/* Horizontal line */}
    <div className="flex-1 h-px bg-gray-300"></div>
  </div>

  {/* Input and Withdraw button */}
  <div className="mt-6 flex flex-col md:flex-row items-center w-full  gap-4">
    {/* Label */}
    <label className=" text-gray-600 text-sm ">UPI ID</label>
    {/* Input Field */}
    <input
      type="text"
      className="flex-1 px-6 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {/* Withdraw Button */}
    <button className="w-full md:w-auto bg-[#1b4c5b] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#153c48] transition" 
>
Save
    </button>
  </div>
</div>

             </div>
           </div>
            )}

            {activeSection === "change" && (
              <div className="bg-white  p-0 md:p-6 lg:p-6 ">
                 <h1 className="text-xl md:text-2xl lg:text-2xl font-semibold text-gray-800 mb-6 border-b border-b-2">Change Password</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 bg-white ">
          {/* Current Password */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              id="current-password"
              type="password"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter Current Password"
            />
          </div>

          {/* New Password */}
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter New Password"
            />
          </div>

          {/* Re-enter New Password */}
          <div className="col-span-2">
            <label htmlFor="reenter-password" className="block text-sm font-medium text-gray-700 mb-2">
              Re-enter New Password
            </label>
            <input
              id="reenter-password"
              type="password"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Re-enter New Password"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-[#244856] text-white py-2 px-4 rounded-md hover:bg-[#244856] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Popup Modal */}
      <InstantWithdrawal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </>
  );
};

export default Account;
