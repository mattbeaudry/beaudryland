import * as globals from './globals';
import { Utility } from './utility';
var blUtil = new Utility();

export class Player {

	constructor() {

	}

	createPlayer(id) {
		blUtil.log("Create Player");
		//var playerstartblock = 466;
		//blMap.changeBlockType(playerstartblock, "grass"); //make sure player doesn't start overtop an obstacle
		//var id = globals.uniqueObjectID();
		var id = 1;
		$('.the-fucking-forest-map').append('<div data-id='+id+' data-blockhealth="5" class=" objectid-'+id+' the-fucking-player player-direction-down"></div>');
	}

	savePlayer() {
		blUtil.log("SAVE PLAYER");
		var playerdiv = $('.the-fucking-player').prop("outerHTML");
		//playerdiv = playerdiv.toString();
		var selecteditem = $('.the-fucking-inventory .selected-item').attr("data-blocktype");
		//var selecteditem = "sword";
		blUtil.log("playerdiv"+playerdiv);
		blUtil.log("selected item"+selecteditem);
	    var inventoryItems = new Array();
		for (var i=1; i<=globals.inventoryslots; i++) { 
			inventoryItems[i]=new Object();
		}
		$('.the-fucking-inventory > div').each(function(index) {
			var amount = $(this).html();
			var blocktype = $(this).attr('data-blocktype');
			blUtil.log("inventory slot "+index+" = "+amount+blocktype);
			inventoryItems[index] = {type:blocktype, amount:amount};
		});
		blUtil.log("saved inventory");
		inventoryItems = JSON.stringify(inventoryItems);

		//saving signs
		var signs = [];
		$('.maps-wrap .block-sign').each(function(index) {
			var blockid = $(this).attr('data-blockid');
			var signmessage = $(this).attr('data-text');
			blUtil.log("signid:"+blockid+"---"+signmessage);
			signs[index] = {id:blockid, text:signmessage};
		});
		blUtil.log("saved signs");
		signs = JSON.stringify(signs);

		//saving achievements
		var achievements = [];
		$('.item-achievements .status-completed').each(function(index) {
			var achievementid = $(this).attr('data-achievementid');
			var achievementname = $(this).attr('data-achievementname');
			achievements[index] = {achievementid:achievementid, achievementname:achievementname};
			blUtil.log(achievementname);
		});
		achievements = JSON.stringify(achievements);

		//blUtil.log('signs'+signs);
		/*
			var signmessages = new Array();
			for (var i=1; i<=globals.inventoryslots; i++) { 
				inventoryItems[i]=new Object();
			}
		    for (var i=0; i<=total; i++) {
		    	var blocktype = $('.the-fucking-forest-map div:eq('+i+')').attr('data-blocktype');
				mapblocks[i] = blocktype;
				if (blocktype == sign) {
					var signmsg = $('.the-fucking-forest-map div:eq('+i+')').attr('data-text');
				}
			}
			signmessages = JSON.stringify(signmessages);
		*/

		blUtil.log("before send player div to db:"+playerdiv);

		$.post('php/saveplayer.php', {inventory: inventoryItems, playerdiv: playerdiv, selecteditem: selecteditem, signs: signs, achievements: achievements}, function(data) {
	        blUtil.log("saved player: "+data);
	    });

	}

	loadPlayer(id) {
		blUtil.log("loadplayer");
		$.post('php/loadplayer.php', {}, function(data) {
	    	var inventoryitems = JSON.parse(data.inventory);
	    	var playerdiv = data.playerdiv;
	    	var selecteditem = data.selecteditem;
	    	blUtil.log("loading playerdiv="+playerdiv);
	    	$('.the-fucking-forest-map').append(playerdiv);
	        blUtil.log("loading inv");
	    	for (var i = 0; i < (inventoryitems.length-1); i++) {
	    		$('.the-fucking-inventory > div:eq('+i+')').html(inventoryitems[i].amount);
	    		if (inventoryitems[i].amount !== "0") {
	    			$('.the-fucking-inventory > div:eq('+i+')').attr('data-blocktype', inventoryitems[i].type);
	    			$('.the-fucking-inventory > div:eq('+i+')').removeClass('empty');
	    			$('.the-fucking-inventory > div:eq('+i+')').addClass('block block-'+inventoryitems[i].type);
	    		}
			}
			blUtil.log("loading selected item");
	    	$('.the-fucking-inventory div').not('.the-fucking-inventory .block-'+selecteditem).removeClass('selected-item');
	    	$('.the-fucking-inventory .block-'+selecteditem).addClass('selected-item');

	    	// LOADING SIGNS
	    	var signs = JSON.parse(data.signs);
	    	blUtil.log('loading signs...'+signs);

	    	for (var j=0;j<signs.length;j++) {

	    		var signid = signs[j].id;
	    		var signtext = signs[j].text;
	    		if (signtext!=null) {
	    			//blUtil.log($(".maps-wrap").find("[data-blockid='"+signid+"']"));
	    			blUtil.log(signid+'--'+signtext);
	    			//blUtil.log($('.block').find("[data-blockid='"+signid+"']").data("text",signtext) );

	    			$('.maps-wrap').find("[data-blockid='"+signid+"']").attr("data-text",signtext);

	    			//// console.log(sign);
	    			//sign[0].attr('data-blocktype',signtext);
	    			//$('.block').find("[data-blockid='"+signid+"']").attr("data-text",signtext);
	    			//blUtil.log('');
	    		}
	    		//$("ul").find("[data-slide='" + current + "']");
	    		
	    	}

	    	// LOADING ACHIEVEMENTS
	    	var achievements = JSON.parse(data.achievements);
	    	
	    	for (var k=0;k<achievements.length;k++) {
	    		var achievementid = achievements[k].achievementid;
	    		var achievementname = achievements[k].achievementname;
	    		blUtil.log(achievementname);
	    		if (achievementname!=null) {
	    			$('.item-achievements .achievement-'+achievementname).addClass("status-completed");
	    		}
	    	}
	    
	    }, "json");
	}

	walkPlayerToBlock(id, destinationblock) {

		stopObjectMovement();

		var playerblock = blUtil.getObjectCurrentBlock('1');
		//var destinationblocktype = blUtil.getBlockType(destinationblock);
		//blUtil.log("destinationblock: "+destinationblock);
		//blUtil.log("playerblock: "+playerblock);

		if (playerblock == destinationblock) {
			//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
			playerPrimaryAction(destinationblock); 
			return;
		} else if ((playerblock-globals.mapwidth-1) == destinationblock) {
			//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
			playerPrimaryAction(destinationblock); 
			return;
		} else if ((playerblock+globals.mapwidth-1) == destinationblock) {
			//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
			playerPrimaryAction(destinationblock); 
			return;
		} else if ((playerblock-2) == destinationblock) {
			//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
			playerPrimaryAction(destinationblock); 
			return;
		}

		//blUtil.log("move object ID#"+id+" to block"+destinationblock);
		var t = 0;
		var maxthoughts = 100;
		objectbrain = setTimeout(anObjectMovement, globals.enemyspeed);

		var destinationblockColumn = destinationblock % globals.mapwidth;
		var destinationblockRow = parseInt(destinationblock / globals.mapwidth);

		//blUtil.log("destinationblock:"+destinationblock);
		//blUtil.log("destinationblockCol:"+destinationblockColumn);
		//blUtil.log("destinationblockRow:"+destinationblockRow);
		
		//collection of thoughts
		var objectPath = [];

		function stopObjectMovement() {
			//alert("stop tha shit!");
			clearTimeout(objectbrain);
		}
		
		function anObjectMovement() {

			var objectX = blUtil.getObjectCurrentCol(id) - 1; 
			var objectY = blUtil.getObjectCurrentRow(id) - 1;
			var n = objectPath.length;
			objectPath.push(objectX+"-"+objectY);

			var xDifference = destinationblockColumn - objectX;
			var yDifference = objectY - destinationblockRow;
			var POSxDifference = Math.abs(xDifference);
			var POSyDifference = Math.abs(yDifference);
			//var r = Math.random();
			//alert(r);

			//if player stuck abort!
			/*
			if (objectPath[n-1] == objectPath[n]) {
				blUtil.log("OBJECT STUCK, ABORTING");
				stopObjectMovement();
				return;
			}
			*/
			
			if ( (xDifference == 0) && (yDifference == 0) ) {
				//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
				blUtil.log("reached destination block, stop moving");
				//alert("i made it to the spot you clicked!");
				stopObjectMovement();
			} else if (POSxDifference >= POSyDifference) {
				if (xDifference >= 0) { 
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy); 
					moveObject("right", id, "player");
				} else { 
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy); 
					moveObject("left", id, "player");
				}
			} else {
				if (yDifference >= 0) { 
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy); 
					moveObject("up", id, "player");
				} else { 
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy); 
					moveObject("down", id, "player");
				}
			}
			
			//limit

			if (t > 10) {
				//blUtil.log("Enemy terminated");
				stopObjectMovement();
				//killEnemy(id);
			} else {
				t++;
				objectbrain = setTimeout(anObjectMovement, globals.playerspeed); // repeat thought
			}
		
		}

		
	};


}