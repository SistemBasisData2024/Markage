import React from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

// Component for the home page of the application
const HomePage = () => {
  return (
    <div>
      {/* Navigation bar */}
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          {/* Link to the home page */}
          <Link className="navbar-item" to="/">
            {/* Application title */}
            <h1 className="title has-text-white">Markage</h1>
          </Link>
        </div>

        {/* Navigation menu */}
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            {/* Links to different pages */}
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

      {/* Main content section */}
      <section className="section">
        <div className="container has-text-centered">
          {/* Main title */}
          <h1 className="title">Welcome to Markage!</h1>
          {/* Subtitle */}
          <p className="subtitle">
            Your one-stop shop for all things rewards and transactions.
          </p>
          {/* Buttons to view different sections */}
          <div className="buttons is-centered">
            <Link to="/product" className="button is-primary">
              View Product List
            </Link>
            <Link to="/transaction" className="button is-link">
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
