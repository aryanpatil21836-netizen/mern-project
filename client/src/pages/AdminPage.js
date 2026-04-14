import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // ✅ FETCH PRODUCTS (FIXED)
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        'https://mern-project-85uj.onrender.com/api/products'
      );

      console.log("API Response:", res.data);

      // ✅ ensure array
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      alert('Products fetch nahi hue');
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ DELETE PRODUCT
  const deleteHandler = async (id) => {
    if (window.confirm('Delete product?')) {
      try {
        await axios.delete(
          `https://mern-project-85uj.onrender.com/api/products/${id}`
        );
        alert('Deleted');
        fetchProducts();
      } catch (error) {
        console.log(error);
        alert('Delete failed');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Admin Panel</h2>
        <button onClick={logoutHandler}>Logout</button>
      </div>

      <button
        onClick={() => navigate('/create-product')}
        style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        + Create Product
      </button>

      {/* PRODUCTS LIST */}
      <div style={{ marginTop: '20px' }}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
              }}
            >
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>

              <button
                onClick={() => navigate(`/edit-product/${product._id}`)}
                style={{ marginRight: '10px' }}
              >
                Edit
              </button>

              <button onClick={() => deleteHandler(product._id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <h3>No products found</h3>
        )}
      </div>
    </div>
  );
};

export default AdminPage;