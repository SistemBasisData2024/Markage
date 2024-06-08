import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

const EditMembership = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [point, setPoint] = useState('');
    const [telephone, setTelephone] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchMembership();
    }, []);

    const fetchMembership = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/membership/${id}`);
            const membership = response.data;
            setName(membership.name);
            setPoint(membership.point);
            setTelephone(membership.telephone);
        } catch (error) {
            console.error("There was an error fetching the membership!", error);
        }
    };

    const updateMembership = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/membership/${id}`, { name, point, telephone });
            navigate('/membership');
        } catch (error) {
            console.error("There was an error updating the membership!", error);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <h1 className="title">Edit Membership</h1>
                <form onSubmit={updateMembership}>
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
                            <button className="button is-primary" type="submit">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EditMembership;
