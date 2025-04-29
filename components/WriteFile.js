const fs = require('node:fs/promises');
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

		// Using fs.mkdir with recursive option and catching errors if directory already exists
		try {
			await fs.mkdir(outputDir, { recursive: true });
		} catch (err) {
			// Ignore error if directory already exists
			if (err.code !== 'EEXIST') throw err;
		}

		// Write the file using fs/promises
		await fs.writeFile(filepath, contentString, 'utf16le');
		console.log(`File successfully written to: ${filepath}`);

		return 'Success';
	} catch (error) {
		console.error('\nError:\n', error.message, '\n');
	} finally {
		// Code that will run regardless of try/catch result
		console.log('Final completed.');
	}
};

module.exports = { makeFile };
