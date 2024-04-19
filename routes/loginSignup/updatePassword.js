import express from "express";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";
const router = express.Router();

router.post('/confirmotp',async (req, resp) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return resp.status(400).send({
                success: false,
                message: 'Please provide email and new password'
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return resp.status(404).send({
                success: false,
                message: 'Email does not exist'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(newPassword, salt);
        user.password = newHashPassword;
        await user.save();
        resp.status(200).send({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: 'Error in updateUserPassword API',
            error
        });
    }
});

export { router as updatePassword };