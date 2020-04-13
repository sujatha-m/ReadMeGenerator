//Include inquirer module for getting user selected prompts.
const inquirer = require("inquirer");

//Include github information module
const gitif = require("./utils/api");

//Include readme generator module
const crme = require("./utils/generateMarkdown");

//Constants to hold the badge URLs
const gf_badge =
  "[![gf](https://img.shields.io/github/followers/sujatha-m?style=social)](https://img.shields.io/github/followers/sujatha-m?style=social)\n";
const rel_badge =
  "[![rel](https://img.shields.io/github/repo-size/sujatha-m/Portfoliov2.0)](https://img.shields.io/github/repo-size/sujatha-m/Portfoliov2.0)\n";
const stat_badge =
  "[![stat](https://img.shields.io/website?url=https%3A%2F%2Fsujatha-m.github.io%2FWeather-Dashboard%2FDevelop%2F)](https://img.shields.io/website?url=https%3A%2F%2Fsujatha-m.github.io%2FWeather-Dashboard%2FDevelop%2F)\n";
const rat_badge =
  "[![rat](https://img.shields.io/redmine/plugin/stars/redmine_xlsx_format_issue_exporter?color=purple)](https://img.shields.io/redmine/plugin/stars/redmine_xlsx_format_issue_exporter?color=purple)\n";

//First question asked to get user's github name
const entry_question = {
  type: "input",
  // The fist input text is assigned to github_username variable.
  name: "github_username",
};

// Questions related to project which helps in building ReadMe content
const project_attributes = [
  {
    type: "input",
    name: "project_name",
  },
  {
    type: "input",
    name: "url",
    message: "Please add url link to the deployed app",
  },
  {
    type: "editor",
    name: "intro",
    message: "Please provide a description to your project",
    default: "Description\n",
  },
  {
    type: "checkbox",
    name: "badges",
    message: "Please select badges from the options",
    choices: ["GithubFollow", "reposize", "status", "rating"],
  },
  {
    type: "editor",
    name: "visuals",
    message: "Please add links to your project screenshots",
    default: "Visuals\n",
  },
  {
    type: "editor",
    name: "install",
    message: "Please provide installation instructions to your project",
    default:
      "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
  },
  {
    type: "editor",
    name: "usage",
    message: "Please provide usage instructions to your project",
    default: `sh
        Provide instructions and examples for use. Include screenshots as needed.`,
  },
  {
    type: "list",
    name: "license",
    message: "Please select licenses for your project",
    choices: ["MIT", "Mozilla", "Apache2", "GPL"],
    //This filter creates the relevant path based on user selected value
    filter: function (val) {
      if (val === "MIT") {
        val = "[MIT](https://choosealicense.com/licenses/mit/)";
      } else if (val === "Mozilla") {
        val = "[Mozilla2.0](https://choosealicense.com/licenses/mpl-2.0/)";
      } else if (val === "Apache2") {
        val = "[Apache2](https://choosealicense.com/licenses/apache-2.0/)";
      } else if (val === "GPL") {
        val = "[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)";
      }
      return val;
    },
  },
  {
    type: "editor",
    name: "contributing",
    message: "Please specify Contributing info for your project",
    //Default content of contributing section
    default: function () {
      return `Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.`;
    },
  },
  {
    type: "editor",
    name: "tests",
    message: "Please provide testing details for your project",
    default:
      "Go the extra mile and write tests for your application.\n Then provide examples on how to run them.",
  },
  {
    type: "confirm",
    name: "questions",
    message:
      "Please confirm if email and github profile image can be included in ReadMe",
    //Optional for user to confirm whether to include github profile and Email in ReadMe
    default: "false",
  },
];

// Prompt and get user input then process the data.
inquirer.prompt(entry_question).then((response) => {
  //Get github details for the username provided
  let ghdata = gitif.getGitHubDetails(response.github_username);
  let count = 0; //Count to hold the number of badges selected by user
  let result = ""; //Holds the badges URL generated based on user selection

  //Process the user input data
  ghdata.then((data) => {
    inquirer.prompt(project_attributes).then((responses) => {
      console.log(JSON.stringify(responses, null, " "));

      //console.log(responses.badges[1]);
      //loop through all of badge choices selected to append all the badges
      for (let i = 0; i < 4; i++) {
        if (responses.badges[i] === "GithubFollow") {
          if (count === 0) {
            result = gf_badge;
          } else {
            result += gf_badge;
          }
          count++;
        }
        if (responses.badges[i] === "status") {
          if (count === 0) {
            result = stat_badge;
          } else {
            result += stat_badge;
          }
          count++;
        }
        if (responses.badges[i] === "reposize") {
          if (count === 0) {
            result = rel_badge;
          } else {
            result += rel_badge;
          }
          count++;
        }
        if (responses.badges[i] === "rating") {
          if (count === 0) {
            result = rat_badge;
          } else {
            result += rat_badge;
          }
          count++;
        }
      }
      responses.badges = result; //overrwrite badges response with the final constructed value
      //Call readme generator module function
      crme.generateRmdFile(responses, data.avatar_url, data.email);
    });
  });
});
