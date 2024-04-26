import Job from "../../models/Job.js";
import JobApplication from "../../models/JobApplication.js";
import express from "express";
import multer from "multer";

const router = express.Router();

// Multer configuration for file upload
const upload = multer({ dest: "uploads/" }); // Destination folder for storing uploaded files

// Apply for a job with resume upload
router.post("/apply/:id", upload.single("resume"), async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    // Check if the resume file is missing
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is missing" });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Create a new job application with resume file path
    const newApplication = new JobApplication({
      jobId: id,
      jobTitle: job.title,
      name,
      email,
      resume: req.file.path,
    });

    // Save the job application
    await newApplication.save();

    res.status(201).json({ message: "Job application submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as ApplyJob };
