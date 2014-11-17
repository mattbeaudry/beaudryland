
/////////////
//  *COLLISION DETECTION
/////////////



moveObject = function(direction, id, name){
	changeObjectDirection(id, direction, name);
	var x = getObjectCurrentPositionX(id);
	x = stripPX(x); x = x - gridunitpx; x = addPX(x);
	var y = getObjectCurrentPositionY(id);
	y = stripPX(y); y = y - gridunitpx; y = addPX(y);
	if (direction == "left" || direction == "right"){ var amount = x; } 
	else { var amount = y; }
	var collide = objectCollisionDetection(id, direction);
	if (!collide){
		$(".objectid-"+id).css("left",x);
		var block = getObjectCurrentBlock(id);
	} else {
		trace("Can't move object:"+id+" "+direction+" by "+amount);	
	}
};
moveObjectLeft = function(id, name) {
	changeObjectDirection(id, "left", name);
	var x = getObjectCurrentPositionX(id);
	trace(".objectid-"+id);
	trace("X"+x);
	x = stripPX(x);
	x = x - gridunitpx;
	x = addPX(x);
	var collide = objectCollisionDetection(id, "left");
	if (!collide){ 
		$('.objectid-'+id).css("left",x);
		var block = getObjectCurrentBlock(id);
	} else {
		trace("Can't move object:"+id+" left -- x="+x);	
	}
};
moveObjectRight = function(id, name) {
	changeObjectDirection(id, "right", name);
	var x = getObjectCurrentPositionX(id);
	x = stripPX(x);
	x = x + gridunitpx;
	x = addPX(x);
	var collide = objectCollisionDetection(id, "right");
	if (!collide){ 
		$(".objectid-"+id).css("left",x);
		var block = getObjectCurrentBlock(id);
	} else {
		trace("Can't move object:"+id+" right -- x="+x);	
	}
};
moveObjectUp = function(id, name) {
	changeObjectDirection(id, "up", name);
	var y = getObjectCurrentPositionY(id);
	y = stripPX(y);
	y = y - gridunitpx;
	y = addPX(y);
	var collide = objectCollisionDetection(id, "up");
	if (!collide){ 
		$('.objectid-'+id).css("top",y);
		var block = getObjectCurrentBlock(id);
	} else {
		trace("Can't move object:"+id+" up -- y="+y);	
	}
	/*
	if ( $('.the-fucking-player').offset().top < ($(window).scrollTop() + 180) ) {
		var y = $(window).scrollTop(); 
		$("html, body").animate({ scrollTop: y - 250 }, 600);
	}
	*/
};
moveObjectDown = function(id, name) {
	changeObjectDirection(id, "down", name);
	var y = getObjectCurrentPositionY(id);
	y = stripPX(y);
	y = y + gridunitpx;
	y = addPX(y);
	var collide = objectCollisionDetection(id, "down");
	if (!collide){ 
		$('.objectid-'+id).css("top",y);
		var block = getObjectCurrentBlock(id);
	} else {
		trace("Can't move object:"+id+" down -- y="+y);	
	}
	/*
	if ( $('.the-fucking-player').offset().top > ($(window).scrollTop() + $(window).height() - 60) ) {
		var y = $(window).scrollTop(); 
		$("html, body").animate({ scrollTop: y + 250 }, 600);
	}
	*/
};
objectCollisionDetection = function(id, direction) {
	var block = getObjectCurrentBlock(id);
	var row = getObjectCurrentRow(id);
	var col = getObjectCurrentCol(id);
	var selecteditem = getSelectedItem();
	switch (direction) {
		case "up": block = block - (mapwidth + 1); break;
		case "down": block = block + (mapwidth - 1); break;
		case "left": block = block - 2; break;
		case "right": block = block; break;
	}


	//space travel
	if (selecteditem == "rocket" && $('.block:eq('+block+')').hasClass('block-space')) {
		return false;
	} else if (selecteditem == "rocket") {
		return true;
	//space
	} else if ( $('.block:eq('+block+')').hasClass('block-space') ) {
		return true;
	} else if ( $('.block:eq('+block+')').hasClass('block-star') ) {
		return true;
	} else if ( $('.block:eq('+block+')').hasClass('block-redgalaxy') ) {
		return true;
	} else if ( $('.block:eq('+block+')').hasClass('block-bluegalaxy') ) {
		return true;
	} else if ( $('.block:eq('+block+')').hasClass('block-sun') ) {
		return true;
	} else if ( $('.block:eq('+block+')').hasClass('block-earth') ) {
		return true;
	//canoeing
	} else if (selecteditem == "canoe" && $('.block:eq('+block+')').hasClass('block-water')) {
		return false;
	} else if (selecteditem == "canoe") {
		return true;
	// Water
	} else if ( $('.block:eq('+block+')').hasClass('block-water') ) {
		return true;
	// Tree	
	} else if ( $('.block:eq('+block+')').hasClass('block-tree') ) {
		return true;
	// Rock
	} else if ( $('.block:eq('+block+')').hasClass('block-rock') ) {
		return true;
	// Wood
	} else if ( $('.block:eq('+block+')').hasClass('block-wood') ) {
		return true;
	// Fire
	} else if ( $('.block:eq('+block+')').hasClass('block-fire') ) {
		return true;
	// Closed Door
	} else if ( $('.block:eq('+block+')').hasClass('block-door') ) {
		return true;
	// Map right border	
	} else if ( (direction == "right" ) && (col>=mapwidth) ) {
		return true;
	// Map left border	
	} else if ( (direction == "left" ) && (col<=1) ) {
		return true;
	// Map top border
	} else if ( (direction == "up" ) && (row<=1) ) {
		return true;
	// Map bottom border	  //NEED TO ADJUST this to find out how many map blocks they have for the height limit
	} else if ( (direction == "down" ) && (row>=(mapheight*3)) ) {
		return true;	
	// PineTree	
	} else if ( $('.block:eq('+block+')').hasClass('block-pinetree') ) {
		return true;
	// IceRock
	} else if ( $('.block:eq('+block+')').hasClass('block-icerock') ) {
		return true;
	// PalmTree
	} else if ( $('.block:eq('+block+')').hasClass('block-palmtree') ) {
		return true;
	// RockBrick
	} else if ( $('.block:eq('+block+')').hasClass('block-rockbrick') ) {
		return true;
	// IceRockBrick
	} else if ( $('.block:eq('+block+')').hasClass('block-icerockbrick') ) {
		return true;
	// ClayBrick
	} else if ( $('.block:eq('+block+')').hasClass('block-claybrick') ) {
		return true;
	// Ice Sliding
	//} else if ( $('.block:eq('+block+')').hasClass('block-ice') ) {
		//slidePlayer();
		//return true;
	//Bike Riding?
	//Skiiing?
	//Canoeing
	//Driving

	// Walkable land
	} else {
		return false;
	}
};
changeObjectDirection = function(id, direction, name) {
	trace("changing object:"+id+" direction to "+direction);
	var selecteditem = getSelectedItem();
	//animated items
	var playergraphic;
	if ( selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "axe" || selecteditem == "bike" || selecteditem == "skiis" || selecteditem == "car" || selecteditem == "canoe" || selecteditem == "rocket" && name == "player" ){ 
		playergraphic = "-"+selecteditem;
	} else {
		playergraphic = "";
	}

	//clear direction and animation classes
	$('.objectid-'+id).removeClass(name+"-direction-down "+name+"-direction-left "+name+"-direction-right "+name+"-direction-up");
	$('.objectid-'+id).removeClass(name+"-direction-down"+playergraphic+" "+name+"-direction-left"+playergraphic+" "+name+"-direction-right"+playergraphic+" "+name+"-direction-up"+playergraphic);

	switch (direction) {
		case "up":
			$('.objectid-'+id).addClass(name+"-direction-up");
			if (playergraphic!="") { $('.objectid-'+id).addClass(name+"-direction-up"+playergraphic); }
			break;
		case "down":
			$('.objectid-'+id).addClass(name+"-direction-down");
			if (playergraphic!="") { $('.objectid-'+id).addClass(name+"-direction-down"+playergraphic); }
			break;
		case "left":
			$('.objectid-'+id).addClass(name+"-direction-left");
			if (playergraphic!="") { $('.objectid-'+id).addClass(name+"-direction-left"+playergraphic); }
			break;
		case "right":
			$('.objectid-'+id).addClass(name+"-direction-right");
			if (playergraphic!="") { $('.objectid-'+id).addClass(name+"-direction-right"+playergraphic); }
			break;
	}

	/*
	var mobgraphic;
	if ( name == 'enemy' || name == 'animal' ){ 
		mobgraphic = "-"+selecteditem;
	} else {
		mobgraphic = "";
	}
	*/
};
getObjectDirection = function(id, name) {
	var direction;
	var selecteditem = getSelectedItem();
	var playergraphic;
	if ( (selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "bike" || selecteditem == "skiis") && name == "player" ){ 
		playergraphic = "-"+selecteditem;
	} else {
		playergraphic = "";
	}

	if ($('.objectid-'+id).hasClass(name+"-direction-down")) {
		direction = "down";
	} else if ($('.objectid-'+id).hasClass(name+"-direction-up")) {
		direction = "up";
	} else if ($('.objectid-'+id).hasClass(name+"-direction-left")) {
		direction = "left";
	} else if ($('.objectid-'+id).hasClass(name+"-direction-right")) {
		direction = "right";
	}

	return direction;
};
