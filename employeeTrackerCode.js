// join employee into itself
// join FROM employee INNER JOIN employee ON (employee.id = employee.managerId)
// (table.field = table.field)

// search dept = eng = 1 [{ department: 'Engineering', id: 1}]


const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'password',
  database: 'employeetracker_DB',
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View all Employees',
        'View all Employees by Department',
        'View all Employees by Manager',
        'Add Employee',
        'Remove Employee',
        'Update Employee',
        'Update Employee Role',
        'Update Employee Manager',
        // 'View All Roles',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all Employees':
          //add call sql employee list
          employeeSearch();
          break;

        case 'View all Employees by Department':
          //add call sql department list
          deptSearch();
          break;

        case 'View all Employees by Manager':
          //add call sql manager list
          managerSearch();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Remove Employee':
          remEmployee();
          break;

        case 'Update Employee':
          updEmployee();
          break;

        case 'Update Employee Role':
          updRole();
          break;

        case 'Update Employee Manager':
          updManager();
          break;

        // case 'View All Roles':
        //   viewRoles();
        //   break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const employeeSearch = () => {
  const query = 'SELECT * FROM employee';
  connection.query(
    query, (err, res) => {
      console.table(res);
      runSearch();
    }
  )
};

const employeeByDept = (depart) => {
  // const query = `SELECT id FROM department WHERE department.name = '${depart}'`;
  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ${depart}`;
  console.log(query);
  connection.query(
    query, (err, res) => {
      console.table(res);
      runSearch();
    }
  )
};

const employeeByMgr = (mgr) => {
  // const query = `SELECT id FROM department WHERE department.name = '${mgr}'`;
  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON management.department_id = department.id WHERE department.id = ${mgr}`;
  console.log(query);
  connection.query(
    query, (err, res) => {
      console.table(res);
      runSearch();
    }
  )
};

const deptSearch = () => {
  inquirer
    .prompt({
      name: 'department',
      type: 'list',
      message: 'Which department would you like to view?',
      choices: [{
        name: 'Engineering',
        value: 1
      },
      {
        name: 'Data Science',
        value: 2
      },
      {
        name: 'UI/UX',
        value: 3
      },
      {
        name: 'Laboratory',
        value: 4
      }
    ]
    })
    .then((answer) => {
      console.log(answer.department);
      employeeByDept(answer.department);
      connection.query(
        'SELECT * FROM department WHERE ?',
        { department: answer.department },
        (err, res) => {
          if (res[0]) {
            console.log(
              `Department: ${department_name}`
            );
          } else {
            console.error(`No results for ${answer.department}`);
          }
          runSearch();
        }
      );
    });
};



const managerSearch = () => {
  connection.query(
    'SELECT * FROM management', (err, res) => {
      const employees = res.map(({ manager_id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: manager_id
      }));
      // console.log(employees);
      inquirer
        .prompt({
          name: 'manager',
          type: 'list',
          message: 'Which manager would you like to view?',
          choices: employees
        })
        .then((answer) => {
          console.log(answer.manager);
          employeeByMgr(answer.manager);
          connection.query(
            'SELECT * FROM employee WHERE ?',
            { manager: answer.manager },
            (err, res) => {
              if (res[0]) {
                console.log(
                  `Manager: ${manager_name}`
                );
              } else {
                console.error(`No results for ${answer.manager}`);
              }
              runSearch();
        // .then((answer) => {
        //   console.log("answer",answer);
        //   // employeeByMgr(answer.id[0].toUpperCase() + answer.id.slice(1).toLowerCase());
        //   connection.query(
        //     'SELECT * FROM employee WHERE manager_id = ?',
        //     // { employee: answer.id },
        //     answer.manager,
        //     (err, res) => {
        //       console.table (res);
        //       runSearch();
            }
          );
        });
    })

};


const addEmployee = () => {
  'SELECT * ROLES'
  'SELECT * MANAGER'
  inquirer
    .prompt([{
        name: 'firstname',
        type: 'input',
        message: "What is the employee's first name?",
      },
      {
        name: 'lastname',
        type: 'input',
        message: "What is the employee's last name?",
      },
      {
        name: 'role',
        type: 'list',
        message: "What is the employee's role?",
        // get role name and id 
        choices: [{
          name: 'Software Engineer',
          value: 1
        }, 
        {
          name: 'Engineering Manager',
          value: 2
        },
        {
          name: 'UI/UX Manager',
          value: 3
        },
        {
          name: 'UI/UX Developer',
          value: 4
        },
        {
          name: 'Data Scientist',
          value: 6
        },
        {
          name: 'Lead Data Scientist',
          value: 8
        },
        {
          name: 'Lab Assistant',
          value: 5
        },
        {
          name: 'Mad Scientist',
          value: 7
        }]
      },
      {
        name: 'manager',
        type: 'list',
        message: "Who is the employee's manager?",
        // get manager id 
        choices: [{
          name: 'Frida Kahlo',
          value: 1
        },
        {
          name: 'Betty White',
          value: 2
        },
        {
          name: 'Jimbo Frankfurter',
          value: 3
        },
        {
          name: 'Salvador Dali',
          value: 4
        }]
      }
    ])
    .then((answer) => {
      console.log(answer);
      let newEmployee = [answer.firstname, answer.lastname, answer.role, answer.manager]
      // look at ice cream crud
      const query = 'insert into employee(first_name,last_name,role_id,manager_id) values(?,?,?,?);';
      connection.query(
        query, newEmployee, (err, res) => {
          if (err) throw err;
          console.table(res);
          runSearch();
        }
      )
    })
};

const remEmployee = () => {
  connection.query(
    'SELECT * FROM employee', (err, res) => {
    const employees = res.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
    }));

  inquirer
    .prompt({
      name: 'remEmployee',
      type: 'list',
      message: 'Which employee would you like to remove?',
      choices: employees
    })
    .then((answer) => {
      console.log(answer);
      let delEmployee = answer.remEmployee;
      // look at ice cream crud
      const query = 'DELETE FROM employee WHERE id = ?';
      connection.query(
        query, delEmployee, (err, res) => {
          if (err) throw err;
          console.table(res);
          runSearch();
        }
      )
    })
})};

const updEmployee = () => {
  inquirer
    .prompt({
      name: 'artist',
      type: 'input',
      message: 'Which employee would you like to update?',
    })
    .then((answer) => {})
};

// const viewRoles = () => {
//   inquirer
//     .prompt({
//       name: 'job',
//       type: 'input',
//       message: 'Which role would you like to view?',
//     })
//     .then((answer) => {
//       console.log(answer.job);
//       connection.query(
//         'SELECT * FROM job WHERE ?', {
//           job: answer.job
//         },
//         (err, res) => {
//           if (res[0]) {
//             console.log(
//               `Role: ${title}`
//             );
//           } else {
//             console.error(`No results for ${answer.job}`);
//           }
//           runSearch();
//         }
//       );
//     });
// };



// inquirer
//   .prompt({
//     name: 'employee',
//     type: 'input',
//     message: 'Which employee would you like to view?',
//   })
//   .then((answer) => {
//     console.log(answer.employee);
//     connection.query(
//       'SELECT * FROM employee WHERE ?',
//       { employee: answer.employee },
//       (err, res) => {
//         if (res[0]) {
//           console.log(
//             `Employee ID: ${id} || First Name: ${first_name} || Last Name: ${last_name} || Role: ${role_id} || Manager: ${manager_id}`          
//           );
//         } else {
//           console.error(`No results for ${answer.employee}`);
//         }
//         runSearch();
//       }
//     );
//   });