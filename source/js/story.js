import * as globals from './globals';

import { Utility } from './utility';
import { Map } from './map/map';

var blUtil = new Utility();
var blMap = new Map();

function isBlockOnEdgeOfCube(blockid) {
	if ((blockid) % globals.mapwidth === 0) {
		return true;
	}

	if ((blockid + 1) % globals.mapwidth === 0) {
		return true;
	}

	if (blockid < globals.mapwidth) {
		return true;
	}

	if (blockid > (globals.totalmapblocks - globals.mapwidth)) {
		return true;
	}

	return false;
}

function renderSignsOnMap(signText, map) {
	var previousSignBlockIds = [];

	console.log("renderSignsOnMap");
	console.log({signText});
	console.log({map})

	$.each(signText,function(index,value){
		let blockid = Math.floor((Math.random() * globals.totalmapblocks) + 1);
		let signAlreadyThere = previousSignBlockIds.includes(blockid);
		let invalidBlock = isBlockOnEdgeOfCube(blockid);

		while(invalidBlock || signAlreadyThere) {
			blockid = Math.floor((Math.random() * globals.totalmapblocks) + 1);
			signAlreadyThere = previousSignBlockIds.includes(blockid);
			invalidBlock = isBlockOnEdgeOfCube(blockid);
			// console.log({blockid});
			// console.log({invalidBlock});
			// console.log({signAlreadyThere});
		}
		
		blMap.changeBlockType(blockid, "sign", map);
		$('.the-fucking-'+map+'-map .block:eq('+blockid+')').attr("data-text", value);

		previousSignBlockIds.push(blockid);
	});
}

export class Story {
	createForestSigns() {
		console.log("createForestSigns");
		var forestSigns = [
			"You shall collect trees and rocks to create wood and other items.",
			"You shall build a shovel in order to find treasure.",
			"You shall build a guitar in order to unlock a new area."
		];
		renderSignsOnMap(forestSigns, "forest");
	}

	createWinterSigns() {
		console.log("createWinterSigns");
		var winterSigns = [
			"Dig to find gold and silver.",
			"Build and play the keyboard to unlock another map.",
			"Build and ride the bike for speedy transport."
		];
		renderSignsOnMap(winterSigns, "winter");
	}

	createBeachSigns() {
		var beachSigns = [
			"Build and play the trumpet to unlock another map.",
			"Beach Message 2",
			"Beach Message 3"
		];
		renderSignsOnMap(beachSigns, "beach");
	}

	createJungleSigns() {
		var jungleSigns = [
			"Build and play the instrument to unlock another map.",
			"Jungle Message 2",
			"Jungle Message 3"
		];
		renderSignsOnMap(jungleSigns, "jungle");
	}

	createDesertSigns() {
		var desertSigns = [
			"Build and play the instrument to unlock another map.",
			"Desert Message 2",
			"Desert Message 3"
		];
		renderSignsOnMap(desertSigns, "desert");
	}

	createIslandsSigns() {
		var islandSigns = [
			"Build and play the instrument to unlock another map.",
			"Island Message 2",
			"Island Message 3"
		];
		renderSignsOnMap(islandSigns, "island");
	}

	setupMapBorders(map) {
		// top
		for (var i=0; i<globals.mapwidth; i++) {
			blMap.changeBlockType(i, 'fence-metal', map);
		}
		// bottom
		for (var i=(globals.totalmapblocks-globals.mapwidth ); i<globals.totalmapblocks; i++) {
			blMap.changeBlockType(i, 'fence-metal', map);
		}
		// right+left
		for (var i=0; i<globals.totalmapblocks; i++) {
			if (i%globals.mapwidth == 0 || i%globals.mapwidth == (globals.mapwidth-1)) {
				blMap.changeBlockType(i, 'fence-metal', map);
			}
		}
	}

	demolishMapBorder(map, side) {
		var bgBlock;
		var totalBlocks = globals.totalmapblocks;
		var mapWidthBlocks = globals.mapwidth;

		switch(map) {
			case 'forest':
				bgBlock = 'grass';
				break;
			case 'winter':
				bgBlock = 'snow';
				break;
			case 'beach':
				bgBlock = 'sand';
				break;
			case 'jungle':
				bgBlock = 'pinetree';
				break;
			case 'desert':
				bgBlock = 'sand';
				break;
			case 'islands':
				bgBlock = 'water';
				break;
		}

		switch(side) {
			case 'right':
				for (var i=0; i<totalBlocks; i++) {
					if (i%mapWidthBlocks == mapWidthBlocks-1 
						&& i != mapWidthBlocks-1 
						&& i != totalBlocks-1) {
						blMap.changeBlockType(i, bgBlock, map);
					}
				}
				break;
			case 'left':
				for (var i=0; i<totalBlocks; i++) {
					if (i%mapWidthBlocks == 0
						&& i != 0
						&& i != totalBlocks-mapWidthBlocks) {
						blMap.changeBlockType(i, bgBlock, map);
					}
				}
				break;
			case 'top':
				for (var i=0; i<totalBlocks; i++) {
					if (i < mapWidthBlocks) {
						blMap.changeBlockType(i, bgBlock, map);
					}
				}
				break;
			case 'bottom':
				for (var i=0; i<totalBlocks; i++) {
					if (i > totalBlocks-mapWidthBlocks-1) {
						blMap.changeBlockType(i, bgBlock, map);
					}
				}
				break;
		}
	}

}