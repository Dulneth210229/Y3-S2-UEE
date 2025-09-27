import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { dropLegacyIndexes } from "./config/fixIndexes.js";

import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import educationRoutes from './routes/education.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import searchRoutes from './routes/search.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/search", searchRoutes);

app.get("/", (_, res) => res.send("Rural Jobs API running"));

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
    await dropLegacyIndexes();  // <-- run cleanup

});