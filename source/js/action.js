import * as globals from './globals';

import { Utility } from './utility';
import { Map } from './map';
import { Inventory } from './inventory';
import { Signs } from './signs';
import { Achievement } from './achievement';

var blUtil = new Utility();
var blMap = new Map();
var blInventory = new Inventory();
var blSigns = new Signs();
var blAchievement = new Achievement();

export class Action {

	constructor() {
		this.id = 1;
	}

	playerPrimaryAction(blockid) {

		//find block that the player is facing
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
		var blocktype = blUtil.getBlockType(block);
		//blUtil.log("5-blocktype "+blocktype);

		//item swing animations
		if (selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "axe") {
			var swingclass = "player-direction-"+direction+"-"+selecteditem+"-swing";
			$(".the-fucking-player").addClass("player-direction-"+direction+"-"+selecteditem+"-swing");
			var swinganimation = setTimeout(removeSwingClass, 100);
			function removeSwingClass(swingclass) {
				$(".the-fucking-player").removeClass("player-direction-"+direction+"-"+selecteditem+"-swing");
			}	
			var playerblock = blUtil.getObjectCurrentBlock(this.id);	
			//blUtil.log("5-playerblock "+playerblock);

			//killing the enemy
			if ($('.the-fucking-enemy').length != 0) {
				$('.the-fucking-enemy').each(function(index) {
					var enemyid = $(this).attr('data-id');
					var enemyblock = blUtil.getObjectCurrentBlock(enemyid);
					if (block == enemyblock || enemyblock == playerblock) {
						blUtil.log("killed an enemy!");
						//killEnemy(enemyid);
					}
				});
			}
		}
		
		$(blockClass).animate({ opacity: 0.9 }, 50, function() {
			
			$(blockClass).css("opacity","1");
			var selecteditem = blUtil.getSelectedItem();

			//use axe to collect doors, signs and other mechnism objects
			if ( (selecteditem == "axe") &&  ((blocktype == "door") || (blocktype == "door-open") ) ) {
				blInventory.addToInventory("door", 1);
				blMap.changeBlockType(block, "grass", currentMap);
			} else if ( (selecteditem == "axe") && (blocktype == "sign") ) {
				blInventory.addToInventory("sign", 1);
				blMap.changeBlockType(block, "grass", currentMap);
			} else if ( (selecteditem == "axe") && (blocktype == "fire") ) {
				blInventory.addToInventory("fire", 1);
				blMap.changeBlockType(block, "grass", currentMap);
				//growGrass(block);

			//EATING
			} else if (selecteditem == "heart") {
				blHealth.addHeart();
				blInventory.removeFromInventory(selecteditem);
			} else if (selecteditem == "apple") {
				blHealth.addHeart();
				blInventory.removeFromInventory(selecteditem);
			} else if (selecteditem == "carrot") {
				blHealth.addHeart();
				blInventory.removeFromInventory(selecteditem);
			} else if (selecteditem == "mushroom") {
				blHealth.addHeart();
				//hallucinate();
				blInventory.removeFromInventory(selecteditem);
			} else if (selecteditem == "bluemushroom") {
				blHealth.addHeart();
				blMap.mapPerspective();
				blInventory.removeFromInventory(selecteditem);
			} else if (selecteditem == "blackmushroom") {
				blHealth.addHeart();
				//nightTime();
				//lightUpBlock();
				blInventory.removeFromInventory(selecteditem);
			//open/close doors
			} else if (blocktype == "door") {
				blMap.changeBlockType(block, "door-open", currentMap);
			} else if (blocktype == "door-open") {
				blMap.changeBlockType(block, "door", currentMap);

			//throw frisbee
			} else if (selecteditem == "frisbee") {
				//throwFrisbee(block, direction);

			//throw spear
			} else if (selecteditem == "spear") {
				//throwSpear(block, direction);

			//digging - forest map
			} else if ( (blUtil.getSelectedItem() == "shovel") && ((blocktype == "grass") || (blocktype == "dirt")) ) {
				blUtil.log("dig!");
				//chance of digging a diamond
				var r = Math.random();
				if (r < 0.5) {
					blUtil.log("diamond!");
					blMap.changeBlockType(block, "diamond-hole", currentMap);
				} else {
					blMap.changeBlockType(block, "dirt", currentMap);
				}
				blInventory.addToInventory(blocktype, 5);
				blInventory.addToInventory('dirt', 5);
				//growGrass(block);

			//digging - winter map
			} else if ( blUtil.getSelectedItem() == "shovel" && ( blocktype == "snow" || blocktype == "frozendirt" || blocktype == "ice" ) ) {
				var r = Math.random();
				if (r < 0.2) {
					blUtil.log("gold!");
					blMap.changeBlockType(block, "gold-hole", currentMap);
				} else if (r < 0.4) {
					blUtil.log("silver!");
					blMap.changeBlockType(block, "silver-hole", currentMap);
				} else {
					blMap.changeBlockType(block, "frozendirt", currentMap);
				}
				blInventory.addToInventory(blocktype, 5);
				blInventory.addToInventory('frozendirt', 5);
				//growGrass(block);

			//digging - beach map
			} else if ( blUtil.getSelectedItem() == "shovel" && ( blocktype == "sand" || blocktype == "wetsand" ) ) {
				//chance of digging gold
				var r = Math.random();
				if (r < 0.2) {
					blUtil.log("oil!");
					blMap.changeBlockType(block, "oil-hole", currentMap);
				} else if (r < 0.4) {
					blUtil.log("clay!");
					blMap.changeBlockType(block, "clay-hole", currentMap);
				} else {
					blMap.changeBlockType(block, "wetsand", currentMap);
				}
				blInventory.addToInventory(blocktype, 5);
				blInventory.addToInventory('wetsand', 5);
				//growGrass(block);

			//filling water/holes
			} else if ( (blocktype == "hole") || (blocktype == "water") || (blocktype == "snowhole") || (blocktype == "wave") || (blocktype == "sandhole") ) {
				if (selecteditem == "grass" ||
					selecteditem == "dirt" ||
					selecteditem == "frozendirt" ||
					selecteditem == "snow" ||
					selecteditem == "sand" ||
					selecteditem == "wetsand" ||
					selecteditem == "rockbrick" ||
					selecteditem == "icerockbrick" ||
					selecteditem == "sandstonebrick" ||
					selecteditem == "claybrick" ||
					selecteditem == "road" ) {
						blUtil.log("fill hole/water with dirt, sand or snow");
						blMap.changeBlockType(block, blUtil.getSelectedItem(), currentMap);
						blInventory.removeFromInventory(blUtil.getSelectedItem());
						//growGrass(block);
						if(blocktype=="water"||blocktype=="wave") { 
							blInventory.addToInventory("water", 5); 
						}
				}
				
			//read sign
			} else if (blocktype == "sign") {
				blUtil.log("reading sign");
				blSigns.readSign(block);

			//placing blocks
			} else if ( (blocktype == "grass") || (blocktype == "dirt") || (blocktype == "hole") ||
			     (blocktype == "snow") || (blocktype == "frozendirt") || (blocktype == "ice") ||
			     (blocktype == "sand") || (blocktype == "wetsand") || (blocktype == "water") ) {
				blUtil.log('selected item is '+selecteditem);
				blUtil.log('blocktype is '+blocktype);

				//only allow 1 portal of each type on map
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
				} else if ( $.inArray(selecteditem, globals.isplaceable) > -1 ) {
					if (selecteditem == "sign") {
						blSigns.placeSign(1, block);
					}
					blUtil.log('a placable item is selected');
					blInventory.removeFromInventory(selecteditem);
					blMap.changeBlockType(block, selecteditem, currentMap);
				}

				//achievements
				if (selecteditem == "fire") { 
					blAchievement.achievementCompleted("keepingwarm"); 
				}
				if (selecteditem == "door" || selecteditem == "door-closed") { 
					blAchievement.achievementCompleted("takingshelter"); 
				}

			//picking up items & blocks	
			} else if ($.inArray(blocktype, globals.iscollectable) > -1) {
				var changeblocktotype = "grass";
				if (blocktype == "diamond-hole") { blocktype = "diamond"; changeblocktotype = "grass"; } 
				else if (blocktype == "gold-hole") { blocktype = "gold"; changeblocktotype = "snow"; } 
				else if (blocktype == "silver-hole") { blocktype = "silver"; changeblocktotype = "snow"; }
				else if (blocktype == "oil-hole") { blocktype = "oil"; changeblocktotype = "sand"; }
				else if (blocktype == "clay-hole") { blocktype = "clay"; changeblocktotype = "sand"; }
				else if (blocktype == "carrot-inground") { blocktype = "carrot"; changeblocktotype = "dirt"; }

				blInventory.addToInventory(blocktype, "5");
				blMap.changeBlockType(block, changeblocktotype, currentMap);
				//growGrass(block);

				//appletrees give player apples
				if (blocktype == "appletree") {
					blInventory.addToInventory("apple", "5");
				}

				//achievement cuttingwood
				if (blocktype == "tree" || blocktype == "pinetree" || blocktype == "palmtree" || blocktype == "appletree") {
					blAchievement.achievementCompleted("cuttingwood");
				}

				//achievement treasurehunter
				if (blocktype == "diamond" || blocktype == "gold" || blocktype == "silver" || blocktype == "oil" || blocktype == "clay") {
					blAchievement.achievementCompleted("treasurehunter");
				}
			}

		});
	}

}