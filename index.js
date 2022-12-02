const db = mysql.creatConnection('mysql://root:rootroot@localhost:3306/employeeManager_db');

const inquirer = require('inquirer')

inquirer.prompt([
  {
    message: 'What would you like to do?',
    type: 'list',
    choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments','View Roles', 'View Employees', 'Update Employee Role'],
    name: 'init',
  }
])
.then(init=> {
  switch(init.choice) {
    case 'Add Department':
      addDepartment();
      break;
    case 'Add Role':
      addRole();
      break;
    case 'Add Employee':
      addEmployee();
      break;
    case 'View Departments':
      viewDepartments();
      break;
    case 'View Roles':
      viewRoles();
      break;
    case 'View Employees':
      viewEmployees();
      break;
    case 'Update Eployee Role':
      updateRole();
      
  }
})

function addDepartment() {
  inquirer.prompt([
    {
      message: 'What is the department name?',
      type: 'input',
      name: 'name'
    }
  ])
  .then(department =>{
    db.query('INSERT INTO departments SET ?', department)
  })
  console.log('Success!')
}