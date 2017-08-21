import * as globals from './globals';
import { Utility } from './utility'; 
var blUtil = new Utility();

export class Health {
	constructor() {

	}

	showObjectHealth(objectid, number) {
		var rid = globals.uniqueObjectID();
		var healthlabelhtml = '<div class="damage-label damage-label-id-'+rid+'">'+number+'</div>';
		$('.objectid-'+objectid).append(healthlabelhtml);
		$('.damage-label-id-'+rid).css("top","-80px");
		//$('.damage-label-fade
		$('.damage-label-id-'+rid).fadeOut(300, function() {
			$(this).delete();
		});
	}

	setObjectHealth(objectid, value) {
		$('.objectid-'+objectid).attr("data-blockhealth",value);
	}

	reduceObjectHealth(objectid, amount) {
		var blockhealth = $('.objectid-'+objectid).attr("data-blockhealth");
		blockhealth = blockhealth - amount;
		$('.objectid-'+objectid).attr("data-blockhealth",blockhealth);
		this.showObjectHealth(1,blockhealth);
	}

	increaseObjectHealth(objectid, amount) {
		var blockhealth = $('.objectid-'+objectid).attr("data-blockhealth");
		blockhealth = blockhealth + amount;
		$('.objectid-'+objectid).attr("data-blockhealth",blockhealth);
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
		//alert(emptyhearts
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