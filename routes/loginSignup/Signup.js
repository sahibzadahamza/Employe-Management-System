import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, email, phone, cnic, password, role } =
      req.body;

    // Check if the email and CNIC are already registered
    const existingUser = await User.findOne({ $or: [{ email }, { cnic }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or CNIC already exists" });
    }

    // Create a new user
    const user = new User({
      firstname,
      lastname,
      email,
      phone,
      cnic,
      role: role || "employee",
      password,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as Signup };
