import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

const fetchProducts = async () => {
  try {
    const res = await axios.get('https://mern-project-85uj.onrender.com/api/v1/products');
    console.log('API RESPONSE:', res.data);

    if (Array.isArray(res.data)) {
      setProducts(res.data);
    } else {
      alert('Products array nahi aa raha');
      console.log('Unexpected response:', res.data);
    }
  } catch (error) {
    console.log('FETCH ERROR:', error);
    if (error.response) {
      console.log('ERROR RESPONSE DATA:', error.response.data);
      console.log('ERROR STATUS:', error.response.status);
    }
    alert('Products fetch nahi hue');
  }
};
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCartHandler = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exist = cart.find((item) => item._id === product._id);

    if (exist) {
      exist.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={page}>
      <div style={topWrapper}>
        {/* HEADER */}
        <div style={header}>
          <div style={brandBox}>
            <h2 style={logo}>MyStore</h2>
            <p style={tagline}>Shop smart. Look better.</p>
          </div>

          <input
            type="text"
            placeholder="Search products..."
            style={searchBar}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div style={actions}>
            <Link to="/admin">
              <button style={btnAdmin}>Admin</button>
            </Link>

            <Link to="/cart">
              <button style={btnCartTop}>Cart</button>
            </Link>

            <button onClick={logoutHandler} style={btnLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* HERO */}
        <div style={hero}>
          <div>
            <h1 style={heroTitle}>Trending Products</h1>
            <p style={heroText}>
              Stylish collection with better mobile shopping experience
            </p>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div style={container}>
        <h2 style={title}>Latest Products</h2>

        <div style={grid}>
          {filteredProducts.map((product) => (
            <div key={product._id} style={card}>
              <div style={imageWrapper}>
                <span style={badge}>Hot</span>
                <img src={product.image} alt={product.name} style={image} />
              </div>

              <div style={cardBody}>
                <h3 style={name}>{product.name}</h3>

                <p style={subText}>{product.brand || 'Premium Brand'}</p>

                <p style={price}>₹{product.price}</p>

                <button
                  onClick={() => addToCartHandler(product)}
                  style={cartBtn}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

const page = {
  background: 'linear-gradient(to bottom, #f8fafc, #eef2f7)',
  minHeight: '100vh',
  fontFamily: 'Arial, sans-serif',
};

const topWrapper = {
  padding: '12px',
};

const header = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  flexWrap: 'wrap',
  padding: '16px',
  borderRadius: '18px',
  background: 'linear-gradient(135deg, #111827, #1f2937)',
  color: 'white',
  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
};

const brandBox = {
  display: 'flex',
  flexDirection: 'column',
};

const logo = {
  margin: 0,
  fontSize: '28px',
  fontWeight: '800',
  letterSpacing: '0.5px',
};

const tagline = {
  margin: '4px 0 0 0',
  fontSize: '13px',
  color: '#d1d5db',
};

const searchBar = {
  flex: 1,
  minWidth: '220px',
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid #d1d5db',
  outline: 'none',
  fontSize: '14px',
};

const actions = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
};

const commonBtn = {
  border: 'none',
  padding: '10px 14px',
  borderRadius: '12px',
  cursor: 'pointer',
  fontWeight: '700',
  fontSize: '14px',
};

const btnAdmin = {
  ...commonBtn,
  backgroundColor: '#2563eb',
  color: 'white',
};

const btnCartTop = {
  ...commonBtn,
  backgroundColor: '#f59e0b',
  color: 'white',
};

const btnLogout = {
  ...commonBtn,
  backgroundColor: '#ef4444',
  color: 'white',
};

const hero = {
  marginTop: '14px',
  borderRadius: '20px',
  padding: '24px 18px',
  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
  color: 'white',
  boxShadow: '0 10px 24px rgba(37, 99, 235, 0.22)',
};

const heroTitle = {
  margin: 0,
  fontSize: '30px',
  fontWeight: '800',
};

const heroText = {
  marginTop: '8px',
  fontSize: '14px',
  color: '#e0e7ff',
};

const container = {
  maxWidth: '1400px',
  margin: 'auto',
  padding: '16px',
};

const title = {
  marginBottom: '18px',
  fontSize: '24px',
  color: '#111827',
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '18px',
};

const card = {
  backgroundColor: 'white',
  borderRadius: '18px',
  overflow: 'hidden',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
  border: '1px solid #e5e7eb',
  transition: '0.3s',
};

const imageWrapper = {
  position: 'relative',
};

const badge = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: '#ef4444',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '999px',
  fontSize: '12px',
  fontWeight: '700',
  zIndex: 1,
};

const image = {
  width: '100%',
  height: '210px',
  objectFit: 'cover',
  display: 'block',
};

const cardBody = {
  padding: '14px',
  textAlign: 'left',
};

const name = {
  fontSize: '17px',
  margin: '0 0 6px 0',
  color: '#111827',
  minHeight: '42px',
};

const subText = {
  fontSize: '13px',
  color: '#6b7280',
  margin: '0 0 10px 0',
};

const price = {
  fontWeight: '800',
  fontSize: '22px',
  color: '#16a34a',
  marginBottom: '12px',
};

const cartBtn = {
  background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
  color: 'white',
  border: 'none',
  padding: '12px',
  cursor: 'pointer',
  width: '100%',
  borderRadius: '12px',
  fontWeight: '700',
  fontSize: '14px',
};