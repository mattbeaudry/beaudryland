import * as globals from './globals';

import { Utility } from './utility';
import { Story } from './story';
import { Map } from './map';

var blUtil = new Utility();
var blStory = new Story();
var blMap = new Map();

export class Achievement {

	constructor() {

	}

	achievementCompleted(achievementname) {
		if (!$('.item-achievements .achievement-'+achievementname).hasClass('status-completed')) {

			$('.item-achievements .achievement-'+achievementname).addClass("status-completed");
			this.displayDialog("You got the "+achievementname+" achievement!");

			switch (achievementname) {
				case 'playtheguitar':
					if (globals.guitarFirstNote == true && $('.the-fucking-winter-map').length == 0) {
						blUtil.log('Jam out!'); 
						globals.guitarFirstNote = false;
						blStory.demolishMapBorder('forest', 'right');
						blMap.loadNewMap('winter', 'right'); 
						blStory.createWinterSigns();
						blStory.setupMapBorders('winter');
						blStory.demolishMapBorder('winter', 'left');
					}
					break;
				case 'playthekeys':
					if (globals.keyboardFirstNote == true && $('.the-fucking-beach-map').length == 0) {
						blUtil.log('Play keys!'); 
						globals.keyboardFirstNote = false; 
						blStory.demolishMapBorder('winter', 'right');
						blMap.loadNewMap('beach', 'back'); 
						blStory.createBeachSigns();
						blStory.setupMapBorders('beach');
						blStory.demolishMapBorder('beach', 'left');
					}
					break;
				case 'playthetrumpet':
					if (globals.trumpetFirstNote == true && $('.the-fucking-jungle-map').length == 0) {
						blUtil.log('Play keys!'); 
						globals.trumpetFirstNote = false; 
						blStory.demolishMapBorder('beach', 'right');
						blMap.loadNewMap('jungle', 'left'); 
						//blStory.createJungleSigns();
						blStory.setupMapBorders('jungle');
						blStory.demolishMapBorder('jungle', 'left');
						blStory.demolishMapBorder('jungle', 'right');
						blStory.demolishMapBorder('forest', 'left');
					}
					break;
				case 'playthebass':
					if (globals.bassFirstNote == true && $('.the-fucking-desert-map').length == 0) {
						blUtil.log('Play bass!'); 
						globals.bassFirstNote = false; 
						blStory.demolishMapBorder('forest', 'bottom');
						blStory.demolishMapBorder('winter', 'bottom');
						blStory.demolishMapBorder('beach', 'bottom');
						blStory.demolishMapBorder('jungle', 'bottom');
						blMap.loadNewMap('desert', 'bottom');
						//blStory.createDesertSigns();
					}
					break;
				case 'bringinthebeat':
					if (globals.drumsFirstNote == true && $('.the-fucking-islands-map').length == 0) {
						blUtil.log('Play drums!'); 
						globals.drumsFirstNote = false; 
						blStory.demolishMapBorder('forest', 'top');
						blStory.demolishMapBorder('winter', 'top');
						blStory.demolishMapBorder('beach', 'top');
						blStory.demolishMapBorder('jungle', 'top');
						blMap.loadNewMap('islands', 'top');
						//blStory.createIslandsSigns();
					}
					break;
				case 'gotospace':
					if (globals.rocketFirstFlight == true && $('.the-fucking-space-map').length == 0) {
						globals.rocketFirstFlight = false;
						var object = $('.objectid-1');
						var toMap = $('.the-fucking-space-map');

						// create space map
						blMap.loadNewMap('space', 'background');

						// zoom out from cube
						$('.maps-wrap').addClass('maps-zoomout');

						// hide cube, show earth blocks
						setTimeout(function(){ 
							$('.maps-wrap').hide();
							blMap.changeBlockType(209, 'earth', 'space');
							// move player to space
							object.detach();
							$('.the-fucking-space-map').append(object);
							blUtil.teleportObjectToBlock(1, 'space', 210);
						}, 2000);
					}

					break;
			}

		}
	}

	displayDialog(text) {
		blUtil.log("displayDialog");
		var html = '<div class="bubble-wrap bubble-dialog">';
					html += '<div class="bubble-link">';
			  			html += '<form class="bubble-form" action="#">';
			  				html += '<h3>'+text+'</h3>';
			    			//html += '<input class="bubble-input" type="text" placeholder="Text">';
			    			//html += '<textarea class="bubble-text bubble-input" rows="2" cols="30" placeholder="type message"></textarea>';
			    			html += '<input type="submit" value="Okay!" >';
			  			html += '</form>';
			  		html += '</div>';
			html += '</div>';

		$('.page-game').append(html);

		$('.bubble-dialog .bubble-form').submit(function(e) {

			$('.bubble-wrap').remove();
			event.preventDefault();

		});
	}

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

	// fill in the achivement in page content
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

}