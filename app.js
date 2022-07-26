const express = require('express')
const app = express();
const port = process.env.PORT;
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
// Set up Global configuration access
dotenv.config();

const { register, login, updateUser, deleteUser, userById, resetPassword } = require("./controllers/auth/auth");
const {addProduct, updateProduct, deleteProduct} = require("./controllers/products/products")
const {checkout, addToCart, cart, removeFromCart} = require("./controllers/user/cart")
const {isAdmin, checkAuth} = require("./controllers/middlewares/auth")
const mongoose = require("./config/database")()

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// AUTH
app.post('/register', register);
app.post("/login", login)

// User Routes
app.post("/update-user", updateUser)
app.get("/user", userById)
app.get("/delete-user", deleteUser)
app.post("/reset-password", resetPassword)

// Products
app.post("/product", [isAdmin], addProduct)
app.post("/update-product", [isAdmin], updateProduct)
app.get("/delete-product", [isAdmin], deleteProduct)

// CART
app.post("/checkout",[checkAuth],checkout)
app.post("/add-to-cart",[checkAuth],addToCart)
app.get("/cart",[checkAuth],cart)
app.get("/remove-from-cart",[checkAuth],removeFromCart)



app.listen((process.env.PORT || 8081), () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});