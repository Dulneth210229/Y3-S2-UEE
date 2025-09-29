import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;
