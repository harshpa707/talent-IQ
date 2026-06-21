import nodemailer from "nodemailer";

export const sendEmail = async (name, email, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "ms9798969@gmail.com",
    subject: "New Message from Harsh",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  });
};
