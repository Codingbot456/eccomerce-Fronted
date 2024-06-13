// src/components/CartBuy/CartBuy.js

import React, { useState } from 'react';
 // Import any relevant styles for CartBuy

const CartBuy = ({ product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [selectedSize, setSelectedSize] = useState('');

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

    const handleAddToCartClick = () => {
        const totalPrice = product.price * quantity;
        onAddToCart({ ...product, quantity, totalPrice, selectedColor, selectedSize });
        onClose();
    };

    return (
        <div className="buy-card4">
            <button className='close-button' onClick={onClose}>X</button>
            <div className='cart-buy-abt'>
                {product.image_url && <img src={product.image_url} alt={product.name} className='card-image' />}
            </div>
            <div className='cart-buy-abt2'>
                <div className='card-info'>
                    <h4>{product.name}</h4>
                    <p1>{product.description}</p1>
                    <h5>Price: ${product.price}</h5>
                </div>
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
                <div className='color-picker'>
                    <p>Color:</p>
                    <input type='color' value={selectedColor} onChange={handleColorChange} />
                </div>
                <div className='buys'>
                    <div className='quantity'>
                        <button onClick={handleDecrement} className='quantity-btn'>-</button>
                        <span className='quantity-value'>{quantity}</span>
                        <button onClick={handleIncrement} className='quantity-btn'>+</button>
                    </div>
                    <button onClick={handleAddToCartClick} className='add-to-cart'>Add to Cart</button>
                </div>
                <button className='view-details'>View Details</button>
            </div>
        </div>
    );
};

export default CartBuy;
