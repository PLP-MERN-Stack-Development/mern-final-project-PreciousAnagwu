import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    severity: { type: String, required: true, enum: ["low", "medium", "high", "critical"], default: "low" },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    photos: [{ type: String, required: true }],
    status: { type: String, enum: ["pending", "verified", "resolved"], default: "pending" },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema);

export default Report;
