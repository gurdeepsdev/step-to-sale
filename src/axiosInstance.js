// axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie"; // If you're storing the token in cookies

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your actual API URL
});
  const decryptData = (encryptedData) => {
    if (!encryptedData) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData ? JSON.parse(decryptedData) : null;
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  };
// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = decryptData(Cookies.get("token")); // Get token from cookies or local storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
