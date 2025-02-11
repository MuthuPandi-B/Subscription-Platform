import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'student', enum: ['student', 'admin'] },
});

export default mongoose.model('User', UserSchema);