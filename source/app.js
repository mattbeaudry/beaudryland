//	Beaudryland v1.0
//	Matt Beaudry
//	2017


//////////////
//  TABLE OF CONTENTS
//////////////

// GAME
// HEALTH
// PLAYER
// OBJECTS & ENGINE (movement?, action?)
// ENEMY
// ANIMAL
// HCI - KEYS, PAD, MOUSE, TOUCH 
// ANIMATION & TIME (time)
// INVENTORY
// CRAFTING (extends inventory)
// CHEATS
// EXPERIMENTS


//////////////
//  *GAME
//////////////

import './sass/main.sass';
import * as globals from './js/globals';
import * as blNavigation from './js/navigation';
import * as mobile from './js/mobile';
import { Utility } from './js/utility';
import { Inventory } from './js/inventory';
import { Map } from './js/map';
import { Sound } from './js/sound';
import { Story } from './js/story';
import { Player } from './js/player';
import { Objects } from './js/objects';

var blUtil = new Utility();
var blInventory = new Inventory();
var blMap = new Map();
var blSound = new Sound();
var blStory = new Story();
var blPlayer = new Player();
var blObjects = new Objects();

blNavigation.initializeNavigation();
blInventory.setupInventorySlots();

/* PHONEGAP / MOBILE ONLY */
if ( $('body').hasClass("version-phonegap") ) {

	mobile.initializeMobile();
	globals.mapwidth = 16;
	globals.mapheight = 75;

	// This function here is used to write out any errors I get to the console.
	function errorHandler(transaction, error) {
		console.log('Oops. Error was '+error.message+' (Code '+error.code+')');
		return true;
	}
	
	$('.inventory-close').on("click", function() { toggleInventory(); });
	var toggleInventory = function() { $('.sticky-inventory').fadeToggle(0); }; 
	var hideControlPad = function() { $('.the-fucking-controller').fadeToggle(); };

	$(document).ready(function() {
		console.log("MOBILE VERSION");

		blMap.setupMap();
	    loadNewMap();
	    blPlayer.createPlayer();

		mobile.websql_openDatabase();
		mobile.websql_createTable();
		mobile.loadGameMobile();

		setupKeyboardEvents();
		setupMouseEvents();
		setupControlPadEvents();
		loadDevConsole();
	});

/* DESKTOP ONLY */
} else if ( $('body').hasClass("version-desktop") ) {

	$(document).ready(function() {
		console.log("DESKTOP VERSION");

		globals.mapwidth = 40;
		globals.mapheight = 40;

		blMap.setupMap();
		loadGame();

		setupKeyboardEvents();
		setupMouseEvents();
		setupControlPadEvents();
		loadDevConsole();
	});

	//alert/ask player to save before they close the page
	function confirmExit() {
		return "Sure you don't wanna SAVE first? You should use the SAVE button before you leave!";
	}
	window.onbeforeunload = confirmExit;

}

var loadNewGame = function() {
	blUtil.log("new user & brand new map");
    blMap.loadNewMap('forest', 'front');
    blPlayer.createPlayer();

    if (maptype == 'creative') {
      	blMap.loadNewMap('winter', 'right');
    	blMap.loadNewMap('beach', 'back');
    	blMap.loadNewMap('jungle', 'left');
    	blMap.loadNewMap('desert', 'bottom');
    	blMap.loadNewMap('islands', 'top');
	    blStory.createForestSigns();
	    blStory.createWinterSigns();
	    blStory.createBeachSigns();
	    getAllItems();
	    //createAnimal();
    } else if (maptype == 'game') {
    	blStory.createForestSigns();
    	//createAnimal();
    }
};

var loadGame = function() {
	blUtil.log("load game");

    $.post('php/loadmap.php', {maptype:'forest'}, function(data) {
    	if (data == false) {
    		loadNewGame();
    	} else {
    	    blMap.loadExistingMap('forest');
    		$.post('php/loadmap.php', {maptype:'winter'}, function(data) {
    			if (data) {
    				blUtil.log("loadwintermap");
    				blMap.loadExistingMap('winter');
    			}
			});
			$.post('php/loadmap.php', {maptype:'beach'}, function(data) {
				if (data) {
					blUtil.log("loadbeachmap");
					blMap.loadExistingMap('beach');
				}
			});
			blPlayer.loadPlayer();
    	}	
    });
};

var gameOver = function() {
	displayDialog("Game Over!");
	refillHearts();
};


/////////////
//  *Health
/////////////

var showObjectHealth = function(objectid, number) {
	var rid = globals.uniqueObjectID();
	var healthlabelhtml = '<div class="damage-label damage-label-id-'+rid+'">'+number+'</div>';
	$('.objectid-'+objectid).append(healthlabelhtml);
	$('.damage-label-id-'+rid).css("top","-80px");
	//$('.damage-label-fade
	$('.damage-label-id-'+rid).fadeOut(300, function() {
		$(this).delete();
	});
};

var setObjectHealth = function(objectid, value) {
	$('.objectid-'+objectid).attr("data-blockhealth",value);
};

var reduceObjectHealth = function(objectid, amount) {
	var blockhealth = $('.objectid-'+objectid).attr("data-blockhealth");
	blockhealth = blockhealth - amount;
	$('.objectid-'+objectid).attr("data-blockhealth",blockhealth);
	showObjectHealth(1,blockhealth);
};

var increaseObjectHealth = function(objectid, amount) {
	var blockhealth = $('.objectid-'+objectid).attr("data-blockhealth");
	blockhealth = blockhealth + amount;
	$('.objectid-'+objectid).attr("data-blockhealth",blockhealth);
};

var reduceBlockHealth = function(blockid, amount) {
	var blockhealth = $(".block").find("[data-blockid='" + blockid + "']").attr("data-blockhealth");
	blockhealth = blockhealth - amount;
	$(".block").find("[data-blockid='" + blockid + "']").attr("data-blockhealth");
};

var refillHearts = function() {
	$('.the-fucking-hearts ul .empty').removeClass();
	setObjectHealth(1,globals.totalhearts);
};

var addHeart = function() {
	var emptyhearts = $('.the-fucking-hearts ul .empty').length;
	//alert(emptyhearts
	$('.the-fucking-hearts .empty').first().removeClass("empty");
	increaseObjectHealth(1,1);
};

var removeHeart = function() {
	var hearts = totalHearts();
	if (hearts > 1) {
		$('.the-fucking-hearts li').not('.empty').last().addClass("empty");
		reduceObjectHealth(1,1);
	} else if (hearts == globals.totalhearts) {
		//don't add a heart, max 8
	} else {
		$('.the-fucking-hearts li').not('.empty').last().addClass("empty");
		reduceObjectHealth(1,1);
		gameOver();
	}
};

var totalHearts = function() {
	var hearts = $('.the-fucking-hearts li.empty').length;
	hearts = globals.totalhearts - hearts;
	return hearts;
};


/////////////
//  *Player
/////////////

var objectbrain;

var walkPlayerToBlock = function(id, destinationblock) {

	stopObjectMovement();

	var playerblock = blUtil.getObjectCurrentBlock('1');
	//var destinationblocktype = blUtil.getBlockType(destinationblock);
	//blUtil.log("destinationblock: "+destinationblock);
	//blUtil.log("playerblock: "+playerblock);

	if (playerblock == destinationblock) {
		//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
		playerPrimaryAction(destinationblock); 
		return;
	} else if ((playerblock-globals.mapwidth-1) == destinationblock) {
		//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
		playerPrimaryAction(destinationblock); 
		return;
	} else if ((playerblock+globals.mapwidth-1) == destinationblock) {
		//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
		playerPrimaryAction(destinationblock); 
		return;
	} else if ((playerblock-2) == destinationblock) {
		//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
		playerPrimaryAction(destinationblock); 
		return;
	}

	//blUtil.log("move object ID#"+id+" to block"+destinationblock);
	var t = 0;
	var maxthoughts = 100;
	objectbrain = setTimeout(anObjectMovement, globals.enemyspeed);

	var destinationblockColumn = destinationblock % globals.mapwidth;
	var destinationblockRow = parseInt(destinationblock / globals.mapwidth);

	//blUtil.log("destinationblock:"+destinationblock);
	//blUtil.log("destinationblockCol:"+destinationblockColumn);
	//blUtil.log("destinationblockRow:"+destinationblockRow);
	
	//collection of thoughts
	var objectPath = [];

	function stopObjectMovement() {
		//alert("stop tha shit!");
		clearTimeout(objectbrain);
	}
	
	function anObjectMovement() {

		var objectX = blUtil.getObjectCurrentCol(id) - 1; 
		var objectY = blUtil.getObjectCurrentRow(id) - 1;
		var n = objectPath.length;
		objectPath.push(objectX+"-"+objectY);

		var xDifference = destinationblockColumn - objectX;
		var yDifference = objectY - destinationblockRow;
		var POSxDifference = Math.abs(xDifference);
		var POSyDifference = Math.abs(yDifference);
		//var r = Math.random();
		//alert(r);

		//if player stuck abort!
		/*
		if (objectPath[n-1] == objectPath[n]) {
			blUtil.log("OBJECT STUCK, ABORTING");
			stopObjectMovement();
			return;
		}
		*/
		
		if ( (xDifference == 0) && (yDifference == 0) ) {
			//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
			blUtil.log("reached destination block, stop moving");
			//alert("i made it to the spot you clicked!");
			stopObjectMovement();
		} else if (POSxDifference >= POSyDifference) {
			if (xDifference >= 0) { 
				//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
				moveObject("right", id, "player");
			} else { 
				//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
				moveObject("left", id, "player");
			}
		} else {
			if (yDifference >= 0) { 
				//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
				moveObject("up", id, "player");
			} else { 
				//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
				moveObject("down", id, "player");
			}
		}
		
		//limit
		if (t > 10) {
			//blUtil.log("Enemy terminated");
			stopObjectMovement();
			//killEnemy(id);
		} else {
			t++;
			objectbrain = setTimeout(anObjectMovement, globals.playerspeed); // repeat thought
		}
	
	}

};

var playerPrimaryAction = function(blockid) {

	var id = 1;

	//find block that the player is facing
	var direction = getObjectDirection(id, "player");
	var playerblock = blUtil.getObjectCurrentBlock(id);
	var block = blUtil.getObjectCurrentBlock(id);
	
	var selecteditem = blUtil.getSelectedItem();
	switch (direction) {
		case "up": block = block - (globals.mapwidth); break;
		case "down": block = block + (globals.mapwidth); break;
		case "left": block = block - 1; break;
		case "right": block = block + 1; break;
	}

	// if there is a blockid supplied run function on that one instead of the block the player is facing
	if (blockid) {
		block = blockid;
	}
	
	//blUtil.log("4-hitblock "+block);
	
	var blocktype = blUtil.getBlockType(block);
	//blUtil.log("5-blocktype "+blocktype);

	//item swing animations
	if (selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "axe") {
		var swingclass = "player-direction-"+direction+"-"+selecteditem+"-swing";
		$(".the-fucking-player").addClass("player-direction-"+direction+"-"+selecteditem+"-swing");
		var swinganimation = setTimeout(removeSwingClass, 100);
		function removeSwingClass(swingclass) {
			$(".the-fucking-player").removeClass("player-direction-"+direction+"-"+selecteditem+"-swing");
		}	
		var playerblock = blUtil.getObjectCurrentBlock(id);	
		//blUtil.log("5-playerblock "+playerblock);

		//killing the enemy
		if ($('.the-fucking-enemy').length != 0) {
			$('.the-fucking-enemy').each(function(index) {
				var enemyid = $(this).attr('data-id');
				var enemyblock = blUtil.getObjectCurrentBlock(enemyid);
				if (block == enemyblock || enemyblock == playerblock) {
					blUtil.log("killed an enemy!");
					killEnemy(enemyid);
				}
			});
		}
	}
	
	$('.maps-wrap .block:eq('+block+')').animate({ opacity: 0.9 }, 50, function() {
		
		$('.maps-wrap .block:eq('+block+')').css("opacity","1");
		var selecteditem = blUtil.getSelectedItem();

		//use axe to collect doors, signs and other mechnism objects
		if ( (selecteditem == "axe") &&  ((blocktype == "door") || (blocktype == "door-open") ) ) {
			addToInventory("door", 1);
			blMap.changeBlockType(block, "grass");
		} else if ( (selecteditem == "axe") && (blocktype == "sign") ) {
			addToInventory("sign", 1);
			blMap.changeBlockType(block, "grass");
		} else if ( (selecteditem == "axe") && (blocktype == "fire") ) {
			addToInventory("fire", 1);
			blMap.changeBlockType(block, "grass");
			//growGrass(block);

		//EATING
		} else if (selecteditem == "heart") {
			addHeart();
			removeFromInventory(selecteditem);
		} else if (selecteditem == "apple") {
			addHeart();
			removeFromInventory(selecteditem);
		} else if (selecteditem == "carrot") {
			addHeart();
			removeFromInventory(selecteditem);
		} else if (selecteditem == "mushroom") {
			addHeart();
			hallucinate();
			removeFromInventory(selecteditem);
		} else if (selecteditem == "bluemushroom") {
			addHeart();
			blMap.mapPerspective();
			removeFromInventory(selecteditem);
		} else if (selecteditem == "blackmushroom") {
			addHeart();
			nightTime();
			lightUpBlock();
			removeFromInventory(selecteditem);
		//open/close doors
		} else if (blocktype == "door") {
			blMap.changeBlockType(block, "door-open");
		} else if (blocktype == "door-open") {
			blMap.changeBlockType(block, "door");

		//throw frisbee
		} else if (selecteditem == "frisbee") {
			throwFrisbee(block, direction);

		//throw spear
		} else if (selecteditem == "spear") {
			throwSpear(block, direction);

		//digging - forest map
		} else if ( (blUtil.getSelectedItem() == "shovel") && ((blocktype == "grass") || (blocktype == "dirt")) ) {
			blUtil.log("dig!");
			//chance of digging a diamond
			var r = Math.random();
			if (r < 0.5) {
				blUtil.log("diamond!");
				blMap.changeBlockType(block, "diamond-hole");
			} else {
				blMap.changeBlockType(block, "dirt");
			}
			addToInventory(blocktype, 5);
			addToInventory('dirt', 5);
			//growGrass(block);

		//digging - winter map
		} else if ( blUtil.getSelectedItem() == "shovel" && ( blocktype == "snow" || blocktype == "frozendirt" || blocktype == "ice" ) ) {
			//chance of digging gold
			var r = Math.random();
			if (r < 0.2) {
				blUtil.log("gold!");
				blMap.changeBlockType(block, "gold-hole");
			} else if (r < 0.4) {
				blUtil.log("silver!");
				blMap.changeBlockType(block, "silver-hole");
			} else {
				blMap.changeBlockType(block, "frozendirt");
			}
			addToInventory(blocktype, 5);
			addToInventory('frozendirt', 5);
			//growGrass(block);

		//digging - beach map
		} else if ( blUtil.getSelectedItem() == "shovel" && ( blocktype == "sand" || blocktype == "wetsand" ) ) {
			//chance of digging gold
			var r = Math.random();
			if (r < 0.2) {
				blUtil.log("oil!");
				blMap.changeBlockType(block, "oil-hole");
			} else if (r < 0.4) {
				blUtil.log("clay!");
				blMap.changeBlockType(block, "clay-hole");
			} else {
				blMap.changeBlockType(block, "wetsand");
			}
			addToInventory(blocktype, 5);
			addToInventory('wetsand', 5);
			//growGrass(block);

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
					blUtil.log("fill hole/water with dirt, sand or snow");
					blMap.changeBlockType(block, blUtil.getSelectedItem());
					removeFromInventory(blUtil.getSelectedItem());
					//growGrass(block);
					if(blocktype=="water"||blocktype=="wave") { addToInventory("water", 5); }
			}
			
		//read sign
		} else if (blocktype == "sign") {
			blUtil.log("reading sign");
			readSign(block);

		//placing blocks
		} else if ( (blocktype == "grass") || (blocktype == "dirt") || (blocktype == "hole") ||
		     (blocktype == "snow") || (blocktype == "frozendirt") || (blocktype == "ice") ||
		     (blocktype == "sand") || (blocktype == "wetsand") || (blocktype == "water") ) {
			//check for selected placable block in inventory
			//blUtil.log('selected item is '+selecteditem);
			//blUtil.log('blocktype is '+blocktype);

			//only allow 1 portal of each type on map
			if (selecteditem == "portal-a") {
				$('.maps-wrap .block-portal-a').each(function(index) {
					var id = $(this).attr("data-blockid");
					blMap.changeBlockType(id, "grass");

				});
				removeFromInventory(selecteditem);
				blMap.changeBlockType(block, selecteditem);
			} else if (selecteditem == "portal-b") {
				$('.maps-wrap .block-portal-b').each(function(index) {
					var id = $(this).attr("data-blockid");
					blMap.changeBlockType(id, "grass");

				});
				removeFromInventory(selecteditem);
				blMap.changeBlockType(block, selecteditem);
			} else if ( $.inArray(selecteditem, globals.isplaceable) > -1 ) {
				//placing/writing on a sign
				if (selecteditem == "sign") {
					placeSign(1, block);
				}
				blUtil.log('a placable item is selected');
				removeFromInventory(selecteditem);
				blMap.changeBlockType(block, selecteditem);
			}

			//achievements
			if (selecteditem == "fire") { 
				achievementCompleted("keepingwarm"); 
			}
			if (selecteditem == "door" || selecteditem == "door-closed") { 
				achievementCompleted("takingshelter"); 
			}

		//picking up items & blocks	
		} else if ($.inArray(blocktype, globals.iscollectable) > -1) {
			var changeblocktotype = "grass";
			if (blocktype == "diamond-hole") { blocktype = "diamond"; changeblocktotype = "grass"; } 
			else if (blocktype == "gold-hole") { blocktype = "gold"; changeblocktotype = "snow"; } 
			else if (blocktype == "silver-hole") { blocktype = "silver"; changeblocktotype = "snow"; }
			else if (blocktype == "oil-hole") { blocktype = "oil"; changeblocktotype = "sand"; }
			else if (blocktype == "clay-hole") { blocktype = "clay"; changeblocktotype = "sand"; }
			else if (blocktype == "carrot-inground") { blocktype = "carrot"; changeblocktotype = "dirt"; }

			addToInventory(blocktype, "5");
			blMap.changeBlockType(block, changeblocktotype);
			//growGrass(block);

			//appletrees give player apples
			if (blocktype == "appletree") {
				addToInventory("apple", "5");
			}

			//achievement cuttingwood
			if (blocktype == "tree" || blocktype == "pinetree" || blocktype == "palmtree" || blocktype == "appletree") {
				achievementCompleted("cuttingwood");
			}

			//achievement treasurehunter
			if (blocktype == "diamond" || blocktype == "gold" || blocktype == "silver" || blocktype == "oil" || blocktype == "clay") {
				//achievement trasure hunter
				achievementCompleted("treasurehunter");
			}
		}

	});
};


/////////////
//  *OBJECTS / ENGINE
/////////////

var moveObject = function(direction, id, name, map) {
	var success = false;
	var x = blUtil.getObjectCurrentPositionX(id);
	var y = blUtil.getObjectCurrentPositionY(id);
	x = blUtil.stripPX(x);
	y = blUtil.stripPX(y);

	changeObjectDirection(id, direction, name);

	if (!objectCollisionDetection(id, direction, map)) {
		switch (direction) {
			case "up": 
				y = y - globals.gridunitpx; 
				y = blUtil.addPX(y);
				$(".objectid-"+id).css("top",y); 
				break;

			case "down": 
				y = y + globals.gridunitpx; 
				y = blUtil.addPX(y);
				$(".objectid-"+id).css("top",y); 
				break;

			case "left": 
				x = x - globals.gridunitpx; 
				x = blUtil.addPX(x);
				$(".objectid-"+id).css("left",x); 
				break;

			case "right": 
				x = x + globals.gridunitpx; 
				x = blUtil.addPX(x);
				$(".objectid-"+id).css("left",x); 
				break;
		}
		success = true;
	} else {
		blUtil.log("Can't move object id:"+id+" "+direction);	
		success = false;
	}

	if (globals.isnightime == true) {
		clearLighting();
		lightUpBlock();
	}

	return success;
};

var objectCollisionDetection = function(id, direction, map) {
	var collide = false;
	var currentblock = blUtil.getObjectCurrentBlock(id);
	var nextblock = '';
	var row = blUtil.getObjectCurrentRow(id);
	var col = blUtil.getObjectCurrentCol(id);
	var selecteditem = blUtil.getSelectedItem();
	var movingObject_id = id;

	switch (direction) {
		case "up": nextblock = currentblock - (globals.mapwidth); break;
		case "down": nextblock = currentblock + (globals.mapwidth); break;
		case "left": nextblock = currentblock - 1; break;
		case "right": nextblock = currentblock + 1; break;
	}

	var movingObject_nextblock = nextblock;

	if (movingObject_id == 1) {
		blUtil.log('moving id:'+movingObject_id+' to block:'+movingObject_nextblock);
	}

	//teleporting
	if (id == 1 && $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-portal-a')) {
		var destinationblock = $('.maps-wrap .block-portal-b').first().attr("data-blockid");
		//alert(destinationblock);
		teleportObjectToBlock(1, destinationblock);
		collide = true;
	//teleporting
	} else if (id == 1 && $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-portal-b')) {
		var destinationblock = $('.maps-wrap .block-portal-a').first().attr("data-blockid");
		//alert(destinationblock);
		teleportObjectToBlock(1, destinationblock);
		collide = true;
	//space travel
	} else if (selecteditem == "rocket" && $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-space')) {
		collide = false;
	} else if (selecteditem == "rocket") {
		collide = true;
	//space
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-space') ) {
		collide = true;
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-star') ) {
		collide = true;
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-redgalaxy') ) {
		collide = true;
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-bluegalaxy') ) {
		collide = true;
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-sun') ) {
		collide = true;
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-earth') ) {
		collide = true;
	//canoeing
	} else if (selecteditem == "canoe" && $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-water')) {
		collide = false;
	} else if (selecteditem == "canoe") {
		collide = true;
	// Water
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-water') ) {
		collide = true;
	// Tree	
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-tree') ) {
		collide = true;
	// Rock
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-rock') ) {
		collide = true;
	// Wood
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-wood') ) {
		collide = true;
	// Fire
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-fire') ) {
		collide = true;
	// Closed Door
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-door') ) {
		collide = true;
	// Map right border	
	} else if ( (direction == "right" ) && (col>=globals.mapwidth-1) ) {
		console.log('*** RIGHT MAP EDGE ***');
		moveObjectToMap(1, currentblock, direction);
		collide = true;
	// Map left border	
	} else if ( (direction == "left" ) && (col==0) ) {
		console.log('*** LEFT MAP EDGE ***');
		moveObjectToMap(1, currentblock, direction);
		collide = true;
	// Map top border
	} else if ( (direction == "up" ) && (row<=1) ) {
		console.log('*** TOP MAP EDGE ***');
		moveObjectToMap(1, currentblock, direction);
		collide = true;
	// Map bottom border
	} else if ( (direction == "down" ) && (row>=globals.mapheight) ) {
		console.log('*** BOTTOM MAP EDGE ***');
		moveObjectToMap(1, currentblock, direction);
		collide = true;	
	// PineTree	
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-pinetree') ) {
		collide = true;
	// IceRock
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-icerock') ) {
		collide = true;
	// PalmTree
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-palmtree') ) {
		collide = true;
	// RockBrick
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-rockbrick') ) {
		collide = true;
	// IceRockBrick
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-icerockbrick') ) {
		collide = true;
	// ClayBrick
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-claybrick') ) {
		collide = true;
	// AppleTree
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-appletree') ) {
		collide = true;
	// TallTree
	} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-talltree') ) {
		collide = true;
	// Ice Sliding
	//} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-ice') ) {
		//slidePlayer();
		//return true;
	} else {
		// Hit player
		if (id != 1) {
			var playerElement = $('.the-fucking-player');
			var player_id = $('.the-fucking-player').attr('data-id');
			var player_block = blUtil.getObjectCurrentBlock(player_id);
			//blUtil.log('moving id:'+movingObject_id+' to block:'+movingObject_nextblock+' |||| player is on block:'+player_block);

			if (movingObject_nextblock == player_block) {
				blUtil.log('BLOCKED BY PLAYER');
				collide = true;
			}
		// Hit animal
		} else if ($('.the-fucking-deer').length != 0) {
			$('.the-fucking-deer').each(function(index) {
				var blockingObject_id = $(this).attr('data-id');
				var blockingObject_block = blUtil.getObjectCurrentBlock(blockingObject_id);
			
				if (movingObject_nextblock == blockingObject_block && movingObject_id != blockingObject_id) {
					//alert('BLOCKED BY ANIMAL: moving id:'+movingObject_id+' to block:'+movingObject_nextblock+' |||| animal id:'+blockingObject_id+' is on block:'+blockingObject_block);
					collide = true;
				}
			});
		// Walkable land
		} else {
			collide = false;
		}

	}	

	// Bike Riding?
	// Skiiing?
	// Canoeing
	// Driving

	return collide;
	
};

var changeObjectDirection = function(id, direction, name) {
	blUtil.log("changing object:"+id+" direction to "+direction);
	var selecteditem = blUtil.getSelectedItem();
	//animated items
	var playergraphic;
	if ( selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "axe" || selecteditem == "bike" || selecteditem == "skiis" || selecteditem == "car" || selecteditem == "canoe" || selecteditem == "rocket" && name == "player" ) { 
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
	if ( name == 'enemy' || name == 'animal' ) { 
		mobgraphic = "-"+selecteditem;
	} else {
		mobgraphic = "";
	}
	*/
};

var getObjectDirection = function(id, name) {
	var direction;
	var selecteditem = blUtil.getSelectedItem();
	var playergraphic;
	if ( (selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "bike" || selecteditem == "skiis") && name == "player" ) { 
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

var teleportObjectToBlock = function(objectId, destinationMap, destinationBlock) {
	var left = blUtil.getBlockLeftByID(destinationBlock);
	var top = blUtil.getBlockTopByID(destinationBlock);
	blUtil.setObjectCurrentPositionX(objectId,left);
	blUtil.setObjectCurrentPositionY(objectId,top);
};






/////////////
//  ENEMY
/////////////

var createEnemy = function() {
	var id = globals.uniqueObjectID();
	blUtil.log("Create Enemy "+id);
	//var enemystartblock = 0;
	$('.the-fucking-forest-map').append('<div data-id="'+id+'" class="objectid-'+id+' the-fucking-enemy enemy-direction-down"></div>');
	initEnemyBrain(id);
};

var killEnemy = function(id) {
	blUtil.log("Kill Enemy id: "+id);
	$('.objectid-'+id).remove();
};

var initEnemyBrain = function(id) {
	blUtil.log("start brain program for enemy #"+id);
	var t = 0;
	var maxthoughts = 100;
	var enemybrain = setTimeout(anEnemyThought, globals.enemyspeed);
	
	//collection of thoughts
	var enemyPath = Array();
	
	function anEnemyThought() {

		//check if enemy isnt dead
		if ($('.objectid-'+id).length != 0) {
	
			var enemyrandom = Math.random();
			//var enemydirection;
			var enemyX = blUtil.getObjectCurrentCol(id); var enemyY = blUtil.getObjectCurrentRow(id);
			var playerX = blUtil.getObjectCurrentCol(1); var playerY = blUtil.getObjectCurrentRow(1);
			
			var n = enemyPath.length;
			enemyPath.push(enemyX+"-"+enemyY);

			//blUtil.log("-----");
			//blUtil.log('enemythoughtid-'+n);
			//blUtil.log(enemyPath);
			//blUtil.log("enemylastpos="+enemyPath[n-1]);

			//is player stuck? move random direction
			if (enemyPath[n-1]==enemyPath[n]) {

				blUtil.log("ENEMY STUCK");

				var randomDirection = Math.floor(Math.random() * 4) + 1;
				switch(randomDirection) {
					case 1: moveObject("up", id, "enemy"); break;
					case 2: moveObject("down", id, "enemy"); break;
					case 3: moveObject("left", id, "enemy"); break;
					case 4: moveObject("right", id, "enemy"); break;
				}
			}

			//blUtil.log("-----");
			var PEx = playerX - enemyX; var PEy = enemyY - playerY;
			var posPEx = Math.abs(PEx); var posPEy = Math.abs(PEy);
			
			if ( (PEx == 0) && (PEy == 0)) {
				//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
				blUtil.log("found the player, kill player!");
				removeHeart();
			} else if (posPEx >= posPEy) {
				if (PEx >= 0) { 
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
					moveObject("right", id, "enemy");
				} else { 
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
					moveObject("left", id, "enemy");
				}
			} else {
				if (PEy >= 0) { 
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
					moveObject("up", id, "enemy");
				} else { 
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
					moveObject("down", id, "enemy");
				}
			}
			
			//limit
			if (t > maxthoughts) {
				blUtil.log("Enemy terminated");
				stopEnemyBrain();
				killEnemy(id);
			} else {
				t++;
				enemybrain = setTimeout(anEnemyThought, globals.enemyspeed); // repeat thought
			}

		}
		
	}

	function stopEnemyBrain() {
		clearTimeout(enemybrain);
	}
};


/////////////
//  ANIMAL
/////////////

var killAnimal = function(id) {
	blUtil.log("Kill Animal id: "+id);
	$('.objectid-'+id).remove();
};

var createAnimal = function() {

	var id = globals.uniqueObjectID();
	blUtil.log("Create Animal "+id);
	//var enemystartblock = 0;
	$('.the-fucking-forest-map').append('<div data-id="'+id+'" class="objectid-'+id+' the-fucking-deer deer-direction-down"></div>');
	initAnimalBrain(id);
};

var initAnimalBrain = function(id) {

	blUtil.log("start brain program for animal id:"+id);
	var t = 0;
	var maxthoughts = 100;
	var animalbrain = setTimeout(anAnimalThought, globals.animalspeed);
	
	//collection of thoughts
	var animalPath = Array();
	
	function anAnimalThought() {

		//check if enemy isnt dead
		if ($('.objectid-'+id).length != 0) {
	
			var animalrandom = Math.random();
			//var enemydirection;
			var animalX = blUtil.getObjectCurrentCol(id); var animalY = blUtil.getObjectCurrentRow(id);
			var playerX = blUtil.getObjectCurrentCol(1); var playerY = blUtil.getObjectCurrentRow(1);
			
			var n = animalPath.length;
			animalPath.push(animalX+"-"+animalY);

			//blUtil.log("-----");
			//blUtil.log('animalthoughtid-'+n);
			//blUtil.log(animalPath);
			//blUtil.log("animallastpos="+animalPath[n-1]);



			//is animal stuck? move random direction
			//if (animalPath[n-1]==animalPath[n]) {

				//blUtil.log("animal STUCK");

				var randomDirection = Math.floor(Math.random() * 4) + 1;
				switch(randomDirection) {
					case 1: moveObject("up", id, "deer"); break;
					case 2: moveObject("down", id, "deer"); break;
					case 3: moveObject("left", id, "deer"); break;
					case 4: moveObject("right", id, "deer"); break;
				}
			//}

			//blUtil.log("-----");

			/*
			var PEx = playerX - animalX; var PEy = animalY - playerY;
			var posPEx = Math.abs(PEx); var posPEy = Math.abs(PEy);
			
			if ( (PEx == 0) && (PEy == 0)) {
				//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
				blUtil.log("found the player, kill player!");
			} else if (posPEx >= posPEy) {
				if (PEx >= 0) { 
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
					moveObject("right", id, "animal");
				} else { 
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
					moveObject("left", id, "animal");
				}
			} else {
				if (PEy >= 0) { 
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
					moveObject("up", id, "animal");
				} else { 
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
					moveObject("down", id, "animal");
				}
			}
			*/
			
			//limit
			// if (t > maxthoughts) {
			// 	blUtil.log("Animal terminated");
			// 	stopAnimalBrain();
			// 	killAnimal(id);
			// } else {
				t++;
				animalbrain = setTimeout(anAnimalThought, globals.animalspeed); // repeat thought
			// }

		}
		
	}

	function stopAnimalBrain() {
		clearTimeout(animalbrain);
	}
};


/////////////
//  *ACHIEVEMENTS & NOTIFICATIONS
/////////////

var achievementCompleted = function(achievementname) {
	if (!$('.item-achievements .achievement-'+achievementname).hasClass('status-completed')) {
		$('.item-achievements .achievement-'+achievementname).addClass("status-completed");
		displayDialog("You got the "+achievementname+" achievement!");
	}
};

var displayDialog = function(text) {

	console.log("displayDialog");

	var html = '<div class="bubble-wrap bubble-dialog">';
				html += '<div class="bubble-link">';
		  			html += '<form class="bubble-form" action="#">';
		  				html += '<h3>'+text+'</h3>';
		    			//html += '<input class="bubble-input" type="text" placeholder="Text">';
		    			//html += '<textarea class="bubble-text bubble-input" rows="2" cols="30" placeholder="type message"></textarea>';
		    			html += '<input type="submit" value="Okay!" >';
		  			html += '</form>';
		  		html += '</div>';
		html += '</div>';

	$('.page-game').append(html);

	$('.bubble-dialog .bubble-form').submit(function(e) {

		$('.bubble-wrap').remove();
		event.preventDefault();

	});
};

/*
var achievements = [
        {
            "title": "Cutting Wood",
            "slug", "cuttingwood",
            "description": "Cut down trees and use them to create wood blocks.",
            "status": "incompleted"
        },
        {
            "title": "Keeping Warm",
            "slug", "keepingwarm",
            "description": "Use rocks and wood to build a fire.",
            "status": "incompleted"
        },
        {
            "title": "Taking Shelter",
            "slug", "takingshelter",
            "description": "Build a door and use some wood or solid blocks to create a cabin.",
            "status": "incompleted"
        },
        {
            "title": "Treasure Hunter",
            "slug", "treasurehunter",
            "description": "Build a shovel and dig for treasure.",
            "status": "incompleted"
        },
        {
            "title": "Jamming Out",
            "slug", "jammingout",
            "description": "Build a guitar or keyboard.",
            "status": "incompleted"
        }
    ]
}
*/

// fill in the achivement in page content
// for loop for above object

/*
completeAchievement = function(achievement) {};
*/


/////////////
//  *HCI - KEYBOARD
/////////////

var setupKeyboardEvents = function() {
	blUtil.log("Keyboard Events");
	window.addEventListener('keydown', function(event) {
		var selecteditem = blUtil.getSelectedItem();
		switch (event.keyCode) {
			case 37: /* LEFT ARROW */
				if (globals.disablekeyboardevents == false) {
					if (selecteditem == "guitar") { playSound(880); }
					else if (selecteditem == "piano") { playPiano(880); }
					else if (selecteditem == "drumsticks") { playDrums(880); }
					else if (selecteditem == "bike") { rideBike("left"); }
					else if (selecteditem == "skiis") { rideSkiis("left"); }
					else { moveObject("left", 1, "player"); }
				}
				break;
			case 38: /* UP ARROW */
				if (globals.disablekeyboardevents == false) {
					if (selecteditem == "guitar") { playSound(1320); } 
					else if (selecteditem == "piano") { playPiano(1320); } 
					else if (selecteditem == "drumsticks") { playDrums(1320); }
					else if (selecteditem == "bike") { rideBike("up"); } 
					else if (selecteditem == "skiis") { rideSkiis("up"); }
					else { moveObject("up", 1, "player"); }
				}
				break;
			case 39: /* RIGHT ARROW */
				if (globals.disablekeyboardevents == false) {
					if (selecteditem == "guitar") { playSound(1100); }
					else if (selecteditem == "piano") { playPiano(1100); }
					else if (selecteditem == "drumsticks") { playDrums(1100); }
					else if (selecteditem == "bike") { rideBike("right"); }
					else if (selecteditem == "skiis") { rideSkiis("right"); }
					else { moveObject("right", 1, "player"); }
				}
				break;
			case 40: /* DOWN ARROW */
				if (globals.disablekeyboardevents == false) {
					if (selecteditem == "guitar") { playSound(660); } 
					else if (selecteditem == "piano") { playPiano(660); } 
					else if (selecteditem == "drumsticks") { playDrums(660); }
					else if (selecteditem == "bike") { rideBike("down"); } 
					else if (selecteditem == "skiis") { rideSkiis("down"); }
					else { moveObject("down", 1, "player"); }
				}
				break;
			case 32: /* SPACE */
				if (globals.disablekeyboardevents == false) {

					if ($('.speech-bubble').length == 0) {
						playerPrimaryAction(); 
						event.preventDefault();
					} else {
						event.preventDefault();
					}

				}
				break;
			case 13: /* ENTER */
				if ($('.speech-bubble').length == 0) {
					$('.bubble-form').submit();
					event.preventDefault();
				} 
				break;
			case 69: // E 
				//playMusic();
				break;

			/*
			case 77: // M
				createEnemy();
				break;
			case 75: // K
				killEnemy(1);
				break;
			case 66: // B
				blMap.saveMap();
				break;
			case 67: // C
				blMap.loadExistingMap();
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
	    if ( ((key == 37) || (key == 38) || (key == 39) || (key == 40) /*|| (key == 32)*/) && (e.target.className != null))
	       e.preventDefault();

	});
	
};

var enableKeyboardEvents = function() {
	globals.disablekeyboardevents = false;
};

var disableKeyboardEvents = function() {
	globals.disablekeyboardevents = true;
};


/////////////
//  *HCI - CONTROL PAD
/////////////

var setupControlPadEvents = function() {
	blUtil.log("Control Pad Events");
	var selecteditem;
	//alert(selecteditem);
	$('.btn-up').on("touchstart", function() { 
		selecteditem = blUtil.getSelectedItem();
		if (selecteditem == "guitar") { playSound(1320); } 
		else if (selecteditem == "piano") { playPiano(1320); } 
		else if (selecteditem == "drumsticks") { playDrums(1320); }
		else if (selecteditem == "bike") { rideBike("up"); } 
		else if (selecteditem == "skiis") { rideSkiis("up"); }
		else { moveObject("up", 1, "player"); }
	});
	$('.btn-down').on("touchstart", function() { 
		selecteditem = blUtil.getSelectedItem();
		if (selecteditem == "guitar") { playSound(660); } 
		else if (selecteditem == "piano") { playPiano(660); } 
		else if (selecteditem == "drumsticks") { playDrums(660); }
		else if (selecteditem == "bike") { rideBike("down"); } 
		else if (selecteditem == "skiis") { rideSkiis("down"); }
		else { moveObject("down", 1, "player"); } 
	});
	$('.btn-left').on("touchstart", function() { 
		selecteditem = blUtil.getSelectedItem();
		if (selecteditem == "guitar") { playSound(880); } 
		else if (selecteditem == "piano") { playPiano(880); } 
		else if (selecteditem == "drumsticks") { playDrums(880); }
		else if (selecteditem == "bike") { rideBike("left"); } 
		else if (selecteditem == "skiis") { rideSkiis("left"); }
		else { moveObject("left", 1, "player"); }
	});
	$('.btn-right').on("touchstart", function() { 
		selecteditem = blUtil.getSelectedItem();
		if (selecteditem == "guitar") { playSound(1100); } 
		else if (selecteditem == "piano") { playPiano(1100); } 
		else if (selecteditem == "drumsticks") { playDrums(1100); }
		else if (selecteditem == "bike") { rideBike("right"); } 
		else if (selecteditem == "skiis") { rideSkiis("right"); }
		else { moveObject("right", 1, "player"); }
	});
	$('.btn-a').on("touchstart", function() { 
		playerPrimaryAction(); 
	});
};


/////////////
//  *HCI - MOUSE/TOUCH
/////////////

var setupMouseEvents = function() {
	blUtil.log("Mouse Events");
	var directions = ["up","down","left","right"];

	// SELECT AN ITEM IN THE INVENTORY
	$('.the-fucking-inventory div').on("click", function() {
		var blocktype = $(this).attr('data-blocktype');
		//items that are crafting ingredients
		if ( $.inArray(blocktype, globals.isingredient) > -1 ) {
		    if ( $(this).attr('data-blocktype') != "empty" ) {
		    	var blocktype = $(this).attr('data-blocktype');
		    	moveItemToCraftingTable(blocktype);
		    }
		}
		var playerdirection = getObjectDirection(1, "player");
		$('.the-fucking-inventory > div').removeClass("selected-item");
		$(this).addClass('selected-item');
		var selecteditem = $(this).attr('data-blocktype');

		//if ( selecteditem == "sword" ) { createEnemy(); }
		//if ( selecteditem == "spear" ) { createAnimal(); }
		
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
			$('.the-fucking-player').removeClass("player-direction-"+v+"-rocket");
			
		});
		
		if ( $.inArray(selecteditem, globals.isequipable) > -1 ) {
			blUtil.log("selected item has animation");
			$('.the-fucking-player').addClass("player-direction-"+playerdirection+"-"+selecteditem);
		}
		
	});

	// REMOVE ITEMS FROM CRAFTING TABLE
	$('.the-fucking-crafting-table > div').on("click", function() {
		var blocktype = $(this).attr('data-blocktype');
		if (blocktype != "empty") {
			blUtil.log("crafting slot not empty");
			$(this).removeClass("block block-"+blocktype);
			$(this).addClass("empty");
			$(this).attr('data-blocktype', "empty");
			$(this).html("0");
			addToInventory(blocktype,"1");
			checkCraftingTableForItem();
		}
	});

	// MOVE THE CRAFTED ITEM TO INVENTORY
	$('.the-fucking-crafted-item > div').on("click", function() {
		if (!$('.the-fucking-crafted-item > div').hasClass("empty")) {
			var blocktype = $(this).attr('data-blocktype');
			var itemquantity = $(this).html();
			blUtil.log("You crafted" + itemquantity + " " + blocktype);
			$('.the-fucking-crafted-item > div').removeClass(globals.allblockclasses);
			$('.the-fucking-crafted-item > div').html("0");
			removeAllItemsFromCraftingTable();
			addToInventory(blocktype, itemquantity);
			checkCraftingTableForItem();
		}
	});

	//SAVE THE MAPS AND PLAYER DATA
	$('.link-savemap').on("mousedown", function() {
		achievementCompleted("saveyourgame");
		$('.link-savemap a').html('Saving');
		var enableSaving = function() {
			$('.link-savemap div').html('<a>Save</a>');
		};
		setTimeout(enableSaving, 2500);
		blPlayer.savePlayer();
		blMap.saveMap();
	});

	//MOVE PLAYER TO BLOCK
	$('.the-fucking-forest-map .block').on("click", function() {
		if (typeof stopObjectMovement === 'undefined') {
		    // variable is undefined
		} else {
			stopObjectMovement();
		}
		var blockid = $(this).attr("data-blockid");
		blUtil.log("goto block id:"+blockid);
		walkPlayerToBlock(1, blockid);
	});

};


/////////////
//  *ANIMATION & TIME
/////////////

window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame || 
          window.oRequestAnimationFrame || 
          window.msRequestAnimationFrame || 
          function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            window.setTimeout(callback, 1000 / 60);
          };
})();

var count = 0;
var seconds = 0;

function newAnimationFrame() {
  count++;
  
  //run every second
  if ((count%60) == 0) {
     //world clock
    seconds++;
    //console.log('time since game started: '+seconds+' seconds');
  }

  //run every half second
  if ((count%30) == 0) {
	
  }

  //run every 200 miliseconds
  if ((count%10) == 0) {
  	//console.log("160 miliseconds has gone by");
  	animateSpears();
  }  
  
  //call loop again
  requestAnimFrame(newAnimationFrame);
}

// start time!
newAnimationFrame();

var animateSpears = function() {

	$('.the-fucking-spear').each(function(index) {
    	var direction = $(this).attr("data-direction");
    	var id = $(this).attr("data-id");
    	var stillmoving;
    	switch (direction) {
			case "up": var stillmoving = moveObject("up", id, "spear"); break;
			case "down": var stillmoving = moveObject("down", id, "spear"); break;
			case "left": var stillmoving = moveObject("left", id, "spear"); break;
			case "right": var stillmoving = moveObject("right", id, "spear"); break;
		}
		//console.log("stillmoving? "+stillmoving);

		//stop animation if spear collides with something
		if (stillmoving == false) {
			$('.objectid-'+id).remove();
		}
    });
};


/////////////
// *ANIMATION & PROJECTILES
/////////////

var growGrass = function(block) {
	blUtil.log("growing grass at block" + block);
	$('.maps-wrap .block:eq('+block+')').animate({
      	backgroundColor: "#36ac2a"
  	}, 10000, function() {
  		blUtil.log("grass has been grown at block "+block+", calling blMap.changeBlockType()");
  		blMap.changeBlockType(block, "grass");
  	});
};

var throwFrisbee = function(startblock, direction) {
	blUtil.log("Create Frisbee");
	//var enemystartblock = 0;
	//$('.the-fucking-frisbee').remove();
	var playerdirection = getObjectDirection(1, "player");
	var id = globals.uniqueObjectID();
	$('.the-fucking-forest-map').append('<div data-id='+id+' class=" the-fucking-frisbee objectid-'+id+' frisbee-direction-'+playerdirection+'"></div>');
	initProjectile("frisbee", startblock, direction, id);
};

var throwSpear = function(startblock, direction) {
	blUtil.log("Create Spear");
	//var enemystartblock = 0;
	//$('.the-fucking-frisbee').remove();
	var playerdirection = getObjectDirection(1, "player");
	var id = globals.uniqueObjectID();
	$('.the-fucking-forest-map').append('<div data-id='+id+' class=" the-fucking-spear objectid-'+id+' spear-direction-'+playerdirection+'" data-direction="'+direction+'"></div>');
	initProjectile("spear", startblock, direction, id);
};

var initProjectile = function(name, startblock, direction, id) {
	//stopProjectile();
	blUtil.log("Start velocity for " + name + " id:" + id + " travelling " + direction + " from block #" + startblock);
	var topstart = blUtil.getBlockTopByID(startblock);
	blUtil.log(topstart);
	var leftstart = blUtil.getBlockLeftByID(startblock);
	blUtil.log(leftstart);
	topstart = blUtil.addPX(topstart);
	leftstart = blUtil.addPX(leftstart);
	$('.objectid-'+id).css("top",topstart);
	$('.objectid-'+id).css("left",leftstart);
	//var t = 0;
	//var maxdistance = 10;

	//var projectilebrain = setTimeout(projectileMotion, globals.projectilespeed);

	//window.requestAnimationFrame(projectileMotion);

	/*
	window.requestAnimFrame = (function() {
	  return  window.requestAnimationFrame || 
	          window.webkitRequestAnimationFrame || 
	          window.mozRequestAnimationFrame || 
	          window.oRequestAnimationFrame || 
	          window.msRequestAnimationFrame || 
	          function( callback, element) {
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();

	function projectileMotion() {

		switch (direction) {
			case "up": moveObject("up", id, name); break;
			case "down": moveObject("down", id, name); break;
			case "left": moveObject("left", id, name); break;
			case "right": moveObject("right", id, name); break;
		}
		
		//limit
		
			//blUtil.log("projectile stopped :(");
			//stopProjectile();
		
			//projectilebrain = setTimeout(projectileMotion, globals.projectilespeed); // repeat thought
			//window.requestAnimationFrame(projectileMotion);
		//}//
		
	}

	*/


/*
	(function animloop() {
      projectileMotion();
      
      if (t > maxdistance) {
      	
      } else {
      	requestAnimFrame(animloop);
		t++;
	  }
	  
    })();

*/

	//projectileMotion();
	/*
	function stopProjectile() {
		clearTimeout(projectilebrain);
		$('.objectid-'+id).remove();
	}
	*/
};

var mapanimate;

var stopMap = function() { 
	clearTimeout(mapanimate); 
	mapanimate = null;
};

var moveMap = function() {
	blUtil.log("animating the map!");
	var mapspeed = 200;
	mapanimate = setTimeout(scrollMap, mapspeed);
	
	function scrollMap() {
		var toprow = $('.the-fucking-winter-map div').slice(0,40).remove();
		$('.the-fucking-winter-map').append(toprow);
		mapanimate = setTimeout(scrollMap, mapspeed); // repeat thought
	}
};

var wavesanimate;

var stopWaves = function() { 
	clearTimeout(wavesanimate); 
	wavesanimate = null;
};

var startWaves = function() {
	blUtil.log("animating the waves!");
	var wavespeed = 1400;
	wavesanimate = setTimeout(moveWaves, wavespeed);
	function moveWaves() {
		$('.the-fucking-beach-map .block').each( function(index, value) {
				if ($(this).hasClass('block-wave')) {
					if ($('.the-fucking-beach-map .block:eq('+(index-1)+')').hasClass('block-water')) {
						//wave has not reached the shore yet
						var newtype = 'wave';
						//blUtil.log("changing block "+(index-1)+" to "+newtype);
						$('.the-fucking-beach-map .block:eq('+(index-1)+')').removeClass("block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt block-palmtree block-sandstone block-sand block-wave");
						$('.the-fucking-beach-map .block:eq('+(index-1)+')').addClass("block block-"+newtype);
						$('.the-fucking-beach-map .block:eq('+(index-1)+')').attr("data-blocktype", newtype);						
					} else {
						//wave has reached the shore, create new wave at edge of map
						//var rowremainder = (index-1) % globals.mapwidth;
						//alert(rowremainder);
						var r = parseInt(Math.random() * globals.mapheight);
						var newwaveposition = (r * globals.mapwidth) - 1;
						var newtype = "wave";
						//blUtil.log("new wave at block "+newwaveposition);
						$('.the-fucking-beach-map .block:eq('+newwaveposition+')').removeClass("block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt block-palmtree block-sandstone block-sand block-wave");
						$('.the-fucking-beach-map .block:eq('+newwaveposition+')').addClass("block block-"+newtype);
						$('.the-fucking-beach-map .block:eq('+newwaveposition+')').attr("data-blocktype", newtype);
					}
					newtype = 'water';
					//blUtil.log("changing block "+index+" to "+newtype);
					$('.the-fucking-beach-map .block:eq('+index+')').removeClass("block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt block-palmtree block-sandstone block-sand block-wave");
					$('.the-fucking-beach-map .block:eq('+index+')').addClass("block block-"+newtype);
					$('.the-fucking-beach-map .block:eq('+index+')').attr("data-blocktype", newtype);
					/*
					blMap.changeBlockType(index-1, 'wave');
					blMap.changeBlockType(index, 'water');
					*/	
			  	}	
			  	//alert(index + ': ' + value);
		  	//}
		});
		wavesanimate = setTimeout(moveWaves, wavespeed); // repeat thought
	}
};

var ridingbike;

var rideBike = function(direction) {
	stopBiking();
	var playerdirection = getObjectDirection(1, "player");
	if (playerdirection == "left" && direction == "right") { 
		changeObjectDirection(1, "right", "player");
	} else if (playerdirection == "right" && direction == "left") { 
		changeObjectDirection(1, "left", "player");
	} else if (playerdirection == "up" && direction == "down") { 
		changeObjectDirection(1, "down", "player");
	} else if (playerdirection == "down" && direction == "up") { 
		changeObjectDirection(1, "up", "player");
	} else {
		ridingbike = setTimeout(function() {
			startBiking(direction);
		}, globals.bikespeed);
	}
};

var startBiking = function (direction) {
	blUtil.log("move bike "+direction);
	var playerdirection = getObjectDirection(1, "player");
	blUtil.log("player current direction: "+playerdirection);
	switch (direction) {
		case "up": moveObject("up", 1, "player"); break;
		case "down": moveObject("down", 1, "player"); break;
		case "left": moveObject("left", 1, "player"); break;
		case "right": moveObject("right", 1, "player"); break;
	}
	ridingbike = setTimeout(function() {
    	startBiking(direction);
	}, globals.bikespeed); // repeat movement
};

var stopBiking = function () {
	clearTimeout(ridingbike);
};

var rideSkiis = function(direction) {
	if (direction == "up") {
		moveObject("up", 1, "player");
		changeObjectDirection(1,"up", "player");
		stopMap();
	} else {
		switch (direction) {
			case "up": moveObject("up",1, "player"); break;
			case "down": moveObject("down", 1, "player"); break;
			case "left": moveObject("left", 1, "player"); break;
			case "right": moveObject("right", 1, "player"); break;
		}
		if (mapanimate == null) {
			moveMap();
		}
	}
};





/////////////
//  *INVENTORY / CRAFTING
/////////////



var addToInventory = function(blocktype, quantitytoadd) {
	if(!quantitytoadd) { quantitytoadd == "1"; }
	quantitytoadd = parseInt(quantitytoadd);
	var slotwithsameitem = $('.the-fucking-inventory > .block-'+blocktype).index();
	// add to slot with matching item
	if ( slotwithsameitem != -1 ) {
		blUtil.log("adding "+quantitytoadd+" "+blocktype+" to stack in inv.");
		var quantity = $('.the-fucking-inventory > div:eq('+slotwithsameitem+')').html();
		quantity = parseInt(quantity) + quantitytoadd;
		$('.the-fucking-inventory > div:eq('+slotwithsameitem+')').html(quantity);
	// add to empty slot
	} else {
		blUtil.log("adding "+quantitytoadd+" "+blocktype+" to empty slot in inv.");
		$('.the-fucking-inventory > .empty').first().addClass('block block-'+blocktype);
		$('.the-fucking-inventory > .empty').first().attr('data-blocktype', blocktype);
		$('.the-fucking-inventory > .empty').first().html(quantitytoadd);
		var index = $('.the-fucking-inventory > .empty').first().index();
		index = index + 1;
		$('.the-fucking-inventory > .empty').first().removeClass('empty');
	}
};

var removeFromInventory = function(blocktype) {
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

var moveItemToCraftingTable = function(blocktype) {
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

var removeAllItemsFromCraftingTable = function() {
	$('.the-fucking-crafting-table > div').removeClass(globals.allblockclasses);
	$('.the-fucking-crafting-table > div').attr("data-blocktype", "empty");
	$('.the-fucking-crafting-table > div').addClass("empty");
	$('.the-fucking-crafting-table > div').html("0");
};

var checkCraftingTableForItem = function() {
	blUtil.log("Check for Craftable Item");
	var slot1type = $('.the-fucking-crafting-table > .slot-1').attr("data-blocktype");
	var slot2type = $('.the-fucking-crafting-table > .slot-2').attr("data-blocktype");
	var slot3type = $('.the-fucking-crafting-table > .slot-3').attr("data-blocktype");
	var recipe = slot1type + slot2type + slot3type;

	var createCraftedItem = function(blocktype, amount) {
		if (amount == null) { amount = 1; }
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
		case "silveroilfire": createCraftedItem("rocket",1); break;

		case "treepinetreetree": createCraftedItem("table",5); break;
		case "pinetreewoodwood": createCraftedItem("chair",5); break;
		case "pinetreepalmpinetree": createCraftedItem("bed",5); break;
		case "woodpinetreewood": createCraftedItem("chest",5); break;
		case "diamondsilvergold": createCraftedItem("telescope",1); break;
		case "diamondsilverdiamond": createCraftedItem("computer",1); break;

		case "palmtreepalmwoodpalmtree": createCraftedItem("drumsticks",3); break;

		case "pinetreeemptyempty": createCraftedItem("pinewood",3); break;
		case "pinetreepinetreeempty": createCraftedItem("pinewood",6); break;
		case "pinetreepinetreepinetree": createCraftedItem("pinewood",10); break;
		case "palmtreeemptyempty": createCraftedItem("palmwood",3); break;
		case "palmtreepalmtreeempty": createCraftedItem("palmwood",5); break;
		case "palmtreepalmtreepalmtree": createCraftedItem("palmwood",10); break;
		case "appletreeemptyempty": createCraftedItem("applewood",3); break;
		case "appletreeappletreeempty": createCraftedItem("applewood",6); break;
		case "appletreeappletreeappletree": createCraftedItem("applewood",10); break;

		case "palmpalmwood": createCraftedItem("bow",1); break;
		case "woodpalmpalm": createCraftedItem("arrow",1); break;
		case "silversilversilver": createCraftedItem("portala",1); break;
		case "goldgoldgold": createCraftedItem("portalb",1); break;

		default:
			$('.the-fucking-crafted-item > .slot').removeClass(globals.allblockclasses);
			$('.the-fucking-crafted-item > .slot').addClass("empty");
			$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'empty');
			$('.the-fucking-crafted-item > .slot').html("0");
	}	
};



/////////////
//  *DEV CONSOLE 
/////////////

var loadDevConsole = function() {

	console.log("load dev console");

	var consoleItems = [
		{
			text: 'Create Enemy',
			function_name: 'createEnemy'
		},
		{
			text: 'Kill Enemy',
			function_name: 'killEnemy'
		},
		{
			text: 'Create Animal',
			function_name: 'createAnimal'
		},
		{
			text: 'Kill Animal',
			function_name: 'killAnimal'
		},
		{
			text: 'Get All Items',
			function_name: 'getAllItems'
		},
		{
			text: 'Night Time',
			function_name: 'nightTime'
		},
		{
			text: 'Light up Player',
			function_name: 'lightUpBlock'
		},
		{
			text: 'Start Skiing',
			function_name: 'moveMap'
		},
		{
			text: 'Stop Skiing',
			function_name: 'stopMap'
		},
		{
			text: 'Rotate Cube to Front',
			function_name: 'rotateCubeTo',
			function_val: 'front'
		},
		{
			text: 'Rotate Cube to Right',
			function_name: 'rotateCubeTo',
			function_val: 'right'
		},
		{
			text: 'Rotate Cube to Back',
			function_name: 'rotateCubeTo',
			function_val: 'back'
		},
		{
			text: 'Rotate Cube to Left',
			function_name: 'rotateCubeTo',
			function_val: 'left'
		},
		{
			text: 'Rotate Cube to Bottom',
			function_name: 'rotateCubeTo',
			function_val: 'bottom'
		},
		{
			text: 'Rotate Cube to Top',
			function_name: 'rotateCubeTo',
			function_val: 'top'
		},
		{
			text: 'Cubify Map',
			function_name: 'cubifyMap'
		},
		{
			text: 'Decubify Map',
			function_name: 'decubifyMap'
		},
		{
			text: 'Move Object To Map',
			function_name: 'moveObjectToMap'
		}

	];

	var html = '';
	var devconsole = $('.dev-console');

	$.each(consoleItems, function(index, value) {
		var container = $('<li />');
		var function_name = '';
		if (value.function_val) {
			function_name = value.function_name + '("' + value.function_val + '")';
		} else {
			function_name = value.function_name + '()';
		}
		container.append('<a href="javascript:void(0);">'+value.text+'</a>');
		container.on("click", function() {
			eval(function_name);
		});
	 	console.log(function_name);
		devconsole.append(container);
	});

};



/////////////
//  *CHEATS 
/////////////

var getAllItems = function() {
	var inventoryhtml = '';
	$.each(globals.blocktypes, function(index, value) {
		if ( 	
			value != "diamond-hole" && value != "gold-hole" && value != "silver-hole" && value != "oil-hole" &&
		 	value != "clay-hole" && value != "carrot-inground" 
		) {
			inventoryhtml += '<div class="slot-'+index+' block block-'+value+' ';
			if(index==0) { inventoryhtml += 'selected-item'; }
			inventoryhtml += '" data-blocktype="'+value+'">99</div>';
		}
	});
	$('.the-fucking-inventory').html(inventoryhtml);
	$('.the-fucking-inventory').show();
	setupMouseEvents();

	/*for 
	'<div class="slot-1 empty selected-item" data-blocktype="empty">0</div>'
	'<div class="slot-2 empty" data-blocktype="empty">0</div>''*/
};


/////////////
//  *EXPERIEMENTS 
/////////////

var changeOverlayBlockOpacity = function(block, opacity) {
	//blUtil.log("8-changing block "+block+" to "+newtype);
	$('.the-fucking-map-overlay .block:eq('+block+')').css("opacity",opacity);
};

var nightTime = function() {
	console.log("night time");
	// MAP OVERLAY
    var overlayhtml = "";
    for (var f = 0; f <= (globals.totalmapblocks - 1); f++) {
		overlayhtml += '<div data-overlayblockid="'+f+'" class="block block-dark"></div>';
	}
	$('.the-fucking-map-overlay').fadeIn();
	$('.the-fucking-map-overlay').append(overlayhtml);

	globals.isnightime = true;

	setTimeout(
		function() {
			morningTime();
		}, 
	10000);
};

//end night time e.g. morning
var morningTime = function() {
	$('.the-fucking-map-overlay').empty();
	globals.isnightime = false;
};

var clearLighting = function() {
	$('.the-fucking-map-overlay .block-dark').css("opacity",1);
};

var lightUpBlock = function() {

	console.log ("the light!");

	//var randomblockid = Math.floor((Math.random() * globals.totalmapblocks) + 1);
	var playerblockid = blUtil.getObjectCurrentBlock("1") - 1;
	var value = 0;

	changeOverlayBlockOpacity(playerblockid, value);

	// layer 1 of pixels surrounding lightsource
	changeOverlayBlockOpacity(playerblockid-1, value);
	changeOverlayBlockOpacity(playerblockid+1, value);
	changeOverlayBlockOpacity(playerblockid-globals.mapwidth, value);
	changeOverlayBlockOpacity(playerblockid+globals.mapwidth, value);

	// layer 2 of pixels surrounding lightsource
	changeOverlayBlockOpacity(playerblockid-2, 0.2);
	changeOverlayBlockOpacity(playerblockid+2, 0.2);
	changeOverlayBlockOpacity(playerblockid-globals.mapwidth-1, 0.2);
	changeOverlayBlockOpacity(playerblockid-globals.mapwidth+1, 0.2);
	changeOverlayBlockOpacity(playerblockid+globals.mapwidth-1, 0.2);
	changeOverlayBlockOpacity(playerblockid+globals.mapwidth+1, 0.2);
	changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2), 0.2);
	changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2), 0.2);

	// layer 2 of pixels surrounding lightsource
	changeOverlayBlockOpacity(playerblockid-3, 0.4);
	changeOverlayBlockOpacity(playerblockid+3, 0.4);
	changeOverlayBlockOpacity(playerblockid-globals.mapwidth-2, 0.4);
	changeOverlayBlockOpacity(playerblockid-globals.mapwidth+2, 0.4);
	changeOverlayBlockOpacity(playerblockid+globals.mapwidth-2, 0.4);
	changeOverlayBlockOpacity(playerblockid+globals.mapwidth+2, 0.4);
	changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2)+1, 0.4);
	changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2)-1, 0.4);
	changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2)+1, 0.4);
	changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2)-1, 0.4);
	changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*3), 0.4);
	changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*3), 0.4);

	// layer 3 of pixels surrounding lightsource
	changeOverlayBlockOpacity(playerblockid-4, 0.6);
	changeOverlayBlockOpacity(playerblockid+4, 0.6);
	changeOverlayBlockOpacity(playerblockid-globals.mapwidth-3, 0.6);
	changeOverlayBlockOpacity(playerblockid-globals.mapwidth+3, 0.6);
	changeOverlayBlockOpacity(playerblockid+globals.mapwidth-3, 0.6);
	changeOverlayBlockOpacity(playerblockid+globals.mapwidth+3, 0.6);
	changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2)+2, 0.6);
	changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2)-2, 0.6);
	changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2)+2, 0.6);
	changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2)-2, 0.6);
	changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*3)+1, 0.6);
	changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*3)-1, 0.6);
	changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*3)+1, 0.6);
	changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*3)-1, 0.6);
	changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*4), 0.6);
	changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*4), 0.6);

	// layer 4 of pixels surrounding lightsource
	changeOverlayBlockOpacity(playerblockid-4, 0.8);
	changeOverlayBlockOpacity(playerblockid+4, 0.8);
	changeOverlayBlockOpacity(playerblockid-globals.mapwidth-3, 0.8);
	changeOverlayBlockOpacity(playerblockid-globals.mapwidth+3, 0.8);
	changeOverlayBlockOpacity(playerblockid+globals.mapwidth-3, 0.8);
	changeOverlayBlockOpacity(playerblockid+globals.mapwidth+3, 0.8);
	changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2)+2, 0.8);
	changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2)-2, 0.8);
	changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2)+2, 0.8);
	changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2)-2, 0.8);
	changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*3)+1, 0.8);
	changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*3)-1, 0.8);
	changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*3)+1, 0.8);
	changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*3)-1, 0.8);

};

var cubifyMap = function() {
	$('.maps-container').addClass('cube-container');
	$('.maps-wrap').addClass('cube cube-show-front');
	$('.maps-wrap > div').each(function(index) {
		switch (index) {
			case 0: $(this).addClass("cube-side side-front"); break;
			case 1: $(this).addClass("cube-side side-right"); break;
			case 2: $(this).addClass("cube-side side-back"); break;
			case 3: $(this).addClass("cube-side side-left"); break;
			case 4: $(this).addClass("cube-side side-top"); break;
			case 5: $(this).addClass("cube-side side-bottom"); break;
		}
	});
};

var decubifyMap = function() {
	$('.maps-container').removeClass('cube-container');
	$('.maps-wrap').removeClass('cube');
	$('.maps-wrap').removeClass(function (index, className) {
		return (className.match (/(^|\s)cube-show-\S+/g) || []).join(' ');
	});
	$('.maps-wrap > div').removeClass(function (index, className) {
		return (className.match (/(^|\s)cube-\S+/g) || []).join(' ');
	});
};

var rotateCubeTo = function(side) {
	$('.cube').removeClass(function (index, className) {
		return (className.match (/(^|\s)cube-show-\S+/g) || []).join(' ');
	});
	$('.cube').addClass('cube-show-'+side);
	globals.currentCubeSide = side;
};

var moveObjectToMap = function(objectId, objectCurrentBlock, objectDirection) {
	//init
	//globals.currentMap = globals.cubeSidesArray[globals.currentCubeSide].map;
	var objectDirection = objectDirection;
	var object = $('.objectid-'+objectId);
	var currentBlock = objectCurrentBlock;

	// find out what map and side of cube is next
	var nextCubeSide = globals.cubeSidesArray[globals.currentCubeSide][objectDirection];
	var nextMap = globals.cubeSidesArray[nextCubeSide].map;
	var toMap = $('.the-fucking-'+nextMap+'-map');

	blUtil.log('nextCubeSide**************'+nextCubeSide);
	blUtil.log('nextMap**************'+nextMap);
	blUtil.log('toMap**************'+toMap);

	// find out what block on next map to move to
	var mapwidth = globals.mapwidth;
	var mapheight = globals.mapheight;
	var nextBlock = 0;

	switch (objectDirection) {
		case 'right':
			nextBlock = currentBlock - (mapwidth - 1);
			break;
		case 'left':
			nextBlock = currentBlock + mapwidth - 1;
			break;
		case 'up':
			nextBlock = currentBlock + (mapwidth * mapheight) - mapwidth;
			break;
		case 'down':
			nextBlock = currentBlock - (mapwidth * mapheight) + mapwidth;
			break;
	}
	
	blUtil.log('currentBlock**************'+currentBlock);
	blUtil.log('mapwidth**************'+mapwidth);
	blUtil.log('mapwidth * mapheight**************'+mapwidth * mapheight);
	blUtil.log('nextBlock**************'+nextBlock);

	// remove player from current map
	object.detach();

	// rotate the cube
	rotateCubeTo(nextCubeSide);

	// add player to new map
	object.appendTo(toMap);
	teleportObjectToBlock(1, nextMap, nextBlock);
};