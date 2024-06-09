import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [selectedProducts, setSelectedProducts] = useState({}); // State to store selected products and quantities
  const [telephone, setTelephone] = useState(""); // State to store telephone number
  const [rewardsId, setRewardsId] = useState(""); // State to store rewards ID
  const [error, setError] = useState(""); // State to store error message
  const navigate = useNavigate(); // Using useNavigate for navigation

  // get products from the server
  useEffect(() => {
    getProducts();
  }, []);

  // Function to get products from the server
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product/");
      setProducts(response.data);
    } catch (error) {
      console.error("There was an error geting the products!", error);
      setError("Failed to get products. Please try again later.");
    }
  };

  // Function to handle quantity change for selected products
  const handleQuantityChange = (id, value) => {
    setSelectedProducts({
      ...selectedProducts,
      [id]: value,
    });
  };

  // Function to handle buy action
  const handleBuy = async () => {
    try {
      // Filter selected items with quantity greater than 0 and map them to the required format
      const selectedItems = Object.keys(selectedProducts)
        .filter((key) => selectedProducts[key] > 0)
        .map((key) => ({
          id: parseInt(key),
          quantity: selectedProducts[key],
        }));

      // Send a POST request to add the transaction
      await axios.post("http://localhost:3000/transaction", {
        telephone: telephone,
        products: selectedItems,
        rewards_id: rewardsId,
      });

      // Navigate to the transaction list page after successful purchase
      navigate('/transaction');
    } catch (error) {
      console.error("Error adding transaction:", error);
      setError("Failed to add transaction. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Add Transaction</h1>
      {/* Display error message if there is any */}
      {error && <div className="notification is-danger">{error}</div>}
      {/* Telephone input field */}
      <div className="field">
        <label className="label">Telephone:</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
      </div>
      {/* Rewards ID input field */}
      <div className="field">
        <label className="label">Rewards ID:</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={rewardsId}
            onChange={(e) => setRewardsId(e.target.value)}
          />
        </div>
      </div>
      {/* Table to display products */}
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through products and render rows */}
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              {/* Input field to select quantity */}
              <td>
                <input
                  className="input"
                  type="number"
                  min="0"
                  value={selectedProducts[product.id] || 0}
                  onChange={(e) =>
                    handleQuantityChange(product.id, parseInt(e.target.value))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Button to perform buy action */}
      <div className="control">
        <button className="button is-primary" onClick={handleBuy}>
          Buy
        </button>
      </div>
    </div>
  );
};

export default AddTransaction;
