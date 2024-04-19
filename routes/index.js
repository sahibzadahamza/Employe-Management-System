// routes/index.js

import { Router } from "express";
import { getEmployees } from "./employee/getEmployees.js";
import { createEmployee } from "./employee/createEmployee.js";
import { deleteEmployee } from "./employee/deleteEmployee.js";
import { getEmployeeById } from "./employee/getEmployeeById.js";
import { searchEmployee } from "./employee/searchEmployee.js";
import { updateEmployee } from "./employee/updateEmployee.js";
import { Signup } from "./loginSignup/Signup.js";
import { Login } from "./loginSignup/Login.js";
import { Job } from "./jobs/Job.js";
import { deleteJob } from "./jobs/deleteJob.js";
import { updateJob } from "./jobs/updateJob.js";
import { showJob } from "./jobs/showJob.js";
import auth from "../middlewares/auth.js";
import { confirmPassword } from "./loginSignup/ConfirmPassword.js";
import { sendPassword } from "./loginSignup/sendPasswrord.js";
import { updatePassword } from "./loginSignup/updatePassword.js";


const router = Router();

// Employee routes
router.get("/employees",auth, getEmployees);
router.post("/employee",  createEmployee);
router.delete("/employees/:id", auth, deleteEmployee);
router.get("/employees/:id", auth, getEmployeeById);
router.get("/employees/search", auth, searchEmployee);
router.put("/employees/:id", auth, updateEmployee);

// Login and signup routes
router.post("/signup", Signup);
router.post("/login", Login);

// Job routes
router.post("/addJobs", auth, Job);
router.delete("/jobs/:id", auth, deleteJob);
router.put("/jobs/:id", auth, updateJob);
router.get("/jobs", showJob);
router.get("/jobs/:id", showJob);
router.post('/confirmOtp', confirmPassword);

// Route for updating user password
router.post('/resetPassword', updatePassword );
router.post('/sendOtp', sendPassword);

export default router;
