import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black  text-white py-8">
      <div className="container mx-auto px-4 md:px-0lg:px-0 flex flex-wrap md:flex-nowrap">
        {/* Logo and Description (30%) */}
        <div className="w-full md:w-3/10 mb-8 md:mb-0 col-span-1">
          <div className="flex items-center mb-4">
              {/* Logo */}
          <div className="flex items-center">
            <div className="w-[90px] h-[50px] lg:w-[112px] lg:h-[64px]  flex items-center justify-center">
              <span className="text-white text-2xl font-bold"><img src="/img/logof.png" alt="Company Logo - StepToSale" title="StepToSale Official Logo"></img></span>
            </div>
          </div>
          </div>
          <div className="pr-0 md:pr-20 lg:pr-20">
              <p className="pr-0 md:pr-20 lg:pr-20 text-sm leading-relaxed">
              Step to Sale: Your ultimate destination for unbeatable deals and exclusive coupons. 
              Start saving today and make every purchase count! For more information you can visit our corporate site:  <a href="https://www.ClickOrbits.com" target="_blank"
    rel="noopener noreferrer">ClickOrbits.com</a>
                </p>
          </div>

        </div>

        {/* Help & Support, Lorem Ipsum, and Follow Us (70%) */}
        <div className="w-full md:w-7/10 grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Help & Support */}
          <div className="col-span-1 ">
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">FAQ</Link></li>
              <li><Link to="/HowitWorks"  className="hover:underline">How It Works</Link></li>
              {/* <li><a href="#" className="hover:underline">Register</a></li> */}
              <li><Link to="/Contactus" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* Lorem Ipsum */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Our Guidelines
            </h3>
            <ul className="space-y-2">
              <li><Link to="/Aboutus" className="hover:underline">About Us</Link></li>
              <li><Link to="/TermsConditions" className="hover:underline">Terms and Conditions</Link></li>
              <li><Link to="/Contactus" className="hover:underline">Disclaimer</Link></li>
              <li><Link to="/PrivacyPolicy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400" alt="Instagram logo - StepToSale" title="StepToSale Official Instagram">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" className="hover:text-gray-400" alt="Facebook logo - StepToSale" title="StepToSale Official Facebook">
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              {/* <a href="#" className="hover:text-gray-400" alt="Twitter logo - StepToSale" title="StepToSale Official Twitter">
                <i className="fab fa-twitter text-2xl"></i>
              </a> */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 mt-8 pt-4 text-center">
        <p className="text-sm">© 2025 StepToSale. All Rights Reserved.

</p>
      </div>
    </footer>
  );
};

export default Footer;
