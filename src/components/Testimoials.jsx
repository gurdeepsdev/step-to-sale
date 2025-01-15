import React from "react";
import useEmblaCarousel from "embla-carousel-react";

const Testimonials = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <section className="py-12 px-6 md:px-12 lg:px-20 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">Hear It From Our Customer</h2>
        <p className="text-gray-600 text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur. Sed sed eu sit consectetur.
        </p>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex p-4" >
          {/* Slide 1 */}
          <div className="min-w-[100%] md:min-w-[50%] ">
            <div className="bg-black text-white p-8">
              <div className="flex justify-center mb-4">
                <span className="text-white text-lg">★★★★★</span>
              </div>
              <p className="text-sm md:text-xl lg:text-xl font-normal	 mb-6 text-center">
                Lorem ipsum dolor sit amet consectetur. Turpis ac pretium justo enim.
                Tellus at at cras aliquam ac volutpat in hac. Tellus at at cras aliquam
                ac volutpat in hac.
              </p>
              <p className="text-sm font-semibold text-center">By Daniel Robert, Bangalore</p>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="min-w-[100%] md:min-w-[50%] ">
            <div className="bg-white  p-8">
              <div className="flex justify-center mb-4">
                <span className="text-black text-lg">★★★★★</span>
              </div>
              <p className="text-sm md:text-xl lg:text-xl font-normal mb-6 text-center">
                Lorem ipsum dolor sit amet consectetur. Turpis ac pretium justo enim.
                Tellus at at cras aliquam ac volutpat in hac. Tellus at at cras aliquam
                ac volutpat in hac.
              </p>
              <p className="text-sm font-semibold text-center">By Daniel Robert, Bangalore</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
