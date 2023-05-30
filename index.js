document.addEventListener("DOMContentLoaded", () => {
	// Initialize all MDC Javascript
	const appBar = new mdc.topAppBar.MDCTopAppBar(document.querySelector(".mdc-top-app-bar"));
	
	for (const element_button of document.querySelectorAll(".mdc-button")) {
		// See: https://m2.material.io/components/buttons/web#using-buttons
		new mdc.ripple.MDCRipple(element_button);
	}

	// See: https://m2.material.io/components/navigation-drawer/web#using-navigation-drawers
	// const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));
	// document.querySelector(".mdc-top-app-bar__navigation-icon")
	// 	.addEventListener("click", function () {
	// 		drawer.open = !drawer.open;
	// 	});
})
