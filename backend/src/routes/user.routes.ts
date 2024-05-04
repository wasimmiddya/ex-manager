import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares";
import { registerUser, signInUser } from "../controllers/user.controllers";

const router = Router();

// -----------------open routes defined---------------------
router.route("/register").post(upload.single("avater"), registerUser);
router.route("/signin").post(signInUser)

export default router;
