const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const util = require('util'); 

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require("./lib/htmlRenderer");

const writeFileAsync = util.promisify(fs.writeFile);

// Prompt user for questions
function promptUser() {
    return inquirer.prompt([{
            // Prompt for manger name
            type: 'input',
            name: 'managerName',
            message: 'Enter the manager name'
        },
        {
            // Prompt for manger id
            type: 'input',
            name: 'managerId',
            message: 'Enter manager Id'
        },
        {
            // Prompt for manager email
            type: 'input',
            name: 'managerEmail',
            message: 'Enter manager email'
        },
        {
            // Prompt for office number
            type: 'input',
            name: 'officeNumber',
            message: 'Enter office number'
        }
    ]).then(function (answers) {
        console.log("answers", answers);
        const manager = new Manager(
            answers.managerName, 
            answers.managerId, 
            answers.managerEmail, 
            answers.officeNumber);
        promptNewMember();
    })
}

function promptNewMember() {
    return inquirer.prompt([{
        // Prompt for new team member
        type: 'confirm',
        name: 'choice',
        message: 'Would you like to enter a new team member?',
        default: true,

    }]).then(function (answers) {
        console.log(answers);
        //Only ask this info if the ans is YES 
        if (answers.choice) {
            //Prompt for TEAM  INFO
            promptNewMemberInfo();
        } else {
            //IF no exit the application 
            console.log('Good Bye!');
            process.exit();
        }
    })

}

function promptNewMemberInfo() {
    return inquirer.prompt([
    {
        // Prompt for role
        type: "checkbox",
        message: "What is the user role?",
        name: "role",
        choices: [
            "Engineer",
            "Intern",
        ],

    }
]).then(function (userChoice) {
        // console.log(userChoice); 
        if (userChoice.role == "Engineer") {
            //CAll ADD ENGINEER CODE 
            inquirer.prompt([{
                    // Captures the Engineer name
                    type: 'input',
                    name: 'engineerName',
                    message: 'Enter the engineer name'

                },
                {
                    // Capture engineer id
                    type: 'input',
                    name: 'engineerId',
                    message: 'Enter engineer Id'

                },
                {
                    // Capture engineer email
                    type: 'input',
                    name: 'engineerEmail',
                    message: 'Enter engineer email'

                },
                {
                    // Capture github username
                    type: 'input',
                    name: 'github',
                    message: 'Enter github username'

                }
            ]).then(function (engineerInfo) {
                console.log("engineerInfo", engineerInfo);
                promptNewMember();
            })
        } else {
            if (userChoice.role == 'Intern') {

                inquirer.prompt([{
                        // Capture Intern info
                        type: 'input',
                        name: 'internName',
                        message: 'Enter the intern name'

                    },
                    {
                        // Prompt for intern id
                        type: 'input',
                        name: 'internId',
                        message: 'Enter intern Id'

                    },
                    {
                        // Prompt for intern email
                        type: 'input',
                        name: 'engineerEmail',
                        message: 'Enter intern email'
                    },
                    {
                        // Prompt for intern school
                        type: 'input',
                        name: 'github',
                        message: 'Enter school'

                    }
                ]).then(function (internInfo) {
                    console.log("internInfo", internInfo);
                    promptNewMember();
                })
            }
        }
    })
}

async function init() {
    try {
        const data = await promptUser();
        
        

    } catch (err) {
        console.log(err);
    }
}

init();

