

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllCoupons } from "../utils/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllCoupons();
      if (data.success) {
        // Extract banners from coupons and limit to top 8
        const allBanners = data.data
        .filter((coupon) => coupon.banner_url) // Remove coupons without banners
        .map((coupon) => ({
          banner_url: coupon.banner_url,
          title: coupon.title, // Include title
        }))
        .slice(0, 8); // Get top 8 banners
      
      
        setBanners(allBanners);
      }
      setLoading(false);
    };

    fetchCoupons();
  }, []);

  // Desktop slider settings (4 banners per slide)
  const desktopSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // 4 banners in a row
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  // Mobile slider settings (1 banner per slide)
  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Only 1 banner per slide
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

   // Handle click on suggestion
   const handleSelectCoupon = (slug) => {
    navigate(`/CouponsDetails/${slug}`);

  };
  return (
    <div className="mt-6 md:mt-10 lg:mt-10 w-full max-w-[1440px] mx-auto overflow-hidden">
      {/* Show loading text if data is still fetching */}
      
      {loading && <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>}

      {/* Desktop Slider (Hidden on small screens) */}
      <div className="hidden md:block">
        <Slider {...desktopSettings}>
          {banners.map((banner, index) => (
            <div key={index} className="px-2 cursor-pointer"> {/* Adds gap between banners */}
              <img
                src={banner.banner_url}
                alt={`Banner ${index + 1}`}
                className="w-full h-auto shadow-md rounded-lg"
                onClick={() => handleSelectCoupon(banner.title)}

              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Mobile Slider (Hidden on large screens) */}
      <div className="block md:hidden">
        <Slider {...mobileSettings}>
          {banners.map((banner, index) => (
            <div key={index} className="cursor-pointer">
              <img
                src={banner.banner_url}
                alt={`Mobile Banner ${index + 1}`}
                className="w-full h-auto shadow-md rounded-lg"
                onClick={() => handleSelectCoupon(banner.title)}

              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;





