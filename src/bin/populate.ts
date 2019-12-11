import mongodb = require("./../dbUtils")
import userdb = require("./../user")

var users = [
    {
        email: "marvin@gmail.com",
        first_name: "marvin",
        last_name: "martin",
        password: "1234"
    },
    {
        email: "heloise@gmail.com",
        first_name: "heloise",
        last_name: "tribeaudau",
        password: "helo"
    },
    {
        email: "tim@gmail.com",
        first_name: "tim",
        last_name: "martin",
        password: "azerty"
    },
    {
        email: "danny@gmail.com",
        first_name: "danny",
        last_name: "martin",
        password: "dmartin"
    }
];

// Initiating Connection
mongodb.connect(function(err, db) {
    userdb.addUsers(users, (err: Error | null) => {
      if (err) throw err
      console.log('Data populated')
  })
  mongodb.close();
});
