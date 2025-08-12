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
        const allBanners = data.data
          .filter((coupon) => coupon.banner_url)
          .map((coupon) => ({
            banner_url: coupon.banner_url,
            title: coupon.title,
          }))
          .slice(0, 8);
        setBanners(allBanners);
      }
      setLoading(false);
    };

    fetchCoupons();
  }, []);

  const desktopSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const handleSelectCoupon = (slug) => {
    navigate(`/CouponsDetails/${slug}`);
  };

  return (
    <div className="mt-6 md:mt-10 lg:mt-10 w-full max-w-[1440px] mx-auto overflow-hidden">
      {/* Skeleton or Spinner */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[250px]">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-lg aspect-[16/9]"
            ></div>
          ))}
        </div>
      ) : (
        <>
          {/* Desktop Slider */}
          <div className="hidden md:block min-h-[250px]">
            <Slider {...desktopSettings}>
              {banners.map((banner, index) => (
                <div
                  key={index}
                  className="px-2 cursor-pointer"
                  style={{ width: "100%", display: "inline-block" }}
                >
                  <img
                    src={banner.banner_url}
                    alt={`Banner ${index + 1}`}
                    width="400"
                    height="225"
                    className="w-full h-[400px] aspect-[4/3] object-contain shadow-md rounded-lg"
                    onClick={() => handleSelectCoupon(banner.title)}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Mobile Slider */}
          <div className="block md:hidden min-h-[200px]">
            <Slider {...mobileSettings}>
              {banners.map((banner, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  style={{ width: "100%", display: "inline-block" }}
                >
                  <img
                    src={banner.banner_url}
                    alt={`Mobile Banner ${index + 1}`}
                    width="400"
                    height="225"
                    className="w-full h-[450px] aspect-[4/3] object-cover shadow-md rounded-lg"
                    onClick={() => handleSelectCoupon(banner.title)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
