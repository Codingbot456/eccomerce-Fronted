// CartToggle.js
import React, { useState, useEffect } from 'react';
import Cart from '../cart/cart'; // Ensure this path is correct

const CartToggle = () => {
    const [cartWidth, setCartWidth] = useState('0');

    useEffect(() => {
        const handleCartIconClick = () => {
            if (window.innerWidth <= 768) {
                setCartWidth('100%');
            } else {
                setCartWidth('450px');
            }
        };

        window.addEventListener('cartIconClicked', handleCartIconClick);

        return () => {
            window.removeEventListener('cartIconClicked', handleCartIconClick);
        };
    }, []);

    const handleCloseCart = () => {
        setCartWidth('0');
    };

    return <Cart width={cartWidth} onClose={handleCloseCart} />;
};

export default CartToggle;
