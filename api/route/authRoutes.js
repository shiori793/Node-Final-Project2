import express from "express";
import { registerController, loginController, logoutController } from "../controller/authController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get('/logout', logoutController);

export default router;