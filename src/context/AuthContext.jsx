import { createContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";


      // Secret key for encryption and decryption (should be kept safe)
      const SECRET_KEY = "gurdeep@12";
// Create Context
export const AuthContext = createContext(null);

// Context Provider Component
export const AuthProvider = ({ children }) => {
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

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [referralCode, setReferralCode] = useState(null);

  useEffect(() => {
    setToken(decryptData(Cookies.get("token")));
    setUserId(decryptData(Cookies.get("userId")));
    setBalance(decryptData(Cookies.get("balance")));
    setUsername(decryptData(Cookies.get("username")));
    setEmail(decryptData(Cookies.get("email")));
    setReferralCode(decryptData(Cookies.get("referral_code")));
  }, []);
  return (
    <AuthContext.Provider
      value={{ token, userId, balance, username, email, referralCode }}
    >
      {children}
    </AuthContext.Provider>
  );
};
