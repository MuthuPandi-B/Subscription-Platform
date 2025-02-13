import mongoose from "mongoose";

const homeContentSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
  imageUrl: { type: String, required: true }, // URL for the image
});

export default mongoose.model("HomeContent", homeContentSchema);
