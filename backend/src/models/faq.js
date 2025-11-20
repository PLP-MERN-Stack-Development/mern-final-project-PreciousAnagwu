import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true }, // user question or bot response
    sender: { type: String, enum: ["user", "bot"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Faq", faqSchema );
