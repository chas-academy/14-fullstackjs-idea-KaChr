const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').load();

const bodyParser = require('body-parser');

// Import MongoDB url from .env
const mongoDB = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'));

// Create the server
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.resolve('../client/build')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, application/json, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Headers', 'x-access-token');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
  next();
});

app.use(cors());

const passport = require('passport');
// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Import routes
const auth = require('./controllers/AuthController');
app.use('/auth', auth);
const users = require('./controllers/UserController');
app.use('/users', users);
const categories = require('./controllers/CategoryController');
app.use('/categories', categories);
const products = require('./controllers/ProductController');
app.use('/products', products);
const admin = require('./controllers/AdminController');
app.use('/admin', admin);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Import port from .env
const port = process.env.PORT || 8888;

// What port the server should listen on
app.listen(port, () => {
  console.log(`Listening on localhost${port}`);
});

module.exports = app;
