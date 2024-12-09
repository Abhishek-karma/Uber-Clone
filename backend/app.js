const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookie = require('cookie-parser')
connectToDb();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true}))
app.use(cookie());

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.use('/users',userRoutes);

module.exports = app;