

/////////////
//  *PLAYER PRIMARY ACTION
/////////////



playerPrimaryAction = function() {

	var id = 1;
	//trace("Player primary action");
	//find block that the player is facing
	var direction = getObjectDirection(id, "player");
	var playerblock = getObjectCurrentBlock(id);
	var block = getObjectCurrentBlock(id);
	
	//trace("1-"+direction);
	//trace("2-"+playerblock);
	//trace("3-"+block);
	
	var selecteditem = getSelectedItem();
	switch (direction) {
		case "up": block = block - (mapwidth+1); break;
		case "down": block = block + (mapwidth-1); break;
		case "left": block = block - 2; break;
		case "right": block = block; break;
	}
	
	//trace("4-hitblock "+block);
	
	var blocktype = getBlockType(block);
	//trace("5-blocktype "+blocktype);

	//item swing animations
	if (selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "axe"){
		var swingclass = "player-direction-"+direction+"-"+selecteditem+"-swing";
		$(".the-fucking-player").addClass("player-direction-"+direction+"-"+selecteditem+"-swing");
		var swinganimation = setTimeout(removeSwingClass, 100);
		function removeSwingClass(swingclass) {
			$(".the-fucking-player").removeClass("player-direction-"+direction+"-"+selecteditem+"-swing");
		}	
		var playerblock = getObjectCurrentBlock(id);	
		//trace("5-playerblock "+playerblock);

		//killing the enemy
		if ($('.the-fucking-enemy').length != 0) {
			$('.the-fucking-enemy').each(function(index) {
				var enemyid = $(this).attr('data-id');
				var enemyblock = getObjectCurrentBlock(enemyid);
				if (block == enemyblock || enemyblock == playerblock){
					trace("killed an enemy!");
					killEnemy(enemyid);
				}
			});
		}  
	}
	
	$('.block:eq('+block+')').animate({ opacity: 0.9 }, 50, function() {
		$('.block:eq('+block+')').css("opacity","1");
		var selecteditem = getSelectedItem();

		//use axe to collect doors, signs and other mechnism objects
		if ( (selecteditem == "axe") &&  ((blocktype == "door") || (blocktype == "door-open") ) ) {
			addToInventory("door", 1);
			changeBlockType(block, "grass");
		} else if ( (selecteditem == "axe") && (blocktype == "sign") ) {
			addToInventory("sign", 1);
			changeBlockType(block, "grass");
		} else if ( (selecteditem == "axe") && (blocktype == "fire") ) {
			addToInventory("fire", 1);
			changeBlockType(block, "grass");
			//growGrass(block);

		//eating for hearts
		} else if (selecteditem == "heart") {
			addHeart();
		} else if (selecteditem == "apple") {
			addHeart();

		//open/close doors
		} else if (blocktype == "door") {
			changeBlockType(block, "door-open");
		} else if (blocktype == "door-open") {
			changeBlockType(block, "door");

		//throw frisbee
		} else if (selecteditem == "frisbee"){
			throwFrisbee(block, direction);

		//throw spear
		} else if (selecteditem == "spear"){
			throwSpear(block, direction);

		//digging - forest map
		} else if ( (getSelectedItem() == "shovel") && ((blocktype == "grass") || (blocktype == "dirt")) ){
			trace("dig!");
			//chance of digging a diamond
			var r = Math.random();
			if (r < 0.5) {
				trace("diamond!");
				changeBlockType(block, "diamond-hole");
			} else {
				changeBlockType(block, "dirt");
			}
			addToInventory(blocktype, 5);
			addToInventory('dirt', 5);
			//growGrass(block);

		//digging - winter map
		} else if ( getSelectedItem() == "shovel" && ( blocktype == "snow" || blocktype == "frozendirt" || blocktype == "ice" ) ){
			//chance of digging gold
			var r = Math.random();
			if (r < 0.2) {
				trace("gold!");
				changeBlockType(block, "gold-hole");
			} else if (r < 0.4) {
				trace("silver!");
				changeBlockType(block, "silver-hole");
			} else {
				changeBlockType(block, "frozendirt");
			}
			addToInventory(blocktype, 5);
			addToInventory('frozendirt', 5);
			//growGrass(block);

		//digging - beach map
		} else if ( getSelectedItem() == "shovel" && ( blocktype == "sand" || blocktype == "wetsand" ) ){
			//chance of digging gold
			var r = Math.random();
			if (r < 0.2) {
				trace("oil!");
				changeBlockType(block, "oil-hole");
			} else if (r < 0.4) {
				trace("clay!");
				changeBlockType(block, "clay-hole");
			} else {
				changeBlockType(block, "wetsand");
			}
			addToInventory(blocktype, 5);
			addToInventory('wetsand', 5);
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
					trace("fill hole/water with dirt, sand or snow");
					changeBlockType(block, getSelectedItem());
					removeFromInventory(getSelectedItem());
					//growGrass(block);
					if(blocktype=="water"||blocktype=="wave"){ addToInventory("water", 5); }
			}
			
		//read sign
		} else if (blocktype == "sign") {
			trace("reading sign");
			readSign(block);

		//placing blocks
		} else if ( (blocktype == "grass") || (blocktype == "dirt") || (blocktype == "hole") ||
		     (blocktype == "snow") || (blocktype == "frozendirt") || (blocktype == "ice") ||
		     (blocktype == "sand") || (blocktype == "wetsand") || (blocktype == "water") ) {
			//check for selected placable block in inventory
			//trace('selected item is '+selecteditem);
			//trace('blocktype is '+blocktype);
			if ( $.inArray(selecteditem, isplaceable) > -1 ){
				//placing/writing on a sign
				if (selecteditem == "sign"){
					placeSign(1, block);
				}
				trace('a placable item is selected');
				removeFromInventory(selecteditem);
				changeBlockType(block, selecteditem);
			}

		//picking up items & blocks	
		} else if ($.inArray(blocktype, iscollectable) > -1){
			var changeblocktotype = "dirt";
			if (blocktype == "diamond-hole") { blocktype = "diamond"; changeblocktotype = "dirt"; } 
			else if (blocktype == "gold-hole") { blocktype = "gold"; changeblocktotype = "frozendirt"; } 
			else if (blocktype == "silver-hole") { blocktype = "silver"; changeblocktotype = "frozendirt"; }
			else if (blocktype == "oil-hole") { blocktype = "oil"; changeblocktotype = "wetsand"; }
			else if (blocktype == "clay-hole") { blocktype = "clay"; changeblocktotype = "wetsand"; }
			addToInventory(blocktype, "5");
			changeBlockType(block, changeblocktotype);
			//growGrass(block);

			//appletrees give player apples
			if (blocktype == "appletree") {
				addToInventory("apple", "5");
			}
		}

	});
};
