const express = require("express");  // Import Express
const app = express();  // Initialize Express

// Middleware (to parse JSON request bodies)
app.use(express.json());

// Import routes
const productRoutes = require("./routes/products");

// Use the product routes
app.use("/api/products", productRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
