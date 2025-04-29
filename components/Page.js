const cheerio = require('cheerio');
const axios = require('axios');

class Page {
	url;
	axiosResponse;
	cheerioHTML;
	rawHtml;

	constructor(url) {
		this.url = url;
	}

	/**
	 * An HTTP Get request wit Axios that will cancel out if it runs over the alotted time.
	 *
	 * @async
	 * @param {*} url The url we will fetch from.
	 * @param {number} [timeout=5_000] How long (in MS) we are willing to wait for a response. 5second default.
	 * @returns {*}
	 */
	async axiosGetWithTimeout(timeout = 5_000, headers = {}) {
		const controller = new AbortController();

		const timeoutId = setTimeout(() => {
			controller.abort();
		}, timeout);

		try {
			const response = await axios.get(this.url, {
				signal: controller.signal // Link the controller so we can cancel if needed
			});

			// If the request succeeded before the timeout, return the response data
			this.axiosResponse = response.data;
			return this.axiosResponse;
		} catch (error) {
			// Check if axios specifically identifies this error as a cancellation

			if (axios.isCancel(error)) {
				console.error('Request was cancelled.');
			} else if (error.name === 'CanceledError') {
				// If the request was aborted using AbortController (usually due to timeout)
				console.error('Request aborted due to timeout');
			} else {
				// Handle any other generic errors (network failure, bad URL, etc.)
				console.error(
					`\n###\n An Error has occurred at the Page.js' axiosGetWithTimeout: \nFile: ${new Error().stack.split('\n')[1].trim()}, ${error}\n###\n`
				);
				console.error(this.url);
			}
		} finally {
			// Weather the request succeeded, failed, or timed out, we always:
			// Clear the timer so it doesn't stay in memory.
			clearTimeout(timeoutId);
		}
	}

	async cheerioGet(headers = {}) {
		try {
			this.cheerioHTML = await cheerio.fromURL(this.url);
			return this.cheerioHTML;
		} catch (error) {
			console.error('\nError:\n', error.message, '\n');
		} finally {
			console.log('Finished cheerioGet operation.');
		}
	}
}

module.exports = Page;
