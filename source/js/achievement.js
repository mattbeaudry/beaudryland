import * as globals from './globals';

import { Utility } from './utility';
import { Story } from './story';
import { Map } from './map';

var blUtil = new Utility();
var blStory = new Story();
var blMap = new Map();

export class Achievement {

	constructor() {
		this.guitarFirstNote = true;
	}

	achievementCompleted(achievementname) {
		if (!$('.item-achievements .achievement-'+achievementname).hasClass('status-completed')) {
			$('.item-achievements .achievement-'+achievementname).addClass("status-completed");
			this.displayDialog("You got the "+achievementname+" achievement!");
			switch (achievementname) {
				case 'jammingout':
					blUtil.log('Jam out!');
					blStory.demolishMapBorder('forest', 'left');
					if ((this.guitarFirstNote == true) && ($('.the-fucking-winter-map').length == 0)){ 
						this.guitarFirstNote = false; 
						blMap.loadNewMap('winter', 'right'); 
						blStory.createWinterSigns();
						blStory.setupMapBorders('winter');
						blStory.demolishMapBorder('winter', 'left');
					}
					break;
			}

		}
	}

	displayDialog(text) {

		console.log("displayDialog");

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

}