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
    const { telephone, products, discount, discount_cost } = req.body;
    //contoh isi products
    //[{
    //  id: 1,
    //  quantity: 2},
    // {id: 2,
    //  quantity: 3}]
    try {
    const gross_price = 0;
    const pointResult = 0;
    const productsResult = Promise.all(
        products.map(async (product) => {
        const productResult = await pool.query(
            "SELECT * FROM PRODUCTS WHERE id = $1",
            [product.id]
        );
        await pool.query(
            "UPDATE PRODUCTS SET stock = stock - $1 WHERE id = $2",
            [product.quantity, product.id]
        );
        await pool.query(
            "INSERT INTO TRANSACTION_PRODUCTS (transaction_id, product_id, quantity) VALUES ($1, $2, $3)",
            [result.rows[0].id, product.id, product.quantity]
        );
          gross_price += productResult.rows[0].price * product.quantity;
        return productResult.rows[0];
        })
    );
    const net_price = gross_price - (gross_price*discount/100);
        pointResult += (net_price / 50000 * 500);
        await pool.query(
            "UPDATE MEMBERSHIPS SET point = point + $1 - $2 where phone = $3",
            [pointResult, discount_cost, result.rows[0].telephone]
        );
    const result = await pool.query(
        "INSERT INTO TRANSACTIONS (telephone, gross_price, discount, net_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [telephone, gross_price, discount, net_price]
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
