import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createMapping,
  getMappings,
  getDoctorsByPatient,
  deleteMapping,
} from "../controllers/MappingController.js";

const router = express.Router();


router.post("/", protect, createMapping);
router.get("/", getMappings);
router.get("/:patient_id", getDoctorsByPatient);
router.delete("/:id", protect, deleteMapping);

export default router;
