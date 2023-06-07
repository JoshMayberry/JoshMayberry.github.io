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

import { initialize_skills } from "./resume-skills.js"

document.addEventListener("DOMContentLoaded", () => {
	initialize_resumeTabBar();
	initialize_workExperience();
	initialize_skills();
})