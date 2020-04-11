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
	    name: 'intro',
	    message: 'Please provide a short introduction to your project'
    }
];

// Prompt and get user input then display those data in console.
//inquirer.prompt(prompt_attributes).then(responses => {
inquirer.prompt(entry_question).then(response => {
    let ghdata = gitif.getGitHubDetails(response.github_username);

    ghdata.then(data => {
        inquirer.prompt(project_attributes).then(responses => {
            console.log(JSON.stringify(responses, null, ' '));

	    console.log(data.name);
	    crme.generateRmdFile(responses);	
        });
    })
    //TODO:- Handle error status from axios guthub response	
});
