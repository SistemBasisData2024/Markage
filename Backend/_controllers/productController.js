const pool = require("../connector");

const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM PRODUCTS ");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* // Get listed products
const getListedProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM PRODUCTS WHERE unlisted = false');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; */

// Get product by name or category
const getProductByKey = async (req, res) => {
  const { key } = req.query; // Mengambil parameter pencarian dari req.query

  if (!key) {
    return res.status(400).json({ error: "Search key is required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM PRODUCTS WHERE name ILIKE $1 OR category::text ILIKE $1",
      [`%${key}%`]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get product by category
//  const getProductBycategory = async (req, res) => {
//     const { category } = req.body;
//   try {
//         const result = await pool.query('SELECT * FROM PRODUCTS WHERE category ILIKE $1', [`%${category}%`]);
//         res.status(200).json(result.rows);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Get product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM PRODUCTS WHERE id = $1", [
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { name, price, stock, category } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO PRODUCTS (name, price, stock, category) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, price, stock, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, category } = req.body;
  try {
    const result = await pool.query(
      "UPDATE PRODUCTS SET name = $1, price = $2, stock = $3, category = $4 WHERE id = $5 RETURNING *",
      [name, price, stock, category, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM PRODUCTS WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* const relistProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('UPDATE PRODUCTS SET unlisted = false WHERE id = $1 RETURNING *', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  */

module.exports = {
  getAllProducts,
  //getListedProducts,
  getProductByKey,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  //unlistProduct,
  //relistProduct
};
