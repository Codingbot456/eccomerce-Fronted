import React, { useState } from 'react';
import './filter.css';

const Filter = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const priceRanges = [
    'Under $50', '$50 to $100', '$100 to $150', '$150 to $200',
    '$200 to $300', '$300 to $500', '$500 to $1000', 'Over $1000'
  ];

  const colors = ['Black', 'Blue', 'Olive', 'Maroon', 'Brown', 'White', 'Gray'];

  const brands = [
    'Shovia', 'Fusion', 'Hunter Shoes', 'Club Shoes',
    'Hoppister', 'Blaze Fashion', 'Elegance', 'Fashadil'
  ];

  const categories = [
    'Woman', 'Man', 'Watch', 'Kids', 'Sports', 'Sunglass', 'Bags', 'Sneakers'
  ];

  const handleColorChange = (color) => {
    setSelectedColors(prevColors =>
      prevColors.includes(color)
        ? prevColors.filter(c => c !== color)
        : [...prevColors, color]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prevCategories =>
      prevCategories.includes(category)
        ? prevCategories.filter(c => c !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h1>Filter</h1>
      </div>
      <div className="filter-results">
        <p><strong>Price Range:</strong> {selectedPriceRange}</p>
        <p><strong>Colors:</strong> {selectedColors.join(', ')}</p>
        <p><strong>Brands:</strong> {selectedBrands}</p>
        <p><strong>Categories:</strong> {selectedCategories.join(', ')}</p>
      </div>
      <div className="filter-section">
        <h2>Price Range</h2>
        <div className="filter-options">
          {priceRanges.map(range => (
            <div className="filter-option" key={range}>
                <div>
              <input
                id={range}
                name="price"
                type="radio"
                value={range}
                checked={selectedPriceRange === range}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              />
              </div>
              <label htmlFor={range}>{range}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <h2>Colors</h2>
        <div className="filter-options">
          {colors.map(color => (
            <div className="filter-option" key={color}>
                <div>
              <input
                type="checkbox"
                id={color}
                value={color}
                checked={selectedColors.includes(color)}
                onChange={() => handleColorChange(color)}
              />
              </div>
              <label htmlFor={color}>{color}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <h2>Brands</h2>
        <div className="filter-options">
          {brands.map(brand => (
            <div className="filter-option" key={brand}>
                <div>
              <input
                type="radio"
                id={brand}
                name="brand"
                value={brand}
                checked={selectedBrands === brand}
                onChange={(e) => setSelectedBrands(e.target.value)}
              />
              </div>
              <label htmlFor={brand}>{brand}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <h2>Categories</h2>
        <div className="filter-options">
          {categories.map(category => (
            <div className="filter-option" key={category}>
            <div>
              <input
                type="checkbox"
                id={category}
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
        </div>
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
