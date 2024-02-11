import express from "express";
import {
    Purpose_by
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", Purpose_by);

export default router;
