const pool = require("../connector");

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
    const { telephone, products, rewards_id } = req.body;
    
    try {
        let gross_price = 0;
        let pointGain = 0;
        let discount = 0;
        let point = 0;

        // Insert the new transaction
        let { rows: result } = await pool.query(
            "INSERT INTO TRANSACTIONS (telephone) VALUES ($1) RETURNING *",
            [telephone]
        );

        // Check if customer has a membership
        const { rows: membership } = await pool.query(
            "SELECT * FROM MEMBERSHIPS WHERE telephone = $1",
            [telephone]
        );

        if (membership.length > 0) {
            // Retrieve reward details if membership exists
            const { rows: reward } = await pool.query(
                "SELECT * FROM REWARDS WHERE id = $1",
                [rewards_id]
            );
            discount = reward[0].discount;
            point = reward[0].point;
        }

        // Process each product
        await Promise.all(
            products.map(async (product) => {
                const productResult = await pool.query(
                    "SELECT * FROM PRODUCTS WHERE id = $1",
                    [product.id]
                );
                await pool.query(
                    "UPDATE PRODUCTS SET stock = stock - $1 WHERE id = $2 RETURNING *",
                    [product.quantity, product.id]
                );
                await pool.query(
                    "INSERT INTO PRODUCT_TRANSACTIONS (transaction_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
                    [result[0].id, product.id, product.quantity]
                );

                gross_price += productResult.rows[0].price * product.quantity;
                return productResult.rows[0];
            })
        );

        const net_price = gross_price - (gross_price * discount / 100);
        pointGain += (net_price / 1000);

        // Update membership points if membership exists
        if (membership.length > 0) {
            await pool.query(
                "UPDATE MEMBERSHIPS SET point = point + $1 - $2 WHERE telephone = $3",
                [pointGain, point, telephone]
            );
        }

        // Update the transaction with the calculated prices
        const { rows: updatedTransaction } = await pool.query(
            "UPDATE TRANSACTIONS SET gross_price = $1, discount = $2, net_price = $3 WHERE id = $4 RETURNING *",
            [gross_price, discount, net_price, result[0].id]
        );

        res.status(201).json(updatedTransaction[0]);
    } catch (error) {
        console.error('Query error:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    addTransaction,
};
