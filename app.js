const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const userRoleRoutes = require('./routes/userRoleRoute')
const instituteRoutes = require('./routes/instituteRoutes')
const bookRoutes = require('./routes/bookRoutes')
const transactionRoutes = require('./routes/transactionRoutes')

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://sauhardsrivastava08:sauhardsrivastava08@cluster0.dwisk5k.mongodb.net/lms?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/userRole', userRoleRoutes);
app.use('/api/v1/institute', instituteRoutes);
app.use('/api/v1/book', bookRoutes);
app.use('/api/v1/transaction', transactionRoutes)


module.exports = app;
