import * as globals from './globals';

import { Utility } from './utility'; 
import { HCI } from './hci'; 
import { Cube } from './cube'; 
import { Enemy } from './enemy'; 
import { Animal } from './animal'; 
import { Movement } from './movement'; 

var blUtil = new Utility();
var blHCI = new HCI();
var blCube = new Cube();
var blEnemy = new Enemy();
var blAnimal = new Animal();
var blMovement = new Movement();

export class Dev {

	constructor() {

	}

	loadDevConsole() {

		blUtil.log("load dev console");

		var consoleItems = [
			{
				text: 'Create Enemy',
				function_name: 'blEnemy.createEnemy'
			},
			{
				text: 'Kill Enemy',
				function_name: 'blEnemy.killEnemy'
			},
			{
				text: 'Create Animal',
				function_name: 'blAnimal.createAnimal'
			},
			{
				text: 'Kill Animal',
				function_name: 'blAnimal.killAnimal'
			},
			{
				text: 'Get All Items',
				function_name: 'blDev.getAllItems'
			},
			{
				text: 'Night Time',
				function_name: 'this.nightTime'
			},
			{
				text: 'Light up Player',
				function_name: 'this.lightUpBlock'
			},
			// {
			// 	text: 'Start Skiing',
			// 	function_name: 'moveMap'
			// },
			// {
			// 	text: 'Stop Skiing',
			// 	function_name: 'stopMap'
			// },
			{
				text: 'Rotate Cube to Front',
				function_name: 'blCube.rotateCubeTo',
				function_val: 'front'
			},
			{
				text: 'Rotate Cube to Right',
				function_name: 'blCube.rotateCubeTo',
				function_val: 'right'
			},
			{
				text: 'Rotate Cube to Back',
				function_name: 'blCube.rotateCubeTo',
				function_val: 'back'
			},
			{
				text: 'Rotate Cube to Left',
				function_name: 'blCube.rotateCubeTo',
				function_val: 'left'
			},
			{
				text: 'Rotate Cube to Bottom',
				function_name: 'blCube.rotateCubeTo',
				function_val: 'bottom'
			},
			{
				text: 'Rotate Cube to Top',
				function_name: 'blCube.rotateCubeTo',
				function_val: 'top'
			},
			{
				text: 'Cubify Map',
				function_name: 'blCube.cubifyMap'
			},
			{
				text: 'Decubify Map',
				function_name: 'blCube.decubifyMap'
			},
			{
				text: 'Move Object To Map',
				function_name: 'blMovement.moveObjectToMap'
			}

		];

		var html = '';
		var devconsole = $('.dev-console');

		$.each(consoleItems, function(index, value) {
			var container = $('<li />');
			var function_name = '';
			if (value.function_val) {
				function_name = value.function_name + '("' + value.function_val + '")';
			} else {
				function_name = value.function_name + '()';
			}
			container.append('<a href="javascript:void(0);">'+value.text+'</a>');
			container.on("click", function() {
				eval(function_name);
			});
		 	console.log(function_name);
			devconsole.append(container);
		});

	}

	getAllItems() {
		var inventoryhtml = '';
		$.each(globals.blocktypes, function(index, value) {
			if ( 	
				value != "diamond-hole" && value != "gold-hole" && value != "silver-hole" && value != "oil-hole" &&
			 	value != "clay-hole" && value != "carrot-inground" 
			) {
				inventoryhtml += '<div class="slot-'+index+' block block-'+value+' ';
				if(index==0) { inventoryhtml += 'selected-item'; }
				inventoryhtml += '" data-blocktype="'+value+'">99</div>';
			}
		});
		$('.the-fucking-inventory').html(inventoryhtml);
		$('.the-fucking-inventory').show();
		blHCI.setupMouseEvents();

		/*for 
		'<div class="slot-1 empty selected-item" data-blocktype="empty">0</div>'
		'<div class="slot-2 empty" data-blocktype="empty">0</div>''*/
	}

	changeOverlayBlockOpacity(block, opacity) {
		//blUtil.log("8-changing block "+block+" to "+newtype);
		$('.the-fucking-map-overlay .block:eq('+block+')').css("opacity",opacity);
	}

	nightTime() {
		console.log("night time");
		// MAP OVERLAY
	    var overlayhtml = "";
	    for (var f = 0; f <= (globals.totalmapblocks - 1); f++) {
			overlayhtml += '<div data-overlayblockid="'+f+'" class="block block-dark"></div>';
		}
		$('.the-fucking-map-overlay').fadeIn();
		$('.the-fucking-map-overlay').append(overlayhtml);

		globals.isnightime = true;

		setTimeout(
			function() {
				morningTime();
			}, 
		10000);
	}

	//end night time e.g. morning
	morningTime() {
		$('.the-fucking-map-overlay').empty();
		globals.isnightime = false;
	}

	clearLighting() {
		$('.the-fucking-map-overlay .block-dark').css("opacity",1);
	}

	lightUpBlock() {

		console.log ("the light!");

		//var randomblockid = Math.floor((Math.random() * globals.totalmapblocks) + 1);
		var playerblockid = blUtil.getObjectCurrentBlock("1") - 1;
		var value = 0;

		this.changeOverlayBlockOpacity(playerblockid, value);

		// layer 1 of pixels surrounding lightsource
		this.changeOverlayBlockOpacity(playerblockid-1, value);
		this.changeOverlayBlockOpacity(playerblockid+1, value);
		this.changeOverlayBlockOpacity(playerblockid-globals.mapwidth, value);
		this.changeOverlayBlockOpacity(playerblockid+globals.mapwidth, value);

		// layer 2 of pixels surrounding lightsource
		this.changeOverlayBlockOpacity(playerblockid-2, 0.2);
		this.changeOverlayBlockOpacity(playerblockid+2, 0.2);
		this.changeOverlayBlockOpacity(playerblockid-globals.mapwidth-1, 0.2);
		this.changeOverlayBlockOpacity(playerblockid-globals.mapwidth+1, 0.2);
		this.changeOverlayBlockOpacity(playerblockid+globals.mapwidth-1, 0.2);
		this.changeOverlayBlockOpacity(playerblockid+globals.mapwidth+1, 0.2);
		this.changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2), 0.2);
		this.changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2), 0.2);

		// layer 2 of pixels surrounding lightsource
		this.changeOverlayBlockOpacity(playerblockid-3, 0.4);
		this.changeOverlayBlockOpacity(playerblockid+3, 0.4);
		this.changeOverlayBlockOpacity(playerblockid-globals.mapwidth-2, 0.4);
		this.changeOverlayBlockOpacity(playerblockid-globals.mapwidth+2, 0.4);
		this.changeOverlayBlockOpacity(playerblockid+globals.mapwidth-2, 0.4);
		this.changeOverlayBlockOpacity(playerblockid+globals.mapwidth+2, 0.4);
		this.changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2)+1, 0.4);
		this.changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2)-1, 0.4);
		this.changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2)+1, 0.4);
		this.changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2)-1, 0.4);
		this.changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*3), 0.4);
		this.changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*3), 0.4);

		// layer 3 of pixels surrounding lightsource
		this.changeOverlayBlockOpacity(playerblockid-4, 0.6);
		this.changeOverlayBlockOpacity(playerblockid+4, 0.6);
		this.changeOverlayBlockOpacity(playerblockid-globals.mapwidth-3, 0.6);
		this.changeOverlayBlockOpacity(playerblockid-globals.mapwidth+3, 0.6);
		this.changeOverlayBlockOpacity(playerblockid+globals.mapwidth-3, 0.6);
		this.changeOverlayBlockOpacity(playerblockid+globals.mapwidth+3, 0.6);
		this.changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2)+2, 0.6);
		this.changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2)-2, 0.6);
		this.changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2)+2, 0.6);
		this.changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2)-2, 0.6);
		this.changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*3)+1, 0.6);
		this.changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*3)-1, 0.6);
		this.changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*3)+1, 0.6);
		this.changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*3)-1, 0.6);
		this.changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*4), 0.6);
		this.changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*4), 0.6);

		// layer 4 of pixels surrounding lightsource
		this.changeOverlayBlockOpacity(playerblockid-4, 0.8);
		this.changeOverlayBlockOpacity(playerblockid+4, 0.8);
		this.changeOverlayBlockOpacity(playerblockid-globals.mapwidth-3, 0.8);
		this.changeOverlayBlockOpacity(playerblockid-globals.mapwidth+3, 0.8);
		this.changeOverlayBlockOpacity(playerblockid+globals.mapwidth-3, 0.8);
		this.changeOverlayBlockOpacity(playerblockid+globals.mapwidth+3, 0.8);
		this.changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2)+2, 0.8);
		this.changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*2)-2, 0.8);
		this.changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2)+2, 0.8);
		this.changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*2)-2, 0.8);
		this.changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*3)+1, 0.8);
		this.changeOverlayBlockOpacity(playerblockid+(globals.mapwidth*3)-1, 0.8);
		this.changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*3)+1, 0.8);
		this.changeOverlayBlockOpacity(playerblockid-(globals.mapwidth*3)-1, 0.8);

	}


}