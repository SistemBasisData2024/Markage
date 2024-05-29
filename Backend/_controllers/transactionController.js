const pool = require("./_pool.js");

// Get all transactions
const getAllTransactions = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM TRANSACTIONS');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM TRANSACTIONS WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new transaction
const addTransaction = async (req, res) => {
    const { customer, product_id, quantity, gross_price, discount, net_price } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO TRANSACTIONS (customer, product_id, quantity, gross_price, discount, net_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [customer, product_id, quantity, gross_price, discount, net_price]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    addTransaction,
};
