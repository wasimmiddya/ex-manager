import { Router } from "express";

const router = Router()


// --------------controllers imported----------------
import { testApi } from "../controllers/test.conterollers";


// ------------open routes defined---------------
router.route("/api-test").get(testApi) // for testing the api 



export default router;