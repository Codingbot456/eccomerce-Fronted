import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './multer.css';

// Product List Component
const ProductList = ({ products, onEdit, onDelete }) => {
    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:4000/api/products/${productId}`);
            onDelete(productId);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="product-list">
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <span>{product.name}</span>
                        <button onClick={() => onEdit(product)}>Edit</button>
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

// Product Form Component
const ProductForm = ({ product, onSave }) => {
    const [name, setName] = useState(product.name || '');
    const [price, setPrice] = useState(product.price || '');
    const [description, setDescription] = useState(product.description || '');
    const [image, setImage] = useState(null);
    const [category_id, setCategory_id] = useState(product.category_id || '');
    const [subcategory_id, setSubcategory_id] = useState(product.subcategory_id || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category_id', category_id);
        formData.append('subcategory_id', subcategory_id);
        if (image) formData.append('image', image);

        try {
            const url = product
                ? `http://localhost:4000/api/products/${product.id}`
                : 'http://localhost:4000/api/products';

            const method = product ? 'put' : 'post';

            await axios[method](url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onSave();
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
             <h2>update Product</h2>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Image:</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div>
                <label>Category ID:</label>
                <input type="number" value={category_id} onChange={(e) => setCategory_id(e.target.value)} />
            </div>
            <div>
                <label>Subcategory ID:</label>
                <input type="number" value={subcategory_id} onChange={(e) => setSubcategory_id(e.target.value)} />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

ProductForm.propTypes = {
    product: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
};

// App Component
const App = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleUpdate = async (updatedProduct) => {
        try {
            await axios.put(`http://localhost:4000/api/products/${updatedProduct.id}`, updatedProduct);
            setEditingProduct(null);
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = (productId) => {
        // Filter out the deleted product from the products array
        setProducts(products.filter(product => product.id !== productId));
    };

    return (
        <div className="container-ste">
            <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
            {editingProduct && <ProductForm product={editingProduct} onSave={handleUpdate} />}
        </div>
    );
};

export default App;
