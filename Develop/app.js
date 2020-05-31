const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
console.log(outputPath);
const render = require("./lib/htmlRenderer");

const employees = [];

const employeeQuestions = [
  { type: "input", name: "name", message: "What is the employee name" },
  { type: "number", name: "id", message: "What is the employee id" },
  { type: "input", name: "email", message: "What is the employee email" },
  {
    type: "list",
    name: "role",
    message: "What is the employee role",
    choices: ["Manager", "Engineer", "Intern"],
  },
];

function getEmployeeInformation() {
  inquirer.prompt(employeeQuestions).then((answers) => {
    if (answers.role === "Manager") {
      inquirer
        .prompt([
          {
            type: "number",
            name: "officeNumber",
            message: "What is the Manager's office number?",
          },
          {
            type: "confirm",
            name: "newemployee",
            message: "Enter another employee?",
          },
        ])
        .then((managerAnswers) => {
          const manager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            managerAnswers.officeNumber
          );
          employees.push(manager);
          if (managerAnswers.newemployee) {
            getEmployeeInformation();
          } else {
            generatePage();
          }
        });
    } else if (answers.role === "Engineer") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "github",
            message: "What is the Engineer's GitHub name?",
          },
          {
            type: "confirm",
            name: "newemployee",
            message: "Enter another employee?",
          },
        ])
        .then((engineerAnswers) => {
          const engineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            engineerAnswers.github
          );
          employees.push(engineer);
          if (engineerAnswers.newemployee) {
            getEmployeeInformation();
          } else {
            generatePage();
          }
        });
    } else if (answers.role === "Intern") {
      inquirer
        .prompt([
          {
            type: "input",
            name: "school",
            message: "What is the Intern's school?",
          },
          {
            type: "confirm",
            name: "newemployee",
            message: "Enter another employee?",
          },
        ])
        .then((internAnswers) => {
          const intern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            internAnswers.school
          );
          employees.push(intern);
          if (internAnswers.newemployee) {
            getEmployeeInformation();
          } else {
            generatePage();
          }
        });
    }
  });
}

function generatePage() {
  const htmlPage = render(employees);

  fs.writeFile(outputPath, htmlPage, () => {
    console.log("employee page generated");
  });
}

getEmployeeInformation();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
