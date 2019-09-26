import * as globals from './globals';

import { Utility } from './utility';
import { Cube } from './map/cube';
import { Items } from './item/items';

var blUtil = new Utility();
var blCube = new Cube();
var blItems = new Items();

export class Movement {

	constructor() {
		this.objectbrain;
		this.objectPath = [];
		this.destinationblockColumn;
		this.t = 0;
		this.maxthoughts = 100;
	}

	moveObject(direction, id, name) {
		var success = false;
		var x = blUtil.getObjectCurrentPositionX(id);
		var y = blUtil.getObjectCurrentPositionY(id);
		x = blUtil.stripPX(x);
		y = blUtil.stripPX(y);

		this.changeObjectDirection(id, direction, name);

		if (!this.objectCollisionDetection(id, direction, globals.currentMap)) {
			switch (direction) {
				case "up": 
					y = y - globals.gridunitpx; 
					y = blUtil.addPX(y);
					$(".objectid-"+id).css("top",y); 
					break;
				case "down": 
					y = y + globals.gridunitpx; 
					y = blUtil.addPX(y);
					$(".objectid-"+id).css("top",y); 
					break;
				case "left": 
					x = x - globals.gridunitpx; 
					x = blUtil.addPX(x);
					$(".objectid-"+id).css("left",x); 
					break;
				case "right": 
					x = x + globals.gridunitpx; 
					x = blUtil.addPX(x);
					$(".objectid-"+id).css("left",x); 
					break;
			}
			success = true;
		} else {
			blUtil.log("Can't move object id:"+id+" "+direction);	
			success = false;
		}

		// if (globals.isnightime == true) {
		// 	//clearLighting();
		// 	//lightUpBlock();
		// }

		return success;
	}

	objectCollisionDetection(id, direction, map) {
		var collide = false;
		var currentblock = blUtil.getObjectCurrentBlock(id);
		var nextblock = '';
		var row = blUtil.getObjectCurrentRow(id);
		var col = blUtil.getObjectCurrentCol(id);
		var selecteditem = blUtil.getSelectedItem();
		var movingObject_id = id;

		switch (direction) {
			case "up": nextblock = currentblock - (globals.mapwidth); break;
			case "down": nextblock = currentblock + (globals.mapwidth); break;
			case "left": nextblock = currentblock - 1; break;
			case "right": nextblock = currentblock + 1; break;
		}

		var movingObject_nextblock = nextblock;
		var nextBlockClass = '.the-fucking-'+map+'-map .block:eq('+nextblock+')';
		var nextBlockType = blUtil.getBlockType(nextblock, globals.currentMap);

		// TELEPORTING
		if (id == 1 && $(nextBlockClass).hasClass('block-portal-a')) {
			var destinationblock = $('.maps-wrap .block-portal-b').first().attr("data-blockid");
			blUtil.teleportObjectToBlock(1, destinationblock);
			collide = true;

		// TELEPORTING
		} else if (id == 1 && $(nextBlockClass).hasClass('block-portal-b')) {
			var destinationblock = $('.maps-wrap .block-portal-a').first().attr("data-blockid");
			blUtil.teleportObjectToBlock(1, destinationblock);
			collide = true;

		// MAP EDGES
		} else if ( (direction == "right" ) && (col>=globals.mapwidth-1) ) {
			this.moveObjectToMap(movingObject_id, currentblock, direction);
			collide = true;
		} else if ( (direction == "left" ) && (col==0) ) {
			this.moveObjectToMap(movingObject_id, currentblock, direction);
			collide = true;
		} else if ( (direction == "up" ) && (row<=1) ) {
			this.moveObjectToMap(movingObject_id, currentblock, direction);
			collide = true;
		} else if ( (direction == "down" ) && (row>=globals.mapheight) ) {
			this.moveObjectToMap(movingObject_id, currentblock, direction);
			collide = true;	

		// ROCKET
		} else if (selecteditem == "rocket" && $(nextBlockClass).hasClass('block-space')) {
			collide = false;
		} else if (selecteditem == "rocket") {
			collide = true;

		// CANOEING
		} else if (selecteditem == "canoe" && $(nextBlockClass).hasClass('block-water')) {
			collide = false;
		} else if (selecteditem == "canoe") {
			collide = true;

		} else if (blItems.itemIsBlocking(nextBlockType)) {
			collide = true;

		} else {
			// PLAYER
			if (id != 1) {
				var playerElement = $('.the-fucking-player');
				var player_id = $('.the-fucking-player').attr('data-id');
				var player_block = blUtil.getObjectCurrentBlock(player_id);

				if (movingObject_nextblock == player_block) {
					blUtil.log('BLOCKED BY PLAYER');
					collide = true;
				}

			// ANIMAL
			} else if ($('.the-fucking-deer').length != 0) {
				$('.the-fucking-deer').each(function(index) {
					var blockingObject_id = $(this).attr('data-id');
					var blockingObject_block = blUtil.getObjectCurrentBlock(blockingObject_id);
				
					if (movingObject_nextblock == blockingObject_block && movingObject_id != blockingObject_id) {
						collide = true;
					}
				});

			// WALK TO NEXT BLOCK
			} else {
				collide = false;
			}

		}	

		// ICE
		//} else if ( $(nextBlockClass).hasClass('block-ice') ) {
			//slidePlayer();
			//return true;

		// Bike Riding?
		// Skiiing?
		// Canoeing
		// Driving

		return collide;
	}

	changeObjectDirection(id, direction, name) {
		blUtil.log("changing object:"+id+" direction to "+direction);
		var selecteditem = blUtil.getSelectedItem();
		//animated items
		var playergraphic;
		if ( selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "axe" || selecteditem == "bike" || selecteditem == "skiis" || selecteditem == "car" || selecteditem == "canoe" || selecteditem == "rocket" && name == "player" ) { 
			playergraphic = "-"+selecteditem;
		} else {
			playergraphic = "";
		}

		//clear direction and animation classes
		$('.objectid-'+id).removeClass(name+"-direction-down "+name+"-direction-left "+name+"-direction-right "+name+"-direction-up");
		$('.objectid-'+id).removeClass(name+"-direction-down"+playergraphic+" "+name+"-direction-left"+playergraphic+" "+name+"-direction-right"+playergraphic+" "+name+"-direction-up"+playergraphic);

		switch (direction) {
			case "up":
				$('.objectid-'+id).addClass(name+"-direction-up");
				if (playergraphic!="") { $('.objectid-'+id).addClass(name+"-direction-up"+playergraphic); }
				break;
			case "down":
				$('.objectid-'+id).addClass(name+"-direction-down");
				if (playergraphic!="") { $('.objectid-'+id).addClass(name+"-direction-down"+playergraphic); }
				break;
			case "left":
				$('.objectid-'+id).addClass(name+"-direction-left");
				if (playergraphic!="") { $('.objectid-'+id).addClass(name+"-direction-left"+playergraphic); }
				break;
			case "right":
				$('.objectid-'+id).addClass(name+"-direction-right");
				if (playergraphic!="") { $('.objectid-'+id).addClass(name+"-direction-right"+playergraphic); }
				break;
		}

		/*
		var mobgraphic;
		if ( name == 'enemy' || name == 'animal' ) { 
			mobgraphic = "-"+selecteditem;
		} else {
			mobgraphic = "";
		}
		*/
	}

	walkPlayerToBlock(id, destinationblock) {
		this.stopObjectMovement();
		var playerblock = blUtil.getObjectCurrentBlock('1');

		// if clicking a block that the player is touching
		// run the player action function on that block

		// if (playerblock == destinationblock) {
		// 	blAction.playerPrimaryAction(destinationblock); 
		// 	return;
		// } else if ((playerblock-globals.mapwidth-1) == destinationblock) {
		// 	blAction.playerPrimaryAction(destinationblock); 
		// 	return;
		// } else if ((playerblock+globals.mapwidth-1) == destinationblock) {
		// 	blAction.playerPrimaryAction(destinationblock); 
		// 	return;
		// } else if ((playerblock-2) == destinationblock) {
		// 	blAction.playerPrimaryAction(destinationblock); 
		// 	return;
		// }

		this.objectbrain = setTimeout(this.anObjectMovement(id), globals.enemyspeed);
		this.destinationblockColumn = destinationblock % globals.mapwidth;
		this.destinationblockRow = parseInt(destinationblock / globals.mapwidth);
	}

	stopObjectMovement() {
		clearTimeout(this.objectbrain);
	}
	
	anObjectMovement(id) {
		var objectX = blUtil.getObjectCurrentCol(id) - 1; 
		var objectY = blUtil.getObjectCurrentRow(id) - 1;
		var n = this.objectPath.length;
		this.objectPath.push(objectX+"-"+objectY);

		var xDifference = this.destinationblockColumn - objectX;
		var yDifference = objectY - this.destinationblockRow;
		var POSxDifference = Math.abs(xDifference);
		var POSyDifference = Math.abs(yDifference);

		// if player stuck abort!
		// if (this.objectPath[n-1] == this.objectPath[n]) {
		// 	blUtil.log("OBJECT STUCK, ABORTING");
		// 	stopObjectMovement();
		// 	return;
		// }
		
		if ( (xDifference == 0) && (yDifference == 0) ) {
			blUtil.log("reached destination block, stop moving");
			this.stopObjectMovement();
		} else if (POSxDifference >= POSyDifference) {
			if (xDifference >= 0) { 
				this.moveObject("right", id, "player");
			} else { 
				this.moveObject("left", id, "player");
			}
		} else {
			if (yDifference >= 0) { 
				this.moveObject("up", id, "player");
			} else { 
				this.moveObject("down", id, "player");
			}
		}
		
		//limit
		if (this.t > 10) {
			//blUtil.log("Enemy terminated");
			this.stopObjectMovement();
			//killEnemy(id);
		} else {
			this.t++;
			this.objectbrain = setTimeout(this.anObjectMovement(id), globals.playerspeed); // repeat thought
		}
	
	}

	moveObjectToMap(objectId, objectCurrentBlock, objectDirection) {
		//init
		//globals.currentMap = globals.cubeSidesArray[globals.currentCubeSide].map;
		var objectDirection = objectDirection;
		var object = $('.objectid-'+objectId);
		var currentBlock = objectCurrentBlock;

		// find out what map and side of cube is next
		var nextCubeSide = globals.cubeSidesArray[globals.currentCubeSide][objectDirection];
		var nextMap = globals.cubeSidesArray[nextCubeSide].map;
		var toMap = $('.the-fucking-'+nextMap+'-map');

		// find out what block on next map to move to
		var mapwidth = globals.mapwidth;
		var mapheight = globals.mapheight;
		var nextBlock = 0;

		switch (objectDirection) {
			case 'right':
				nextBlock = currentBlock - (mapwidth - 1);
				break;
			case 'left':
				nextBlock = currentBlock + mapwidth - 1;
				break;
			case 'up':
				nextBlock = currentBlock + (mapwidth * mapheight) - mapwidth;
				break;
			case 'down':
				nextBlock = currentBlock - (mapwidth * mapheight) + mapwidth;
				break;
		}

		// remove player from current map
		object.detach();

		// rotate the cube
		if (objectId == 1) {
			blCube.rotateCubeTo(nextCubeSide);	
		}

		globals.currentMap = nextMap;

		// add player to new map
		object.appendTo(toMap);
		blUtil.teleportObjectToBlock(1, nextMap, nextBlock);
	}

}