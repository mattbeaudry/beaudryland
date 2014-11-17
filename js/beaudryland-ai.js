


/////////////
//  AI: ENEMY, ANIMALS, MOVEOBJECTTOBLOCK
/////////////



moveObjectToBlock = function(id, destinationblock) {

	stopObjectMovement();

	trace("move object ID#"+id+" to block"+destinationblock);
	var t = 0;
	var maxthoughts = 100;
	var objectbrain = setTimeout(anObjectMovement, enemyspeed);

	var destinationblockColumn = destinationblock % mapwidth;
	var destinationblockRow = parseInt(destinationblock / mapwidth);

	trace("destinationblock:"+destinationblock);
	trace("destinationblockCol:"+destinationblockColumn);
	trace("destinationblockRow:"+destinationblockRow);
	
	//collection of thoughts
	var objectPath = Array();
	
	function anObjectMovement() {

		//check if enemy isnt dead
		if ($('.objectid-'+id).length != 0) {
	
			var objectX = getObjectCurrentCol(id); 
			var objectY = getObjectCurrentRow(id);

			var n = objectPath.length;
			objectPath.push(objectX+"-"+objectY);

			//if player stuck abort!
			if (objectPath[n-1]==objectPath[n]) {

				//alert("OBJECT STUCK, ABORTING");
				
				stopObjectMovement();

			}

			var xDifference = destinationblockColumn - objectX; 
			var yDifference = objectY - destinationblockRow;
			var POSxDifference = Math.abs(xDifference); 
			var POSyDifference = Math.abs(yDifference);
			
			if ( (xDifference == 0) && (yDifference == 0) ){
				//trace("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
				//trace("reached destination block, stop moving");
				//alert("i made it to the spot you clicked!");
				stopObjectMovement();
			} else if (POSxDifference >= POSyDifference) {
				if (xDifference >= 0) { 
					//trace("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
					moveObjectRight(id, "player");
				} else { 
					//trace("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
					moveObjectLeft(id, "player");
				}
			} else {
				if (yDifference >= 0) { 
					//trace("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
					moveObjectUp(id, "player");
				} else { 
					//trace("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
					moveObjectDown(id, "player");
				}
			}
			
			
			//limit

			if (t > 10) {
				//trace("Enemy terminated");
				stopObjectMovement();
				//killEnemy(id);
			} else {
				t++;
				objectbrain = setTimeout(anObjectMovement, playerspeed); // repeat thought
			}

		}
		
	}

	function stopObjectMovement() {
		//alert("stop tha shit!");
		clearTimeout(objectbrain);
	}
};

createEnemy = function() {
	var id = uniqueObjectID();
	trace("Create Enemy "+id);
	//var enemystartblock = 0;
	$('.the-fucking-map').append('<div data-id="'+id+'" class="objectid-'+id+' the-fucking-enemy enemy-direction-down"></div>');
	initEnemyBrain(id);
};
killEnemy = function(id) {
	trace("Kill Enemy id: "+id);
	$('.objectid-'+id).remove();
};
initEnemyBrain = function(id) {

	trace("start brain program for enemy #"+id);
	var t = 0;
	var maxthoughts = 100;
	var enemybrain = setTimeout(anEnemyThought, enemyspeed);
	
	//collection of thoughts
	var enemyPath = Array();
	
	function anEnemyThought() {

		//check if enemy isnt dead
		if ($('.objectid-'+id).length != 0) {
	
			var enemyrandom = Math.random();
			//var enemydirection;
			var enemyX = getObjectCurrentCol(id); var enemyY = getObjectCurrentRow(id);
			var playerX = getObjectCurrentCol(1); var playerY = getObjectCurrentRow(1);
			
			var n = enemyPath.length;
			enemyPath.push(enemyX+"-"+enemyY);

			trace("-----");
			trace('enemythoughtid-'+n);
			trace(enemyPath);
			trace("enemylastpos="+enemyPath[n-1]);

			//is player stuck? move random direction
			if (enemyPath[n-1]==enemyPath[n]) {

				trace("ENEMY STUCK");

				var randomDirection = Math.floor(Math.random() * 4) + 1;
				switch(randomDirection){
					case 1: moveObjectUp(id, "enemy"); break;
					case 2: moveObjectDown(id, "enemy"); break;
					case 3: moveObjectLeft(id, "enemy"); break;
					case 4: moveObjectRight(id, "enemy"); break;
				}
			}

			trace("-----");
			var PEx = playerX - enemyX; var PEy = enemyY - playerY;
			var posPEx = Math.abs(PEx); var posPEy = Math.abs(PEy);
			
			if ( (PEx == 0) && (PEy == 0)){
				//trace("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
				trace("found the player, kill player!");
				removeHeart();
			} else if (posPEx >= posPEy) {
				if (PEx >= 0) { 
					//trace("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
					moveObjectRight(id, "enemy");
				} else { 
					//trace("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
					moveObjectLeft(id, "enemy");
				}
			} else {
				if (PEy >= 0) { 
					//trace("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
					moveObjectUp(id, "enemy");
				} else { 
					//trace("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
					moveObjectDown(id, "enemy");
				}
			}
			
			//limit
			if (t > maxthoughts) {
				trace("Enemy terminated");
				stopEnemyBrain();
				killEnemy(id);
			} else {
				t++;
				enemybrain = setTimeout(anEnemyThought, enemyspeed); // repeat thought
			}

		}
		
	}

	function stopEnemyBrain() {
		clearTimeout(enemybrain);
	}
};
killAnimal = function(id) {
	trace("Kill Animal id: "+id);
	$('.objectid-'+id).remove();
};
createAnimal = function() {

	var id = uniqueObjectID();
	trace("Create Animal "+id);
	//var enemystartblock = 0;
	$('.the-fucking-map').append('<div data-id="'+id+'" class="objectid-'+id+' the-fucking-deer deer-direction-down"></div>');
	initAnimalBrain(id);
};
initAnimalBrain = function(id) {

	trace("start brain program for animal id:"+id);
	var t = 0;
	var maxthoughts = 100;
	var animalbrain = setTimeout(anAnimalThought, animalspeed);
	
	//collection of thoughts
	var animalPath = Array();
	
	function anAnimalThought() {

		//check if enemy isnt dead
		if ($('.objectid-'+id).length != 0) {
	
			var animalrandom = Math.random();
			//var enemydirection;
			var animalX = getObjectCurrentCol(id); var animalY = getObjectCurrentRow(id);
			var playerX = getObjectCurrentCol(1); var playerY = getObjectCurrentRow(1);
			
			var n = animalPath.length;
			animalPath.push(animalX+"-"+animalY);

			trace("-----");
			trace('animalthoughtid-'+n);
			trace(animalPath);
			trace("animallastpos="+animalPath[n-1]);



			//is animal stuck? move random direction
			//if (animalPath[n-1]==animalPath[n]) {

				//trace("animal STUCK");

				var randomDirection = Math.floor(Math.random() * 4) + 1;
				switch(randomDirection){
					case 1: moveObjectUp(id, "deer"); break;
					case 2: moveObjectDown(id, "deer"); break;
					case 3: moveObjectLeft(id, "deer"); break;
					case 4: moveObjectRight(id, "deer"); break;
				}
			//}

			trace("-----");

			/*
			var PEx = playerX - animalX; var PEy = animalY - playerY;
			var posPEx = Math.abs(PEx); var posPEy = Math.abs(PEy);
			
			if ( (PEx == 0) && (PEy == 0)){
				//trace("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
				trace("found the player, kill player!");
			} else if (posPEx >= posPEy) {
				if (PEx >= 0) { 
					//trace("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
					moveObjectRight(id, "animal");
				} else { 
					//trace("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
					moveObjectLeft(id, "animal");
				}
			} else {
				if (PEy >= 0) { 
					//trace("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
					moveObjectUp(id, "animal");
				} else { 
					//trace("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
					moveObjectDown(id, "animal");
				}
			}
			*/
			
			//limit
			if (t > maxthoughts) {
				trace("Animal terminated");
				stopAnimalBrain();
				killAnimal(id);
			} else {
				t++;
				animalbrain = setTimeout(anAnimalThought, animalspeed); // repeat thought
			}

		}
		
	}
	function stopAnimalBrain() {
		clearTimeout(animalbrain);
	}
};


