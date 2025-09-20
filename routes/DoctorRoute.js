import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from "../controllers/DoctorController.js";

const router = express.Router();

// Create doctor (only logged-in users)
router.post("/", protect, createDoctor);

// Get all doctors (public)
router.get("/", getDoctors);

// Get single doctor by id (public)
router.get("/:id", getDoctorById);

// Update doctor (only authenticated users)
router.put("/:id", protect, updateDoctor);

// Delete doctor (only authenticated users)
router.delete("/:id", protect, deleteDoctor);

export default router;
