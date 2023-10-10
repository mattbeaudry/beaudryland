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

			// run every 10 seconds
			if ((count % 600) == 0) {
				
			}

			// run every second
			if ((count%60) == 0) {
				seconds++;
				console.log('time: '+seconds+'s');
				animateWaves(); 
			}

			// run every half second
			if ((count%30) == 0) {
				animateSpears();
				animateWaves();
			}

			// run every 200 miliseconds
			if ((count % 10) == 0) {
				
			}  

			// call loop again
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
				// stop animation if spear collides with something
				if (stillmoving == false) {
					$('.objectId-'+id).remove();
				}
			});
		};

		// waves
		var animateWaves = function() {
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
		};
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
*/