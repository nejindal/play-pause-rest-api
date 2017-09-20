var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var db = require(__dirname + '\\..\\utils\\mongodb_connection.js')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/',function(req,res){
    var jenkinsName = req.body.jenkinsName;
    var pipeline = req.body.pipeline;
    db.getConnection(jenkinsName, function(err, returnValue){
        var conn = returnValue;
        conn.collection(pipeline).find().toArray(function(err,results){
            if (err){
                console.log("Error in getting Steps List " + err.message);
                res.status(500).send(err);
            }else{
                console.log("Result" + results);
                res.json({data : results}).end();
            }
        })
    })
})

router.post('/', urlencodedParser, function(req,res){
    var jenkinsName = req.body.jenkinsName;
    var pipeline = req.body.pipeline;
    console.log("Posting Pipeline Steps of Pipeline " + pipeline + "and Jenkins " + jenkinsName);
    const doc = {jobId: req.body.jobId, steps: req.body.steps};
    db.getConnection(jenkinsName, function(err, returnValue){
        var conn = returnValue;
        conn.collection(pipeline).insert(doc,function(err,results){
            if (err){
                console.log("Error in inserting all documents" + err.message);
                res.status(500).send(err);
    
            }else{
                console.log("Successfully inserted");
                res.status(200).end();
            }
        })
    })
})

module.exports = router