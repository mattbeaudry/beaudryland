import * as globals from './globals';
import { Utility } from './utility';
import { Movement } from './movement';
var blUtil = new Utility();
var blMovement = new Movement();

export class Time {

	startTime() {
		console.log("STTTARTTTTTIMEEEE");
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

			//run every 10 seconds
			if ((count % 600) == 0) {
				
			}

			//run every second
			if ((count%60) == 0) {
				seconds++;
				//console.log('time: '+seconds+'s');
				//animateWaves(); 
			}

			//run every half second
			if ((count%30) == 0) {
				animateSpears();
			}

			//run every 200 miliseconds
			if ((count % 10) == 0) {
				
			}  

			//call loop again
			requestAnimFrame(newAnimationFrame);
		}

		// start time!
		newAnimationFrame();

		// spears
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
				//stop animation if spear collides with something
				if (stillmoving == false) {
					$('.objectId-'+id).remove();
				}
			});
		};

		// waves
		// var animateWaves = function() {
		// 	$('.the-fucking-beach-map .block').each( function(index, value) {
		// 		if ($(this).hasClass('block-wave')) {
		// 			if ($('.the-fucking-beach-map .block:eq('+(index-1)+')').hasClass('block-water')) {
		// 				//wave has not reached the shore yet
		// 				var newtype = 'wave';
		// 				$('.the-fucking-beach-map .block:eq('+(index-1)+')').removeClass("block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt block-palmtree block-sandstone block-sand block-wave");
		// 				$('.the-fucking-beach-map .block:eq('+(index-1)+')').addClass("block block-"+newtype);
		// 				$('.the-fucking-beach-map .block:eq('+(index-1)+')').attr("data-blocktype", newtype);						
		// 			} else {
		// 				//wave has reached the shore, create new wave at edge of map
		// 				//var rowremainder = (index-1) % globals.mapwidth;
		// 				var r = parseInt(Math.random() * globals.mapheight);
		// 				var newwaveposition = (r * globals.mapwidth) - 1;
		// 				var newtype = "wave";
		// 				$('.the-fucking-beach-map .block:eq('+newwaveposition+')').removeClass("block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt block-palmtree block-sandstone block-sand block-wave");
		// 				$('.the-fucking-beach-map .block:eq('+newwaveposition+')').addClass("block block-"+newtype);
		// 				$('.the-fucking-beach-map .block:eq('+newwaveposition+')').attr("data-blocktype", newtype);
		// 			}
		// 			newtype = 'water';
		// 			$('.the-fucking-beach-map .block:eq('+index+')').removeClass("block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt block-palmtree block-sandstone block-sand block-wave");
		// 			$('.the-fucking-beach-map .block:eq('+index+')').addClass("block block-"+newtype);
		// 			$('.the-fucking-beach-map .block:eq('+index+')').attr("data-blocktype", newtype);
		// 		}
		// 	});
		// 	wavesanimate = setTimeout(moveWaves, wavespeed); // repeat thought
		// };
	}
}

/*
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
	var playerdirection = blUtil.getObjectDirection(1, "player");
	var id = globals.uniqueObjectID();
	$('.the-fucking-forest-map').append('<div data-id='+id+' class=" the-fucking-frisbee objectId-'+id+' frisbee-direction-'+playerdirection+'"></div>');
	initProjectile("frisbee", startblock, direction, id);
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
					$('.the-fucking-beach-map .block:eq('+(index-1)+')').removeClass("block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt block-palmtree block-sandstone block-sand block-wave");
					$('.the-fucking-beach-map .block:eq('+(index-1)+')').addClass("block block-"+newtype);
					$('.the-fucking-beach-map .block:eq('+(index-1)+')').attr("data-blocktype", newtype);						
				} else {
					//wave has reached the shore, create new wave at edge of map
					//var rowremainder = (index-1) % globals.mapwidth;
					var r = parseInt(Math.random() * globals.mapheight);
					var newwaveposition = (r * globals.mapwidth) - 1;
					var newtype = "wave";
					$('.the-fucking-beach-map .block:eq('+newwaveposition+')').removeClass("block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt block-palmtree block-sandstone block-sand block-wave");
					$('.the-fucking-beach-map .block:eq('+newwaveposition+')').addClass("block block-"+newtype);
					$('.the-fucking-beach-map .block:eq('+newwaveposition+')').attr("data-blocktype", newtype);
				}
				newtype = 'water';
				$('.the-fucking-beach-map .block:eq('+index+')').removeClass("block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt block-palmtree block-sandstone block-sand block-wave");
				$('.the-fucking-beach-map .block:eq('+index+')').addClass("block block-"+newtype);
				$('.the-fucking-beach-map .block:eq('+index+')').attr("data-blocktype", newtype);
			}	
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

*/