import * as globals from './globals';
import { Utility } from './utility';
var blUtil = new Utility();
import { Map } from './map';
var beaudrylandMap = new Map();

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
			beaudrylandMap.changeBlockType(blockid,"sign");
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
		 	beaudrylandMap.changeBlockType(blockid,"sign","winter");
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
			beaudrylandMap.changeBlockType(blockid,"sign","beach");
			$('.the-fucking-beach-map .block:eq('+blockid+')').attr("data-text", value);
		});
	}

}