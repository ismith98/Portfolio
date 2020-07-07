class TypeWriter {
    constructor(txtElement, text, descriptors = {}) {
        this.txtElement = txtElement;
        this.text = text;
        this.descriptors = descriptors;
		this.descriptorElement; 	// The span element for descriptors
		this.descriptorText = ''; 	// The text displayed in the descriptors span element
        this.descriptorIndex = 0; 	// The current descriptor
        this.isDeleting = false; 	// Start the backspace animation on the descriptors
		this.doneCycling = false;	// Are we done cycling through descriptors?
		this.textIndex = 0; 	//The index of the curent letter of the main text to be typed
    }

	type() {
		
		// If we have displayed all of the preliminary text (the text before the descriptive words)
		if(this.text.length == this.textIndex) {
			
			// Initialize the element that will hold the text for each descriptor
			this.descriptorElement = this.txtElement.appendChild(document.createElement('span'));
			
			// Type each descriptive word
			this.typeDescriptor();
			
		} else {
			// Add a letter
			this.textIndex++;
			this.txtElement.innerText = this.text.substring(0, this.textIndex);
			// Wait 100ms before typing the next letter
			setTimeout(() => {this.type()}, 100);
		}
		
	}

	typeDescriptor() {
		// The index of the current descriptor
		var current = this.descriptorIndex; 	
		
		// The length of the current descriptor
		var descriptorLength = this.descriptors[current].length;
		
		// The amount of letters of the current descriptor that is already spelled out
		var typedTextLength = this.descriptorText.length; 	
		
		//The default time between keystrokes
		var typeSpeed = 100;	
		
		// If there are still more descriptors to type out
		if(!this.doneCycling) {
			// If the text needs the backspace effect
			if(this.isDeleting) {
				// Remove a letter from the end of the displayed text
				this.descriptorText = this.descriptors[current].substring(0, typedTextLength - 1);

				//typeSpeed is shorter when deleting a word
				typeSpeed = 75;

				//If you've deleted the word then move onto the next descriptor
				if(typedTextLength == 0) {
					this.descriptorIndex++;
					this.isDeleting = false;
					
					// Pause before typing the next word
					typeSpeed = 500;
				}
				
			} else {
				// Add a letter to the end of the displayed text
				this.descriptorText = this.descriptors[current].substring(0, typedTextLength + 1);
				
				//If the word is completely spelled, then start deleting it
				if(typedTextLength == descriptorLength) {
					this.isDeleting = true;
					
					//typeSpeed is longer when the word is finished
					typeSpeed = 800;	
					
					//If this was the last descriptor, then you can stop cycling through words
					if(this.descriptorIndex == this.descriptors.length - 1) {
						this.doneCycling = true;
						//Remove the cursor after 1 seconds
						setTimeout(() => {this.txtElement.removeAttribute("class"); }, 1000);
					}
					
				}
			}
			
			// Display the new text
			this.descriptorElement.innerText = this.descriptorText;
			
			
			//Call the type message after 3 seconds
			setTimeout(() => this.typeDescriptor(), typeSpeed);
			}
	
	}
}

// Wait 300ms before animating the header on the homepage page
window.onload = setTimeout(() => {
	// Fade in the header on the main header on the homepage
	let greeting = document.querySelector('#greeting');
	greeting.classList.add('fade');
	// After a second get the elements ready for the typing effect
	setTimeout(init, 1000);
}, 300)

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

