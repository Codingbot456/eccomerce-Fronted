import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../cart/cart.css';
import '../productCategories/men.css';

const Cart = ({ bgColor, scale, width, onClose }) => {
    const { cartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useContext(CartContext);

    const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);

    const cartStyle = {
        backgroundColor: bgColor,
        width: width,
        transition: 'width 0.3s',
    };

    return (
        <div className="cart" style={cartStyle}>
            <div className="cart-header">
                 <button className="close-cart " onClick={onClose}>×</button>
            <h2>Your Cart</h2>
            </div>
           
            {cartItems.length > 0 && (
                <button onClick={clearCart} className="clear-cart">Clear Cart</button>
            )}
            <ul>
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <li key={index} className="cart-item">
                            <img src={item.image_url} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h4>{item.name}</h4>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Total Price: ${item.totalPrice}</p>
                                <p>Color: <span style={{ backgroundColor: item.selectedColor, display: 'inline-block', width: '20px', height: '20px', border: '1px solid #000' }}></span></p>
                                <p>Size: {item.selectedSize}</p>
                            </div>
                            <div className="cart-item-actions">
                                <button onClick={() => incrementQuantity(item.id)} className="quantity-btn">+</button>
                                <button onClick={() => decrementQuantity(item.id)} className="quantity-btn">-</button>
                                <button onClick={() => removeFromCart(item.id)} className="remove-item">Remove</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <>
                    <li className="empty-cart">Your cart is empty</li>
              <img src="images/empty-cart.webp" alt="Image 1" />
            </>
                
                )}
            </ul>
            {cartItems.length > 0 && (
                <div className="total-amount">
                    <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                    <Link to="/checkout" className="checkout-link">Checkout</Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
