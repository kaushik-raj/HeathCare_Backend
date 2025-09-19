import express from "express";
import { registerUser, loginUser } from "../controllers/AuthController.js";

const router = express.Router();

// Routes for auth of the user. 
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
