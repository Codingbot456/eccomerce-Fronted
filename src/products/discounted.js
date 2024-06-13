// src/components/MenProducts.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Import the CartContext

function Subcategory() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products/subcategory/2');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('There was an error fetching the products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="App">
            <h1>All Products</h1>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1); // Default quantity is 1
    const [selectedColor, setSelectedColor] = useState('#000000'); // Default color
    const [selectedSize, setSelectedSize] = useState(''); // No default size
    const { addToCart } = useContext(CartContext); // Get addToCart function from context
    const navigate = useNavigate();

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        const totalPrice = product.price * quantity; // Calculate total price based on quantity and unit price
        addToCart({ ...product, quantity, totalPrice, selectedColor, selectedSize }); // Include totalPrice, selectedColor, and selectedSize in the cart item
        navigate('');
    };

    return (
        <div className='card'>
            {product.image_url && <img src={product.image_url} alt={product.name} className='card-image' />}
            <div className='card-info'>
                <h3>{product.name}</h3>
                <p>Price: {product.price}</p>
                <p>{product.description}</p>
            </div>
            <div className='card-buy'>
                {product.image_url && <img src={product.image_url} alt={product.name} className='buy-image' />}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className='sizes'>
                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <button 
                            key={size} 
                            className={`size-btn ${selectedSize === size ? 'selected' : ''}`} 
                            onClick={() => handleSizeSelect(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                <p>Color:</p>
                <div className='color-picker'>
                    <input type='color' value={selectedColor} onChange={handleColorChange} />
                </div>

                <div className='buys'>
                    <div className='quantity'>
                        <button onClick={handleDecrement} className='quantity-btn'>-</button>
                        <span className='quantity-value'>{quantity}</span>
                        <button onClick={handleIncrement} className='quantity-btn'>+</button>
                    </div>
                    <button onClick={handleAddToCart} className='add-to-cart'>Add to Cart</button>
                </div>
                {/* Display total price based on quantity */}
                <p>Total Price: {product.price * quantity}</p>
                <button className='view-details'>View Details</button>
            </div>
        </div>
    );
};

export default Subcategory;

