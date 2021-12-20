DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  roles_id INT,
  FOREIGN KEY (roles_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

