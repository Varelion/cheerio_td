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
		':' +
		String(now.getMinutes()).padStart(2, '0') +
		':' +
		String(now.getSeconds()).padStart(2, '0');

	contentString = `DATE: ${dateString}\nFor ip: ${ip}\n${contentString}`;

	const filepath = path.join(
		__dirname,
		'..',
		'output',
		`${fileName}_${dateString}.txt`
	);

	try {
		await fs.writeFile(filepath, contentString, 'utf16le', (err) => {
			if (err) {
				throw new Error(`Error writing: ${err.message}`);
			}
		});
		return 'Success';
	} catch (error) {
		console.error('\nError:\n', error.message, '\n');
	} finally {
		// Code that will run regardless of try/catch result
		// Remember, don't have a return in finally.
		console.log('Final completed.');
	}
};

module.exports = { makeFile };
