import * as globals from './globals';
import { Utility } from './utility';
import { Movement } from './movement';
var blUtil = new Utility();
var blMovement = new Movement();

export class Time {

	constructor() {

	}

	startTime () {
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
				console.log('time since game started: '+seconds+' seconds');
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

	}

	
	
}