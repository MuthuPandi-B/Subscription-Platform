import { useState,useContext,useEffect } from "react";
import axios from "axios";
import API from "../api/api";
import {AuthContext} from "../context/AuthContext";

const Subscription = () => {
  const [amount, setAmount] = useState(500);
  const [isSubscribed, setIsSubscribed] = useState(false); // ✅ Track subscription status
  const { user } = useContext(AuthContext); // ✅ Access the user
  const [showTerms, setShowTerms] = useState(false);
  useEffect(() => {
    // Fetch subscription status on page load
    const fetchSubscriptionStatus = async () => {
      if (user && user.email) {
        try {
          const { data } = await API.get("/payment/subscription-status",
            {params:{timestamp:Date.now()},
          });
          // console.log("Fetched subscription status:", data.isSubscribed); 
          setIsSubscribed(data.isSubscribed);
        } catch (error) {
          console.error("Failed to fetch subscription status front:", error);
        }
      }
    };

    fetchSubscriptionStatus();
  }, [user]);


  const handlePayment = async () => {
    if (!user) {
      alert("Please log in to subscribe.");
      return;
    }
    try {
      const { data } = await API.post("/payment/create-order", { 
        amount, 
        currency: "INR" 
      });

      if (!data.order) {
        throw new Error("Payment order creation failed");
      }

      const options = {
        key: "rzp_test_omV4sjUn30W0Mm", // ✅ Replace with your Razorpay Key ID
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "Learning Platform",
        description: "Premium Subscription",
        handler:async function (response) {
          if (!user || !user.email) {
            throw new Error("User email is not available.");
          }
          // console.log("Payment Successful!", response);
          alert("Payment Successful!");

          await API.post("/payment/verify", {
            paymentType: "subscription",
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });
  
          // Update UI to show "Subscribed"
          const { data } = await API.get("/payment/subscription-status");
          setIsSubscribed(data.isSubscribed); // Update the state with the latest status
          
        },
        prefill: {
          email: "test@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
        
      };
      


      const rzp = new window.Razorpay(options);
      rzp.open(); // ✅ Opens Razorpay checkout

    } catch (error) {
      console.error("Payment Error:", error.message);
    }
  };
  // console.log(isSubscribed);

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold">Subscribe Now</h1>
      <p className="text-lg my-3">Access premium courses for just ₹{amount}</p>

      {!isSubscribed ? (
        <button
          onClick={handlePayment}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg"
        >
          Pay with Razorpay
        </button>
      ) : (
        <p className="text-green-600 font-bold">Subscribed</p>
      )}
<div className=" p-6 rounded-lg shadow-md max-w-md mx-auto text-center">
  <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Subscribe?</h3>
  <p className="text-gray-600 mb-4">
    By subscribing, you'll gain access to exclusive benefits:
  </p>
  <ul className="text-gray-600 mb-4 list-disc list-inside text-left">
    <li>Receive email notifications with links to all newly listed premium videos as soon as they're released.</li>
    <li>Stay updated and never miss out on the latest content.</li>
  </ul>
  <p className="text-gray-500 text-sm mb-4">
    Terms and conditions apply. Please review our subscription terms for more details.
  </p>
 
</div>
      {/* Terms and Conditions Section */}
      <p
        className="text-blue-500 underline cursor-pointer mt-4"
        onClick={() => setShowTerms(!showTerms)}
      >
        Terms and Conditions
      </p>

      {showTerms && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Terms and Conditions</h2>
          <ul className="list-disc list-inside text-sm">
            <li>
              By subscribing, you will receive email notifications for new
              premium videos.
            </li>
            <li>
              Email notifications will be sent to the email address provided
              during subscription.
            </li>
            <li>
              Subscription does not guarantee free access to premium videos.
              Additional charges may apply.
            </li>
            <li>
              Your email address will be stored securely and used only for
              subscription-related emails.
            </li>
            <li>We reserve the right to modify these terms at any time.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

  
export default Subscription;
