import mongoose from 'mongoose';
const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    instructor: String,
  });
  
  export default mongoose.model('Course', CourseSchema);