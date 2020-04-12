//Include File system module
const fs = require('fs');

function generateRmdFile (data,image) {
	let rdata =  `# ${data.project_name}

${data.url}

## ${data.intro}

## ${data.contributing}

## ${data.install}

## ${data.usage}

## ${data.license}

# ![My Pic](${image})
 
	`;
	fs.writeFile('generatedReadMe.md',rdata,function (err) {
                if (err) {
                    return console.log(err);
                }
	 console.log("ReadMe generated!!\n");	
	});
}

module.exports.generateRmdFile = generateRmdFile;
