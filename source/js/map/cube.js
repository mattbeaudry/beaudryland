import * as globals from '../globals';

import { Utility } from '../utility';
var blUtil = new Utility();

export class Cube {
	constructor() {
		this.currentRotation = { x: 0, y: 0, z: 0 };
	}

	cubifyMap() {
		document.querySelector('.maps-container').classList.add('cube-container');
		document.querySelector('.maps-wrap').classList.add('cube', 'cube-show-front');
		[...document.querySelectorAll('.maps-wrap > div')].forEach(function (el, index) {
			switch (index) {
				case 0:
					el.classList.add('cube-side', 'side-front');
					break;
				case 1:
					el.classList.add('cube-side', 'side-right');
					break;
				case 2:
					el.classList.add('cube-side', 'side-back');
					break;
				case 3:
					el.classList.add('cube-side', 'side-left');
					break;
				case 4:
					el.classList.add('cube-side', 'side-top');
					break;
				case 5:
					el.classList.add('cube-side', 'side-bottom');
					break;
			}
		});
	}

	decubifyMap() {
		document.querySelector('.maps-container').classList.remove('cube-container');
		var mapsWrap = document.querySelector('.maps-wrap');
		mapsWrap.classList.remove('cube');
		mapsWrap.className = mapsWrap.className.replace(/(^|\s)cube-show-\S+/g, ' ').trim();
		[...document.querySelectorAll('.maps-wrap > div')].forEach(function (el) {
			el.className = el.className.replace(/(^|\s)cube-\S+/g, ' ').trim();
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
		console.log('rotate cube to ' + side);
		const currentCubeSide = globals.getCurrentCubeSide();
		console.log('moving from ' + currentCubeSide + ' to ' + side);
		const rotationCSS = this.calculateRotation(currentCubeSide, side);
		console.log({ rotationCSS });

		document.querySelector('.maps-wrap').style.transform = rotationCSS;

		globals.setCurrentCubeSide(side);
	}
}
