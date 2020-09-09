var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

var app = express();
var port = 3000;
var Schema = mongoose.Schema;
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// DB connection
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database Connected"))
    .catch(err => console.log("Database connection error", err))

// Create document Schema
var userSchema = new Schema({
    username: { type: String },
    exercise:[{
        description: String,
        duration: Number,
        date: Date
    }]
})
// create Model
var User = mongoose.model('User', userSchema);

app.post('/api/exercise/new-user', (req, res) => {
    var username = req.body.username;
    // create user in db with username from body
    User.create({username: username}, (err, user) => {
        if(err) return console.log(err);
        res.json({
            username: user.username,
            Id: user._id
        })
    })
});

app.get('/api/exercise/users', (req, res) => {
    // return an array of all users in db 
    User.find({}, (err, users) => {
        if(err) return console.log(err);
        res.json(users)
    })
})

app.post('/api/exercise/add', (req, res, next) => {
    var id = req.body.id;
    var description = req.body.description;
    var duration = req.body.duration;
    var date = req.body.date;
    if(date == "") {
        date = Date();
    }
    var newExercise = {
        description: description,
        duration: duration,
        date: date
    }

   User.updateOne({_id: id}, {$push: {exercise:newExercise}}, (err) => {
        if(err) return console.log(err)
        User.findById(id, (err, user) => {
            if (err) return console.log(err);
            res.json({
                id: user._id,
                username: user.username,
                description: description,
                duration: duration,
                date: date
            })
        }) 
   })
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
