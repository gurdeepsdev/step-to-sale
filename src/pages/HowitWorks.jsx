import  { useState,useContext } from "react";
import Header from "../components/Header";
import Worksub from "../components/Worksub";
import Footer from "../components/Footer";
import useEmblaCarousel from "embla-carousel-react";
import { AuthContext } from "../context/AuthContext";
import Swal from 'sweetalert2'




const OfferCard = () => {
        const { token } = useContext(AuthContext);
  
    const [isOpen, setIsOpen] = useState(false);

  // State to track image loading
  const [imagesLoaded, setImagesLoaded] = useState({
    refer: false,
    works2: false,
    works: false,
    share: false,
  });

  // Function to update image load status
  const handleImageLoad = (imageKey) => {
    setImagesLoaded((prev) => ({ ...prev, [imageKey]: true }));
  };
      const handleReferClick = () => {
      
        if (token) {
          setIsOpen(true); // Open modal if logged in
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please login first!',
              });
        }
      };
  const [emblaRef] = useEmblaCarousel({
    loop: true, // Enable infinite loop for mobile slider
    align: "start", // Align to the start of each step
    dragFree: true, // Allow drag-free mode
  });

  return (
    <>
    <Header/>
    <div className=" mt-6 md:mt-10 lg:mt-10 w-full max-w-[1440px] mx-auto overflow-hidden"></div>
    <div className="relative w-full">
      {/* Background Image */}
      {!imagesLoaded.refer && (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
  )}
      <img src="/img/Refer.webp" alt="Refer and Earn" 

       className={`w-full h-auto ${imagesLoaded.refer ? "block" : "hidden"}`}
       onLoad={() => handleImageLoad("refer")}/>

      {/* Overlay & Text Section */}
      <div className="absolute inset-0 flex flex-col items-start justify-center pl-8 md:pl-16 lg:pl-24 text-white">
        <h2 className="text-lg md:text-3xl lg:text-4xl font-bold ">Refer And Earn</h2>
        
        {/* Button */}
        <button className="mt-4 bg-[#E74833] hover:bg-white text-white hover:text-black font-semibold px-4 py-1 md:px-4 lg:px-6 md:py-2 lg:py-2 rounded-full  md:text-base  text-xs lg:text-lg transition duration-300"
                onClick={handleReferClick}
>
          Share Now
        </button>
      </div>
    </div>

<div className="px-6 py-4 lg:px-16 lg:py-10 md:py-10 bg-white text-center">
      

      {/* How it works Section */}
      <div>
        <h2 className="text-xl font-semibold lg:text-4xl md:text-4xl text-black-800 mb-4 md:mb-8 lg:mb-8">
        Refer and Earn        </h2>
<p className="mb-4 md:mb-8 lg:mb-8 text-[10px] md:text-lg lg:text-lg"> Earn rewards effortlessly by referring your friends to Step to Sale. Follow these simple steps to start earning today!
</p>
<div className="flex justify-center items-center">
{!imagesLoaded.works2 && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
          )}

<img src="/img/works2.webp"
            alt="Works"

       className={`${imagesLoaded.works2 ? "block" : "hidden"}`}
       onLoad={() => handleImageLoad("works2")}></img>
</div>
   

      </div>
    </div>

    <div className="px-6 ">
    <h2 className="text-xl font-semibold lg:text-4xl md:text-4xl text-black-800 mb-4 md:mb-8 lg:mb-8  text-center">
    How it Works!      </h2>
    <div className="flex justify-center items-center">
        <img src="/img/works.webp"></img>
    </div>
    </div>
<div className="flex flex-col items-center text-center">
    <h2 className="text-xl md:text-3xl lg:text-3xl font-bold text-gray-900 mt-2 md:mt-8 lg:mt-8">Share and Earn</h2>
    {!imagesLoaded.works && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
          )}
    <img src="/img/share.webp"  alt="Share" 
       className={`${imagesLoaded.works ? "block" : "hidden"} mt-2 w-[1003px] mb-2 md:mb-8 lg:mb-8`}
       onLoad={() => handleImageLoad("works")}/>
</div>


    <div className=" mt-6 md:mt-10 lg:mt-10 w-full max-w-[1440px] mx-auto overflow-hidden"></div>
    <div/>
<Worksub isOpen={isOpen} setIsOpen={setIsOpen} />
<Footer/>
    </>
  );
};

export default OfferCard;
