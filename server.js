const express = require('express');
const mongoose = require ('mongoose')
const bodyParser = require ('body-parser')

const app = express ();

const users = require ('./routes/api/users')
const profile = require ('./routes/api/profile')
const posts = require ('./routes/api/posts')

//Body parser middleware
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


// DB Config 
const db = require ('./config/keys').mongoURI

// connect to MongoDB
mongoose
    .connect(db)
    .then(()=> console.log('mongoDB Connected'))
    .catch(err => console.log(err))

app.get ('/', (req, res) => res.send("hello world"));

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = process.env.PORT || 5000

app.listen (port, () => console.log("server 5000 started "))