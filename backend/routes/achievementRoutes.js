import express from 'express';
import { checkAchievements, getUserAchievements, checkAndUnlockAchievements } from '../controllers/achievementController.js';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';

const router = express.Router();

router.post('/check', async (req, res) => {
    const { userId } = req.body;
    await checkAchievements(userId);
    res.json({ message: "Achievements checked." });
});

router.get('/:userId', getUserAchievements);

router.post('/like/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

        // Check achievements
        await checkAndUnlockAchievements(userId);

        res.json({ message: "Post liked and achievements checked." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/follow/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { followerId } = req.body;

        await User.findByIdAndUpdate(userId, { $push: { followers: followerId } });

        // Check achievements
        await checkAndUnlockAchievements(userId);

        res.json({ message: "User followed and achievements checked." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
