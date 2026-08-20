import * as globals from './globals';
import { setDisablekeyboardevents } from './globals';

import { Utility } from './utility';
import { Player } from './player';
import { Movement } from './movement';
import { Map } from './map/map';
import { Action } from './action';
import { Inventory } from './inventory';
import { Sound } from './sound';
import { Achievement } from './achievement';
import { Instruments } from './item/instruments';

var blUtil = new Utility();
var blPlayer = new Player();
var blMovement = new Movement();
var blMap = new Map();
var blAction = new Action();
var blInventory = new Inventory();
var blSound = new Sound();
var blAchievement = new Achievement();
var blInstruments = new Instruments();

export class HCI {
	constructor() {}

	setupKeyboardEvents() {
		blUtil.log('Keyboard Events');
		window.addEventListener(
			'keydown',
			function (event) {
				var selecteditem = blUtil.getSelectedItem();
				var direction = '';

				switch (event.code) {
					case 'ArrowLeft':
						direction = 'left';
						break;
					case 'ArrowUp':
						direction = 'up';
						break;
					case 'ArrowRight':
						direction = 'right';
						break;
					case 'ArrowDown':
						direction = 'down';
						break;
					case 'Space':
						if (globals.disablekeyboardevents == false) {
							if (document.querySelectorAll('.speech-bubble').length == 0) {
								blAction.playerPrimaryAction();
								event.preventDefault();
							} else {
								event.preventDefault();
							}
						}
						break;
					case 'Enter':
						if (document.querySelectorAll('.speech-bubble').length == 0) {
							document.querySelector('.bubble-form').dispatchEvent(new Event('submit'));
							event.preventDefault();
						}
						break;
					case 'Digit1':
						document
							.querySelectorAll('.the-fucking-inventory > div')[0]
							.dispatchEvent(new Event('click'));
						break;
					case 'Digit2':
						document
							.querySelectorAll('.the-fucking-inventory > div')[1]
							.dispatchEvent(new Event('click'));
						break;
					case 'Digit3':
						document
							.querySelectorAll('.the-fucking-inventory > div')[2]
							.dispatchEvent(new Event('click'));
						break;
					case 'Digit4':
						document
							.querySelectorAll('.the-fucking-inventory > div')[3]
							.dispatchEvent(new Event('click'));
						break;
					case 'Digit5':
						document
							.querySelectorAll('.the-fucking-inventory > div')[4]
							.dispatchEvent(new Event('click'));
						break;

					// case 69: // E
					// break;
					// case 77: // M
					// break;
					// case 75: // K
					// break;
					// case 66: // B
					// break;
					// case 67: // C
					// break;
					// case 65: // A
					// break;
					// case 68: // D
					// break;
					// case 69: // E
					// break;
					// case 70: // F
					// break;
					// case 71: // G
					// break;
				}

				function playInstrument(instrument) {
					// make noise
					blSound.playInstrumentNote(instrument, direction);

					// show music note
					blInstruments.showMusicNote();

					// animate strumming guitar or playing instrument
					document
						.querySelector('.the-fucking-player')
						.classList.add('player-direction-down-' + selecteditem + '-swing');
					setTimeout(removeSwingClass, 100);
					function removeSwingClass() {
						document
							.querySelector('.the-fucking-player')
							.classList.remove('player-direction-down-' + selecteditem + '-swing');
					}
				}

				if (globals.disablekeyboardevents == false && direction != '') {
					switch (selecteditem) {
						// MUSICAL INSTRUMENTS

						case 'guitar':
							playInstrument(selecteditem);
							blAchievement.achievementCompleted('playtheguitar');
							break;
						case 'piano':
							playInstrument(selecteditem);
							blAchievement.achievementCompleted('playthekeys');
							break;
						case 'trumpet':
							playInstrument(selecteditem);
							blAchievement.achievementCompleted('playthetrumpet');
							break;
						case 'bass':
							playInstrument(selecteditem);
							blAchievement.achievementCompleted('playthebass');
							break;
						case 'drumsticks':
							playInstrument(selecteditem);
							blAchievement.achievementCompleted('bringinthebeat');
							break;

						// TRANSPORTATION

						case 'rocket':
							blSound.playSound(880);
							blAchievement.achievementCompleted('gotospace');
							blMovement.moveObject(direction, 1, 'player');
							break;
						case 'bike':
							blMovement.rideBike(direction);
							break;
						case 'skiis':
							blMovement.rideSkiis(direction);
							break;

						default:
							blMovement.moveObject(direction, 1, 'player');
							break;
					}
				}
			},
			false
		);

		//prevent keys from scrolling page
		document.addEventListener('keydown', function (e) {
			var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
			if (
				(key == 37 || key == 38 || key == 39 || key == 40) /*|| (key == 32)*/ &&
				e.target.className != null
			)
				e.preventDefault();
		});
	}

	enableKeyboardEvents() {
		setDisablekeyboardevents(false);
	}

	disableKeyboardEvents() {
		setDisablekeyboardevents(true);
	}

	setupControlPadEvents() {
		blUtil.log('Control Pad Events');
		var controlMove = function (direction) {
			var selecteditem = blUtil.getSelectedItem();
			blUtil.log('Control Pad ' + direction + ' with ' + selecteditem);
			switch (selecteditem) {
				case 'guitar':
					blSound.playSound(880);
					blAchievement.achievementCompleted('playtheguitar');
					blMovement.moveObject(direction, 1, 'player');
					break;
				case 'piano':
					blSound.playSound(880);
					blAchievement.achievementCompleted('playthekeys');
					blMovement.moveObject(direction, 1, 'player');
					break;
				case 'trumpet':
					blSound.playSound(880);
					blAchievement.achievementCompleted('playthetrumpet');
					blMovement.moveObject(direction, 1, 'player');
					break;
				case 'bass':
					blSound.playSound(880);
					blAchievement.achievementCompleted('playthebass');
					blMovement.moveObject(direction, 1, 'player');
					break;
				case 'drumsticks':
					blSound.playSound(880);
					blAchievement.achievementCompleted('bringinthebeat');
					blMovement.moveObject(direction, 1, 'player');
					break;
				case 'rocket':
					blSound.playSound(880);
					blAchievement.achievementCompleted('gotospace');
					blMovement.moveObject(direction, 1, 'player');
					break;
				case 'bike':
					//rideBike(direction);
					break;
				case 'skiis':
					//rideSkiis(direction);
					break;
				default:
					blMovement.moveObject(direction, 1, 'player');
					break;
			}
		};
		document.querySelector('.btn-up').addEventListener('touchstart', function () {
			controlMove('up');
		});
		document.querySelector('.btn-down').addEventListener('touchstart', function () {
			controlMove('down');
		});
		document.querySelector('.btn-left').addEventListener('touchstart', function () {
			controlMove('left');
		});
		document.querySelector('.btn-right').addEventListener('touchstart', function () {
			controlMove('right');
		});
		document.querySelector('.btn-a').addEventListener('touchstart', function () {
			blAction.playerPrimaryAction();
		});
	}

	setupMouseEvents() {
		blUtil.log('Mouse Events');
		var directions = ['up', 'down', 'left', 'right'];

		// SELECT AN ITEM IN THE INVENTORY
		[...document.querySelectorAll('.the-fucking-inventory div')].forEach(function (el) {
			el.addEventListener('click', function () {
				var blocktype = el.getAttribute('data-blocktype');
				// items that are crafting ingredients
				if (globals.isingredient.indexOf(blocktype) > -1) {
					if (el.getAttribute('data-blocktype') != 'empty') {
						let blocktype = el.getAttribute('data-blocktype');
						blInventory.moveItemToCraftingTable(blocktype);
					}
				} else {
					[...document.querySelectorAll('.tabs .tab')].forEach((t) => (t.style.display = 'none'));
					document.querySelector('.tab-game').style.display = '';
					document.querySelector('.tabs-close').style.display = 'none';
				}
				var playerdirection = blUtil.getObjectDirection(1, 'player');
				[...document.querySelectorAll('.the-fucking-inventory > div')].forEach((d) =>
					d.classList.remove('selected-item')
				);
				el.classList.add('selected-item');
				var selecteditem = el.getAttribute('data-blocktype');

				// clear animation classes
				directions.forEach(function (v) {
					var player = document.querySelector('.the-fucking-player');
					player.classList.remove('player-direction-' + v + '-sword');
					player.classList.remove('player-direction-' + v + '-shovel');
					player.classList.remove('player-direction-' + v + '-axe');
					player.classList.remove('player-direction-' + v + '-sword-swing');
					player.classList.remove('player-direction-' + v + '-shovel-swing');
					player.classList.remove('player-direction-' + v + '-axe-swing');
					player.classList.remove('player-direction-' + v + '-bike');
					player.classList.remove('player-direction-' + v + '-skiis');
					player.classList.remove('player-direction-' + v + '-car');
					player.classList.remove('player-direction-' + v + '-canoe');
					player.classList.remove('player-direction-' + v + '-rocket');
					player.classList.remove('player-direction-' + v + '-guitar');
					player.classList.remove('player-direction-' + v + '-guitar-swing');
					player.classList.remove('player-direction-' + v + '-piano');
					player.classList.remove('player-direction-' + v + '-piano-swing');
					player.classList.remove('player-direction-' + v + '-trumpet');
					player.classList.remove('player-direction-' + v + '-trumpet-swing');
					player.classList.remove('player-direction-' + v + '-bass');
					player.classList.remove('player-direction-' + v + '-bass-swing');
					player.classList.remove('player-direction-' + v + '-drumsticks');
					player.classList.remove('player-direction-' + v + '-drumsticks-swing');
				});

				if (globals.isequipable.indexOf(selecteditem) > -1) {
					blUtil.log('selected item has animation');
					document
						.querySelector('.the-fucking-player')
						.classList.add('player-direction-' + playerdirection + '-' + selecteditem);
				}

				console.log('HCI');
				console.log({ selecteditem });
				console.log(globals.isinstrument);

				if (globals.isinstrument.indexOf(selecteditem) > -1) {
					blUtil.log('selected item in an instrument');
					// document.querySelector('.the-fucking-player').classList.add("player-direction-down-"+selecteditem);
					blMovement.changeObjectDirection(1, 'down', 'player');
					document
						.querySelector('.the-fucking-player')
						.classList.add('player-direction-down-' + selecteditem);
				}

				document.querySelector('.nav-selected-item span').className = document
					.querySelector('.nav-selected-item span')
					.className.replace(
						new RegExp(
							'\\b' + globals.allblockclasses().trim().split(' ').join('\\b|\\b') + '\\b',
							'g'
						),
						''
					)
					.trim();
				document.querySelector('.nav-selected-item span').classList.add('block-' + blocktype);
			});
		});

		// REMOVE ITEMS FROM CRAFTING TABLE
		[...document.querySelectorAll('.the-fucking-crafting-table > div')].forEach(function (el) {
			el.addEventListener('click', function () {
				var blocktype = el.getAttribute('data-blocktype');
				if (blocktype != 'empty') {
					blUtil.log('crafting slot not empty');
					el.classList.remove('block-' + blocktype);
					el.classList.add('empty');
					el.setAttribute('data-blocktype', 'empty');
					el.innerHTML = '0';
					blInventory.addToInventory(blocktype, '1');
					blInventory.checkCraftingTableForItem();
				}
			});
		});

		// MOVE THE CRAFTED ITEM TO INVENTORY
		document
			.querySelector('.the-fucking-crafted-item > div')
			.addEventListener('click', function () {
				var craftedDiv = document.querySelector('.the-fucking-crafted-item > div');
				if (!craftedDiv.classList.contains('empty')) {
					var blocktype = craftedDiv.getAttribute('data-blocktype');
					var itemquantity = craftedDiv.innerHTML;
					blUtil.log('You crafted' + itemquantity + ' ' + blocktype);
					craftedDiv.className = craftedDiv.className
						.replace(
							new RegExp(
								'\\b' + globals.allblockclasses().trim().split(' ').join('\\b|\\b') + '\\b',
								'g'
							),
							''
						)
						.trim();
					craftedDiv.innerHTML = '0';
					blInventory.removeAllItemsFromCraftingTable();
					blInventory.addToInventory(blocktype, itemquantity);
					blInventory.checkCraftingTableForItem();
				}
			});

		// SAVE THE MAPS AND PLAYER DATA
		document.querySelector('.link-savemap').addEventListener('mousedown', function () {
			blAchievement.achievementCompleted('saveyourgame');
			document.querySelector('.link-savemap a').innerHTML = 'Saving';
			var enableSaving = function () {
				document.querySelector('.link-savemap div').innerHTML = '<a>Save</a>';
			};
			setTimeout(enableSaving, 2500);
			blPlayer.savePlayer();
			blMap.saveMap();
		});

		// disabled for dev

		// MOVE PLAYER TO BLOCK
		// $('.the-fucking-forest-map .block').on("click", function() {
		// 	if (typeof stopObjectMovement === 'undefined') {
		// 	    // variable is undefined
		// 	} else {
		// 		stopObjectMovement();
		// 	}
		// 	var blockid = $(this).attr("data-blockid");
		// 	blUtil.log("goto block id:"+blockid);
		// 	blMovement.walkPlayerToBlock(1, blockid);
		// });
	}
}
