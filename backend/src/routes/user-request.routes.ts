import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/multer.middlewares";

const router = Router();

/* ---------------Controllers imported--------------- */
import { createUserRequests, getAllUserRequests } from "../controllers/user-servie.controllers";

/* ---------------Routes defined--------------- */
router.route("/create").post(verifyJWT, upload.fields(
    [
        {
            name: "receiptFiles",
            maxCount: 5
        }
    ]
), createUserRequests);

router.route("/get_all_requests").get(verifyJWT, getAllUserRequests);


export default router;