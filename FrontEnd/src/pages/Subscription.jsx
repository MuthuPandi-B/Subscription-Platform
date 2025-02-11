import { useState } from "react";
import axios from "axios";

const Subscription = () => {
  const [amount, setAmount] = useState(500);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/payment/create-order", { 
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
        handler: function (response) {
          console.log("Payment Successful!", response);
          alert("Payment Successful!");
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

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold">Subscribe Now</h1>
      <p className="text-lg my-3">Access premium courses for just ₹{amount}</p>
      <button 
        onClick={handlePayment} 
        className="bg-blue-500 text-white px-5 py-2 rounded-lg"
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default Subscription;
