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

var blUtil = new Utility();
var blMap = new Map();
var blHealth = new Health();
var blInventory = new Inventory();
var blSigns = new Signs();
var blAchievement = new Achievement();
var blEnemy = new Enemy();
var blItems = new Items();
var blSpear = new Spear();

export class Action {

	constructor() {
		this.id = 1;
	}

	playerPrimaryAction(blockid) {
		var direction = blUtil.getObjectDirection(this.id, "player");
		var playerblock = blUtil.getObjectCurrentBlock(this.id);
		var block = blUtil.getObjectCurrentBlock(this.id);
		var currentMap = globals.currentMap;
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
		
		//blUtil.log("4-hitblock "+block);
		var blocktype = blUtil.getBlockType(block, currentMap);
		//blUtil.log("5-blocktype "+blocktype);

		if (blItems.itemIsUseable(selecteditem)) {
			$(".the-fucking-player").addClass("player-direction-"+direction+"-"+selecteditem+"-swing");
			setTimeout(removeSwingClass, 100);
			function removeSwingClass() {
				$(".the-fucking-player").removeClass("player-direction-"+direction+"-"+selecteditem+"-swing");
			}	
			var playerblock = blUtil.getObjectCurrentBlock(this.id);

			//killing the enemy
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
				blInventory.addToInventory(blocktype, 1);
				blMap.changeBlockType(block, "dirt", currentMap);

			// EATING
			} else if (blItems.itemIsEdible(selecteditem)) {
				blHealth.addHeart();
				// mushroom effects
				switch (selecteditem) {
					case "mushroom":
						blMap.hallucinate();
						break;
					case "bluemushroom":
						blMap.mapPerspective();
						break;
					case "blackmushroom":
						//nightTime();
						//lightUpBlock();
				}
				blInventory.removeFromInventory(selecteditem);
			
			// DOORS
			} else if (blocktype == "door") {
				blMap.changeBlockType(block, "door-open", currentMap);
			} else if (blocktype == "door-open") {
				blMap.changeBlockType(block, "door", currentMap);

			// FRISBEE THROW
			// } else if (selecteditem == "frisbee") {
				//throwFrisbee(block, direction);

			// SPEAR THROW
			} else if (selecteditem == "spear") {
				blSpear.throwSpear(block, direction);

			// DIGGING
			} else if (selecteditem == "shovel" && blItems.itemIsDiggable(blocktype)) {
				var r = Math.random();

				if (currentMap == 'forest') {
					if (r < 0.5) {
						blMap.changeBlockType(block, "diamond", currentMap);
					} else {
						blMap.changeBlockType(block, "dirt", currentMap);
					}
				} else if (currentMap == 'winter') {
					if (r < 0.2) {
						blMap.changeBlockType(block, "gold", currentMap);
					} else if (r < 0.4) {
						blMap.changeBlockType(block, "silver", currentMap);
					} else {
						blMap.changeBlockType(block, "dirt", currentMap);
					}
				} else if (currentMap == 'beach') {
					if (r < 0.2) {
						blMap.changeBlockType(block, "oil", currentMap);
					} else if (r < 0.4) {
						blMap.changeBlockType(block, "clay", currentMap);
					} else {
						blMap.changeBlockType(block, "dirt", currentMap);
					}
				}
				// TODO jungle, desert, islands trasure
				
				blInventory.addToInventory(blocktype, 5);
				blInventory.addToInventory('dirt', 5);
				// growGrass(block);

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
						blMap.changeBlockType(block, blUtil.getSelectedItem(), currentMap);
						blInventory.removeFromInventory(blUtil.getSelectedItem());
						if (blocktype=="water" || blocktype=="wave") { 
							blInventory.addToInventory("water", 5); 
						}
				}
				
			// SIGNS
			} else if (blocktype == "sign") {
				blSigns.readSign(block);

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