import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1 style={{ color: 'green' }}>✅ Order Placed Successfully!</h1>

      <p style={{ fontSize: '20px', margin: '20px 0' }}>
        Thank you for your purchase 🎉
      </p>

      <Link to="/">
        <button
          style={{
            padding: '15px 25px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '18px',
            cursor: 'pointer',
          }}
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default OrderSuccessPage;