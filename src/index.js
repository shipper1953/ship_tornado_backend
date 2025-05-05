const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require("./routes/orderRoutes");
const shipmentRoutes = require('./routes/shipmentRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use("/api/orders", orderRoutes);
app.use('/api/shipments', shipmentRoutes);

// Mount Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Mount User Routes
app.use('/api/user', require('./routes/userRoutes'));
// Mount Admin Routes
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Ship Tornado backend is healthy 🚀' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

// 404 Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

