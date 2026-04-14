import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    } catch (error) {
      console.log(error);
      alert('Products fetch nahi hue');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    alert('Logged out successfully');
    navigate('/login');
  };

  const deleteHandler = async (id) => {
    const ok = window.confirm('Are you sure you want to delete this product?');
    if (!ok) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert('Product deleted');
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert('Delete failed');
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <h1 style={{ margin: 0 }}>Admin Panel</h1>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button
              type="button"
              style={{
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Back
            </button>
          </Link>

          <button
            type="button"
            onClick={logoutHandler}
            style={{
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Logout
          </button>

          <Link to="/create-product" style={{ textDecoration: 'none' }}>
            <button
              type="button"
              style={{
                backgroundColor: 'green',
                color: '#fff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Add Product
            </button>
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              style={{
                width: '300px',
                background: '#fff',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '220px',
                  objectFit: 'cover',
                }}
              />

              <div style={{ padding: '15px' }}>
                <h3>{product.name}</h3>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Stock:</strong> {product.countInStock}</p>

                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <Link to={`/edit-product/${product._id}`} style={{ textDecoration: 'none' }}>
                    <button
                      type="button"
                      style={{
                        backgroundColor: 'blue',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    type="button"
                    onClick={() => deleteHandler(product._id)}
                    style={{
                      backgroundColor: 'red',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 14px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
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