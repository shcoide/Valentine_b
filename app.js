import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./database/dbconnection.js";
import useRouter from "./routes/userRoute.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 10000;
const app = express();
dotenv.config({ path: "./config/config.env " });

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        method: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
console.log(process.env.FRONTEND_URL);

app.options("*", cors());
app.use(cookieParser());
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/Proposal", useRouter);
app.use("/api/v1/Proposal", useRouter);


dbConnection();


export default app;
