let glide = new Glide(".glide", {
	type: "carousel",
	perView: 2,
	focusAt: "center",
	autoplay: false,
	// autoplay: 5000,
	// hoverpause: true,
	animationDuration: 800,
	breakpoints: {
        1000: {
            perView: 1,
        },
    },
});

let tl = gsap.timeline({
	repeat: -1,
	repeatRefresh: true,
	paused: true
});
tl.fromTo("#loader", {width: "0"}, {width: "100%", duration: 20, onComplete: () => {glide.go(">")}});

document.querySelector(".main-content").addEventListener("mouseenter", function () {
	tl.pause();
});
document.querySelector(".main-content").addEventListener("mouseleave", function () {
	tl.resume();
});

document.querySelector('.glide__arrow--left').addEventListener('click', function () {
	tl.restart();
	glide.go('<');
});

document.querySelector('.glide__arrow--right').addEventListener('click', function () {
	tl.restart();
	glide.go('>');
});

// glide.on(['run.after'], function () {
// });

glide.mount();
tl.play();