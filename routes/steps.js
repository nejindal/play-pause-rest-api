var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var mongoose = require("mongoose")
var _mongoose = require('.\\..\\utils\\mongodb_connection.js')

//Getting referene of query object by creating model in mongoose
var Schema = mongoose.Schema;
var stepsSchema = new Schema({
    "jobID" : String,
    "steps" : [{
        stepId: Number,
        stepJenkinsId: String,
        stepName: String,
        stepDurationInMillis: Number,
        stepStatus: String,
        stepState: String,
        stepNextId: [String]
    }]

});


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/',function(req,res){
    const DB = req.query.jenkinsName;
    const COLLECTION = req.query.pipeline; 
    var conn = _mongoose.getConnection(DB);
    var StepsModel = conn.model(COLLECTION, stepsSchema, COLLECTION)
    StepsModel.find({},function(err,data){
        res.json({"data": data})
    })
})

router.post('/', function(req,res){

    const DB = req.body.jenkinsName;
    const COLLECTION = req.body.pipeline; 
    var conn = _mongoose.getConnection(DB);
    var StepsModel = conn.model(COLLECTION, stepsSchema, COLLECTION)
    StepsModel.insertMany(req.body.doc,function(err,docs){
        console.log(docs);
        res.sendStatus(200).end();
    })
})



module.exports = router