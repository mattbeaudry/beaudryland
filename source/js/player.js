import * as globals from './globals';
import { Utility } from './utility';
var blUtil = new Utility();

export class Player {
	constructor() {}

	createPlayer(id) {
		blUtil.log('Create Player');
		//var playerstartblock = 466;
		//blMap.changeBlockType(playerstartblock, "grass"); //make sure player doesn't start overtop an obstacle
		//var id = globals.uniqueObjectID();
		id = 1;
		document
			.querySelector('.the-fucking-forest-map')
			.insertAdjacentHTML(
				'beforeend',
				'<div data-id=' +
					id +
					' data-blockhealth="5" class=" objectId-' +
					id +
					' the-fucking-player player-direction-down"></div>'
			);
	}

	savePlayer() {
		blUtil.log('SAVE PLAYER');
		var playerEl = document.querySelector('.the-fucking-player');
		var playerdiv = playerEl ? playerEl.outerHTML : '';
		var selectedItemEl = document.querySelector('.the-fucking-inventory .selected-item');
		var selecteditem = selectedItemEl ? selectedItemEl.getAttribute('data-blocktype') : '';
		blUtil.log('playerdiv' + playerdiv);
		blUtil.log('selected item' + selecteditem);
		var inventoryItems = new Array();
		for (var i = 1; i <= globals.inventoryslots; i++) {
			inventoryItems[i] = new Object();
		}
		[...document.querySelectorAll('.the-fucking-inventory > div')].forEach(function (el, index) {
			var amount = el.innerHTML;
			var blocktype = el.getAttribute('data-blocktype');
			blUtil.log('inventory slot ' + index + ' = ' + amount + blocktype);
			inventoryItems[index] = { type: blocktype, amount: amount };
		});
		blUtil.log('saved inventory');
		inventoryItems = JSON.stringify(inventoryItems);

		//saving signs
		var signs = [];
		[...document.querySelectorAll('.maps-wrap .block-sign')].forEach(function (el, index) {
			var blockid = el.getAttribute('data-blockid');
			var signmessage = el.getAttribute('data-text');
			blUtil.log('signid:' + blockid + '---' + signmessage);
			signs[index] = { id: blockid, text: signmessage };
		});
		blUtil.log('saved signs');
		signs = JSON.stringify(signs);

		//saving achievements
		var achievements = [];
		[...document.querySelectorAll('.item-achievements .status-completed')].forEach(
			function (el, index) {
				var achievementid = el.getAttribute('data-achievementid');
				var achievementname = el.getAttribute('data-achievementname');
				achievements[index] = { achievementid: achievementid, achievementname: achievementname };
				blUtil.log(achievementname);
			}
		);
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

		blUtil.log('before send player div to db:' + playerdiv);

		fetch('php/saveplayer.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				inventory: inventoryItems,
				playerdiv: playerdiv,
				selecteditem: selecteditem,
				signs: signs,
				achievements: achievements,
			}),
		})
			.then((r) => r.text())
			.then(function (data) {
				blUtil.log('saved player: ' + data);
			});
	}

	loadPlayer(id) {
		blUtil.log('loadplayer');
		fetch('php/loadplayer.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({}),
		})
			.then((r) => r.json())
			.then(function (data) {
				var inventoryitems = JSON.parse(data.inventory);
				var playerdiv = data.playerdiv;
				var selecteditem = data.selecteditem;
				blUtil.log('loading playerdiv=' + playerdiv);
				document
					.querySelector('.the-fucking-forest-map')
					.insertAdjacentHTML('beforeend', playerdiv);
				blUtil.log('loading inv');
				var invDivs = document.querySelectorAll('.the-fucking-inventory > div');
				for (var i = 0; i < inventoryitems.length - 1; i++) {
					if (invDivs[i]) {
						invDivs[i].innerHTML = inventoryitems[i].amount;
						if (inventoryitems[i].amount !== '0') {
							invDivs[i].setAttribute('data-blocktype', inventoryitems[i].type);
							invDivs[i].classList.remove('empty');
							invDivs[i].classList.add('block', 'block-' + inventoryitems[i].type);
						}
					}
				}
				blUtil.log('loading selected item');
				[...document.querySelectorAll('.the-fucking-inventory div')].forEach(function (el) {
					if (!el.classList.contains('block-' + selecteditem)) el.classList.remove('selected-item');
				});
				var selEl = document.querySelector('.the-fucking-inventory .block-' + selecteditem);
				if (selEl) selEl.classList.add('selected-item');

				// LOADING SIGNS
				var signs = JSON.parse(data.signs);
				blUtil.log('loading signs...' + signs);

				for (var j = 0; j < signs.length; j++) {
					var signid = signs[j].id;
					var signtext = signs[j].text;
					if (signtext != null) {
						blUtil.log(signid + '--' + signtext);
						var signEl = document.querySelector('.maps-wrap [data-blockid="' + signid + '"]');
						if (signEl) signEl.setAttribute('data-text', signtext);
					}
				}

				// LOADING ACHIEVEMENTS
				var achievements = JSON.parse(data.achievements);

				for (var k = 0; k < achievements.length; k++) {
					var achievementid = achievements[k].achievementid;
					var achievementname = achievements[k].achievementname;
					blUtil.log(achievementname);
					if (achievementname != null) {
						var achEl = document.querySelector(
							'.item-achievements .achievement-' + achievementname
						);
						if (achEl) achEl.classList.add('status-completed');
					}
				}
			});
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
		} else if (playerblock - globals.mapwidth - 1 == destinationblock) {
			//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
			playerPrimaryAction(destinationblock);
			return;
		} else if (playerblock + globals.mapwidth - 1 == destinationblock) {
			//blUtil.log("dont need to move player so stop object and trigger player action on destination block");
			playerPrimaryAction(destinationblock);
			return;
		} else if (playerblock - 2 == destinationblock) {
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
			objectPath.push(objectX + '-' + objectY);

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

			if (xDifference == 0 && yDifference == 0) {
				//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" found the player, kill player!");
				blUtil.log('reached destination block, stop moving');
				//alert("i made it to the spot you clicked!");
				stopObjectMovement();
			} else if (POSxDifference >= POSyDifference) {
				if (xDifference >= 0) {
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is east"+posPEx+"<"+posPEy);
					moveObject('right', id, 'player');
				} else {
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+" player is west"+posPEx+"<"+posPEy);
					moveObject('left', id, 'player');
				}
			} else {
				if (yDifference >= 0) {
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is north"+posPEx+">"+posPEy);
					moveObject('up', id, 'player');
				} else {
					//blUtil.log("PEx:"+PEx+" PEy:"+PEy+"player is south"+posPEx+">"+posPEy);
					moveObject('down', id, 'player');
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
	}
}
