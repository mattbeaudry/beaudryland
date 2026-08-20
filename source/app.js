import './sass/main.scss';
import * as globals from './js/globals';
import * as blNavigation from './js/navigation';

import { Utility } from './js/utility';
import { Inventory } from './js/inventory';
import { Map } from './js/map/map';
import { Story } from './js/story';
import { Player } from './js/player';
import { Animal } from './js/animal';
import { Dev } from './js/dev';
import { HCI } from './js/hci';
import { UI } from './js/ui';
import { Mobile } from './js/mobile';
import { Sound } from './js/sound';
import { Time } from './js/time';
import { Character } from './js/character';
import { Items } from './js/item/items';

var blUtil = new Utility();
var blInventory = new Inventory();
var blMap = new Map();
var blStory = new Story();
var blPlayer = new Player();
var blAnimal = new Animal();
var blDev = new Dev();
var blHCI = new HCI();
var blUI = new UI();
var blMobile = new Mobile();
var blSound = new Sound();
var blTime = new Time();
var blCharacter = new Character();
var blItems = new Items();

////////////////////////////
// INIT
////////////////////////////

blUI.setupUI();
blNavigation.initializeNavigation();
blInventory.setupInventorySlots();

if (document.querySelectorAll('.bui-synth').length) {
	blSound.setupSynth();
	blSound.setupDrums();
}

if (document.querySelectorAll('.bl-character-editor').length) {
	blCharacter.setupCharacterBuilder();
	blCharacter.drawCharacter();
}

if (document.querySelectorAll('.page-itemworkshop').length) {
	blItems.initItemBuilder();
}

////////////////////////////
// MOBILE GAME INIT
////////////////////////////

if (document.body.classList.contains('version-phonegap')) {
	var inventoryCloseEl = document.querySelector('.inventory-close');
	if (inventoryCloseEl)
		inventoryCloseEl.addEventListener('click', function () {
			toggleInventory();
		});
	var toggleInventory = function () {
		var stickyInv = document.querySelector('.sticky-inventory');
		if (stickyInv) stickyInv.style.display = stickyInv.style.display === 'none' ? '' : 'none';
	};
	//var hideControlPad = function() { document.querySelector('.the-fucking-controller').style.display = ...; };

	// MOBILE VERSION
	// globals.mapwidth = globals.mapWidthMobile;
	// globals.mapheight = globals.mapHeightMobile;

	blMap.setupMap('mobile');
	blMap.loadNewMap('forest', 'front');
	blPlayer.createPlayer();
	blMobile.websql_openDatabase();
	blMobile.websql_createTable();
	blMobile.loadGameMobile();
	//blAnimal.createAnimal();
	//blStory.setupMapBorders('forest');
	blMap.loadNewMap('winter', 'right');
	blMap.loadNewMap('beach', 'back');
	blMap.loadNewMap('jungle', 'left');
	blMap.loadNewMap('desert', 'bottom');
	blMap.loadNewMap('islands', 'top');
	blStory.createForestSigns();
	blStory.createWinterSigns();
	blStory.createBeachSigns();
	blDev.getAllItems();
	blHCI.setupKeyboardEvents();
	blHCI.setupMouseEvents();
	blHCI.setupControlPadEvents();
	blDev.loadDevConsole();
	blTime.startTime();

	////////////////////////////
	// DESKTOP GAME INIT
	////////////////////////////
} else if (document.body.classList.contains('version-desktop')) {
	// console.log("DESKTOP VERSION");

	// globals.mapwidth = globals.mapWidthDesktop;
	// globals.mapheight = globals.mapHeightDesktop;

	blMap.setupMap('desktop');

	loadGame();

	blHCI.setupKeyboardEvents();
	blHCI.setupMouseEvents();
	blHCI.setupControlPadEvents();
	blDev.loadDevConsole();
	blTime.startTime();

	//alert/ask player to save before they close the page
	function confirmExit() {
		return "Sure you don't wanna SAVE first? You should use the SAVE button before you leave!";
	}
	window.onbeforeunload = confirmExit;
}

////////////////////////////
// LOAD EXISTING GAME
////////////////////////////

function loadGame() {
	//blUtil.log("load game");

	fetch('php/loadmap.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({ maptype: 'forest' }),
	})
		.then((r) => r.text())
		.then(function (data) {
			if (data == false) {
				loadNewGame();
			} else {
				blMap.loadExistingMap('forest');
				fetch('php/loadmap.php', {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: new URLSearchParams({ maptype: 'winter' }),
				})
					.then((r) => r.text())
					.then(function (data) {
						if (data) {
							blUtil.log('loadwintermap');
							blMap.loadExistingMap('winter');
						}
					});
				fetch('php/loadmap.php', {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: new URLSearchParams({ maptype: 'beach' }),
				})
					.then((r) => r.text())
					.then(function (data) {
						if (data) {
							blUtil.log('loadbeachmap');
							blMap.loadExistingMap('beach');
						}
					});
				fetch('php/loadmap.php', {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: new URLSearchParams({ maptype: 'jungle' }),
				})
					.then((r) => r.text())
					.then(function (data) {
						if (data) {
							blUtil.log('loadjunglemap');
							blMap.loadExistingMap('jungle');
						}
					});
				fetch('php/loadmap.php', {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: new URLSearchParams({ maptype: 'desert' }),
				})
					.then((r) => r.text())
					.then(function (data) {
						if (data) {
							blUtil.log('loaddesertmap');
							blMap.loadExistingMap('desert');
						}
					});
				fetch('php/loadmap.php', {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: new URLSearchParams({ maptype: 'islands' }),
				})
					.then((r) => r.text())
					.then(function (data) {
						if (data) {
							blUtil.log('loadislandsmap');
							blMap.loadExistingMap('islands');
						}
					});
				blPlayer.loadPlayer();
			}
		});
}

////////////////////////////
// LOAD NEW GAME
////////////////////////////

var loadNewGame = function () {
	if (maptype == 'creative') {
		blMap.loadNewMap('forest', 'front');
		blMap.loadNewMap('winter', 'right');
		blMap.loadNewMap('beach', 'back');
		blMap.loadNewMap('jungle', 'left');
		blMap.loadNewMap('desert', 'bottom');
		blMap.loadNewMap('islands', 'top');
		blStory.createForestSigns();
		blStory.createWinterSigns();
		blStory.createBeachSigns();
		blStory.createJungleSigns();
		blStory.createDesertSigns();
		blStory.createIslandsSigns();
		blDev.getAllItems();
		// disabled for dev
		//blAnimal.createAnimal();
	} else if (maptype == 'game') {
		blMap.loadNewMap('forest', 'front');
		blStory.createForestSigns();
		// disabled for dev
		//blAnimal.createAnimal();
		blStory.setupMapBorders('forest');
	}
	blPlayer.createPlayer();
};
