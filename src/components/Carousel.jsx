import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
import { getAllCoupons } from "../utils/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// const banners = [
//   {
//     banner_url: "/hero1.webp",
//     title: "Summer Sale",
//   },
//   {
//     banner_url: "/hero2.webp",
//     title: "Winter Discounts",
//   },
//   {
//     banner_url: "/Hero3.webp",
//     title: "Summer Sale",
//   },
//   {
//     banner_url: "/hero4.webp",
//     title: "Winter Discounts",
//   },
//   {
//     banner_url: "/hero5.webp",
//     title: "Summer Sale",
//   },
// ];
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
            tracking_link: coupon.tracking_link,
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
  console.log("banners", banners);
  const getDesktopSettings = (count) => ({
    dots: count > 1,
    infinite: count > 3,
    speed: 1500,
    slidesToShow: Math.min(3, count),
    slidesToScroll: 1,
    autoplay: count > 1,
    autoplaySpeed: 3000,
    arrows: count > 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  });
 
  const getMobileSettings = (count) => ({
    dots: count > 1,
    infinite: count > 1,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: count > 1,
    autoplaySpeed: 3000,
    arrows: count > 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  });
 
  const handleSelectCoupon = (slug) => {
    navigate(`/CouponsDetails/${slug}`);
  };
 
  return (
    <div className="mt-6 md:mt-10 lg:mt-10 w-full overflow-hidden">
      {/* Skeleton or Spinner */}
      {/* {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[250px]">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-lg aspect-[16/9]"></div>
          ))}
        </div>
      ) : ( */}
      <>
        {/* Desktop Slider */}
        <div className="hidden md:block">
          <Slider {...getDesktopSettings(banners.length)}>
            {banners.map((banner, index) => (
              <Link to={`${banner.tracking_link}`} key={index}>
                <div
                  key={index}
                  className="px-0.5 cursor-pointer"
                  style={{ width: "100%", display: "inline-block" }}>
                  <img
                    src={banner.banner_url}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-contain shadow-md rounded-md"
                  />
                </div>
              </Link>
            ))}
          </Slider>
        </div>
 
        {/* Mobile Slider */}
        <div className="block md:hidden">
          <Slider {...getMobileSettings(banners.length)}>
            {banners.map((banner, index) => (
              <div
                key={index}
                className="cursor-pointer"
                style={{ width: "100%", display: "inline-block" }}>
                <img
                  src={banner.banner_url}
                  alt={`Mobile Banner ${index + 1}`}
                  className="w-full h-full object-contain shadow-md rounded-md"
                  onClick={() => handleSelectCoupon(banner.title)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </>
      {/* )} */}
    </div>
  );
};
 
export default Carousel;
 
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
 
const PrevArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                 bg-white/90 hover:bg-white shadow-lg
                 w-10 h-10 rounded-full flex items-center justify-center">
      ←
    </button>
  );
};
 
const NextArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                 bg-white/90 hover:bg-white shadow-lg
                 w-10 h-10 rounded-full flex items-center justify-center">
      →
    </button>
  );
};
 