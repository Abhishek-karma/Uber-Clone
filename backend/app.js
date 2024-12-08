const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
connectToDb();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true}))


app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.use('/users',userRoutes);

module.exports = app;