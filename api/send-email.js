/* eslint-disable no-undef */
import "dotenv/config";
import nodemailer from "nodemailer";

export default async function (req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            status: 405,
            error: {
                message: "Method not allowed"
            }
        })
    }

    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const message = req.body.message?.trim();

    if (!name || !email || !message) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "All fields are required"
        });
    }

    if (name.length > 50) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "Name must be below 50 characters"
        })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "Invalid Email ID"
        });
    }

    if (message.length > 2000) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "Message must be below 2000 characters"
        })
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        subject: `New Contact Form Submission from ${name}`,
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #4CAF50;">New Message from Portfolio</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
            <hr />
            <p style="font-size: 0.9em; color: #777;">This message was sent from your portfolio contact form.</p>
        </div>
        `,
    }

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            status: 200,
            success: true,
            message: "Email sent successfully!"
        });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({
            success: false,
            status: 500,
            error: {
                message: "Email sending failed",
            }
        });
    }
}