import mongoose from "mongoose";

const boxModelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }, // URL of the image
});

export default mongoose.model("BoxModel", boxModelSchema);
