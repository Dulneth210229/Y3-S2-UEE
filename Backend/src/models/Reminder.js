import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" }, // 🔗 link to jobs
  jobTitle: { type: String, required: true },
  time: { type: Date, required: true },
  method: { type: String, enum: ["app", "sms"], default: "app" },
  status: { type: String, enum: ["pending", "sent"], default: "pending" },
});

export default mongoose.model("Reminder", reminderSchema);
