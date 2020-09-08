var express = require('express');
var bosyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

var app = express();
var port = 3000;
var Schema = mongoose.Schema;
dotenv.config();

app.use(bosyParser.json());
app.use(bosyParser.urlencoded({extended: false}))

// DB connection
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database Connected"))
    .catch(err => console.log("Database connection error", err))

app.post('/api/exercise/new-user', (req, res) => {
    // create user in db with username from body
    //return obj username and _id
});

app.get('/api/exercise/users', (req, res) => {
    // return an array of all users in db 
})

app.post('/api/exercise/add', (req,res) => {
    // add exercise by posting userId(_id), descrption, duration, date
    // if date is empty use current date 
    //return obj with fields added
})

app.get('/api/exercise/log', (req, res) => {
    // retrieve exercise log of any user with params userId(_id)
    // retrieve part of log by passing optional params of (from , to) = yyyy-mm-dd or limit = int
    // returnu ser obj with array log and count
})

app.listen(port, console.log(`listening on port ${port}`));
