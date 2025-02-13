import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/User.js";
import mongoose from "mongoose";
import SubscribedUser from "../models/SubscribedUser.js";
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
// work with course

// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId,email } = req.body;

//     console.log("Received payload:", { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId,email });

//     // Step 1: Validate `courseId`
//     if (!mongoose.Types.ObjectId.isValid(courseId)) {
//       return res.status(400).json({ error: "Invalid course ID" });
//     }

//     // Step 2: Verify Razorpay signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ error: "Payment Verification Failed" });
//     }

//     // Step 3: Find user and add the course to `paidCourses`
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (!user.paidCourses.includes(courseId)) {
//       user.paidCourses.push(courseId);
//       await user.save();
//     }

//     // Step 4: Add subscription to `SubscribedUser`
//     const subscribedUser = await SubscribedUser.findOne({ email: user.email });
//     if (!subscribedUser) {
//       const newSubscribedUser = new SubscribedUser({ email: user.email });
//       await newSubscribedUser.save();
//     }

//     res.json({ success: true, message: "Payment Verified" });
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     res.status(500).json({ error: "Payment Verification Failed" });
//   }
// };


// work with subscripe
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, email } = req.body;

    console.log("Received payload:", { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, email });

    // Step 1: Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Payment Verification Failed" });
    }

    // Step 2: Handle course payment
    if (courseId) {
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ error: "Invalid course ID" });
      }

      // Add the course to the user's `paidCourses`
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.paidCourses.includes(courseId)) {
        user.paidCourses.push(courseId);
        await user.save();
      }

      return res.json({ success: true, message: "Course Payment Verified" });
    }

  
      let subscribedUser = await SubscribedUser.findOne({ email });
      console.log("Subscribed user before update",subscribedUser)
      if (!subscribedUser) {
        subscribedUser = new SubscribedUser({ email, isSubscribed: true });
      } else {
        subscribedUser.isSubscribed = true;
      }
      await subscribedUser.save();
      console.log("Subscribed user after update",SubscribedUser);

    res.json({ success: true, message: "Subscription Payment Verified",isSubscribed:true });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Payment Verification Failed" });
  }
};


// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, email } = req.body;

//     console.log("Received payload:", { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, email });

//     // Step 1: Verify Razorpay signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ error: "Payment Verification Failed" });
//     }

//     // Step 2: Handle course payment
//     if (courseId) {
//       // Validate courseId
//       if (!mongoose.Types.ObjectId.isValid(courseId)) {
//         return res.status(400).json({ error: "Invalid course ID" });
//       }

//       // Find user by email
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       // Add the course to the user's paidCourses if not already added
//       if (!user.paidCourses.includes(courseId)) {
//         user.paidCourses.push(courseId);
//         await user.save();
//       }

//       return res.json({ success: true, message: "Course Payment Verified" });
//     }

//     // Step 3: Handle subscription payment
//     if (email) {
//       // Find or create the subscribed user
//       let subscribedUser = await SubscribedUser.findOne({ email });
//       console.log("Subscribed user before update:", subscribedUser);

//       if (!subscribedUser) {
//         // Create a new subscribed user
//         subscribedUser = new SubscribedUser({ email, isSubscribed: true });
//       } else {
//         // Update the existing subscribed user
//         subscribedUser.isSubscribed = true;
//       }

//       // Save the changes to the database
//       await subscribedUser.save();
//       console.log("Subscribed user after update:", subscribedUser);

//       return res.json({ success: true, message: "Subscription Payment Verified", isSubscribed: true });
//     }

//     // If neither courseId nor email is provided, return an error
//     return res.status(400).json({ error: "Invalid payload: courseId or email is required" });
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     res.status(500).json({ error: "Payment Verification Failed" });
//   }
// };



export const getSubscriptionStatus = async (req, res) => {
  try {
    const email = req.user.email; // Ensure `protect` middleware populates req.user
    if (!email) {
      return res.status(400).json({ error: "User email not found" });
    }

    const subscribedUser = await SubscribedUser.findOne({ email });
    console.log("Subscription status fetched:", subscribedUser?.isSubscribed);

    res.json({ isSubscribed: subscribedUser?.isSubscribed || false });
  } catch (error) {
    console.error("Failed to fetch subscription status:", error);
    res.status(500).json({ error: "Failed to fetch subscription status" });
  }
};


