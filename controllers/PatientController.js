import Patient from "../models/patient.js";

// add patient , only authenticated users can add patients
export const createPatient = async (req, res) => {
  try {
    const { name, age, disease } = req.body;

    if (!name || age === undefined || !disease) {
      return res.status(400).json({ message: "name, age, and disease are required" });
    }
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const patient = await Patient.create({
      name,
      age,
      disease,
      createdBy: req.user._id
    });

    return res.status(201).json(patient);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// retrieve all patients created by the authenticated user
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().lean();
    return res.status(200).json(patients);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/patients/:id
 * Get details of a specific patient
 */
export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id).lean();
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    return res.status(200).json(patient);
  } catch (err) {
    // Handles invalid ObjectId and other errors
    return res.status(400).json({ message: "Invalid patient id" });
  }
};

/**
 * PUT /api/patients/:id
 * Update patient details (partial updates allowed)
 * Body: any subset of { name, age, disease }
 */
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;

    // Only allow these fields to be updated
    const allowed = ["name", "age", "disease"];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => allowed.includes(k))
    );

    const patient = await Patient.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    return res.status(200).json(patient);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

/**
 * DELETE /api/patients/:id
 * Delete a patient record
 */
export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Patient.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Patient not found" });
    }
    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    return res.status(400).json({ message: "Invalid patient id" });
  }
};
