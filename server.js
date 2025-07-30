require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const colors = require('colors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connect to MongoDB Atlas
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(colors.cyan.underline(`MongoDB Connected: ${conn.connection.host}`));
        return conn;
    } catch (error) {
        console.error(colors.red.underline.bold(`Error: ${error.message}`));
        process.exit(1);
    }
};

// Start the server only after MongoDB connection is established
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`.yellow.bold);
    });
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
