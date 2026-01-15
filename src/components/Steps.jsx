import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { getAllCoupons } from "../utils/api";

const HowItWorks = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const visibleDeals = deals.slice(0, 12);

  /* ======================
     EMBLA CONFIG
  ====================== */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  /* ======================
     FETCH DATA
  ====================== */
  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllCoupons();
      setDeals(data.data || []);
      setIsLoading(false);
    };
    fetchCoupons();
  }, []);

  /* ======================
     AUTO SLIDE
  ====================== */
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  /* ======================
     HELPERS
  ====================== */
  const decodeHtmlEntities = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent.trim();
  };

  const stripHtmlTags = (html) =>
    decodeHtmlEntities(html)
      .replace(/<[^>]+>/g, "")
      .replace(/\u00A0|&nbsp;/g, " ")
      .trim();

  const formatPrice = (amount, currency) => {
    if (!amount) return "";
    if (typeof amount === "string" && /[$₹]/.test(amount)) return amount;
    return `${currency === "INR" ? "₹" : "$"}${amount}`;
  };
  console.log("visibleDeals", visibleDeals);
  /* ======================
     UI
  ====================== */
  return (
    <>
      <div className="my-8 flex items-center justify-center">
        <div className="w-1/3 h-[1px] bg-black"></div>
        <div className="mx-2 md:mx-4 lg:mx-4 text-center border border-black rounded-full md:px-6 lg:px-6 py-2">
          <h2 className="text-sm font-[500] lg:text-3xl text-gray-800 min-h-[32px]">
            Step To Sale
          </h2>
          <p className="text-black mt-2 text-[8px] md:text-lg lg:text-lg whitespace-nowrap px-4 min-h-[24px]">
            Your Gateway to Great Deals
          </p>
        </div>
        <div className="w-1/3 h-[1px] bg-black"></div>
      </div>

      <div className="px-6 lg:px-16 bg-white text-center">
        {isLoading ? (
          <div className="min-h-[500px] animate-pulse bg-gray-100 rounded-xl" />
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-8">Deal Of The Day</h2>

            {/* SLIDER WRAPPER */}
            <div className="relative">
              {/* LEFT BUTTON */}
              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                         w-10 h-10 rounded-full bg-white shadow 
                         flex items-center justify-center hover:bg-gray-100">
                ←
              </button>

              {/* RIGHT BUTTON */}
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                         w-10 h-10 rounded-full bg-white shadow 
                         flex items-center justify-center hover:bg-gray-100 hover:bg-none">
                →
              </button>

              {/* SLIDER */}
              <div
                ref={emblaRef}
                className="overflow-hidden"
                onMouseEnter={() => emblaApi?.stop()}
                onMouseLeave={() => emblaApi?.scrollNext()}>
                <div className="flex">
                  {visibleDeals.map((deal, i) => (
                    <div
                      key={i}
                      className="
                      flex-shrink-0 
                      px-3 
                      w-full 
                      sm:w-1/2 
                      lg:w-1/3 
                      xl:w-1/4
                    ">
                      <div className="border rounded-3xl p-4 h-full flex flex-col bg-white">
                        {/* Image */}
                        <div className="h-40 sm:h-48 rounded-2xl mb-4 overflow-hidden">
                          <img
                            src={deal.banner_url2}
                            alt={deal.title}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Title */}
                        <p className="text-lg font-bold text-center mb-1">
                          {deal.title}
                        </p>

                        {/* Description */}
                        <p className="text-sm text-gray-600 text-center mb-4">
                          {stripHtmlTags(deal.description)}
                        </p>

                        {/* Price */}
                        <div className="text-center mb-4">
                          {deal.discount ? (
                            <>
                              <span className="line-through text-gray-400 mr-2">
                                {formatPrice(deal.payout, deal.currency)}
                              </span>
                              <span className="text-xl font-bold">
                                {formatPrice(
                                  deal.discount_payout,
                                  deal.currency
                                )}
                              </span>
                            </>
                          ) : (
                            <span className="text-xl font-bold">
                              {formatPrice(deal.payout, deal.currency)}
                            </span>
                          )}
                        </div>

                        {/* Button */}
                        <button
                          onClick={() =>
                            window.open(deal.tracking_link, "_blank")
                          }
                          className="mt-auto py-3 rounded-full border border-[#DA1919] 
                                   text-black hover:bg-[#DA1919] hover:text-white transition">
                          Grab Deals
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HowItWorks;
