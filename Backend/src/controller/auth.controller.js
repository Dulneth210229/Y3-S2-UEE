import jwt from "jsonwebtoken";
import User from "../model/User.js";

export async function signup(req, res) {
  try {
    const { role, name, email, phone, password } = req.body;
    const u = new User({ role, name, email, phone });
    await u.setPassword(password);
    await u.save();
    res.status(201).json({ id: u._id, role: u.role, name: u.name });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u || !(await u.checkPassword(password))) {
    return res.status(401).json({ message: "Bad credentials" });
  }
  const token = jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token });
}

export async function me(req, res) {
  const data = await User.findById(req.user.id).populate("badges");
  res.json(data);
}
