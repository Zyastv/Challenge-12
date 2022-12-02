const mysql = require('mysql2')

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employeeManager_db'
  },
  console.log('connected to employeeManager_db')
);
const inquirer = require('inquirer')



const question = () => {
inquirer.prompt([
  {
    message: 'What would you like to do?',
    type: 'list',
    choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments','View Roles', 'View Employees', 'Update Employee Role'],
    name: 'choice'
  }
])
.then(init=> {
  console.log(init)
  
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
    case 'Update Employee Role':
      updateRole();
      
  }
})
}

question()

const addDepartment = () => {
  inquirer.prompt([
    {
      message: 'What is the department name?',
      type: 'input',
      name: 'name'
    }
  ])
  .then(department =>{
    db.query('INSERT INTO departments SET ?', department, err=>{
      if(err) {console.log(err)}
    })
    question()
  })
}

const addRole = () => {
  inquirer.prompt([
    {
      message: "What is the title of the role?: ",
      type: "input",
      name: 'title',
    },
    {
      message: "What is the salary of the role?: ",
      type: "input",
      name: 'salary',
    },
    {
      message: "What is the id of the department for the role?: ",
      type: "input",
      name: 'department_id',
    },
  ])
  .then(role=>{
    db.query('INSERT INTO roles SET ?', role, err=>{
      if(err) {console.log(err)}
    })
    question()
  })
}

async function addEmployee() {
  await inquirer.prompt([
    {
      message: "What is their first name?: ",
      type: "input",
      name: 'first_name',
    },
    {
      message: "What is their last name?: ",
      type: "input",
      name: 'last_name',
    },
    {
      message: "What is the id of the role for the employee?: ",
      type: "input",
      name: 'role_id',
    },
    {
      message: 'Is the employee a manager?',
      type: 'list',
      choices: ['Yes', 'No'],
      name: 'manager'
    }
  ])
  .then(employee=>{
    if(employee.manager === 'Yes'){
    delete employee.manager
    db.query('INSERT INTO employees SET ?', employee, err=>{
      if(err) {console.log(err)}
    })
    } else if (employee.manager === 'No'){
       inquirer.prompt([
        {
          message: 'What is their managers id',
          type: 'input',
          name: 'manager_id'
        }
      ])
      .then(sub => {
        delete employee.manager
        let newEmployee = {
          ...employee,
          ...sub,
        }
        db.query('INSERT INTO employees SET ?', newEmployee, err=>{
          if(err) {console.log(err)}
        })
      })
    }
    console.log('Added Employee!')
  })
  question()
}

const viewDepartments = () => {
  db.query('SELECT * FROM departments', (err, departments) => {
    if(err) {
      console.log(err)
    }
    console.table(departments)
  })
  console.log('\n')
  question()
}

const viewEmployees = () => {
  db.query('SELECT * FROM Employees', (err, employees) => {
    if(err) {console.log(err)}
    console.table(employees)
  })
  console.log('\n')
  question()
}

const viewRoles= () => {
  db.query('SELECT * FROM roles', (err, roles) => {
    if(err) {console.log(err)}
    console.table(roles)
  })
  console.log('\n')
  question()
}

async function updateRole() {
  await inquirer.prompt([
    {
      message: 'What is the id of the employee you would like to update?: ',
      type: 'input',
      name: 'id'
    },
    {
      message: 'What is the role id you would like to update them to?: ',
      type: 'input',
      name: 'role_id'
    }
  ])
  .then(employee=> {
    let newRole = {
      role_id: employee.role_id
    }
    db.query(`UPDATE employees SET ? WHERE id = ${employee.id}`, newRole, err=>{
      if(err) {console.log(err)}
    })
  })
  question()
}



