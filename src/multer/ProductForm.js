import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './multer2.css';

const ProductForm = ({ product, onSave }) => {
    const [name, setName] = useState(product ? product.name : '');
    const [price, setPrice] = useState(product ? product.price : '');
    const [description, setDescription] = useState(product ? product.description : '');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category_id', category);
        formData.append('subcategory_id', subcategory);
        if (image) formData.append('image', image);

        try {
            const url = product
                ? `http://localhost:4000/api/products/${product.id}`
                : 'http://localhost:4000/api/products';
            const method = product ? 'put' : 'post';

            const response = await axios[method](url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(product ? 'Product updated successfully!' : 'Product created successfully!');
            onSave();
        } catch (error) {
            console.error('There was an error!', error);
            setMessage('Error saving product');
        }
    };

    return (
        <div className="container-ste1">
            <h2>{product ? 'Edit Product' : 'Create Product'}</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Subcategory:</label>
                    <input type="text" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button type="submit">{product ? 'Update Product' : 'Create Product'}</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ProductForm;
