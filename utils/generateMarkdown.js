//Include File system module
const fs = require('fs');

function generateRmdFile (data) {
	let rdata =  `# ${data.project_name}

${data.intro}
 
	`;
	fs.writeFile('generatedReadMe.md',rdata,function (err) {
                if (err) {
                    return console.log(err);
                }
	 console.log("ReadMe generated!!\n");	
	});
}

module.exports.generateRmdFile = generateRmdFile;
