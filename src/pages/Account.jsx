import  { useState,useEffect,useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import api from "../utils/api"; // Import API utility
import { fetchTransactions } from "../utils/api"; // Adjust the path



const Account = () => {
    const { token, userId, balance, username, email, referral_code, phone_number } = useContext(AuthContext);
    const apiUrl = import.meta.env.VITE_API_URL;
console.log("user",phone_number,balance,username,email,referral_code)
  const [activeSection, setActiveSection] = useState("profile");
  const [copied, setCopied] = useState(false);
  // const referralCode = "ICRTSHU45JFI";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [transactionsq, setTransactions] = useState([]);



  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditUpiMode, setIsEditUpiMode] = useState(false);

  const [accountDetails, setAccountDetails] = useState(null);
  const [accountupiDetails, setAccountupiDetails] = useState({ upi: "" }); // Initial state

  const [inputs, setInputs] = useState({
    acc_number: "",
    acc_holder_name: "",
    ifsc_code: "",
    bank_name: "",
  });

  const [upi, setUpi] = useState(null)
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  console.log("userId",userId)

  const loadTransactions = async () => {
    const data = await fetchTransactions(userId);
    setTransactions(data)
    console.log("Fetched Transactions:", data);
  };

  console.log("transactionsq",transactionsq)

  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      if (!userId) return;

      const fetchUserImage = async () => {
          setLoading(true);
          setError(null);

          try {
              const response = await axios.get(`${apiUrl}/api/getimage/${userId}`);
              
              if (response.data.success) {
                  setImageUrl(response.data.image_url);
              } else {
                  setError("Failed to fetch image.");
              }
          } catch (err) {
              console.error("Error fetching user image:", err);
              setError(err.response?.data?.message || "Something went wrong.");
          } finally {
              setLoading(false);
          }
      };

      fetchUserImage();
  }, []);
useEffect(() => {
  loadTransactions();
}, []);

  // Fetch user bank details on component mount
  useEffect(() => {
    axios.get(`${apiUrl}/api/bank-details/${userId}`)
      .then((res) => {
        setInputs(res.data || {} );
        setAccountDetails(res.data || {} )// Ensure it's always an object
      })
      .catch((err) => {
        console.error("Error fetching bank details:", err);
        setInputs(res.data); // Fallback to empty object
      });

      axios.get(`${apiUrl}/api/upi-details/${userId}`)
      .then((res) => {
        setUpi(res.data.upi || {} );
      })
      .catch((err) => {
        console.error("Error fetching bank details:", err);
        setInputs(res.data); // Fallback to empty object
      });



  }, []);

  // Handle input change
  // const handleInputChange = (e) => {
  //   setInputs({ ...inputs, [e.target.name]: e.target.value });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value, // Directly update the input state
    }));
  };

  const handleUpiChange = (e) => {
    setUpi(e.target.value); // Update UPI state with the input value
  };


  // // Save or Update Bank Details
  // const handleSaveOrEdit = () => {
  //   if (isEditMode) {
  //     if (inputs && Object.keys(inputs).length > 0) {
  //       console.log("put true")

  //       // If bank details already exist, update (PUT API)
  //       axios
  //         .put(`${apiUrl}/api/bank-details/${userId}`, inputs)
  //         .then((res) => {
  //           setAccountDetails(res.data); // Update state with latest details
  //           setIsEditMode(false);
  //            Swal.fire({
  //                   title: "updated Successful!",
  //                   icon: "success",
  //                   draggable: true
  //                 });
  //         })
  //         .catch((err) => console.error("Error updating bank details:", err));
  //         Swal.fire({
  //           title: "Error updating bank details!",
  //           icon: "warning",
  //           draggable: true
  //         });
  //     } else {
  //       // If no bank details exist, add new (POST API)
  //       console.log("post true")

  //       axios
  //         .post(`${apiUrl}/api/bank-details`, { userId, ...inputs })
  //         .then((res) => {
  //           setAccountDetails(res.data);
  //           setIsEditMode(false);
  //            Swal.fire({
  //                   title: "Added Successful!",
  //                   icon: "success",
  //                   draggable: true
  //                 });
  //         })
  //         .catch((err) => console.error("Error adding bank details:", err));
  //          Swal.fire({
  //                 title: "Error adding bank details",
  //                 icon: "warning",
  //                 draggable: true
  //               });
  //     }
  //   } else {
  //     setIsEditMode(true);
  //   }
  // };
  
  // Save or Update Bank Details
const handleSaveOrEdit = () => {
  if (!isEditMode) {
    setIsEditMode(true);
    return;
  }

  // Check if bank details already exist in the state
  const isUpdating = accountDetails && Object.keys(accountDetails).length > 0;

  if (isUpdating) {
    // If data exists, update (PUT)
    console.log("Calling PUT API...");

    axios
      .put(`${apiUrl}/api/bank-details/${userId}`, inputs)
      .then((res) => {
        setAccountDetails(res.data); // Update state with latest details
        setIsEditMode(false);
        Swal.fire({
          title: "Updated Successfully!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((err) => {
        console.error("Error updating bank details:", err);
        Swal.fire({
          title: "Error updating bank details!",
          text: err.response?.data?.message || "Something went wrong.",
          icon: "error",
          draggable: true,
        });
      });
  } else {
    // If no data exists, add new (POST)
    console.log("Calling POST API...");

    axios
      .post(`${apiUrl}/api/bank-details`, { userId, ...inputs })
      .then((res) => {
        setAccountDetails(res.data);
        setIsEditMode(false);
        Swal.fire({
          title: "Added Successfully!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((err) => {
        console.error("Error adding bank details:", err);
        Swal.fire({
          title: "Error adding bank details!",
          text: err.response?.data?.message || "Something went wrong.",
          icon: "error",
          draggable: true,
        });
      });
  }
};


const handleSaveUpiEdit = async () => {
  // If not in edit mode, enable the edit mode and return
  if (!isEditUpiMode) {
    setIsEditUpiMode(true);
    return;
  }

  // Check if UPI is already set (i.e. it's not null or empty)
  const isNewUpi = !upi || upi.trim().length === 0;

  if (!isNewUpi) {
    // UPI exists → Update using PUT API
    console.log("Calling PUT API for UPI...");

    try {
      const response = await fetch(`${apiUrl}/api/upi-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, upi }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      Swal.fire({
        title: "Added Successfully!",
        icon: "success",
        draggable: true,
      });
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      // setIsLoading(false);
    }
  } else if(isNewUpi){
    // UPI doesn't exist (empty or null) → Create using POST API
    console.log("Calling POST API for UPI...");

    try {
      const response = await fetch(`${apiUrl}/api/upi-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, upi }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }  Swal.fire({
        title: "updated Successfully!",
        icon: "success",
        draggable: true,
      });
  
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      // setIsLoading(false);
    }
  }
};




// const handleSaveUpiEdit = () => {
//   if (isEditUpiMode) {
//     // If editing mode is on, check if UPI exists
//     if (upi && upi.length > 0) {
//       // UPI exists → Update using PUT
//       axios.put(`${apiUrl}/api/upi-details/${userId}`, { upi })
//         .then((res) => {
//           console.log("upi",res.data)

//           setAccountDetails(res.data.upi); // Update state with the latest UPI details
//           setIsEditUpiMode(false);
//           Swal.fire({
//             title: "Updated Successfully!",
//             icon: "success",
//             draggable: true,
//           });
//         })
//         .catch((err) => {
//           console.error("Error updating UPI details:", err);
//           Swal.fire({
//             title: "Error updating UPI details!",
//             icon: "warning",
//             draggable: true,
//           });
//         });
//     } else {
//       // If UPI is empty, create a new one using POST
//       axios.post(`${apiUrl}/api/upi-details`, { userId, upi })
//         .then((res) => {
//           console.log("upi",res.data)
//           setAccountDetails(res.data.upi);
//           setIsEditUpiMode(false);
//           Swal.fire({
//             title: "Added Successfully!",
//             icon: "success",
//             draggable: true,
//           });
//         })
//         .catch((err) => {
//           console.error("Error adding UPI details:", err);
//           Swal.fire({
//             title: "Error adding UPI details!",
//             icon: "warning",
//             draggable: true,
//           });
//         });
//     }
//   } else {
//     // If not in edit mode, enable edit mode
//     setIsEditUpiMode(true);
//   }
// };

  
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message
  
    // Validation Checks
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setMessage("All fields are required");
      return;
    }
  
    if (newPassword !== confirmNewPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }
  
    try {
      if (!userId) {
        setMessage("User ID is missing");
        return;
      }
  
      if (!token) {
        setMessage("Authentication token is missing");
        return;
      }
  
      // Send API request to update password
      const response = await axios.post(
        `${apiUrl}/api/users-change/${userId}`, // Include user ID in URL
        { currentPassword, newPassword, confirmNewPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setMessage(response.data.message); // Show success message
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };
  
  

  const handleCopy = () => {
    navigator.clipboard.writeText(referral_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  // const [message, setMessage] = useState("");
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageURL = URL.createObjectURL(file);
  //     setProfileImage(imageURL); // Update the profile image preview
  //   }
  // };

    // Handle file selection
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        setImageUrl(URL.createObjectURL(file)); // Show preview
      }
    };
  
  // Handle image upload
  const handleUpload = async () => {
    if (!selectedFile) {
        setMessage("Please select an image");
        return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("image", selectedFile);

    try {
        setUploading(true);
        setMessage("Image updated successfully!");

        const response = await axios.post(`${apiUrl}/api/updateimage`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        setPreview(selectedFile);

        // ✅ Check if there's a response
        if (response.data) {
            console.log("API Response:", response.data);
        } else {
            setMessage("Image updated successfully!");
        }
    } catch (error) {
        setMessage(error.response?.data?.message || "Error updating image");
    } finally {
        setUploading(false);
    }
};

console.log("preview",preview)
  const handleLogout = () => {
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
  
    const handleReferClick = () => {
      
        if (inputs.acc_number ||  upi) {
        setIsModalOpen(true)
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please Add Bank or Upi details First!',
              });
        }
      };
console.log("transactionsq",transactionsq)
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
                <span onClick={fetchTransactions}>History</span>
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
          src={imageUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-200"
        />
      </label>
      
      {/* Hidden File Input */}
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Button */}
      <button
 onClick={handleUpload}
 disabled={uploading}        className="mt-2 bg-[#244856] text-white px-2 py-1 text-sm rounded-lg"
      >
         Upload Image
        </button>

        {message && <p className="mt-3 text-center text-sm text-gray-700">{message}</p>}

    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mt-1 text-gray-700 bg-gray-100"
            disabled
            value={username}
          />
        </div>
        <div>
          <label className="block text-gray-600">Mobile Number</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mt-1 text-gray-700 bg-gray-100"
            disabled
            value={phone_number}

          />
        </div>
        <div className="relative">
          <label className="block text-gray-600">Email</label>
          <div className="flex">
            <input
              type="text"
              className="w-full p-2 border rounded-lg mt-1 text-gray-700 bg-gray-100"
              disabled
              value={email}

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
            value={referral_code}
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

<div>
  {transactionsq.success == false ? (
    <p className="text-center text-gray-500 text-lg font-medium">
      No transactions yet
    </p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {transactionsq.map((transaction, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
        >
          <div className="flex justify-between items-center  mb-2">
            <p className="text-sm text-black font-semibold">Transaction ID</p>
            <p className="text-sm text-blue-600 font-medium">#12{transaction.id}003</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500">Date</p>
            <p className="text-sm text-gray-500">
              {transaction.created_at.split("T")[0]} {/* Show only Date */}
            </p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-sm font-medium text-green-600">
              {transaction.amount}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-[10px] md:text-sm lg:text-sm font-medium text-green-600">
              {transaction.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

</div>
</div>
            )}

            {activeSection === "wallet" && (
             <div className=" min-h-screen flex flex-col items-center p-0 md:p-6 lg:p-6">
             <div className="max-w-4xl w-full">
               <h1 className="text-xl md:text-2xl lg:text-2xl font-semibold mb-4 border-b border-b-2">Wallet</h1>
               <div className="bg-blue-200 text-center py-6 rounded-lg mb-6">
                 <h2 className="text-3xl font-bold">{balance}Rs</h2>
                 <p className="text-lg font-medium">Available Balance</p>
                 <button
              type="submit"
              className=" bg-[#244856] text-white mt-2 py-1 px-8 rounded-md hover:bg-[#244856] focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleReferClick}
              
          
              

            >
              Redeem
            </button>
               </div>
               <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Bank Account Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Account Holder Name */}
        <div>
          <label className="block text-gray-600">Account Holder Name</label>
          <input
            type="text"
            name="acc_holder_name"
            value={inputs?.acc_holder_name || ""} 
            onChange={handleInputChange}
            disabled={!isEditMode}
            className={`w-full p-2 border rounded-lg mt-1 text-gray-700 ${
              isEditMode ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-gray-600">Account Number</label>
          <input
            type="text"
            name="acc_number"
            value={inputs?.acc_number || ""}
            onChange={handleInputChange} 
            disabled={!isEditMode}
            className={`w-full p-2 border rounded-lg mt-1 text-gray-700 ${
              isEditMode ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        {/* IFSC Code */}
        <div>
          <label className="block text-gray-600">IFSC Code</label>
          <input
            type="text"
            name="ifsc_code"
            value={inputs?.ifsc_code || ""}
            onChange={handleInputChange}
            disabled={!isEditMode}
            className={`w-full p-2 border rounded-lg mt-1 text-gray-700 ${
              isEditMode ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        {/* CRN Number */}
        <div>
          <label className="block text-gray-600">CRN Number</label>
          <input
            type="text"
            name="bank_name"
            value={inputs?.bank_name || ""}
            onChange={handleInputChange}
            disabled={!isEditMode}
            className={`w-full p-2 border rounded-lg mt-1 text-gray-700 ${
              isEditMode ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
      </div>

      {/* Save/Edit Button */}
      <button
  onClick={handleSaveOrEdit}
  className="w-full bg-[#244856] text-white mt-4 py-2 rounded-lg hover:bg-[#244856]"
>
  {isEditMode ? "Save" : inputs && Object.keys(inputs).length > 0 ? "Edit" : "Add Details"}
</button>


    </div>
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
      value={upi || ""}
      onChange={handleUpiChange}
      disabled={!isEditUpiMode}
      className={`w-full p-2 border rounded-lg mt-1 text-gray-700 ${
        isEditUpiMode ? "bg-white" : "bg-gray-100"
      }`}
      // "flex-1 px-6 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {/* Withdraw Button */}
    <button
  className="w-full md:w-auto bg-[#1b4c5b] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#153c48] transition"
  onClick={handleSaveUpiEdit}
>
  {isEditUpiMode ? "Save" : (upi && upi.length > 0 ? "Edit" : "Add Details")}
</button>

  </div>
</div>

             </div>
           </div>
            )}

            {activeSection === "change" && (
              <div className="bg-white  p-0 md:p-6 lg:p-6 ">
                 <h1 className="text-xl md:text-2xl lg:text-2xl font-semibold text-gray-800 mb-6 border-b border-b-2">Change Password</h1>
                 <form onSubmit={handleChangePassword} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 bg-white p-6 shadow-lg rounded-lg">
      {/* Current Password */}
      <div className="col-span-2 md:col-span-1">
        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">
          Current Password
        </label>
        <input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter Current Password"
          required
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
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter New Password"
          required
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
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Re-enter New Password"
          required
        />
      </div>

      {/* Display error or success message */}
      {message && <p className="col-span-2 text-center text-red-500">{message}</p>}

      {/* Submit Button */}
      <div className="col-span-2">
        <button
          type="submit"
          className="w-full bg-[#244856] text-white py-2 px-4 rounded-md hover:bg-[#1b3642] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      {/* <BalaceHook userId={userId} /> */}
      <Footer />
    </>
  );
};

export default Account;
