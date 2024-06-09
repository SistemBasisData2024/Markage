import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

// Component for displaying a list of transactions
const TransactionList = () => {
  // State variable to store transactions
  const [transactions, setTransactions] = useState([]);

  // get transactions when the component mounts
  useEffect(() => {
    getTransactions();
  }, []);

  // Function to get transactions from the server
  const getTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/transaction/");
      setTransactions(response.data);
    } catch (error) {
      console.error("There was an error geting the transactions!", error);
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
            <Link className="navbar-item" to="/product">
              Product List
            </Link>
            <Link className="navbar-item" to="/membership">
              Membership
            </Link>
            <Link className="navbar-item" to="/reward">
              Reward
            </Link>
          </div>
        </div>
      </nav>

      {/* Transactions section */}
      <section className="section">
        <div className="container">
          {/* Transactions title */}
          <h1 className="title">Transactions</h1>
          {/* Button to add a new transaction */}
          <Link to="/transaction/addTransaction" className="button is-success">
            Add Transaction
          </Link>
          {/* Transactions table */}
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Telephone</th>
                <th>Gross Price</th>
                <th>Discount</th>
                <th>Net Price</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapping over transactions and rendering each row */}
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.telephone}</td>
                  <td>{transaction.gross_price}</td>
                  <td>{transaction.discount}</td>
                  <td>{transaction.net_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TransactionList;
