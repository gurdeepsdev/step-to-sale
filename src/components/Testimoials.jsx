import useEmblaCarousel from "embla-carousel-react";

const Testimonials = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <section className="py-12 px-6 md:px-12 lg:px-20 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Hear It From Our Customer</h2>
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
             
The Step to Sale website has an incredibly user-friendly interface. Everything is easy to find and fast.
 Navigation is simple, and I can quickly grab the deals I need without any hassle. It’s definitely one of the 
 best-designed coupon sites I’ve used!

              </p>
              <p className="text-sm font-semibold text-center"> -Smooth and Easy to Use!</p>
            </div>
          </div>
          {/* Slide 2 */}
          <div className="min-w-[100%] md:min-w-[50%] ">
            <div className="bg-white  p-8">
              <div className="flex justify-center mb-4">
                <span className="text-black text-lg">★★★★</span>
              </div>
              <p className="text-sm md:text-xl lg:text-xl font-normal mb-6 text-center">
              I absolutely love the design of Step to Sale! It’s so clean, organized, and visually appealing. 
              I can easily browse through categories and find deals without feeling overwhelmed. 
              The website makes saving money fun and effortless. Truly a fantastic shopping experience!
              </p>
              <p className="text-sm font-semibold text-center">-Great Design and Experience!
              </p>
            </div>
          </div>

     {/* Slide 1 */}
     <div className="min-w-[100%] md:min-w-[50%] ">
            <div className="bg-black text-white p-8">
              <div className="flex justify-center mb-4">
                <span className="text-white text-lg">★★★</span>
              </div>
              <p className="text-sm md:text-xl lg:text-xl font-normal	 mb-6 text-center">
             
              I was expecting more variety in deals. The website could definitely use more high-value offers.

              </p>
              <p className="text-sm font-semibold text-center"> -Smooth and Easy to Use!</p>
            </div>
          </div>
              {/* Slide 2 */}
              <div className="min-w-[100%] md:min-w-[50%] ">
            <div className="bg-white  p-8">
              <div className="flex justify-center mb-4">
                <span className="text-black text-lg">★★★★</span>
              </div>
              <p className="text-sm md:text-xl lg:text-xl font-normal mb-6 text-center">
              I’ve found some really solid deals on Step to Sale. Nothing extravagant, but definitely worth the visit for everyday savings!
              </p>
              <p className="text-sm font-semibold text-center">-Good Deals, Worth the Visit!
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
