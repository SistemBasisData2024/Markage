const pool = require("./_pool.js");

// Get all rewards
const getAllRewards = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM REWARDS');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new reward
const addReward = async (req, res) => {
    const { name, point } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO REWARDS (name, point) VALUES ($1, $2) RETURNING *',
            [name, point]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing reward
const updateReward = async (req, res) => {
    const { id, name, point } = req.body;
    try {
        const result = await pool.query(
            'UPDATE REWARDS SET name = $1, point = $2 WHERE id = $3 RETURNING *',
            [name, point, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a reward
const deleteReward = async (req, res) => {
    const { id } = req.body;
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
