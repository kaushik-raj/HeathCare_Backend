import Doctor from "../models/doctor.js";

// Add doctor (only authenticated user)
export const createDoctor = async (req, res) => {
  try {
    const { name, specialization, experience } = req.body;

    if (!name || !specialization) {
      return res.status(400).json({ message: "Name and specialization are required" });
    }
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const doctor = await Doctor.create({
      name,
      specialization,
      experience,
      createdBy: req.user._id, // store creator
    });

    return res.status(201).json(doctor);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all doctors (public)
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.json(doctors);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get doctor by ID (public)
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.json(doctor);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update doctor (only creator)
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // check ownership
    if (doctor.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this doctor" });
    }

    doctor.name = req.body.name || doctor.name;
    doctor.specialization = req.body.specialization || doctor.specialization;
    doctor.experience = req.body.experience !== undefined ? req.body.experience : doctor.experience;

    const updatedDoctor = await doctor.save();
    return res.json(updatedDoctor);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete doctor (only creator)
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // check ownership
    if (doctor.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this doctor" });
    }

    await doctor.deleteOne();
    return res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
