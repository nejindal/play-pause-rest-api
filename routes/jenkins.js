var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var mongoose = require("mongoose")
var _mongoose = require('.\\..\\utils\\mongodb_connection.js')

//Getting referene of query object by creating model in mongoose
const DB_NAME = 'jenkins'
var Schema = mongoose.Schema;
var jenkinsSchema = new Schema({
    name : String,
    url : String
});
var conn = _mongoose.getConnection(DB_NAME);
var Jenkins = conn.model('jenkins',jenkinsSchema, 'jenkins')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/',function(req,res){

    console.log("Getting All Jenkins Servers");
    Jenkins.find({},{name:1, url:1, _id:0},function(err,data){
        console.log(data);
        res.json({"data": data});
    })
    
})

router.post('/', function(req,res){
    console.log("Adding Jenkins Server" + req.body.url);
    var newServer = new Jenkins();
    newServer.name = req.body.name;
    newServer.url = req.body.url;
    newServer.save(function(err){
        if(err){
            response = {"error": true, "message": "error adding data"}
        }else{
            response = {"error": false, "message": "Data added", "status": 200}
        }
        res.json(response);
    })
})

module.exports = router