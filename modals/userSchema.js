import Mongoose  from "mongoose"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });


const userSchema = new Mongoose.Schema({ 
    To: {
        type: String,
        required: [true, "Bhai kisko send kar rha hai wo tho likh"],
      //  maxLength: [30, "Your name cannot exceed 30 characters"],
      //  minLength: [4, "Your name must be at least 4 characters long"], 

    },
    Email: {
        type: String,
        required: [true, "Please enter your email"],
       // validate: [validator.isEmail, "Please enter valid email address"],
    },
    Message: {
        type: String,
        required: [true, "Please enter your message"],
        //maxLength: [100, "Your message cannot exceed 100 characters"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    From: {
        type: String,
        required: [true, "Please enter your name"],
       // maxLength: [30, "Your name cannot exceed 30 characters"],
       // minLength: [4, "Your name must be at least 4 characters long"],
    },


});

export default Mongoose.model("Proposal", userSchema);
 