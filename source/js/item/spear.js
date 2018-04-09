import * as globals from './../globals';
import { Utility } from './../utility';
var blUtil = new Utility();

export class Spear {

	constructor() {

	}

	throwSpear(startblock, direction) {
		blUtil.log("Create Spear");
		//var enemystartblock = 0;
		//$('.the-fucking-frisbee').remove();
		var playerdirection = blUtil.getObjectDirection(1, "player");
		var id = globals.uniqueObjectID();
		$('.the-fucking-forest-map').append('<div data-id='+id+' class=" the-fucking-spear objectid-'+id+' spear-direction-'+playerdirection+'" data-direction="'+direction+'"></div>');
		this.initProjectile("spear", startblock, direction, id);
	}

	initProjectile(name, startblock, direction, id) {
		//stopProjectile();
		blUtil.log("Start velocity for " + name + " id:" + id + " travelling " + direction + " from block #" + startblock);
		var topstart = blUtil.getBlockTopByID(startblock);
		blUtil.log(topstart);
		var leftstart = blUtil.getBlockLeftByID(startblock);
		blUtil.log(leftstart);
		topstart = blUtil.addPX(topstart);
		leftstart = blUtil.addPX(leftstart);
		$('.objectid-'+id).css("top",topstart);
		$('.objectid-'+id).css("left",leftstart);
	}

}