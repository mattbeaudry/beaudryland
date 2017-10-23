import './sass/main.sass';
import * as globals from './js/globals';
import * as blNavigation from './js/navigation';

import { Utility } from './js/utility';
import { Inventory } from './js/inventory';
import { Map } from './js/map/map';
import { Cube } from './js/map/cube';
import { Story } from './js/story';
import { Player } from './js/player';
import { Animal } from './js/animal';
import { Movement } from './js/movement';
import { Signs } from './js/signs';
import { Health } from './js/health';
import { Dev } from './js/dev';
import { HCI } from './js/hci';
import { Achievement } from './js/achievement';
import { Mobile } from './js/mobile';

var blUtil = new Utility();
var blInventory = new Inventory();
var blMap = new Map();
var blCube = new Cube();
var blStory = new Story();
var blPlayer = new Player();
var blAnimal = new Animal();
var blMovement = new Movement();
var blSigns = new Signs();
var blHealth = new Health();
var blDev = new Dev();
var blHCI = new HCI();
var blAchievement = new Achievement();
var blMobile = new Mobile();

blNavigation.initializeNavigation();
blInventory.setupInventorySlots();

// PHONEGAP / MOBILE ONLY
if ( $('body').hasClass("version-phonegap") ) {
	
	$('.inventory-close').on("click", function() { toggleInventory(); });
	var toggleInventory = function() { $('.sticky-inventory').fadeToggle(0); }; 
	var hideControlPad = function() { $('.the-fucking-controller').fadeToggle(); };

	$(document).ready(function() {
		console.log("MOBILE VERSION");

		globals.mapwidth = globals.mapWidthMobile;
		globals.mapheight = globals.mapHeightMobile;
		blMap.setupMap('mobile');
	    blMap.loadNewMap('forest', 'front');
	    blPlayer.createPlayer();

		blMobile.websql_openDatabase();
		blMobile.websql_createTable();
		blMobile.loadGameMobile();

		blStory.createForestSigns();
    	//blAnimal.createAnimal();
    	//blStory.setupMapBorders('forest');

    	blMap.loadNewMap('winter', 'right');
    	blMap.loadNewMap('beach', 'back');
    	blMap.loadNewMap('jungle', 'left');
    	blMap.loadNewMap('desert', 'bottom');
    	blMap.loadNewMap('islands', 'top');
	    blStory.createForestSigns();
	    blStory.createWinterSigns();
	    blStory.createBeachSigns();
	    blDev.getAllItems();


		blHCI.setupKeyboardEvents();
		blHCI.setupMouseEvents();
		blHCI.setupControlPadEvents();
		blDev.loadDevConsole();
	});

// DESKTOP ONLY
} else if ( $('body').hasClass("version-desktop") ) {

	$(document).ready(function() {
		console.log("DESKTOP VERSION");

		globals.mapwidth = globals.mapWidthDesktop;
		globals.mapheight = globals.mapHeightDesktop;
		blMap.setupMap('desktop');

		loadGame();

		blHCI.setupKeyboardEvents();
		blHCI.setupMouseEvents();
		blHCI.setupControlPadEvents();
		blDev.loadDevConsole();
	});

	//alert/ask player to save before they close the page
	function confirmExit() {
		return "Sure you don't wanna SAVE first? You should use the SAVE button before you leave!";
	}
	window.onbeforeunload = confirmExit;
}

var loadNewGame = function() {
	blUtil.log("new user & brand new map");
    
    if (maptype == 'creative') {
    	blMap.loadNewMap('forest', 'front');
      	blMap.loadNewMap('winter', 'right');
    	blMap.loadNewMap('beach', 'back');
    	blMap.loadNewMap('jungle', 'left');
    	blMap.loadNewMap('desert', 'bottom');
    	blMap.loadNewMap('islands', 'top');
	    blStory.createForestSigns();
	    blStory.createWinterSigns();
	    blStory.createBeachSigns();
	    blDev.getAllItems();
	    //blAnimal.createAnimal();
    } else if (maptype == 'game') {
    	blMap.loadNewMap('forest', 'front');
    	blStory.createForestSigns();
    	//blAnimal.createAnimal();
    	blStory.setupMapBorders('forest');
    }

    blPlayer.createPlayer();
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
			$.post('php/loadmap.php', {maptype:'jungle'}, function(data) {
				if (data) {
					blUtil.log("loadjunglemap");
					blMap.loadExistingMap('jungle');
				}
			});
			$.post('php/loadmap.php', {maptype:'desert'}, function(data) {
				if (data) {
					blUtil.log("loaddesertmap");
					blMap.loadExistingMap('desert');
				}
			});
			$.post('php/loadmap.php', {maptype:'islands'}, function(data) {
				if (data) {
					blUtil.log("loadislandsmap");
					blMap.loadExistingMap('islands');
				}
			});
			blPlayer.loadPlayer();
    	}	
    });
};

var gameOver = function() {
	blAchievement.displayDialog("Game Over!");
	blHealth.refillHearts();
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
			case "up": var stillmoving = blMovement.moveObject("up", id, "spear"); break;
			case "down": var stillmoving = blMovement.moveObject("down", id, "spear"); break;
			case "left": var stillmoving = blMovement.moveObject("left", id, "spear"); break;
			case "right": var stillmoving = blMovement.moveObject("right", id, "spear"); break;
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
	var playerdirection = blUtil.getObjectDirection(1, "player");
	var id = globals.uniqueObjectID();
	$('.the-fucking-forest-map').append('<div data-id='+id+' class=" the-fucking-frisbee objectid-'+id+' frisbee-direction-'+playerdirection+'"></div>');
	initProjectile("frisbee", startblock, direction, id);
};

var throwSpear = function(startblock, direction) {
	blUtil.log("Create Spear");
	//var enemystartblock = 0;
	//$('.the-fucking-frisbee').remove();
	var playerdirection = blUtil.getObjectDirection(1, "player");
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
			case "up": blMovement.moveObject("up", id, name); break;
			case "down": blMovement.moveObject("down", id, name); break;
			case "left": blMovement.moveObject("left", id, name); break;
			case "right": blMovement.moveObject("right", id, name); break;
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
	var playerdirection = blUtil.getObjectDirection(1, "player");
	if (playerdirection == "left" && direction == "right") { 
		blMovement.changeObjectDirection(1, "right", "player");
	} else if (playerdirection == "right" && direction == "left") { 
		blMovement.changeObjectDirection(1, "left", "player");
	} else if (playerdirection == "up" && direction == "down") { 
		blMovement.changeObjectDirection(1, "down", "player");
	} else if (playerdirection == "down" && direction == "up") { 
		blMovement.changeObjectDirection(1, "up", "player");
	} else {
		ridingbike = setTimeout(function() {
			startBiking(direction);
		}, globals.bikespeed);
	}
};

var startBiking = function (direction) {
	blUtil.log("move bike "+direction);
	var playerdirection = blUtil.getObjectDirection(1, "player");
	blUtil.log("player current direction: "+playerdirection);
	switch (direction) {
		case "up": blMovement.moveObject("up", 1, "player"); break;
		case "down": blMovement.moveObject("down", 1, "player"); break;
		case "left": blMovement.moveObject("left", 1, "player"); break;
		case "right": blMovement.moveObject("right", 1, "player"); break;
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
		blMovement.moveObject("up", 1, "player");
		blMovement.changeObjectDirection(1,"up", "player");
		stopMap();
	} else {
		switch (direction) {
			case "up": blMovement.moveObject("up",1, "player"); break;
			case "down": blMovement.moveObject("down", 1, "player"); break;
			case "left": blMovement.moveObject("left", 1, "player"); break;
			case "right": blMovement.moveObject("right", 1, "player"); break;
		}
		if (mapanimate == null) {
			moveMap();
		}
	}
};