import * as globals from '../globals';
import { Utility } from '../utility';
var blUtil = new Utility();

export class Terrain {

	constructor() {

	}

	terrainCircle(w){
		var terrain = [
						-(2-w*2), 	-(3-w*2), 	-(4-w*2), 	-(5-w*2),
			-(1-w), 	-(2-w), 	-(3-w), 	-(4-w), 	-(5-w), 	-(6-w),
			-1, 		-2, 		-3, 		-4, 		-5, 		-6,
			-(1+w), 	-(2+w), 	-(3+w), 	-(4+w), 	-(5+w), 	-(6+w),
						-(2+w*2), 	-(3+w*2), 	-(4+w*2), 	-(5+w*2)
		];
		return terrain;
	}

	terrainLake(w){
		var terrain = [
						-(2-w*2), 	-(3-w*2), 	-(4-w*2), 	-(5-w*2),
			-(1-w), 	-(2-w), 	-(3-w), 	-(4-w), 	-(5-w), 	-(6-w),
			-1, 		-2, 		-3, 		-4, 		-5, 		-6,
			-(1+w), 	-(2+w), 	-(3+w), 	-(4+w), 	-(5+w), 	-(6+w),
						-(2+w*2), 	-(3+w*2), 	-(4+w*2), 	-(5+w*2)
		];
		return terrain;
	}

// river

// stream

// rock formation

// abandon ruins

// cabin

// castle

}