import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const placeOrderHandler = () => {
    if (!address || !city || !postalCode || !country) {
      alert('Please fill all shipping details');
      return;
    }

    const orderData = {
      orderItems: cartItems,
      shippingAddress: {
        address,
        city,
        postalCode,
        country,
      },
      totalPrice,
      paymentMethod: 'Cash on Delivery',
    };

    localStorage.setItem('shippingAddress', JSON.stringify(orderData.shippingAddress));
    localStorage.setItem('latestOrder', JSON.stringify(orderData));

    alert('Order placed successfully');
    localStorage.removeItem('cart');
    navigate('/order-success');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: 'auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '25px',
          alignItems: 'start',
        }}
      >
        <div>
          <h1 style={{ marginBottom: '20px' }}>Checkout</h1>

          <div style={formBox}>
            <h2>Shipping Details</h2>

            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={inputStyle}
            />

            <button onClick={placeOrderHandler} style={placeOrderBtn}>
              Place Order
            </button>

            <Link to="/cart">
              <button style={backBtn}>Back to Cart</button>
            </Link>
          </div>
        </div>

        <div style={summaryBox}>
          <h2>Order Summary</h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item._id} style={itemRow}>
                  <span>
                    {item.name} x {item.qty}
                  </span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}

              <hr />

              <h3>Total: ₹{totalPrice}</h3>
              <p><strong>Payment:</strong> Cash on Delivery</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

const formBox = {
  border: '1px solid #ddd',
  borderRadius: '12px',
  padding: '25px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
};

const inputStyle = {
  width: '100%',
  padding: '14px',
  marginBottom: '15px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  fontSize: '16px',
  boxSizing: 'border-box',
};

const placeOrderBtn = {
  width: '100%',
  padding: '14px',
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '18px',
  cursor: 'pointer',
  marginBottom: '12px',
};

const backBtn = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#001f3f',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '18px',
  cursor: 'pointer',
};

const summaryBox = {
  border: '1px solid #ddd',
  borderRadius: '12px',
  padding: '25px',
  backgroundColor: '#f8f9fa',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  position: 'sticky',
  top: '20px',
};

const itemRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
  fontSize: '16px',
};