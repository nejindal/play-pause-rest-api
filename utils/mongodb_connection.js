var mongoose = require("mongoose");
const server = "mongodb://localhost:27017/"

module.exports.getConnection = function(db_name){
    const url = server + db_name;
    var conn = mongoose.createConnection(url,{useMongoClient: true});
    //db.on('error', console.error.bind(console, 'connection error:'));
    return conn;
}