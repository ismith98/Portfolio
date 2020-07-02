function typeWriter() {
	//Get the Html element that I want to put an effect on
	var text = document.querySelector(".type");
	//Get the words that I want cycle through for with the type effect
	var descriptors = JSON.parse(text.getAttribute("data-descriptors"));
	console.log(typeof(['test', 'two']))
	console.log(descriptors[0]);
	
	for(i = 0; i < descriptors.length; i++) {
		//descriptor
		console.log(`type ${i}`);
		
		typeDescriptor(descriptors[i], i);
		
	}
	
	function typeDescriptor(/*descriptor, index*/) {
		for(n = 0; n < descriptors[i].length; n++){
			var descriptor = descriptors[i].substring(0,n);
			console.log(descriptor);
		}
		
		setTimeout(1000 *2);
		// If it is not the last descriptor delete the word before typing the next one
		if(i != descriptors.length - 1){
			//after two seconds delete the descriptor
			//setTimeout(typeDescriptor, 1000*2)
			//setTimeout(deleteDescriptor, 1000*2)
		}
			
		function deleteDescriptor() {
			console.log("delete");
		}

	}
}

window.onload = typeWriter;