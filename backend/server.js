import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import faqRoutes from './src/routes/faqs.js';
import authRoutes from "./src/routes/auth.js";
import * as Sentry from "@sentry/node";
const app = express(); //app must be declared first before app.use




// Middleware
app.use(cors());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));

app.use(express.json()); //Parse JSON
app.use("/api/faqs", faqRoutes); //should be used only after app has been defined
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error(err));

// Schema for reports
const reportSchema = new mongoose.Schema({
  title: String,
  description: String,
  latitude: Number,
  longitude: Number,
  date: { type: Date, default: Date.now },
});

const Report = mongoose.model("Report", reportSchema);

// Routes
app.post("/api/reports", async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save report" });
  }
});

app.get("/api/reports", async (req, res) => {
  try {
    const reports = await Report.find().sort({ date: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});


const PORT = process.env.PORT || 5000;
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
