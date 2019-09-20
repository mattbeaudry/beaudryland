import * as globals from './globals';

export class Utility {
	log(msg) {
		console.log(msg);
	}

	randomBlockID() {
		var randomblockid = Math.floor((Math.random() * globals.totalmapblocks) + 1);
		return randomblockid;
	}

	getObjectMap(id) {
		//return which map the object is on
		return maptype;
	}

	getSelectedItem() {
		var blocktype = $('.the-fucking-inventory > .selected-item').attr("data-blocktype");
		return blocktype;
	}

	getBlockType(block, map) {
		var blocktype = $('.the-fucking-'+map+'-map .block:eq('+block+')').attr("data-blocktype");
		//blUtil.log("getblocktype() blocknumber:"+block+", blocktype:"+blocktype);
		return blocktype;
	}

	getBlockLeftByID(block) {
		var column = block % globals.mapwidth;
		column = column;
		var leftpx = column * globals.gridunitpx;
		return leftpx;
		//alert(leftpx);
	}

	getBlockTopByID(block) {webpack -webkitCancelAnimationFrame
		var row = block / globals.mapwidth;
		row = parseInt(row);
		var toppx = row * globals.gridunitpx;
		//blUtil.log("block "+block+", row"+row+", toppx"+toppx);
		return toppx;
	}

	/*
	getBlockCurrentCol(block) {
		var left = getBlockLeftByID();
		// console.log("XXX-LEFT:"+left);
	}
	*/

	getObjectCurrentPositionX(id) {
		var x = $('.objectid-'+id).css("left");
		return x;
	}

	getObjectCurrentPositionY(id) {
		var y = $('.objectid-'+id).css("top");
		return y;
	}

	setObjectCurrentPositionX(id,newx) {
		$('.objectid-'+id).css("left",newx);
	}

	setObjectCurrentPositionY(id,newy) {
		$('.objectid-'+id).css("top",newy);
	}

	getObjectCurrentCol(id) {
		var x = this.getObjectCurrentPositionX(id);
		x = this.stripPX(x);
		var y = this.getObjectCurrentPositionY(id);
		y = this.stripPX(y);
		var col = x / globals.gridunitpx;
		col = parseInt(col);
		return col;
	}

	getObjectCurrentRow(id) {
		var y = this.getObjectCurrentPositionY(id);
		y = this.stripPX(y);
		var row = y / globals.gridunitpx;
		row = parseInt(row);
		row = row + 1;
		return row;
	}

	getObjectCurrentBlock(id) {
		var row = this.getObjectCurrentRow(id);
		var col = this.getObjectCurrentCol(id);
		var block = (row * globals.mapwidth) - globals.mapwidth;
		block = block + col;
		if (id == 1) {
			this.log('row:'+row+'  |  col:'+col+'  |  object id:'+id+' is at block:'+block);
		}
		return block;
	}

	getObjectDirection(id, name) {
		var direction;
		var selecteditem = this.getSelectedItem();
		var playergraphic;
		if ( (selecteditem == "sword" || selecteditem == "shovel" || selecteditem == "bike" || selecteditem == "skiis") && name == "player" ) { 
			playergraphic = "-"+selecteditem;
		} else {
			playergraphic = "";
		}

		if ($('.objectid-'+id).hasClass(name+"-direction-down")) {
			direction = "down";
		} else if ($('.objectid-'+id).hasClass(name+"-direction-up")) {
			direction = "up";
		} else if ($('.objectid-'+id).hasClass(name+"-direction-left")) {
			direction = "left";
		} else if ($('.objectid-'+id).hasClass(name+"-direction-right")) {
			direction = "right";
		}

		return direction;
	}

	teleportObjectToBlock(objectId, destinationMap, destinationBlock) {
		var left = this.getBlockLeftByID(destinationBlock);
		var top = this.getBlockTopByID(destinationBlock);
		this.setObjectCurrentPositionX(objectId,left);
		this.setObjectCurrentPositionY(objectId,top);
	}

	stripPX(css) {
		var px = css.replace( /px/g , "" );
		px = parseInt(px);
		return px;
	}

	addPX(css) {
		var px = css.toString() + "px";
		return px;
	}

}