const mongodb = require('mongodb');

var mydb;
var myclient;

export function connect(
    callback: (error: Error | null, result: any) => void
){
    mongodb.MongoClient.connect(new mongodb.Server('mongo', 27017), function(err, client) {
        if (err) {
            callback(err, null)
        } else {
            myclient = client;
            mydb = client.db("app");
            callback(null, mydb);
        }
    })
}

export function close(){
    myclient.close();
}

export function getDb() {
    return mydb;
}
