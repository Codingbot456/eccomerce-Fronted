// ProductCard.js
import React from 'react';

const ProductCard = ({ product, addToCart, setSelectedProduct }) => {
    const handleCardClick = () => {
        setSelectedProduct(product);
    };

    return (
        <div className='new4'>
            <div className='card'>
                <div className='card-gap4'>
                    <div className='card-abt4' onClick={handleCardClick}>
                        {product.image_url && <img src={product.image_url} alt={product.name} className='card-image4' />}
                    </div>
                    <div className='card-info4'>
                        <h5>{product.name}</h5>
                        <p2>{product.description}</p2>
                        <h6>Price: ${product.price}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
