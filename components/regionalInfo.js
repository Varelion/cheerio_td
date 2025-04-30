const regional = {
	lacnic: {
		url: `https://rdap-redirect.lacnic.net/rdap/whois/`,
		rateLimitComment:
			'While specific limits are not detailed in the official documentation, users have reported aggressive rate limiting. For instance, the RDAP service has been observed to allow a maximum of 10 queries per minute, with stricter enforcement in some cases. Can be circumvented with form: \"https://www.lacnic.net/innovaportal/file/688/1/bulkwhoisii-en.pdf\" Application forms sent by fax shall not be accepted. To request access to the Whois data for bulk download:Complete the form and have it signed by the organization\'s legal representative. Send the signed form to hostmaster [at] lacnic [.] net If your request is approved, you must send the original copy by post to the following address: LACNIC / Subject: Bulk Whois Request / Rambla República de México 6125, Montevideo, Uruguay CP 11400'
	},
	ripe: {
		rateLimitComment:
			'Number of personal data sets returned in queries from an IP address[1] – 1,000 per 24 hours'
	},
	apnic: {
		rateLimitComment: 'Not specified.'
	},
	arin: {
		rateLimitComment: 'Daily limit of 20,000 requests per day.'
	},
	afrinic: {
		rateLimitComment: 'Default daily limit of 5,000 per IP address.'
	}
};

module.exports = { regional };
