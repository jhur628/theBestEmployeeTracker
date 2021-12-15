const express = require('express');
const mysql = require('mysql2');
const startPrompt = require('./assets/js/index')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });