import express from "express";
import { getMe,  login, logout, signup } from "../controllers/auth.controller.js ";
import { protectRoute } from "../middleware/protectRoute.js";
import { followUnfollowUser } from "../controllers/user.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/follow", followUnfollowUser);

export default router;