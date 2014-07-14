var pg = require('pg'); 
var config = require('./config'); 

var client = new pg.Client(config.getConfig());
this.client = client;

client.connect();

this.query = function(statement, callback){
    var query = client.query(statement, function (err, result) {
        if (err != null) {
            console.log(err);
        }
        callback(result);
    });
};
