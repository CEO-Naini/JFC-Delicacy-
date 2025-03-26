const express = require('express');
const pool = require('../config/config');  // PostgreSQL connection
const router = express.Router();

router.post('/orders', async (req, res) => {
    const { user_id, product_id, quantity } = req.body;  // Include user_id
    
    console.log("Order received:", req.body);

    try {
        // Validate if user exists
        const userExists = await pool.query("SELECT id FROM users WHERE id = $1", [user_id]);
        if (userExists.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Get product price
        const product = await pool.query("SELECT price FROM products WHERE id = $1", [product_id]);
        if (product.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        const price = product.rows[0].price;
        const total_price = price * quantity;

        // Insert order with user_id
        const result = await pool.query(
            `INSERT INTO orders (user_id, product_id, quantity, total_price)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [user_id, product_id, quantity, total_price]
        );

        res.status(201).json({ message: "Order placed successfully", order: result.rows[0] });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




// 📌 Get all orders
router.get('/orders', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT orders.*, users.email, products.name AS product_name, products.price
            FROM orders
            JOIN users ON orders.user_id = users.id
            JOIN products ON orders.product_id = products.id
        `);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 📌 Get a single order by ID
router.get('/orders/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM orders WHERE order_id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 📌 Update order status
router.put('/orders/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    try {
        const result = await pool.query(
            "UPDATE orders SET status = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *",
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// 📌 Delete an order
router.delete('/orders/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await pool.query("DELETE FROM orders WHERE order_id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
