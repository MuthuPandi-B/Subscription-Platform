import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/User.js";
import mongoose from "mongoose";
dotenv.config();

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

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

    console.log("Received payload:", { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId });

    // Step 1: Validate `courseId`
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    // Step 2: Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Payment Verification Failed" });
    }

    // Step 3: Find user and add the course to `paidCourses`
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.paidCourses.includes(courseId)) {
      user.paidCourses.push(courseId);
      await user.save();
    }

    res.json({ success: true, message: "Payment Verified" });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Payment Verification Failed" });
  }
};



