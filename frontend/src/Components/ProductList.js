import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product/all");
      setProducts(response.data);
    } catch (error) {
      console.error("There was an error fetching the products!", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product/search", {
        params: { key: searchKey },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("There was an error searching the products!", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/product/${id}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: value,
    });
  };

  const handleBuy = (id) => {
    console.log("AAA");
    // Here, you would implement the logic to handle the buying action, e.g., sending a request to the server.
  };

  return (
    <div>
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <h1 className="title has-text-white">Markage</h1>
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <Link className="navbar-item" to="/">
              Home
            </Link>
            <Link className="navbar-item" to="/transactions">
              Transactions
            </Link>
            <Link className="navbar-item" to="/reward">
              Rewards
            </Link>
            <Link className="navbar-item" to="/membership">
              Memberships
            </Link>
          </div>
        </div>
      </nav>

      <section className="section">
        <div className="container">
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Search by name or type"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
            <div className="control">
              <button className="button is-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          <Link to="/product/add" className="button is-success">
            Add Product
          </Link>
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Type</th>
                <th>Actions</th>
                <th>Buy</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.type}</td>
                  <td>
                    <Link
                      to={`/product/${product.id}`}
                      className="button is-small is-info"
                      style={{ marginRight: "0.5rem" }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <div className="field has-addons">
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          min="0"
                          placeholder="Qty"
                          value={quantities[product.id] || 0}
                          onChange={(e) =>
                            handleQuantityChange(
                              product.id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div className="control">
                        <button
                          onClick={() => handleBuy(product.id)}
                          className="button is-primary"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
