import * as globals from './globals';

import { Utility } from './utility'; 
import { Player } from './player'; 
import { Movement } from './movement'; 
import { Map } from './map/map';
import { Action } from './action'; 
import { Inventory } from './inventory'; 
import { Sound } from './sound'; 
import { Achievement } from './achievement'; 

var blUtil = new Utility();
var blPlayer = new Player();
var blMovement = new Movement();
var blMap = new Map();
var blAction = new Action();
var blInventory = new Inventory();
var blSound = new Sound();
var blAchievement = new Achievement();

export class HCI {

	constructor() {

	}

	setupKeyboardEvents() {
		blUtil.log("Keyboard Events");
		window.addEventListener('keydown', function(event) {
			var selecteditem = blUtil.getSelectedItem();
			var direction = '';
			switch (event.code) {
				case "ArrowLeft":
					direction = 'left';
					break;
				case "ArrowUp":
					direction = 'up';
					break;
				case "ArrowRight":
					direction = 'right';
					break;
				case "ArrowDown":
					direction = 'down';
					break;
				case "Space":
					if (globals.disablekeyboardevents == false) {
						if ($('.speech-bubble').length == 0) {
							blAction.playerPrimaryAction(); 
							event.preventDefault();
						} else {
							event.preventDefault();
						}
					}
					break;
				case "Enter":
					if ($('.speech-bubble').length == 0) {
						$('.bubble-form').submit();
						event.preventDefault();
					} 
					break;
				case "Digit1":
					$('.the-fucking-inventory > div:eq(0)').trigger("click");
					break;
				case "Digit2":
					$('.the-fucking-inventory > div:eq(1)').trigger("click");
					break;
				case "Digit3":
					$('.the-fucking-inventory > div:eq(2)').trigger("click");
					break;
				case "Digit4":
					$('.the-fucking-inventory > div:eq(3)').trigger("click");
					break;
				case "Digit5":
					$('.the-fucking-inventory > div:eq(4)').trigger("click");
					break;

				// case 69: // E 
				// break;
				// case 77: // M
				// break;
				// case 75: // K
				// break;
				// case 66: // B
				// break;
				// case 67: // C
				// break;
				// case 65: // A
				// break;
				// case 68: // D
				// break;
				// case 69: // El
				// break;
				// case 70: // F
				// break;
				// case 71: // G
				// break;
				
			}

			if (globals.disablekeyboardevents == false && direction != '') {
				switch (selecteditem) {
					case "guitar":
						blSound.playSound(880);
						blAchievement.achievementCompleted("playtheguitar");
						blMovement.moveObject(direction, 1, "player");
						break;
					case "piano":
						blSound.playSound(880);
						blAchievement.achievementCompleted("playthekeys");
						blMovement.moveObject(direction, 1, "player");
						break;
					case "trumpet":
						blSound.playSound(880);
						blAchievement.achievementCompleted("playthetrumpet");
						blMovement.moveObject(direction, 1, "player");
						break;
					case "bass":
						blSound.playSound(880);
						blAchievement.achievementCompleted("playthebass");
						blMovement.moveObject(direction, 1, "player");
						break;
					case "drumsticks":
						blSound.playSound(880);
						blAchievement.achievementCompleted("bringinthebeat");
						blMovement.moveObject(direction, 1, "player");
						break;
					case "rocket":
						blSound.playSound(880);
						blAchievement.achievementCompleted("gotospace");
						blMovement.moveObject(direction, 1, "player");
						break;
					case "bike":
						rideBike(direction);
						break;
					case "skiis":
						rideSkiis(direction);
						break;
					default:
						blMovement.moveObject(direction, 1, "player");
						break;
				}
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
		var controlMove = function (direction) {
			var selecteditem = blUtil.getSelectedItem();
			blUtil.log("Control Pad "+direction+" with "+selecteditem);
			switch (selecteditem) {
				case "guitar":
					blSound.playSound(880);
					blAchievement.achievementCompleted("playtheguitar");
					blMovement.moveObject(direction, 1, "player");
					break;
				case "piano":
					blSound.playSound(880);
					blAchievement.achievementCompleted("playthekeys");
					blMovement.moveObject(direction, 1, "player");
					break;
				case "trumpet":
					blSound.playSound(880);
					blAchievement.achievementCompleted("playthetrumpet");
					blMovement.moveObject(direction, 1, "player");
					break;
				case "bass":
					blSound.playSound(880);
					blAchievement.achievementCompleted("playthebass");
					blMovement.moveObject(direction, 1, "player");
					break;
				case "drumsticks":
					blSound.playSound(880);
					blAchievement.achievementCompleted("bringinthebeat");
					blMovement.moveObject(direction, 1, "player");
					break;
				case "rocket":
					blSound.playSound(880);
					blAchievement.achievementCompleted("gotospace");
					blMovement.moveObject(direction, 1, "player");
					break;
				case "bike":
					//rideBike(direction);
					break;
				case "skiis":
					//rideSkiis(direction);
					break;
				default:
					blMovement.moveObject(direction, 1, "player");
					break;
			}
		};
		$('.btn-up').on("touchstart", function() { 
			controlMove('up');
		});
		$('.btn-down').on("touchstart", function() { 
			controlMove('down');
		});
		$('.btn-left').on("touchstart", function() { 
			controlMove('left');
		});
		$('.btn-right').on("touchstart", function() { 
			controlMove('right');
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
			// items that are crafting ingredients
			if ( $.inArray(blocktype, globals.isingredient) > -1 ) {
			    if ( $(this).attr('data-blocktype') != "empty" ) {
			    	var blocktype = $(this).attr('data-blocktype');
			    	blInventory.moveItemToCraftingTable(blocktype);
			    }
			} else {
				$('.tabs .tab').hide();
				$('.tab-game').show();
				$('.tabs-close').hide();
			}
			var playerdirection = blUtil.getObjectDirection(1, "player");
			$('.the-fucking-inventory > div').removeClass("selected-item");
			$(this).addClass('selected-item');
			var selecteditem = $(this).attr('data-blocktype');

			// if ( selecteditem == "sword" ) { createEnemy(); }
			// if ( selecteditem == "spear" ) { createAnimal(); }
			
			// clear animation classes
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

			$('.nav-selected-item').removeClass(globals.allblockclasses);
			$('.nav-selected-item').addClass('block-'+blocktype);

		});

		// REMOVE ITEMS FROM CRAFTING TABLE
		$('.the-fucking-crafting-table > div').on("click", function() {
			var blocktype = $(this).attr('data-blocktype');
			if (blocktype != "empty") {
				blUtil.log("crafting slot not empty");
				$(this).removeClass("block-"+blocktype);
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
			blAchievement.achievementCompleted("saveyourgame");
			$('.link-savemap a').html('Saving');
			var enableSaving = function() {
				$('.link-savemap div').html('<a>Save</a>');
			};
			setTimeout(enableSaving, 2500);
			blPlayer.savePlayer();
			blMap.saveMap();
		});

		// disabled for dev

		// MOVE PLAYER TO BLOCK
		// $('.the-fucking-forest-map .block').on("click", function() {
		// 	if (typeof stopObjectMovement === 'undefined') {
		// 	    // variable is undefined
		// 	} else {
		// 		stopObjectMovement();
		// 	}
		// 	var blockid = $(this).attr("data-blockid");
		// 	blUtil.log("goto block id:"+blockid);
		// 	blMovement.walkPlayerToBlock(1, blockid);
		// });

	}

}