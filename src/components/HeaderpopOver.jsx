import  { useState,useEffect } from "react";
import { getAllCoupons } from "../utils/api";


const StoresGrid = () => {
    

      const [coupons, setCoupons] = useState([]);
        const [loading, setLoading] = useState(true);
    
      useEffect(() => {
                const fetchCoupons = async () => {
                    const data = await getAllCoupons();
                    if (data.success) {
                        setCoupons(data.data);
                    }
                    setLoading(false);
                };
        
                fetchCoupons();
            }, []);

            console.log("gg",coupons,loading)

    return (
      <div className="w-screen md:w-full max-w-4xl mx-auto p-2  bg-white rounded-lg shadow-md mt-0 md:mt-0 lg:mt-0">
        {/* Grid Container */}
        <h2 className="text-xl font-semibold text-center mb-4">Top Stores</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
  {coupons.slice(-4).map((store, index) => (
    <div
      key={index}
      className="border rounded-lg shadow-sm p-4 text-center hover:shadow-md transition duration-300"
    >
      <h2 className="text-lg font-bold">{store.title}</h2>
      <p className="text-gray-600 text-sm">
        {store.payout_model === "percentage" ? `${store.payout}%` : `${store.currency}. ${store.payout}`}
      </p>
      <button className="mt-2 px-3 py-1 border border-gray-400 rounded-full text-sm hover:bg-[#E74833] hover:text-white transition">
        Get Deal
      </button>
    </div>
  ))}
</div>

  
        {/* View All Stores Button */}
        <div className="text-center mt-4">
          <button className="bg-[#E74833] text-white border px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white hover:text-black flex items-center mx-auto">
            View All Stores <span className="ml-2">&rarr;</span>
          </button>
        </div>
      </div>
    );
  };
  
  export default StoresGrid;
  