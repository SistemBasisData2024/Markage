import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

const EditProduct = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/product/${id}`);
                const product = response.data;
                setName(product.name);
                setPrice(product.price);
                setStock(product.stock);
                setType(product.type);
            } catch (error) {
                console.error('There was an error fetching the product!', error);
                setError('There was an error fetching the product. Please try again later.');
            }
        };

        fetchProduct();
    }, [id]);

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/product/${id}`, { name, price, stock, type });
            if (response.status === 200) {
                navigate('/product');
            } else {
                setError('Failed to update product. Please try again.');
            }
        } catch (error) {
            console.error('There was an error updating the product!', error);
            setError('There was an error updating the product. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Edit Product</h1>
            {error && <div className="notification is-danger">{error}</div>}
            <form onSubmit={updateProduct}>
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
                    <label className="label">Type</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Product Type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="control">
                    <button className="button is-primary" type="submit">Update Product</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
