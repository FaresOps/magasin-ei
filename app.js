const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());

// productconfig
const ProductsRouter = require('./routes/products');
app.use('/product', ProductsRouter);
const Product = require('./models/product');


// categoryconfig
const CategoriesRouter = require('./routes/categories');
app.use('/category', CategoriesRouter);
const Category = require('./models/category');

// orderconfig
const OrdersRouter = require('./routes/orders');
app.use('/order', OrdersRouter);
const Order = require('./models/order');



// userconfig
const UsersRouter = require('./routes/users');
app.use('/user', UsersRouter);
const User = require('./models/user');


mongoose.connect('mongodb+srv://fares:fares@cluster0.dnbtuea.mongodb.net/ei-database?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ei-database'
})
    .then(() => {
        console.log('database connection is ready...')
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(4000, () => {
    console.log('server is running http://localhost:3000');
})