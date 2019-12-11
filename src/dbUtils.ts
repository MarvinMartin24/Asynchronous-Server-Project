const mongodb = require('mongodb');

var db;

export function connect(
    callback: (error: Error | null, result: any) => void
){
    mongodb.MongoClient.connect(new mongodb.Server('mongo', 27017), function(err, client) {
        if (err) {
            callback(err, null)
        } else {
            db = client.db("app");
            callback(null, db);
        }
    })
}

export function getDb() {
    return db;
}
