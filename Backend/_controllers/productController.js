const pool = require("./_pool.js");

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM PRODUCTS');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get product by name
const getProductByName = async (req, res) => {
    const { name } = req.body;
    try {
        const result = await pool.query('SELECT * FROM PRODUCTS WHERE name = $1', [name]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get product by type
const getProductByType = async (req, res) => {
    const { type } = req.query;
    try {
        const result = await pool.query('SELECT * FROM PRODUCTS WHERE type = $1', [type]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM PRODUCTS WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new product
const addProduct = async (req, res) => {
    const { name, price, stock, type } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO PRODUCTS (name, price, stock, type) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, stock, type]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing product
const updateProduct = async (req, res) => {
    const { id, name, price, stock, type } = req.body;
    try {
        const result = await pool.query(
            'UPDATE PRODUCTS SET name = $1, price = $2, stock = $3, type = $4 WHERE id = $5 RETURNING *',
            [name, price, stock, type, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM PRODUCTS WHERE id = $1 RETURNING *', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductByName,
    getProductByType,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};