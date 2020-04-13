//Include File system module
const fs = require('fs');

/* Main function that populates the full readme data and writes into a new file
 *  Takes 3 parameters:-
 *  1. project specific data responses from the user
 *  2. user's bio from github profile info
 *  3. user's email from github profile info
 */
function generateRmdFile (data,image,_email) {
	/* 
       Readme sections generated into rdata string constructed from user's project specific input
	*/
	let rdata =  `# ${data.project_name}

${data.url}

## Table of Contents
   * [Description](#description)
   * [Usage](#usage)
   * [Installation](#installation)
   * [Badges](#badges)
   * [Contributing](#contributing)
   * [License](#license)
   * [Tests](#tests)
   * [Visuals](#visuals)

## ${data.intro}

## Badges
${data.badges}

## ${data.visuals}

## Installation 
${data.install}

## Usage
\`\`\`${data.usage}
\`\`\`

## ${data.contributing}

## Tests
${data.tests}

## License 
${data.license}

`;
if(data.questions) {
rdata += `## Questions
# ![My Pic](${image})

${_email}
	`;
}

//write the rdata string into an output file
fs.writeFile('generatedReadMe.md',rdata,function (err) {
                if (err) {
                    return console.log(err);
                }
	 console.log("ReadMe generated!!\n");	
	});
}
//export this readme generator as a module
module.exports.generateRmdFile = generateRmdFile;
