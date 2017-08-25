import * as globals from './globals';

import { Utility } from './utility'; 
import { Player } from './player'; 
import { Movement } from './movement'; 
import { Map } from './map';
import { Action } from './action'; 
import { Inventory } from './inventory'; 

var blUtil = new Utility();
var blPlayer = new Player();
var blMovement = new Movement();
var blMap = new Map();
var blAction = new Action();
var blInventory = new Inventory();

export class HCI {

	constructor() {

	}

	setupKeyboardEvents() {
		blUtil.log("Keyboard Events");
		window.addEventListener('keydown', function(event) {
			var selecteditem = blUtil.getSelectedItem();
			switch (event.keyCode) {
				case 37: /* LEFT ARROW */
					if (globals.disablekeyboardevents == false) {
						if (selecteditem == "guitar") { playSound(880); }
						else if (selecteditem == "piano") { playPiano(880); }
						else if (selecteditem == "drumsticks") { playDrums(880); }
						else if (selecteditem == "bike") { rideBike("left"); }
						else if (selecteditem == "skiis") { rideSkiis("left"); }
						else { blMovement.moveObject("left", 1, "player"); }
					}
					break;
				case 38: /* UP ARROW */
					if (globals.disablekeyboardevents == false) {
						if (selecteditem == "guitar") { playSound(1320); } 
						else if (selecteditem == "piano") { playPiano(1320); } 
						else if (selecteditem == "drumsticks") { playDrums(1320); }
						else if (selecteditem == "bike") { rideBike("up"); } 
						else if (selecteditem == "skiis") { rideSkiis("up"); }
						else { blMovement.moveObject("up", 1, "player"); }
					}
					break;
				case 39: /* RIGHT ARROW */
					if (globals.disablekeyboardevents == false) {
						if (selecteditem == "guitar") { playSound(1100); }
						else if (selecteditem == "piano") { playPiano(1100); }
						else if (selecteditem == "drumsticks") { playDrums(1100); }
						else if (selecteditem == "bike") { rideBike("right"); }
						else if (selecteditem == "skiis") { rideSkiis("right"); }
						else { 
							blUtil.log("Call move player"); 
							blMovement.moveObject("right", 1, "player"); 
						}
					}
					break;
				case 40: /* DOWN ARROW */
					if (globals.disablekeyboardevents == false) {
						if (selecteditem == "guitar") { playSound(660); } 
						else if (selecteditem == "piano") { playPiano(660); } 
						else if (selecteditem == "drumsticks") { playDrums(660); }
						else if (selecteditem == "bike") { rideBike("down"); } 
						else if (selecteditem == "skiis") { rideSkiis("down"); }
						else { blMovement.moveObject("down", 1, "player"); }
					}
					break;
				case 32: /* SPACE */
					if (globals.disablekeyboardevents == false) {

						if ($('.speech-bubble').length == 0) {
							blAction.playerPrimaryAction(); 
							event.preventDefault();
						} else {
							event.preventDefault();
						}

					}
					break;
				case 13: /* ENTER */
					if ($('.speech-bubble').length == 0) {
						$('.bubble-form').submit();
						event.preventDefault();
					} 
					break;
				case 69: // E 
					//playMusic();
					break;

				/*
				case 77: // M
					createEnemy();
					break;
				case 75: // K
					killEnemy(1);
					break;
				case 66: // B
					blMap.saveMap();
					break;
				case 67: // C
					blMap.loadExistingMap();
					break;
				case 65: // A
					moveMap();
					break;
				case 68: // D
					stopMap();
					break;
				case 69: // E
					playMusic();
					break;
				case 70: // F
					startWaves();
					break;
				case 71: // G
					drawNewWinterMap();
					drawNewBeachMap();
					break;
					/*
					g 71
					h 72
					i 73
					*/
				
			}
		}, false);

		//prevent keys from scrolling page
		$(document).keydown(function (e) {

		    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
		    if ( ((key == 37) || (key == 38) || (key == 39) || (key == 40) /*|| (key == 32)*/) && (e.target.className != null))
		       e.preventDefault();

		});
		
	}

	enableKeyboardEvents() {
		globals.disablekeyboardevents = false;
	}

	disableKeyboardEvents() {
		globals.disablekeyboardevents = true;
	}

	setupControlPadEvents() {
		blUtil.log("Control Pad Events");
		var selecteditem;
		//alert(selecteditem);
		$('.btn-up').on("touchstart", function() { 
			selecteditem = blUtil.getSelectedItem();
			if (selecteditem == "guitar") { playSound(1320); } 
			else if (selecteditem == "piano") { playPiano(1320); } 
			else if (selecteditem == "drumsticks") { playDrums(1320); }
			else if (selecteditem == "bike") { rideBike("up"); } 
			else if (selecteditem == "skiis") { rideSkiis("up"); }
			else { blMovement.moveObject("up", 1, "player"); }
		});
		$('.btn-down').on("touchstart", function() { 
			selecteditem = blUtil.getSelectedItem();
			if (selecteditem == "guitar") { playSound(660); } 
			else if (selecteditem == "piano") { playPiano(660); } 
			else if (selecteditem == "drumsticks") { playDrums(660); }
			else if (selecteditem == "bike") { rideBike("down"); } 
			else if (selecteditem == "skiis") { rideSkiis("down"); }
			else { blMovement.moveObject("down", 1, "player"); } 
		});
		$('.btn-left').on("touchstart", function() { 
			selecteditem = blUtil.getSelectedItem();
			if (selecteditem == "guitar") { playSound(880); } 
			else if (selecteditem == "piano") { playPiano(880); } 
			else if (selecteditem == "drumsticks") { playDrums(880); }
			else if (selecteditem == "bike") { rideBike("left"); } 
			else if (selecteditem == "skiis") { rideSkiis("left"); }
			else { blMovement.moveObject("left", 1, "player"); }
		});
		$('.btn-right').on("touchstart", function() { 
			selecteditem = blUtil.getSelectedItem();
			if (selecteditem == "guitar") { playSound(1100); } 
			else if (selecteditem == "piano") { playPiano(1100); } 
			else if (selecteditem == "drumsticks") { playDrums(1100); }
			else if (selecteditem == "bike") { rideBike("right"); } 
			else if (selecteditem == "skiis") { rideSkiis("right"); }
			else { blMovement.moveObject("right", 1, "player"); }
		});
		$('.btn-a').on("touchstart", function() { 
			blAction.playerPrimaryAction(); 
		});
	}

	setupMouseEvents() {
		blUtil.log("Mouse Events");
		var directions = ["up","down","left","right"];

		// SELECT AN ITEM IN THE INVENTORY
		$('.the-fucking-inventory div').on("click", function() {
			var blocktype = $(this).attr('data-blocktype');
			//items that are crafting ingredients
			if ( $.inArray(blocktype, globals.isingredient) > -1 ) {
			    if ( $(this).attr('data-blocktype') != "empty" ) {
			    	var blocktype = $(this).attr('data-blocktype');
			    	blInventory.moveItemToCraftingTable(blocktype);
			    }
			}
			var playerdirection = blUtil.getObjectDirection(1, "player");
			$('.the-fucking-inventory > div').removeClass("selected-item");
			$(this).addClass('selected-item');
			var selecteditem = $(this).attr('data-blocktype');

			//if ( selecteditem == "sword" ) { createEnemy(); }
			//if ( selecteditem == "spear" ) { createAnimal(); }
			
			//clear animation classes
			$.each(directions, function(i, v) {
				$('.the-fucking-player').removeClass("player-direction-"+v+"-sword");
				$('.the-fucking-player').removeClass("player-direction-"+v+"-shovel");
				$('.the-fucking-player').removeClass("player-direction-"+v+"-axe");
				$('.the-fucking-player').removeClass("player-direction-"+v+"-sword-swing");
				$('.the-fucking-player').removeClass("player-direction-"+v+"-shovel-swing");
				$('.the-fucking-player').removeClass("player-direction-"+v+"-axe-swing");
				$('.the-fucking-player').removeClass("player-direction-"+v+"-bike");
				$('.the-fucking-player').removeClass("player-direction-"+v+"-skiis");
				$('.the-fucking-player').removeClass("player-direction-"+v+"-car");
				$('.the-fucking-player').removeClass("player-direction-"+v+"-canoe");
				$('.the-fucking-player').removeClass("player-direction-"+v+"-rocket");
				
			});
			
			if ( $.inArray(selecteditem, globals.isequipable) > -1 ) {
				blUtil.log("selected item has animation");
				$('.the-fucking-player').addClass("player-direction-"+playerdirection+"-"+selecteditem);
			}
		});

		// REMOVE ITEMS FROM CRAFTING TABLE
		$('.the-fucking-crafting-table > div').on("click", function() {
			var blocktype = $(this).attr('data-blocktype');
			if (blocktype != "empty") {
				blUtil.log("crafting slot not empty");
				$(this).removeClass("block block-"+blocktype);
				$(this).addClass("empty");
				$(this).attr('data-blocktype', "empty");
				$(this).html("0");
				blInventory.addToInventory(blocktype,"1");
				blInventory.checkCraftingTableForItem();
			}
		});

		// MOVE THE CRAFTED ITEM TO INVENTORY
		$('.the-fucking-crafted-item > div').on("click", function() {
			if (!$('.the-fucking-crafted-item > div').hasClass("empty")) {
				var blocktype = $(this).attr('data-blocktype');
				var itemquantity = $(this).html();
				blUtil.log("You crafted" + itemquantity + " " + blocktype);
				$('.the-fucking-crafted-item > div').removeClass(globals.allblockclasses);
				$('.the-fucking-crafted-item > div').html("0");
				blInventory.removeAllItemsFromCraftingTable();
				blInventory.addToInventory(blocktype, itemquantity);
				blInventory.checkCraftingTableForItem();
			}
		});

		//SAVE THE MAPS AND PLAYER DATA
		$('.link-savemap').on("mousedown", function() {
			achievementCompleted("saveyourgame");
			$('.link-savemap a').html('Saving');
			var enableSaving = function() {
				$('.link-savemap div').html('<a>Save</a>');
			};
			setTimeout(enableSaving, 2500);
			blPlayer.savePlayer();
			blMap.saveMap();
		});

		//MOVE PLAYER TO BLOCK
		$('.the-fucking-forest-map .block').on("click", function() {
			if (typeof stopObjectMovement === 'undefined') {
			    // variable is undefined
			} else {
				stopObjectMovement();
			}
			var blockid = $(this).attr("data-blockid");
			blUtil.log("goto block id:"+blockid);
			blMovement.walkPlayerToBlock(1, blockid);
		});

	}

}