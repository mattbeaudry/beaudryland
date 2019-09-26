import * as globals from '../globals';
import { Utility } from '../utility';
var blUtil = new Utility();

// BLOCK CODES
// - = transparent 
// W = wood
// F = fire
// D = door

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

	terrainSquare(w){
		var terrain = [
			-(1-w*2),	-(2-w*2), 	-(3-w*2), 	-(4-w*2), 	-(5-w*2),	-(6-w*2),
			-(1-w), 	-(2-w), 	-(3-w), 	-(4-w), 	-(5-w), 	-(6-w),
			-1, 		-2, 		-3, 		-4, 		-5, 		-6,
			-(1+w), 	-(2+w), 	-(3+w), 	-(4+w), 	-(5+w), 	-(6+w),
			-(1+w*2),	-(2+w*2), 	-(3+w*2), 	-(4+w*2), 	-(5+w*2), 	-(6+w*2)
		];
		return terrain;
	}

	terrainSquareLarge(w){
		var terrain = [
			-(1-w*5),	-(2-w*5), 	-(3-w*5), 	-(4-w*5), 	-(5-w*5),	-(6-w*5),
			-(1-w*4),	-(2-w*4), 	-(3-w*4), 	-(4-w*4), 	-(5-w*4),	-(6-w*4),
			-(1-w*3),	-(2-w*3), 	-(3-w*3), 	-(4-w*3), 	-(5-w*3),	-(6-w*3),
			-(1-w*2),	-(2-w*2), 	-(3-w*2), 	-(4-w*2), 	-(5-w*2),	-(6-w*2),
			-(1-w), 	-(2-w), 	-(3-w), 	-(4-w), 	-(5-w), 	-(6-w),
			-1, 		-2, 		-3, 		-4, 		-5, 		-6,
			-(1+w), 	-(2+w), 	-(3+w), 	-(4+w), 	-(5+w), 	-(6+w),
			-(1+w*2),	-(2+w*2), 	-(3+w*2), 	-(4+w*2), 	-(5+w*2), 	-(6+w*2),
			-(1+w*3),	-(2+w*3), 	-(3+w*3), 	-(4+w*3), 	-(5+w*3), 	-(6+w*3),
			-(1+w*4),	-(2+w*4), 	-(3+w*4), 	-(4+w*4), 	-(5+w*4), 	-(6+w*4),
			-(1+w*5),	-(2+w*5), 	-(3+w*5), 	-(4+w*5), 	-(5+w*5), 	-(6+w*5)
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

	terrainRiverX(w){
		var terrain = [
					 			 	-(3-w), 	-(4-w),
				 		-2, 		-3, 		-4, 		-5,
					 	-(2+w), 			 	-(4+w), 	-(5+w), 	-(6+w),
			-(1+w*2),
		];
		return terrain;
	}

	terrainRiverY(w){
		var terrain = [
						 	-(3-w*5), 	-(4-w*5),
							-(3-w*4), 	-(4-w*4),
									 	-(4-w*3),
									 	-(4-w*2),
			 			 	-(3-w), 	-(4-w),
			 		 		-3, 		-4,
			 				-(3+w),
				-(2+w*2),
				-(2+w*3), 	-(3+w*3),
						 	-(3+w*4),
							-(3+w*5),
		];
		return terrain;
	}

	terrainRockFormation(w){
		
	}

	terrainAbandonedRuins(w){
		
	}

	terrainCabin(w){
		var terrain = [
			'W', 'D', 'W', 'W', 'W',
			'W', '-', '-', '-', 'W', 
			'W', '-', '-', '-', 'W', 
			'W', '-', '-', 'F', 'W', 
			'W', '-', '-', '-', 'W',
			'W', 'W', 'D', 'W', 'W'
		];
		return terrain;
	}

	terrainCastle(w){
		
	}

}