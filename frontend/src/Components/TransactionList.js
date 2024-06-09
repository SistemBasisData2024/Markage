import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/transaction/");
      setTransactions(response.data);
    } catch (error) {
      console.error("There was an error fetching the transactions!", error);
    }
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

      <section className="section">
        <div className="container">
          <h1 className="title">Transactions</h1>
          <Link to="/transaction/addTransaction" className="button is-success">
            Add Transaction
          </Link>
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
