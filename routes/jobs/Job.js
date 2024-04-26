import express from "express";
import Job from "../../models/Job.js";
import User from "../../models/User.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();

// Protected route - only accessible to authenticated users
router.post("/addJobs", auth, async (req, res) => {
  try {
    // Check if the user is an employer
    const user = await User.findOne({ email: req.userEmail });

    const { title, description, requirements, salary, jobType } = req.body;

    // Create a new job
    const job = new Job({
      title,
      description,
      requirements,
      createdBy: user._id,
      salary,
      jobType,
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as Job };
