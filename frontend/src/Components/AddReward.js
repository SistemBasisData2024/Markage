import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

const AddReward = () => {
    const [discount, setDiscount] = useState('');
    const [point, setPoint] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const addReward = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/reward/', { discount, point });
            if (response.status === 201) {
                navigate('/reward'); // Ensure the route matches your router configuration
            } else {
                setError('Failed to add reward. Please try again.');
            }
        } catch (error) {
            console.error('There was an error adding the reward!', error);
            setError('There was an error adding the reward. Please try again later.');
        }
    };

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">Add Reward</h1>
                {error && <div className="notification is-danger">{error}</div>}
                <form onSubmit={addReward}>
                    <div className="field">
                        <label className="label">Discount</label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
                                placeholder="Reward Discount"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Point</label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
                                placeholder="Reward Point"
                                value={point}
                                onChange={(e) => setPoint(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="control">
                        <button className="button is-primary" type="submit">Add Reward</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddReward;
