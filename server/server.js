const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const Product = require('./models/Product');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/v1/user', userRoutes);

app.get('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany();

    const products = [
      {
        name: 'iPhone 14',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab',
        brand: 'Apple',
        category: 'Mobile',
        description: 'Apple phone',
        price: 79999,
        countInStock: 10,
      },
      {
        name: 'T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        brand: 'Nike',
        category: 'Clothing',
        description: 'Cotton t-shirt',
        price: 999,
        countInStock: 20,
      },
      {
        name: 'Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        brand: 'Sony',
        category: 'Electronics',
        description: 'Wireless headphones',
        price: 2999,
        countInStock: 15,
      },
    ];

    await Product.insertMany(products);
    res.send('Sample products inserted');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});