import React from "react";

const Worksub = () => {
  return (
    <div className="bg-[#90AEAE] text-white py-4 md:py-8 lg:py-8 px-4">
      <div className="mx-2 lg:mx-16 flex flex-col lg:flex-row justify-between items-center lg:gap-8">
        {/* Left: Text Section */}
        <div className="lg:w-2/3 text-left">
          <h2 className="text-md md:text-lg lg:text-lg  font-semibold">
            Earn 20% of your friend's earnings when they join Step to Sale with your code!
          </h2>
        </div>

        {/* Right: Button Section */}
        <div className="lg:w-1/3 flex justify-end mt-1 md:mt-0 lg:mt-0">
          <button className="bg-[#E74833] hover:bg-white text-white hover:text-black font-medium px-4 py-1 md:py-2 lg:py-2 md:px-6 lg:px-6 rounded-full">
            Refer Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Worksub;
