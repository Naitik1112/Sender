import nodemailer from "nodemailer";
import { convert } from "html-to-text"; // Corrected import

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { recipient, subject, message } = req.body;

  if (!recipient || !subject || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Generate the email content
    const emailHtml = generateEmailTemplate(subject, message);

    // Define mail options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: recipient,
      subject,
      html: emailHtml,
      text: convert(emailHtml), // Fixed usage
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send email." });
  }
}

// Function to generate email HTML
const generateEmailTemplate = (title, message) => `
  <div style="background-color: #2C2143; padding: 20px; font-family: Arial, sans-serif; color: white;">
    <h2 style="color: #A48EDB;">${title}</h2>
    <p style="font-size: 16px;">${message}</p>
    <br />
    <p>Best regards,</p>
    <p><strong>Naitik Shah</strong></p>
  </div>
`;
