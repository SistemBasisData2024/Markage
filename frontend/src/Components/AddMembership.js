import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

const AddMembership = () => {
    const [name, setName] = useState('');
    const [point, setPoint] = useState('');
    const [telephone, setTelephone] = useState('');
    const navigate = useNavigate();

    // Function to handle the submission of the membership form
    const addMembership = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Send a POST request to the backend to add the new membership
            await axios.post("http://localhost:3000/membership", { name, point, telephone });
            // Navigate to the membership page after successful addition
            navigate('/membership');
        } catch (error) {
            console.error("There was an error adding the membership!", error);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">Add Membership</h1>
                {/* Membership form */}
                <form onSubmit={addMembership}>
                    {/* Name input field */}
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                    </div>
                    {/* Point input field */}
                    <div className="field">
                        <label className="label">Point</label>
                        <div className="control">
                            <input className="input" type="number" value={point} onChange={(e) => setPoint(e.target.value)} required />
                        </div>
                    </div>
                    {/* Telephone input field */}
                    <div className="field">
                        <label className="label">Telephone</label>
                        <div className="control">
                            <input className="input" type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
                        </div>
                    </div>
                    {/* Submit button */}
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
