import * as globals from './globals';
import { Utility } from './utility'; 
var blUtil = new Utility();

export class Health {
	constructor() {

	}

	showObjectHealth(objectId, number) {
		var rid = globals.uniqueObjectID();
		var healthlabelhtml = '<div class="damage-label damage-label-id-'+rid+'">'+number+'</div>';
		document.querySelector('.objectId-'+objectId).insertAdjacentHTML('beforeend', healthlabelhtml);
		var labelEl = document.querySelector('.damage-label-id-'+rid);
		labelEl.style.top = "-50px";
		// TODO: replace with CSS transition
		setTimeout(function() { labelEl.remove(); }, 300);
	}

	setObjectHealth(objectId, value) {
		document.querySelector('.objectId-'+objectId).setAttribute("data-blockhealth", value);
	}

	reduceObjectHealth(objectId, amount) {
		var blockhealth = document.querySelector('.objectId-'+objectId).getAttribute("data-blockhealth");
		blockhealth = blockhealth - amount;
		document.querySelector('.objectId-'+objectId).setAttribute("data-blockhealth", blockhealth);
		this.showObjectHealth(1,blockhealth);
	}

	increaseObjectHealth(objectId, amount) {
		var blockhealth = document.querySelector('.objectId-'+objectId).getAttribute("data-blockhealth");
		blockhealth = blockhealth + amount;
		document.querySelector('.objectId-'+objectId).setAttribute("data-blockhealth", blockhealth);
	}

	reduceBlockHealth(blockid, amount) {
		var blockEl = document.querySelector(".block [data-blockid='" + blockid + "']");
		var blockhealth = blockEl ? blockEl.getAttribute("data-blockhealth") : null;
		blockhealth = blockhealth - amount;
		if (blockEl) blockEl.setAttribute("data-blockhealth", blockhealth);
	}

	refillHearts() {
		[...document.querySelectorAll('.the-fucking-hearts ul .empty')].forEach(el => el.className = '');
		this.setObjectHealth(1,globals.totalhearts);
	}

	addHeart() {
		var emptyhearts = document.querySelectorAll('.the-fucking-hearts ul .empty').length;
		var firstEmpty = document.querySelector('.the-fucking-hearts .empty');
		if (firstEmpty) firstEmpty.classList.remove("empty");
		this.increaseObjectHealth(1,1);
	}

	removeHeart() {
		var hearts = this.totalHearts();
		var notEmpty = [...document.querySelectorAll('.the-fucking-hearts li')].filter(el => !el.classList.contains('empty'));
		if (hearts > 1) {
			if (notEmpty.length > 0) notEmpty[notEmpty.length - 1].classList.add("empty");
			this.reduceObjectHealth(1,1);
		} else if (hearts == globals.totalhearts) {
			// don't add a heart, max 8
		} else {
			if (notEmpty.length > 0) notEmpty[notEmpty.length - 1].classList.add("empty");
			this.reduceObjectHealth(1,1);
			// gameOver();
		}
	}

	totalHearts() {
		var hearts = document.querySelectorAll('.the-fucking-hearts li.empty').length;
		hearts = globals.totalhearts - hearts;
		return hearts;
	}

}