/* eslint-disable no-console */
const express = require('express');
const logger = require('./src/middleware/logging');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

const products = require('./src/routes/product.js');

app.use(logger.log);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use(express.json());
app.use('/', products, errorHandler);
app.use('*', (req, res) => res.status(404).send('invalid url'));
app.use(logger.error);
