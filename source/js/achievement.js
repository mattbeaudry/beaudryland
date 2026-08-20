import * as globals from './globals';

import { Utility } from './utility';
import { Story } from './story';
import { Map } from './map/map';
import { UI } from './ui';

var blUtil = new Utility();
var blStory = new Story();
var blMap = new Map();
var blUI = new UI();

export class Achievement {
	constructor() {}

	/*

MAKE THIS JSON


Achievements
-----------

genesis
Genesis
Created a new game and generated a randomized map.

cuttingwood
Cutting Wood
Cut down trees and use them to create wood blocks.

keepingwarm
Keeping Warm
Use rocks and wood to build a fire.

saveyourgame
Save your Game
Save your game for the first time. You should do tbis periodically whikle playing.

treasurehunter
Treasure Hunter
Build a shovel, learn how to dig, and find some treasure.

takingshelter
Taking Shelter
Build a door and use some wood or solid blocks to create a cabin.

jammingout
Jamming Out
Build a guitar or keyboard.


************

playtheguitar

playthekeys

playthetrumpet

playthebass

bringinthebeat

gotospace



	/*
	var achievements = [
	        {
	            "title": "Cutting Wood",
	            "slug", "cuttingwood",
	            "description": "Cut down trees and use them to create wood blocks.",
	            "status": "incompleted"
	        },
	        {
	            "title": "Keeping Warm",
	            "slug", "keepingwarm",
	            "description": "Use rocks and wood to build a fire.",
	            "status": "incompleted"
	        },
	        {
	            "title": "Taking Shelter",
	            "slug", "takingshelter",
	            "description": "Build a door and use some wood or solid blocks to create a cabin.",
	            "status": "incompleted"
	        },
	        {
	            "title": "Treasure Hunter",
	            "slug", "treasurehunter",
	            "description": "Build a shovel and dig for treasure.",
	            "status": "incompleted"
	        },
	        {
	            "title": "Jamming Out",
	            "slug", "jammingout",
	            "description": "Build a guitar or keyboard.",
	            "status": "incompleted"
	        }
	    ]
	}
	*/

	// fill in the achievement in page content
	// for loop for above object

	/*
	completeAchievement = function(achievement) {};
	*/

	// hunt 10 animals
	// kill 10 enemies
	// create all items
	// unlock all maps
	// build a house
	// build a road
	// ride a bike
	// canoe
	// skiing
	// drive a car
	// astronaut
	// groceries - get all types of food
	// fisherman
	// scientist - build all tech items

	achievementCompleted(achievementname) {
		if (
			!document
				.querySelector('.item-achievements .achievement-' + achievementname)
				.classList.contains('status-completed')
		) {
			document
				.querySelector('.item-achievements .achievement-' + achievementname)
				.classList.add('status-completed');

			this.updateStats();
			this.displayAchievementMessage('You got the ' + achievementname + ' achievement!');

			blUtil.log('ACHIEVEMENT COMPLETED');

			switch (achievementname) {
				case 'playtheguitar':
					if (
						globals.guitarFirstNote == true &&
						document.querySelectorAll('.the-fucking-winter-map').length == 0
					) {
						blUtil.log('Jam out!');
						// globals.guitarFirstNote = false;
						blStory.demolishMapBorder('forest', 'right');
						blMap.loadNewMap('winter', 'right');
						blStory.createWinterSigns();
						blStory.setupMapBorders('winter');
						blStory.demolishMapBorder('winter', 'left');
					}
					break;
				case 'playthekeys':
					if (
						globals.keyboardFirstNote == true &&
						document.querySelectorAll('.the-fucking-beach-map').length == 0
					) {
						blUtil.log('Play keys!');
						// globals.keyboardFirstNote = false;
						blStory.demolishMapBorder('winter', 'right');
						blMap.loadNewMap('beach', 'back');
						blStory.createBeachSigns();
						blStory.setupMapBorders('beach');
						blStory.demolishMapBorder('beach', 'left');
					}
					break;
				case 'playthetrumpet':
					if (
						globals.trumpetFirstNote == true &&
						document.querySelectorAll('.the-fucking-jungle-map').length == 0
					) {
						blUtil.log('Play keys!');
						// globals.trumpetFirstNote = false;
						blStory.demolishMapBorder('beach', 'right');
						blMap.loadNewMap('jungle', 'left');
						blStory.createJungleSigns();
						blStory.setupMapBorders('jungle');
						blStory.demolishMapBorder('jungle', 'left');
						blStory.demolishMapBorder('jungle', 'right');
						blStory.demolishMapBorder('forest', 'left');
					}
					break;
				case 'playthebass':
					if (
						globals.bassFirstNote == true &&
						document.querySelectorAll('.the-fucking-desert-map').length == 0
					) {
						blUtil.log('Play bass!');
						// globals.bassFirstNote = false;
						blStory.demolishMapBorder('forest', 'bottom');
						blStory.demolishMapBorder('winter', 'bottom');
						blStory.demolishMapBorder('beach', 'bottom');
						blStory.demolishMapBorder('jungle', 'bottom');
						blMap.loadNewMap('desert', 'bottom');
						blStory.createDesertSigns();
					}
					break;
				case 'bringinthebeat':
					if (
						globals.drumsFirstNote == true &&
						document.querySelectorAll('.the-fucking-islands-map').length == 0
					) {
						blUtil.log('Play drums!');
						// globals.drumsFirstNote = false;
						blStory.demolishMapBorder('forest', 'top');
						blStory.demolishMapBorder('winter', 'top');
						blStory.demolishMapBorder('beach', 'top');
						blStory.demolishMapBorder('jungle', 'top');
						blMap.loadNewMap('islands', 'top');
						blStory.createIslandsSigns();
					}
					break;
				case 'gotospace':
					if (
						globals.rocketFirstFlight == true &&
						document.querySelectorAll('.the-fucking-space-map').length == 0
					) {
						// globals.rocketFirstFlight = false;
						var object = document.querySelector('.objectId-1');

						// create space map
						blMap.loadNewMap('space', 'background');

						// change ui theme to night mode
						document.body.classList.remove('theme-day');
						document.body.classList.add('theme-night');

						// zoom out from cube
						document.querySelector('.maps-container').classList.add('maps-zoomout');

						// hide cube, show earth blocks
						setTimeout(function () {
							document.querySelector('.maps-wrap').style.display = 'none';
							blMap.changeBlockType(135, 'earth', 'space');
							// move player to space
							object.parentNode.removeChild(object);
							document.querySelector('.the-fucking-space-map').appendChild(object);
							blUtil.teleportObjectToBlock(1, 'space', 136);
						}, 5000);
					}
					break;
			}
		}
	}

	updateStats() {
		var achievementsTotal = document.querySelectorAll('.item-achievements li').length;
		var achievementsComplete = document.querySelectorAll(
			'.item-achievements li.status-completed'
		).length;
		var mapsTotal = 6;
		var mapsUnlocked = document.querySelectorAll('.maps-wrap .cube-side').length;
		var itemsTotal = 89;
		var itemsCollected = document.querySelectorAll('.the-fucking-inventory .block').length;

		var gameTotal = achievementsTotal + mapsTotal + itemsTotal;
		var completionTotal = achievementsComplete + mapsUnlocked + itemsCollected;
		var completionPercentage = Math.floor((completionTotal / gameTotal) * 100);

		document.querySelector('.completion-percentage').innerHTML = completionPercentage;
		document.querySelector('.achievements-complete').innerHTML = achievementsComplete;
		document.querySelector('.achievements-total').innerHTML = achievementsTotal;
		document.querySelector('.items-collected').innerHTML = itemsCollected;
		document.querySelector('.items-total').innerHTML = itemsTotal;
		document.querySelector('.maps-unlocked').innerHTML = mapsUnlocked;
		document.querySelector('.maps-total').innerHTML = mapsTotal;
	}

	displayAchievementMessage(text) {
		blUtil.log('displayDialog');

		var completionPercentage = document.querySelector('.completion-percentage').innerHTML;
		var achievementsComplete = document.querySelector('.achievements-complete').innerHTML;
		var achievementsTotal = document.querySelector('.achievements-total').innerHTML;
		var itemsCollected = document.querySelector('.items-collected').innerHTML;
		var itemsTotal = document.querySelector('.items-total').innerHTML;
		var mapsUnlocked = document.querySelector('.maps-unlocked').innerHTML;
		var mapsTotal = document.querySelector('.maps-total').innerHTML;

		// html building disabled for dev
		// var html = '<div class="bubble-wrap bubble-dialog">';
		// html += '<div class="bubble-link">';
		// html += '<form class="bubble-form" action="#">';
		// html += '<h3>' + text + '</h3>';
		// html += '<h3>' + completionPercentage + '% game completion</h3>';
		// html += '<h3>' + achievementsComplete + '/' + achievementsTotal + ' achievements</h3>';
		// html += '<h3>' + itemsCollected + '/' + itemsTotal + ' items collected</h3>';
		// html += '<h3>' + mapsUnlocked + '/' + mapsTotal + ' maps unlocked</h3>';
		// html += '<input type="submit" value="Okay!" >';
		// html += '</form>';
		// html += '</div>';
		// html += '</div>';
		//$('.page-game').append(html);
		// $('.bubble-dialog .bubble-form').submit(function(e) {
		// 	$('.bubble-wrap').remove();
		// 	event.preventDefault();
		// });
	}

	displayDialog(text) {
		blUtil.log('displayDialog');
		var html = '<div class="bubble-wrap bubble-dialog">';
		html += '<div class="bubble-link">';
		html += '<form class="bubble-form" action="#">';
		html += '<h3>' + text + '</h3>';
		//html += '<input class="bubble-input" type="text" placeholder="Text">';
		//html += '<textarea class="bubble-text bubble-input" rows="2" cols="30" placeholder="type message"></textarea>';
		html += '<input type="submit" value="Okay!" >';
		html += '</form>';
		html += '</div>';
		html += '</div>';

		document.querySelector('.page-game').insertAdjacentHTML('beforeend', html);

		document.querySelector('.bubble-dialog .bubble-form').addEventListener('submit', function (e) {
			document.querySelector('.bubble-wrap').remove();
			e.preventDefault();
		});
	}
}
