import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: {type:String,required: true},
  role: { type: String, default: 'student', enum: ['student', 'admin'] },
  paidCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now },
});


export default mongoose.model('User', UserSchema);