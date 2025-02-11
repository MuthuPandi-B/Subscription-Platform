import mongoose from 'mongoose';
const SubscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    status: { type: String, default: 'active' },
  });
  
  export default mongoose.model('Subscription', SubscriptionSchema);