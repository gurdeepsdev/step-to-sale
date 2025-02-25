import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
    <Header></Header>
  
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6 ">
      <div className="max-w-3xl w-full bg-white  rounded-2xl p-2 md:p-8 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">About Us</h1>
        <p className="text-gray-600 text-lg text-center mb-4">Welcome to <span className="font-semibold">Step to Sale!</span></p>
        <p className="text-gray-700 leading-relaxed mb-4">
          At Step to Sale, we aim to outfit you with savings that can help you buy anything you love and need. 
          We offer you all the latest deals in fashion, electronics, domestic goods, or services under one roof but at discounted online deals.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Our passionate deal hunters work hard behind the scenes to curate and verify each discount we feature. 
          We know that trust is key when shopping online, which is why we only list deals from reputable sources. 
          Shop with confidence, knowing that every offer is real and reliable.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          We understand that online shopping can be somewhat overwhelming, what with the wide array of options. That is where we step in! 
          Whether you're a pro online shopper or just starting to discover the world of online savings, Step to Sale is here for you, 
          leading you to the best deals on our user-friendly platform.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Step to Sale is not just about saving money, but also about enhancing your shopping experience. 
          We believe that everyone deserves great deals without the hassle, which is why our goal is to make your shopping journey easy and rewarding.
        </p>
        <p className="text-gray-700 leading-relaxed font-semibold text-center">
          Thanks for choosing Step to Sale as your trusted partner for finding the best online deals. 
          We are excited to help you save money and discover great products!
        </p>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default AboutUs;
