import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";

// Component for displaying a list of rewards
const RewardList = () => {
  // State variable to store rewards
  const [rewards, setRewards] = useState([]);

  // get rewards when the component mounts
  useEffect(() => {
    getRewards();
  }, []);

  // Function to get rewards from the server
  const getRewards = async () => {
    try {
      const response = await axios.get("http://localhost:3000/reward");
      setRewards(response.data);
    } catch (error) {
      console.error("There was an error geting the rewards!", error);
    }
  };

  // Function to delete a reward
  const deleteReward = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/reward/${id}`);
      getRewards();
    } catch (error) {
      console.log(error);
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
              Transaction
            </Link>
            <Link className="navbar-item" to="/product">
              Product List
            </Link>
            <Link className="navbar-item" to="/membership">
              Membership
            </Link>
          </div>
        </div>
      </nav>

      {/* Reward list section */}
      <section className="section">
        <div className="container">
          {/* Button to add a new reward */}
          <Link to="/reward/addReward" className="button is-success">
            Add Reward
          </Link>
          {/* Reward table */}
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Discount</th>
                <th>Point</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapping over rewards and rendering each row */}
              {rewards.map((reward) => (
                <tr key={reward.id}>
                  <td>{reward.id}</td>
                  <td>{reward.discount}%</td>
                  <td>{reward.point}</td>
                  {/* Edit and delete buttons */}
                  <td>
                    <Link
                      to={`/reward/${reward.id}`}
                      className="button is-small is-info"
                      style={{ marginRight: "0.5rem" }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteReward(reward.id)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
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

export default RewardList;
