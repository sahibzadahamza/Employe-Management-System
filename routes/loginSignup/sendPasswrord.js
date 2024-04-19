import express from "express";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const router = express.Router();

router.post('/confirmotp',async (req, resp) => {
    try {
        const { email } = req.body;
        if (!email) {
            return resp.status(500).send({
                success: false,
                message: 'Please provide an email'
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(404).send({
                success: false,
                message: 'Email does not exist'
            });
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        user.resetPasswordOTP = otp;
        await user.save();
        let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Reservation - Password Reset OTP",
            text: `Hi ${user.fullName}, Your OTP for password reset is: ${otp}`
        });
        resp.status(200).send({
            success: true,
            message: "Password Reset OTP Sent. Please Check Your Email",
            otp
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error in sendUserPasswordResetOTP API',
            error
        });
    }
});

export { router as sendPassword };