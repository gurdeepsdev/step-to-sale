import { useState, useContext } from "react";
import Header from "../components/Header";
import Worksub from "../components/Worksub";
import Footer from "../components/Footer";
import useEmblaCarousel from "embla-carousel-react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const OfferCard = () => {
  const steps = [
    {
      title: "SEARCH",
      description: "From thousands of stores for your favorite brand.",
      icon: "/img/Search.webp",
      border: "/img/Searchborder.webp",
      color: "text-red-600",
    },
    {
      title: "SELECT",
      description: "From dozens of coupons and deals that suits you best.",
      icon: "/img/Select.webp",
      border: "/img/Selectborder.webp",
      color: "text-green-600",
    },
    {
      title: "CLICK",
      description: "On the coupon/deal that you need.",
      icon: "/img/Click.webp",
      border: "/img/Clickborder.webp",
      color: "text-blue-600",
    },
    {
      title: "APPLY",
      description: "Use the coupon or deal and save money.",
      icon: "/img/Apply.webp",
      border: "/img/Applyborder.webp",
      color: "text-orange-600",
    },
  ];

  return (
    <>
      <Header />
      <section className="pb-10 bg-white overflow-hidden mb-10">
        {/* Heading */}
        <div className="text-left  lg:mb-24 px-4 bg-black  text-white py-20">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-gray-300 mb-3">Home / How it Works</p>
            <h2 className="text-4xl text-white font-bold">How it Works</h2>
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur. Sed sed eu sit
              consectetur.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 py-10">
          {steps.map((step, i) => {
            const isTop = i % 2 !== 0;

            return (
              <div
                key={i}
                className={`relative flex justify-center ${
                  isTop
                    ? "lg:-translate-y-20 lg:pt-0 pt-10"
                    : "lg:translate-y-20 translate-y-20"
                }`}>
                {/* BORDER WRAPPER */}
                <div className="relative w-[240px] h-[240px]">
                  {/* Border Image */}
                  <img
                    src={step.border}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  />

                  {/* INNER CONTENT */}
                  <div
                    className={`absolute inset-[20%] ${
                      isTop ? "pb-[100px]" : "pt-[100px]"
                    } flex flex-col items-center justify-center text-center`}>
                    <h3
                      className={`${step.color} font-semibold tracking-widest`}
                      style={{ fontSize: "clamp(1rem, 2.2vw, 1.25rem)" }}>
                      {step.title}
                    </h3>

                    <p
                      className="text-gray-600 mt-2 leading-snug"
                      style={{ fontSize: "clamp(0.8rem, 2vw, 0.95rem)" }}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* ICON */}
                <div
                  className={`absolute ${
                    isTop
                      ? "lg:bottom-[-150px] bottom-[-75px]"
                      : "lg:top-[-150px] top-[-75px]"
                  } lg:w-44 lg:h-44 w-28 h-28 flex items-center justify-center`}>
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OfferCard;
