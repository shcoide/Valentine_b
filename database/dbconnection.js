import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env "});

const dbConnection = async () => {
    console.log("MongoDB URI:", process.env.MONGO_URI);
    try {
        await mongoose.connect( "mongodb+srv://nishuk7898:yXcKE0VskKbCG5Ce@cluster0.omovvsi.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true }, {
            
            dbName: "Valentine_day Special",
            
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
    }

};
export default dbConnection;