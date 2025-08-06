import { Link } from "react-router-dom";

const TrendingCategories = () => {
  return (
    <div className="bg-white px-4 py-8 lg:px-16 lg:py-12">
      {/* Clickable Box with Flexoffer and background image */}
      <Link
        to="https://sovrn.co/1hn5j20"
        target="_blank"
      >
        <figure
          className="w-full h-64 rounded-lg shadow-lg text-[#00008B] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition bg-cover bg-center"
          style={{ backgroundImage: "url('/walmart.webp')" }} // <-- replace with actual path
        >
        </figure>
      </Link>
    </div>
  );
};

export default TrendingCategories;
