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

// See: https://blog.teamtreehouse.com/handlebars-js-part-3-tips-and-tricks
Handlebars.registerHelper("debug", function(optionalValue) {
	console.log("Current Context");
	console.log("====================");
	console.log(this);

	if (optionalValue) {
		console.log("Value");
		console.log("====================");
		console.log(optionalValue);
	}
});

const folderPath = ((require.main === module) ? "." : "./templates");
const rootPath = ((require.main === module) ? ".." : ".");




const source = fs.readFileSync(`${folderPath}/main.hbs`, "utf8");

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
		sections: [
			"Work Experience",
			"Skills",
			"Education",
		],
		workExperience: [
			{
				title: "Full Stack Developer",
				company: "Vineyards MG",
				start: "May 2023",
				end: "Present",
				position: "Lead Developer",
				description: "Implement, maintain, and troubleshoot processes to daily and automatically collect data from various API sources and store it in an optimized PostgreSQL database. Develop and deploy connectors for gathering and displaying that data in the form of Custom Power BI Visuals, Custom Formsite widgets, Zapier python modifiers, Retool apps. Manage communicating priorities to 3 developers across the world; being available to them to help with difficulties and relaying their progress, requests, and concerns to the department head.",
			},
			{
				title: "Technology Applications Engineer",
				company: "Decatur Mold",
				start: "May 2018",
				end: "Feb 2021",
				position: "Full Stack Development and Technology Integration",
				description: "Implement, maintain, and troubleshoot technologies that increase work efficiency, allow data exploration from multiple sources, alert users of possible issues, help comply with CMMC, or automate repetitive tasks. All applications must be reliable and easily used by even the most technologically challenged. Some applications to do this were a NodeJS Intranet site (with JavaScript, HTML, and CSS), Automated emails, Python programs, SalesForce, Excel Power Queries, Dundas BI Dashboards, and a bar-coded inventory. Use Trello cards to implement a ticketing system for all projects.",
			},
			{
				title: "Controls Engineer",
				company: "Valeo",
				start: "Aug 2016",
				end: "May 2018",
				position: "Programming Robots and Logic Controllers",
				description: "Program, maintain, and troubleshoot automated manufacturing systems using a combination of the following: Siemens PLC and HMI, Motoman robots, BOA cameras, Cognex cameras, ASG screwdrivers, Intelliaim, Python programs I write myself, Various digital and analog sensors.",
			},
			{
				title: "Numerical Methods TA",
				company: "BYU-Idaho",
				start: "2016",
				end: "2016",
				position: "Python Programming Tutor",
				description: "Helped students create programs using python that would find the roots of equations, solve differential equations, create curve fits for data, and analyze digital images. I would also grade assignments and projects.",
			},
			{
				title: "STEM Instructor",
				company: "Boys and Girls Club",
				start: "2015",
				end: "2015",
				position: "STEM Guy",
				description: "Visited one of five clubs each day to do STEM activities with underprivileged children. Some of these activities included creating basic pneumatic robotics, object orient programming with Game Maker, soldering, snap circuits, rain gutter regattas, and owl pellet dissection.",
			},
			{
				title: "Engineering Intern",
				company: "Highland West Energy and Mountain West Mechanical",
				start: "2014",
				end: "2014",
				position: "Internship",
				description: "Designed a Waste-to-Energy plant from the ground up, gathered data for & simulated feasibility studies for CHP units in over 15 different buildings, and did takeoffs and submittals for two major construction projects during my time as an intern.",
			},
			{
				title: "CAD Designer",
				company: "Emergency Zone",
				start: "2013",
				end: "2013",
				position: "Product Design",
				description: "Primary CAD designer for three products for the companies Emergency Zone and Intermountain Brands. These include two stoves and a baby formula container. All three are in production by factories overseas.",
			},
		],
		education: [
			{
				period: "2010-2011, 2013-2016",
				degree: "Bachelors of Science in Mechanical Engineering",
				institution: "BYU-Idaho",
			}
		],
		softwareSkills: [
			"Dundas BI and Power BI",
			"Custom Power BI Visuals",
			"NodeJS and Django",
			"Retool and Formsite",
			"Zapier",
			"GIMP and InkScape",
			"Android Studio",
			"Solid Works",
			"Simens TIA Portal",
			"Mathematica",
			"Adobe Premiere Pro",
			"Audacity",
			"MS Excel",
			"Trello",
		],
		programmingSkills: [
			"Python",
			"ZPL (Used by Zebra Barcode Printers)",
			"HTML, CSS, JavaScript, & PHP",
			"jQuery, Bootstrap, GreenSock",
			"TypeScript",
			"Java (Basic)",
			"SQLite, MySQL, & PostgreSQL",
			"C++",
			"PLC Ladder Logic",
			"LaTeX",
			"Open CV (Basic)",
			"Raspberry Pi & Arduino",
			"MS VBA (Visual Basic for Applications) & Power Query",
		],
		certificates: [
			{
				title: "SolidWorks Associate - Mechanical Design",
				awardedBy: "Dassault Systems",
				date: "22 Nov 2014",
			},
			{
				title: "SolidWorks Associate - Simulation",
				awardedBy: "Dassault Systems",
				date: "22 Nov 2014",
			},
			{
				title: "Getting Started with Python",
				awardedBy: "University of Michigan",
				date: "10 June 2016",
			},
			{
				title: "Python Data Structures",
				awardedBy: "University of Michigan",
				date: "21 July 2016",
			},
			{
				title: "Using Python to Access Web Data",
				awardedBy: "University of Michigan",
				date: "26 February 2017",
			},
			{
				title: "Using Databases with Python",
				awardedBy: "University of Michigan",
				date: "28 April 2017",
			},
			{
				title: "Android Basics Nanodegree",
				awardedBy: "Udacity",
				date: "8 January 2019",
			},
			{
				title: "Microsoft Power BI",
				awardedBy: "Udemy",
				date: "13 Aug 2019",
			},
		],
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
	console.log(`Compiling HBS ${page.slug}`);

	const bodySource = fs.readFileSync(`${folderPath}/${page.slug}.hbs`, "utf8");
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

	fs.writeFileSync(`${rootPath}/${page.slug}.html`, html);
}