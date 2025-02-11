import { createContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";


      // Secret key for encryption and decryption (should be kept safe)
      const SECRET_KEY = "gurdeep@12";
// Create Context
export const AuthContext = createContext(null);
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


  const [token, setToken] = useState(() => decryptData(Cookies.get("token")));
  const [userId, setUserId] = useState(() => decryptData(Cookies.get("userId")));
  const [balance, setBalance] = useState(() => decryptData(Cookies.get("balance")));
  const [username, setUsername] = useState(() => decryptData(Cookies.get("username")));
  const [email, setEmail] = useState(() => decryptData(Cookies.get("email")));
  const [referralCode, setReferralCode] = useState(() => decryptData(Cookies.get("referral_code")));
  const [phone_number, setPhonenumber] = useState(() => decryptData(Cookies.get("phone_number")));


  // Function to refresh cookies manually after login or changes
  const refreshAuth = () => {
    setToken(decryptData(Cookies.get("token")));
    setUserId(decryptData(Cookies.get("userId")));
    setBalance(decryptData(Cookies.get("balance")));
    setUsername(decryptData(Cookies.get("username")));
    setEmail(decryptData(Cookies.get("email")));
    setReferralCode(decryptData(Cookies.get("referral_code")));
    setReferralCode(decryptData(Cookies.get("referral_code")));
    setPhonenumber(decryptData(Cookies.get("phone_number")));

    
  };


  return (
    <AuthContext.Provider
      value={{ token, userId, balance, username, email, referralCode,phone_number, refreshAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
