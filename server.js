const express = require('express');
const mongoose = require ('mongoose')

const app = express ();

// DB Config 
const db = require ('./config/keys').mongoURI

// connect to MongoDB
mongoose
    .connect(db)
    .then(()=> console.log('mongoDB Connected'))
    .catch(err => console.log(err))

app.get ('/', (req, res) => res.send("hello world"));

const port = process.env.PORT || 5000

app.listen (port, () => console.log("server 5000 started "))