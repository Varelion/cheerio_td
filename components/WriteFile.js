const fs = require('node:fs');
const path = require('path');

const makeFile = async (fileName, { contentString, ip }) => {
	const now = new Date();
	const dateString =
		now.getFullYear() +
		'-' +
		String(now.getMonth() + 1).padStart(2, '0') +
		'-' +
		String(now.getDate()).padStart(2, '0') +
		'_' +
		String(now.getHours()).padStart(2, '0') +
		'-' + 
		String(now.getMinutes()).padStart(2, '0') +
		'-' + 
		String(now.getSeconds()).padStart(2, '0');

	contentString = `DATE: ${dateString}\nFor ip: ${ip}\n${contentString}`;

	const filepath = path.join(
		__dirname,
		'..',
		'output',
		`${fileName}_${dateString}.txt`
	);

	try {
		// Make sure the directory exists first
		const outputDir = path.join(__dirname, '..', 'output');
		if (!fs.existsSync(outputDir)) {
			fs.mkdirSync(outputDir, { recursive: true });
		}

		// Write the file using a properly wrapped promise
		await new Promise((resolve, reject) => {
			fs.writeFile(filepath, contentString, 'utf16le', (err) => {
				if (err) {
					reject(new Error(`Error writing: ${err.message}`));
				} else {
					console.log(`File successfully written to: ${filepath}`);
					resolve('Success');
				}
			});
		});
	} catch (error) {
		console.error('\nError:\n', error.message, '\n');
	} finally {
		// Code that will run regardless of try/catch result
		console.log('Final completed.');
	}
};

module.exports = { makeFile };
