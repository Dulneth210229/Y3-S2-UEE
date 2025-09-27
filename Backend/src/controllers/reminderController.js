import Reminder from "../models/Reminder.js";

// Create new reminder
export const createReminder = async (req, res) => {
  try {
    const { userId, jobId, jobTitle, time, method } = req.body;

    if (!userId || !jobTitle || !time) {
      return res.status(400).json({ error: "userId, jobTitle and time are required" });
    }

    const reminder = new Reminder({
      userId,
      jobId,
      jobTitle,
      time,
      method,
    });

    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    console.error("❌ Create reminder error:", error.message);
    res.status(500).json({ error: "Failed to create reminder" });
  }
};

// Get reminders for a user
export const getUserReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.params.userId })
      .sort({ time: 1 }); // upcoming first
    res.json(reminders);
  } catch (error) {
    console.error("❌ Fetch reminders error:", error.message);
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
};

// Mark reminder as sent
export const markAsSent = async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      { status: "sent" },
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    res.json(reminder);
  } catch (error) {
    console.error("❌ Mark as sent error:", error.message);
    res.status(500).json({ error: "Failed to update reminder" });
  }
};
