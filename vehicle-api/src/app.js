const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load config
dotenv.config();

const app = express();

// Connect to database
connectDB();

// Body parser
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/vehicle-brands', require('./routes/vehicleBrand'));
app.use('/vehicle-types', require('./routes/vehicleType'));
app.use('/vehicle-year', require('./routes/vehicleYear'));
app.use('/vehicle-model', require('./routes/vehicleModel'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
