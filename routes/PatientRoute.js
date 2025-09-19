import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/PatientController.js";

const router = express.Router();

// Create patient (only logged-in users)
router.post("/", protect, createPatient);

// Get all patients (public)
router.get("/", getPatients);

// Get single patient by id (public)
router.get("/:id", getPatientById);

// Update patient (only creator)
router.put("/:id", protect, updatePatient);

// Delete patient (only creator)
router.delete("/:id", protect, deletePatient);

export default router;
 