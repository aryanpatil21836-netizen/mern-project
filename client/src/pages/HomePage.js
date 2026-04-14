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
      const res = await axios.get('https://mern-project-85uj.onrender.com/api/products');
      setProducts(res.data);
    } catch (error) {
      console.log(error);
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
      {/* HEADER */}
      <div style={header}>
        <h2 style={logo}>MyStore</h2>

        <input
          type="text"
          placeholder="Search products..."
          style={searchBar}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={actions}>
          <Link to="/admin">
            <button style={btnSmall}>Admin</button>
          </Link>

          <Link to="/cart">
            <button style={btnCart}>Cart</button>
          </Link>

          <button onClick={logoutHandler} style={btnLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div style={container}>
        <h2 style={title}>Products</h2>

        <div style={grid}>
          {filteredProducts.map((product) => (
            <div key={product._id} style={card}>
              <img src={product.image} alt="" style={image} />

              <h3 style={name}>{product.name}</h3>

              <p style={price}>₹{product.price}</p>

              <button
                onClick={() => addToCartHandler(product)}
                style={cartBtn}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

const page = {
  backgroundColor: '#eaeded',
  minHeight: '100vh',
  fontFamily: 'Arial',
};

const header = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '15px 25px',
  backgroundColor: '#131921',
  color: 'white',
};

const logo = {
  margin: 0,
  fontSize: '26px',
};

const searchBar = {
  width: '40%',
  padding: '10px',
  borderRadius: '4px',
  border: 'none',
};

const actions = {
  display: 'flex',
  gap: '10px',
};

const btnSmall = {
  backgroundColor: '#232f3e',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  cursor: 'pointer',
};

const btnCart = {
  backgroundColor: '#febd69',
  border: 'none',
  padding: '8px 12px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const btnLogout = {
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  cursor: 'pointer',
};

const container = {
  maxWidth: '1400px',
  margin: 'auto',
  padding: '20px',
};

const title = {
  marginBottom: '20px',
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
};

const card = {
  backgroundColor: 'white',
  padding: '15px',
  borderRadius: '6px',
  textAlign: 'center',
};

const image = {
  width: '100%',
  height: '180px',
  objectFit: 'cover',
};

const name = {
  fontSize: '18px',
  margin: '10px 0',
};

const price = {
  fontWeight: 'bold',
  marginBottom: '10px',
};

const cartBtn = {
  backgroundColor: '#ffd814',
  border: 'none',
  padding: '10px',
  cursor: 'pointer',
  width: '100%',
};