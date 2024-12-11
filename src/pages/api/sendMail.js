import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests are allowed" });
  }

  const { userEmail, bookingData } = req.body;

  // Configure the Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: "Gmail", // You can use other services or SMTP options
    auth: {
      user: process.env.SMTP_EMAIL, // Replace with your email
      pass: process.env.SMTP_PASSWORD, // Replace with your email password or app password
    },
  });

  // Prepare email content for the user
  const userMailOptions = {
    from: `"Hotel Booking" <${process.env.SMTP_EMAIL}>`,
    to: userEmail,
    subject: "Booking Confirmation",
    text: `Hi, your booking for the room "${bookingData.roomTitle}" has been confirmed. Total cost: ₹${bookingData.roomPrice}.`,
    html: `<p>Hi,</p>
           <p>Your booking for the room <b>${bookingData.roomTitle}</b> has been confirmed.</p>
           <p>Total cost: <b>₹${bookingData.roomPrice}</b>.</p>`,
  };

  // Prepare email content for the admin/domain email
  const adminMailOptions = {
    from: `"Hotel Booking" <${process.env.SMTP_EMAIL}>`,
    to: process.env.ADMIN_EMAIL, // Admin or domain email
    subject: "New Booking Notification",
    text: `A new booking has been made. Room: ${bookingData.roomTitle}. Total cost: ₹${bookingData.roomPrice}.`,
    html: `<p>A new booking has been made:</p>
           <ul>
             <li>Room: <b>${bookingData.roomTitle}</b></li>
             <li>Price: <b>₹${bookingData.roomPrice}</b></li>
           </ul>`,
  };

  try {
    // Send email to user
    await transporter.sendMail(userMailOptions);

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    return res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({ message: "Error sending emails", error });
  }
}
