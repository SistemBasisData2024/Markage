import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

// Define the categories for products
const categories = [
    'Makanan Minuman',
    'Kesehatan Kecantikan',
    'Rumah Tangga Kebersihan',
    'Pakaian'
];

const EditProduct = () => {
    const { id } = useParams(); // Extracting the product ID from the URL parameters
    const [name, setName] = useState(''); // State to store the product name
    const [price, setPrice] = useState(''); // State to store the product price
    const [stock, setStock] = useState(''); // State to store the product stock
    const [category, setCategory] = useState(''); // State to store the product category
    const [error, setError] = useState(''); // State to store error messages
    const navigate = useNavigate(); // Using useNavigate for navigation

    // get product details from the server when the component mounts or the ID changes
    useEffect(() => {
        const getProduct = async () => {
            try {
                // Send a GET request to get product details based on the ID
                const response = await axios.get(`http://localhost:3000/product/${id}`);
                // Extract product details from the response and update the state
                const product = response.data;
                setName(product.name);
                setPrice(product.price);
                setStock(product.stock);
                setCategory(product.category);
            } catch (error) {
                console.error('There was an error geting the product!', error);
                setError('There was an error geting the product. Please try again later.');
            }
        };

        getProduct();
    }, [id]);

    // Function to handle product update
    const updateProduct = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Send a PUT request to update the product details
            const response = await axios.put(`http://localhost:3000/product/${id}`, { name, price, stock, category });
            // Check if the update was successful
            if (response.status === 200) {
                // Navigate to the product list page after successful update
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
                {/* Input field for product name */}
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
                {/* Input field for product price */}
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
                {/* Input field for product stock */}
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
                {/* Select field for product category */}
                <div className="field">
                    <label className="label">Category</label>
                    <div className="control">
                        <div className="select">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Category</option>
                                {/* Dynamically generate options for product categories */}
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {/* Button to submit the form and update product details */}
                <div className="control">
                    <button className="button is-primary" type="submit">Update Product</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
