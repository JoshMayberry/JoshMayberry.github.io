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

function initialize_resumeTabBar() {
	const tabBar = new mdc.tabBar.MDCTabBar(document.getElementById("resume-section-tabbar"));
	const resumeSections = Array.from(document.querySelectorAll(".resume-section"));

	tabBar.listen("MDCTabBar:activated", (activatedEvent) => {
		resumeSections.forEach((section, index) => {
			if (index === activatedEvent.detail.index) {
				section.style.display = "flex";
			} else {
				section.style.display = "none";
			}

			switch (section.id) {
				case "skills":
					skills_updateWords();
					skills_updateDimensions();
					break;
			}
		});
	});
}

/**
 * GPT4 Prompt
 *     When I click on a list item, I want a popup to appear that has the full description in it.
 */
function initialize_workExperience() {
	// Initialize the dialog
	const dialog = new mdc.dialog.MDCDialog(document.querySelector(".mdc-dialog"));

	// Attach click event listener to each list item
	const workExperienceItems = document.querySelectorAll(".resume-list-item");
	workExperienceItems.forEach(item => {
		item.addEventListener("click", () => {
			// Set the dialog title and content according to the clicked item
			const itemTitle = item.querySelector(".mdc-list-item__primary-text").textContent;
			const itemContent = item.querySelector(".mdc-list-item__secondary-text").textContent;
			dialog.scrimClickAction = "";
			dialog.escapeKeyAction = "";
			dialog.autoStackButtons = false;
			document.querySelector(".mdc-dialog__title").textContent = itemTitle;
			document.querySelector(".mdc-dialog__content").textContent = itemContent;
			// Open the dialog
			dialog.open();
		});
	});
}

const skills = [
    // Array structure: [Name, Category, Skill type, Use case, Complexity, Industry relevance]
    {name: "Python", group: ["Programming Languages", "Back-end", "Web Development", "High", "High Tech"], size: 90},
    {name: "JavaScript", group: ["Programming Languages", "Front-end", "Web Development", "Medium", "High Tech"], size: 80},
    {name: "Power Query", group: ["Programming Languages", "Data Analysis", "Data Processing", "High", "Finance"], size: 70},
    {name: "SQLite", group: ["Programming Languages", "Database", "Data Storage", "Low", "High Tech"], size: 60},
    {name: "MySQL", group: ["Programming Languages", "Database", "Data Storage", "Medium", "High Tech"], size: 60},
    {name: "PostgreSQL", group: ["Programming Languages", "Database", "Data Storage", "Medium", "High Tech"], size: 60},
    {name: "HTML", group: ["Programming Languages", "Front-end", "Web Development", "Low", "High Tech"], size: 55},
    {name: "CSS", group: ["Programming Languages", "Front-end", "Web Development", "Low", "High Tech"], size: 55},
    {name: "ZPL", group: ["Programming Languages", "Hardware Programming", "Device Control", "Medium", "Logistics"], size: 35},
    {name: "PHP", group: ["Programming Languages", "Back-end", "Web Development", "Medium", "High Tech"], size: 35},
    {name: "Java", group: ["Programming Languages", "Back-end", "Software Development", "High", "High Tech"], size: 35},
    {name: "C++", group: ["Programming Languages", "Back-end", "Software Development", "High", "High Tech"], size: 35},
    {name: "LaTeX", group: ["Programming Languages", "Documentation", "Academic Writing", "Medium", "Academia"], size: 35},
    {name: "MS VBA", group: ["Programming Languages", "Automation", "Data Processing", "Low", "Office Automation"], size: 35},
    {name: "TypeScript", group: ["Programming Languages", "Front-end", "Web Development", "Medium", "High Tech"], size: 45},
    {name: "PLC Ladder Logic", group: ["Programming Languages", "Hardware Programming", "Device Control", "High", "Industrial Automation"], size: 30},

    // Libraries/Frameworks
    {name: "NodeJS", group: ["Libraries/Frameworks", "Back-end", "Web Development", "Medium", "High Tech"], size: 70},
    {name: "jQuery", group: ["Libraries/Frameworks", "Front-end", "Web Development", "Low", "High Tech"], size: 50},
    {name: "GreenSock", group: ["Libraries/Frameworks", "Animation", "Web Development", "Low", "Media and Entertainment"], size: 50},
    {name: "D3", group: ["Libraries/Frameworks", "Data Visualization", "Web Development", "High", "High Tech"], size: 50},
    {name: "Bootstrap", group: ["Libraries/Frameworks", "Front-end", "Web Development", "Low", "High Tech"], size: 45},
    {name: "Flask", group: ["Libraries/Frameworks", "Back-end", "Web Development", "Medium", "High Tech"], size: 35},
    {name: "Django", group: ["Libraries/Frameworks", "Back-end", "Web Development", "High", "High Tech"], size: 35},
    {name: "Selenium", group: ["Libraries/Frameworks", "Testing", "Web Development", "Medium", "High Tech"], size: 35},
    {name: "Puppeteer", group: ["Libraries/Frameworks", "Testing", "Web Development", "Medium", "High Tech"], size: 35},
    {name: "Open CV", group: ["Libraries/Frameworks", "Computer Vision", "AI & ML", "High", "High Tech"], size: 30},

    // Software
    {name: "MS Excel", group: ["Software", "Spreadsheet", "Data Processing", "Low", "Office Automation"], size: 60},
    {name: "Power BI", group: ["Software", "Data Visualization", "Data Analysis", "Medium", "Finance"], size: 70},
    {name: "Dundas BI", group: ["Software", "Data Visualization", "Data Analysis", "Medium", "Finance"], size: 50},
    {name: "Trello", group: ["Software", "Project Management", "Collaboration", "Low", "General"], size: 45},
    {name: "Retool", group: ["Software", "App Builder", "App Development", "Medium", "High Tech"], size: 35},
    {name: "Formsite", group: ["Software", "Form Builder", "Data Collection", "Low", "General"], size: 35},
    {name: "Mathematica", group: ["Software", "Computation", "Data Analysis", "High", "Academia"], size: 30},
    {name: "GIMP", group: ["Software", "Image Manipulation", "Graphic Design", "Medium", "Media and Entertainment"], size: 30},
    {name: "InkScape", group: ["Software", "Vector Graphics", "Graphic Design", "Medium", "Media and Entertainment"], size:30},
    {name: "Android Studio", group: ["Software", "IDE", "App Development", "High", "High Tech"], size: 30},
    {name: "Solid Works", group: ["Software", "CAD", "Product Design", "High", "Engineering"], size: 30},
    {name: "Simens TIA Portal", group: ["Software", "PLC Programming", "Industrial Control", "High", "Industrial Automation"], size: 30},
    {name: "Adobe Premiere Pro", group: ["Software", "Video Editing", "Media Production", "High", "Media and Entertainment"], size: 30},
    {name: "Audacity", group: ["Software", "Audio Editing", "Media Production", "Low", "Media and Entertainment"], size: 30},
    {name: "Zapier", group: ["Software", "Automation", "Task Automation", "Low", "High Tech"], size: 30},
    {name: "Custom Power BI Visuals", group: ["Software", "Data Visualization", "Data Analysis", "High", "Finance"], size: 70},
    {name: "Raspberry Pi", group: ["Hardware", "Device Programming", "Device Control", "Medium", "High Tech"], size: 30},
    {name: "Arduino", group: ["Hardware", "Device Programming", "Device Control", "Low", "High Tech"], size: 30},
];

let skills_colorScale;
const skills_radiusScale = d3.scaleSqrt().domain([1, 100]).range([10, 80]);
let skills_selectedGroup = 0;

let skills_svg;
let skills_labels;
let skills_bubbles;
let skills_container;
let skills_simulation;
function skills_updateDimensions({
	jitterStrength = 0.02, // adjust this to change the degree of jitter
}={}) {
	const width = skills_container.node().getBoundingClientRect().width;
	const height = skills_container.node().getBoundingClientRect().height;

	skills_svg.attr("viewBox", "0 0 " + width + " " + height);

	// Determine how to group them
	var uniqueGroups = skills_colorScale.domain();
	let centers = uniqueGroups.reduce((centersObj, groupName, i) => {
	  centersObj[groupName] = {
	    x: width / (uniqueGroups.length + 1) * (i + 1),
	    y: height / 2
	  };
	  return centersObj;
	}, {});

	// Modify the simulation
	skills_simulation
	  .force("center", d3.forceCenter(width / 2, height / 2))
	  .force('x', d3.forceX().strength(0.01).x(d => centers[d.group[skills_selectedGroup]].x))
	  .force('y', d3.forceY().strength(0.01).y(d => centers[d.group[skills_selectedGroup]].y));

	// Restart the simulation with the updated forces
	skills_simulation.alpha(1).restart();
}

function skills_updateWords() {
	skills_labels.each(function(d) {
		const label = d3.select(this),
			words = d.name.split(/\s+/).reverse(),
			radius = skills_radiusScale(d.size);

		label.selectAll('tspan').remove();

		let line = [],
			lineNumber = 0,
			lineHeight = 1.1, // ems
			y = 0,
			x = 0,
			dy = 0,
			word,
			tspan = label.append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');
			
		while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(' '));
			if (tspan.node().getComputedTextLength() > (radius * 2)) {
				line.pop();
				if (line.length) {
					tspan.text(line.join(' '));
					line = [word];
					tspan = label.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
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


function createColorScale(group) {
  // This is an array of colors. Feel free to change these to your preferred colors
  const colors = ["#007bff", "#ffc107", "#28a745", "#dc3545", "#fd7e14", "#6c757d"];

  // Using D3's scaleOrdinal to map group categories to colors
  skills_colorScale = d3.scaleOrdinal()
    .domain(skills.map(function(d) { return d.group[group]; })) // mapping each group to a color
    .range(colors);
}

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
 */
function initialize_skills() {
	// Create the SVG container for the chart
	skills_container = d3.select("#skills-bubble-chart");

	const heatSimulation = throttle(function() {
		skills_simulation.alpha(1).restart();
		setTimeout(() => skills_simulation.alphaTarget(0), 10000);
	}, 100);

	skills_svg = skills_container.append("svg")
		.attr("width", "100%")
		.attr("height", "100%")
		.on("mousemove", heatSimulation);

	// Adjust SVG dimensions on window resize
	window.addEventListener("resize", () => skills_updateDimensions());

	// Create the bubbles
	createColorScale();
	skills_bubbles = skills_svg.selectAll(".bubble")
		.data(skills)
		.enter()
		.append("circle")
		.attr("class", "bubble")
		.attr("r", function(d) { return skills_radiusScale(d.size); })
		.attr("fill", function(d) { return skills_colorScale(d.group[skills_selectedGroup]); });

	// Add labels to the bubbles
	skills_labels = skills_svg.selectAll('.label')
		.data(skills)
		.enter()
		.append('text')
		.attr('class', 'label')
		.attr('text-anchor', 'middle');

	// Update the bubbles" positions
	function ticked() {
		const width = skills_container.node().getBoundingClientRect().width;
		const height = skills_container.node().getBoundingClientRect().height;
	
		skills_bubbles
			.attr('cx', function(d) {
				d.x = Math.max(skills_radiusScale(d.size), Math.min(width - skills_radiusScale(d.size), d.x)); 
				return d.x; 
			})
			.attr('cy', function(d) { 
				d.y = Math.max(skills_radiusScale(d.size), Math.min(height - skills_radiusScale(d.size), d.y)); 
				return d.y; 
			});

		skills_labels
			.attr('x', function(d) { return d.x; })
			.attr('y', function(d) { return d.y; })
			.selectAll('tspan')
				.attr('x', function(d) { return d.x; })
				.attr('y', function(d, i) { return d.y });
	}

	// Create a simulation for the bubbles
	skills_simulation = d3.forceSimulation(skills)
		.force("charge", d3.forceManyBody().strength([5]))
		.force("collision", d3.forceCollide().radius(function(d) { return skills_radiusScale(d.size); }))
		.on("tick", ticked);

	skills_updateWords();
	skills_updateDimensions();
}

document.addEventListener("DOMContentLoaded", () => {
	initialize_resumeTabBar();
	initialize_workExperience();
	initialize_skills();
})