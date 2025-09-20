import Mapping from "../models/Mapping.js";

// Assign doctor to patient
export const createMapping = async (req, res) => {
  try {
    const { patient, doctor, mappingDate, status } = req.body;

    if (!patient || !doctor || !mappingDate) {
      return res.status(400).json({ message: "patient, doctor, and mappingDate are required" });
    }

    const mapping = await Mapping.create({
      patient,
      doctor,
      mappingDate,
      status: status || "scheduled",
      createdBy: req.user._id,   
    });

    return res.status(201).json(mapping);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all mappings (with populated details)
export const getMappings = async (req, res) => {
  try {
    const mappings = await Mapping.find()
      .populate("patient")
      .populate("doctor")
      .populate("createdBy", "name email"); 

    return res.json(mappings);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all doctors assigned to a specific patient
export const getDoctorsByPatient = async (req, res) => {
  try {
    const { patient_id } = req.params;

    const mappings = await Mapping.find({ patient: patient_id })
      .populate("doctor")
      .populate("createdBy", "name email");

    return res.json(mappings);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete a mapping (only creator can delete)
export const deleteMapping = async (req, res) => {
  try {
    const { id } = req.params;

    const mapping = await Mapping.findById(id);
    if (!mapping) {
      return res.status(404).json({ message: "Mapping not found" });
    }

    if (mapping.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this mapping" });
    }

    await mapping.deleteOne();
    return res.json({ message: "Mapping deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
