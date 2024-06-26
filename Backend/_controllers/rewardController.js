const pool = require("../connector");

// Get all rewards
const getAllRewards = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM REWARDS ORDER BY point ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new reward
const addReward = async (req, res) => {
    const { discount, point } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO REWARDS (discount, point) VALUES ($1, $2) RETURNING *',
            [discount, point]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing reward
const updateReward = async (req, res) => {
    const { id } = req.params;
    const { discount, point } = req.body;
    try {
        const result = await pool.query(
            'UPDATE REWARDS SET discount = $1, point = $2 WHERE id = $3 RETURNING *',
            [discount, point, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a reward
const deleteReward = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM REWARDS WHERE id = $1 RETURNING *', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllRewards,
    addReward,
    updateReward,
    deleteReward,
};
