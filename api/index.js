var express = require('express');
var cors = require('cors')
var app = express();

app.use(cors());
app.use('/api/product', require('./product'));
app.use('/api/coupon/:code', require('./coupon'));
app.listen(8000);