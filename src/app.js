require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const walletRoutes = require('./routes/walletRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const authMiddleware = require('./middleware/authMiddleware');
const app = express();
const disputeRoutes = require('./routes/disputeRoutes');
const paymentRoutes =
require('./routes/paymentRoutes');
const withdrawalRoutes =
require('./routes/withdrawalRoutes');
const adminRoutes =
  require('./routes/adminRoutes');
  const escrowRoutes =
require('./routes/escrowRoutes');
const postRoutes =
require('./routes/postRoutes');

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/wallet', walletRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/disputes', disputeRoutes);
app.use('/api/payments', paymentRoutes);
app.use(
  '/api/withdrawals',
  withdrawalRoutes
);
app.use('/api/admin', adminRoutes);
app.use('/api/escrow', escrowRoutes);
app.use('/api/posts', postRoutes);


app.get('/', (req, res) => {
  res.send('BIZCONN API RUNNING');
});

app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Protected route',
    user: req.user
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
console.log('Transaction routes loaded');
