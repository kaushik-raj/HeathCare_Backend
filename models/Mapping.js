import mongoose from "mongoose";

const MappingSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  mappingDate: { type: Date, required: true },
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" }
}, { timestamps: true });

const Mapping = mongoose.model("Mapping", MappingSchema);
export default Mapping;