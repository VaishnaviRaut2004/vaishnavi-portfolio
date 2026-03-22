import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "vraut2004@gmail.com",
      to: "vraut2004@gmail.com",
      subject: `Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send email" });
  }
}
