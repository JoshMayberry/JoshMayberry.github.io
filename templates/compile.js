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
 * 
 *     I want the body section to be another handlebars file.
 */

const fs = require("fs");
const Handlebars = require("handlebars");

const source = fs.readFileSync("./main.hbs", "utf8");

const pageList = [
	{
		name: "Home",
		slug: "index",
		icon: "home",
	},
	{
		name: "Resume",
		slug: "resume",
		icon: "description",
	},
	{
		name: "Portfolio",
		slug: "portfolio",
		icon: "work",
	},
	{
		name: "About",
		slug: "about",
		icon: "info",
	},
	{
		name: "Contact",
		slug: "contact",
		icon: "mail",
		linkedin_posts: [
			{
				title: "Buckle Up!",
				urn: "7067186262041907200",
			},
			{
				title: "Automation",
				urn: "7068968961165426688",
			},
			{
				title: "Unfamiliar Territory",
				urn: "7067535011658280960",
			},
			{
				title: "Power Query",
				urn: "7070062918557429760",
			},
			{
				title: "SQL",
				urn: "7067896672114106369",
			},
			{
				title: "Mentoring",
				urn: "7066840243143905280",
			},
			{
				title: "JavaScript",
				urn: "7069350380333125633",
			},
			{
				title: "Python",
				urn: "7069700427809734656",
			},
		],
	},
];

for (const [index, page] of pageList.entries()) {
	console.log(`Compiling ${page.slug}`);

	const bodySource = fs.readFileSync(`./${page.slug}.hbs`, "utf8");
	Handlebars.registerPartial("body", bodySource);

	const template = Handlebars.compile(source);
	const html = template({
		...page,
		title: `Joshua Mayberry: ${page.name}`,
		pages: pageList.map((item, i) => ({
			...item,
			active: (i === index),
		})),
	});

	fs.writeFileSync(`../${page.slug}.html`, html);
}