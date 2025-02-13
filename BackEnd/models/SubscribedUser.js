import mongoose from "mongoose";

const subscribedUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  isSubscribed:{
    type:Boolean,
    default:false,
  },
  subscribedAt: { type: Date, default: Date.now },
});

export default mongoose.model("SubscribedUser", subscribedUserSchema);
