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
		this.mapanimate;
		this.ridingbike;
	}

	moveObject(direction, id, name) {
		var success = false;
		var x = blUtil.getObjectCurrentPositionX(id);
		var y = blUtil.getObjectCurrentPositionY(id);
		x = blUtil.stripPX(x);
		y = blUtil.stripPX(y);
		const currentMap = globals.getCurrentMap();

		console.log(currentMap);

		this.changeObjectDirection(id, direction, name);

		if (!this.objectCollisionDetection(id, direction, currentMap)) {
			switch (direction) {
				case "up": 
					y = y - globals.gridunitpx; 
					y = blUtil.addPX(y);
					$(".objectId-"+id).css("top",y); 
					break;
				case "down": 
					y = y + globals.gridunitpx; 
					y = blUtil.addPX(y);
					$(".objectId-"+id).css("top",y); 
					break;
				case "left": 
					x = x - globals.gridunitpx;
					x = blUtil.addPX(x);
					$(".objectId-"+id).css("left",x); 
					break;
				case "right": 
					x = x + globals.gridunitpx; 
					x = blUtil.addPX(x);
					$(".objectId-"+id).css("left",x); 
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
		var nextBlockType = blUtil.getBlockType(nextblock, globals.getCurrentMap());

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
		// } else if (selecteditem == "rocket") {
		// 	collide = true;

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
		// animated items
		var playergraphic;
		if ( selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "axe" || selecteditem == "bike" || selecteditem == "skiis" || selecteditem == "car" || selecteditem == "canoe" || selecteditem == "rocket" && name == "player" ) { 
			playergraphic = "-"+selecteditem;
		} else {
			playergraphic = "";
		}

		//clear direction and animation classes
		$('.objectId-'+id).removeClass(name+"-direction-down "+name+"-direction-left "+name+"-direction-right "+name+"-direction-up");
		$('.objectId-'+id).removeClass(name+"-direction-down"+playergraphic+" "+name+"-direction-left"+playergraphic+" "+name+"-direction-right"+playergraphic+" "+name+"-direction-up"+playergraphic);

		switch (direction) {
			case "up":
				$('.objectId-'+id).addClass(name+"-direction-up");
				if (playergraphic!="") { $('.objectId-'+id).addClass(name+"-direction-up"+playergraphic); }
				break;
			case "down":
				$('.objectId-'+id).addClass(name+"-direction-down");
				if (playergraphic!="") { $('.objectId-'+id).addClass(name+"-direction-down"+playergraphic); }
				break;
			case "left":
				$('.objectId-'+id).addClass(name+"-direction-left");
				if (playergraphic!="") { $('.objectId-'+id).addClass(name+"-direction-left"+playergraphic); }
				break;
			case "right":
				$('.objectId-'+id).addClass(name+"-direction-right");
				if (playergraphic!="") { $('.objectId-'+id).addClass(name+"-direction-right"+playergraphic); }
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
		console.log("")
		console.log("")
		console.log("moveObjectToMap")

		const currentMap = globals.getCurrentMap();
		const currentCubeSide = globals.getCurrentCubeSide();

		globals.setCurrentMap(globals.cubeSidesArray[globals.getCurrentCubeSide()].map);

		let movePlayerFromEdge;

		switch (objectDirection) {
			case 'left':
				movePlayerFromEdge = 'left';
				break;
			case 'right':
				movePlayerFromEdge = 'right';
				break;
			case 'up':
				movePlayerFromEdge = 'top';
				break;
			case 'down':
				movePlayerFromEdge = 'bottom';
				break;
		}

		var object = $('.objectId-'+objectId);
		var currentBlock = objectCurrentBlock;

		// find out what map and side of cube is next
		var nextCubeSide = globals.cubeSidesArray[globals.getCurrentCubeSide()][objectDirection];
		var nextMap = globals.cubeSidesArray[nextCubeSide].map;
		var toMap = $('.the-fucking-'+nextMap+'-map');

		// find out what block on next map to move to
		var mapwidth = globals.mapwidth;
		var mapheight = globals.mapheight;
		var nextBlock = 0;

		const destinationSquareSide = {
			front: {
				left: 'right',
				right: 'left',
				top: 'bottom',
				bottom: 'top',
			},
			left: { 
				back: 'right',
				front: 'left',
				top: 'left',
				bottom: 'left',
			},
			back: {
				left: 'left',
				right: 'right',
				top: 'top',
				bottom: 'top',
			},
			right: {
				front: 'right',
				back: 'left',
				top: 'right',
				bottom: 'right',
			},
			top: {
				left: 'top',
				right: 'top',
				front: 'top',
				back: 'top',
			},
			bottom: {
				left: 'bottom',
				right: 'bottom',
				front: 'bottom',
				back: 'bottom',
			},
		};

		const movePlayerToEdge = destinationSquareSide[currentCubeSide][nextCubeSide];
		if (nextCubeSide === 'top') {
			switch (currentCubeSide) {
				case 'front':
					nextBlock = currentBlock + (mapwidth * mapheight) - mapwidth;
					break;
				case 'left':
					nextBlock = currentBlock * mapwidth; 
					break;
				case 'back':
					nextBlock = mapwidth - currentBlock - 1;
					break;
				case 'right':
					nextBlock = (mapwidth * 10) - (currentBlock * mapwidth) -1;
					break;
			}
		} else if (currentCubeSide === 'top') {
			switch (nextCubeSide) {
				case 'front':
					nextBlock = currentBlock - (mapwidth * mapheight) + mapwidth;
					break;
				case 'left':
					nextBlock = (currentBlock / mapwidth);
					break;
				case 'back':
					nextBlock = mapwidth - currentBlock - 1;
					break;
				case 'right':
					nextBlock = mapwidth - (currentBlock / mapwidth);
					break;
			}
		} else if (nextCubeSide === 'bottom') {
			switch (currentCubeSide) {
				case 'front':
					nextBlock = currentBlock - (mapwidth * mapheight) + mapwidth;	
					break;
				case 'left':
					nextBlock = (mapwidth - (currentBlock - ((mapwidth * mapwidth) - mapwidth))) * mapwidth - mapwidth;
					break;
				case 'back':
					nextBlock = ((mapwidth * mapwidth) - mapwidth) + (mapwidth - currentBlock % mapwidth) - 1;
					break;
				case 'right':
					nextBlock = ((currentBlock % mapwidth) * mapwidth) + mapwidth + mapwidth - 1;
					break;
			}
		} else if (currentCubeSide === 'bottom') {
			switch (nextCubeSide) {
				case 'front':
					nextBlock = currentBlock + (mapwidth * mapheight) - mapwidth;
					break;
				case 'left':
					nextBlock = ((mapwidth - (currentBlock / mapwidth)) + ((mapwidth * mapheight) - mapwidth)) - 1;
					break;
				case 'back':
					nextBlock = (mapwidth - (currentBlock % mapwidth)) + ((mapwidth * mapwidth) - mapwidth) - 1;
					break;
				case 'right':
					nextBlock = (currentBlock / mapwidth) + ((mapwidth * mapheight) - mapwidth) - 1;
					break;
			}
		} else if (objectDirection === 'left') {
			nextBlock = currentBlock + mapwidth - 1;
		} else if (objectDirection === 'right') {
			nextBlock = currentBlock - (mapwidth - 1);
		}

		// console.log(`moving player from ${currentMap} map to ${nextMap} map`);
		// console.log(`moving player from ${currentCubeSide} cube face to ${nextCubeSide} cube face`);
		// console.log(`moving player from ${movePlayerFromEdge} edge to ${movePlayerToEdge} edge`);
		// console.log(`moving player from block ${currentBlock} to block ${nextBlock}`);

		// remove player from current map
		object.detach();

		// rotate the cube
		if (objectId == 1) {
			blCube.rotateCubeTo(nextCubeSide);	
		}

		globals.setCurrentMap(nextMap);

		// add player to new map
		object.appendTo(toMap);

		blUtil.teleportObjectToBlock(1, nextMap, nextBlock);
	};

	moveBike(direction) {
		blUtil.log("move bike "+direction);
		var playerdirection = blUtil.getObjectDirection(1, "player");
		blUtil.log("player current direction: "+playerdirection);

		switch (direction) {
			case "up": this.moveObject("up", 1, "player"); break;
			case "down": this.moveObject("down", 1, "player"); break;
			case "left": this.moveObject("left", 1, "player"); break;
			case "right": this.moveObject("right", 1, "player"); break;
		}
		// this.ridingbike = setTimeout(function() {
		// 	this.startBiking(direction);
		// }, globals.bikespeed); // repeat movement
	};

	stopBike() {
		clearTimeout(this.ridingbike);
	};

	rideBike(direction) {
		blUtil.log("rideBike");
		this.stopBike();

		this.ridingbike = setInterval(function() {
			this.moveBike(direction);
		}.bind(this), globals.bikespeed);

		// var playerdirection = blUtil.getObjectDirection(1, "player");

		// if (playerdirection == "left" && direction == "right") { 
		// 	this.changeObjectDirection(1, "right", "player");
		// } else if (playerdirection == "right" && direction == "left") { 
		// 	this.changeObjectDirection(1, "left", "player");
		// } else if (playerdirection == "up" && direction == "down") { 
		// 	this.changeObjectDirection(1, "down", "player");
		// } else if (playerdirection == "down" && direction == "up") { 
		// 	this.changeObjectDirection(1, "up", "player");
		// } else {
		// 	this.ridingbike = setTimeout(function() {
		// 		this.moveBike(direction);
		// 	}.bind(this), globals.bikespeed);
		// }
	};

	stopMap() { 
		clearTimeout(this.mapanimate); 
		this.mapanimate = null;
	};

	moveMap() {
		blUtil.log("animating the map!");
		var mapspeed = 500;
		this.mapanimate = setTimeout(scrollMap, mapspeed);
		
		function scrollMap() {
			var toprow = $('.the-fucking-winter-map div').slice(0,globals.mapwidth).remove();
			$('.the-fucking-winter-map').append(toprow);
			this.mapanimate = setTimeout(scrollMap, mapspeed); // repeat thought
		}
	};

	rideSkiis(direction) {
		if (direction == "up") {
			this.moveObject("up", 1, "player");
			this.changeObjectDirection(1,"up", "player");
			this.stopMap();
		} else {
			switch (direction) {
				case "up": this.moveObject("up",1, "player"); break;
				case "down": this.moveObject("down", 1, "player"); break;
				case "left": this.moveObject("left", 1, "player"); break;
				case "right": this.moveObject("right", 1, "player"); break;
			}
			if (this.mapanimate == null) {
				this.moveMap();
			}
		}
	};

}