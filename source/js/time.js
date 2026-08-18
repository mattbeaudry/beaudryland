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
				//animateWaves();
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

			[...document.querySelectorAll('.the-fucking-spear')].forEach(function(el) {
				var direction = el.getAttribute("data-direction");
				var id = el.getAttribute("data-id");
				var stillmoving;
				switch (direction) {
					case "up": stillmoving = blMovement.moveObject("up", id, "spear"); break;
					case "down": stillmoving = blMovement.moveObject("down", id, "spear"); break;
					case "left": stillmoving = blMovement.moveObject("left", id, "spear"); break;
					case "right": stillmoving = blMovement.moveObject("right", id, "spear"); break;
				}
				// stop animation if spear collides with something
				if (stillmoving == false) {
					var objEl = document.querySelector('.objectId-'+id);
					if (objEl) objEl.remove();
				}
			});
		};

		var waveBlockClasses = "block-grass block-rock block-dirt block-fire block-water block-tree block-hole block-wood block-door-closed block-door-open block-diamond-hole block-diamond block-gold-hole block-gold block-pinetree block-icerock block-ice block-snow block-snowhole block-frozendirt block-palmtree block-sandstone block-sand block-wave";

		// waves
		var animateWaves = function() {
			var islandsBlocks = document.querySelectorAll('.the-fucking-islands-map .block');
			[...islandsBlocks].forEach(function(el, index) {
				if (el.classList.contains('block-wave')) {
					var prevEl = islandsBlocks[index-1];
					if (prevEl && prevEl.classList.contains('block-water')) {
						//wave has not reached the shore yet
						var newtype = 'wave';
						prevEl.className = prevEl.className.replace(new RegExp('\\b(' + waveBlockClasses.trim().split(' ').join('|') + ')\\b', 'g'), '').trim();
						prevEl.classList.add("block", "block-"+newtype);
						prevEl.setAttribute("data-blocktype", newtype);
					} else {
						//wave has reached the shore, create new wave at edge of map
						var r = parseInt(Math.random() * globals.mapheight);
						var newwaveposition = (r * globals.mapwidth) - 1;
						var newtype = "wave";
						var newWaveEl = islandsBlocks[newwaveposition];
						if (newWaveEl) {
							newWaveEl.className = newWaveEl.className.replace(new RegExp('\\b(' + waveBlockClasses.trim().split(' ').join('|') + ')\\b', 'g'), '').trim();
							newWaveEl.classList.add("block", "block-"+newtype);
							newWaveEl.setAttribute("data-blocktype", newtype);
						}
					}
					var newtype = 'water';
					el.className = el.className.replace(new RegExp('\\b(' + waveBlockClasses.trim().split(' ').join('|') + ')\\b', 'g'), '').trim();
					el.classList.add("block", "block-"+newtype);
					el.setAttribute("data-blocktype", newtype);
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