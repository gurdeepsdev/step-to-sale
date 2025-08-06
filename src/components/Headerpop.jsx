
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Electronics",
    // items: ["Mobile", "Tablets", "Accessories"],
  },
  {
    title: "Fashion",
    // items: ["Clothes", "T-Shirts", "Shoes"],
  },
  {
    title: "Health-&-Beauty",
    // items: ["Makeup", "Skincare", "Wellness"],
  },
  {
    title: "Travel",
    // items: ["Pizza", "Burger", "Health Drinks"],
  },
  { title: "Sports"},
  {title : "Airlines"},
  {title : "Services"},
  {title: "Lifestyle"},
  {title: "Electronics"},
  {title: "Law"},

   

  
];


export default function CategorySection() {
    const navigate = useNavigate();
  
const slug = "All";

  const getDeal = (categoryName) => {
    navigate(`/CouponFilters/${categoryName}`)

  };
  return (
    <div className="w-screen md:w-full max-w-4xl mx-auto p-2 bg-white rounded-lg shadow-md mt-0 md:mt-0 lg:mt-0">
    <h2 className="text-xl font-semibold text-center mb-4">Popular Categories</h2>
  
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <div
          key={category.title}
          onClick={() => getDeal(category.title)}
          className="cursor-pointer hover:text-red-500 text-sm font-medium text-gray-700 hover:pl-1 transition-all"
        >
          {category.title}
        </div>
      ))}
    </div>
  
    <div className="text-center mt-4">
      <button
        className="bg-[#E74833] text-white border px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white hover:text-black flex items-center mx-auto"
        onClick={() => getDeal(slug)}
      >
        View All Categories <span className="ml-2">&rarr;</span>
      </button>
    </div>
  </div>
  
  );
}

