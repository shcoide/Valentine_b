import User from "../modals/userSchema.js";
import { catchASyncError } from "../Middleware/catchASyncError.js";
import nodemailer from "nodemailer";
import Proposal from "../modals/userSchema.js";

// Create nodemailer transporter
// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 465,
//     auth: {
//         user: 'hilton.effertz50@ethereal.email',
//         pass: 'wbu8ZU5UjEMpYyA2pu'
//     }
// })
const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: "shivamshibu2003@gmail.com",
        pass: "xxeijsmpaezrggad",
    },
});

export const message = catchASyncError(async (req, res, err, next) => {
    const { to, email, from, message } = req.body;

    if (!to || !email || !from || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields",
        });
    }
    const newPurpose = await User.create({
        to,
        email,
        from,
        message,
    });

    const mailOptions = {
        from: "noreply@gmail.com",
        to: email,
        subject: "New message",
        text: `New message  from ${from}. Message: ${message}  http://localhost:3000/${from}  `,
    };
    console.log(mailOptions);

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        res.status(201).json({
            success: true,
            message: "Your message  has been sent",
            Purpose_by: newPurpose,
        });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send email",
            error: error.message,
        });
    }
});

export const getAllPropasal = catchASyncError(async (req, res, next) => {
    try {
        const allPurpose = await Proposal.countDocuments();
        // const Tops = await Proposal.find().sort({ createdAt: -1 }).limit(3);
        const tops = await Proposal.find({},{from: 3}).sort({ createdAt: -1 }).limit(3);
        console.log(tops);
        res.status(200).json({
            success: true,
            message: "All proposal",
            count: allPurpose,
            Proposal: tops.map(proposal => proposal.from),
            
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});
