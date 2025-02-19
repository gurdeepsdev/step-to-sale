import axios from "axios";

// Base URL for API requests
const apiUrl = import.meta.env.VITE_API_URL;
console.log("API URL:", apiUrl);

// Function to get the auth token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// Create an Axios instance with interceptors
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    console.log("Token:", token); // Check if token exists

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Fetch all coupons
export const getAllCoupons = async () => {
    try {
        const response = await api.get("/api/all-coupon");
        return response.data; // Return API response
    } catch (error) {
        console.error("Error fetching coupons:", error);
        return { success: false, message: "Failed to fetch coupons" };
    }
};

// // ✅ Fetch a single coupon by slug
// export const getCouponBySlug = async (slug) => {
//     try {
//         const response = await api.get(`/api/coupons/${slug}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching coupon:", error);
//         return { success: false, message: "Coupon not found" };
//     }
// };


export default api;
