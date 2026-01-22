require('dotenv').config()

const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const db = require('./db.js');
const auth = require('./auth.js');
const { verify } = require('jsonwebtoken');

const app = express();

//middleware
app.use(express.json())

//routes
const routeTest = require("./routes/test")
app.use('/test', routeTest)

app.listen(3001, () => console.log('Server Started'))