import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const categories = [
        'Makanan Minuman',
        'Kesehatan Kecantikan',
        'Rumah Tangga Kebersihan',
        'Pakaian'
    ];

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/product', { name, price, stock, category });
            if (response.status === 201) {
                navigate('/product');
            } else {
                setError('Failed to add product. Please try again.');
            }
        } catch (error) {
            console.error('There was an error adding the product!', error);
            setError('There was an error adding the product. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Add Product</h1>
            {error && <div className="notification is-danger">{error}</div>}
            <form onSubmit={addProduct}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Price</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            placeholder="Product Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Stock</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            placeholder="Product Stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Category</label>
                    <div className="control">
                        <div className="select">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="control">
                    <button className="button is-primary" type="submit">Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
