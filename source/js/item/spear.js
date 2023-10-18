import * as globals from './../globals';
import { Utility } from './../utility';
var blUtil = new Utility();

export class Spear {

	constructor() {

	}

	throwSpear(startblock, direction) {
		blUtil.log("Create Spear");
		blUtil.log("startblock"+startblock);
		blUtil.log("direction"+direction);
		//var enemystartblock = 0;
		//$('.the-fucking-frisbee').remove();
		var playerdirection = blUtil.getObjectDirection(1, "player");
		var id = globals.uniqueObjectID();
		$('.the-fucking-forest-map').append('<div data-id='+id+' class="the-fucking-spear objectId-'+id+' spear-direction-'+playerdirection+'" data-direction="'+direction+'"></div>');
		this.initProjectile("spear", startblock, direction, id);
	}

	throwFrisbee(startblock, direction) {
		blUtil.log("Create Frisbee");
		blUtil.log("startblock"+startblock);
		blUtil.log("direction"+direction);
		//var enemystartblock = 0;
		//$('.the-fucking-frisbee').remove();
		var playerdirection = blUtil.getObjectDirection(1, "player");
		var id = globals.uniqueObjectID();
		$('.the-fucking-forest-map').append('<div data-id='+id+' class="the-fucking-frisbee objectId-'+id+' frisbee-direction-'+playerdirection+'" data-direction="'+direction+'"></div>');
		this.initProjectile("frisbee", startblock, direction, id);
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
		$('.objectId-'+id).css("top",topstart);
		$('.objectId-'+id).css("left",leftstart);
	}

}