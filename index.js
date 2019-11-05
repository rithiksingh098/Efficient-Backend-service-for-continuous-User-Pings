const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
//calling first route and then the controller for the logic
const search =require('./server/routes/search');
const ping=require('./server/routes/ping');
//necessary middlewares
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//search is a route that will handle all the /search endpoints
//search is the router that is exported from the search.js file..
app.use('/search',search);
app.use('/ping',ping);

app.listen(5000,function(){
    console.log("Live at Port 5000");
});