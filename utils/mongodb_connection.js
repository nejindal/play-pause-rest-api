var MongoClient = require('mongodb').MongoClient
var _db;

module.exports.getConnection = function(db_name,callback){
    const url = 'mongodb://localhost:27017/' + db_name;
    console.log("Trying to connect : " + url);
    MongoClient.connect(url, function (err, db) {
        //if (err) throw err;
    
        console.log("successfully connected " + db);
        callback(null,db);
    })
}