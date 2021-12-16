const inquirer = require('inquirer');
const mysql = require('mysql2')

// Create connection to mysql
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Password1",
        database: "employee_db"
    },
    console.log("CONNECTED!")
)

const viewDepartments = () => {
    db.query('SELECT * FROM department', function(err, results) {
        console.table(results);
        startPrompt();
    });
}

const viewRoles = () => {
    db.query('SELECT * FROM roles', function(err, results) {
        console.table(results);
        startPrompt();
    });
}

const startPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a role",
                "Add a employee",
                "Update an employee role"
            ]
        }
    ])
    .then(data => {
        switch (data.choice) {
            case "View all departments":
                viewDepartments()
                console.log("Viewing Departments");
            break;
            case "View all roles":
                viewRoles()
                console.log("Viewing Roles");
            break;
            case "View all employees":
                // viewEmployees()
                console.log("Viewing Employees")
            break;
            case "Add a role":
                // addRole()
                console.log("Adding Role")
            break;
            case "Add a employee":
                // addEmployee()
                console.log("Adding Employee")
            break;
            case "Update an employee role":
                // updateRole()
                console.log("Updating employee role")
            break;
        }
    })
}

module.exports = startPrompt;