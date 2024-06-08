import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

const EditReward = () => {
    const [name, setName] = useState('');
    const [point, setPoint] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchReward();
    }, []);

    const fetchReward = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getReward/${id}`);
            setName(response.data.name);
            setPoint(response.data.point);
        } catch (error) {
            console.error('There was an error fetching the reward!', error);
        }
    };

    const updateReward = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/updateReward/${id}`, { name, point });
            navigate('/rewards');
        } catch (error) {
            console.error('There was an error updating the reward!', error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Edit Reward</h1>
            <form onSubmit={updateReward}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Reward Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
