const express = require('express')
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())


const { register, login, updateUser, deleteUser, userById } = require("./controllers/auth/auth");
 
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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});