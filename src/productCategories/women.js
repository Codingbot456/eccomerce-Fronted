import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import '../productCategories/men.css';

function   WomenProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products/category/2');
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

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseBuySection = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="App">
            <h1>All Products</h1>
            <div className="item-con">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} onProductSelect={handleProductSelect} />
                ))}
            </div>
            {selectedProduct && <CartBuy product={selectedProduct} onClose={handleCloseBuySection} />}
        </div>
    );
}

const ProductCard = ({ product, onProductSelect }) => {
    const handleCardClick = () => {
        onProductSelect(product);
    };

    return (
        <div className='card' onClick={handleCardClick}>
            <div className='card-abt'>
                {product.image_url && <img src={product.image_url} alt={product.name} className='card-image' />}
                <div className='card-info'>
                    <h6>{product.name}</h6>
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
                </div>
            </div>
        </div>
    );
};

const CartBuy = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [selectedSize, setSelectedSize] = useState('');
    const { addToCart } = useContext(CartContext);

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
        const totalPrice = product.price * quantity;
        addToCart({ ...product, quantity, totalPrice, selectedColor, selectedSize });
    };

    return (
       
        <div className='cart-buy'>
           
            <button className='close-button' onClick={onClose}>X</button>
            <div className='cart-buy-abt'>
            {product.image_url && <img src={product.image_url} alt={product.name} className='card-image' />}
            </div>

            <div className='cart-buy-abt2'>
            <div className='card-info'>
                    <h6>{product.name}</h6>
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
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
                <button onClick={handleAddToCart} className='add-to-cart'>Add to Cart</button>
            </div>
         
            <button className='view-details'>View Details</button>
        </div>
        </div>
       
    );

};

export default WomenProducts;
