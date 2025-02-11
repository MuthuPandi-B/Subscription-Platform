import razorpay from "../config/razorpay.js";

export const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ error: "Amount and currency are required" });
    }

    const options = {
      amount: amount * 100, // Convert to smallest currency unit
      currency,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    
    res.json({ success: true, order });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ error: "Error creating Razorpay order" });
  }
};

import crypto from "crypto";

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Payment Verification Failed" });
    }

    res.json({ success: true, message: "Payment Verified" });
  } catch (error) {
    res.status(400).json({ error: "Payment Verification Failed" });
  }
};
