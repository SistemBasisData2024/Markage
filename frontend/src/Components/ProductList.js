import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";

// Component for displaying a list of products
const ProductList = () => {
  // State variables
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  // get products when the component mounts
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
    }
  };

  // Function to handle search by name or category
  const handleSearch = async () => {
    console.log("Searching...");
    try {
      const response = await axios.get("http://localhost:3000/product/search", {
        params: { key: searchKey },
      });
      console.log("Search result:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("There was an error searching the products!", error);
    }
  };

  // JSX to render the component
  return (
    <div>
      {/* Navigation bar */}
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            {/* Application title */}
            <h1 className="title has-text-white">Markage</h1>
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            {/* Navigation links */}
            <Link className="navbar-item" to="/">
              Home
            </Link>
            <Link className="navbar-item" to="/transaction">
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

      {/* Product list section */}
      <section className="section">
        <div className="container">
          {/* Search field */}
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Search by name or category"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
            <div className="control">
              <button
                className="button is-primary"
                type="button" // Add this
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          {/* Button to add a new product */}
          <Link to="/product/add" className="button is-success">
            Add Product
          </Link>
          {/* Product table */}
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapping over products and rendering each row */}
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  {/* Edit button */}
                  <td>
                    <Link
                      to={`/product/${product.id}`}
                      className="button is-small is-info"
                      style={{ marginRight: "0.5rem" }}
                    >
                      Edit
                    </Link>
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
