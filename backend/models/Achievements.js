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

module.exports = mongoose.model('Achievement', achievementSchema);