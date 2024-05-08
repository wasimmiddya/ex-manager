import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares";
import {
    registerUser,
    signInUser,
    signOutUser,
} from "../controllers/user.controllers";
import { verifyJWT } from "../middlewares/auth.middlewares";

const router = Router();

/* -----------------open routes defined--------------------- */
router.route("/register").post(upload.single("avater"), registerUser);
router.route("/signin").post(signInUser);

/* -------------------secure routes defined----------------- */
router.route("/signout").post(verifyJWT, signOutUser);


export default router;
