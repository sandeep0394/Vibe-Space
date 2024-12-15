import express from "express";
import {protectRoute} from"../middleware/protectRoute.js";
import { getUserprofile, followUnfollowUser, getSuggestedUsers, updateUser } from '../controllers/user.js';


const router = express.Router();

router.get("/profile/:username", protectRoute, getUserprofile);
router.get("/suggested",protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.get("/update",protectRoute,updateUser)

export default router;