import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
    return (
        <>
        <Header/>
       
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-white rounded-xl p-2 md:p-6 lg:p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Privacy Policy</h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            At Step to Sale, we think your privacy is important and at our core. This Privacy Policy explains what we collect from users and how we will subsequently use, store, or share that data. By visiting and using our website, you agree to the practices outlined in this policy.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We will collect your personal as well as non-personal information from your visit to Step to Sale. This includes name and email addresses from forms filled on contact pages or our newsletter, among other details. We also collect IP addresses, browser types, and pages visited to improve our site’s features and understand user behavior.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
            <li>To better provide you with content, products, and services suited to your tastes.</li>
            <li>To enhance our services and tailor your online experience.</li>
            <li>To communicate promotions, updates, etc., if you have given your consent.</li>
            <li>To address your inquiries and provide after-sales service.</li>
            <li>To better understand how to serve your needs and improve our features and editorial content.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies on the site, which help you enjoy a better experience. Cookies are small files on your device that manage site traffic and functionality. You can control cookie settings through your browser, but disabling them may impact site performance.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We respect your private data and have taken industry-standard measures to prevent unauthorized access, alteration, or disclosure. However, no method of data transmission over the internet is completely secure.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Links</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Step to Sale may include links to other sites. We do not own third-party websites or control their privacy policies or content. You are responsible for reviewing third-party privacy policies before making transactions.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may update this privacy statement from time to time. Changes will be noted with a new revision date on this page. By continuing to use our website, you agree to any updates.
          </p>
          <p className="text-gray-700 font-semibold text-center">
            You can contact us with any questions regarding this policy through our website.
          </p>
        </div>
      </div>
      <Footer/>
      </>
    );
  };
  
  export default PrivacyPolicy;
  
