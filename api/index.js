/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/api/product', require('./product'));
app.use('/api/coupon/:code', require('./coupon'));

app.listen(8000);
