
import React, { useState , useEffect, useRef} from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js"; // Import crypto-js
import Swal from 'sweetalert2'



const SignUpForm = ({isSignUp , setIsSignUp, showModal, setShowModal} ) => {

    if (!showModal) return null; // Don't render the modal if showModal is false
    const apiUrl = import.meta.env.VITE_API_URL;
    // Secret key for encryption and decryption (should be kept safe)
    console.log("apiUrl:", apiUrl);

const SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY;

const [useOtp, setUseOtp] = useState(false);
const [step, setStep] = useState("phone");

const [phoneNumber, setPhoneNumber] = useState("");
const [otp, setOtp] = useState(["", "", "", ""]);
const [countdown, setCountdown] = useState(90);
const [isCountdownActive, setIsCountdownActive] = useState(false);

const otpRefs = Array(4)
  .fill(null)
  .map(() => useRef(null));

useEffect(() => {
  let interval;
  if (isCountdownActive && countdown > 0) {
    interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  } else if (countdown === 0) {
    setIsCountdownActive(false);
  }
  return () => clearInterval(interval);
}, [countdown, isCountdownActive]);

const handlePhoneSubmit = (e) => {
  e.preventDefault();
  setStep("otp");
  setIsCountdownActive(true);
};

const handleOtpChange = (index, value) => {
  if (value.length <= 1 && /^\d*$/.test(value)) {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  }
};

const handleKeyDown = (index, e) => {
  if (e.key === "Backspace" && otp[index] === "" && index > 0) {
    otpRefs[index - 1].current?.focus();
  }
};

const handleResendOtp = () => {
  setOtp(["", "", "", ""]);
  setCountdown(90);
  setIsCountdownActive(true);
  otpRefs[0].current?.focus();
};

const handleSubmitOtp = (e) => {
  e.preventDefault();
  console.log("OTP submitted:", otp.join(""));
};



  const [showPassword, setShowPassword] = useState(false);
  const [formData1, setFormData1] = useState({
    username: "",
    phone_number: "",
    email: "",
    password: "",
    referred_by: "",
    agreeToTerms: false,
  });

  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData1((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Load saved credentials if Remember Me is checked
  useEffect(() => {
    const savedPhone = localStorage.getItem("phone_number");
    const savedPassword = localStorage.getItem("password");
    const rememberMe = localStorage.getItem("rememberMe") === "true";

    if (rememberMe && savedPhone && savedPassword) {
      setFormData({ phone_number: savedPhone, password: savedPassword, rememberMe });
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


//   const [isSignUp, setIsSignUp] = useState(true); // State to toggle between SignUp and SignIn forms

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//   };

  // Encrypt function
  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:5000/api/signup", formData1);

      // Save user data and JWT in cookies
      const { token, balance, referral_code, username, email } = response.data;

       // Encrypt and store data in cookies
       Cookies.set("token", encryptData(token), { expires: 7 });
       Cookies.set("balance", encryptData(balance), { expires: 7 });
       Cookies.set("referral_code", encryptData(referral_code), { expires: 7 });
       Cookies.set("username", encryptData(username), { expires: 7 });
       Cookies.set("email", encryptData(email), { expires: 7 });
       Cookies.set("phone_number", encryptData(email), { expires: 7 });

 
      // Success alert
      Swal.fire({
        title: "Signup Successful!",
        icon: "success",
        draggable: true
      });
      // alert("Signup successful!");
      setShowModal(false)
      console.log(response.data);
    } catch (err) {
      // Check if the error has a response and display specific messages
      if (err.response && err.response.data) {
        const errorMessage = err.response.data.message;

        // Handle different error scenarios and alert accordingly
        if (errorMessage === "Phone number already exists") {
          alert("This phone number is already registered. Please use a different one.");
        } else if (errorMessage === "Invalid referral code") {
          alert("The referral code you entered is invalid. Please check and try again.");
        } else if (errorMessage === "Email already exists") {
          alert("An account with this email already exists. Please use a different email.");
        } else {
          alert(errorMessage || "Signup failed. Please try again.");
        }
      } else {
        // General error handling
        alert("Signup failed. Please try again.");
      }
    }
  };

  const handleGoogleSignUp = () => {
    setShowModal(false)
    setStep("phone")
};

  const handleSubmitlog = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        phone_number: formData.phone_number,
        password: formData.password,
      });
  
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      if (formData.rememberMe) {
        localStorage.setItem("phone_number", formData.phone_number);
        localStorage.setItem("password", formData.password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("phone_number");
        localStorage.removeItem("password");
        localStorage.setItem("rememberMe", "false");
      }
      const { token,userId, balance, referral_code, username, email,phone_number } = response.data;

     // Encrypt and store data in cookies
     Cookies.set("userId", encryptData(userId), { expires: 7 });

     Cookies.set("token", encryptData(token), { expires: 7 });
     Cookies.set("balance", encryptData(balance), { expires: 7 });
     Cookies.set("referral_code", encryptData(referral_code), { expires: 7 });
     Cookies.set("username", encryptData(username), { expires: 7 });
     Cookies.set("email", encryptData(email), { expires: 7 });
     Cookies.set("phone_number", encryptData(phone_number), { expires: 7 });

  
      // Success alert
      Swal.fire({
        title: "Login Successful!",
        icon: "success",
        draggable: true
      });
      // alert("Login Successful!");
      setShowModal(false)

    } catch (err) {
      // Check if the error has a response and a status code
      if (err.response && err.response.status === 401) {
        alert("Wrong password! Please try again.");
      } else {
        // Handle other errors
        setError(err.response?.data?.message || "Login failed. Please try again.");
      }
    }
  };
  

  return (


<>
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm z-50">
      <div className="fixed inset-0 bg-white w-full max-w-md mx-auto rounded-lg shadow-lg mt-20 mb-20 z-50 p-6 relative">
        <button className="absolute right-4 top-4 text-gray-500" onClick={() => setShowModal(false)}>
          ×
        </button>
        <div className="flex justify-center mb-4">
          <img
            src="/img/logo.png"            alt="Step to Sale Logo"
            className="h-10 w-auto"
          />
        </div>
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-[#244856]">
            {isSignUp ? "Sign Up"  : useOtp ? "Login with OTP" : "Hi, Welcome Back"}
          </h2>
        </div>

{useOtp ? (
          step === "phone" ? (
             <form onSubmit={handlePhoneSubmit}>
            <p className="mb-2 text-sm text-center">Please fill in the information below:</p>


            {/* <form onSubmit={handlePhoneSubmit}> */}
              <input
                type="tel"
                placeholder="Enter Registered Mobile No."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full mt-6 bg-[#1b4c5b] text-white py-2 rounded-md hover:bg-[#153c48] transition-colors"
              >
                Confirm
              </button>
            </form>
      ) : (
  
<>
{/* OTP Verification Step */}
<h2 className="text-xl font-semibold text-center mb-2">OTP Verification</h2>
<p className="text-center text-gray-600 text-sm mb-6">
  Enter the OTP sent to +91 {phoneNumber} to proceed.
</p>

<form onSubmit={handleSubmitOtp}>
  <div className="flex gap-2 mb-6 justify-center">
    {otp.map((digit, index) => (
      <input
        key={index}
        type="text"
        maxLength={1}
        ref={otpRefs[index]}
        value={digit}
        onChange={(e) => handleOtpChange(index, e.target.value)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        className="w-12 h-12 border-2 rounded-md text-center text-xl font-semibold focus:border-blue-500 focus:outline-none"
      />
    ))}
  </div>

  {/* Resend OTP */}
  <div className="text-center mb-6">
    <p className="text-sm text-gray-600">
      Did not receive OTP?{" "}
      {countdown > 0 ? (
        <span>Resend OTP in {countdown} Seconds</span>
      ) : (
        <button
          type="button"
          onClick={handleResendOtp}
          className="text-blue-500 hover:text-blue-700"
        >
          Resend OTP
        </button>
      )}
    </p>
  </div>

  {/* Submit OTP */}
  <button
    type="submit"
    className="w-full bg-[#1b4c5b] text-white py-2 rounded-md hover:bg-[#153c48] transition-colors"
  >
    Submit
  </button>
</form>
</>
    )
  ) : isSignUp ? (
    
    <form onSubmit={handleSubmit}>

    <div className="mb-4">
      {/* <p className="text-sm font-medium mb-4">Sign Up with Email Address</p> */}
      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border"
            value={formData1.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="phone_number"
            placeholder="Mobile No"
            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border"
            value={formData1.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address/ Optional"
            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border"
            value={formData1.email}
            onChange={handleChange}
            required
            
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border"
            value={formData1.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
          </button>
        </div>
        <div>
          <input
            type="text"
            name="referred_by"
            placeholder="Referral Code/ Optional"
            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border"
            value={formData1.referred_by}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>

    <div className="flex items-center space-x-2 mb-6">
      <input
        type="checkbox"
        id="terms"
        checked={formData1.agreeToTerms}
        onChange={(e) => setFormData1((prev) => ({ ...prev, agreeToTerms: e.target.checked }))}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 border"
        required
      />
      <label htmlFor="terms" className="text-sm">Agree with Terms & Conditions.</label>
    </div>

    <button
      type="submit"
      className="w-full bg-[#244856] text-white py-2 rounded-md hover:bg-blue-600"
    >
      Sign Up
    </button>


  </form>
) : (
    <form >
            <div className="mb-4">
            <button
onClick={() => setUseOtp(true)} 
    className="w-full mb-4 bg-gray-100 py-2 rounded-md text-gray-700 hover:bg-gray-200"
        >
          Sign in with OTP
        </button>
        <div className="relative mb-4">
             <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t" />
             </div>
             <div className="relative flex justify-center text-xs uppercase">
               <span className="bg-white px-2 text-gray-500 border px-8 py-1 rounded">OR</span>
             </div>
          </div>
              <p className="text-sm text-center font-medium mb-4">Sign in with Mobile Number</p>
              <div className="space-y-4">
                <div>
                  {/* Phone Number Input */}
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          className="w-full px-4 py-2 bg-gray-100 rounded-md border focus:outline-none focus:ring focus:ring-gray-300"
          value={formData.phone_number}
          onChange={handleInputChange}
          required
        />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                  </button>
                </div>
              </div>
            </div>

       {/* Remember Me Checkbox & Forgot Password */}
       <div className="flex justify-between items-center my-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Remember me</span>
          </label>
          <a href="#" className="text-sm text-[#244856] hover:underline"     onClick={() => setUseOtp(true)} 

          >
            Forgot Password?

          </a>
        </div>

            <button
              type="submit"
              onClick={handleSubmitlog}
              className="w-full bg-[#244856] text-white py-2 rounded-md hover:bg-blue-600"
            >
              Sign In
            </button>
    {/* Error Message */}
    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        
          </form>

        )}

<div className="border mt-4"></div>
        <p className="mt-4 text-xs text-center">
          {isSignUp ? "Already have an account? " : "Don’t have an account? "}
          <span onClick={() => { setIsSignUp(!isSignUp); setUseOtp(false); }} className="text-[#244856] hover:underline">
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>





    </>
  );
};

export default SignUpForm;



