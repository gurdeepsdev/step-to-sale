// src/pages/DealsRedirect.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;


const DealsRedirect = () => {
  const { slug } = useParams();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        window.location.href = `${apiUrl}/api/redirect/${slug}`;
      } catch (err) {
        console.error("Redirect failed:", err);
      }
    };

    redirectUser();
  }, [slug]);

  return 
};

export default DealsRedirect;

