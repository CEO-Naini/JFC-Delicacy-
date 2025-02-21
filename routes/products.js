const express = require("express");
const router = express.Router();

// Sample product data (this will later come from the database)
const products = [
    { id: 1, name: "Chocolate Cake", price: 10 },
    { id: 2, name: "Vanilla Cookies", price: 5 }
];

// Get all products
router.get("/", (req, res) => {
    res.json(products);
});

module.exports = router;
