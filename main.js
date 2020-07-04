class TypeWriter {
    constructor(txtElement, text, descriptors) {
        this.txtElement = txtElement;
        this.text = text;
        this.descriptors = descriptors;
		this.descriptorText = '';
        this.descriptorIndex = 0;
        this.isDeleting = false;
		this.doneCycling = false;
		this.descriptorElement;
		this.count = 0;
    }

	type() {

		var txtElementLength = this.txtElement.innerText.length;
		
		// If we have displayed all of the preliminary text (the text before the descriptive words)
		if(this.text.length == this.count) {
			
			//initialize the element that will hold the text for each descriptor
			this.descriptorElement = this.txtElement.appendChild(document.createElement('span'));
			//this.descriptorElement.setAttribute('class', 'txt');
			
			//Type each descriptive word
			this.typeDescriptor();
			
		} else {
			//Add a letter
			this.count++;
			this.txtElement.innerText = this.text.substring(0, this.count);
			// Wait 100ms before typing the next letter
			setTimeout(() => {this.type()}, 100);
		}
		
	}

	typeDescriptor() {
		
		var current = this.descriptorIndex;
		var textLength = this.descriptorText.length;
		var descriptorLength = this.descriptors[current].length;
		var typeSpeed = 100;	//The default time between keystrokes
		
		
		if(!this.doneCycling) {
			if(this.isDeleting) {
				this.descriptorText = this.descriptors[current].substring(0,this.descriptorText.length - 1);

				typeSpeed = 75;	//typeSpeed is shorter when deleting a word

				//If you've deleted the word then move onto the next descriptor
				
				if(textLength == 0) {
					this.descriptorIndex++;
					this.isDeleting = false;
					
					typeSpeed = 400;
				}
				
			} else {
				this.descriptorText = this.descriptors[current].substring(0,this.descriptorText.length + 1);
				
				//If the word is spelled, then start deleting it
				if(textLength == descriptorLength) {
					this.isDeleting = true;
					typeSpeed = 800;	//typeSpeed is longer when the word is finished
					
					//If this was the last descriptor, then you can stop cycling threw words
					if(this.descriptorIndex == this.descriptors.length - 1) {
						this.doneCycling = true;
						//Remove the cursor after 1 seconds
						setTimeout(() => {this.txtElement.removeAttribute("class")}, 1000);
					}
					
				}
			}
			

			
			this.descriptorElement.innerText = this.descriptorText;
			
			
			//Call the type message after 3 seconds
			setTimeout(() => this.typeDescriptor(), typeSpeed);
			}
	
	}
}


window.onload = init();

function init() {
	// The parent HTML element that will have a typing animation run on it
	var element = document.querySelector(".type");
	
	// The HTML element that will have its innerText field modified
	var txtElement = element.appendChild(document.createElement('span'));
	txtElement.setAttribute('class', 'txt');
	
	// The text that will be displayed in txtElement
	var text = 'I am a curious and dependable computer science graduate who designs great ';
	
	//The descriptive words at the end of txtElement that will be cycled through
	var descriptors = JSON.parse(element.getAttribute("data-descriptors"));
	
	//Initialize typewriter
	new TypeWriter(txtElement, text, descriptors).type();
}

