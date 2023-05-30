/**
 * GPT4 Prompt
 *     I want to implement handlebars templates.
 *     Convert the html below to a template that does the following:
 *     - Sets the title
 *     - Selects the correct link on both the navbar and drawer list
 *     - Inserts the html into the body
 *     index.html currently looks like this:
 * 
 *     I want to use handlebars to precompile the html pages, and just have raw html pages I server up. How can I do that?
 * 
 *     I have handlebars installed.
 *     Combine the 2 steps into a single node program. I only want to run 1 thing to compile the pages.
 */

const fs = require("fs");
const Handlebars = require("handlebars");

const source = fs.readFileSync("./main.hbs", "utf8");
const template = Handlebars.compile(source);

const pageList = [
	{
		name: "Home",
		id: "index",
		icon: "home",
		body: "<h1>TODO: Home</h1>",
	},
	{
		name: "About",
		id: "about",
		icon: "info",
		body: "<h1>TODO: About</h1>",
	},
	{
		name: "Portfolio",
		id: "portfolio",
		icon: "work",
		body: "<h1>TODO: Portfolio</h1>",
	},
	{
		name: "Contact",
		id: "contact",
		icon: "mail",
		body: "<h1>TODO: Contact</h1>",
	},
];

for (const [index, page] of pageList.entries()) {
	console.log(`Compiling ${page.id}`);
	const html = template({
		title: `Joshua Mayberry: ${page.name}`,
		name: page.name,
		pages: pageList.map((item, i) => ({
			name: item.name,
			id: item.id,
			icon: item.icon,
			active: (i === index),
		})),
		body: page.body,
	});

	fs.writeFileSync(`../${page.id}.html`, html);
}