import TypeWriter from './TypeWriter.js';


// Wait 300ms before animating the header on the homepage page
window.onload = setTimeout(() => {
	// Fade in the header on the main header on the homepage
	let greeting = document.querySelector('#greeting');
	greeting.classList.add('fade');
	// After a second get the elements ready for the typing effect
	setTimeout(init, 1300);
}, 300)

// Scroll down when the down arrow button is clicked
let downArrow = document.querySelector("#homepage-down-arrow");
downArrow.addEventListener('click', () => {
	console.log('test')
	var desiredHeight = window.innerHeight;  /*$(window).height();*/
	window.scrollTo(0, desiredHeight);
	/*$('html, body').animate({scrollTop:desiredHeight}, 'slow');*/
})

// Scroll up when the up arrow button is clicked

function init() {

	// The parent HTML element that will have a typing animation run on it
	var txtElement = document.querySelector(".type");
	
	// Add the cursor
	txtElement.classList.add('txt');
	
	// The text that will be displayed in txtElement
	var text = 'I am a curious and dependable computer science graduate who designs great ';
	
	//The descriptive words at the end of txtElement that will be cycled through
	var descriptors = JSON.parse(txtElement.getAttribute("data-descriptors"));
	
	//Initialize typewriter
	new TypeWriter(txtElement, text, descriptors).type();
}

