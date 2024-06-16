import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './payment.css';

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state;

  const [paymentData, setPaymentData] = useState({
    phone_number: '254',
    total_price: formData.total_price,
    items: formData.items
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: paymentData.phone_number,
          amount: paymentData.total_price
        }),
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Payment failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'phone_number' && value.startsWith('254')) {
      setPaymentData({ ...paymentData, [name]: value });
    }
  };

  return (
    <div className="payment-container">
      <form onSubmit={handleSubmit}>
        <h3>Payment Details</h3>
        <p>Total Amount: ${paymentData.total_price.toFixed(2)}</p>

        {paymentData.items.map((item, index) => (
          <div key={index}>
            <p>{item.name} - Quantity: {item.quantity} - Subtotal: ${item.subtotal_price.toFixed(2)}</p>
          </div>
        ))}

        <label>
          Phone Number:
          <input
            type="tel"
            name="phone_number"
            value={paymentData.phone_number}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentForm;
