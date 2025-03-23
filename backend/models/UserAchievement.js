import mongoose from "mongoose";

const userAchievementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  achievementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' },
  unlockedAt: { type: Date, default: Date.now }
});

// Use `export default` instead of `module.exports`
export default mongoose.model('UserAchievement', userAchievementSchema);
