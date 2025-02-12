import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

// Email service function
export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service (Gmail in this example)
      auth: {
        user: process.env.PASS_MAIL, // Your email address
        pass: process.env.PASS_KEY, // Your email password or app-specific password
      },
    });

    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;
