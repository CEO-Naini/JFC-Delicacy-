require("dotenv").config(); // Load environment variables first
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const connectDB = require("./backend/config.js");
const productRoutes = require("./routes/productroutes.js");
const userRoutes = require("./routes/userroutes.js");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);

// M-Pesa Credentials (Ensure these are set in your .env file)
const consumerKey = process.env.MPESA_CONSUMER_KEY;
const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
const shortcode = process.env.MPESA_SHORTCODE;
const passkey = process.env.MPESA_PASSKEY;
const callbackUrl = "https://yourwebsite.com/callback";

// Function to get Access Token
const getAccessToken = async () => {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
    const response = await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        { headers: { Authorization: `Basic ${auth}` } }
    );
    return response.data.access_token;
};

// Handle STK Push
app.post("/stkpush", async (req, res) => {
    try {
        const { phone, amount } = req.body;
        const accessToken = await getAccessToken();
        
        // Generate timestamp and password
        const timestamp = new Date().toISOString().replace(/[-T:]/g, "").split(".")[0];
        const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

        // STK Push Request
        const stkResponse = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            {
                BusinessShortCode: shortcode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: amount,
                PartyA: phone,
                PartyB: shortcode,
                PhoneNumber: phone,
                CallBackURL: callbackUrl,
                AccountReference: "JFC Delicacy",
                TransactionDesc: "Order Payment"
            },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        res.json({ success: true, message: "STK Push Sent", data: stkResponse.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.response?.data || error.message });
    }
});
app.get("/", (req, res) => {
    res.send("Welcome to JFC Delicacy Backend API! 🚀");
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
