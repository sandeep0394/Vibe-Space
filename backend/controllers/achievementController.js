import Achievement from '../models/Achievements.js';
import UserAchievement from '../models/UserAchievement.js';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';

// Function to check achievements
export const checkAchievements = async (userId) => {
    try {
        console.log("Checking achievements for user:", userId);
    } catch (error) {
        console.error("Error in checkAchievements:", error);
    }
};

// Function to get user achievements
export const getUserAchievements = async (req, res) => {
    try {
        const { userId } = req.params;
        const achievements = await UserAchievement.find({ userId });
        res.json(achievements);
    } catch (error) {
        console.error("Error fetching user achievements:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Function to check and unlock achievements
export const checkAndUnlockAchievements = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) return;

        const userTier = getUserTier(user.followers.length);
        const tierRequirements = {
            Beginner: { likes: 10, comments: 5 },
            Intermediate: { likes: 50, comments: 25 },
            Advanced: { likes: 200, comments: 100 },
        };

        const { likes, comments } = tierRequirements[userTier];

        const totalStats = await Post.aggregate([
            { $match: { userId: user._id } },
            { $group: { _id: null, likes: { $sum: "$likes" }, comments: { $sum: "$comments" } } }
        ]);

        const userStats = totalStats[0] || { likes: 0, comments: 0 };

        if (userStats.likes >= likes && userStats.comments >= comments) {
            const existingAchievement = await UserAchievement.findOne({ userId, tier: userTier });

            if (!existingAchievement) {
                const achievement = await Achievement.findOne({ tier: userTier });
                const achievementName = achievement ? achievement.name : `${userTier} Achiever 🏆`;

                const newAchievement = new UserAchievement({
                    userId,
                    tier: userTier,
                    achievementName: achievementName,
                });

                await newAchievement.save();
                console.log(`🎉 ${user.username} unlocked the ${achievementName} badge!`);
            }
        }
    } catch (error) {
        console.error("Error in checkAndUnlockAchievements:", error);
    }
};

