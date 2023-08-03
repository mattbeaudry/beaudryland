import * as globals from './globals';
import { Utility } from './utility'; 
var blUtil = new Utility();

export class Health {
	constructor() {

	}

	showObjectHealth(objectId, number) {
		var rid = globals.uniqueObjectID();
		var healthlabelhtml = '<div class="damage-label damage-label-id-'+rid+'">'+number+'</div>';
		$('.objectId-'+objectId).append(healthlabelhtml);
		$('.damage-label-id-'+rid).css("top","-50px");
		$('.damage-label-id-'+rid).animate("top","-120px");
		$('.damage-label-id-'+rid).fadeOut(300, function() {
			$(this).remove();
		});
	}

	setObjectHealth(objectId, value) {
		$('.objectId-'+objectId).attr("data-blockhealth",value);
	}

	reduceObjectHealth(objectId, amount) {
		var blockhealth = $('.objectId-'+objectId).attr("data-blockhealth");
		blockhealth = blockhealth - amount;
		$('.objectId-'+objectId).attr("data-blockhealth",blockhealth);
		this.showObjectHealth(1,blockhealth);
	}

	increaseObjectHealth(objectId, amount) {
		var blockhealth = $('.objectId-'+objectId).attr("data-blockhealth");
		blockhealth = blockhealth + amount;
		$('.objectId-'+objectId).attr("data-blockhealth",blockhealth);
	}

	reduceBlockHealth(blockid, amount) {
		var blockhealth = $(".block").find("[data-blockid='" + blockid + "']").attr("data-blockhealth");
		blockhealth = blockhealth - amount;
		$(".block").find("[data-blockid='" + blockid + "']").attr("data-blockhealth");
	}

	refillHearts() {
		$('.the-fucking-hearts ul .empty').removeClass();
		this.setObjectHealth(1,globals.totalhearts);
	}

	addHeart() {
		var emptyhearts = $('.the-fucking-hearts ul .empty').length;
		$('.the-fucking-hearts .empty').first().removeClass("empty");
		this.increaseObjectHealth(1,1);
	}

	removeHeart() {
		var hearts = this.totalHearts();
		if (hearts > 1) {
			$('.the-fucking-hearts li').not('.empty').last().addClass("empty");
			this.reduceObjectHealth(1,1);
		} else if (hearts == globals.totalhearts) {
			//don't add a heart, max 8
		} else {
			$('.the-fucking-hearts li').not('.empty').last().addClass("empty");
			this.reduceObjectHealth(1,1);
			//gameOver();
		}
	}

	totalHearts() {
		var hearts = $('.the-fucking-hearts li.empty').length;
		hearts = globals.totalhearts - hearts;
		return hearts;
	}

}