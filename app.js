const express = require('express')
const bodyParser = require('body-parser')
const mongojs = require('mongojs')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Database configuration
// Save the URL of our database as well as the name of our collection
const databaseUrl = "zoo"
const collections = ["animals"]

// Use mongojs to hook the database to the db variable
const db = mongojs(databaseUrl, collections)

//Log any errors if mongodb runs into an issue
db.on('error', function(error){
    console.log('There is a database error: ', error);
})

//Routes
// 1. At the root path, send a simple hello world message to the browser
// app.get("/", function(req, res) {
//     res.send("Hello world")
// })

//Get all animals from the database
app.get('/', function(req, res){
    db.animals.find({}, function(err, found){
        if (err) {
            console.log('There was an error finding the animals: ', err)
        }
        else {
            res.json(found)
        }
    })
})




app.listen(8080, () => {
    console.log('Server listening on port 8080')
});