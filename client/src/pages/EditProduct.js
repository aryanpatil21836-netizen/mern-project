import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://mern-project-85uj.onrender.com/api/v1/products/${id}`
        );

        setName(data.name || '');
        setBrand(data.brand || '');
        setCategory(data.category || '');
        setDescription(data.description || '');
        setPrice(data.price || '');
        setCountInStock(data.countInStock || '');
        setImage(data.image || '');
      } catch (error) {
        console.log(error);
        alert('Product fetch failed');
      }
    };

    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://mern-project-85uj.onrender.com/api/v1/products/${id}`,
        {
          name,
          brand,
          category,
          description,
          price,
          countInStock,
          image,
        }
      );

      alert('Product updated successfully');
      navigate('/admin');
    } catch (error) {
      console.log(error);
      alert('Update failed');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Product</h2>

      <form onSubmit={submitHandler} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        {image && (
          <div className="mb-3 text-center">
            <img
              src={image}
              alt="preview"
              className="img-fluid rounded"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}

        <button className="btn btn-primary w-100">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;