/**
 * GPT 4 Prompt
 * 
 *     Lets generate the content for the skills section (Combine software skills and programming skills into the same tab).
 * 
 *     Use a `D3.js` to generate a bubble chart that has free-floating bubbles that contain all the various skills.
 *     Similar skills should gravitate towards each other and if they reach the edge of the SVG they should bounce off the edge.
 * 
 * 
 *     Make the svg resize to fill the available space on the screen.
 *     Instead of making it the height and width of the window, get the height and width of the available space to it.
 *     Perhaps it needs a parent that is always exactly the correct size?
 *     The simulation's center force should be updated in the event listener too.
 * 
 * 
 *     The simulation should stay live and the balls continue to slightly drift around.
 *     Reheat the simulation every time the mouse moves in the SVG, and keep it heated for at least 10 seconds.
 *     Also throttle the mouse event to only trigger once every second.
 *     Create your own throttle function instead of using one from lodash.
 * 
 * 
 *     The balls should have the skill name on them.
 *     Some of the text is too long to fit in the bubbles. How can I use multilines to fit it?
 * 
 *     Move the code for `Split each label into separate words` into its own function and have it clear out all tspan elements before adding new ones.
 *     The text elements are centered before splitting them up. Center them after they are split up.
 * 
 * 
 *     If the balls touch the edge of the svg, have them bounce back in (they should not clip out).
 * 
 * 
 *     I will add a droplist to switch between how things are grouped. This is good for one option.
 *     Add 4 more possible ways to group them, more if you can think of others.
 *     Let's have the options be an array for `group`; the droplist will select which index we get the groups from.
 *     I want another group for something like "what language is this primarily used for"? For example, Flask would be grouped with Python and NodeJS would be grouped with JavaScript.
 * 
 *     Let's add the droplist now.
 *     Add a FAB button in the top-right corner of the page.
 *     When the user clicks this, open a `MDCMenu` that gives the list that the user can select how to group things by.
 *     
 *     I added the following CSS to the fab button to make it float on the right side of the page:
 *     Now, I need the menu to appear below it. Currently, it still appears on the left side of the page.
 *     I also want the menu to show the currently selected option.
 * 
 * 
 *     When the user hovers over a ball, it should use an svg filter to increase the brightness slightly.
 *     The user should be able to click and drag the balls around.
 *     If the user just clicks on one of them, have a popup appear that explains what the skill is.
 *     (We will come up with a list of what is actually said later).
 * 
 *     Let's do the popup window now. Use a MDCDialog for this. The dialog should dismiss if the user clicks outside it.
 * 
 *     I want to add another attribute to the catalogues named "description" that will have a brief explanation of what this skill is. Include any relevant references to the resume given at the beginning.
 *     When talking about the resume connections, make it as if I were speaking (For example use, "I" instead of "you").
 *     You do not need to print out the entire dictionary list, just give me a list of the skill `name` and it's corresponding `description`.
 */

function throttle(func, limit) {
	let lastFunc;
	let lastRan;
	return function() {
	const context = this;
	const args = arguments;
	if (!lastRan) {
		func.apply(context, args);
		lastRan = Date.now();
	} else {
		clearTimeout(lastFunc);
		lastFunc = setTimeout(function() {
		if ((Date.now() - lastRan) >= limit) {
			func.apply(context, args);
			lastRan = Date.now();
		}
		}, limit - (Date.now() - lastRan));
	}
	}
}

const skills = [
	// Array structure: [Name, Category, Skill type, Use case, Complexity, Industry relevance, Primary Language]
	{name: "Python", group: ["Programming Language", "Back-end", "General", "High", "High Tech", "Python"], size: 90, description: "A versatile and powerful programming language that I've extensively used for data analysis, web development, and automation in my previous roles."},
	{name: "JavaScript", group: ["Programming Language", "Front-end", "Web Development", "High", "High Tech", "JavaScript"], size: 80, description: "A key language for web development. I've used it extensively for both front-end and back-end development."},
	{name: "SQLite", group: ["Programming Language", "Database", "Data Storage", "Medium", "High Tech", "SQL"], size: 60, description: "A lightweight, file-based database system. I've used it for data storage at Valeo and for other small projects."},
	{name: "MySQL", group: ["Programming Language", "Database", "Data Storage", "Medium", "High Tech", "SQL"], size: 60, description: "A popular open-source relational database system I used during my time at Decatur Mold."},
	{name: "PostgreSQL", group: ["Programming Language", "Database", "Data Storage", "Medium", "High Tech", "SQL"], size: 60, description: "A powerful, open source object-relational database system. I used it during my time at Vineyards MG."},
	{name: "HTML", group: ["Markup Language", "Front-end", "Web Development", "Low", "Web Design", "HTML"], size: 55, description: "The standard markup language for web pages. I've used it in all my web development projects."},
	{name: "CSS", group: ["Style Sheet Language", "Front-end", "Web Development", "Low", "Web Design", "CSS"], size: 55, description: "A stylesheet language used for describing the look and formatting of a document written in HTML. I've used it alongside HTML in all my web development projects and in Custom Power BI Visuals."},
	{name: "Power Query", group: ["Programming Language", "Data Transformation", "Data Processing", "Medium", "Finance", "M"], size: 70, description: "A data connection technology used in Power BI and Excel. It is used for data discovery, cleanup, manipulation, transformation, and enrichment."},
	{name: "PHP", group: ["Programming Language", "Back-end", "Web Development", "Medium", "High Tech", "PHP"], size: 35, description: "A server-side scripting language that I used at Decatur Mold, but then later transitioned things to NodeJS."},
	{name: "Java", group: ["Programming Language", "Back-end", "App Development", "High", "High Tech", "Java"], size: 35, description: "A high-level, class-based, object-oriented programming language. I've used it when programming simple Android Apps."},
	{name: "C++", group: ["Programming Language", "Back-end", "High Performance Computing", "High", "High Tech", "C++"], size: 35, description: "A statically typed, compiled, general-purpose language known for its performance. I learned it in college, and keep it in mind when working with languages that build off it such as Python."},
	{name: "LaTeX", group: ["Markup Language", "Document Preparation", "Publishing", "Medium", "Academia", "LaTeX"], size: 35, description: "A high-quality typesetting system I use to generate documentation for big projects and tickets for complex issues."},
	{name: "MS VBA", group: ["Programming Language", "Automation", "Office Automation", "Low", "Office Automation", "VBA"], size: 35, description: "VBA (Visual Basic for Applications) is used within Excel (and other MS Office apps) to automate operations. I used it extensively at Decatur Mold."},
	{name: "PLC Ladder Logic", group: ["Programming Language", "Real-time Control", "Industrial Control", "High", "Industrial Automation", "Ladder Logic"], size: 30, description: "A graphical programming language used to develop software for programmable logic controllers. I used it at Valeo."},
	
	// Libraries/Frameworks
	{name: "NodeJS", group: ["Library/Framework", "Back-end", "Web Development", "High", "High Tech", "JavaScript"], size: 70, description: "An open-source, JavaScript runtime environment. I used it at both Decatur Mold and Vineyards MG to create intranet and internet sites (and APIs) respectively."},
	{name: "jQuery", group: ["Library/Framework", "Front-end", "Web Development", "Low", "Web Design", "JavaScript"], size: 50, description: "A fast, small, and feature-rich JavaScript library. I used it a lot at Decatur Mold for their portal site and Custom Dundas BI Visuals."},
	{name: "GreenSock", group: ["Library/Framework", "Front-end", "Web Animation", "Low", "Web Design", "JavaScript"], size: 50, description: "A JavaScript library for high-performance HTML5 animations that work in all major browsers. I've used it in web projects requiring complex animations."},
	{name: "D3", group: ["Library/Framework", "Data Visualization", "Web Development", "Medium", "Data Analysis", "JavaScript"], size: 50, description: "A JavaScript library for producing dynamic, interactive data visualizations. I've used it for creating complex data visualizations in several projects."},
	{name: "TypeScript", group: ["Programming Language", "Front-end", "Web Development", "Medium", "High Tech", "TypeScript"], size: 45, description: "A strict syntactical superset of JavaScript that adds static typing. I've used it to build robust and maintainable code in my JavaScript projects."},
	{name: "ZPL", group: ["Programming Language", "Printer Command", "Hardware Control", "Medium", "Manufacturing", "ZPL"], size: 35, description: "A programming language from Zebra Technologies, specifically used for designing and controlling the printing of labels. I used it at both Valeo and Decatur Mold for assembly lines and warehouse management respectively."},
	{name: "Flask", group: ["Library/Framework", "Back-end", "Web Development", "Medium", "High Tech", "Python"], size: 35, description: "A lightweight web application framework. I used it at Vineyards MG to allow people to request a python routine run off-schedule to update a portion of teh database."},
	{name: "Django", group: ["Library/Framework", "Back-end", "Web Development", "High", "High Tech", "Python"], size: 35, description: "A high-level Python web framework. I used it for a while at Vineyards MG and we later transitioned things to NodeJS."},
	{name: "Selenium", group: ["Library/Framework", "Testing", "Web Testing", "Medium", "Quality Assurance", "Python"], size: 35, description: "A tool for web browser automation. I learned it so we can scrape information from sites that do not have an API and we have gotten their concent to scrape the website, but have yet been able to put that into practice. I also plan to use it for future web application unit testing."},
	{name: "Puppeteer", group: ["Library/Framework", "Web Scraping", "Data Collection", "Medium", "Data Analysis", "JavaScript"], size: 35, description: "A Node.js library for controlling headless Chrome or Chromium browsers. I learned it so we can scrape information from sites that do not have an API and we have gotten their concent to scrape the website, but have yet been able to put that into practice. I also plan to use it for future web application unit testing."},
	{name: "Open CV", group: ["Library/Framework", "Computer Vision", "AI", "High", "High Tech", "Python"], size: 30, description: "An open source computer vision and machine learning software library. I thought it was cool, so I learned how to do a few small things with it. Hopefully I will get to use it professionally some day."},
	
	// Hardware / Devices
	{name: "Raspberry Pi", group: ["Hardware/Device", "Microcomputer", "Embedded Systems", "Medium", "Internet of Things", "Python"], size: 30, description: "A small, affordable computer that I used in college to make a robot hand that played chess."},
	{name: "Arduino", group: ["Hardware/Device", "Microcontroller", "Embedded Systems", "Medium", "Internet of Things", "C++"], size: 30, description: "An open-source electronics platform that I used in college to make a robot hand that played chess."},

	// Software Tools
	{name: "Custom Power BI Visuals", group: ["Software Tool", "Data Visualization", "Business Intelligence", "Medium", "Data Analysis", "DAX"], size: 70, description: "This represents my ability to create custom visuals in Power BI, a skill I've used in many data analysis and visualization projects."},
	{name: "MS Excel", group: ["Software Tool", "Data Analysis", "Business Intelligence", "Low", "Office Automation", "VBA"], size: 60, description: "A common spreadsheet program."},
	{name: "Power BI", group: ["Software Tool", "Data Visualization", "Business Intelligence", "Medium", "Data Analysis", "DAX"], size: 50, description: "A business analytics tool from Microsoft. We used it at Vineyards MG."},
	{name: "Dundas BI", group: ["Software Tool", "Data Visualization", "Business Intelligence", "Medium", "Data Analysis", "JavaScript"], size: 50, description: "A business intelligence and data visualization software. We used it at Decatur Mold."},
	{name: "Trello", group: ["Software Tool", "Project Management", "Productivity", "Low", "Project Management", "No specific language"], size: 45, description: "A web-based Kanban-style list-making application. I've used Trello for project management and team collaboration."},
	{name: "Retool", group: ["Software Tool", "Internal Tools", "Productivity", "Medium", "Internal Tools", "JavaScript"], size: 35, description: "A platform that enables developers to quickly build internal tools. We used it at Vineyards MG to create prototypes that we later would recreate in a more stable system."},
	{name: "Formsite", group: ["Software Tool", "Form Builder", "Productivity", "Low", "Office Automation", "No specific language"], size: 35, description: "An online form and survey builder they used at Vineyards MG. I created several custom widgets for it and had Python routines that would backup the results in our own database."},
	{name: "Mathematica", group: ["Software Tool", "Computational Software", "Research", "High", "Research", "Wolfram Language"], size: 30, description: "A technical computing system that involves symbolic and numerical computation, visualization, and programming. I used it in college and sometimes use their website to simplify complex boolean expressions."},
	{name: "Zapier", group: ["Software Tool", "Workflow Automation", "Productivity", "Low", "Office Automation", "No specific language"], size: 30, description: "An online automation tool that connects apps and services. We used it at Vineyards MG to drive automation."},
	{name: "GIMP", group: ["Software Tool", "Image Editing", "Graphic Design", "Low", "Graphic Design", "No specific language"], size: 30, description: "A free and open-source raster graphics editor. I've used GIMP for image editing tasks."},
	{name: "InkScape", group: ["Software Tool", "Vector Graphics", "Graphic Design", "Low", "Graphic Design", "No specific language"], size: 30, description: "A free and open-source vector graphics editor. I've used InkScape to create and edit SVG images."},
	{name: "Android Studio", group: ["Software Tool", "App Development", "Mobile Development", "High", "Mobile Development", "Java"], size: 30, description: "The official integrated development environment for Google's Android operating system. I've used it to develop simple apps."},
	{name: "Solid Works", group: ["Software Tool", "3D CAD", "Mechanical Design", "High", "Engineering Design", "No specific language"], size: 30, description: "A solid modeling computer-aided design (CAD) and computer-aided engineering (CAE) program. I used it in college and for creating several products sold by Emergency Zone."},
	{name: "Simens TIA Portal", group: ["Software Tool", "Industrial Automation", "Control Systems", "High", "Industrial Automation", "Ladder Logic"], size: 30, description: "A software platform by Siemens that integrates automation software tools. I used it at Valeo to program and troubleshoot Siemens PLCs and HMIs."},
	{name: "Adobe Premiere Pro", group: ["Software Tool", "Video Editing", "Media Production", "High", "Media Production", "No specific language"], size: 30, description: "A timeline-based video editing software application. I used it extensively in high school for editing and producing videos for both fun and film festivals."},
	{name: "Audacity", group: ["Software Tool", "Audio Editing", "Media Production", "Low", "Media Production", "No specific language"], size: 30, description: "A free and open-source digital audio editor and recording application. I've used it for recording and editing audio files."},
];

let colorScale;
const radiusScale = d3.scaleSqrt().domain([1, 100]).range([10, 80]);
let selectedGroup = 0;

let svg;
let labels;
let bubbles;
let container;
let simulation;
function updateDimensions() {
	const width = container.node().getBoundingClientRect().width;
	const height = container.node().getBoundingClientRect().height;

	svg.attr("viewBox", "0 0 " + width + " " + height);

	// Apply the many-body force in the simulation
	simulation
		.force("center", d3.forceCenter(width / 2, height / 2));
}

function updateWords() {
	labels.each(function(d) {
		const label = d3.select(this),
			words = d.name.split(/\s+/).reverse(),
			radius = radiusScale(d.size);

		label.selectAll("tspan").remove();

		let line = [],
			lineNumber = 0,
			lineHeight = 1.1, // ems
			y = 0,
			x = 0,
			dy = 0,
			word,
			tspan = label.append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			
		while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(" "));
			if (tspan.node().getComputedTextLength() > (radius * 2)) {
				line.pop();
				if (line.length) {
					tspan.text(line.join(" "));
					line = [word];
					tspan = label.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
				}
			}
		}

		switch (lineNumber) {
			case 0:
				label.style("transform", "translateY(0.3em)");
				break;

			case 1:
				label.style("transform", "translateY(0)");
				break;

			case 2:
				label.style("transform", "translateY(-0.7em)");
				break;
		}
	});
}

function updateGroups(group=0) {
	selectedGroup = group;

	// This is an array of colors. Feel free to change these to your preferred colors
	const colors = ["#007bff", "#ffc107", "#28a745", "#dc3545", "#fd7e14", "#6c757d"];

	// Using D3"s scaleOrdinal to map group categories to colors
	colorScale = d3.scaleOrdinal()
		.domain(skills.map(function(d) { return d.group[group]; })) // mapping each group to a color
		.range(colors);

	bubbles.attr("fill", function(d) { return colorScale(d.group[selectedGroup]); });

	// Attract grouped items together
	let links = [];
	skills.forEach((d, i) => {
		skills.forEach((e, j) => {
			if (i < j && d.group[selectedGroup] === e.group[selectedGroup]) {
				links.push({
					source: i,
					target: j
				});
			}
		});
	});

	const force_link = d3.forceLink(links).distance(200).strength(0.3)

	simulation.force("link", force_link);
	simulation.alpha(1).restart();

	setTimeout(() => {
		simulation.force("link", force_link.strength(0.05))
		simulation.alpha(1).restart();
	}, 2000);

	updateDimensions();
}

function initialize_settings() {
	// Initialize FAB and menu
	const fabRipple = new mdc.ripple.MDCRipple(document.querySelector(".mdc-fab"));
	const menu = new mdc.menu.MDCMenu(document.querySelector(".mdc-menu"));

	// Add click event to FAB
	const element_svg = document.getElementById("skills-bubble-chart");
	const element_button = document.getElementById("skills-group-button")
	element_button.addEventListener("click", () => {
		// Get position of FAB
		const {
			top: top_button,
			right: right_button,
			height: height_button,
			width: width_button,
		} = element_button.getBoundingClientRect();

		const {
			top: top_svg,
		} = element_svg.getBoundingClientRect();

		// Set position of menu
		menu.setAbsolutePosition(right_button - width_button + 4, top_button - top_svg + height_button + 4);
		menu.open = !menu.open;
	});

	// Add event listener for the menu items
	const element_menu = document.getElementById("skills-group-menu");
	const element_menuItems = element_menu.querySelectorAll(".mdc-list-item");

	menu.listen("MDCMenu:selected", (event) => {
		let selectedIndex = event.detail.index;

		element_menuItems.forEach(item => item.classList.remove("selected"));
		element_menuItems[selectedIndex].classList.add("selected");

		updateGroups(selectedIndex);
	});
}

const heatSimulation = throttle(function() {
	simulation.alpha(1).restart();
	setTimeout(() => simulation.alphaTarget(0), 10000);
}, 100);

function initialize_svg() {
	// Initialize the MDCDialog
	const element_dialog = document.getElementById("skills-bubble-popup");
	const dialog = new mdc.dialog.MDCDialog(element_dialog);

	function showDialog(skill) {
	    // Update the title and content of the dialog
	    element_dialog.querySelector(".mdc-dialog__title").innerText = skill.name;
	    element_dialog.querySelector(".mdc-dialog__content").innerText = skill.description; // replace with actual skill details
	    
	    // Show the dialog
	    dialog.open();
	}

	// Create the SVG container for the chart
	container = d3.select("#skills-bubble-chart");

	svg = container.append("svg")
		.attr("width", "100%")
		.attr("height", "100%")
		// .on("mousemove", heatSimulation);

	// Add a filter for increasing brightness
	svg.append("filter")
		.attr("id", "brighter")
		.append("feComponentTransfer")
		.append("feFuncR")
		.attr("type", "linear")
		.attr("slope", "1.2");

	// Adjust SVG dimensions on window resize
	window.addEventListener("resize", () => updateDimensions());

	// Create the bubbles
	bubbles = svg.selectAll(".bubble")
		.data(skills)
		.enter()
		.append("circle")
		.attr("class", "bubble")
		.attr("r", function(d) { return radiusScale(d.size); })
		.on("mouseover", function(d) { d3.select(this).style("filter", "url(#brighter)"); })  // On hover, apply the brightness filter
		.on("mouseout", function(d) { d3.select(this).style("filter", ""); })  // On mouse out, remove the brightness filter
		.on("click", function(event, d) { showDialog(d); })  // On click, show an alert with the skill name
		.call(d3.drag()  // Make the bubbles draggable
			.on("start", function(event) {
				if (!event.active) simulation.alphaTarget(0.3).restart();
				event.subject.fx = event.subject.x;
				event.subject.fy = event.subject.y;
			})
			.on("drag", function dragged(event) {
				event.subject.fx = event.x;
				event.subject.fy = event.y;
			})
			.on("end", function dragended(event) {
				if (!event.active) simulation.alphaTarget(0);
				event.subject.fx = null;
				event.subject.fy = null;
			}));

	// Add labels to the bubbles
	labels = svg.selectAll(".label")
		.data(skills)
		.enter()
		.append("text")
		.attr("class", "label")
		.attr("text-anchor", "middle");

	// Update the bubbles" positions
	function ticked() {
		const width = container.node().getBoundingClientRect().width;
		const height = container.node().getBoundingClientRect().height;
	
		bubbles
			.attr("cx", function(d) {
				d.x = Math.max(radiusScale(d.size), Math.min(width - radiusScale(d.size), d.x)); 
				return d.x; 
			})
			.attr("cy", function(d) { 
				d.y = Math.max(radiusScale(d.size), Math.min(height - radiusScale(d.size), d.y)); 
				return d.y; 
			});

		labels
			.attr("x", function(d) { return d.x; })
			.attr("y", function(d) { return d.y; })
			.selectAll("tspan")
				.attr("x", function(d) { return d.x; })
				.attr("y", function(d, i) { return d.y });
	}

	// Create a simulation for the bubbles
	simulation = d3.forceSimulation(skills)
	    .force("charge", d3.forceManyBody().strength(-10))
		.force("collision", d3.forceCollide().radius(function(d) { return radiusScale(d.size); }))
		.on("tick", ticked);
}

export function initialize_all() {
	initialize_settings();
	initialize_svg();

	updateWords();
	updateGroups(); // Calls updateDimensions;
}

export function refresh_skills() {
	updateWords();
	updateDimensions();
	simulation.alpha(1).restart();
}
