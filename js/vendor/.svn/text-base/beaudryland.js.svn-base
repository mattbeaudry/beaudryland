//////////////////////////
//
//	Beaudryland 0.1
//
//	Matt Beaudry
//	
//////////////////////////

var blocktypes = new Array(
	/*grass map*/	"grass", "dirt", "water", "tree", "rock", "hole",
	/*snow map*/  	"snow", "frozendirt", "ice", "pinetree", "icerock", "snowhole",
	/*items*/     	"wood", "shovel", "sword", "guitar", "fire", "door", "frisbee", "bike", "skiis",
	/*treasure*/  	"diamond", "diamond-hole", "gold", "gold-hole", "silver", "silver-hole"
);

/* upcoming items: sign, oil,  */

var blockclasses = "block block-tree block-wood block-rock block-shovel block-fire block-door";
var inventoryslots = 20;
var gridunitpx = 20; //must change this px value in css as well
var mapwidth = 40;
var mapheight = 30;
var enemyspeed = 300;
var projectilespeed = 50;

var totalmapblocks = mapwidth * mapheight;
var mapwidthpx = mapwidth * gridunitpx;
var mapheightpx = mapheight * gridunitpx;

/*
preloadImages = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
}
*/


/////////////
//build/save the map
/////////////


setMapSize = function() {

	//i should be calculating map size on browser load and resize and make map biggest it can be
	console.log("Render Map");

	$('.the-fucking-map').css("width", mapwidthpx+"px");
	$('.the-fucking-map').css("height", mapheightpx+"px");

}

loadNewMap = function(type) {
	
	for (var f = 0; f <= (totalmapblocks - 1); f++){
		
		//random block generation
		var r = Math.random();
		var blocktype;
		if (r<0.7) { blocktype = "grass"; }
		else if (r>0.98) { blocktype = "rock"; }
		else if (r>0.8) { blocktype = "tree"; }
		else { blocktype = "water"; }
		
		$('.the-fucking-map').append('<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>');
		
	}
	
};

/*
saveMap = function(){

	console.log("save map");
	
	var mapblocks = new Array();
	
	$('.the-fucking-map div').each(function(index){
		var blocktype = $(this).attr('data-blocktype');
		mapblocks[index] = blocktype;
	});

	mapblocks = JSON.stringify(mapblocks);
    
    $.post('php/savemap.php', {mapdata: mapblocks}, function(data) {
        $('body').append(data);
        console.log("save mapdata: "+data);
    });
    
};
*/

saveMap = function(){
	console.log("save map");
	
	//loop through blocks and create array, then jason stringify 
	
    var mapdata = $(".the-fucking-map").html();
    
    $.post('php/savemap.php', {mapdata: mapdata}, function(data) {
    
        $('body').append(data);
        console.log("save mapdata: "+data);
        
        $('.link-savemap').append(' <span><strong>map saved.</strong></span>');
		//$('.the-fucking-'+object).css("marginTop","-60px");
		setTimeout('$(".link-savemap span").remove();', 2000);
        
    });
};

loadGame = function(){

	console.log("load game");

    $.post('php/loadmap.php', {}, function(data) {

    	if (!data){
    	
    		console.log("new user");
    		loadNewMap()
    		createPlayer();
    		
    	} else {
    		console.log("existing user");
    		
    		/*
    		var mapblocks = JSON.parse(data);
    		var mapdata;
    		for (i=1; i<=(totalmapblocks+1); i++){
    			mapdata += '<div data-blockid="'+i+'" data-blocktype="'+mapblocks[i]+'" data-blockhealth="10" class="block block-'+mapblocks[i]+'"></div>';
    		}
    		$('.the-fucking-map').html(mapdata);
    		*/
    		
    		$('.the-fucking-map').html(data);
    		
    		loadPlayerInventory();
    		
    			
    		
    		
    		
    		/* LOAD WINTER MAP FUNCTION */
    		$('.the-fucking-winter-map').css("width", mapwidthpx+"px");
			$('.the-fucking-winter-map').css("height", mapheightpx+"px");
			
    		var mapdata = "";
    		for (var f = 0; f <= (totalmapblocks - 1); f++){
		
				//random block generation
				var r = Math.random();
				var blocktype;
				if (r<0.9) { blocktype = "snow"; }
				else if (r>0.98) { blocktype = "icerock"; }
				else if (r>0.96) { blocktype = "pinetree"; }
				else { blocktype = "ice"; }
				
				mapdata += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
				
			}
    		
    		$('.the-fucking-winter-map').html(mapdata);
    		
    		
    		
    		
    		
    	}
        
    });
    
};

var mapanimate;
stopMap = function(){ clearTimeout(mapanimate); }

moveMap = function(){
	
	console.log("animating the map!");
	
	//var toprow = $('.the-fucking-winter-map div').slice(40).remove();
	//$('.the-fucking-winter-map').append(toprow);
	
	//var toprow = $('.the-fucking-map div').slice(-40).remove();
	//$('.the-fucking-winter-map').prepend(toprow);
	
	var mapspeed = 200;
	mapanimate = setTimeout(scrollMap, mapspeed);
	
	function scrollMap() {
		
		var toprow = $('.the-fucking-winter-map div').slice(0,40).remove();
		$('.the-fucking-winter-map').append(toprow);
		
		mapanimate = setTimeout(scrollMap, mapspeed); // repeat thought
		
	}

}


/////////////
//create the player
/////////////


createPlayer = function(id) {
	console.log("Create Player");
	//var playerstartblock = 466;
	//changeBlockType(playerstartblock, "grass"); //make sure player doesn't start overtop an obstacle
	
	$('.the-fucking-map').append('<div class="the-fucking-player player-direction-down"></div>');
};


/////////////
//artificial intelligence
/////////////


createEnemy = function(id) {

	console.log("Create Enemy "+id);
	//var enemystartblock = 0;
	$('.the-fucking-map').append('<div class="the-fucking-enemy enemy-direction-down"></div>');
	initEnemyBrain(id);
	
};

initEnemyBrain = function(id) {

	console.log("start brain program for enemy #"+id);
	
	var t = 0;
	var maxthoughts = 500;
	var enemybrain = setTimeout(anEnemyThought, enemyspeed);
	
	function anEnemyThought() {
		
		var enemyrandom = Math.random();
		//var enemydirection;
		var enemyX = getObjectCurrentCol("enemy"); var enemyY = getObjectCurrentRow("enemy");
		var playerX = getObjectCurrentCol("player"); var playerY = getObjectCurrentRow("player");
		var PEx = playerX - enemyX; var PEy = enemyY - playerY;
		var posPEx = Math.abs(PEx); var posPEy = Math.abs(PEy);
		
		if ( (PEx == 0) && (PEy == 0)){
		
			console.log("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
			//console.log("found, the player, kill player!"); 
	
		} else if (posPEx >= posPEy) {
		
			if (PEx >= 0) { 
				console.log("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
				moveObjectRight("enemy");
			} else { 
				console.log("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
				moveObjectLeft("enemy");
			}
			
		} else {
		
			if (PEy >= 0) { 
				console.log("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
				moveObjectUp("enemy");
			} else { 
				console.log("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
				moveObjectDown("enemy");
			}
			
		}
	
		/*
		//RANDOM ENEMY MOVEMENT
		if (enemyrandom<=0.25) { moveObjectUp("enemy"); }
		else if (enemyrandom>=0.5) { moveObjectDown("enemy"); }
		else if (enemyrandom>=0.75) { moveObjectRight("enemy"); }
		else { moveObjectLeft("enemy"); }
		*/
		
		//limit
		
		if (t > maxthoughts) {
			console.log("My brain stopped :(");
			stopEnemyBrain();
			//killEnemy();
		} else {
			t++;
			enemybrain = setTimeout(anEnemyThought, enemyspeed); // repeat thought
		}
		
	}
	
	function stopEnemyBrain() {
		clearTimeout(enemybrain);
	}
	
};

killEnemy = function(id) {

	console.log("Kill Enemy "+id);
	//var enemystartblock = 0;
	//clearTimeout(enemybrain);
	$('.the-fucking-enemy').remove();
	
};

/////////////
//keyboard events
/////////////

setupKeyboardEvents = function() {

	console.log("Keyboard Events");
	
	window.addEventListener('keydown', function(event) {
	
		var selecteditem = getSelectedItem();
	
		switch (event.keyCode) {
		
			case 37: /* LEFT ARROW */
				if (selecteditem == "guitar") { playGuitarSound(880); } 
				else { moveObjectLeft("player"); }
				break;
			case 38: /* UP ARROW */
				if (selecteditem == "guitar") { playGuitarSound(1320); } 
				else { moveObjectUp("player"); }
				break;
			case 39: /* RIGHT ARROW */
				if (selecteditem == "guitar") { playGuitarSound(1100); } 
				else { moveObjectRight("player"); }
				break;
			case 40: /* DOWN ARROW */
				if (selecteditem == "guitar") { playGuitarSound(660); } 
				else { moveObjectDown("player"); }
				break;
			case 32: /* SPACE */
				playerPrimaryAction(); 
				break;
			case 77: /* M */
				createEnemy();
				break;
			case 75: /* K */
				killEnemy(1);
				break;
			case 66: /* B */
				saveMap();
				break;
			case 67: /* C */
				loadMap();
				break;
			case 65: /* A */
				moveMap();
				break;
			case 68: /* D */
				stopMap();
				break;
			case 69: /* E */
				playMusic();
				break;
			case 13: /* ENTER */
				drawThoughtBubble("player","Hello!");
				break;
			
				/*
				f 70
				g 71
				h 72
				i 73
				*/
				
		}
		
	}, false);

	//prevent keys from scrolling page
	$(document).keydown(function (e) {
	    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
	    if ( ((key == 37) || (key == 38) || (key == 39) || (key == 40) || (key == 32)) && (e.target.className != null))
	       e.preventDefault();
	});

};

drawThoughtBubble = function(object, text) {

	$('.the-fucking-'+object).append('<div class="speech-bubble"><form class="bubble-form"><textarea class="bubble-text" rows="1" cols="30"></textarea></form></div>');
	$('.bubble-form').submit(function(e) { 
		//e.preventDefault(); 
	});
	$('.bubble-text').focus();
	
	//setTimeout('$(".speech-bubble").remove();', 1000);
	
};


/////////////
//click events
/////////////


setupMouseEvents = function() {

	console.log("Mouse Events");
	
	$('.the-fucking-inventory > div').on("click", function() {
	
		if ( $(this).attr('data-blocktype') != "empty" ){
			var blocktype = $(this).attr('data-blocktype');
			moveItemToCraftingTable(blocktype);
		}
	
		var playerdirection = getObjectDirection("player");
		$('.the-fucking-inventory > div').removeClass("selected-item");
		$(this).addClass('selected-item');
		var selecteditem = $(this).attr('data-blocktype');
		
		//alert(playerdirection);
		
		if ( selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "bike" || selecteditem == "skiis" ){
			console.log("selected item has animation");
			$('.the-fucking-player').addClass("player-direction-"+playerdirection+"-"+selecteditem);
		} else {
			$('.the-fucking-player').removeClass("player-direction-"+playerdirection+"-"+selecteditem);
		}
	
	});
	
	$('.the-fucking-crafting-table > div').on("click", function() {
		
		var blocktype = $(this).attr('data-blocktype');
		
		if (blocktype != "empty"){
			console.log("crafting slot not empty");
			$(this).removeClass("block block-"+blocktype);
			$(this).addClass("empty");
			$(this).attr('data-blocktype', "empty");
			$(this).html("0");
			
			addToInventory(blocktype,"1");
			checkCraftingTableForItem();
		}
	
	});
	
	$('.the-fucking-crafted-item > div').on("click", function() {
		
		if (!$('.the-fucking-crafted-item > div').hasClass("empty")){
		
			var blocktype = $(this).attr('data-blocktype');
			var itemquantity = $(this).html();
			console.log("You crafted" + itemquantity + " " + blocktype);
			
			$('.the-fucking-crafted-item > div').removeClass("block block-tree block-wood block-fire block-sword block-rock block-shovel block-door-closed block-guitar block-frisbee block-bike block-skiis");
			$('.the-fucking-crafted-item > div').html("0");
			
			removeAllItemsFromCraftingTable();
			addToInventory(blocktype, itemquantity);
			checkCraftingTableForItem();
			
		}
		
	});
	
	$('.link-savemap').on("click", function(){
		saveMap();
		savePlayerInventory();
	});
	
};

/////////////
//control pad for mobile
/////////////

setupControlPadEvents = function() {

	console.log("Control Pad Events");
	
	$('.btn-up').on("touchstart", function() { 
		moveObjectUp("player"); 
	});
	$('.btn-down').on("touchstart", function() { 
		moveObjectDown("player"); 
	});
	$('.btn-left').on("touchstart", function() { 
		moveObjectLeft("player"); 
	});
	$('.btn-right').on("touchstart", function() { 
		moveObjectRight("player"); 
	});
	$('.btn-a').on("touchstart", function() { 
		playerPrimaryAction(); 
	});

};


/////////////
//player movement
/////////////


moveObjectLeft = function(object) {
	
	changeObjectDirection(object, "left");
	var x = getObjectCurrentPositionX(object);
	x = stripPX(x);
	x = x - gridunitpx;
	x = addPX(x);
	var collide = objectCollisionDetection(object, "left");
	if (!collide){ 
		console.log("Moving "+object+" left -- x="+x);
		$('.the-fucking-'+object).css("left",x); 
		var block = getObjectCurrentBlock(object);
	} else {
		console.log("Can't move "+object+" left -- x="+x);	
	}
	
};

moveObjectRight = function(object) {

	changeObjectDirection(object, "right");
	var x = getObjectCurrentPositionX(object);
	x = stripPX(x);
	x = x + gridunitpx;
	x = addPX(x);
	var collide = objectCollisionDetection(object, "right");
	if (!collide){ 
		console.log("Moving "+object+" right -- x="+x);
		$('.the-fucking-'+object).css("left",x); 
		var block = getObjectCurrentBlock(object);
	} else {
		console.log("Can't move "+object+" right -- x="+x);	
	}
	
};

moveObjectUp = function(object) {
	changeObjectDirection(object, "up");
	var y = getObjectCurrentPositionY(object);
	y = stripPX(y);
	y = y - gridunitpx;
	y = addPX(y);
	var collide = objectCollisionDetection(object, "up");
	if (!collide){ 
		console.log("Moving "+object+" up -- y="+y);
		$('.the-fucking-'+object).css("top",y); 
		var block = getObjectCurrentBlock(object);
	} else {
		console.log("Can't move "+object+" up -- y="+y);	
	}
};

moveObjectDown = function(object) {
	changeObjectDirection(object, "down");
	var y = getObjectCurrentPositionY(object);
	y = stripPX(y);
	y = y + gridunitpx;
	y = addPX(y);
	var collide = objectCollisionDetection(object, "down");
	if (!collide){ 
		console.log("Moving "+object+" down -- y="+y);
		$('.the-fucking-'+object).css("top",y); 
		var block = getObjectCurrentBlock(object);
	} else {
		console.log("Can't move "+object+" down -- y="+y);	
	}
};

objectCollisionDetection = function(object, direction) {
	
	var block = getObjectCurrentBlock(object);
	var row = getObjectCurrentRow(object);
	var col = getObjectCurrentCol(object);
	
	switch (direction) {
		case "up": block = block - (mapwidth + 1); break;
		case "down": block = block + (mapwidth - 1); break;
		case "left": block = block - 2; break;
		case "right": block = block; break;
	}

	// Water
	if ( $('.block:eq('+block+')').hasClass('block-water') ) {
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
	} else if ( $('.block:eq('+block+')').hasClass('block-door-closed') ) {
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
		
	// Map bottom border	
	} else if ( (direction == "down" ) && (row>=(mapheight*2)) ) {
		return true;
		
	// PineTree	
	} else if ( $('.block:eq('+block+')').hasClass('block-pinetree') ) {
		return true;
	
	// IceRock
	} else if ( $('.block:eq('+block+')').hasClass('block-icerock') ) {
		return true;
		
	// Ice Sliding
	//} else if ( $('.block:eq('+block+')').hasClass('block-ice') ) {
		//slidePlayer();
		//return true;
		
	//Bike Riding?
	
	//Skiiing?
		
	// Walkable land
	} else {
		return false;
	}
	
};

changeObjectDirection = function(object, direction) {

	console.log("changing "+object+" direction to "+direction);
	var selecteditem = getSelectedItem();
	
	//animated items
	var playergraphic;
	if ( (selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "bike" || selecteditem == "skiis") && object == "player" ){ 
		playergraphic = "-"+selecteditem;
	} else {
		playergraphic = "";
	}

	switch (direction) {
		case "up":
			$('.the-fucking-'+object).removeClass(object+"-direction-down"+playergraphic+" "+object+"-direction-left"+playergraphic+" "+object+"-direction-right"+playergraphic);
			$('.the-fucking-'+object).addClass(object+"-direction-up"+playergraphic);
			break;
		case "down":
			$('.the-fucking-'+object).removeClass(object+"-direction-up"+playergraphic+" "+object+"-direction-left"+playergraphic+" "+object+"-direction-right"+playergraphic);
			$('.the-fucking-'+object).addClass(object+"-direction-down"+playergraphic);
			break;
		case "left":
			$('.the-fucking-'+object).removeClass(object+"-direction-up"+playergraphic+" "+object+"-direction-down"+playergraphic+" "+object+"-direction-right"+playergraphic);
			$('.the-fucking-'+object).addClass(object+"-direction-left"+playergraphic);
			break;
		case "right":
			$('.the-fucking-'+object).removeClass(object+"-direction-up"+playergraphic+" "+object+"-direction-left"+playergraphic+" "+object+"-direction-down"+playergraphic);
			$('.the-fucking-'+object).addClass(object+"-direction-right"+playergraphic);
			break;
	}
	
};

getObjectDirection = function(object) {

	var direction;
	var selecteditem = getSelectedItem();
	
	var playergraphic;
	if ( (selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "bike" || selecteditem == "skiis") && object == "player" ){ 
		playergraphic = "-"+selecteditem;
	} else {
		playergraphic = "";
	}
	
	if ($('.the-fucking-'+object).hasClass(object+"-direction-down"+playergraphic)) {
		direction = "down";
	} else if ($('.the-fucking-'+object).hasClass(object+"-direction-up"+playergraphic)) {
		direction = "up";
	} else if ($('.the-fucking-'+object).hasClass(object+"-direction-left"+playergraphic)) {
		direction = "left";
	} else if ($('.the-fucking-'+object).hasClass(object+"-direction-right"+playergraphic)) {
		direction = "right";
	}
	
	return direction;
	
};


/////////////
//player actions
/////////////


playerPrimaryAction = function() {

	alert("sdfsD");
	
	console.log("Player primary action");
	
	//alert("sdfgdsfg"+getObjectDirection("player"));
	
	//find block that the player is facing
	var direction = getObjectDirection("player");
	var block = getObjectCurrentBlock("player");
	
	//alert(direction);
	
	switch (direction) {
		case "up": block = block - (mapwidth+1); break;
		case "down": block = block + (mapwidth-1);; break;
		case "left": block = block - 2; break;
		case "right": block = block; break;
	}
	
	var blocktype = getBlockType(block);
	var selecteditem = getSelectedItem();
	
	if (selecteditem == "sword" || selecteditem == "shovel"){
	
		$(".the-fucking-player").addClass("player-direction-"+direction+"-"+selecteditem+"-swing");
		setTimeout('$(".the-fucking-player").removeClass("player-direction-"+direction+"-"+selecteditem+"-swing");', 100);
		
		//var enemyblock = getObjectCurrentBlock("enemy");
		//console.log(block+" "+enemyblock);
		//if (block == enemyblock){
		//alert("stabbed enemy!");
		//}
		
	} else if (selecteditem == "frisbee"){
	
		throwFrisbee(block, direction);
	
	}
	
	$('.block:eq('+block+')').animate({ opacity: 0.9 }, 50, function() {
		
		//console.log("play sound");
		
		//hit animation
		$('.block:eq('+block+')').css("opacity","1");
		var selecteditem = getSelectedItem();
		
		//digging
		if ( (getSelectedItem() == "shovel") && ( (blocktype == "grass") || (blocktype == "dirt") ) ){
			console.log("dig!");
			//chance of digging a diamond
			var r = Math.random();
			if (r < 0.5) {
				console.log("diamond!");
				changeBlockType(block, "diamond-hole");
			} else {
				changeBlockType(blocktype, "hole");
			}
			addToInventory(blocktype, 2);
			
		} else if ( (getSelectedItem() == "shovel") && ( (blocktype == "snow") || (blocktype == "frozendirt") ) ){
		
			//chance of digging gold
			var r = Math.random();
			if (r < 0.2) {
				console.log("gold!");
				changeBlockType(block, "gold-hole");
			} else if (r < 0.4) {
				console.log("silver!");
				changeBlockType(block, "silver-hole");
			} else {
				changeBlockType(block, "snowhole");
			}
			addToInventory(blocktype, 2);
			
		}
			
		//check for placable block on map
		if ( (blocktype == "grass") || (blocktype == "dirt") ||
		     (blocktype == "snow") || (blocktype == "frozendirt") || (blocktype == "ice") ) {
			
			//check for selected placable block in inventory
			
			console.log('selected item is '+selecteditem);
			
			//placable blocks: trees, rocks, wood, fire, doors, dirt, water, frozendirt, snow, diamond, gold, pinetree
			if ( 	(selecteditem == "rock") ||
					(selecteditem == "tree") ||
					(selecteditem == "wood") ||
					(selecteditem == "fire") ||
					(selecteditem == "door-closed") ||
					(selecteditem == "dirt") ||
					(selecteditem == "frozendirt") ||
					(selecteditem == "snow") ||
					(selecteditem == "pinetree") ||
					(selecteditem == "icerock") ||
					(selecteditem == "gold") ||
					(selecteditem == "diamond")
					){
			
				console.log('a placable item is selected');
				removeFromInventory(selecteditem);
				changeBlockType(block, selecteditem);
				
			}
			
		}
		
		//fill holes and water
		if ( (blocktype == "hole") || (blocktype == "water") || (blocktype == "snowhole")) {

			if ((selecteditem == "dirt") || ((selecteditem == "frozendirt")) || ((selecteditem == "snow"))) {
				console.log("fill hole/water with dirt or snow");
				changeBlockType(block, getSelectedItem());
				removeFromInventory(getSelectedItem());
				growGrass(block);
				if(blocktype=="water"){ addToInventory("water", 1); }
			}
			
		}

		//pickup trees, rocks, wood, fire, diamonds, gold, 
		if ( 	(blocktype == "tree") ||
				(blocktype == "rock") ||
				(blocktype == "wood") ||
				(blocktype == "fire") ||
				(blocktype == "diamond-hole") ||
				(blocktype == "gold-hole") ||
				(blocktype == "silver-hole") ||
				(blocktype == "pinetree") ||
				(blocktype == "icerock")
				){
			
			var changeblocktotype = "dirt";
		
			if (blocktype == "diamond-hole") { blocktype = "diamond"; changeblocktotype = "hole"; } 
			else if (blocktype == "gold-hole") { blocktype = "gold"; changeblocktotype = "snowhole"; } 
			else if (blocktype == "silver-hole") { blocktype = "silver"; changeblocktotype = "snowhole"; }
			
			addToInventory(blocktype, "1");
			changeBlockType(block, changeblocktotype);
			growGrass(block);
			
			
		}
		
		//open/close doors
		if (blocktype == "door-closed") {
			changeBlockType(block, "door-open");
		} else if (blocktype == "door-open") {
			changeBlockType(block, "door-closed");
		}
		
	});
	
};

throwFrisbee = function(startblock, direction) {
	
	console.log("Create Frisbee");
	//var enemystartblock = 0;
	//$('.the-fucking-frisbee').remove();
	$('.the-fucking-map').append('<div class="the-fucking-frisbee"></div>');
	initProjectile("frisbee", startblock, direction);
	
};

initProjectile = function(object, startblock, direction) {

	console.log("Start velocity for " + object + " travelling " + direction + " from block #" + startblock);
	
	var topstart = getBlockTopByID(startblock);
	var leftstart = getBlockLeftByID(startblock);
	topstart = addPX(topstart);
	leftstart = addPX(leftstart);
	
	$('.the-fucking-'+object).css("top",topstart);
	$('.the-fucking-'+object).css("left",leftstart);

	var t = 0;
	var maxdistance = 15;
	var projectilebrain = setTimeout(projectileMotion, projectilespeed);
	
	function projectileMotion() {
	
		switch (direction) {
			case "up": moveObjectUp(object); break;
			case "down": moveObjectDown(object); break;
			case "left": moveObjectLeft(object); break;
			case "right": moveObjectRight(object); break;
		}
		
		/*
		var enemyX = getObjectCurrentCol("enemy"); var enemyY = getObjectCurrentRow("enemy");
		var playerX = getObjectCurrentCol("player"); var playerY = getObjectCurrentRow("player");
		var PEx = playerX - enemyX; var PEy = enemyY - playerY;
		var posPEx = Math.abs(PEx); var posPEy = Math.abs(PEy);
		
		if ( (PEx == 0) && (PEy == 0)){
		
			console.log("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
			//console.log("found, the player, kill player!"); 
	
		} else if (posPEx >= posPEy) {
		
			if (PEx >= 0) { 
				console.log("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
				moveObjectRight("enemy");
			} else { 
				console.log("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
				moveObjectLeft("enemy");
			}
			
		} else {
		
			if (PEy >= 0) { 
				console.log("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
				moveObjectUp("enemy");
			} else { 
				console.log("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
				moveObjectDown("enemy");
			}
			
		}
		*/
		
		//limit
		
		if (t > maxdistance) {
			console.log("projectile stopped :(");
			stopProjectile();
		} else {
			t++;
			projectilebrain = setTimeout(projectileMotion, projectilespeed); // repeat thought
		}
		
	}
	
	function stopProjectile() {
		clearTimeout(projectilebrain);
		$('.the-fucking-'+object).remove();
	}

	
};


/////////////
//map interactions
/////////////


changeBlockType = function(block, newtype) {

	console.log("changing block "+block+" to "+newtype);
	$('.block:eq('+block+')').removeClass("block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt");
	$('.block:eq('+block+')').addClass("block block-"+newtype);
	$('.block:eq('+block+')').attr("data-blocktype", newtype);

};

growGrass = function(block) {
	
	console.log("growing grass at block" + block);
	
	$('.block:eq('+block+')').animate({
      	backgroundColor: "#36ac2a"
  	}, 10000, function() {
  		console.log("grass has been grown at block "+block+", calling changeBlockType()");
  		changeBlockType(block, "grass");
  	});
	
};


/////////////
//inventory
/////////////


addToInventory = function(blocktype, quantitytoadd) {
	
	if(!quantitytoadd) { quantitytoadd == "1"; }
	quantitytoadd = parseInt(quantitytoadd);
	
	var slotwithsameitem = $('.the-fucking-inventory > .block-'+blocktype).index();
	
	// add to slot with matching item
	if ( slotwithsameitem != -1 ) {
	
		console.log("adding "+quantitytoadd+" "+blocktype+" to stack in inv.");
		var quantity = $('.the-fucking-inventory > div:eq('+slotwithsameitem+')').html();
		quantity = parseInt(quantity) + quantitytoadd;
		$('.the-fucking-inventory > div:eq('+slotwithsameitem+')').html(quantity);
		
	// add to empty slot
	} else {
	
		console.log("adding "+quantitytoadd+" "+blocktype+" to empty slot in inv.");
		$('.the-fucking-inventory > .empty').first().addClass('block block-'+blocktype);
		$('.the-fucking-inventory > .empty').first().attr('data-blocktype', blocktype);
		$('.the-fucking-inventory > .empty').first().html(quantitytoadd);
		
		var index = $('.the-fucking-inventory > .empty').first().index();
		index = index + 1;
		
		$('.the-fucking-inventory > .empty').first().removeClass('empty');
		
	}
	
};

removeFromInventory = function(blocktype) {
	
	//minus one item from stack
	var quantity = $('.the-fucking-inventory > .block-'+blocktype).html();
	quantity = parseInt(quantity) - 1;
	$('.the-fucking-inventory > .block-'+blocktype).html(quantity);
	
	//alert(quantity);
	
	//empty slot if stack runs out for items
	if (quantity == 0) {
		var slotindex = $('.the-fucking-inventory > .block-'+blocktype).index();
		//alert("make arrow empty"+slotindex);
		
		$('.the-fucking-inventory > .block-'+blocktype).addClass('empty');
		$('.the-fucking-inventory > .block-'+blocktype).attr('data-blocktype', 'empty');
		$('.the-fucking-inventory > .block-'+blocktype).removeClass('block block-'+blocktype);
		
	}
	
};

savePlayerInventory = function() {
	
	var inventoryItems = new Array();
	for (i=1; i<=inventoryslots; i++){ inventoryItems[i]=new Object(); }
	
	$('.the-fucking-inventory > div').each(function(index){
		var amount = $(this).html();
		var blocktype = $(this).attr('data-blocktype');
		console.log("inventory slot "+index+" = "+amount+blocktype);
		inventoryItems[index] = {type:blocktype, amount:amount};
	});

	console.log("saved inventory = "+inventoryItems);
	inventoryItems = JSON.stringify(inventoryItems);
	
	$.post('php/saveinventory.php', {inventory: inventoryItems}, function(data) {

        console.log("saved inventory: "+data);
        
    });
	
};

loadPlayerInventory = function() {
	
	$.post('php/loadinventory.php', function(data) {
    
        //$('.the-fucking-map').append(data);
        console.log("loading inv");
        
        if (data == false) {
        	//alert("inv query fail");
        }
        
        var inventoryitems = JSON.parse(data);
    	
    	for (var i = 0; i < (inventoryitems.length-1); i++) {
    	
    		$('.the-fucking-inventory > div:eq('+i+')').html(inventoryitems[i].amount);
    		
    		if (inventoryitems[i].amount !== "0"){
    			$('.the-fucking-inventory > div:eq('+i+')').attr('data-blocktype', inventoryitems[i].type);
    			$('.the-fucking-inventory > div:eq('+i+')').removeClass('empty');
    			$('.the-fucking-inventory > div:eq('+i+')').addClass('block block-'+inventoryitems[i].type);
    		}
    		
		    console.log("loadinventory item "+i+inventoryitems[i].type+inventoryitems[i].amount);

		}
        
    });
	
};


/////////////
//crafting table
/////////////


moveItemToCraftingTable = function(blocktype) {

	if ( $('.the-fucking-crafting-table > .slot-1').hasClass("empty") ) {
	
		$('.the-fucking-crafting-table > .slot-1').addClass("block-"+blocktype);
		$('.the-fucking-crafting-table > .slot-1').removeClass("empty");
		$('.the-fucking-crafting-table > .slot-1').attr('data-blocktype', blocktype);
		$('.the-fucking-crafting-table > .slot-1').html("1");
		removeFromInventory(blocktype);
		
	} else if ( $('.the-fucking-crafting-table > .slot-2').hasClass("empty") ) {
	
		$('.the-fucking-crafting-table > .slot-2').addClass("block-"+blocktype);
		$('.the-fucking-crafting-table > .slot-2').removeClass("empty");
		$('.the-fucking-crafting-table > .slot-2').attr('data-blocktype', blocktype);
		$('.the-fucking-crafting-table > .slot-2').html("1");
		removeFromInventory(blocktype);
		
	} else if ( $('.the-fucking-crafting-table > .slot-3').hasClass("empty") ) {
	
		$('.the-fucking-crafting-table > .slot-3').addClass("block-"+blocktype);
		$('.the-fucking-crafting-table > .slot-3').removeClass("empty");
		$('.the-fucking-crafting-table > .slot-3').attr('data-blocktype', blocktype);
		$('.the-fucking-crafting-table > .slot-3').html("1");
		removeFromInventory(blocktype);
		
	}	

	checkCraftingTableForItem();
	
};

removeAllItemsFromCraftingTable = function() {

	$('.the-fucking-crafting-table > div').removeClass("block block-tree block-wood block-guitar block-rock block-shovel block-fire block-sword block-door-closed block-diamond block-frisbee block-gold block-dirt block-water block-pinetree block-icerock block-ice block-snow block-frozendirt");
	$('.the-fucking-crafting-table > div').attr("data-blocktype", "empty");
	$('.the-fucking-crafting-table > div').addClass("empty");
	$('.the-fucking-crafting-table > div').html("0");
	
};

checkCraftingTableForItem = function() {

	console.log("Check for Craftable Item");
	
	//wood
	if (
	($('.the-fucking-crafting-table > .slot-1').hasClass("block-tree")) &&
	($('.the-fucking-crafting-table > .slot-2').hasClass("empty")) &&
	($('.the-fucking-crafting-table > .slot-3').hasClass("empty"))) {
	
		$('.the-fucking-crafted-item > .slot').addClass("block block-wood");
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'wood');
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html("1");
	
	//wood x 2
	} else if (
	($('.the-fucking-crafting-table > .slot-1').hasClass("block-tree")) &&
	($('.the-fucking-crafting-table > .slot-2').hasClass("block-tree")) &&
	($('.the-fucking-crafting-table > .slot-3').hasClass("empty"))) {
	
		$('.the-fucking-crafted-item > .slot').addClass("block block-wood");
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'wood');
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html("2");
	
	//wood x 6
	} else if (
	($('.the-fucking-crafting-table > .slot-1').hasClass("block-tree")) &&
	($('.the-fucking-crafting-table > .slot-2').hasClass("block-tree")) &&
	($('.the-fucking-crafting-table > .slot-3').hasClass("block-tree"))) {
	
		$('.the-fucking-crafted-item > .slot').addClass("block block-wood");
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'wood');
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html("6");
	
	//shovel
	} else if (
	($('.the-fucking-crafting-table > .slot-1').hasClass("block-rock")) &&
	($('.the-fucking-crafting-table > .slot-2').hasClass("block-wood")) &&
	($('.the-fucking-crafting-table > .slot-3').hasClass("block-wood"))) {
	
		$('.the-fucking-crafted-item > .slot').addClass("block block-shovel");
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'shovel');
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html("1");
	
	//sword
	} else if (
	($('.the-fucking-crafting-table > .slot-1').hasClass("block-rock")) &&
	($('.the-fucking-crafting-table > .slot-2').hasClass("block-rock")) &&
	($('.the-fucking-crafting-table > .slot-3').hasClass("block-wood"))) {
	
		$('.the-fucking-crafted-item > .slot').addClass("block block-sword");
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'sword');
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html("1");
	
	//fire
	} else if (
	($('.the-fucking-crafting-table > .slot-1').hasClass("block-wood")) &&
	($('.the-fucking-crafting-table > .slot-2').hasClass("block-wood")) &&
	($('.the-fucking-crafting-table > .slot-3').hasClass("block-rock"))) {
	
		$('.the-fucking-crafted-item > .slot').addClass("block block-fire");
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'fire');
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html("1");
	
	//door
	} else if (
	($('.the-fucking-crafting-table > .slot-1').hasClass("block-wood")) &&
	($('.the-fucking-crafting-table > .slot-2').hasClass("block-wood")) &&
	($('.the-fucking-crafting-table > .slot-3').hasClass("block-wood"))) {
	
		$('.the-fucking-crafted-item > .slot').addClass("block block-door-closed");
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'door-closed');
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html("1");
	
	//guitar
	} else if (
	($('.the-fucking-crafting-table > .slot-1').hasClass("block-tree")) &&
	($('.the-fucking-crafting-table > .slot-2').hasClass("block-wood")) &&
	($('.the-fucking-crafting-table > .slot-3').hasClass("block-wood"))) {
	
		$('.the-fucking-crafted-item > .slot').addClass("block block-guitar");
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'guitar');
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html("1");
	
	//frisbee
	} else if (
	($('.the-fucking-crafting-table > .slot-1').hasClass("block-wood")) &&
	($('.the-fucking-crafting-table > .slot-2').hasClass("block-diamond")) &&
	($('.the-fucking-crafting-table > .slot-3').hasClass("block-wood"))) {
	
		$('.the-fucking-crafted-item > .slot').addClass("block block-frisbee");
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'frisbee');
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html("1");
		
	//bike
	} else if (
	($('.the-fucking-crafting-table > .slot-1').hasClass("block-tree")) &&
	($('.the-fucking-crafting-table > .slot-2').hasClass("block-diamond")) &&
	($('.the-fucking-crafting-table > .slot-3').hasClass("block-wood"))) {
	
		$('.the-fucking-crafted-item > .slot').addClass("block block-bike");
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'bike');
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html("1");
		
	//skiis
	} else if (
	($('.the-fucking-crafting-table > .slot-1').hasClass("block-tree")) &&
	($('.the-fucking-crafting-table > .slot-2').hasClass("block-diamond")) &&
	($('.the-fucking-crafting-table > .slot-3').hasClass("block-diamond"))) {
	
		$('.the-fucking-crafted-item > .slot').addClass("block block-skiis");
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'skiis');
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html("1");
				
	} else {
		
		//no item
		$('.the-fucking-crafted-item > .slot').removeClass("block block-wood");
		$('.the-fucking-crafted-item > .slot').addClass("empty");
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'empty');
		$('.the-fucking-crafted-item > .slot').html("0");
		
	}
	
};


/////////////
//sound and instruments
/////////////


playGuitarSound = function(freq) {

	sin = T("sin", freq);
	env = T("adsr", 10, 500);
	
	syn = T("*", sin, env).play();
	
	sin.bang();
	env.bang();
	
};

playMusic = function(){

	var mml   = T("mml", "t100 o3 $ l2 a l1 <b0<d0g+>> l2 d l1 <a0<c+0f+>>");
	            
	mml.synth = T("efx.reverb");
	mml.synthdef = function(freq, opts) {
	    var synth = T("*", T("+", 
	                       T("tri", freq - 1, 0.25)),
	                       T("adsr", "24db", 100, 2500, 0.6, 1500));
	    synth.keyon = function(opts) {
	        synth.args[1].bang();
	    };
	    synth.keyoff = function(opts) {
	        synth.args[1].keyoff();
	    };
	    return synth;
	};
	 
	mml.synth.onplay = function() {
	    mml.on().bang();
	};
	mml.synth.onpause = function() {
	    mml.off();
	};
	 
	mml.synth.play();
	
}
		

/////////////
//helper classes
/////////////


getSelectedItem = function() {
	var blocktype = $('.the-fucking-inventory > .selected-item').attr("data-blocktype");
	return blocktype;
};

getBlockType = function(block) {
	var blocktype = $('.block:eq('+block+')').attr("data-blocktype");	
	return blocktype;
};

getBlockLeftByID = function(block) {
	var column = block % mapwidth;
	column = column;
	var leftpx = column * gridunitpx;
	return leftpx;
	alert(leftpx);
};

getBlockTopByID = function(block) {
	var row = block / mapwidth;
	row = parseInt(row);
	var toppx = row * gridunitpx;
	console.log("block "+block+", row"+row+", toppx"+toppx);
	return toppx;
};

getObjectCurrentPositionX = function(object) {
	var x = $('.the-fucking-'+object).css("left");
	return x;
};

getObjectCurrentPositionY = function(object) {
	var y = $('.the-fucking-'+object).css("top");
	return y;
};

getObjectCurrentCol = function(object) {
	var x = getObjectCurrentPositionX(object);
	x = stripPX(x);
	var y = getObjectCurrentPositionY(object);
	y = stripPX(y);
	var col = x / gridunitpx;
	col = parseInt(col);
	col = col + 1;
	return col;
};

getObjectCurrentRow = function(object) {
	var y = getObjectCurrentPositionY(object);
	y = stripPX(y);
	var row = y / gridunitpx;
	row = parseInt(row);
	row = row + 1;
	return row;
};

getObjectCurrentBlock = function(object) {
	var row = getObjectCurrentRow(object);
	var col = getObjectCurrentCol(object);
	var block = (row * mapwidth) - mapwidth;
	block = block + col;
	console.log(object+" is at block# "+block);
	return block;
};

stripPX = function(css) {
	px = css.replace( /px/g , "" );
	px = parseInt(px);
	return px;
};

addPX = function(css) {
	px = css.toString() + "px";
	return px;
};

$(document).ready(function() {
	setMapSize();
	loadGame();
	setupKeyboardEvents();
	setupMouseEvents();
	setupControlPadEvents();
});