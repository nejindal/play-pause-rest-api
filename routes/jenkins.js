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
    console.log("Getting All Jenkins Servers");
    db.getConnection().collection('jenkins').find().toArray(function(err,results){
        if (err){
            console.log("Error in getting Jenkins Servers List " + err.message);
            res.status(500).send(err);
        }else{
            console.log("Result" + results);
            res.json({data : results}).end();
        }
    })
})

router.post('/', urlencodedParser, function(req,res){
    console.log("Adding Jenkins Server" + req.body.url);
    db.getConnection().collection('jenkins').insert(req.body,function(err,results){
        if (err){
            console.log("Error in inserting document" + err.message);
            res.status(500).send(err);

        }else{
            console.log("Successfull");
            res.status(200).end();
        }
    })
})

module.exports = router