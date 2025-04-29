const cheerio = require('cheerio');
const Page = require('./components/Page.js');
const { ipList } = require('./components/mockIps.js');
const { log } = require('console');
const { makeFile } = require('./components/WriteFile.js');

// const $ = cheerio.load('<h2 class = "title">Hello</h2>');
const list = [];
async function wikiPage() {
	const newPageClass = new Page(
		'https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3'
	);
	await newPageClass.axiosGetWithTimeout();
	const newPageCheerio = cheerio.load(newPageClass['axiosResponse']);
	return { newPageCheerio: newPageCheerio, newPageClass: newPageClass };
}

async function testParse() {
	const markup = `
<ul class="fruits">
	<li class="fruits__mango"> Mango </li>
	<li class="fruits__apple"> Apple </li>
</ul>
`;

	const $ = cheerio.load(markup);

	// console.log('\nWithout Pretty:\n', $);

	// console.log('\nWith Pretty:\n', pretty($.html()));

	const mango = $('.fruits__mango').parent().children().eq(1).text();
	//.Goes up to the parent,
	//.Gets all children,
	//.Selects the child at index 1 (i.e. the second one),
	//.Extracts its text content.
	//! Once you call .html(), you're no longer working with a jQuery object, so you can't chain .children(1) after it.

	// console.log(mango);

	const allLoop = $('.fruits__mango')
		.parent()
		.children()
		.each((i, element) => {
			// console.log((i, element.attributes));
			// console.log(i);
			// console.log(element.attributes[0]['value']);
		});

	let { newPageCheerio, newPageClass } = await wikiPage();
	// console.log(newPageCheerio);
	const another = await cheerio.fromURL(newPageClass['url']);

	const parse = another('div.plainlist>ul')
		.children()
		.each((e, elem) => {
			thisElement = cheerio.load(elem);
			console.log(thisElement.text());

			return;
		});
	// const sixteenth = another('div.plainlist>ul').children().eq(16);
	// let x = sixteenth.text();
	// console.log(x);
}

async function main() {
	let start = performance.now();
	let elapse;
	i = 0;
	for (const ip of ipList) {
		i++;
		if (i > 3) {
			break;
		}
		const sleep = (ms) =>
			new Promise((resolve) => {
				setTimeout(resolve, ms);
			});
		await sleep(500);

		await makeFile(ip.replaceAll('.', '-'), {
			contentString: 'Mockdata',
			ip: ip
		});
	}
	elapse = performance.now() - start;
	console.log('Total time elapsed: ', elapse / 1000);
}
main();
