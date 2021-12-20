const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const logo = require('asciiart-logo');
const config = require('./package.json');

console.log(logo(config).render());

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

let roleChoices = [];
const role = () => {
    db.query('SELECT title FROM roles', function(err, res) {
        if (err) throw err
        res.forEach((job) => {
            roleChoices.push(job.title)
        })
    })
    return roleChoices;
}

let departmentChoices = [];
const department = () => {
    db.query('SELECT name FROM department', function(err, res) {
        if (err) throw err
        res.forEach((dept) => {
            departmentChoices.push(dept.name)
        })
    })
    return departmentChoices;
}

let employeeChoices = [];
const employee = () => {
    db.query('SELECT first_name, last_name FROM employee', function(err, res) {
        if (err) throw err
        res.forEach((emp) => {
            employeeChoices.push(emp.first_name.concat(" ", emp.last_name))
        })
    })
    return employeeChoices;
}

const viewDepartments = () => {
    db.query('SELECT * FROM department ORDER BY id ASC', function(err, results) {
        console.table(results);
        startPrompt();
    });
}

const viewRoles = () => {
    db.query('SELECT roles.id, title, salary, department.name AS department FROM roles JOIN department ON roles.department_id = department.id ORDER BY roles.id ASC', function(err, results) {
        console.table(results);
        startPrompt();
    });
}

const viewEmployees = () => {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee INNER JOIN roles ON employee.roles_id = roles.id INNER JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id ORDER BY employee.id ASC', function(err, results) {
        console.table(results);
        startPrompt();
    });
}

const addDepartment = () => {
    inquirer.prompt([
        {
            name: "addedDepartment",
            type: "input",
            message: "What department would you like to add?",
            validate: (data) => {
                if (data === '') {
                    return `Please enter a department to add.`
                }
                return true
            }
        }
    ])
    .then(data => {
        db.query(`INSERT INTO department (name) VALUE (?)`, data.addedDepartment, function(err, res) {
            if (err) throw err
            console.log(`${data.addedDepartment} was added!`)
        })
        startPrompt();
    })
}

const addRole = () => {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of the new role?",
            validate: (data) => {
                if (data === '') {
                    return `Please enter a title to add.`
                }
                return true
            }
        },
        {
            name: "salary",
            type: "input",
            message: "What is the new role's salary?",
            validate: (data) => {
                if (isNaN(data)){
                    return `Please enter a salary amount.`
                }
                return true
            }
        },
        {
            name: "department",
            type: "list",
            message: "What department does the new role belong to?",
            choices: department()
        }
    ])
    .then(data => {
        let deptId = department().indexOf(data.department) + 1;
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${data.title}", ${data.salary}, ${deptId})`, function(err, results){
            if (err) throw err
            console.log(`${data.title} was created!`)
        })
        startPrompt();
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the new employee's first name?",
            validate: (data) => {
                if (data === '') {
                    return `Please enter a first name to add.`
                }
                return true
            }
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the new employee's last name?",
            validate: (data) => {
                if (data === '') {
                    return `Please enter a last name to add.`
                }
                return true
            }
        },
        {
            
            name: "manager",
            type: "list",
            message: "Who will be the new employee's manager?",
            choices: employee()
        },
        {
            name: "role",
            type: "list",
            message: "What is the new employee's title?",
            choices: role()
        }
    ])
    .then(data => {
        let managerId = employee().indexOf(data.manager) + 1;
        let roleId = role().indexOf(data.role) + 1;
        db.query(`INSERT INTO employee (first_name, last_name, manager_id, roles_id) VALUES ("${data.firstName}", "${data.lastName}", ${managerId}, ${roleId})`, function(err, res) {
            if (err) throw err
            console.log(`${data.firstName} ${data.lastName} was added as an employee!`)
        })
        startPrompt()
    })
}

const updateRole = () => {
    db.query('SELECT first_name FROM employee', function(err, results) {
        let peopleChoices = [];
        const name = () => {
            results.forEach((person) => {
                peopleChoices.push(person.first_name)
            })
            return peopleChoices;
        }
        inquirer.prompt([
            {
                name: "nameChoice",
                type: "list",
                message: "Who's role do you want to update?",
                choices: name()
            },
            {
                name: "roleChoice",
                type: "list",
                message: `What role do you want to change the person into?`,
                choices: role()
            }
        ])
        .then(data => {
            let titleId = role().indexOf(data.roleChoice) + 1
            db.query(`UPDATE employee SET roles_id = ${titleId} WHERE first_name = "${data.nameChoice}"`, function(err, results) {
                if (err) throw err;
                console.log(`${data.nameChoice}'s role id has been changed to ${data.roleChoice}!`);
            })
            startPrompt();
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
                "Add an employee",
                "Update an employee role",
                "Exit"
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
                addDepartment()
            break;
            case "Add a role":
                console.log("Adding Role")
                addRole()
            break;
            case "Add an employee":
                console.log("Adding Employee")
                addEmployee()
            break;
            case "Update an employee role":
                console.log("Updating employee role")
                updateRole()
            break;
            case "Exit":
                console.log("Bye!")
                process.exit()
            break;
        }
    })
}

startPrompt();

module.exports = startPrompt;