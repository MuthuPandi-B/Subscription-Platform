import { useState } from 'react';
import API from '../api/api';

function SubscriptionForm() {
  const [amount, setAmount] = useState(500);

  const handlePayment = async () => {
    const { data } = await API.post('/payment/create-order', { amount, currency: 'INR' });
    window.location.href = `https://checkout.razorpay.com/v1/checkout.js?order_id=${data.order.id}`;
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold">Subscribe Now</h1>
      <p className="text-lg my-3">Access premium courses for just ₹{amount}</p>
      <button onClick={handlePayment} className="bg-blue-500 text-white px-5 py-2 rounded-lg">
        Pay with Razorpay
      </button>
    </div>
  );
}
export default SubscriptionForm;