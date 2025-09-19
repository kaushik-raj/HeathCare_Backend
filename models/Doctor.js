import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, default: 0 }
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
