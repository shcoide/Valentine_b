// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import dbConnection from "./database/dbconnection.js";
// import useRouter from "./routes/userRoute.js";
// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// const PORT = process.env.PORT || 10000;
// const app = express();

// const router = express.Router();
// dotenv.config({ path: "./config/config.env " });
// import dotenv from "dotenv";
// import express from "express";
// import {
//     message, getAllPropasal
// } from "../controllers/userController.js";

// const router = express.Router();
// import Mongoose  from "mongoose"; 
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config({ path: "./config/config.env" });


// const userSchema = new Mongoose.Schema({ 
//     to: {
//         type: String,
//         required: [true, "Bhai kisko send kar rha hai wo tho likh"],
//       //  maxLength: [30, "Your name cannot exceed 30 characters"],
//     //    minLength: [3, "Your name must be at least 4 characters long"], 

//     },
//     email: {
//         type: String,
//         required: [true, "Please enter your email"],
//     //    validate: [validator.isEmail, "Please enter valid email address"],
//     },
//     message: {
//         type: String,
//         required: [true, "Please enter your message"],
//         // maxLength: [100, "Your message cannot exceed 100 characters"],
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
//     from: {
//         type: String,
//         required: [true, "Please enter your name"],
//        // maxLength: [30, "Your name cannot exceed 30 characters"],
//        // minLength: [4, "Your name must be at least 4 characters long"],
//     },
//     class ErrorHandler extends Error {
//       constructor(message, statusCode) {
//           super(message);
//           this.statusCode = statusCode;
//       }
//   }
//   // import createToast  from "../utils/tost";
//   export const errorMiddleware = (err, req, res, next) => {
//       console.error("Error Middleware:", err);
  
//       if (err.message.includes("Resource not found")) {
//           return res.status(400).json({
//               success: false,
//               message: `Resource not found. Invalid ${err.path}`,
//           });
//       }
  
//       if (err.code === 11000) {
//           return res.status(400).json({
//               success: false,
//               message: `Duplicate ${Object.keys(err.keyValue)} Entered`,
//           });
//       }
  
//       if (err.name === "JsonWebTokenError") {
//           return res.status(401).json({
//               success: false,
//               message: "Json Web Token is invalid, Try again!",
//           });
//       }
  
//       if (err.name === "TokenExpiredError") {
//           return res.status(401).json({
//               success: false,
//               message: "Json Web Token is expired, Try again!",
//           });
//       }
      
//       if (err.name === "ValidationError") {
//           const errors = {};
      
//           // Extract and organize validation errors
//           Object.keys(err.errors).forEach((key) => {
//             errors[key] = err.errors[key].message;
//           });
      
//           return res.status(400).json({
//             success: false,
//             message: "Validation Error",
//             errors,
//           });
//         }
//       err.message = err.message || "Internal Server Error";
//       err.statusCode = err.statusCode || 500;
//       // createToast(err.message, "error");
  
//       return res.status(err.statusCode).json({
//           success: false,
//           message: err.message,
//       });
//   };
//   import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config({ path: "./config/config.env " });

// const dbConnection = async () => {
//     console.log("MongoDB URI:", process.env.MONGO_URI);
//     try {
//         await mongoose.connect( process.env.MONGO_URI, {
//             dbName: "Valentine_day",
//         });
//         console.log("MongoDB connected");
//     } catch (err) {
//         console.error("MongoDB connection failed:", err);
//     }
// };
// import User from "../modals/userSchema.js";
// import { catchASyncError } from "../Middleware/catchASyncError.js";
// import nodemailer from "nodemailer";
// import Proposal from "../modals/userSchema.js";

// // Create nodemailer transporter
// // const transporter = nodemailer.createTransport({
// //     host: 'smtp.ethereal.email',
// //     port: 465,
// //     auth: {
// //         user: 'hilton.effertz50@ethereal.email',
// //         pass: 'wbu8ZU5UjEMpYyA2pu'
// //     }
// // })
// const transporter = nodemailer.createTransport({
//     host: "smtp.forwardemail.net",
//     port: 465,
//     secure: true,
//     service: "gmail",
//     auth: {
//         user: "shivamshibu2003@gmail.com",
//         pass: "xxeijsmpaezrggad",
//     },
// });

// export const message = catchASyncError(async (req, res, err, next) => {
//     const { to, email, from, message } = req.body;

//     if (!to || !email || !from || !message) {
//         return res.status(400).json({
//             success: false,
//             message: "Please fill all fields",
//         });
//     }
//     const newPurpose = await User.create({
//         to,
//         email,
//         from,
//         message,
//     });

//     const mailOptions = {
//         from:  from,
//         to: email,
//         subject: "A Heartfelt Confession: Your Admirer Has a Message for You",
//         text: `   
//         A Very Warm Valentine's Day,
//         On this day of love and affection, ${from}  want to take a moment to express just how much you mean to them. Kindly Read their message
//         Message: ${message}. .............
//         Take a moment to see this beautiful message for you. https://gleaming-seahorse-86d78b.netlify.app/${to}`,
//     };
//     console.log(mailOptions);

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log("Email sent:", info.response);
//         res.status(201).json({
//             success: true,
//             message: "Your message  has been sent",
//             Purpose_by: newPurpose,
//         });
//     } catch (error) {
//         console.error("Error sending email:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to send email",
//             error: error.message,
//         });
//     }
// });

// export const getAllPropasal = catchASyncError(async (req, res, next) => {
//     try {
//         const allPurpose = await Proposal.countDocuments();
//         // const Tops = await Proposal.find().sort({ createdAt: -1 }).limit(3);
//         const tops = await Proposal.find({}, { from: 3 })
//             .sort({ createdAt: -1 })
//             .limit(3);
//         console.log(tops);
//         res.status(200).json({
//             success: true,
//             message: "All proposal",
//             count: allPurpose,
//             Proposal: tops.map((proposal) => proposal.from),
//         });
//     } catch (error) {
//         next(error); // Pass the error to the error handling middleware
//     }
// });

// export default dbConnection;
// //shoffheow

//   export default ErrorHandler;
  

// });
// export const catchASyncError = (fun) => {
//   return (req, res, next) => {    
//       Promise.resolve(fun(req, res, next).catch(next));
//   };
// }
// export default Mongoose.model("Proposal", userSchema);
 
// router.post("/m", message);
// router.get("/all", getAllPropasal);

// export default router;

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });







// app.listen(process.env.PORT || "0.0.0.0", () => {
//     console.log("Server listening on port ",process.env.PORT);
// });
// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

// app.use(
//     cors({
//         origin: [process.env.FRONTEND_URL],
//         method: ["GET", "POST", "PUT", "DELETE"],
//         credentials: true,
//     })
// );
// console.log(process.env.FRONTEND_URL);

// app.options("*", cors());
// app.use(cookieParser());
 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.use("/api/v1/Proposal", useRouter);
// app.use("/api/v1/Proposal", useRouter);

// dbConnection();
// app.use('/.netlify/functions/api', router);
// module.exports.handler = serverless(app);

// export default app;
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import dbConnection from "./database/dbconnection.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// import User from "../modals/userSchema.js";
// import Proposal from "../modals/userSchema.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

// Middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.options("*", cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const router = express.Router();

// MongoDB Connection
const connectDB = async () => {
    console.log("MongoDB URI:", process.env.MONGO_URI);
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Valentine_day",
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
    }
};

// Nodemailer transporter
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

// Controllers
export const message = catchAsyncError(async (req, res, err, next) => {
    // ... (Your existing message controller code)
});

export const getAllProposal = catchAsyncError(async (req, res, next) => {
    // ... (Your existing getAllProposal controller code)
});

// Error Middleware
export const errorMiddleware = (err, req, res, next) => {
    // ... (Your existing errorMiddleware code)
};

// Utility function to catch async errors
export const catchAsyncError = (fun) => {
    return (req, res, next) => {
        Promise.resolve(fun(req, res, next).catch(next));
    };
};

// MongoDB Models
export const ProposalModel = mongoose.model("Proposal", userSchema);

// Routes
router.post("/m", message);
router.get("/all", getAllProposal);

// Main App
app.use("/api/v1/Proposal", router);
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Connect to MongoDB
connectDB();

// Export the app
export default app;
