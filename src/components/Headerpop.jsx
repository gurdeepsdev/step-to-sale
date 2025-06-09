
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Mobile & Tablets",
    items: ["Mobile", "Tablets", "Accessories"],
  },
  {
    title: "Fashion",
    items: ["Clothes", "T-Shirts", "Shoes"],
  },
  {
    title: "Beauty & Health",
    items: ["Makeup", "Skincare", "Wellness"],
  },
  {
    title: "Food & Drinks",
    items: ["Pizza", "Burger", "Health Drinks"],
  },
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
          <div key={category.title} onClick={() => getDeal(slug)}>
            <h3 className="text-red-600 font-semibold mb-1">{category.title}</h3>
            <ul className="space-y-1 text-gray-700 text-sm">
              {category.items.map((item) => (
                <li key={item} className="hover:text-red-500 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
      <button className="bg-[#E74833] text-white border px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white hover:text-black flex items-center mx-auto"
      onClick={() => getDeal(slug)}
>
      View All Categories <span className="ml-2">&rarr;</span>
          </button>
        </div>
    </div>
  );
}
