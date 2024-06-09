import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

// Component for displaying a list of memberships
const MembershipList = () => {
    // State variables
    const [memberships, setMemberships] = useState([]);
    const [telephone, setTelephone] = useState('');

    // get memberships when the component mounts
    useEffect(() => {
        getMemberships();
    }, []);

    // Function to get memberships from the server
    const getMemberships = async () => {
        try {
            const response = await axios.get("http://localhost:3000/membership");
            setMemberships(response.data);
        } catch (error) {
            console.error("There was an error geting the memberships!", error);
        }
    };

    // Function to handle search by telephone
    const handleSearch = async () => {
        try {
            const response = await axios.get("http://localhost:3000/membership/phone", {
                params: { telephone }
            });
            setMemberships(response.data);
        } catch (error) {
            console.error("There was an error searching the memberships!", error);
        }
    };

    // Function to delete a membership
    const deleteMembership = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/membership/${id}`);
            getMemberships();
        } catch (error) {
            console.log(error);
        }
    };

    // JSX to render the component
    return (
        <div>
            {/* Navigation bar */}
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        {/* Application title */}
                        <h1 className="title has-text-white">Markage</h1>
                    </Link>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        {/* Navigation links */}
                        <Link className="navbar-item" to="/">Home</Link>
                        <Link className="navbar-item" to="/transaction">Transactions</Link>
                        <Link className="navbar-item" to="/reward">Rewards</Link>
                        <Link className="navbar-item" to="/product">Product List</Link>
                    </div>
                </div>
            </nav>

            {/* Membership list section */}
            <section className="section">
                <div className="container">
                    {/* Search field */}
                    <div className="field has-addons">
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Search by telephone"
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}
                            />
                        </div>
                        <div className="control">
                            <button className="button is-primary" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                    </div>
                    {/* Button to add a new membership */}
                    <Link to="/membership/add" className="button is-success">
                        Add Membership
                    </Link>
                    {/* Membership table */}
                    <table className="table is-fullwidth is-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Point</th>
                                <th>Telephone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapping over memberships and rendering each row */}
                            {memberships.map((membership) => (
                                <tr key={membership.id}>
                                    <td>{membership.id}</td>
                                    <td>{membership.name}</td>
                                    <td>{membership.point}</td>
                                    <td>{membership.telephone}</td>
                                    {/* Edit and delete buttons */}
                                    <td>
                                        <Link to={`/membership/${membership.id}`} className="button is-small is-info" style={{ marginRight: '0.5rem' }}>
                                            Edit
                                        </Link>
                                        <button onClick={() => deleteMembership(membership.id)} className="button is-small is-danger">
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

export default MembershipList;
