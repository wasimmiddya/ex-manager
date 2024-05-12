import { Router } from "express";
import {
    isAdminRequest,
    isUserRequest,
    verifyJWT,
} from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/multer.middlewares";

const router = Router();

/* ---------------Controllers imported--------------- */
import {
    createRembursementBillForUser,
    getRembursementBillForAdmin,
    getRembursementBillForUser,
    getSingleUserBill,
} from "../controllers/rembursementBill.controllers";

/* ---------------Routes defined--------------- */
router.route("/create").post(
    verifyJWT,
    isUserRequest,
    upload.fields([
        {
            name: "receiptFiles",
            maxCount: 5,
        },
    ]),
    createRembursementBillForUser
);

router
    .route("/get_user_bills")
    .get(verifyJWT, isUserRequest, getRembursementBillForUser);

router
    .route("/get_admin_bills")
    .get(verifyJWT, isAdminRequest, getRembursementBillForAdmin);

router.route("/user/signle_bill/:id").get(verifyJWT, isUserRequest, getSingleUserBill)

export default router;
