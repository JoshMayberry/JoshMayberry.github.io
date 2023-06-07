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
	// Array structure: [Name, Category, Skill type, Use case, Complexity, Industry relevance]
	{name: "Python", group: ["Programming Language", "Back-end", "General", "High", "High Tech", "Python"], size: 90},
	{name: "JavaScript", group: ["Programming Language", "Front-end", "Web Development", "High", "High Tech", "JavaScript"], size: 80},
	{name: "SQLite", group: ["Programming Language", "Database", "Data Storage", "Medium", "High Tech", "SQL"], size: 60},
	{name: "MySQL", group: ["Programming Language", "Database", "Data Storage", "Medium", "High Tech", "SQL"], size: 60},
	{name: "PostgreSQL", group: ["Programming Language", "Database", "Data Storage", "Medium", "High Tech", "SQL"], size: 60},
	{name: "HTML", group: ["Markup Language", "Front-end", "Web Development", "Low", "Web Design", "HTML"], size: 55},
	{name: "CSS", group: ["Style Sheet Language", "Front-end", "Web Development", "Low", "Web Design", "CSS"], size: 55},
	{name: "Power Query", group: ["Programming Language", "Data Transformation", "Data Processing", "Medium", "Finance", "M"], size: 70},
	{name: "PHP", group: ["Programming Language", "Back-end", "Web Development", "Medium", "High Tech", "PHP"], size: 35},
	{name: "Java", group: ["Programming Language", "Back-end", "App Development", "High", "High Tech", "Java"], size: 35},
	{name: "C++", group: ["Programming Language", "Back-end", "High Performance Computing", "High", "High Tech", "C++"], size: 35},
	{name: "LaTeX", group: ["Markup Language", "Document Preparation", "Publishing", "Medium", "Academia", "LaTeX"], size: 35},
	{name: "MS VBA", group: ["Programming Language", "Automation", "Office Automation", "Low", "Office Automation", "VBA"], size: 35},
	{name: "PLC Ladder Logic", group: ["Programming Language", "Real-time Control", "Industrial Control", "High", "Industrial Automation", "Ladder Logic"], size: 30},
	
	// Libraries/Frameworks
	{name: "NodeJS", group: ["Library/Framework", "Back-end", "Web Development", "High", "High Tech", "JavaScript"], size: 70},
	{name: "jQuery", group: ["Library/Framework", "Front-end", "Web Development", "Low", "Web Design", "JavaScript"], size: 50},
	{name: "GreenSock", group: ["Library/Framework", "Front-end", "Web Animation", "Low", "Web Design", "JavaScript"], size: 50},
	{name: "D3", group: ["Library/Framework", "Data Visualization", "Web Development", "Medium", "Data Analysis", "JavaScript"], size: 50},
	{name: "Bootstrap", group: ["Library/Framework", "Front-end", "Web Development", "Low", "Web Design", "CSS"], size: 45},
	{name: "TypeScript", group: ["Programming Language", "Front-end", "Web Development", "Medium", "High Tech", "TypeScript"], size: 45},
	{name: "ZPL", group: ["Programming Language", "Printer Command", "Hardware Control", "Medium", "Manufacturing", "ZPL"], size: 35},
	{name: "Flask", group: ["Library/Framework", "Back-end", "Web Development", "Medium", "High Tech", "Python"], size: 35},
	{name: "Django", group: ["Library/Framework", "Back-end", "Web Development", "High", "High Tech", "Python"], size: 35},
	{name: "Selenium", group: ["Library/Framework", "Testing", "Web Testing", "Medium", "Quality Assurance", "Python"], size: 35},
	{name: "Puppeteer", group: ["Library/Framework", "Web Scraping", "Data Collection", "Medium", "Data Analysis", "JavaScript"], size: 35},
	{name: "Open CV", group: ["Library/Framework", "Computer Vision", "AI", "High", "High Tech", "Python"], size: 30},
	
	// Hardware / Devices
	{name: "Raspberry Pi", group: ["Hardware/Device", "Microcomputer", "Embedded Systems", "Medium", "Internet of Things", "Python"], size: 30},
	{name: "Arduino", group: ["Hardware/Device", "Microcontroller", "Embedded Systems", "Medium", "Internet of Things", "C++"], size: 30},

	// Software Tools
	{name: "Custom Power BI Visuals", group: ["Software Tool", "Data Visualization", "Business Intelligence", "Medium", "Data Analysis", "DAX"], size: 70},
	{name: "MS Excel", group: ["Software Tool", "Data Analysis", "Business Intelligence", "Low", "Office Automation", "VBA"], size: 60},
	{name: "Power BI", group: ["Software Tool", "Data Visualization", "Business Intelligence", "Medium", "Data Analysis", "DAX"], size: 50},
	{name: "Dundas BI", group: ["Software Tool", "Data Visualization", "Business Intelligence", "Medium", "Data Analysis", "JavaScript"], size: 50},
	{name: "Trello", group: ["Software Tool", "Project Management", "Productivity", "Low", "Project Management", "No specific language"], size: 45},
	{name: "Retool", group: ["Software Tool", "Internal Tools", "Productivity", "Medium", "Internal Tools", "JavaScript"], size: 35},
	{name: "Formsite", group: ["Software Tool", "Form Builder", "Productivity", "Low", "Office Automation", "No specific language"], size: 35},
	{name: "Mathematica", group: ["Software Tool", "Computational Software", "Research", "High", "Research", "Wolfram Language"], size: 30},
	{name: "Zapier", group: ["Software Tool", "Workflow Automation", "Productivity", "Low", "Office Automation", "No specific language"], size: 30},
	{name: "GIMP", group: ["Software Tool", "Image Editing", "Graphic Design", "Low", "Graphic Design", "No specific language"], size: 30},
	{name: "InkScape", group: ["Software Tool", "Vector Graphics", "Graphic Design", "Low", "Graphic Design", "No specific language"], size: 30},
	{name: "Android Studio", group: ["Software Tool", "App Development", "Mobile Development", "High", "Mobile Development", "Java"], size: 30},
	{name: "Solid Works", group: ["Software Tool", "3D CAD", "Mechanical Design", "High", "Engineering Design", "No specific language"], size: 30},
	{name: "Simens TIA Portal", group: ["Software Tool", "Industrial Automation", "Control Systems", "High", "Industrial Automation", "Ladder Logic"], size: 30},
	{name: "Adobe Premiere Pro", group: ["Software Tool", "Video Editing", "Media Production", "High", "Media Production", "No specific language"], size: 30},
	{name: "Audacity", group: ["Software Tool", "Audio Editing", "Media Production", "Low", "Media Production", "No specific language"], size: 30}
]

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

	// Determine how to group them
	var uniqueGroups = colorScale.domain();
	let centers = uniqueGroups.reduce((centersObj, groupName, i) => {
		centersObj[groupName] = {
			x: width / (uniqueGroups.length + 1) * (i + 1),
			y: height / 2
		};
		return centersObj;
	}, {});

	console.log("@1", centers)

	// Modify the simulation
	const force_x = d3.forceX().strength(0.2).x(d => centers[d.group[selectedGroup]].x);
	const force_y = d3.forceY().strength(0.2).y(d => centers[d.group[selectedGroup]].y);

	simulation
		.force("center", d3.forceCenter(width / 2, height / 2))
		.force("x", force_x)
		.force("y", force_y);

	// Restart the simulation with the updated forces
	simulation.alpha(1).restart();

	setTimeout(() => {
		simulation
			.force("x", force_x.strength(0.01))
			.force("y", force_y.strength(0.01));
	
		simulation.alpha(1).restart();
	}, 1000);
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

	updateDimensions();
}

function initialize_settings() {
	// Initialize FAB and menu
	const fabRipple = new mdc.ripple.MDCRipple(document.querySelector(".mdc-fab"));
	const menu = new mdc.menu.MDCMenu(document.querySelector(".mdc-menu"));

	// Add click event to FAB
	document.getElementById("skills-group-button").addEventListener("click", () => {
		// Get position of FAB
		const {top, right} = document.querySelector(".mdc-fab").getBoundingClientRect();

		// Set position of menu
		menu.setAbsolutePosition(right, top);
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

function initialize_svg() {
	// Create the SVG container for the chart
	container = d3.select("#skills-bubble-chart");

	const heatSimulation = throttle(function() {
		simulation.alpha(1).restart();
		setTimeout(() => simulation.alphaTarget(0), 10000);
	}, 100);

	svg = container.append("svg")
		.attr("width", "100%")
		.attr("height", "100%")
		.on("mousemove", heatSimulation);

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
		.on("click", function(d) { alert("You clicked on " + d.name); })  // On click, show an alert with the skill name
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
		.force("charge", d3.forceManyBody().strength([5]))
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
}
