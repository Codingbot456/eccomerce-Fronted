import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './pay.css';

const PaymentForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ total_price: 0 });

  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, amount: formData.total_price }),
      });

      if (response.ok) {
        // Payment successful, navigate to order confirmation page
        navigate('/order-confirmation');
      } else {
        // Payment failed, handle error
        console.error('Payment failed');
        // Display error message to user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-heading">Payment Method</h2>
      <p className="payment-details">Total Amount: ${formData.total_price.toFixed(2)}</p>
      <form className="payment-form" onSubmit={handlePaymentSubmit}>
        <input
          className="payment-input"
          type="tel"
          name="phoneNumber"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button className="payment-button" type="submit">
          Pay with M-Pesa
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
