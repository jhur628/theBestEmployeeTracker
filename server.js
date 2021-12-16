const mysql = require('mysql2');
const startPrompt = require('./assets/js/index')


// Create connection to mysql
const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Password1",
        database: "employee_db"
    },
    console.log("CONNECTED!")
)

startPrompt();

// connection.query('DESCRIBE employee', function(err, results) {
//     console.table(results)
// });
