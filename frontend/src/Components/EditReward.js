import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

const EditReward = () => {
    const [discount, setDiscount] = useState(''); // State to store the reward discount
    const [point, setPoint] = useState(''); // State to store the reward point
    const { id } = useParams(); // Extracting the reward ID from the URL parameters
    const navigate = useNavigate(); // Using useNavigate for navigation

    // get reward details from the server when the component mounts
    useEffect(() => {
        getReward();
    }, []);

    // Function to get reward details from the server
    const getReward = async () => {
        try {
            // Send a GET request to get reward details based on the ID
            const response = await axios.get(`http://localhost:3000/reward/${id}`);
            // Update the state with the geted reward details
            setDiscount(response.data.discount);
            setPoint(response.data.point);
        } catch (error) {
            console.error('There was an error geting the reward!', error);
        }
    };

    // Function to update reward details
    const updateReward = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Send a PUT request to update the reward details
            await axios.put(`http://localhost:3000/reward/${id}`, { discount, point });
            // Navigate to the reward list page after successful update
            navigate('/reward');
        } catch (error) {
            console.error('There was an error updating the reward!', error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Edit Reward</h1>
            <form onSubmit={updateReward}>
                {/* Input field for reward discount */}
                <div className="field">
                    <label className="label">Discount</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            placeholder="Reward Discount"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>
                </div>
                {/* Input field for reward point */}
                <div className="field">
                    <label className="label">Point</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            placeholder="Reward Point"
                            value={point}
                            onChange={(e) => setPoint(e.target.value)}
                        />
                    </div>
                </div>
                {/* Button to submit the form and update reward details */}
                <div className="control">
                    <button className="button is-primary">Update Reward</button>
                </div>
            </form>
        </div>
    );
};

export default EditReward;
