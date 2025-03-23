import express from 'express';
import {checkAchievements, getUserAchievements} from '../controllers/achievementController.js';
const router = express.Router();
router.post('/check', checkAchievements);
router.get('/:userId', getUserAchievements);
router.post('/like/:postId', async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;
  
    await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });
  
    // Check achievements
    checkAndUnlockAchievements(userId);
  
    res.json({ message: "Post liked and achievements checked." });
  });
  router.post('/follow/:userId', async (req, res) => {
    const { userId } = req.params;
    const { followerId } = req.body;
  
    await User.findByIdAndUpdate(userId, { $push: { followers: followerId } });
  
    // Check achievements
    checkAndUnlockAchievements(userId);
  
    res.json({ message: "User followed and achievements checked." });
  });
  
module.exports = router;
