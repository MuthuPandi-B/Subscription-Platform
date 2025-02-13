import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Reference to the Course
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true }, // URL for the uploaded video
});

export default mongoose.model("Video", videoSchema);
