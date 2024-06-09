import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

const EditReward = () => {
    const [discount, setDiscount] = useState('');
    const [point, setPoint] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchReward();
    }, []);

    const fetchReward = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/reward/${id}`);
            setDiscount(response.data.discount);
            setPoint(response.data.point);
        } catch (error) {
            console.error('There was an error fetching the reward!', error);
        }
    };

    const updateReward = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/reward/${id}`, { discount, point });
            navigate('/reward');
        } catch (error) {
            console.error('There was an error updating the reward!', error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Edit Reward</h1>
            <form onSubmit={updateReward}>
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
                <div className="control">
                    <button className="button is-primary">Update Reward</button>
                </div>
            </form>
        </div>
    );
};

export default EditReward;
