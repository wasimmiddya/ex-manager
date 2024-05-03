import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares";
import { registerUser } from "../controllers/user.controllers";

const router = Router();

// -----------------open routes defined---------------------
router.route("/register").post(upload.single("avater"), registerUser);

export default router;
