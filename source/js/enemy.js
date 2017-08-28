import * as globals from './globals';

import { Utility } from './utility'; 
import { Movement } from './movement'; 
import { Health } from './health'; 
var blUtil = new Utility();
var blMovement = new Movement();
var blHealth = new Health();

export class Enemy {

	constructor() {

	}

	createEnemy() {
		var id = globals.uniqueObjectID();
		blUtil.log("Create Enemy "+id);
		//var enemystartblock = 0;
		$('.the-fucking-forest-map').append('<div data-id="'+id+'" class="objectid-'+id+' the-fucking-enemy enemy-direction-down"></div>');
		this.initEnemyBrain(id);
	}

	killEnemy(id) {
		blUtil.log("Kill Enemy id: "+id);
		$('.objectid-'+id).remove();
	}

	initEnemyBrain(id) {
		blUtil.log("start brain program for enemy #"+id);
		var t = 0;
		var maxthoughts = 100;
		var enemybrain = setTimeout(anEnemyThought, globals.enemyspeed);
		
		//collection of thoughts
		var enemyPath = Array();
		
		function anEnemyThought() {

			//check if enemy isnt dead
			if ($('.objectid-'+id).length != 0) {
		
				var enemyrandom = Math.random();
				//var enemydirection;
				var enemyX = blUtil.getObjectCurrentCol(id); var enemyY = blUtil.getObjectCurrentRow(id);
				var playerX = blUtil.getObjectCurrentCol(1); var playerY = blUtil.getObjectCurrentRow(1);
				
				var n = enemyPath.length;
				enemyPath.push(enemyX+"-"+enemyY);

				//blUtil.log("-----");
				//blUtil.log('enemythoughtid-'+n);
				//blUtil.log(enemyPath);
				//blUtil.log("enemylastpos="+enemyPath[n-1]);

				//is player stuck? move random direction
				if (enemyPath[n-1]==enemyPath[n]) {

					blUtil.log("ENEMY STUCK");

					var randomDirection = Math.floor(Math.random() * 4) + 1;
					switch(randomDirection) {
						case 1: blMovement.moveObject("up", id, "enemy"); break;
						case 2: blMovement.moveObject("down", id, "enemy"); break;
						case 3: blMovement.moveObject("left", id, "enemy"); break;
						case 4: blMovement.moveObject("right", id, "enemy"); break;
					}
				}

				//blUtil.log("-----");
				var PEx = playerX - enemyX; var PEy = enemyY - playerY;
				var posPEx = Math.abs(PEx); var posPEy = Math.abs(PEy);
				
				if ( (PEx == 0) && (PEy == 0)) {
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
					blUtil.log("found the player, kill player!");
					blHealth.removeHeart();
				} else if (posPEx >= posPEy) {
					if (PEx >= 0) { 
						//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
						blMovement.moveObject("right", id, "enemy");
					} else { 
						//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
						blMovement.moveObject("left", id, "enemy");
					}
				} else {
					if (PEy >= 0) { 
						//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
						blMovement.moveObject("up", id, "enemy");
					} else { 
						//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
						blMovement.moveObject("down", id, "enemy");
					}
				}
				
				//limit
				if (t > maxthoughts) {
					blUtil.log("Enemy terminated");
					this.stopEnemyBrain();
					this.killEnemy(id);
				} else {
					t++;
					enemybrain = setTimeout(anEnemyThought, globals.enemyspeed); // repeat thought
				}

			}
			
		}

		function stopEnemyBrain() {
			clearTimeout(enemybrain);
		}
	}

}