import express from "express";
 import { sendEmail } from "../services/emailService.js";
import User from "../models/Users.js";

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = await User.create({
      name,
      email,
      message,
    });
    console.log("new contact", newContact);
     await sendEmail(name, email, message);

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
