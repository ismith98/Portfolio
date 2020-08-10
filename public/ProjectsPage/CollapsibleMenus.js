export default class CollapsibleMenus {
	constructor() {
		this.coll = document.getElementsByClassName("collapsible");
	}
	
	
	start() {
		var i;
	
		for (i = 0; i < this.coll.length; i++) {
			this.coll[i].addEventListener("click", function() {
				this.classList.toggle("active");
				var content = this.nextElementSibling;
				if (content.style.maxHeight) {
					content.style.maxHeight = null;
				} else {
					content.style.maxHeight = content.scrollHeight + "px";
				}
				console.log(content);
			});
		}
	}
	
}

