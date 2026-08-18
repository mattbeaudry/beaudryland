import * as globals from './globals';

import { Utility } from './utility'; 
var blUtil = new Utility();

export class Signs {

	constructor() {

	}

	placeSign(objectId, map) {

		// var html = '<div class="speech-bubble">';
		// html    +=   '<form class="bubble-form" action="submit">';
		// html    +=     '<textarea class="bubble-text" rows="2" cols="30"></textarea>';
		// html    +=   '</form>';
		// html    += '</div>';
		// $('.objectId-'+objectId).append(html);

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

		document.querySelector('.objectId-'+objectId).insertAdjacentHTML('beforeend', html);

		document.querySelector('.bubble-form').addEventListener('submit', function(e) {

			var message = document.querySelector('.bubble-text').value;

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

			var blockEl = document.querySelectorAll('.the-fucking-'+map+'-map .block')[block];
			if (blockEl) blockEl.setAttribute("data-text", message);
			//$('.maps-wrap .block:eq('+block+')').remove();

			// console.log('write message to block #: ' + block);
			// console.log('write message: ' + message);

			var bubbleWrap = document.querySelector('.bubble-wrap');
			if (bubbleWrap) bubbleWrap.remove();
			globals.disablekeyboardevents = false;

			e.preventDefault();

		});

		globals.disablekeyboardevents = true;

		document.querySelector('.bubble-text').focus();
	}

	readSign(block, map) {
		console.log("readSign");
		console.log({block});
		console.log({map});

		var blockEl = document.querySelectorAll('.the-fucking-'+map+'-map .block')[block];
		var message = blockEl ? blockEl.getAttribute("data-text") : '';
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

		document.querySelector('.objectId-1').insertAdjacentHTML('beforeend', html);

		document.querySelector('.bubble-form').addEventListener('submit', function(e) {

			//var message = document.querySelector('.bubble-text').value;

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

			var signBlockEl = document.querySelectorAll('.the-fucking-'+map+'-map .block')[block];
			if (signBlockEl) signBlockEl.setAttribute("data-text", message);
			//$('.maps-wrap .block:eq('+block+')').remove();

			//// console.log('write message to block #: ' + block);
			//// console.log('write message: ' + message);

			var bubbleWrap = document.querySelector('.bubble-wrap');
			if (bubbleWrap) bubbleWrap.remove();

			e.preventDefault();

		});
	}

}