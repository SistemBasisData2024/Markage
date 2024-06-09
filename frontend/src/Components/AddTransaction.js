import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTransaction = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState({});
    const [telephone, setTelephone] = useState('');
    const [rewardsId, setRewardsId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/product/");
            setProducts(response.data);
        } catch (error) {
            console.error("There was an error fetching the products!", error);
            setError("Failed to fetch products. Please try again later.");
        }
    };

    const handleQuantityChange = (id, value) => {
        setSelectedProducts({
            ...selectedProducts,
            [id]: value,
        });
    };

    const handleBuy = async () => {
        try {
            const selectedItems = Object.keys(selectedProducts).filter((key) => selectedProducts[key] > 0);
            // Send the selected items to the backend along with telephone and rewardsId
            const response = await axios.post("http://localhost:3000/transaction/addTransaction", {
                telephone: telephone,
                products: selectedItems,
                rewards_id: rewardsId
            });
            // Handle success response
        } catch (error) {
            console.error("Error adding transaction:", error);
            setError("Failed to add transaction. Please try again later.");
        }
    };

    return (
        <div className="container">
            <h1 className="title">Add Transaction</h1>
            {error && <div className="notification is-danger">{error}</div>}
            <div className="field">
                <label className="label">Telephone:</label>
                <div className="control">
                    <input className="input" type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                </div>
            </div>
            <div className="field">
                <label className="label">Rewards ID:</label>
                <div className="control">
                    <input className="input" type="text" value={rewardsId} onChange={(e) => setRewardsId(e.target.value)} />
                </div>
            </div>
            <table className="table is-fullwidth is-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Buy</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>

                            <td>
                                <input
                                    className="input"
                                    type="number"
                                    min="0"
                                    value={selectedProducts[product.id] || 0}
                                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="control">
                <button className="button is-primary" onClick={handleBuy}>Buy</button>
            </div>
        </div>
    );
};

export default AddTransaction;
