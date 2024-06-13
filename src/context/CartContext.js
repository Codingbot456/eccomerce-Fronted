import React, { createContext, useState, useEffect } from 'react';
import '../cart/cart.css';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart items from localStorage if available
        const savedCart = localStorage.getItem('cartItems');
        const parsedCartItems = savedCart ? JSON.parse(savedCart) : [];
        console.log("Cart Items Loaded:", parsedCartItems); // Log cartItems when loaded from localStorage
        return parsedCartItems;
    });

    useEffect(() => {
        // Save cart items to localStorage whenever they change
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log("Cart Items Updated:", cartItems); // Log cartItems whenever they are updated
    }, [cartItems]);

    const addToCart = (newItem) => {
        const existingItem = cartItems.find(item => item.id === newItem.id);
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === newItem.id ? 
                { ...item, quantity: item.quantity + newItem.quantity, totalPrice: item.totalPrice + newItem.totalPrice } 
                : item
            ));
        } else {
            setCartItems([...cartItems, newItem]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const incrementQuantity = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + item.price } : item
        ));
    };

    const decrementQuantity = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1, totalPrice: item.totalPrice - item.price } : item
        ));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
