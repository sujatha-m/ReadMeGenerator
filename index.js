// Include prompt module.
const inquirer = require('inquirer');

//Include File system module
const fs = require('fs');

const gitif = require('./utils/api');
const crme = require('./utils/generateMarkdown');

//First question asked to get user's github name
const entry_question = {
    type: 'input',
    // The fist input text is assigned to github_username variable.
    name: 'github_username'
    //message: 'Please Enter your github username'	
};


// This json object is used to configure what data will be retrieved from command line.
const project_attributes = [
    {
	type: 'input',     
        // The fist input text is assigned to username variable.
        name: 'project_name',
    },
    {
	    type: 'editor',
	    name: 'url',
        message: 'Please add url link to the deployed app',
        default: '**Deployed Web URL**'
    },
    {
	    type: 'editor',
	    name: 'intro',
        message: 'Please provide a description to your project',
        default: 'Description'
    },
    {
	    type: 'editor',
	    name: 'install',
        message: 'Please provide installation instructions to your project',
        default: 'Installation'
    },
    {
	    type: 'editor',
	    name: 'usage',
        message: 'Please provide usage instructions to your project',
        default: 'Usage'
    },
    {
	    type: 'editor',
	    name: 'license',
        message: 'Please specify licenses for your project',
        default: `License
[MIT](https://choosealicense.com/licenses/mit/)`
    },
    {
	    type: 'editor',
	    name: 'contributing',
        message: 'Please specify Contributing info for your project',
        default: function() {
            return `Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.`;
        }
    }
];

// Prompt and get user input then display those data in console.
//inquirer.prompt(prompt_attributes).then(responses => {
inquirer.prompt(entry_question).then(response => {
    let ghdata = gitif.getGitHubDetails(response.github_username);

    ghdata.then(data => {
        inquirer.prompt(project_attributes).then(responses => {
            console.log(JSON.stringify(responses, null, ' '));

	    console.log(data.avatar_url);
	    crme.generateRmdFile(responses,data.avatar_url);
        });
    })
    //TODO:- Handle error status from axios guthub response	
});
