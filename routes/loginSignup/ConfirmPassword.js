import express from "express";
// import jwt from "jsonwebtoken";
import User from "../../models/User.js";


const router = express.Router();

// confirm otp
router.post('/confirmOtp',async (req, resp) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return resp.status(500).send({
                success: false,
                message: 'Please provide both email and OTP'
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(404).send({
                success: false,
                message: 'Email does not exist'
            });
        }
        if (user.resetPasswordOTP !== parseInt(otp)) {
            return resp.status(400).send({
                success: false,
                message: 'Invalid OTP'
            });
        }
        user.resetPasswordOTP = null;
        await user.save();
        resp.status(200).send({
            success: true,
            message: "OTP Confirmed Successfully"
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error in confirmUserPasswordResetOTP API',
            error
        });
    }
});


export { router as ConfirmPassword };