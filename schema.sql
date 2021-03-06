DROP DATABASE IF EXISTS employeetracker_DB;
CREATE DATABASE employeetracker_DB;
USE employeetracker_DB;

CREATE TABLE department(
  id INTEGER AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB;

CREATE TABLE `role`(
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(18,2) NOT NULL,
  department_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  INDEX department_ind (department_id),
  CONSTRAINT department_fk FOREIGN KEY (department_id) REFERENCES department (id)
) ENGINE=INNODB;

CREATE TABLE employee(
  id INTEGER AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER NULL,
  PRIMARY KEY (id),
  INDEX manager_ind (manager_id),
  INDEX role_ind (role_id),
  CONSTRAINT manager_fk FOREIGN KEY (manager_id) REFERENCES employee (id),
  CONSTRAINT role_fk FOREIGN KEY (role_id) REFERENCES `role` (id)
) ENGINE=INNODB;

CREATE TABLE management(
  id INTEGER AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  department_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  INDEX department_ind (department_id),
  INDEX role_ind (role_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department (id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES `role` (id)
) ENGINE=INNODB;


SELECT * FROM department;
SELECT * FROM `role`;
SELECT * FROM employee;
SELECT * FROM management;


INSERT INTO department (`name`) VALUES ('Engineering');
insert into department (`name`) VALUES ("Laboratory");
INSERT INTO `role` (title, salary, department_id) VALUES ('Software Engineer', 120000.00, 1);
INSERT INTO `role` (title, salary, department_id) VALUES ('Engineering Manager', 40000.00, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Jimbo', 'Frankfurter', 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Britt', 'Bot', 1, 2);
insert into management(first_name,last_name,role_id,department_id) values("Frida","Kahlo",3,3);
