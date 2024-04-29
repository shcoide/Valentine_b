import User from "../modals/userSchema.js";
import { catchAsyncError } from "../Middleware/catchASyncError.js";
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

export const message = catchAsyncError(async (req, res, err, next) => {
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
        from:  from,
        to: email,
        subject: "A Heartfelt Confession: Your Admirer Has a Message for You",
        text: `   
        A Very Warm Valentine's Day,
        On this day of love and affection, ${from}  want to take a moment to express just how much you mean to them. Kindly Read their message
        Message: ${message}. .............
        Take a moment to see this beautiful message for you. https://gleaming-seahorse-86d78b.netlify.app/${to}`,
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

export const getAllPropasal = catchAsyncError(async (req, res, next) => {
    try {
        const allPurpose = await Proposal.countDocuments();
        // const Tops = await Proposal.find().sort({ createdAt: -1 }).limit(3);
        const tops = await Proposal.find({}, { from: 3 })
            .sort({ createdAt: -1 })
            .limit(3);
        console.log(tops);
        res.status(200).json({
            success: true,
            message: "All proposal",
            count: allPurpose,
            Proposal: tops.map((proposal) => proposal.from),
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});
