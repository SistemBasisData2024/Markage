import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

const RewardList = () => {
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        fetchRewards();
    }, []);

    const fetchRewards = async () => {
        try {
            const response = await axios.get("http://localhost:3000/getAllRewards");
            setRewards(response.data);
        } catch (error) {
            console.error("There was an error fetching the rewards!", error);
        }
    };

    const deleteReward = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/deleteReward/${id}`);
            fetchRewards();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <h1 className="title has-text-white">Markage</h1>
                    </Link>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <Link className="navbar-item" to="/">Home</Link>
                        <Link className="navbar-item" to="/transactions">Transactions</Link>
                        <Link className="navbar-item" to="/product">Product List</Link>
                        <Link className="navbar-item" to="/membership">Membership</Link>
                    </div>
                </div>
            </nav>

            <section className="section">
                <div className="container">
                    <Link to="/reward/addReward" className="button is-success">
                        Add Reward
                    </Link>
                    <table className="table is-fullwidth is-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Point</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rewards.map((reward) => (
                                <tr key={reward.id}>
                                    <td>{reward.id}</td>
                                    <td>{reward.name}</td>
                                    <td>{reward.point}</td>
                                    <td>
                                        <Link to={`/reward/${reward.id}`} className="button is-small is-info" style={{ marginRight: '0.5rem' }}>
                                            Edit
                                        </Link>
                                        <button onClick={() => deleteReward(reward.id)} className="button is-small is-danger">
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
