const pool = require("./_pool.js");

// Get all memberships
const getAllMemberships = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM MEMBERSHIPS');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get membership by ID
const getMembershipById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM MEMBERSHIPS WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Get membership by telephone
const getMembershipByTelephone = async (req, res) => {
    const { telephone } = req.query;
    try {
        const result = await pool.query('SELECT * FROM MEMBERSHIPS WHERE telephone = $1', [telephone]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


// Add a new membership
const addMembership = async (req, res) => {
    const { name, point, telephone } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO MEMBERSHIPS (name, point, telephone) VALUES ($1, $2, $3) RETURNING *',
            [name, point, telephone]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing membership
const updateMembership = async (req, res) => {
    const { id } = req.params;
    const { name, point, telephone } = req.body;
    try {
        const result = await pool.query(
            'UPDATE MEMBERSHIPS SET name = $1, point = $2, telephone = $3 WHERE id = $4 RETURNING *',
            [name, point, telephone, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a membership
const deleteMembership = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await pool.query('DELETE FROM MEMBERSHIPS WHERE id = $1 RETURNING *', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMemberships,
    getMembershipById,
    getMembershipByTelephone,
    addMembership,
    updateMembership,
    deleteMembership,
};
