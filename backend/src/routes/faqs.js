// src/routes/faqs.js
import express from "express";
import Faq from "../models/faq.js";

const router = express.Router();

// POST /api/faqs
router.post("/", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ message: "Question is required" });

    // Save user question
    const faq = await Faq.create({ question, sender: "user" });

    res.status(201).json({ message: "Question submitted", faq });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/faqs (optional: get all questions)
router.get("/", async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
