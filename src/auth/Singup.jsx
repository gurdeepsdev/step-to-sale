
import React, { useState , useEffect} from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";


const SignUpForm = ({isSignUp , setIsSignUp, showModal, setShowModal} ) => {

    if (!showModal) return null; // Don't render the modal if showModal is false

  const [showPassword, setShowPassword] = useState(false);
  const [formData1, setFormData1] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    referralCode: "",
    agreeToTerms: false,
  });

  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");
  };

  const handleSubmitlog = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
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
      const { token, user, wallet } = response.data;

      // Save data in cookies
      Cookies.set("token", token, { expires: 7 }); // Expires in 7 days
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
      Cookies.set("wallet", JSON.stringify(wallet), { expires: 7 });
  
      // Success alert
      alert("Login Successful!");
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
    <div className="fixed inset-0 w-full max-w-md mx-auto bg-white rounded-lg shadow-lg mt-0 md:mt-20 lg:mt-20 mb-0 md:mb-20 lg:mb-20  z-50 backdrop-blur-md">
   

      <div className="px-6 py-6">
        <button
        //   onClick={() => window.history.back()}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={() => setShowModal(false)}

        >
          <span className="text-xl font-bold">×</span>
          <span className="sr-only">Close</span>
        </button>

        <div className="flex justify-center mb-4">
          <img
            src="/img/logo.png"            alt="Step to Sale Logo"
            className="h-10 w-auto"
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-1 text-[#244856]">{isSignUp ? "Sign up" : "Hi, Welcome Back"}</h2>
          <p className="text-sm text-gray-500">Lorem ipsum is set amet</p>
        </div>


        {/* Form rendering based on isSignUp state */}
        {isSignUp ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              {/* <p className="text-sm font-medium mb-4">Sign Up with Email Address</p> */}
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Mobile No"
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address/ Optional"
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border"
                    value={formData.email}
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
                <div>
                  <input
                    type="text"
                    name="referralCode"
                    placeholder="Referral Code/ Optional"
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-gray-300 border"
                    value={formData.referralCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData((prev) => ({ ...prev, agreeToTerms: e.target.checked }))}
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

            <div className="border mt-4"></div>
            <p className="mt-4 text-xs text-center"  >  Already have an account? 
                  <span onClick={() => setIsSignUp(false)} className="text-[#244856]  hover:underline"> Sign In</span></p>
            
          </form>
        ) : (
            
          <form >
            <div className="mb-4">
            <button
          onClick={handleGoogleSignUp}
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
          <a href="#" className="text-sm text-[#244856] hover:underline">
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

            <div className="border mt-4"></div>
            <p className="mt-4 text-xs text-center"              // Switch to SignUp form
            > Don’t have an account? <span onClick={() => setIsSignUp(true)} className="text-[#244856]  hover:underline">Sign Up</span></p>
            
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;



