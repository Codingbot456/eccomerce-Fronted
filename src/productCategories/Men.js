// src/pages/MenProducts.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import Footer from '../home/footer';
import '../products/grid-display.css';
import './page.css';
import CartToggle from '../cart/CartToggle';
import Toggler from '../Togglers/Toggler';
import ProductFilters from '../productFilters/ProductFilters';
import ProductCard from '../ProductCard/ProductCard';
import CartBuy from '../CartBuy/CartBuy'; // Import the CartBuy component

function MenProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [category, setCategory] = useState('all');
    const [showButtons, setShowButtons] = useState(false);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            let url = 'http://localhost:4000/api/products/category/1';

            switch (category) {
                case 'featured':
                    url = 'http://localhost:4000/api/products/subcategory/3';
                    break;
                case 'new':
                    url = 'http://localhost:4000/api/products/subcategory/2';
                    break;
                case 'selling':
                    url = 'http://localhost:4000/api/products/subcategory/4';
                    break;
                default:
                    url = 'http://localhost:4000/api/products/';
            }

            try {
                const response = await axios.get(url);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('There was an error fetching the products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };

    const handleTogglerClick = () => {
        setShowButtons(!showButtons);
    };

    return (
        <div className='pages-wrap'>
            <div className='pages'>
                <CartToggle />
                <Toggler onClick={handleTogglerClick} isOpen={showButtons} />
                <ProductFilters onCategoryChange={handleCategoryChange} showButtons={showButtons} />
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                {!loading && !error && (
                    <div className={`home-prods4 ${selectedProduct ? 'dimmed' : ''}`}>
                        <h2>{category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1) + ' Clothes'}</h2>
                        <div className="item-content4">
                            {products.map((product, index) => (
                                <ProductCard
                                    key={index}
                                    product={product}
                                    addToCart={addToCart}
                                    setSelectedProduct={setSelectedProduct}
                                />
                            ))}
                        </div>
                        {selectedProduct && (
                            <div className="overlay">
                                <CartBuy
                                    product={selectedProduct}
                                    onClose={() => setSelectedProduct(null)}
                                    onAddToCart={addToCart}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default MenProducts;
