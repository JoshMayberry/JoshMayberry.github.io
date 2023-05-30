const catalogue_location = {
	0: "./index.html",
	1: "./about.html",
	2: "./portfolio.html",
	3: "./contact.html",
}

/**
 * GPT4 Prompt
 *     Let's focus on the header section.
 *     Do not give me the entire webpage- just the relevant sections that have been changed.

 *     Modify it to have the following elements on the left side of the page
 *     - A logo that is 32px x 32px
 *     - The name of the current page

 *     Put the following elements on the right side of the page:
 *     - A navbar for the different pages

 *     If the page is less than 1340px wide, instead of showing the navbar, have the menu icon that will make the MDCDrawer pop out with the available options (Otherwise, do not show that button)
 *     To do this, only use CSS Media Queries (The navbar/menu icon can be hidden using display: none).
 */
function initialize_appBar() {
	new mdc.topAppBar.MDCTopAppBar(document.querySelector(".mdc-top-app-bar"));
	
	for (const element_button of document.querySelectorAll(".mdc-button")) {
		// See: https://m2.material.io/components/buttons/web#using-buttons
		new mdc.ripple.MDCRipple(element_button);
	}

	/**
	 * GPT4 Prompt
	 *     Add an event to the navbar that directs the user to the specific page.
	 *     Wait for the animation with the `mdc-tab-indicator` to finish.
	 */
	const tabBar = new mdc.tabBar.MDCTabBar(document.querySelector(".mdc-tab-bar"));

	tabBar.listen('MDCTabBar:activated', function(event) {
		setTimeout(function() {
			const location = catalogue_location[event.detail.index];

			if (!window.location.pathname.endsWith(location)) {
				window.location.href = location;
			}
		}, 300); // Wait for the animation to finish (300ms is the duration of the MDC Tab indicator animation)
	});

	if (window.location.pathname.endsWith("/index.html")) {
		/**
		 * GPT4 Prompt
		 *     Use GSAP (green sock animation platform) to populate the tab bar with it's items.
		 */
		gsap.from(".mdc-tab", {
			duration: 0.5,
			opacity: 0,
			y: 50,
			stagger: 0.1,
			delay: 0.1,
			ease: "back.out(1.7)"
		});

		gsap.from("#menu-button", {
			duration: 0.5,
			opacity: 0,
			y: 50,
			delay: 0.1,
			ease: "back.out(1.7)"
		});

		gsap.from("#logo", {
			duration: 1,
			opacity: 0,
			delay: 0.1,
			ease: "back.out(1.7)"
		});

		gsap.from("#page-title", {
			duration: 0.5,
			opacity: 0,
			x: -50,
			delay: 0.1,
			ease: "back.out(1.7)"
		});

		const tabTexts = document.querySelectorAll(".mdc-tab");
		const animations = [];

		tabTexts.forEach((tab, i) => {
			animations[i] = gsap.to(tab, {
				paused: true,
				y: -10,
				duration: 0.3,
				ease: "power2.out",
			});

			tab.addEventListener("mouseenter", () => animations[i].play());
			tab.addEventListener("mouseleave", () => animations[i].reverse());
		});
	}
}

/**
 * See: https://greensock.com/forums/topic/30291-hover-animation/#comment-151204
 * 
 * GPT4 Prompt
 *     Let's focus on the drawer section.
 *     Do not give me the entire webpage- just the relevant sections that have been changed.
 *
 *     When I click on #menu-button, open the drawer and make the rest of the webpage have a slightly transparent black over it. The black overlay should fade in.
 *     If the user clicks on the black overlay, close the drawer and fade out the black overlay.
 *
 *     If the user hovers over one of the drawer items, use GSAP to make them pop up slightly.
 *
 *     If the user clicks on one of the drawer items, close the drawer and when the animation has finished navigate to the selected page- unless the user clicks on the current page, in which case just close the drawer.
 */
function initialize_drawer() {
	const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));

	// Toggle drawer when menu button is clicked
	document.querySelector("#menu-button").addEventListener("click", function () {
		drawer.open = !drawer.open;
	});

	// Close drawer and navigate when a drawer item is clicked
	const listItems = document.querySelectorAll(".mdc-list-item");
	listItems.forEach(function(element, index) {
		element.addEventListener("click", function() {
			drawer.open = false;
			if (element.classList.contains("mdc-list-item--activated")) {
				return;
			}

			// Delay navigation until drawer is closed
			setTimeout(function() {
				window.location.href = catalogue_location[index];
			}, 250);
		});
	});

	// GSAP animations for the drawer items
	const drawerTexts = document.querySelectorAll(".mdc-drawer .mdc-list-item");
	const animations = [];

	drawerTexts.forEach((text, i) => {
		animations[i] = gsap.to(text.children, {
			paused: true,
			x: 10,
			duration: 0.3,
			ease: "power2.out",
		});

		text.addEventListener("mouseenter", () => animations[i].play());
		text.addEventListener("mouseleave", () => animations[i].reverse());
	});
}


document.addEventListener("DOMContentLoaded", () => {
	initialize_appBar();
	initialize_drawer();
	



	// See: https://m2.material.io/components/navigation-drawer/web#using-navigation-drawers
	// const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));
	// document.querySelector(".mdc-top-app-bar__navigation-icon")
	// 	.addEventListener("click", function () {
	// 		drawer.open = !drawer.open;
	// 	});
})
