import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/multer.middlewares";

const router = Router();

/* ---------------Controllers imported--------------- */
import { createUserRequests } from "../controllers/user-request.controllers";

/* ---------------Routes defined--------------- */
router.route("/user-request").post(verifyJWT, upload.fields(
    [
        {
            name: "receiptFiles",
            maxCount: 5
        }
    ]
), createUserRequests);


export default router;