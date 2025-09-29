import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { EDUCATION_LEVELS } from "../utils/levels.js";

const educationSub = new mongoose.Schema(
  {
    level: { type: String, enum: EDUCATION_LEVELS, required: true },
    field: String,
    institution: String,
    year: Number,
    certificateUrl: String,
    verified: { type: Boolean, default: false },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["job_seeker", "employer", "admin"],
      required: true,
    },
    name: { type: String, required: true },
    phone: String,
    email: { type: String, unique: true, sparse: true },
    passwordHash: String,

    location: String,
    bio: String,
    skills: [String],
    profilePublic: { type: Boolean, default: true },

    educationLevel: { type: String, enum: EDUCATION_LEVELS, default: "none" },
    eduRank: { type: Number, default: 0 },
    educations: [educationSub],

    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "SkillBadge" }],
    trustScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function (plain) {
  this.passwordHash = await bcrypt.hash(plain, 10);
};
userSchema.methods.checkPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash || "");
};

userSchema.index({ role: 1, eduRank: 1, trustScore: -1 });
userSchema.index({ skills: 1 });

const User = mongoose.model("User", userSchema);
export default User;
