import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];

    const fixedItems = items.map((item) => ({
      ...item,
      qty: item.qty ? item.qty : 1,
    }));

    setCartItems(fixedItems);
    localStorage.setItem('cart', JSON.stringify(fixedItems));
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  const checkoutHandler = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    navigate('/checkout');
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div style={{ padding: '30px', maxWidth: '1400px', margin: 'auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '15px',
        }}
      >
        <h1 style={{ margin: 0 }}>My Cart</h1>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/">
            <button style={homeBtn}>Back to Home</button>
          </Link>

          <button onClick={clearCart} style={clearBtn}>
            Clear Cart
          </button>

          <button onClick={checkoutHandler} style={checkoutBtn}>
            Checkout
          </button>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            border: '1px solid #ddd',
            borderRadius: '12px',
            backgroundColor: '#fafafa',
          }}
        >
          <h2>Your cart is empty</h2>
          <Link to="/">
            <button style={shopBtn}>Go Shopping</button>
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '25px',
            alignItems: 'start',
          }}
        >
          <div>
            {cartItems.map((item) => (
              <div key={item._id} style={cardStyle}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={imgStyle}
                />

                <div style={{ padding: '20px' }}>
                  <h2 style={{ marginTop: 0 }}>{item.name}</h2>

                  <p style={textStyle}>
                    <strong>Price:</strong> ₹{item.price}
                  </p>

                  <p style={textStyle}>
                    <strong>Qty:</strong> {item.qty}
                  </p>

                  <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
                    <button
                      onClick={() => increaseQty(item._id)}
                      style={plusBtn}
                    >
                      +
                    </button>

                    <button
                      onClick={() => decreaseQty(item._id)}
                      style={minusBtn}
                    >
                      -
                    </button>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      style={removeBtn}
                    >
                      Remove
                    </button>
                  </div>

                  <h3 style={{ marginBottom: 0 }}>
                    Subtotal: ₹{item.price * item.qty}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div style={summaryBox}>
            <h2 style={{ marginTop: 0 }}>Order Summary</h2>
            <p style={summaryText}>
              <strong>Total Items:</strong>{' '}
              {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </p>
            <p style={summaryText}>
              <strong>Total Price:</strong> ₹{totalPrice}
            </p>

            <button onClick={checkoutHandler} style={bigCheckoutBtn}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '12px',
  marginBottom: '25px',
  overflow: 'hidden',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  backgroundColor: '#fff',
};

const imgStyle = {
  width: '100%',
  height: '280px',
  objectFit: 'cover',
};

const textStyle = {
  fontSize: '18px',
  margin: '10px 0',
};

const plusBtn = {
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  padding: '10px 18px',
  borderRadius: '8px',
  fontSize: '20px',
  cursor: 'pointer',
};

const minusBtn = {
  backgroundColor: '#f4b400',
  color: 'black',
  border: 'none',
  padding: '10px 18px',
  borderRadius: '8px',
  fontSize: '20px',
  cursor: 'pointer',
};

const removeBtn = {
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '10px 18px',
  borderRadius: '8px',
  fontSize: '16px',
  cursor: 'pointer',
};

const homeBtn = {
  backgroundColor: '#001f3f',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '10px',
  fontSize: '16px',
  cursor: 'pointer',
};

const clearBtn = {
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '10px',
  fontSize: '16px',
  cursor: 'pointer',
};

const checkoutBtn = {
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '10px',
  fontSize: '16px',
  cursor: 'pointer',
};

const shopBtn = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '14px 24px',
  borderRadius: '10px',
  fontSize: '16px',
  cursor: 'pointer',
  marginTop: '15px',
};

const summaryBox = {
  border: '1px solid #ccc',
  borderRadius: '12px',
  padding: '25px',
  backgroundColor: '#f8f9fa',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  position: 'sticky',
  top: '20px',
};

const summaryText = {
  fontSize: '20px',
  margin: '15px 0',
};

const bigCheckoutBtn = {
  width: '100%',
  marginTop: '20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  padding: '14px',
  borderRadius: '10px',
  fontSize: '18px',
  cursor: 'pointer',
};