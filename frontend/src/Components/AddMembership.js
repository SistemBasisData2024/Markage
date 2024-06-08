import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

const AddMembership = () => {
    const [name, setName] = useState('');
    const [point, setPoint] = useState('');
    const [telephone, setTelephone] = useState('');
    const navigate = useNavigate();

    const addMembership = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/membership", { name, point, telephone });
            navigate('/membership');
        } catch (error) {
            console.error("There was an error adding the membership!", error);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">Add Membership</h1>
                <form onSubmit={addMembership}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Point</label>
                        <div className="control">
                            <input className="input" type="number" value={point} onChange={(e) => setPoint(e.target.value)} required />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Telephone</label>
                        <div className="control">
                            <input className="input" type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary" type="submit">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddMembership;
