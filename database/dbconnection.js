import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env " });

const dbConnection = async () => {
    console.log("MongoDB URI:", process.env.MONGO_URI);
    try {
        await mongoose.connect( "mongodb://localhost:27017", {
            dbName: "Valentine_day",
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
    }
};
export default dbConnection;
//shoffheow
