const express = require('express');
const cors = require('cors');
const http = require('http');
const pool = require('../backend/config/config'); 
require('dotenv').config();
const authRoutes = require("./routes/userroutes");

const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productroutes");
const port = process.env.PORT || 4000;

const app = express();
app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const server = http.createServer(app);
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", orderRoutes); 
app.use("/api", productRoutes); 


// ✅ Explicitly check database connection before starting server
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error("❌ Error connecting to the database:", err);
    } else {
        console.log("✅ Database is reachable! Current time:", res.rows[0].now);
    }
});

server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
