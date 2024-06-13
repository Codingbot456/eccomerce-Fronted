import React from 'react';
import '../productCategories/page.css';
import './Toggler.css'; // Create this CSS file for styling the toggler

const Toggler = ({ onClick, isOpen }) => (
    <button className="toggler" onClick={onClick}>
        {isOpen ? 'Close' : 'Open'} Filters
    </button>
);

export default Toggler;
