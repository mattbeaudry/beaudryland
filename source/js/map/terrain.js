import * as globals from '../globals';

// export var rocketFidfghdfghrstFlight = true;

// export const dfghdfgh = 'beaudryland';

// export const hdfghdfgh = new Array (
// 	"grass", "dirt", "water", "tree", "rock", "hole",
// 	"snow", "frozendirt", "ice", "pinetree", "icerock", "snowhole"
// );

var w = globals.mapwidth;

console.log("MAPMAPMAP WIODTHHHHHHHHH:"+w);

export const terrain_circle = [
				-(2-w*2), 	-(3-w*2), 	-(4-w*2), 	-(5-w*2),
	-(1-w), 	-(2-w), 	-(3-w), 	-(4-w), 	-(5-w), 	-(6-w),
	-1, 		-2, 		-3, 		-4, 		-5, 		-6,
	-(1+w), 	-(2+w), 	-(3+w), 	-(4+w), 	-(5+w), 	-(6+w),
				-(2+w*2), 	-(3+w*2), 	-(4+w*2), 	-(5+w*2)
];

export const terrain_lake = [
				-(2-w*2), 	-(3-w*2), 	-(4-w*2), 	-(5-w*2),
	-(1-w), 	-(2-w), 	-(3-w), 	-(4-w), 	-(5-w), 	-(6-w),
	-1, 		-2, 		-3, 		-4, 		-5, 		-6,
	-(1+w), 	-(2+w), 	-(3+w), 	-(4+w), 	-(5+w), 	-(6+w),
				-(2+w*2), 	-(3+w*2), 	-(4+w*2), 	-(5+w*2)
];

// river

// stream

// rock formation

// abandon ruins

// cabin

// castle

// 