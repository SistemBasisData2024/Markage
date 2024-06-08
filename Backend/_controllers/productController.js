const pool = require("./_pool.js");

const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM PRODUCTS ');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get listed products
const getListedProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM PRODUCTS WHERE unlisted = false');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get product by name or type
const getProductByKey = async (req, res) => {
    const { key } = req.query; // Mengambil parameter pencarian dari req.query
    try {
        const result = await pool.query('SELECT * FROM PRODUCTS WHERE unlisted = false AND (name ILIKE $1 OR type ILIKE $1)', [`%${key}%`]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Get product by type
//  const getProductByType = async (req, res) => {
//     const { type } = req.body;
//   try {
//         const result = await pool.query('SELECT * FROM PRODUCTS WHERE type ILIKE $1', [`%${type}%`]);
//         res.status(200).json(result.rows);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

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
    const { id } = req.params;
    const { name, price, stock, type } = req.body;
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
const unlistProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('UPDATE PRODUCTS SET unlisted = true WHERE id = $1 RETURNING *', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const relistProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('UPDATE PRODUCTS SET unlisted = false WHERE id = $1 RETURNING *', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getListedProducts,
    getProductByKey,
    getProductById,
    addProduct,
    updateProduct,
    unlistProduct,
    relistProduct
};