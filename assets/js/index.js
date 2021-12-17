const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const res = require('express/lib/response');

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

const viewEmployees = () => {
    db.query('SELECT * FROM employee', function(err, results) {
        console.table(results);
        startPrompt();
    });
}

const updateRole = () => {
    db.query('SELECT first_name FROM employee JOIN roles ON employee.roles_id = roles.id', function(err, results) {
        let peopleChoices = [];
        const name = () => {
            results.forEach((person) => {
                peopleChoices.push(person.first_name)
            })
            return peopleChoices;
        }
        console.log(name)
        inquirer.prompt([
            {
                name: "changeChoice",
                type: "list",
                message: "Who's role do you want to update?",
                choices: name()
            }
        ])
        .then(data => {
            console.log(data.changeChoice)
        })
    })
};

const startPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add a employee",
                "Update an employee role"
            ]
        }
    ])
    .then(data => {
        switch (data.choice) {
            case "View all departments":
                console.log("Viewing Departments");
                viewDepartments()
            break;
            case "View all roles":
                console.log("Viewing Roles");
                viewRoles()
            break;
            case "View all employees":
                console.log("Viewing Employees")
                viewEmployees()
            break;
            case "Add a department":
                console.log("Adding Department")
                // addDepartment()
            case "Add a role":
                console.log("Adding Role")
                // addRole()
            break;
            case "Add a employee":
                console.log("Adding Employee")
                // addEmployee()
            break;
            case "Update an employee role":
                console.log("Updating employee role")
                updateRole()
            break;
        }
    })
}

module.exports = startPrompt;