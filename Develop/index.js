const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const writeFileAsync = util.promisify(fs.writeFile);

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamMembers = [];
const idArray = [];

function getTeamMembers() {
    // Prompt user for questions
    function getManager() {
        return inquirer.prompt([{
                // Prompt for manger name
                type: 'input',
                name: 'managerName',
                message: 'Enter the manager name',
            },
            {
                // Prompt for manger id
                type: 'input',
                name: 'managerId',
                message: 'Enter manager Id',
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
            teamMembers.push(manager);
            // idArray.push(answers.managerId);
            console.log('Team Members: ' + teamMembers);
            console.log('Team Member ID: ' + idArray);
            // createTeam();
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
                console.log('Good Bye!', 'calling teambuilding');
                // After the user has input all employees desired, call the `render` function (required
                // above) and pass in an array containing all employee objects; the `render` function will
                // generate and return a block of HTML including templated divs for each employee!
                render(teamMembers);
                buildTeam();
                process.exit();
            }
        })

    }

    function promptNewMemberInfo() {
        return inquirer.prompt([{
            // Prompt for role
            type: "checkbox",
            message: "What is the user role?",
            name: "role",
            choices: [
                "Engineer",
                "Intern",
            ],

        }]).then(function (userChoice) {
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
                    // console.log("engineerInfo", engineerInfo);
                    const engineer = new Engineer (
                        engineerInfo.engineerName,
                        engineerInfo.engineerId,
                        engineerInfo.engineerEmail,
                        engineerInfo.github);
                    teamMembers.push(engineer);
                    idArray.push(engineer);
                    console.log('Engineer info: ' + teamMembers);
                    console.log('Engineer ID: ' + idArray);
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
                            name: 'internEmail',
                            message: 'Enter intern email'
                        },
                        {
                            // Prompt for intern school
                            type: 'input',
                            name: 'school',
                            message: 'Enter school'

                        }
                    ]).then(function (internInfo) {
                        console.log("internInfo", internInfo);
                        const intern = new Intern (
                            internInfo.internName,
                            internInfo.internId,
                            internInfo.internEmail,
                            internInfo.school);
                            teamMembers.push(intern);
                            idArray.push(internInfo.internId);
                            console.log('Team Members: ' + teamMembers);
                            console.log('Team Member ID: ' + idArray);
                        promptNewMember();
                    })
                }
            }
        })
    }
    // Prompt for team manager
    getManager();
   
// write a function that does fswritefile 
    function buildTeam(){
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
}
// Call function to prompt for team information
getTeamMembers();