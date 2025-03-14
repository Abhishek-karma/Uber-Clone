const express = require('express');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const cors = require('cors');

const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

const app = express();
connectToDb();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapRoutes);
app.use('/rides',rideRoutes);

module.exports = app;