INSERT INTO department (name)
VALUE ("Human Resources"),
("Engineering"),
("Accounting"),
("Administration"),
("Sales");

INSERT INTO roles (title, salary, department_id)
VALUE ("HR Specialist", 55000, 1),
("Software Engineer", 105000, 2),
("Accountant", 89000, 3),
("Office Administrator", 49000, 4),
("Salesperson", 55000, 5),
("Best Software Engineer", 155000, 2),
("Lead Salesperson", 75000, 5);

INSERT INTO employee (first_name, last_name, manager_id, roles_id)
VALUE ("John", "Hur", null, 6),
("Sam", "Page", 1, 1),
("Kendall", "Swanson", 1, 2),
("Aidan", "Bachtell", 1, 3),
("Robert", "Robertson", 1, 4),
("Willy", "Loman", null, 7),
("Bart", "Simpson", 7, 5);
