// ProductFilters.js
import React from 'react';

const ProductFilters = ({ onCategoryChange, showButtons }) => {
    return (
        <div className={`button-container ${showButtons ? 'visible' : ''}`}>
            <div className='stcky-btn'>
                <h3>Filters</h3>
                <button onClick={() => onCategoryChange('all')}>All Products</button>
                <button onClick={() => onCategoryChange('featured')}>Featured Products</button>
                <button onClick={() => onCategoryChange('new')}>New Products</button>
                <button onClick={() => onCategoryChange('selling')}>Selling Products</button>
            </div>
        </div>
    );
};

export default ProductFilters;
