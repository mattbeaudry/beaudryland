import * as globals from './globals';

import { Utility } from './utility';
import { Action } from './action';
import { Cube } from './cube';

var blUtil = new Utility();
var blAction = new Action();
var blCube = new Cube();

export class Movement {

	constructor() {
		this.objectbrain;
		this.objectPath = [];
		this.destinationblockColumn;
		this.t = 0;
		this.maxthoughts = 100;
	}

	moveObject(direction, id, name, map) {
		var success = false;
		var x = blUtil.getObjectCurrentPositionX(id);
		var y = blUtil.getObjectCurrentPositionY(id);
		x = blUtil.stripPX(x);
		y = blUtil.stripPX(y);

		this.changeObjectDirection(id, direction, name);

		if (!this.objectCollisionDetection(id, direction, map)) {
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

		if (globals.isnightime == true) {
			//clearLighting();
			//lightUpBlock();
		}

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

		if (movingObject_id == 1) {
			blUtil.log('moving id:'+movingObject_id+' to block:'+movingObject_nextblock);
		}

		//teleporting
		if (id == 1 && $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-portal-a')) {
			var destinationblock = $('.maps-wrap .block-portal-b').first().attr("data-blockid");
			//alert(destinationblock);
			this.teleportObjectToBlock(1, destinationblock);
			collide = true;
		//teleporting
		} else if (id == 1 && $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-portal-b')) {
			var destinationblock = $('.maps-wrap .block-portal-a').first().attr("data-blockid");
			//alert(destinationblock);
			this.teleportObjectToBlock(1, destinationblock);
			collide = true;
		//space travel
		} else if (selecteditem == "rocket" && $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-space')) {
			collide = false;
		} else if (selecteditem == "rocket") {
			collide = true;
		//space
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-space') ) {
			collide = true;
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-star') ) {
			collide = true;
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-redgalaxy') ) {
			collide = true;
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-bluegalaxy') ) {
			collide = true;
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-sun') ) {
			collide = true;
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-earth') ) {
			collide = true;
		//canoeing
		} else if (selecteditem == "canoe" && $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-water')) {
			collide = false;
		} else if (selecteditem == "canoe") {
			collide = true;
		// Water
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-water') ) {
			collide = true;
		// Tree	
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-tree') ) {
			collide = true;
		// Rock
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-rock') ) {
			collide = true;
		// Wood
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-wood') ) {
			collide = true;
		// Fire
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-fire') ) {
			collide = true;
		// Closed Door
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-door') ) {
			collide = true;
		// Map right border	
		} else if ( (direction == "right" ) && (col>=globals.mapwidth-1) ) {
			console.log('*** RIGHT MAP EDGE ***');
			this.moveObjectToMap(1, currentblock, direction);
			collide = true;
		// Map left border	
		} else if ( (direction == "left" ) && (col==0) ) {
			console.log('*** LEFT MAP EDGE ***');
			this.moveObjectToMap(1, currentblock, direction);
			collide = true;
		// Map top border
		} else if ( (direction == "up" ) && (row<=1) ) {
			console.log('*** TOP MAP EDGE ***');
			this.moveObjectToMap(1, currentblock, direction);
			collide = true;
		// Map bottom border
		} else if ( (direction == "down" ) && (row>=globals.mapheight) ) {
			console.log('*** BOTTOM MAP EDGE ***');
			this.moveObjectToMap(1, currentblock, direction);
			collide = true;	
		// PineTree	
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-pinetree') ) {
			collide = true;
		// IceRock
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-icerock') ) {
			collide = true;
		// PalmTree
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-palmtree') ) {
			collide = true;
		// RockBrick
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-rockbrick') ) {
			collide = true;
		// IceRockBrick
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-icerockbrick') ) {
			collide = true;
		// ClayBrick
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-claybrick') ) {
			collide = true;
		// AppleTree
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-appletree') ) {
			collide = true;
		// TallTree
		} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-talltree') ) {
			collide = true;
		// Ice Sliding
		//} else if ( $('.maps-wrap .block:eq('+nextblock+')').hasClass('block-ice') ) {
			//slidePlayer();
			//return true;
		} else {
			// Hit player
			if (id != 1) {
				var playerElement = $('.the-fucking-player');
				var player_id = $('.the-fucking-player').attr('data-id');
				var player_block = blUtil.getObjectCurrentBlock(player_id);
				//blUtil.log('moving id:'+movingObject_id+' to block:'+movingObject_nextblock+' |||| player is on block:'+player_block);

				if (movingObject_nextblock == player_block) {
					blUtil.log('BLOCKED BY PLAYER');
					collide = true;
				}
			// Hit animal
			} else if ($('.the-fucking-deer').length != 0) {
				$('.the-fucking-deer').each(function(index) {
					var blockingObject_id = $(this).attr('data-id');
					var blockingObject_block = blUtil.getObjectCurrentBlock(blockingObject_id);
				
					if (movingObject_nextblock == blockingObject_block && movingObject_id != blockingObject_id) {
						//alert('BLOCKED BY ANIMAL: moving id:'+movingObject_id+' to block:'+movingObject_nextblock+' |||| animal id:'+blockingObject_id+' is on block:'+blockingObject_block);
						collide = true;
					}
				});
			// Walkable land
			} else {
				collide = false;
			}

		}	

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

	getObjectDirection(id, name) {
		var direction;
		var selecteditem = blUtil.getSelectedItem();
		var playergraphic;
		if ( (selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "bike" || selecteditem == "skiis") && name == "player" ) { 
			playergraphic = "-"+selecteditem;
		} else {
			playergraphic = "";
		}

		if ($('.objectid-'+id).hasClass(name+"-direction-down")) {
			direction = "down";
		} else if ($('.objectid-'+id).hasClass(name+"-direction-up")) {
			direction = "up";
		} else if ($('.objectid-'+id).hasClass(name+"-direction-left")) {
			direction = "left";
		} else if ($('.objectid-'+id).hasClass(name+"-direction-right")) {
			direction = "right";
		}

		return direction;
	}

	teleportObjectToBlock(objectId, destinationMap, destinationBlock) {
		var left = blUtil.getBlockLeftByID(destinationBlock);
		var top = blUtil.getBlockTopByID(destinationBlock);
		blUtil.setObjectCurrentPositionX(objectId,left);
		blUtil.setObjectCurrentPositionY(objectId,top);
	}

	walkPlayerToBlock(id, destinationblock) {
		this.stopObjectMovement();
		var playerblock = blUtil.getObjectCurrentBlock('1');
		//var destinationblocktype = blUtil.getBlockType(destinationblock);
		//blUtil.log("destinationblock: "+destinationblock);
		//blUtil.log("playerblock: "+playerblock);

		if (playerblock == destinationblock) {
			//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
			blAction.playerPrimaryAction(destinationblock); 
			return;
		} else if ((playerblock-globals.mapwidth-1) == destinationblock) {
			//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
			blAction.playerPrimaryAction(destinationblock); 
			return;
		} else if ((playerblock+globals.mapwidth-1) == destinationblock) {
			//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
			blAction.playerPrimaryAction(destinationblock); 
			return;
		} else if ((playerblock-2) == destinationblock) {
			//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
			blAction.playerPrimaryAction(destinationblock); 
			return;
		}

		//blUtil.log("move object ID#"+id+" to block"+destinationblock);
		this.objectbrain = setTimeout(this.anObjectMovement(id), globals.enemyspeed);
		this.destinationblockColumn = destinationblock % globals.mapwidth;
		this.destinationblockRow = parseInt(destinationblock / globals.mapwidth);

		//blUtil.log("destinationblock:"+destinationblock);
		//blUtil.log("destinationblockCol:"+destinationblockColumn);
		//blUtil.log("destinationblockRow:"+destinationblockRow);

	}

	stopObjectMovement() {
		//alert("stop tha shit!");
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
		//var r = Math.random();

		//if player stuck abort!
		// if (this.objectPath[n-1] == this.objectPath[n]) {
		// 	blUtil.log("OBJECT STUCK, ABORTING");
		// 	stopObjectMovement();
		// 	return;
		// }
		
		if ( (xDifference == 0) && (yDifference == 0) ) {
			//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
			blUtil.log("reached destination block, stop moving");
			//alert("i made it to the spot you clicked!");
			this.stopObjectMovement();
		} else if (POSxDifference >= POSyDifference) {
			if (xDifference >= 0) { 
				//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
				this.moveObject("right", id, "player");
			} else { 
				//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
				this.moveObject("left", id, "player");
			}
		} else {
			if (yDifference >= 0) { 
				//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
				this.moveObject("up", id, "player");
			} else { 
				//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
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

		blUtil.log('nextCubeSide**************'+nextCubeSide);
		blUtil.log('nextMap**************'+nextMap);
		blUtil.log('toMap**************'+toMap);

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
		
		blUtil.log('currentBlock**************'+currentBlock);
		blUtil.log('mapwidth**************'+mapwidth);
		blUtil.log('mapwidth * mapheight**************'+mapwidth * mapheight);
		blUtil.log('nextBlock**************'+nextBlock);

		// remove player from current map
		object.detach();

		// rotate the cube
		blCube.rotateCubeTo(nextCubeSide);

		// add player to new map
		object.appendTo(toMap);
		this.teleportObjectToBlock(1, nextMap, nextBlock);
	}

}