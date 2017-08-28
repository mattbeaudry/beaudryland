import * as globals from './globals';

import { Utility } from './utility'; 
import { Movement } from './movement'; 
var blUtil = new Utility();
var blMovement = new Movement();

export class Animal {

	constructor() {
		this.maxthoughts = 100;
	}

	createAnimal() {
		var id = globals.uniqueObjectID();
		blUtil.log("Create Animal "+id);
		//var enemystartblock = 0;
		$('.the-fucking-forest-map').append('<div data-id="'+id+'" class="objectid-'+id+' the-fucking-deer deer-direction-down"></div>');
		this.initAnimalBrain(id);
	}

	killAnimal(id) {
		blUtil.log("Kill Animal id: "+id);
		$('.objectid-'+id).remove();
	}

	initAnimalBrain(id) {
		blUtil.log("start brain program for animal id:"+id);
		var t = 0;
		var animalbrain = setTimeout(anAnimalThought, globals.animalspeed);
		
		//collection of thoughts
		var animalPath = Array();
		
		function anAnimalThought() {

			//check if enemy isnt dead
			if ($('.objectid-'+id).length != 0) {
		
				var animalrandom = Math.random();
				//var enemydirection;
				var animalX = blUtil.getObjectCurrentCol(id); var animalY = blUtil.getObjectCurrentRow(id);
				var playerX = blUtil.getObjectCurrentCol(1); var playerY = blUtil.getObjectCurrentRow(1);
				
				var n = animalPath.length;
				animalPath.push(animalX+"-"+animalY);

				//blUtil.log("-----");
				//blUtil.log('animalthoughtid-'+n);
				//blUtil.log(animalPath);
				//blUtil.log("animallastpos="+animalPath[n-1]);

				//is animal stuck? move random direction
				//if (animalPath[n-1]==animalPath[n]) {

					//blUtil.log("animal STUCK");

					var randomDirection = Math.floor(Math.random() * 4) + 1;
					switch(randomDirection) {
						case 1: blMovement.moveObject("up", id, "deer"); break;
						case 2: blMovement.moveObject("down", id, "deer"); break;
						case 3: blMovement.moveObject("left", id, "deer"); break;
						case 4: blMovement.moveObject("right", id, "deer"); break;
					}
				//}

				//blUtil.log("-----");

				/*
				var PEx = playerX - animalX; var PEy = animalY - playerY;
				var posPEx = Math.abs(PEx); var posPEy = Math.abs(PEy);
				
				if ( (PEx == 0) && (PEy == 0)) {
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
					blUtil.log("found the player, kill player!");
				} else if (posPEx >= posPEy) {
					if (PEx >= 0) { 
						//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
						blMovement.moveObject("right", id, "animal");
					} else { 
						//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
						blMovement.moveObject("left", id, "animal");
					}
				} else {
					if (PEy >= 0) { 
						//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
						blMovement.moveObject("up", id, "animal");
					} else { 
						//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
						blMovement.moveObject("down", id, "animal");
					}
				}
				*/
				
				//limit
				// if (t > this.maxthoughts) {
				// 	blUtil.log("Animal terminated");
				// 	stopAnimalBrain();
				// 	killAnimal(id);
				// } else {
					t++;
					animalbrain = setTimeout(anAnimalThought, globals.animalspeed); // repeat thought
				// }

			}
			
		}

		function stopAnimalBrain() {
			clearTimeout(animalbrain);
		}
	}

}