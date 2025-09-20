import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/AuthRoute.js";
import patientRoutes from "./routes/PatientRoute.js";
import doctorRoutes from "./routes/DoctorRoute.js";
import mappingRoutes from "./routes/MappingRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/mapping", mappingRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
