var model = {
	currentPointGuard: null,
	data: [
		{
			"name": "Chris Paul",
			"url" : "http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/2779.png&w=350&h=254",
			"clickCount": 0
		},
		{
			"name": "Steph Curry",
			"url" : "http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png&w=350&h=254",
			"clickCount": 0
		},
		{
			"name": "Damian Lillard",
			"url" : "http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6606.png&w=350&h=254",
			"clickCount": 0
		},
		{
			"name": "Russell Westbrook",
			"url" : "http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3468.png&w=350&h=254",
			"clickCount": 0
		},
		{
			"name": "Kyrie Irving",
			"url" : "http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6442.png&w=350&h=254",
			"clickCount": 0
		}
	]
};

var controller = {

	init: function(){

		model.currentPointGuard = model.data[0];

		pointGuardView.init();
		pointGuardListView.init();
	},

	getterPointGuard: function(){
		return model.currentPointGuard;
	},

	allPointGuards: function(){
		return model.data;
	},

	setterPointGuard: function(pointguard){
		model.currentPointGuard = pointguard;
	},

	increment: function(){
		model.currentPointGuard.clickCount++;
		pointGuardView.render();
	},


};

var pointGuardView = {
	//Set html elements for rendering
	init: function(){
		this.pointGuardElem = $("pg-wrapper");
		this.pointNameElem = $("#pg-name-text");
		this.pointguardImage = $(".pg-pic");
		this.countElem = $("#click-counter");

		//On click increments the value of property clickCount for currentPointGuard in the Model.data array of objects.
        $(this.pointguardImage).click(function(){
                controller.increment();
        });

		this.render();
	},

	render: function(){
		//update DOM elements with values from the currentPointGuard.
		var currentPointGuard = controller.getterPointGuard();
		$(this.countElem).text(currentPointGuard.clickCount);
		$(this.pointNameElem).text(currentPointGuard.name);
		$(this.pointguardImage).attr("src", currentPointGuard.url);
	}
};

var pointGuardListView = {
	init: function(){
		//store the DOM element for easy access.
		this.pointGuardlist = $("#point-guards");
	
		//render this view to update DOM with the correct values.
		this.render();
	},
	render: function(){
		var pg, elem, i;
		// get the cats we'll be rendering from the controller
		var data = controller.allPointGuards();
		
		//empty the point guard form
		this.pointGuardlist.innerHTML = '';

        // loop over the cats
        for (i = 0; i < data.length; i++) {
            // this is the cat we're currently looping over
            pg = data[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = pg.name;
            console.log(elem);

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(pgCopy) {
                return function() {
                    controller.setterPointGuard(pgCopy);
                    pointGuardView.render();
                };
            })(pg));

            // finally, add the element to the list
            $(this.pointGuardlist).append(elem);
        }

	}
};


controller.init();