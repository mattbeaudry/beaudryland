import * as globals from '../globals';

import { Utility } from '../utility';
var blUtil = new Utility();

export class Cube {

	constructor() {
		this.currentRotation = { x: 0, y: 0, z: 0 };
	}

	cubifyMap() {
		$('.maps-container').addClass('cube-container');
		$('.maps-wrap').addClass('cube cube-show-front');
		$('.maps-wrap > div').each(
			function(index) {
				switch (index) {
					case 0: $(this).addClass("cube-side side-front"); break;
					case 1: $(this).addClass("cube-side side-right"); break;
					case 2: $(this).addClass("cube-side side-back"); break;
					case 3: $(this).addClass("cube-side side-left"); break;
					case 4: $(this).addClass("cube-side side-top"); break;
					case 5: $(this).addClass("cube-side side-bottom"); break;
				}
			}
		);
	}

	decubifyMap() {
		$('.maps-container').removeClass('cube-container');
		$('.maps-wrap').removeClass('cube');
		$('.maps-wrap').removeClass(function (index, className) {
			return (className.match (/(^|\s)cube-show-\S+/g) || []).join(' ');
		});
		$('.maps-wrap > div').removeClass(function (index, className) {
			return (className.match (/(^|\s)cube-\S+/g) || []).join(' ');
		});
	}

	calculateRotation(currentSide, targetSide) {
		const rotationValues = {
			front: { x: 0, y: 0, z: 0 },
			back: { x: 0, y: 180, z: 0 },
			left: { x: 0, y: 90, z: 0 },
			right: { x: 0, y: -90, z: 0 },
			top: { x: -90, y: 0, z: 0 },
			bottom: { x: 90, y: 0, z: 0 },
		};
		const rotation = rotationValues[targetSide];
		this.currentRotation = rotation;
		const rotationString = `translateZ(-100px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;
		return rotationString;
	}
	  
	rotateCubeTo(side) {
		console.log("rotate cube to "+side);
		const currentCubeSide = globals.getCurrentCubeSide();
		console.log('moving from '+currentCubeSide+' to '+side);
		const rotationCSS = this.calculateRotation(currentCubeSide, side);
		console.log({rotationCSS});

		$('.maps-wrap').css('transform', rotationCSS);
		
		globals.setCurrentCubeSide(side);
	}
}
