import * as globals from './globals';

import { Utility } from './utility';
import { Map } from './map/map';
import { Health } from './health';
import { Inventory } from './inventory';
import { Signs } from './signs';
import { Achievement } from './achievement';
import { Enemy } from './enemy';
import { Items } from './item/items';
import { Spear } from './item/spear';
import { Animal } from './animal';

var blUtil = new Utility();
var blMap = new Map();
var blHealth = new Health();
var blInventory = new Inventory();
var blSigns = new Signs();
var blAchievement = new Achievement();
var blEnemy = new Enemy();
var blItems = new Items();
var blSpear = new Spear();
var blAnimal = new Animal();

export class Action {

	constructor() {
		this.id = 1;
	}

	playerPrimaryAction(blockid) {
		var direction = blUtil.getObjectDirection(this.id, "player");
		var playerblock = blUtil.getObjectCurrentBlock(this.id);
		var block = blUtil.getObjectCurrentBlock(this.id);
		var currentMap = globals.getCurrentMap();
		var blockClass = '.the-fucking-'+currentMap+'-map .block:eq('+block+')';
		var selecteditem = blUtil.getSelectedItem();

		switch (direction) {
			case "up": block = block - (globals.mapwidth); break;
			case "down": block = block + (globals.mapwidth); break;
			case "left": block = block - 1; break;
			case "right": block = block + 1; break;
		}

		// if there is a blockid supplied run function on that one instead of the block the player is facing
		if (blockid) {
			block = blockid;
		}
		
		var blocktype = blUtil.getBlockType(block, currentMap);

		console.log("ACTION");
		console.log({ selecteditem });
		
		if (blItems.itemIsInstrument(selecteditem)) {
			console.log("IS INSTRUMENT");
			
			$(".the-fucking-player").addClass("player-direction-"+direction+"-"+selecteditem+"-swing");
			setTimeout(removeSwingClass, 100);
			function removeSwingClass() {
				$(".the-fucking-player").removeClass("player-direction-"+direction+"-"+selecteditem+"-swing");
			}
		}

		if (blItems.itemIsUseable(selecteditem)) {

			console.log("IS USEBLE");
			
			$(".the-fucking-player").addClass("player-direction-"+direction+"-"+selecteditem+"-swing");
			setTimeout(removeSwingClass, 100);
			function removeSwingClass() {
				$(".the-fucking-player").removeClass("player-direction-"+direction+"-"+selecteditem+"-swing");
			}	
			var playerblock = blUtil.getObjectCurrentBlock(this.id);

			// killing the enemy
			if ($('.the-fucking-enemy').length != 0) {
				$('.the-fucking-enemy').each(function(index) {
					var enemyid = $(this).attr('data-id');
					var enemyblock = blUtil.getObjectCurrentBlock(enemyid);
					if (block == enemyblock || enemyblock == playerblock) {
						blUtil.log("killed an enemy!");
						blEnemy.killEnemy(enemyid);
					}
				});
			}
		}
		
		$(blockClass).animate({ opacity: 0.9 }, 50, function() {
			
			$(blockClass).css("opacity","1");
			var selecteditem = blUtil.getSelectedItem();

			// using axe to collect doors, signs and other mechnism objects 
			// that have a function instead of being collecable
			if (selecteditem == "axe" && ( blItems.itemIsCollectable(blocktype) || blItems.itemIsCutable(blocktype) ) ) {
				blUtil.displayConsoleMessage("you picked up "+blocktype);
				blInventory.addToInventory(blocktype, 1);
				blMap.changeBlockType(block, "dirt", currentMap);

			// EATING
			} else if (blItems.itemIsEdible(selecteditem)) {
				blHealth.addHeart();
				blUtil.displayConsoleMessage("you ate "+selecteditem);
				// mushroom effects
				switch (selecteditem) {
					case "mushroom":
						blMap.hallucinate();
						break;
					case "bluemushroom":
						blMap.mapPerspective();
						break;
					case "blackmushroom":
						// nightTime();
						// lightUpBlock();
						break;
					case "yellowmushroom":
						blAnimal.createAnimal();
						break;
					case "greenmushroom":
						blEnemy.createEnemy();
						break;
							
						
				}
				blInventory.removeFromInventory(selecteditem);
			
			// DOORS
			} else if (blocktype == "door") {
				blUtil.displayConsoleMessage("you opened the door");
				blMap.changeBlockType(block, "door-open", currentMap);
			} else if (blocktype == "door-open") {
				blUtil.displayConsoleMessage("you closed the door");
				blMap.changeBlockType(block, "door", currentMap);

			// FRISBEE THROW
			} else if (selecteditem == "frisbee") {
				blUtil.displayConsoleMessage("you threw frisbee");
				blSpear.throwFrisbee(block, direction);

			// SPEAR THROW
			} else if (selecteditem == "spear") {
				blUtil.displayConsoleMessage("you threw spear");
				blSpear.throwSpear(block, direction);

			// DIGGING
			} else if (selecteditem == "shovel" && blItems.itemIsDiggable(blocktype)) {
				var r = Math.random();

				if (currentMap == 'forest') {
					if (r < 0.5) {
						blUtil.displayConsoleMessage("you found diamond");
						blMap.changeBlockType(block, "diamond", currentMap);
					} else {
						blUtil.displayConsoleMessage("you dug some dirt");
						blMap.changeBlockType(block, "dirt", currentMap);
					}
				} else if (currentMap == 'winter') {
					if (r < 0.2) {
						blUtil.displayConsoleMessage("you found gold");
						blMap.changeBlockType(block, "gold", currentMap);
					} else if (r < 0.4) {
						blUtil.displayConsoleMessage("you found silver");
						blMap.changeBlockType(block, "silver", currentMap);
					} else {
						blUtil.displayConsoleMessage("you dug some dirt");
						blMap.changeBlockType(block, "dirt", currentMap);
					}
				} else if (currentMap == 'beach') {
					if (r < 0.2) {
						blUtil.displayConsoleMessage("you found oil");
						blMap.changeBlockType(block, "oil", currentMap);
					} else if (r < 0.4) {
						blUtil.displayConsoleMessage("you found clay");
						blMap.changeBlockType(block, "clay", currentMap);
					} else {
						blUtil.displayConsoleMessage("you dug some dirt");
						blMap.changeBlockType(block, "dirt", currentMap);
					}
				} else if (currentMap == 'jungle') {
					if (r < 0.2) {
						blUtil.displayConsoleMessage("you found silver");
						blMap.changeBlockType(block, "silver", currentMap);
					} else if (r < 0.4) {
						blUtil.displayConsoleMessage("you found clay");
						blMap.changeBlockType(block, "clay", currentMap);
					} else {
						blUtil.displayConsoleMessage("you dug some dirt");
						blMap.changeBlockType(block, "dirt", currentMap);
					}
				} else if (currentMap == 'desert') {
					if (r < 0.2) {
						blUtil.displayConsoleMessage("you found oil");
						blMap.changeBlockType(block, "oil", currentMap);
					} else if (r < 0.4) {
						blUtil.displayConsoleMessage("you found gold");
						blMap.changeBlockType(block, "gold", currentMap);
					} else {
						blUtil.displayConsoleMessage("you dug some dirt");
						blMap.changeBlockType(block, "dirt", currentMap);
					}
				} else if (currentMap == 'islands') {
					if (r < 0.2) {
						blUtil.displayConsoleMessage("you found oil");
						blMap.changeBlockType(block, "oil", currentMap);
					} else if (r < 0.4) {
						blUtil.displayConsoleMessage("you found clay");
						blMap.changeBlockType(block, "clay", currentMap);
					} else {
						blUtil.displayConsoleMessage("you dug some diamond");
						blMap.changeBlockType(block, "diamond", currentMap);
					}
				}
				
				blInventory.addToInventory(blocktype, 5);
				blInventory.addToInventory('dirt', 5);
				// growGrass(block); // TODO: grow grass back after digging

			// FILLING WATER/HOLES
			} else if (blocktype == "hole" || blocktype == "water" || blocktype == "wave") {
				if (selecteditem == "grass" ||
					selecteditem == "dirt" ||
					selecteditem == "snow" ||
					selecteditem == "sand" ||
					selecteditem == "rockbrick" ||
					selecteditem == "icerockbrick" ||
					selecteditem == "sandstonebrick" ||
					selecteditem == "claybrick" ||
					selecteditem == "road" ) {
						blUtil.displayConsoleMessage("you filled water block with"+blocktype);
						blMap.changeBlockType(block, blUtil.getSelectedItem(), currentMap);
						blInventory.removeFromInventory(blUtil.getSelectedItem());
						if (blocktype=="water" || blocktype=="wave") { 
							blInventory.addToInventory("water", 5); 
						}
				}
				
			// SIGNS
			} else if (blocktype == "sign") {
				blUtil.displayConsoleMessage("you placed a sign");
				blSigns.readSign(block, currentMap);

			// PLACING BLOCKS
			} else if (blItems.itemIsGround(blocktype)) {

				// PORTALS
				if (selecteditem == "portal-a") {
					$('.maps-wrap .block-portal-a').each(function(index) {
						var id = $(this).attr("data-blockid");
						blMap.changeBlockType(this.id, "grass", currentMap);

					});
					blInventory.removeFromInventory(selecteditem);
					blMap.changeBlockType(block, selecteditem, currentMap);
				} else if (selecteditem == "portal-b") {
					$('.maps-wrap .block-portal-b').each(function(index) {
						var id = $(this).attr("data-blockid");
						blMap.changeBlockType(this.id, "grass", currentMap);

					});
					blInventory.removeFromInventory(selecteditem);
					blMap.changeBlockType(block, selecteditem, currentMap);

				// PLACE BLOCK
				} else if (blItems.itemIsPlaceable(selecteditem)) {
					if (selecteditem == "sign") {
						blSigns.placeSign(1, block);
					}
					blInventory.removeFromInventory(selecteditem);
					blMap.changeBlockType(block, selecteditem, currentMap);
				}

				// ACHIEVEMENT
				if (selecteditem == "fire") { blAchievement.achievementCompleted("keepingwarm"); }
				if (selecteditem == "door" || selecteditem == "door-closed") { blAchievement.achievementCompleted("takingshelter"); }

			// PICKING UP THINGS
			} else if (blItems.itemIsCollectable(blocktype)) {
				blUtil.displayConsoleMessage("you picked up "+blocktype);
				var changeblocktotype = "grass";

				// "PLANTED" items - leaves dirt behind
				if (
					blocktype == "diamond-hole" ||
					blocktype == "gold-hole" ||
					blocktype == "silver-hole" ||
					blocktype == "oil-hole" ||
					blocktype == "clay-hole" ||
					blocktype == "tree" ||
					blocktype == "pinetree" ||
					blocktype == "palmtree" ||
					blocktype == "appletree" ||
					blocktype == "flower" ||
					blocktype == "rock" ||
					blocktype == "icerock" ||
					blocktype == "standstone"
				) {
					changeblocktotype = "dirt";

				// PICKING PLANTS
				} else if (blocktype == "carrot-inground") { 
					blocktype = "carrot";
					changeblocktotype = "dirt";
				}

				blInventory.addToInventory(blocktype, "5");
				blMap.changeBlockType(block, changeblocktotype, currentMap);

				// APPLE TREES
				if (blocktype == "appletree") { blInventory.addToInventory("apple", "5");}

				// ACHIEVEMENT
				if (blocktype == "tree" || blocktype == "pinetree" || blocktype == "palmtree" || blocktype == "appletree") {
					blAchievement.achievementCompleted("cuttingwood");
				}
				if (blocktype == "diamond" || blocktype == "gold" || blocktype == "silver" || blocktype == "oil" || blocktype == "clay") {
					blAchievement.achievementCompleted("treasurehunter");
				}
			}

		});
	}

}