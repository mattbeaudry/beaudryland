import * as globals from './globals';

import { Utility } from './utility';
import { Map } from './map';

var blUtil = new Utility();
var blMap = new Map();

export class Story {

	constructor() {

	}

	createForestSigns() {
		blUtil.log("add forest sign clues");
		var forestSigns = [
			"You shall collect trees and rocks to create wood and other items.",
			"You shall build a shovel in order to find treasure.",
			"You shall build a guitar in order to unlock a new area."
		];
		$.each(forestSigns,function(index,value){
			var blockid = Math.floor((Math.random() * globals.totalmapblocks) + 1);
			blMap.changeBlockType(blockid,"sign");
			$('.the-fucking-forest-map .block:eq('+blockid+')').attr("data-text", value);
		});
	}

	createWinterSigns() {
		blUtil.log("add winter sign clues");
		 var winterSigns = [
		 	"Winter Message 1",
		 	"Winter Message 2",
		 	"Winter Message 3"
		 ];
		 $.each(winterSigns,function(index,value){
		 	var blockid = Math.floor((Math.random() * globals.totalmapblocks) + 1);
		 	blMap.changeBlockType(blockid,"sign","winter");
		 	$('.the-fucking-winter-map .block:eq('+blockid+')').attr("data-text", value);
		 });
	}

	createBeachSigns() {
		blUtil.log("add beach sign clues");
		var forestSigns = [
			"Beach Message 1",
			"Beach Message 2",
			"Beach Message 3"
		];
		$.each(forestSigns,function(index,value){
			var blockid = Math.floor((Math.random() * globals.totalmapblocks) + 1);
			blMap.changeBlockType(blockid,"sign","beach");
			$('.the-fucking-beach-map .block:eq('+blockid+')').attr("data-text", value);
		});
	}

	setupMapBorders(map) {
		blUtil.log('FENCES!!');
		//var mapClass = '.the-fucking-'+map+'-map';
		//$(mapClass+' .block:eq('+1+')').
		// top
		for (var i=0; i<globals.mapwidth; i++) {
			blMap.changeBlockType(i, 'fence-metal', map);
		}
		// bottom
		for (var i=(globals.totalmapblocks-globals.mapwidth); i<globals.totalmapblocks; i++) {
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
		blUtil.log('DEMOILISH FENCE: '+map+' + '+side);
		switch(side) {
			case 'right':
				for (var i=0; i<globals.totalmapblocks; i++) {
					if (i%globals.mapwidth == (globals.mapwidth-1)) {
						blMap.changeBlockType(i, 'grass', map);
					}
				}
				break;
			case 'left':
				for (var i=0; i<globals.totalmapblocks; i++) {
					if (i%globals.mapwidth == 0) {
						blMap.changeBlockType(i, 'tree', map);
					}
				}
				break;
			case 'up':
				for (var i=0; i<globals.totalmapblocks; i++) {
					if (i%globals.mapwidth == (globals.mapwidth-1)) {
						blMap.changeBlockType(i, 'grass', map);
					}
				}
				break;
			case 'down':
				for (var i=0; i<globals.totalmapblocks; i++) {
					if (i%globals.mapwidth == (globals.mapwidth-1)) {
						blMap.changeBlockType(i, 'grass', map);
					}
				}
				break;
		}
	}

}