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
const {isAdmin} = require("./controllers/middlewares/auth")
const mongoose = require("./config/database")()

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/register', register);
app.post("/login", login)

// User Routes
// app.update("/user", updateUser)
app.post("/update-user", updateUser)
app.get("/user", userById)
app.get("/delete-user", deleteUser)
app.post("/reset-password", resetPassword)

// Products

app.post("/product", [isAdmin], addProduct)
app.post("/update-product", [isAdmin], updateProduct)
app.get("/delete-product", [isAdmin], deleteProduct)

app.listen((process.env.PORT || 8081), () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});