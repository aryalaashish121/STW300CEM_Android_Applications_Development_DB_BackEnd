const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');
const path = require('path');
const multer = require('multer');
// app.use(bodyParser.json());
const morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('./Database/mongoose');
app.use(express.static('./images'));


const userRoute = require('./Routes/user');
const productRoute = require('./Routes/product');
const orderRoute = require('./Routes/order');
const cartRoute = require('./Routes/cart');
const deliveryRoute = require('./Routes/delivery');

//app.use('/cart', cartRoute);
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);
app.use('/cart', cartRoute);
app.use('/delivery', deliveryRoute);

module.exports = app;