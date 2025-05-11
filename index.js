const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {authorizeOnly} = require('./middlewares/authorizedAccess');
const app = express();

const homepageRouter = require('./routes/homepage');
const productRouter = require('./routes/product');
const shopbycategoryRouter = require('./routes/shopbycategory');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');


 mongoose.connect('mongodb://127.0.0.1:27017/beautybliss').then(() => {
    console.log('Connected to MongoDB');
}
).catch(err => {
    console.error('MongoDB connection error:', err);
}
);

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.resolve("./public")));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());


app.use("/", homepageRouter);
app.use("/products", productRouter)
app.use("/shopbycategory", shopbycategoryRouter)
app.use("/user", userRouter);
app.use('/cart', authorizeOnly, cartRouter);

app.get('/login', (req, res) => {
    res.render('login', { message: "" });
  });
  app.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/login');
  });
app.get('/aboutus', (req, res) => {
    res.render('aboutus');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});