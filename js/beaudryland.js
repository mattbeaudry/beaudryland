/*////////////////////////
//////////////////////////
//
//	Beaudryland 5
//  
//	Matt Beaudry
//	
//	Summer 2013
//	
//////////////////////////
////////////////////////*/





/////////////
//  GAME SETTINGS & GLOBALS
/////////////


var mobtypes = new Array(
	/*players*/		"player",
	/*enemies*/		"enemy",
	/*animals*/		"deer"
);
var blocktypes = new Array(
	/*forest map*/	"grass", "dirt", "water", "tree", "rock", "hole",
	/*winter map*/  "snow", "frozendirt", "ice", "pinetree", "icerock", "snowhole",
	/*beach map*/  	"sand", "wetsand", "wave", "palmtree", "sandstone", "sandhole",
	/*items*/     	"shovel", "wood", "fire", "door", "door-open", "frisbee", "sign",
	/*weapons*/		"sword", "spear", "axe",
	/*instruments*/ "guitar", "piano",
	/*transport*/	"bike", "skiis", "canoe", "car",
	/*treasure*/  	"diamond", "gold", "silver", "oil", "clay",
	/*holes*/		"diamond-hole", "gold-hole", "silver-hole", "oil-hole", "clay-hole",
	/*blocks*/     	"rockbrick", "icerockbrick", "sandstonebrick", "claybrick", "road"
);
var allblockclasses = ""; $.each(blocktypes, function(i, v) { allblockclasses += "block-"+v+" "; });

//var craftableblockclasses = "";
var inventoryslots = 44;
var gridunitpx = 20; //must change this px value in css as well
var mapwidth = 40;
var mapheight = 30;
var enemyspeed = 200;
var animalspeed = 1000;
var projectilespeed = 50;
var bikespeed = 100;
var totalmapblocks = mapwidth * mapheight;
var mapwidthpx = mapwidth * gridunitpx;
var mapheightpx = mapheight * gridunitpx;

var objectsArray = [0,2,3];
uniqueObjectID = function() {
	var id = objectsArray.length + 1;
	trace("uniqueID:"+id);
	objectsArray.push(id);
	return id;
};



/////////////
//  GAME LOGIC
/////////////



$(document).ready(function() {
	setMapSize();
	loadGame();
	setupKeyboardEvents();
	setupMouseEvents();
	setupControlPadEvents();
});

window.onbeforeunload = confirmExit;
function confirmExit() {
	return "Sure you don't wanna SAVE first? You should use the SAVE button before you leave!";
}



/////////////
//  MAPS
/////////////



loadGame = function(){
	trace("load game");
    $.post('php/loadmap.php', {maptype:'forest'}, function(data) {
    	if (data == false){

    		trace("new user");
    		loadNewMap();
    		createPlayer();

    	} else {
    		
    		loadMap('forest');

    		$.post('php/loadmap.php', {maptype:'winter'}, function(data) {
    			if (data){
    				trace("loadwintermap");
    				loadMap('winter');
    			}
			});

			$.post('php/loadmap.php', {maptype:'beach'}, function(data) {
				if (data){
					trace("loadbeachmap");
					loadMap('beach');
				}
			});
			
			loadPlayer();

    	}	
    });
};
loadMap = function(maptype){
	$.post('php/loadmap.php', {maptype:maptype}, function(data) {
		trace("existing user");
		var mapblocks = JSON.parse(data);
		var mapdata = "";
		var total = totalmapblocks;
		for (i=0; i<total; i++){
			mapdata += '<div data-blockid="'+i+'" data-blocktype="'+mapblocks[i]+'" data-blockhealth="10" class="block block-'+mapblocks[i]+'"></div>';
		}
		if (maptype == 'forest'){
			$('.the-fucking-map').html(mapdata);
		} else if (maptype == 'winter'){
			$('.maps-wrap').append('<div class="the-fucking-winter-map" data-maptype="winter"></div>');
			$('.the-fucking-winter-map').css("width", mapwidthpx+"px");
			$('.the-fucking-winter-map').css("height", mapheightpx+"px");
			$('.the-fucking-winter-map').html(mapdata);
		} else if (maptype == 'beach'){
			$('.maps-wrap').append('<div class="the-fucking-beach-map" data-maptype="beach"></div>');
			$('.the-fucking-beach-map').css("width", mapwidthpx+"px");
			$('.the-fucking-beach-map').css("height", mapheightpx+"px");
			$('.the-fucking-beach-map').html(mapdata);
			startWaves();
		}
	});
};
setMapSize = function() {
	trace("Render Map");
	$('.the-fucking-map').css("width", mapwidthpx+"px");
	$('.the-fucking-map').css("height", mapheightpx+"px");
};
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
saveMap = function(){
	trace("save map");
	var playerdiv = $('.the-fucking-player').prop("outerHTML");
	$('.the-fucking-player').remove();
	//save forest map
	var mapblocks = new Array();
	var total = totalmapblocks;
    for (i=0; i<=total; i++){
    	var blocktype = $('.the-fucking-map div:eq('+i+')').attr('data-blocktype');
		mapblocks[i] = blocktype;
		/*if (blocktype == sign) {
				
		}*/
	}
	var jsonmapblocks = JSON.stringify(mapblocks);
    $.post('php/savemap.php', {mapdata: jsonmapblocks, maptype:'forest'}, function(data) {
        //$('body').append(data);
        trace("save mapdata: "+data);
    });
    //save winter map
    if ($('.the-fucking-winter-map').length) {
		var wintermapblocks = new Array();
		var total = totalmapblocks;
		for (i=0; i<=total; i++){
			var blocktype = $('.the-fucking-winter-map div:eq('+i+')').attr('data-blocktype');
			//snowing on blocks and cleaning up map
			/*if (blocktype == "dirt") { blocktype = "snow"; }
			if (blocktype == "hole") { blocktype = "snow"; }
			if (blocktype == "frozendirt") { blocktype = "snow"; }
			if (blocktype == "icehole") { blocktype = "snow"; }*/

			wintermapblocks[i] = blocktype;
		}
    	//alert("winter map exists");
		var jsonwintermapblocks = JSON.stringify(wintermapblocks);
	    $.post('php/savemap.php', {mapdata: jsonwintermapblocks, maptype:'winter'}, function(data) {
	        //$('body').append(data);
	        trace("save mapdata: "+data);
	    });
	}
	//save beach map
	if ($('.the-fucking-beach-map').length) {
		//save winter map
		var beachmapblocks = new Array();
		var total = totalmapblocks;
		for (i=0; i<=total; i++){
			var blocktype = $('.the-fucking-beach-map div:eq('+i+')').attr('data-blocktype');
			beachmapblocks[i] = blocktype;
		}
		//alert("winter map exists");
		var jsonbeachmapblocks = JSON.stringify(beachmapblocks);
	    $.post('php/savemap.php', {mapdata: jsonbeachmapblocks, maptype:'beach'}, function(data) {
	        //$('body').append(data);
	        trace("save mapdata: "+data);
	    });
	}
    $('.the-fucking-map').append(playerdiv);
};
drawNewBeachMap = function() {

	/* LOAD BEACH MAP FUNCTION */
	$('.maps-wrap').append('<div class="the-fucking-beach-map" data-maptype="beach"></div>');
	$('.the-fucking-beach-map').css("width", mapwidthpx+"px");
	$('.the-fucking-beach-map').css("height", mapheightpx+"px");
	var mapdata = "";
	var maphalf = 0.5 * mapwidth;
	var shoreedge = maphalf;
	for (var f = 0; f <= (totalmapblocks - 1); f++){
		//random block generation
		var r = Math.random();
		var blocktype;
		var rowposition = f % mapwidth;
		if (rowposition == 0) {
			shoreedge = parseInt(Math.random() * 3) + 2;
			trace(shoreedge);
		}
		if (rowposition <= (maphalf-shoreedge)) {
			if (r<0.96) { blocktype = "sand"; }
			else if (r>0.98) { blocktype = "sandstone"; }
			else if (r>0.96) { blocktype = "palmtree"; }
		} else {
			if (r<=0.98) { blocktype = "water"; }
			else if (r>0.98) { blocktype = "wave"; }
		}
		trace(blocktype+rowposition+maphalf);
		mapdata += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
	}
	$('.the-fucking-beach-map').html(mapdata);
	startWaves();
};
drawNewWinterMap = function() {
	/* LOAD WINTER MAP FUNCTION */
	$('.maps-wrap').append('<div class="the-fucking-winter-map" data-maptype="winter"></div>');
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
};
/*
drawNewSpaceMap = function() {
	// LOAD SPACE MAP FUNCTION
	$('.maps-wrap').append('<div class="the-fucking-space-map" data-maptype="space"></div>');
	$('.the-fucking-space-map').css("width", mapwidthpx+"px");
	$('.the-fucking-space-map').css("height", mapheightpx+"px");
	var mapdata = "";
	for (var f = 0; f <= (totalmapblocks - 1); f++){
		//random block generation
		var r = Math.random();
		var blocktype;
		if (r<0.9) { blocktype = "space"; }
		else if (r>0.98) { blocktype = "star"; }
		else if (r>0.96) { blocktype = "galaxy"; }
		else { blocktype = "earth"; }
		mapdata += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
	}
	$('.the-fucking-space-map').html(mapdata);
};
*/
changeBlockType = function(block, newtype) {
	trace("8-changing block "+block+" to "+newtype);
	$('.block:eq('+block+')').removeClass(allblockclasses);
	$('.block:eq('+block+')').addClass("block block-"+newtype);
	$('.block:eq('+block+')').attr("data-blocktype", newtype);
};



/////////////
//  PLAYER
/////////////



createPlayer = function(id) {
	trace("Create Player");
	//var playerstartblock = 466;
	//changeBlockType(playerstartblock, "grass"); //make sure player doesn't start overtop an obstacle
	//var id = uniqueObjectID();
	var id = 1;
	$('.the-fucking-map').append('<div data-id='+id+' class=" objectid-'+id+' the-fucking-player player-direction-down"></div>');
};
savePlayer = function() {
	var playerdiv = $('.the-fucking-player').prop("outerHTML");
	//playerdiv = playerdiv.toString();
	var selecteditem = $('.the-fucking-inventory .selected-item').attr("data-blocktype");
	//var selecteditem = "sword";
	trace("playerdiv"+playerdiv);
	trace("seleted item"+selecteditem);
    var inventoryItems = new Array();
	for (i=1; i<=inventoryslots; i++){ 
		inventoryItems[i]=new Object();
	}
	$('.the-fucking-inventory > div').each(function(index){
		var amount = $(this).html();
		var blocktype = $(this).attr('data-blocktype');
		trace("inventory slot "+index+" = "+amount+blocktype);
		inventoryItems[index] = {type:blocktype, amount:amount};
	});
	trace("saved inventory");
	inventoryItems = JSON.stringify(inventoryItems);
	$.post('php/saveplayer.php', {inventory: inventoryItems, playerdiv: playerdiv, selecteditem: selecteditem }, function(data) {
        trace("saved player: "+data);
    });
};
loadPlayer = function(id) {
	trace("loadplayer");
	$.post('php/loadplayer.php', {}, function(data) {
    	var inventoryitems = JSON.parse(data.inventory);
    	var playerdiv = data.playerdiv;
    	var selecteditem = data.selecteditem;
    	trace("loading playerdiv="+playerdiv);
    	$('.the-fucking-map').append(playerdiv);
        trace("loading inv");
    	for (var i = 0; i < (inventoryitems.length-1); i++) {
    		$('.the-fucking-inventory > div:eq('+i+')').html(inventoryitems[i].amount);
    		if (inventoryitems[i].amount !== "0"){
    			$('.the-fucking-inventory > div:eq('+i+')').attr('data-blocktype', inventoryitems[i].type);
    			$('.the-fucking-inventory > div:eq('+i+')').removeClass('empty');
    			$('.the-fucking-inventory > div:eq('+i+')').addClass('block block-'+inventoryitems[i].type);
    		}
		}
		trace("loading selected item");
    	$('.the-fucking-inventory div').not('.the-fucking-inventory .block-'+selecteditem).removeClass('selected-item');
    	$('.the-fucking-inventory .block-'+selecteditem).addClass('selected-item');
    }, "json");
};



/////////////
//  ENEMY & ANIMALS
/////////////



createEnemy = function() {
	var id = uniqueObjectID();
	trace("Create Enemy "+id);
	//var enemystartblock = 0;
	$('.the-fucking-map').append('<div data-id="'+id+'" class="objectid-'+id+' the-fucking-enemy enemy-direction-down"></div>');
	initEnemyBrain(id);
};
killEnemy = function(id) {
	trace("Kill Enemy id: "+id);
	$('.objectid-'+id).remove();
};
initEnemyBrain = function(id) {

	trace("start brain program for enemy #"+id);
	var t = 0;
	var maxthoughts = 100;
	var enemybrain = setTimeout(anEnemyThought, enemyspeed);
	
	//collection of thoughts
	var enemyPath = Array();
	
	function anEnemyThought() {

		//check if enemy isnt dead
		if ($('.objectid-'+id).length != 0) {
	
			var enemyrandom = Math.random();
			//var enemydirection;
			var enemyX = getObjectCurrentCol(id); var enemyY = getObjectCurrentRow(id);
			var playerX = getObjectCurrentCol(1); var playerY = getObjectCurrentRow(1);
			
			var n = enemyPath.length;
			enemyPath.push(enemyX+"-"+enemyY);

			trace("-----");
			trace('enemythoughtid-'+n);
			trace(enemyPath);
			trace("enemylastpos="+enemyPath[n-1]);

			//is player stuck? move random direction
			if (enemyPath[n-1]==enemyPath[n]) {

				trace("ENEMY STUCK");

				var randomDirection = Math.floor(Math.random() * 4) + 1;
				switch(randomDirection){
					case 1: moveObjectUp(id, "enemy"); break;
					case 2: moveObjectDown(id, "enemy"); break;
					case 3: moveObjectLeft(id, "enemy"); break;
					case 4: moveObjectRight(id, "enemy"); break;
				}
			}

			trace("-----");
			var PEx = playerX - enemyX; var PEy = enemyY - playerY;
			var posPEx = Math.abs(PEx); var posPEy = Math.abs(PEy);
			
			if ( (PEx == 0) && (PEy == 0)){
				//trace("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
				trace("found the player, kill player!");
			} else if (posPEx >= posPEy) {
				if (PEx >= 0) { 
					//trace("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
					moveObjectRight(id, "enemy");
				} else { 
					//trace("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
					moveObjectLeft(id, "enemy");
				}
			} else {
				if (PEy >= 0) { 
					//trace("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
					moveObjectUp(id, "enemy");
				} else { 
					//trace("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
					moveObjectDown(id, "enemy");
				}
			}
			
			//limit
			if (t > maxthoughts) {
				trace("Enemy terminated");
				stopEnemyBrain();
				killEnemy(id);
			} else {
				t++;
				enemybrain = setTimeout(anEnemyThought, enemyspeed); // repeat thought
			}

		}
		
	}
	function stopEnemyBrain() {
		clearTimeout(enemybrain);
	}
};




killAnimal = function(id) {
	trace("Kill Animal id: "+id);
	$('.objectid-'+id).remove();
};
createAnimal = function() {

	var id = uniqueObjectID();
	trace("Create Animal "+id);
	//var enemystartblock = 0;
	$('.the-fucking-map').append('<div data-id="'+id+'" class="objectid-'+id+' the-fucking-deer deer-direction-down"></div>');
	initAnimalBrain(id);
	
};
initAnimalBrain = function(id) {

	trace("start brain program for animal id:"+id);
	var t = 0;
	var maxthoughts = 100;
	var animalbrain = setTimeout(anAnimalThought, animalspeed);
	
	//collection of thoughts
	var animalPath = Array();
	
	function anAnimalThought() {

		//check if enemy isnt dead
		if ($('.objectid-'+id).length != 0) {
	
			var animalrandom = Math.random();
			//var enemydirection;
			var animalX = getObjectCurrentCol(id); var animalY = getObjectCurrentRow(id);
			var playerX = getObjectCurrentCol(1); var playerY = getObjectCurrentRow(1);
			
			var n = animalPath.length;
			animalPath.push(animalX+"-"+animalY);

			trace("-----");
			trace('animalthoughtid-'+n);
			trace(animalPath);
			trace("animallastpos="+animalPath[n-1]);



			//is animal stuck? move random direction
			//if (animalPath[n-1]==animalPath[n]) {

				//trace("animal STUCK");

				var randomDirection = Math.floor(Math.random() * 4) + 1;
				switch(randomDirection){
					case 1: moveObjectUp(id, "deer"); break;
					case 2: moveObjectDown(id, "deer"); break;
					case 3: moveObjectLeft(id, "deer"); break;
					case 4: moveObjectRight(id, "deer"); break;
				}
			//}

			trace("-----");

			/*
			var PEx = playerX - animalX; var PEy = animalY - playerY;
			var posPEx = Math.abs(PEx); var posPEy = Math.abs(PEy);
			
			if ( (PEx == 0) && (PEy == 0)){
				//trace("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
				trace("found the player, kill player!");
			} else if (posPEx >= posPEy) {
				if (PEx >= 0) { 
					//trace("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
					moveObjectRight(id, "animal");
				} else { 
					//trace("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
					moveObjectLeft(id, "animal");
				}
			} else {
				if (PEy >= 0) { 
					//trace("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
					moveObjectUp(id, "animal");
				} else { 
					//trace("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
					moveObjectDown(id, "animal");
				}
			}
			*/
			
			//limit
			if (t > maxthoughts) {
				trace("Animal terminated");
				stopAnimalBrain();
				killAnimal(id);
			} else {
				t++;
				animalbrain = setTimeout(anAnimalThought, animalspeed); // repeat thought
			}

		}
		
	}
	function stopAnimalBrain() {
		clearTimeout(animalbrain);
	}
};




/////////////
//  KEYBOARD EVENTS
/////////////




drawInputBubble = function(object, text) {
	if (text) {
		$('.the-fucking-'+object).append('<div class="speech-bubble">'+text+'</div>');
	} else {
		$('.the-fucking-'+object).append('<div class="speech-bubble"><form class="bubble-form" action="submit"><textarea class="bubble-text" rows="2" cols="30"></textarea></form></div>');
	}
	/*
	$('.bubble-form').submit(function(e) {
		var message = $('.bubble-text').html();
		drawInputBubble(object, message);
	});
	*/
	$('.bubble-text').focus();
	
	//setTimeout('$(".speech-bubble").remove();', 1000);
};
drawThoughtBubble = function(object, text) {
	$('.the-fucking-'+object).append('<div class="speech-bubble">'+text+'</div>');
	setTimeout('$(".speech-bubble").remove();', 1000);
};
writeTextToSign = function() {
	if ($('.speech-bubble').length > 0){
		var message = $('.bubble-text').val();
		trace("sign message:"+message);

		//find block that the player is facing
		var id = 1;
		var direction = getObjectDirection(id, "player");
		var block = getObjectCurrentBlock(id);

		switch (direction) {
			case "up": block = block - (mapwidth+1); break;
			case "down": block = block + (mapwidth-1); break;
			case "left": block = block - 2; break;
			case "right": block = block; break;
		}
		
		$('.block:eq('+block+')').attr("data-text", message);

		$('.speech-bubble').remove();
	} 
	/*else {
		drawInputBubble("player");
	}*/
};
placeSign = function(objectid, block) {
	var html = '<div class="speech-bubble">';
	html    +=   '<form class="bubble-form" action="submit">';
	html    +=     '<textarea class="bubble-text" rows="2" cols="30"></textarea>';
	html    +=   '</form>';
	html    += '</div>';
	$('.objectid-'+objectid).append(html);
	$('.bubble-text').focus();
};
readSign = function(block) {
	var message = $('.block:eq('+block+')').attr("data-text");
	alert(message);
};
setupKeyboardEvents = function() {
	trace("Keyboard Events");
	window.addEventListener('keydown', function(event) {
		var selecteditem = getSelectedItem();
		switch (event.keyCode) {
			case 37: /* LEFT ARROW */
				if (selecteditem == "guitar") { playSound(880); } 
				else if (selecteditem == "piano") { playSound(880); } 
				else if (selecteditem == "bike") { rideBike("left"); } 
				else if (selecteditem == "skiis") { rideSkiis("left"); }
				else { moveObjectLeft(1, "player"); }
				break;
			case 38: /* UP ARROW */
				if (selecteditem == "guitar") { playSound(1320); } 
				else if (selecteditem == "piano") { playSound(1320); } 
				else if (selecteditem == "bike") { rideBike("up"); } 
				else if (selecteditem == "skiis") { rideSkiis("up"); }
				else { moveObjectUp(1, "player"); }
				break;
			case 39: /* RIGHT ARROW */
				if (selecteditem == "guitar") { playSound(1100); } 
				else if (selecteditem == "piano") { playSound(1100); } 
				else if (selecteditem == "bike") { rideBike("right"); } 
				else if (selecteditem == "skiis") { rideSkiis("right"); }
				else { moveObjectRight(1, "player"); }
				break;
			case 40: /* DOWN ARROW */
				if (selecteditem == "guitar") { playSound(660); } 
				else if (selecteditem == "piano") { playSound(660); } 
				else if (selecteditem == "bike") { rideBike("down"); } 
				else if (selecteditem == "skiis") { rideSkiis("down"); }
				else { moveObjectDown(1, "player"); }
				break;
			case 32: /* SPACE */
				if ($('.speech-bubble').length == 0){
					playerPrimaryAction(); 
				}
				break;
			case 13: /* ENTER */
				writeTextToSign();
				break;
			case 69: // E 
				playMusic();
				break;

			/*
			case 77: // M
				createEnemy();
				break;
			case 75: // K 
				killEnemy(1);
				break;
			case 66: // B 
				saveMap();
				break;
			case 67: // C 
				loadMap();
				break;
			case 65: // A 
				moveMap();
				break;
			case 68: // D 
				stopMap();
				break;
			case 69: // E 
				playMusic();
				break;
			case 70: // F 
				startWaves();
				break;
			case 71: // G 
				drawNewWinterMap();
				drawNewBeachMap();
				break;
				/*
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



/////////////
//  MOUSE EVENTS
/////////////



setupMouseEvents = function() {
	trace("Mouse Events");
	var directions = ["up","down","left","right"];
	$('.the-fucking-inventory > div').on("click", function() {
		var blocktype = $(this).attr('data-blocktype');
		//items that are crafting ingredients
		if ((blocktype == 'tree') || (blocktype == 'rock') || (blocktype == 'wood') || (blocktype == 'diamond') || (blocktype == 'icerock') ||
		    (blocktype == 'silver') || (blocktype == 'gold') || (blocktype == 'clay') || (blocktype == 'oil') || (blocktype == 'sandstone') ||
		    (blocktype == '') || (blocktype == '') || (blocktype == '') || (blocktype == '') || (blocktype == '')) {
		    if ( $(this).attr('data-blocktype') != "empty" ){
		    	var blocktype = $(this).attr('data-blocktype');
		    	moveItemToCraftingTable(blocktype);
		    }
		}
		var playerdirection = getObjectDirection(1, "player");
		$('.the-fucking-inventory > div').removeClass("selected-item");
		$(this).addClass('selected-item');
		var selecteditem = $(this).attr('data-blocktype');
		if ( selecteditem == "sword" ) { createEnemy(); }
		if ( selecteditem == "spear" ) { createAnimal(); }
		
		//clear animation classes
		$.each(directions, function(i, v) {
			$('.the-fucking-player').removeClass("player-direction-"+v+"-sword");
			$('.the-fucking-player').removeClass("player-direction-"+v+"-shovel");
			$('.the-fucking-player').removeClass("player-direction-"+v+"-axe");
			$('.the-fucking-player').removeClass("player-direction-"+v+"-sword-swing");
			$('.the-fucking-player').removeClass("player-direction-"+v+"-shovel-swing");
			$('.the-fucking-player').removeClass("player-direction-"+v+"-axe-swing");
			$('.the-fucking-player').removeClass("player-direction-"+v+"-bike");
			$('.the-fucking-player').removeClass("player-direction-"+v+"-skiis");
			$('.the-fucking-player').removeClass("player-direction-"+v+"-car");
			$('.the-fucking-player').removeClass("player-direction-"+v+"-canoe");
			
		});
		
		if ( selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "axe" || selecteditem == "bike" || selecteditem == "skiis" || selecteditem == "canoe" || selecteditem == "car" ){
			trace("selected item has animation");
			$('.the-fucking-player').addClass("player-direction-"+playerdirection+"-"+selecteditem);
		}
		
	});
	$('.the-fucking-crafting-table > div').on("click", function() {
		var blocktype = $(this).attr('data-blocktype');
		if (blocktype != "empty"){
			trace("crafting slot not empty");
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
			trace("You crafted" + itemquantity + " " + blocktype);
			$('.the-fucking-crafted-item > div').removeClass(allblockclasses);
			$('.the-fucking-crafted-item > div').html("0");
			removeAllItemsFromCraftingTable();
			addToInventory(blocktype, itemquantity);
			checkCraftingTableForItem();
		}
	});
	$('.link-savemap').on("mousedown", function(){
		$('.link-savemap a').html('Saving');
		enableSaving = function() {
			$('.link-savemap div').html('<a>Save</a>');
		};
		setTimeout(enableSaving, 2500);
		savePlayer();
		saveMap();
	});
};



/////////////
//  CONTROL PAD EVENTS
/////////////



setupControlPadEvents = function() {
	trace("Control Pad Events");
	var selecteditem;
	//alert(selecteditem);
	$('.btn-up').on("touchstart", function() { 
		selecteditem = getSelectedItem();
		if (selecteditem == "guitar") { playSound(1320); } 
		else if (selecteditem == "bike") { rideBike("up"); } 
		else if (selecteditem == "skiis") { rideSkiis("up"); }
		else { moveObjectUp(1, "player"); }
	});
	$('.btn-down').on("touchstart", function() { 
		selecteditem = getSelectedItem();
		if (selecteditem == "guitar") { playSound(660); } 
		else if (selecteditem == "bike") { rideBike("down"); } 
		else if (selecteditem == "skiis") { rideSkiis("down"); }
		else { moveObjectDown(1, "player"); } 
	});
	$('.btn-left').on("touchstart", function() { 
		selecteditem = getSelectedItem();
		if (selecteditem == "guitar") { playSound(880); } 
		else if (selecteditem == "bike") { rideBike("left"); } 
		else if (selecteditem == "skiis") { rideSkiis("left"); }
		else { moveObjectLeft(1, "player"); }
	});
	$('.btn-right').on("touchstart", function() { 
		selecteditem = getSelectedItem();
		if (selecteditem == "guitar") { playSound(1100); } 
		else if (selecteditem == "bike") { rideBike("right"); } 
		else if (selecteditem == "skiis") { rideSkiis("right"); }
		else { moveObjectRight(1, "player"); }
	});
	$('.btn-a').on("touchstart", function() { 
		playerPrimaryAction(); 
	});
};



/////////////
//  COLLISION DETECTION
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
	if ( $('.the-fucking-player').offset().top < ($(window).scrollTop() + 60) ) {
		var y = $(window).scrollTop(); 
		$("html, body").animate({ scrollTop: y - 250 }, 600);
	}
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
	if ( $('.the-fucking-player').offset().top > ($(window).scrollTop() + $(window).height() - 60) ) {
		var y = $(window).scrollTop(); 
		$("html, body").animate({ scrollTop: y + 250 }, 600);
	}
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

	//canoeing
	if (selecteditem == "canoe" && $('.block:eq('+block+')').hasClass('block-water')) {
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
	} else if ($('.block:eq('+block+')').hasClass('block-water') && (selecteditem == "canoe") ) {
		alert("selecteditem");
		return true;
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
	if ( selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "axe" || selecteditem == "bike" || selecteditem == "skiis" || selecteditem == "car" || selecteditem == "canoe" && name == "player" ){ 
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



/////////////
//  PLAYER PRIMARY ACTION
/////////////



playerPrimaryAction = function() {

	var id = 1;
	trace("Player primary action");
	//find block that the player is facing
	var direction = getObjectDirection(id, "player");
	var playerblock = getObjectCurrentBlock(id);
	var block = getObjectCurrentBlock(id);
	
	trace("1-"+direction);
	trace("2-"+playerblock);
	trace("3-"+block);
	
	var selecteditem = getSelectedItem();
	switch (direction) {
		case "up": block = block - (mapwidth+1); break;
		case "down": block = block + (mapwidth-1); break;
		case "left": block = block - 2; break;
		case "right": block = block; break;
	}
	
	trace("4-hitblock "+block);
	
	var blocktype = getBlockType(block);
	trace("5-blocktype "+blocktype);

	//item swing animations
	if (selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "axe"){
		var swingclass = "player-direction-"+direction+"-"+selecteditem+"-swing";
		$(".the-fucking-player").addClass("player-direction-"+direction+"-"+selecteditem+"-swing");
		var swinganimation = setTimeout(removeSwingClass, 100);
		function removeSwingClass(swingclass) {
			$(".the-fucking-player").removeClass("player-direction-"+direction+"-"+selecteditem+"-swing");
		}	
		var playerblock = getObjectCurrentBlock(id);	
		trace("5-playerblock "+playerblock);

		//killing the enemy
		if ($('.the-fucking-enemy').length != 0) {
			$('.the-fucking-enemy').each(function(index) {
				var enemyid = $(this).attr('data-id');
				var enemyblock = getObjectCurrentBlock(enemyid);
				if (block == enemyblock || enemyblock == playerblock){
					trace("killed an enemy!");
					killEnemy(enemyid);
				}
			});
		}  
	}
	
	$('.block:eq('+block+')').animate({ opacity: 0.9 }, 50, function() {
		$('.block:eq('+block+')').css("opacity","1");
		var selecteditem = getSelectedItem();

		//use axe to collect doors, signs and other mechnism objects
		if ( (selecteditem == "axe") &&  ((blocktype == "door") || (blocktype == "door-open") ) ) {
			addToInventory("door", 1);
			changeBlockType(block, "grass");
		} else if ( (selecteditem == "axe") && (blocktype == "sign") ) {
			addToInventory("sign", 1);
			changeBlockType(block, "grass");
		} else if ( (selecteditem == "axe") && (blocktype == "fire") ) {
			addToInventory("fire", 1);
			changeBlockType(block, "dirt");
			growGrass(block);

		//open/close doors
		} else if (blocktype == "door") {
			changeBlockType(block, "door-open");
		} else if (blocktype == "door-open") {
			changeBlockType(block, "door");

		//throw frisbee
		} else if (selecteditem == "frisbee"){
			throwFrisbee(block, direction);

		//throw spear
		} else if (selecteditem == "spear"){
			throwSpear(block, direction);

		//digging - forest map
		} else if ( (getSelectedItem() == "shovel") && ((blocktype == "grass") || (blocktype == "dirt")) ){
			trace("dig!");
			//chance of digging a diamond
			var r = Math.random();
			if (r < 0.5) {
				trace("diamond!");
				changeBlockType(block, "diamond-hole");
			} else {
				changeBlockType(block, "hole");
			}
			addToInventory(blocktype, 5);
			addToInventory('dirt', 5);
			growGrass(block);

		//digging - winter map
		} else if ( getSelectedItem() == "shovel" && ( blocktype == "snow" || blocktype == "frozendirt" || blocktype == "ice" ) ){
			//chance of digging gold
			var r = Math.random();
			if (r < 0.2) {
				trace("gold!");
				changeBlockType(block, "gold-hole");
			} else if (r < 0.4) {
				trace("silver!");
				changeBlockType(block, "silver-hole");
			} else {
				changeBlockType(block, "snowhole");
			}
			addToInventory(blocktype, 5);
			addToInventory('frozendirt', 5);
			growGrass(block);

		//digging - beach map
		} else if ( getSelectedItem() == "shovel" && ( blocktype == "sand" || blocktype == "wetsand" ) ){
			//chance of digging gold
			var r = Math.random();
			if (r < 0.2) {
				trace("oil!");
				changeBlockType(block, "oil-hole");
			} else if (r < 0.4) {
				trace("clay!");
				changeBlockType(block, "clay-hole");
			} else {
				changeBlockType(block, "sandhole");
			}
			addToInventory(blocktype, 5);
			addToInventory('wetsand', 5);
			growGrass(block);

		//filling water/holes
		} else if ( (blocktype == "hole") || (blocktype == "water") || (blocktype == "snowhole") || (blocktype == "wave") || (blocktype == "sandhole") ) {
			if (selecteditem == "grass" ||
				selecteditem == "dirt" ||
				selecteditem == "frozendirt" ||
				selecteditem == "snow" ||
				selecteditem == "sand" ||
				selecteditem == "wetsand" ||
				selecteditem == "rockbrick" ||
				selecteditem == "icerockbrick" ||
				selecteditem == "sandstonebrick" ||
				selecteditem == "claybrick" ||
				selecteditem == "road" ) {
					trace("fill hole/water with dirt, sand or snow");
					changeBlockType(block, getSelectedItem());
					removeFromInventory(getSelectedItem());
					//growGrass(block);
					if(blocktype=="water"||blocktype=="wave"){ addToInventory("water", 5); }
			}
			
		//read sign
		} else if (blocktype == "sign") {
			trace("reading sign");
			readSign(block);

		//placing blocks
		} else if ( (blocktype == "grass") || (blocktype == "dirt") || (blocktype == "hole") ||
		     (blocktype == "snow") || (blocktype == "frozendirt") || (blocktype == "ice") ||
		     (blocktype == "sand") || (blocktype == "wetsand") || (blocktype == "water") ) {
			//check for selected placable block in inventory
			trace('selected item is '+selecteditem);
			trace('blocktype is '+blocktype);
			//trace('blocktype is '+blocktype);
			//placable blocks: trees, rocks, wood, fire, doors, dirt, water, frozendirt, snow, diamond, gold, 
			//pinetree, rockbrick, icerockbrick, claybrick, sandstonebrick, road
			if ( 	selecteditem == "rock" ||
					selecteditem == "tree" ||
					selecteditem == "wood" ||
					selecteditem == "fire" ||
					selecteditem == "door" ||
					selecteditem == "grass" ||
					selecteditem == "water" ||
					selecteditem == "ice" ||
					selecteditem == "dirt" ||
					selecteditem == "frozendirt" ||
					selecteditem == "snow" ||
					selecteditem == "pinetree" ||
					selecteditem == "icerock" ||
					selecteditem == "silver" ||
					selecteditem == "gold" ||
					selecteditem == "diamond" ||
					selecteditem == "sand" ||
					selecteditem == "wetsand" ||
					selecteditem == "palmtree" ||
					selecteditem == "sandstone" ||
					selecteditem == "snow" ||
					selecteditem == "oil" ||
					selecteditem == "clay" ||
					selecteditem == "road" ||
					selecteditem == "rockbrick" ||
					selecteditem == "icerockbrick" ||
					selecteditem == "sandstonebrick" ||
					selecteditem == "claybrick" ||
					selecteditem == "sandstonebrick" ||
					selecteditem == "sign"
				){

				//placing/writing on a sign
				if (selecteditem == "sign"){
					placeSign(1, block);
				}
				
				trace('a placable item is selected');
				removeFromInventory(selecteditem);
				changeBlockType(block, selecteditem);
			}

		//picking up items & blocks	
		} else if ((blocktype == "tree") ||
			(blocktype == "rock") ||
			(blocktype == "wood") ||
			(blocktype == "diamond") ||
			(blocktype == "diamond-hole") ||
			(blocktype == "gold") ||
			(blocktype == "gold-hole") ||
			(blocktype == "silver") ||
			(blocktype == "silver-hole") ||
			(blocktype == "pinetree") ||
			(blocktype == "icerock") ||
			(blocktype == "pinetree") ||
			(blocktype == "sandstone") ||
			(blocktype == "oil") ||
			(blocktype == "oil-hole") ||
			(blocktype == "clay") ||
			(blocktype == "clay-hole") ||
			(blocktype == "palmtree") ||
			(blocktype == "rockbrick") ||
			(blocktype == "icerockbrick") ||
			(blocktype == "sandstonebrick") ||
			(blocktype == "claybrick") ||
			(blocktype == "road") ){
			var changeblocktotype = "dirt";
			if (blocktype == "diamond-hole") { blocktype = "diamond"; changeblocktotype = "hole"; } 
			else if (blocktype == "gold-hole") { blocktype = "gold"; changeblocktotype = "snowhole"; } 
			else if (blocktype == "silver-hole") { blocktype = "silver"; changeblocktotype = "snowhole"; }
			else if (blocktype == "oil-hole") { blocktype = "oil"; changeblocktotype = "sandhole"; }
			else if (blocktype == "clay-hole") { blocktype = "clay"; changeblocktotype = "sandhole"; }
			addToInventory(blocktype, "5");
			changeBlockType(block, changeblocktotype);
			growGrass(block);
		}

	});
};



/////////////
// ANIMATION & PRJECTILES
/////////////



growGrass = function(block) {
	trace("growing grass at block" + block);
	$('.block:eq('+block+')').animate({
      	backgroundColor: "#36ac2a"
  	}, 10000, function() {
  		trace("grass has been grown at block "+block+", calling changeBlockType()");
  		changeBlockType(block, "grass");
  	});
};
throwFrisbee = function(startblock, direction) {
	trace("Create Frisbee");
	//var enemystartblock = 0;
	//$('.the-fucking-frisbee').remove();
	var playerdirection = getObjectDirection(1, "player");
	var id = uniqueObjectID();
	$('.the-fucking-map').append('<div data-id='+id+' class="the-fucking-frisbee objectid-'+id+' frisbee-direction-'+playerdirection+'"></div>');
	initProjectile("frisbee", startblock, direction, id);
};
throwSpear = function(startblock, direction) {
	trace("Create Spear");
	//var enemystartblock = 0;
	//$('.the-fucking-frisbee').remove();
	var playerdirection = getObjectDirection(1, "player");
	var id = uniqueObjectID();
	$('.the-fucking-map').append('<div data-id='+id+' class="the-fucking-spear objectid-'+id+' spear-direction-'+playerdirection+'"></div>');
	initProjectile("spear", startblock, direction, id);
};
initProjectile = function(name, startblock, direction, id) {
	//stopProjectile();
	trace("Start velocity for " + name + " id:" + id + " travelling " + direction + " from block #" + startblock);
	var topstart = getBlockTopByID(startblock);
	trace(topstart);
	var leftstart = getBlockLeftByID(startblock);
	trace(leftstart);
	topstart = addPX(topstart);
	leftstart = addPX(leftstart);
	$('.objectid-'+id).css("top",topstart);
	$('.objectid-'+id).css("left",leftstart);
	var t = 0;
	var maxdistance = 20;

	var projectilebrain = setTimeout(projectileMotion, projectilespeed);

	function projectileMotion() {
		switch (direction) {
			case "up": moveObjectUp(id, name); break;
			case "down": moveObjectDown(id, name); break;
			case "left": moveObjectLeft(id, name); break;
			case "right": moveObjectRight(id, name); break;
		}	
		//limit
		if (t > maxdistance) {
			trace("projectile stopped :(");
			stopProjectile();
		} else {
			t++;
			projectilebrain = setTimeout(projectileMotion, projectilespeed); // repeat thought
		}
		
	}
	function stopProjectile() {
		clearTimeout(projectilebrain);
		$('.objectid-'+id).remove();
	}
};
var mapanimate;
stopMap = function(){ 
	clearTimeout(mapanimate); 
	mapanimate = null;
};
moveMap = function(){
	trace("animating the map!");
	var mapspeed = 200;
	mapanimate = setTimeout(scrollMap, mapspeed);
	
	function scrollMap() {
		var toprow = $('.the-fucking-winter-map div').slice(0,40).remove();
		$('.the-fucking-winter-map').append(toprow);
		mapanimate = setTimeout(scrollMap, mapspeed); // repeat thought
	}
};
var wavesanimate;
stopWaves = function(){ 
	clearTimeout(wavesanimate); 
	wavesanimate = null;
};
startWaves = function(){
	trace("animating the waves!");
	var wavespeed = 1400;
	wavesanimate = setTimeout(moveWaves, wavespeed);
	function moveWaves() {
		$('.the-fucking-beach-map .block').each( function(index, value) {
				if ($(this).hasClass('block-wave')){
					if ($('.the-fucking-beach-map .block:eq('+(index-1)+')').hasClass('block-water')) {
						//wave has not reached the shore yet
						var newtype = 'wave';
						//trace("changing block "+(index-1)+" to "+newtype);
						$('.the-fucking-beach-map .block:eq('+(index-1)+')').removeClass("block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt block-palmtree block-sandstone block-sand block-wave");
						$('.the-fucking-beach-map .block:eq('+(index-1)+')').addClass("block block-"+newtype);
						$('.the-fucking-beach-map .block:eq('+(index-1)+')').attr("data-blocktype", newtype);						
					} else {
						//wave has reached the shore, create new wave at edge of map
						//var rowremainder = (index-1) % mapwidth;
						//alert(rowremainder);
						var r = parseInt(Math.random() * mapheight);
						var newwaveposition = (r * mapwidth) - 1;
						var newtype = "wave";
						//trace("new wave at block "+newwaveposition);
						$('.the-fucking-beach-map .block:eq('+newwaveposition+')').removeClass("block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt block-palmtree block-sandstone block-sand block-wave");
						$('.the-fucking-beach-map .block:eq('+newwaveposition+')').addClass("block block-"+newtype);
						$('.the-fucking-beach-map .block:eq('+newwaveposition+')').attr("data-blocktype", newtype);
					}
					newtype = 'water';
					//trace("changing block "+index+" to "+newtype);
					$('.the-fucking-beach-map .block:eq('+index+')').removeClass("block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt block-palmtree block-sandstone block-sand block-wave");
					$('.the-fucking-beach-map .block:eq('+index+')').addClass("block block-"+newtype);
					$('.the-fucking-beach-map .block:eq('+index+')').attr("data-blocktype", newtype);
					/*
					changeBlockType(index-1, 'wave');
					changeBlockType(index, 'water');
					*/	
			  	}	
			  	//alert(index + ': ' + value);
		  	//}
		});
		wavesanimate = setTimeout(moveWaves, wavespeed); // repeat thought
	}
};
var ridingbike;
rideBike = function(direction) {
	stopBiking();
	var playerdirection = getObjectDirection(1, "player");
	if (playerdirection == "left" && direction == "right"){ 
		changeObjectDirection(1, "right", "player");
	} else if (playerdirection == "right" && direction == "left"){ 
		changeObjectDirection(1, "left", "player");
	} else if (playerdirection == "up" && direction == "down"){ 
		changeObjectDirection(1, "down", "player");
	} else if (playerdirection == "down" && direction == "up"){ 
		changeObjectDirection(1, "up", "player");
	} else {
		ridingbike = setTimeout(function() {
			startBiking(direction);
		}, bikespeed);
	}
};
startBiking = function (direction) {
	trace("move bike "+direction);
	var playerdirection = getObjectDirection(1, "player");
	trace("player current direction: "+playerdirection);
	switch (direction) {
		case "up": moveObjectUp(1, "player"); break;
		case "down": moveObjectDown(1, "player"); break;
		case "left": moveObjectLeft(1, "player"); break;
		case "right": moveObjectRight(1, "player"); break;
	}
	ridingbike = setTimeout(function() {
    	startBiking(direction);
	}, bikespeed); // repeat movement
};
stopBiking = function () {
	clearTimeout(ridingbike);
};
rideSkiis = function(direction) {
	if (direction == "up"){
		moveObjectUp(1, "player");
		changeObjectDirection(1,"up", "player");
		stopMap();
	} else {
		switch (direction) {
			case "up": moveObjectUp(1, "player"); break;
			case "down": moveObjectDown(1, "player"); break;
			case "left": moveObjectLeft(1, "player"); break;
			case "right": moveObjectRight(1, "player"); break;
		}
		if (mapanimate == null) {
			moveMap();
		}
	}
};



/////////////
//  INVENTORY / CRAFTING
/////////////



addToInventory = function(blocktype, quantitytoadd) {
	if(!quantitytoadd) { quantitytoadd == "1"; }
	quantitytoadd = parseInt(quantitytoadd);
	var slotwithsameitem = $('.the-fucking-inventory > .block-'+blocktype).index();
	// add to slot with matching item
	if ( slotwithsameitem != -1 ) {
		trace("adding "+quantitytoadd+" "+blocktype+" to stack in inv.");
		var quantity = $('.the-fucking-inventory > div:eq('+slotwithsameitem+')').html();
		quantity = parseInt(quantity) + quantitytoadd;
		$('.the-fucking-inventory > div:eq('+slotwithsameitem+')').html(quantity);
	// add to empty slot
	} else {
		trace("adding "+quantitytoadd+" "+blocktype+" to empty slot in inv.");
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
	//empty slot if stack runs out for items
	if (quantity == 0) {
		var slotindex = $('.the-fucking-inventory > .block-'+blocktype).index();
		//alert("make arrow empty"+slotindex);
		$('.the-fucking-inventory > .block-'+blocktype).addClass('empty');
		$('.the-fucking-inventory > .block-'+blocktype).attr('data-blocktype', 'empty');
		$('.the-fucking-inventory > .block-'+blocktype).removeClass('block block-'+blocktype);
	}
};
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
	$('.the-fucking-crafting-table > div').removeClass(allblockclasses);
	$('.the-fucking-crafting-table > div').attr("data-blocktype", "empty");
	$('.the-fucking-crafting-table > div').addClass("empty");
	$('.the-fucking-crafting-table > div').html("0");
};
checkCraftingTableForItem = function() {
	trace("Check for Craftable Item");
	var slot1type = $('.the-fucking-crafting-table > .slot-1').attr("data-blocktype");
	var slot2type = $('.the-fucking-crafting-table > .slot-2').attr("data-blocktype");
	var slot3type = $('.the-fucking-crafting-table > .slot-3').attr("data-blocktype");
	var recipe = slot1type + slot2type + slot3type;
	createCraftedItem = function(blocktype, amount) {
		if (amount == null){ amount = 1; }
		$('.the-fucking-crafted-item > .slot').addClass("block block-"+blocktype);
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', blocktype);
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html(amount);
	};
	switch (recipe) {
		case "treeemptyempty": createCraftedItem("wood",3); break;
		case "treetreeempty": createCraftedItem("wood",6); break;
		case "treetreetree": createCraftedItem("wood",10); break;
		case "rockwoodwood": createCraftedItem("shovel",1); break;
		case "rockrockwood": createCraftedItem("sword",1); break;
		case "woodwoodrock": createCraftedItem("fire",10); break;
		case "woodwoodwood": createCraftedItem("door",10); break;
		case "treewoodwood": createCraftedItem("guitar",1); break;
		case "woodwooddiamond": createCraftedItem("frisbee",1); break;
		case "treewooddiamond": createCraftedItem("bike",1); break;
		case "treetreediamond": createCraftedItem("skiis",1); break;
		case "woodtreewood": createCraftedItem("canoe",1); break;
		case "woodtreeoil": createCraftedItem("car",1); break;
		case "clayrockclay": createCraftedItem("road",10); break;
		case "rockrockrock": createCraftedItem("rockbrick",10); break;
		case "icerockicerockicerock": createCraftedItem("icerockbrick",10); break;
		case "sandstonesandstonesandstone": createCraftedItem("sandstonebrick",10); break;
		case "clayclayclay": createCraftedItem("claybrick",10); break;
		case "treewoodsilver": createCraftedItem("piano",1); break;
		case "treetreesilver": createCraftedItem("spear",1); break;
		case "woodwoodtree": createCraftedItem("sign",5); break;
		case "rockrocktree": createCraftedItem("axe",1); break;
		default:
			$('.the-fucking-crafted-item > .slot').removeClass(allblockclasses);
			$('.the-fucking-crafted-item > .slot').addClass("empty");
			$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'empty');
			$('.the-fucking-crafted-item > .slot').html("0");
	}	
};



/////////////
//  SOUND
/////////////



guitarFirstNote = true;
keyboardFirstNote = true;
playSound = function(freq) {
	//unlock winter map
	if ((guitarFirstNote == true) && ($('.the-fucking-winter-map').length == 0)){ 
		drawNewWinterMap(); 
		guitarFirstNote = false; 
	}
	if ((keyboardFirstNote == true) && ($('.the-fucking-beach-map').length == 0)){ 
		drawNewBeachMap(); 
		keyboardFirstNote = false; 
	}
	sin = T("sin", freq);
	env = T("adsr", 10, 500);
	syn = T("*", sin, env).play();
	sin.bang();
	env.bang();
};
playMusic = function(){
	var mml = T("mml", "t100 o3 $ l2 a l1 <b0<d0g+>> l2 d l1 <a0<c+0f+>> l2 a l1 <b0<d0g+>> l2 f l1 <a0<c+0f+>>");     
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
//  HELPER FUNCTIONS
/////////////


getObjectMap = function(id) {
	//return which map the object is on
	return maptype;
};
getSelectedItem = function() {
	var blocktype = $('.the-fucking-inventory > .selected-item').attr("data-blocktype");
	return blocktype;
};
getBlockType = function(block) {
	var blocktype = $('.block:eq('+block+')').attr("data-blocktype");
	//trace("getblocktype() blocknumber:"+block+", blocktype:"+blocktype);
	return blocktype;
};
getBlockLeftByID = function(block) {
	var column = block % mapwidth;
	column = column;
	var leftpx = column * gridunitpx;
	return leftpx;
	//alert(leftpx);
};
getBlockTopByID = function(block) {
	var row = block / mapwidth;
	row = parseInt(row);
	var toppx = row * gridunitpx;
	//trace("block "+block+", row"+row+", toppx"+toppx);
	return toppx;
};
getObjectCurrentPositionX = function(id) {
	var x = $('.objectid-'+id).css("left");
	//trace("X--"+x);
	return x;
};
getObjectCurrentPositionY = function(id) {
	var y = $('.objectid-'+id).css("top");
	return y;
};
getObjectCurrentCol = function(id) {
	var x = getObjectCurrentPositionX(id);
	x = stripPX(x);
	var y = getObjectCurrentPositionY(id);
	y = stripPX(y);
	var col = x / gridunitpx;
	col = parseInt(col);
	col = col + 1;
	return col;
};
getObjectCurrentRow = function(id) {
	var y = getObjectCurrentPositionY(id);
	y = stripPX(y);
	var row = y / gridunitpx;
	row = parseInt(row);
	row = row + 1;
	return row;
};
getObjectCurrentBlock = function(id) {
	var row = getObjectCurrentRow(id);
	var col = getObjectCurrentCol(id);
	var block = (row * mapwidth) - mapwidth;
	block = block + col;
	//trace(object+" is at block# "+block);
	//trace("block"+block);
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
trace = function(msg) {
	console.log(msg);
};