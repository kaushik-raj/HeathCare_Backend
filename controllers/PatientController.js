import Patient from "../models/patient.js";

// Add patient , only authenticated users can add patients
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
      createdBy: req.user._id,
    });

    return res.status(201).json(patient);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all patients , without authentication
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    return res.json(patients);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get patient by ID (public)
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    return res.json(patient);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update patient (only creator)
export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // check ownership
    // to chechk the only the user which created the patient can update it.
    if (patient.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this patient" });
    }

    patient.name = req.body.name || patient.name;
    patient.age = req.body.age !== undefined ? req.body.age : patient.age;
    patient.disease = req.body.disease || patient.disease;

    const updatedPatient = await patient.save();
    return res.json(updatedPatient);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete patient 
// only the user who created the patient will be able to delete it.
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // check ownership
    if (patient.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this patient" });
    }

    await patient.deleteOne();
    return res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
