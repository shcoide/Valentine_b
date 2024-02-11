
import User from "../modals/userSchema.js";
import { catchASyncError } from "../Middleware/catchASyncError.js";


export const Purpose_by = catchASyncError(async (req, res, err ,next) => {
    const { To, Email, From,  Message } = req.body;

    if (!To || !Email || !From || !Message ) {
        // return next(new ErrorHandler("Please fill all fields", 400));
        return res.status(400).json({
            success: false,
            message: "Please fill all fields",
        });
    }
    const Purpose_by = await User.create({
        To,
        Email,
        From,
        Message,
    });
    res.status(201).json({
        success: true,
        message: "Your Proposal has been sent",
        Purpose_by,
    });
});
