const mongoose = require('mongoose');
const express = require('express')
const app = express();
const http = require('http');
const cors = require('cors');
const { registration, order, verification, search } = require('./controller/registrationController');
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log(err);
});
app.use(express.json());
app.use(cors({
    origin: "https://avinya2024.live/"
}));
app.options('*', cors());
app.use("/*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://avinya2024.live/'); // You can specify your allowed origin here
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '3600'); // Optional
    next();
});
app.post('/api/orders', order);


// Payment Verification Route
app.post('/api/verification', verification);

// ... other app routes and middleware
app.post('/register', registration);
app.put('/register', registration);
app.patch('/register', registration);
app.patch('/search', search)
const server = http.createServer(app)
server.listen(8001, () => {
    console.log("Server started at 8001");
})