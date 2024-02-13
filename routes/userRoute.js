import express from "express";
import {
    message, getAllPropasal
} from "../controllers/userController.js";

const router = express.Router();

router.post("/m", message);
router.get("/all", getAllPropasal);

export default router;
