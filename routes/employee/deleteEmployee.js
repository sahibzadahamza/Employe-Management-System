import express from "express";
import { Employees } from "../../models/Employees.js";
import auth from "../../middlewares/auth.js"; // Import your auth middleware

const router = express.Router();

// This route expects the ID to be passed in the URL
router.delete("/employee/:id", auth, async (req, res) => {
  try {
    const employee = await Employees.findByIdAndDelete({ _id: req.params.id });
    if (!employee) {
      return res.status(404).send("Employee not found!");
    }
    res.send("Employee deleted!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error"); // Handle server errors gracefully
  }
});

export { router as deleteEmployee };