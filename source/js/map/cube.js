import * as globals from '../globals';

import { Utility } from '../utility';
var blUtil = new Utility();

export class Cube {

	constructor() {
		this.currentRotation = { x: 0, y: 0 };
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
		// Define the rotation values for each side and their corresponding rotations
		const rotationValues = {
		  front: {
			left: { x: 0, y: 90 },
			right: { x: 0, y: -90 },
			top: { x: -90, y: 0 },
			bottom: { x: 90, y: 0 },
		  },
		  left: {
			back: { x: 0, y: 90 },
			front: { x: 0, y: -90 },
			top: { x: -90, y: 0 },
			bottom: { x: 90, y: 0 },
		  },
		  back: {
			left: { x: 0, y: -90 },
			right: { x: 0, y: 90 },
			top: { x: -90, y: 0 },
			bottom: { x: 90, y: 0 },
		  },
		  right: {
			back: { x: 0, y: -90 },
			front: { x: 0, y: 90 },
			top: { x: -90, y: 0 },
			bottom: { x: 90, y: 0 },
		  },
		  top: {
			left: { x: 0, y: 0, z: 90 },
			right: { x: 0, y: 0, z: -90 },
			front: { x: 90, y: 0 },
			back: { x: -90, y: 0 },
		  },
		  bottom: {
			left: { x: 0, y: 0, z: -90 },
			right: { x: 0, y: 0, z: 90 },
			front: { x: -90, y: 0 },
			back: { x: 90, y: 0 },
		  },
		};
	  
		const currentRotation = this.currentRotation;
		const rotationChange = rotationValues[currentSide][targetSide];
		const rotation = { x: currentRotation.x + rotationChange.x, y: currentRotation.y + rotationChange.y };
		this.currentRotation = rotation;

		const rotationString = `translateZ(-100px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
		return rotationString;
	}
	  
	rotateCubeTo(side) {
		console.log("rotateCubeTo");
		const currentCube = globals.getCurrentCubeSide();
		console.log('moving from '+currentCube+' to '+side);
		const rotationCSS = this.calculateRotation(currentCube, side);
		console.log({rotationCSS});

		$('.maps-wrap').css('transform', rotationCSS);
		
		globals.setCurrentCubeSide(side);
	}

}

// const cubeRotations = {
// 	front: {
// 		left: 0,
// 		right: 0,
// 		top: 0,
// 		bottom: 0,
// 	},
// 	left: {
// 		back: 0,
// 		front: 0,
// 		top: 0,
// 		bottom: 0,
// 	},
// 	back: {
// 		right: 0,
// 		left: 0,
// 		top: 0,
// 		bottom: 0,
// 	},
// 	right: {
// 		front: 0,
// 		back: 0,
// 		top: 0,
// 		bottom: 0,
// 	},
// 	top: {
// 		left: 0,
// 		right: 0,


// 	}

// }

// .cube-show-front {
// 	transform: translateZ(-$mapWidthPX) rotateY(0deg);
//   }
  
//   .cube-show-right {
// 	transform: translateZ(-$mapWidthPX) rotateY(-90deg);
//   }
  
//   .cube-show-back {
// 	transform: translateZ(-$mapWidthPX) rotateY(-180deg);
//   }
  
//   .cube-show-left {
// 	transform: translateZ(-$mapWidthPX) rotateY(-270deg);
//   }
  
//   .cube-show-top {
// 	transform: translateZ(-$mapWidthPX) rotateX(-90deg);
//   }
  
//   .cube-show-bottom {
// 	transform: translateZ(-$mapWidthPX) rotateX(90deg);
//   }