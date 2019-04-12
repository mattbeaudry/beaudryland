import * as globals from './globals';

import { Utility } from './utility'; 
var blUtil = new Utility();

export class Signs {

	constructor() {

	}

	placeSign(objectid, block) {

		// var html = '<div class="speech-bubble">';
		// html    +=   '<form class="bubble-form" action="submit">';
		// html    +=     '<textarea class="bubble-text" rows="2" cols="30"></textarea>';
		// html    +=   '</form>';
		// html    += '</div>';
		// $('.objectid-'+objectid).append(html);

		var html = '<div class="bubble-wrap">';
					html += '<div class="bubble-link">';
			  			html += '<form class="bubble-form" action="#">';
			    			//html += '<input class="bubble-input" type="text" placeholder="Text">';
			    			html += '<textarea class="bubble-text bubble-input" rows="2" cols="30" placeholder="type message"></textarea>';
			    			html += '<input type="submit" value="Write Message" >';
			  			html += '</form>';
			  		html += '</div>';
			  	html += '<span class="bubble-hangdown-1"></span>';
			  	html += '<span class="bubble-hangdown-2"></span>';
			  	html += '<span class="bubble-hangdown-3"></span>';
			  	html += '<span class="bubble-hangdown-4"></span>';
			html += '</div>';

		$('.objectid-'+objectid).append(html);

		$('.bubble-form').submit(function(e) {

			var message = $('.bubble-text').val();

			//find block that the player is facing
			var id = 1;
			var direction = blUtil.getObjectDirection(id, "player");
			var block = blUtil.getObjectCurrentBlock(id);
			switch (direction) {
				case "up": block = block - (globals.mapwidth+1); break;
				case "down": block = block + (globals.mapwidth-1); break;
				case "left": block = block - 2; break;
				case "right": block = block; break;
			}
			
			$('.maps-wrap .block:eq('+block+')').attr("data-text", message);
			//$('.maps-wrap .block:eq('+block+')').remove();

			// console.log('write message to block #: ' + block);
			// console.log('write message: ' + message);

			$('.bubble-wrap').remove();
			globals.disablekeyboardevents = false;

			event.preventDefault();

		});

		globals.disablekeyboardevents = true;

		$('.bubble-text').focus();
	}

	readSign(block) {
		var message = $('.maps-wrap .block:eq('+block+')').attr("data-text");
		//alert(message);
		var html = '<div class="bubble-wrap">';
					html += '<div class="bubble-link">';
			  			html += '<form class="bubble-form" action="#">';
			  				html += '<h3>'+message+'</h3>';
			    			//html += '<input class="bubble-input" type="text" placeholder="Text">';
			    			//html += '<textarea class="bubble-text bubble-input" rows="2" cols="30" placeholder="type message"></textarea>';
			    			html += '<input type="submit" value="Okay!" >';
			  			html += '</form>';
			  		html += '</div>';
			  	html += '<span class="bubble-hangdown-1"></span>';
			  	html += '<span class="bubble-hangdown-2"></span>';
			  	html += '<span class="bubble-hangdown-3"></span>';
			  	html += '<span class="bubble-hangdown-4"></span>';
			html += '</div>';

		$('.objectid-'+1).append(html);

		$('.bubble-form').submit(function(e) {

			//var message = $('.bubble-text').val();

			//find block that the player is facing
			var id = 1;
			var direction = blUtil.getObjectDirection(id, "player");
			var block = blUtil.getObjectCurrentBlock(id);
			switch (direction) {
				case "up": block = block - (globals.mapwidth+1); break;
				case "down": block = block + (globals.mapwidth-1); break;
				case "left": block = block - 2; break;
				case "right": block = block; break;
			}
			
			$('.maps-wrap .block:eq('+block+')').attr("data-text", message);
			//$('.maps-wrap .block:eq('+block+')').remove();

			//// console.log('write message to block #: ' + block);
			//// console.log('write message: ' + message);

			$('.bubble-wrap').remove();

			event.preventDefault();

		});
	}

}