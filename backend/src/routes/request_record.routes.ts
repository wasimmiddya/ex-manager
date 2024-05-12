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
    getSingleBillForAdmin,
    getSingleUserBill,
    updateBillStatusByAdmin,
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

router
    .route("/user/single_bill/:id")
    .get(verifyJWT, isUserRequest, getSingleUserBill);

router
    .route("/admin/single_bill/:id")
    .get(verifyJWT, isAdminRequest, getSingleBillForAdmin);

router.route("/admin/update_status").put(verifyJWT, isAdminRequest, updateBillStatusByAdmin);

export default router;
