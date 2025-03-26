const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require('../config/config');
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const router = express.Router();

router.post("/signup", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log("backend", req.body)

    try {
        // Check if email already exists
        const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword]);

        res.status(201).json({ message: "Registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("backend", req.body);

    try {
        // Find user by email
        const userResult = await pool.query("SELECT id, email, password FROM users WHERE email = $1", [email]);

        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = userResult.rows[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Return user_id in response
        res.status(200).json({ message: "Logged in successfully", user_id: user.id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router;
