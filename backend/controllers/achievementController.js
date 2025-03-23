
import UserAchievement from '../models/UserAchievement.js'

import Post from '../models/Post.js'
import User from '../models/User.js'



const getUserTier = (followers) => {
    if (followers >= 501) return "Advanced";
    if (followers >= 101) return "Intermediate";
    return "Beginner";
};

const checkAndUnlockAchievements = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) return;

        const userTier = getUserTier(user.followers.length);

        // Define different achievement thresholds based on tier
        const tierRequirements = {
            Beginner: { likes: 10, comments: 5 },
            Intermediate: { likes: 50, comments: 25 },
            Advanced: { likes: 200, comments: 100 },
        };

        const { likes, comments } = tierRequirements[userTier];

        // Count user's total likes & comments
        const totalLikes = await Post.aggregate([
            { $match: { userId } },
            { $group: { _id: null, likes: { $sum: "$likes" }, comments: { $sum: "$comments" } } }
        ]);

        const userStats = totalLikes[0] || { likes: 0, comments: 0 };

        // Check if the user meets achievement requirements
        if (userStats.likes >= likes && userStats.comments >= comments) {
            const existingAchievement = await UserAchievement.findOne({ userId, tier: userTier });

            if (!existingAchievement) {
                const newAchievement = new UserAchievement({
                    userId,
                    tier: userTier,
                    achievementName: `${userTier} Achiever 🏆`,
                });

                await newAchievement.save();
                console.log(`🎉 ${user.username} unlocked the ${userTier} Achiever badge!`);
            }
        }
    } catch (error) {
        console.error("Error in checkAndUnlockAchievements:", error);
    }
};

module.exports = { checkAndUnlockAchievements };
