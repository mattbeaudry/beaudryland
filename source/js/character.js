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
		var that = this;
		document.querySelector('#character-draw').addEventListener("click", function(event) {
			that.drawCharacter();
		});
	}

	drawCharacter() {
		// console.log("draw character");
		var characterCanvas = document.querySelector('#canvas-character .the-fucking-canvas');

		var facePixel = characterCanvas.querySelector('.canvas-pixel-8');
		var handPixel1 = characterCanvas.querySelector('.canvas-pixel-17');
		var handPixel2 = characterCanvas.querySelector('.canvas-pixel-19');
		var shirtPixel1 = characterCanvas.querySelector('.canvas-pixel-12');
		var shirtPixel2 = characterCanvas.querySelector('.canvas-pixel-13');
		var shirtPixel3 = characterCanvas.querySelector('.canvas-pixel-14');
		var shirtPixel4 = characterCanvas.querySelector('.canvas-pixel-18');
		var bootPixel1 = characterCanvas.querySelector('.canvas-pixel-22');
		var bootPixel2 = characterCanvas.querySelector('.canvas-pixel-24');
		var hairPixel1 = characterCanvas.querySelector('.canvas-pixel-2');
		var hairPixel2 = characterCanvas.querySelector('.canvas-pixel-3');
		var hairPixel3 = characterCanvas.querySelector('.canvas-pixel-6');
		var hairPixel4 = characterCanvas.querySelector('.canvas-pixel-7');

		var shirtColor = document.querySelector('#character-shirt-color .bui-colorpicker-input').value;
		var shoeColor = document.querySelector('#character-shoe-color .bui-colorpicker-input').value;
		var skinColor = document.querySelector('#character-skin-color .bui-colorpicker-input').value;
		var hairColor = document.querySelector('#character-hair-color .bui-colorpicker-input').value;
		var hairStyle = document.querySelector('#character-hair-style .bui-select select').value;

		facePixel.style.backgroundColor = skinColor;
		handPixel1.style.backgroundColor = skinColor;
		handPixel2.style.backgroundColor = skinColor;

		shirtPixel1.style.backgroundColor = shirtColor;
		shirtPixel2.style.backgroundColor = shirtColor;
		shirtPixel3.style.backgroundColor = shirtColor;
		shirtPixel4.style.backgroundColor = shirtColor;

		bootPixel1.style.backgroundColor = shoeColor;
		bootPixel2.style.backgroundColor = shoeColor;

		// console.log("hair:"+hairStyle);

		if (hairStyle == 'medium') {
			hairPixel1.style.backgroundColor = hairColor;
			hairPixel2.style.backgroundColor = hairColor;
			hairPixel4.style.backgroundColor = hairColor;
		} else if (hairStyle == 'long') {
			hairPixel1.style.backgroundColor = hairColor;
			hairPixel2.style.backgroundColor = hairColor;
			hairPixel3.style.backgroundColor = hairColor;
			hairPixel4.style.backgroundColor = hairColor;
		}

	}

}