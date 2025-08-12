import axios from "axios";

// Base URL for API requests
const apiUrl = import.meta.env.VITE_API_URL;

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
        const response = await api.get("/api/get-campains");
        return response.data; // Return API response
    } catch (error) {
        console.error("Error fetching coupons:", error);
        return { success: false, message: "Failed to fetch coupons" };
    }
};
export const getOffercoupon = async () => {
  try {
      const response = await api.get("/api/get-offercoupon");
      return response.data; // Return API response
  } catch (error) {
      console.error("Error fetching coupons:", error);
      return { success: false, message: "Failed to fetch coupons" };
  }
};



// ✅ Fetch all coupons
export const getAllbrands = async () => {
  try {
      const response = await api.get("/api/all-brands");
      return response.data; // Return API response
  } catch (error) {
      console.error("Error fetching coupons:", error);
      return { success: false, message: "Failed to fetch coupons" };
  }
};

// ✅ Fetch a single coupon by slug
export const getCouponBySlug = async (slug) => {
    try {
        const response = await api.get(`/api/single-coupon/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching coupon:", error);
        return { success: false, message: "Coupon not found" };
    }
};

// ✅ Fetch offers for a brand by slug
export const getOffer = async (slug) => {
  try {
      const response = await api.get(`/api/offers/brand/${slug}`);
      return response.data;
  } catch (error) {
      console.error("Error fetching coupon:", error);
      return { success: false, message: "Coupon not found" };
  }
};

// ✅ Fetch a single offer by slug
export const getsingleOffer = async (slug) => {
  try {
      const response = await api.get(`/api/CouponOffer/${slug}`);
      return response.data;
  } catch (error) {
      console.error("Error fetching coupon:", error);
      return { success: false, message: "Coupon not found" };
  }
};






// ✅ Fetch a catrgore coupon by slug
export const getAllcategoreCoupons = async (categoryName) => {
  try {
      const response = await api.get(`/api/all-couponss/${categoryName}`);
      return response.data;
  } catch (error) {
      console.error("Error fetching coupon:", error);
      return { success: false, message: "Coupon not found" };
  }
};

// ✅ Fetch transactions by userId
export const fetchTransactions = async (userId) => {
  try {
    const response = await api.get(`/api/tdetails/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { success: false, message: "Failed to load transactions" };
  }
};



// ✅ Fetch top 4 stores with the most offers
export const fetchTopStores = async () => {
  try {
      const response = await api.get("/api/topStores");
      return response.data.topStores;
  } catch (error) {
      console.error("Error fetching top stores:", error);
      return { success: false, message: "Failed to load top stores" };
  }
};

// ✅ Fetch limited time offer 24hours 
export const fetchLimitedOffer = async () => {
  try {
      const response = await api.get("/api/limited-offer");
      return response.data;
  } catch (error) {
      console.error("Error fetching top stores:", error);
      return { success: false, message: "Failed to load top stores" };
  }
};


export default api;

