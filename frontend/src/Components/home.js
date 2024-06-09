import React from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

const HomePage = () => {
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
            <Link className="navbar-item" to="/product">
              Product List
            </Link>
            <Link className="navbar-item" to="/transaction">
              Transactions
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
        <div className="container has-text-centered">
          <h1 className="title">Welcome to Markage!</h1>
          <p className="subtitle">
            Your one-stop shop for all things rewards and transactions.
          </p>
          <div className="buttons is-centered">
            <Link to="/product" className="button is-primary">
              View Product List
            </Link>
            <Link to="/transactions" className="button is-link">
              View Transactions
            </Link>
            <Link to="/membership" className="button is-info">
              View Membership
            </Link>
            <Link to="/reward" className="button is-success">
              View Rewards
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
