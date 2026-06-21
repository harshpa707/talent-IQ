import express from "express";
import { sendEmail } from "../services/emailService.js";

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
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
