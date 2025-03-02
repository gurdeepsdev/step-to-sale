import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactUs = () => {
   
    return (
        <>
        <Header></Header>
     
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-white  rounded-xl p-3 md:p-6 lg:p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Contact Us</h1>
          <p className="text-gray-700 leading-relaxed mb-4 text-center">
            It was so nice getting feedback from everyone; we're so glad we have the right approach at Step to Sale.
            For this reason, we would appreciate any words from you to make your experience simple and enjoyable.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For any doubt concerning the deals on our website, also any retailers interested in working with us, 
            please do not hesitate to get in touch with us. Our team is ready to provide all the details you may need.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Support</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For any inquiry about using this website, accessing a particular offer, or reporting an issue, our customer care team is just a click away. 
            We take pride in ensuring that every response is timely and helpful to create a seamless experience for you.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-semibold">Email:</span> support@steptosale.com
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-semibold">Business Hours:</span> Monday to Friday, 10 AM to 7:00 PM (SGT)
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Social Media</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Stay connected with us on social media for more updates, fresh deals, and promotions!
          </p>
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold">Facebook:</span> facebook.com/steptosale
          </p>
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold">Twitter:</span> twitter.com/steptosale
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-semibold">Instagram:</span> instagram.com/steptosale
          </p>
          <p className="text-gray-700 font-semibold text-center">
            Thanks for the input. We are always working to do better and be better.
            Enjoy shopping on Step to Sale, and we look forward to hearing from you!
          </p>
        </div>
      </div>
      <Footer/>
      </>
    );
  };
  
  export default ContactUs;
  

