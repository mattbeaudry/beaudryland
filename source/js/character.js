import * as globals from './globals';
import { Utility } from './utility'; 
var blUtil = new Utility();

export class Character {

	constructor() {

	}

	setupCharacterBuilder() {
		// $('.character-hair-style').on("change", { yo: this }, function(event) {
		// 	var data = event.data;m,ju 
		// 	event.data.yo.drawCharacter();
		// });
		$('#character-draw').on("click", { that: this }, function(event) {
			var data = event.data;
			event.data.that.drawCharacter();
		});
	}

	drawCharacter() {
		console.log("draw character");
		var characterCanvas = $('#canvas-character .the-fucking-canvas');

		var facePixel = characterCanvas.children('.canvas-pixel-8');
		var handPixel1 = characterCanvas.children('.canvas-pixel-17');
		var handPixel2 = characterCanvas.children('.canvas-pixel-19');
		var shirtPixel1 = characterCanvas.children('.canvas-pixel-12');
		var shirtPixel2 = characterCanvas.children('.canvas-pixel-13');
		var shirtPixel3 = characterCanvas.children('.canvas-pixel-14');
		var shirtPixel4 = characterCanvas.children('.canvas-pixel-18');
		var bootPixel1 = characterCanvas.children('.canvas-pixel-22');
		var bootPixel2 = characterCanvas.children('.canvas-pixel-24');
		var hairPixel1 = characterCanvas.children('.canvas-pixel-2');
		var hairPixel2 = characterCanvas.children('.canvas-pixel-3');
		var hairPixel3 = characterCanvas.children('.canvas-pixel-6');
		var hairPixel4 = characterCanvas.children('.canvas-pixel-7');

		var shirtColor = $('#character-shirt-color .bui-colorpicker-input').val();
		var shoeColor = $('#character-shoe-color .bui-colorpicker-input').val();
		var skinColor = $('#character-skin-color .bui-colorpicker-input').val();
		var hairColor = $('#character-hair-color .bui-colorpicker-input').val();
		var hairStyle = $('#character-hair-style .bui-select select').val();

		facePixel.css('backgroundColor', skinColor);
		handPixel1.css('backgroundColor', skinColor);
		handPixel2.css('backgroundColor', skinColor);

		shirtPixel1.css('backgroundColor', shirtColor);
		shirtPixel2.css('backgroundColor', shirtColor);
		shirtPixel3.css('backgroundColor', shirtColor);
		shirtPixel4.css('backgroundColor', shirtColor);

		bootPixel1.css('backgroundColor', shoeColor);
		bootPixel2.css('backgroundColor', shoeColor);

		console.log("hair:"+hairStyle);

		if (hairStyle == 'medium') {
			hairPixel1.css('backgroundColor', hairColor);
			hairPixel2.css('backgroundColor', hairColor);
			hairPixel4.css('backgroundColor', hairColor);
		} else if (hairStyle == 'long') {
			hairPixel1.css('backgroundColor', hairColor);
			hairPixel2.css('backgroundColor', hairColor);
			hairPixel3.css('backgroundColor', hairColor);
			hairPixel4.css('backgroundColor', hairColor);
		}

	}

}