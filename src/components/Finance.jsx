import useEmblaCarousel from "embla-carousel-react";

const FinanceOffers = () => {
  const offers = [
    { id: 1, name: "Axis Bank", logo: "/img/finance.png" },
    { id: 2, name: "Kotak Bank", logo: "/img/finance1.png" },
    { id: 3, name: "Union Bank", logo: "/img/finance2.png" },
    { id: 4, name: "SBI", logo: "/img/finance3.png" },
    { id: 5, name: "HDFC Bank", logo: "/img/finance4.png" },
    { id: 6, name: "ICICI Bank", logo: "/img/finance5.png" },
    { id: 7, name: "Razorpay", logo: "/img/finance6.png" },
    { id: 8, name: "Paytm", logo: "/img/finance7.png" },
    { id: 9, name: "Kotak Bank", logo: "/img/finance1.png" },
    { id: 10, name: "Union Bank", logo: "/img/finance2.png" },

  ];

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  return (
    <div className="bg-white px-6 py-10 lg:px-16 md:px-16  lg:py-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900">Finance Offers</h2>
        <p className="text-gray-600 text-sm md:text-lg lg:text-lg">
        Top Offers for Every Wallet. Unlock finance deals crafted to maximize savings and achieve financial goals."
        </p>
      </div>

      {/* Slider Section for mobile screens */}
      <div className="block lg:hidden overflow-hidden" ref={emblaRef}>
        <div className="flex space-x-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="flex-shrink-0  p-4  flex items-center justify-center hover:shadow-lg  transition"
            >
              <img
                src={offer.logo}
                alt={offer.name}
                className="h-14 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Grid Section for larger screens */}
      <div className="hidden lg:grid grid-cols-5 gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex items-center justify-center p-2 hover:shadow-none hover:border-none  shadow-md border transition rounded"
          >
            <img
              src={offer.logo}
              alt={offer.name}
              className="h-22 object-contain"
            />
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-8 text-center">
        <button className="px-3 md:px-6 lg:px-6 py-1 md:py-2 lg:py-2 text-sm md:text-base lg:text-base border border-gray-800 text-gray-800 rounded-full hover:bg-[#E74833] hover:border-[#E74833]  hover:text-white transition">
          See More
        </button>
      </div>
    </div>
  );
};

export default FinanceOffers;
