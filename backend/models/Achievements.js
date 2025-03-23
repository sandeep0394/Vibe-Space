import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  name: String,
  description: String,
  conditionType: String, // 'likes', 'comments', 'reach'
  thresholds: {
    beginner: Number,
    intermediate: Number,
    advanced: Number
  },
});

export default mongoose.model('Achievement', achievementSchema);