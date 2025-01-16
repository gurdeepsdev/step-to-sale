// Carousel.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  // Slider settings
  const settings = {
    dots: true, // Enable navigation dots
    infinite: true, // Enable infinite loop
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay interval
    arrows: false, // Disable arrows for cleaner look
  };

  return (
    <div className="mt-6 md:mt-10 lg:mt-10 w-full max-w-[1440px] mx-auto  overflow-hidden">
      {/* Desktop Slider */}
      <div className="hidden sm:block">
        <Slider {...settings}>
          {/* Slide 1 */}
          <div>
            <img
              src="/img/banner.jpg"
              alt="Banner 1"
              className="w-full h-auto shadow-md"
            />
          </div>
          {/* Slide 2 */}
          <div>
            <img
              src="/img/banner.jpg"
              alt="Banner 2"
              className="w-full h-auto shadow-md"
            />
          </div>
        </Slider>
      </div>

      {/* Mobile Slider */}
      <div className="block sm:hidden">
        <Slider {...settings}>
          {/* Slide 1 */}
          <div>
            <img
              src="/img/mob.jpg"
              alt="Mobile Banner 1"
              className="w-full h-auto shadow-md"
            />
          </div>
          {/* Slide 2 */}
          <div>
            <img
              src="/img/mob.jpg"
              alt="Mobile Banner 2"
              className="w-full h-auto shadow-md"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
