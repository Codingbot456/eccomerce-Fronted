import React from 'react';
import './sort.css';

const Sort = ({ onSortChange }) => {
  const handleSortChange = (event) => {
    const value = event.target.value;
    onSortChange(value);
  };

  return (
    <div className="sort-container">
      <h2>Sort By</h2>
      <select onChange={handleSortChange}>
        <option value="">Select</option>
        <option value="newest">Newest</option>
        <option value="popularity">Popularity</option>
        <option value="priceHighLow">Price: High to Low</option>
        <option value="priceLowHigh">Price: Low to High</option>
      </select>
    </div>
  );
};

export default Sort;
