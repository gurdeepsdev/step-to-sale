import useEmblaCarousel from "embla-carousel-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const TrendingCategories = () => {
  const navigate = useNavigate();

   const handleReferClick = () => {
        navigate('/Flexpage')
       
        };
  return (
    <div className="bg-white px-4 py-8 lg:px-16 lg:py-12">
       {/* Clickable Empty Box with Flexoffer */}
       <div onClick={handleReferClick}>
          <figure className=" w-full h-64 rounded-lg shadow-lg bg-white text-[#00008B] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
            <span className="text-xl font-semibold">Flexoffer</span>
          </figure>
        </div>
    </div>
  );
};

export default TrendingCategories;
