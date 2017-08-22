import * as globals from './globals';

import { Utility } from './utility';
var blUtil = new Utility();

export class Cube {

	constructor() {

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

	rotateCubeTo(side) {
		$('.cube').removeClass(function (index, className) {
			return (className.match (/(^|\s)cube-show-\S+/g) || []).join(' ');
		});
		$('.cube').addClass('cube-show-'+side);
		globals.currentCubeSide = side;
	}

}