
import  { useState, useEffect, useRef, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import CryptoJS from "crypto-js"; // Import crypto-js
import Swal from 'sweetalert2'
import SecureStorage from 'react-secure-storage';
import { initializeOTPless, phoneAuth, verifyOTP } from "../otp/otpless";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";



const SignUpForm = ({ isSignUp, setIsSignUp, showModal, setShowModal }) => {
  const { login } = useContext(AuthContext);

  if (!showModal) return null; // Don't render the modal if showModal is false
  const apiUrl = import.meta.env.VITE_API_URL;
  // Secret key for encryption and decryption (should be kept safe)
  const [isAdmin, setIsAdmin] = useState(false);
  const [actionType, setActionType] = useState("");
  const navigate = useNavigate();

  const SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [useOtp, setUseOtp] = useState(false);
  const [step, setStep] = useState("phone");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(90);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  useEffect(() => {
    initializeOTPless();
  }, []);



  const otpRefs = Array(4)
    .fill(null)
    .map(() => useRef(null));

  // useEffect(() => {
  //   let interval;
  //   if (isCountdownActive && countdown > 0) {
  //     interval = setInterval(() => {
  //       setCountdown((prev) => prev - 1);
  //     }, 1000);
  //   } else if (countdown === 0) {
  //     setIsCountdownActive(false);
  //   }
  //   return () => clearInterval(interval);
  // }, [countdown, isCountdownActive]);
  useEffect(() => {
    let interval;
  
    if (isCountdownActive) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsCountdownActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  
    return () => clearInterval(interval);
  }, [isCountdownActive]);
  



  const handleResendOtp = () => {
    setOtp("");
    setCountdown(90);
    setIsCountdownActive(true);
    otpRefs[0].current?.focus();
    handlePhoneSubmit()
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



  const handlePhoneSubmit = async (e) => {

    e.preventDefault();
    setCountdown(90);
setIsCountdownActive(true);
    try {
      const response = await axios.post(`${apiUrl}/api/login-otp-exists`, { phone_number: phoneNumber });
      if (response.data.status === "User exists") {
        phoneAuth(phoneNumber, "+91"); // Dynamic values
        setUseOtp(true);  // Ensure OTP form is enabled
        setStep("otp");
      } else {
        alert("❌ User does not exist. Please sign up.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
   
  }; 
  const [error1, setError1] = useState({ email: "", phone_number: "" });
  const [loading1, setLoading1] = useState(false);
  const handleSignSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    setLoading1(true);
    setError1({ email: "", phone_number: "" });
    setCountdown(90);
    setIsCountdownActive(true);
    const { email, phone_number } = formData1; // Extract from state
  
    try {
      const response = await axios.post(`${apiUrl}/api/check-user-exist`, { email, phone_number });
  
      if (response.status === 200) {
        // If both email and phone are available, proceed with OTP verification
        // alert("Email and phone number are available. Proceeding to OTP verification.");
        // handleSubmit()
        phoneAuth(phone_number, "+91"); // Call phone authentication function
        setUseOtp(true);
        setActionType("signup");
        setStep("otp");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        const message = err.response.data.message;
        let emailExists = message.includes("Email");
        let phoneExists = message.includes("Phone");
  
        // If only email exists
        if (emailExists) {
          setError1((prev) => ({ ...prev, email: "Email already exists" }));
          alert("Email already exists!");
        }
  
        // If only phone number exists
        if (phoneExists) {
          setError1((prev) => ({ ...prev, phone_number: "Phone number already exists" }));
          alert("Phone number already exists!");
        }

           // First, check if both exist
           if (message == "Both email and phone number already exist") {
              setError1((prev) => ({ ...prev, phone_number: "Phone number and email" }));

              
        ;
            alert("Both email and phone number already exist!");
            return; // Stop further execution
          }
    
      }
    } finally {
      setLoading1(false);
    }
  };
  






  const [loading, setLoading] = useState(false); // Loader state

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    const onSuccess = () => {
      handleOTPVerificationSuccess(); // Call success handler
    };

    const onFailure = () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong OTP. Please try again.',
      });
    };

    try {
      // Call OTP verification logic
      await verifyOTP(formData1.phone_number, otp, "+91", onSuccess);
    } catch (error) {
      onFailure()
      console.error("Error verifying OTP:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred during OTP verification. Please try again.',
      });
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleOTPVerificationSuccess = async () => {
    setLoading(true); // Show loader
    try {

      switch (actionType) {
        case "forgotPassword":
          handleForgotPassword();
          break;
        case "loginWithOtp":
          handleSubmitOtplog();
          break;
        case "signup":
          handleSubmit();
          break;
        default:
          console.log("No action selected");
      }
      // handleSubmit();
      // setCurrentStep(3); // Proceed to the next step
      // setShowOTPForm(false); // Hide OTP form
      // setShowThankYou(true); // Show Thank You message
    } catch (error) {
      console.error("Error handling OTP success:", error);
    } finally {
      setLoading(false); // Hide loader
    }
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

  const handleForgotChange = () => {
    setUseOtp(true)
    setActionType("forgotPassword")
    setStep("phone"); // Start with phone number input
  };
  const handelSingotp = () => {
    setUseOtp(true)
    setActionType("loginWithOtp")
  };



  // Encrypt function
  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();
    setError(""); 
  
    try {
      const response = await axios.post(`${apiUrl}/api/signup`, formData1, {
        headers: { "Content-Type": "application/json" },
      });
  
      
//       // Success alert
      Swal.fire({
        title: "Signup Successful!",
        icon: "success",
        draggable: true
      });
      setUseOtp(false)
      setShowModal(false)

//       // Save user data and JWT in cookies
      login(response.data);
      SecureStorage.setItem('token', response.data.token);
    } catch (err) {
      console.log("Error:", err); // Debug full error object
      console.log("Error Response:", err.response); // Debug response object
  
      if (err.response) {
        alert(err.response.data.message || "Signup failed!");
      } else {
        console("Network error! Backend may be down.");
      }
    }
  };
  

// forget passsword
const handleNewForgotPassword = async (e) => {
  e.preventDefault();
  setError(""); // Clear previous errors
console.log("hellow")
  // // Validate password match
  if (newPassword === confirmPassword) {
    try {   
      const response = await axios.post(`${apiUrl}/api/forget-password`, {
        phone_number:phoneNumber,  // Directly using state values
        new_password: newPassword, // Ensure matching backend field names
      });
      console.log("hellow again")
  
      console.log("Response:", response);
      alert("Password reset successful!");
  
      // Clear only password fields
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong! Try again.");
    }
    setError("Passwords do not match!");
    
  }
else{
  alert("password and confirm password not match")
}
  
};



  const handleForgotPassword = () => {
    console.log("Forgot Password Triggered api",confirmPassword,newPassword);
    setStep(false); // Start with phone number input

    // Implement forgot password logic here
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
      SecureStorage.setItem('token', response.data.token);

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
      // const { token,userId, balance, referral_code, username, email,phone_number } = response.data;
      login(response.data); // Call login to set cookies and update context immediately
      //  // Encrypt and store data in cookies
      //  Cookies.set("userId", encryptData(userId), { expires: 7 });

      //  Cookies.set("token", encryptData(token), { expires: 7 });
      //  Cookies.set("balance", encryptData(balance), { expires: 7 });
      //  Cookies.set("referral_code", encryptData(referral_code), { expires: 7 });
      //  Cookies.set("username", encryptData(username), { expires: 7 });
      //  Cookies.set("email", encryptData(email), { expires: 7 });
      //  Cookies.set("phone_number", encryptData(phone_number), { expires: 7 });


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

  const handleSubmitOtplog = async () => {
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(`${apiUrl}/api/login-otp`, {
        phone_number: phoneNumber,
      });

      // Store token in localStorage
      SecureStorage.setItem('token', response.data.token);

      localStorage.setItem("token", response.data.token);
      if (formData.rememberMe) {
        localStorage.setItem("phone_number", formData.phone_number);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("phone_number");
        localStorage.removeItem("password");
        localStorage.setItem("rememberMe", "false");
      }
      // const { token,userId, balance, referral_code, username, email,phone_number } = response.data;
      login(response.data); // Call login to set cookies and update context immediately
      //  // Encrypt and store data in cookies
      //  Cookies.set("userId", encryptData(userId), { expires: 7 });

      //  Cookies.set("token", encryptData(token), { expires: 7 });
      //  Cookies.set("balance", encryptData(balance), { expires: 7 });
      //  Cookies.set("referral_code", encryptData(referral_code), { expires: 7 });
      //  Cookies.set("username", encryptData(username), { expires: 7 });
      //  Cookies.set("email", encryptData(email), { expires: 7 });
      //  Cookies.set("phone_number", encryptData(phone_number), { expires: 7 });


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
        {loading && (
          <div className="flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className="fixed inset-0 bg-white w-full max-w-md mx-auto rounded-lg shadow-lg mt-20 mb-20 z-50 p-6 relative">
          <button className="absolute right-4 top-4 text-gray-500" onClick={() => setShowModal(false)}>
            ×
          </button>
          <div className="flex justify-center mb-4">
            <img
              src="/img/logo.png" alt="Step to Sale Logo"
              className="h-10 w-auto"
            />
          </div>
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-[#244856]">
              {isSignUp ? "Sign Up" : useOtp ? "Login with OTP" : "Hi, Welcome Back"}
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
            ) : step === "otp" ? (

              <>
                {/* OTP Verification Step */}
                <h2 className="text-xl font-semibold text-center mb-2">OTP Verification</h2>
                <p className="text-center text-gray-600 text-sm mb-6">
                  Enter the OTP sent to +91 {phoneNumber} to proceed.
                </p>

                <form onSubmit={handleVerifyOTP}>
                <div className="flex justify-center space-x-2">
  {Array(4)
    .fill("")
    .map((_, index) => (
      <input
        key={index}
        type="text"
        maxLength="1"
        value={otp[index] || ""}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, ""); // only numbers
          
          setOtp((prevOtp) => {
            const newOtp =
              prevOtp.slice(0, index) + value + prevOtp.slice(index + 1);
            return newOtp;
          });

          // Move to next input if value entered
          if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Backspace") {
            if (otp[index]) {
              // just clear current value
              setOtp((prevOtp) =>
                prevOtp.slice(0, index) + "" + prevOtp.slice(index + 1)
              );
            } else if (index > 0) {
              // go to previous input
              document.getElementById(`otp-${index - 1}`).focus();
            }
          }
        }}
        id={`otp-${index}`}
        className="border border-gray-300 rounded-md w-12 h-12 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          onClick={handlePhoneSubmit}
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
            ) : (
              // Step 3: Reset Password
              <form  onSubmit={handleNewForgotPassword}>
                <h2 className="text-xl font-semibold text-center mb-2">Reset Password</h2>
                <p className="text-center text-gray-600 text-sm mb-6">Enter a new password for your account.</p>

                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

                <div className="relative mb-4">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1b4c5b] text-white py-2 rounded-md hover:bg-[#153c48] transition-colors"
                >
                  Reset Password
                </button>
              </form>
            )
          )
            : isSignUp ? (

              <form onSubmit={handleSignSubmit}>
                {/*handleSubmit*/}
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
                    className="h-4 w-4 rounded border-gray-300  bg-[#244856] focus:ring-[#153c48] border"
                    required
                  />
                  <label htmlFor="terms" className="text-sm">Agree with Terms & Conditions.</label>
                </div>

                <button
                  type="submit"  // Important: Prevents unwanted form submission
                  // onClick={submit}
                  className="w-full bg-[#244856] text-white py-2 rounded-md hover:bg-[#153c48]"
                >
                  Sign Up
                </button>


              </form>
            ) : (
              <form >
                <div className="mb-4">
                  <button
                    // // setUseOtp(true)
                    // setActionType("loginWithOtp")
                    onClick={handelSingotp}

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
                  <a href="#" className="text-sm text-[#244856] hover:underline" onClick={handleForgotChange}

                  >
                    {/* setUseOtp(true) setActionType("forgotPassword")*/}
                    Forgot Password?

                  </a>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmitlog}
                  className="w-full bg-[#244856] text-white py-2 rounded-md hover:bg-[#153c48]"
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



