import { useState,useContext,useEffect } from "react";
import axios from "axios";
import API from "../api/api";
import {AuthContext} from "../context/AuthContext";

const Subscription = () => {
  const [amount, setAmount] = useState(500);
  const [isSubscribed, setIsSubscribed] = useState(false); // ✅ Track subscription status
  const { user } = useContext(AuthContext); // ✅ Access the user
  
  useEffect(() => {
    // Fetch subscription status on page load
    const fetchSubscriptionStatus = async () => {
      if (user && user.email) {
        try {
          const { data } = await API.get("/payment/subscription-status",
            {params:{timestamp:Date.now()},
          });
          console.log("Fetched subscription status:", data.isSubscribed); 
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
        name: "Your App Name",
        description: "Premium Subscription",
        handler:async function (response) {
          if (!user || !user.email) {
            throw new Error("User email is not available.");
          }
          console.log("Payment Successful!", response);
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
  console.log(isSubscribed);

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
        <p className="text-green-600 font-bold">Subscribed</p> // Show this after successful subscription
      )}
    </div>
  );
};

export default Subscription;
