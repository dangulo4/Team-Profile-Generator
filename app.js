// Require the user interface and file system
const inquirer  = require('inquirer');
const fs        = require('fs');
const util      = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

// Prompt user for questions
function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter team member name'
        },
        {
            type: 'input',
            name: 'Id',
            message: 'Enter team member Id'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter team member email'
        },
        {
            type: "checkbox",
            message: "What is the user role?",
            name: "role",
            choices: [
              "Engineer", 
              "Intern", 
              "Manager" 
            ]
          },
    ])
}

async function init() {
    try {
        const data = await promptUser();
    } catch (err) {
        console.log(err);
    }
}



init();