/**
 * GPT4 Prompt
 *     Let's focus on the body section for the about me page.
 *     Do not give me the entire webpage- just the relevant sections that have been changed.
 *     Do not generate anything yet. Reply with "ready" if you understand.
 * 
 * 
 *     I have a professional headshot and a short description of who I am, as well as a longer one.
 *     I also have some photos of my various hobbies.
 *     How would you arrange this so it looks nice and engaging?
 * 
 * 
 *     Make the image wrapped in a circular card with 2 floating FAB buttons in the bottom left and right corners.
 *     The FAB buttons should have arrows pointing left and right.
 *     Use GSAP to allow the user to change the image in the circle to several other images by clicking on the arrow buttons.
 *     The image transitions should use a cross-fade effect.
 *     The entire image widget should take up no more than 20% of the screen in both height and width- while still retaining a square aspect ratio.
 *     Use flexbox to allow the `.intro-text` to fill the available space to the right.
 */

function initialize_headshot() {
	// Array of image URLs
	const images = ['assets/headshot.png', 'assets/childhood_1.jpg'];
	let currentImageIndex = 0;

	// FAB button event listeners
	document.querySelector('.intro-section .left-arrow').addEventListener('click', function() {
	  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
	  switchImage();
	});

	document.querySelector('.intro-section .right-arrow').addEventListener('click', function() {
	  currentImageIndex = (currentImageIndex + 1) % images.length;
	  switchImage();
	});

	const imageContainer = document.querySelector('.intro-section .image-container');

	// Function to switch images with GSAP animation
	function switchImage() {
	  // Create new image element for the next image
	  const nextImage = document.createElement('img');
	  nextImage.src = images[currentImageIndex];
	  nextImage.id = 'next-image';
	  nextImage.className = 'intro-image';
	  nextImage.style.opacity = '0';
	  
	  // Wait for the image to load so we can get its natural dimensions
	  nextImage.onload = function() {
	    // Check which dimension is larger and set the CSS accordingly
	    if (this.naturalWidth > this.naturalHeight) {
	      this.style.height = '100%';
	      this.style.width = 'auto';
	    } else {
	      this.style.height = 'auto';
	      this.style.width = '100%';
	    }

	    // Append the new image to the container
	    imageContainer.appendChild(nextImage);

	    // Crossfade animation with GSAP
	    gsap.to('#intro-image', {opacity: 0, duration: 0.5});
	    gsap.to('#next-image', {opacity: 1, duration: 0.5, onComplete: function() {
	      // Remove the old image and update the ID of the new one
	      imageContainer.removeChild(document.querySelector('.intro-section .intro-image'));
	      nextImage.id = 'intro-image';
	    }});
	  };
	}

}

document.addEventListener("DOMContentLoaded", () => {
	initialize_headshot();
})