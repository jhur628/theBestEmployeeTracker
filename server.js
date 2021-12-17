const mysql = require('mysql2');
const startPrompt = require('./assets/js/index')
const logo = require('asciiart-logo');
const config = require('./package.json');

console.log(logo(config).render());

// // Create connection to mysql
// const db = mysql.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: "Password1",
//         database: "employee_db"
//     },
//     console.log("CONNECTED!")
// )

startPrompt();

// db.query('DESCRIBE employee', function(err, results) {
//     console.table(results)
// });
