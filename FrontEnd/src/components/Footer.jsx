
import { Link } from "react-router-dom";
function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-4 mt-10 text-center">
        <p>&copy; {new Date().getFullYear()} Learning Platform. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
    
      <Link to="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link>
      <Link to="/terms-of-service" className="text-blue-500 hover:underline">Terms of Service</Link>
      <Link to="/contact" className="text-blue-500 hover:underline">Contact Us</Link>
    
    
        </div>
      </footer>
    );
  }
  export const PrivacyPolicy = () => {
    return (
      <div className="p-5">
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
        <p>We value your privacy. This policy outlines how we handle your data.</p>
        <ul className="list-disc ml-5 mt-3">
          <li>We collect only necessary information for providing our services.</li>
          <li>Your data will never be shared without your consent.</li>
          <li>We use secure methods to protect your information.</li>
        </ul>
      </div>
    );
  };
  
  export const TermsOfService = () => {
    return (
      <div className="p-5">
        <h1 className="text-2xl font-bold">Terms of Service</h1>
        <p>By using our platform, you agree to the following terms:</p>
        <ul className="list-disc ml-5 mt-3">
          <li>You must provide accurate information when creating an account.</li>
          <li>You are responsible for all activities under your account.</li>
          <li>We reserve the right to modify our services at any time.</li>
        </ul>
      </div>
    );
  };
  export default Footer;