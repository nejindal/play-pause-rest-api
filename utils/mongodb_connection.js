var MongoClient = require('mongodb').MongoClient
var db = null;

var connect = function(){
    MongoClient.connect('mongodb://localhost:27017/play-pause', function (err, _db) {
        if (err) throw err
        console.log("successfully connected");
        db = _db;
        })
}

exports.getConnection = function(){
    if(db!= null){
        console.log("DB connection is already alive");
        return db;
    }else{
        console.log("getting new db connection");
        connect();
        return db;
    }
}
