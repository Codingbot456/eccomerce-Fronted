import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import '../products/prods.css';

function TrendingProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products/category/1');
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

    const { addToCart } = useContext(CartContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='home-prods'>
            <h2>Trending Fashion Clothes</h2>
            <div className="item-content">
                
                {products && products.length && products.map((product, index) => (
                    <ProductCard key={index} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}

const ProductCard = ({ product, addToCart }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleCardClick = () => {
        setSelectedProduct(product);
    };

    const handleCloseBuySection = () => {
        setSelectedProduct(null);
    };

    const handleAddToCart = (productDetails) => {
        addToCart(productDetails);
        handleCloseBuySection();
    };

    return (
        

        <div className='card'>
            <div className='card-gap'>
            <div className='card-abt1' onClick={handleCardClick}>
                {product.image_url && <img src={product.image_url} alt={product.name} className='card-image' />}
            </div>
            <div className='card-info1'>
                <p1>{product.name}</p1>
                <p2>{product.description}</p2>
                <p3>Price: ${product.price}</p3>
            </div>
            {selectedProduct && <CartBuy product={selectedProduct} onClose={handleCloseBuySection} onAddToCart={handleAddToCart} />}
        </div>
        </div>
    );
};

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
    };

    return (
        <div className='cart-buy'>
            <button className='close-button' onClick={onClose}>X</button>
            <div className='cart-buy-abt'>
                {product.image_url && <img src={product.image_url} alt={product.name} className='card-image' />}
            </div>
            <div className='cart-buy-abt2'>
            <div className='card-info'>
                <h4>{product.name}</h4>
                        <p1>{product.description}</p1>
                        <h3>Price: ${product.price}</h3>
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

export default TrendingProducts;
