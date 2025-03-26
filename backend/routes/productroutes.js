const express = require("express");
const pool = require("../config/config"); // PostgreSQL connection
const router = express.Router();

// 📌 Get all products
router.get("/products", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 📌 Get a single product by ID
router.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 📌 Create a new product
router.post("/products", async (req, res) => {
    const { name, image, price } = req.body;
    
    if (!name || !image || !price) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const result = await pool.query(
            `INSERT INTO products (name, image, price)
             VALUES ($1, $2, $3) RETURNING *`,
            [name, image, price]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 📌 Update a product
router.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const { name, image, price } = req.body;

    try {
        const result = await pool.query(
            `UPDATE products 
             SET name = $1, image = $2, price = $3, updated_at = NOW() 
             WHERE id = $4 RETURNING *`,
            [name, image, price, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 📌 Delete a product
router.delete("/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
