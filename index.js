const mongoose = require('mongoose');
const express = require('express')
const app = express();
const http = require('http');
const cors = require('cors');
const { registration } = require('./controller/registrationController');
mongoose.connect('mongodb+srv://avinya2024:ChineseShadow24@cluster0.iaxmjpi.mongodb.net/avinya').then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log(err);
});
app.use(express.json());
app.use(cors());
app.options('*',cors());
app.use("/*",(req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://avinya2k24.netlify.app/'); // You can specify your allowed origin here
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '3600'); // Optional
    next();
  });
app.post('/register',registration);
app.put('/register',registration);
app.patch('/register',registration);
const server = http.createServer(app)
server.listen(8001,()=>{
    console.log("Server started at 8001");
})