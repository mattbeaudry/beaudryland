import * as globals from './globals';

export class Utility {
	log(msg) {
		// uncomment for dev mode
		// console.log(msg);
	}

	randomBlockID() {
		var randomblockid = Math.floor(Math.random() * globals.totalmapblocks + 1);
		return randomblockid;
	}

	getObjectMap(id) {
		//return which map the object is on
		return maptype;
	}

	getSelectedItem() {
		var el = document.querySelector('.the-fucking-inventory > .selected-item');
		var blocktype = el ? el.getAttribute('data-blocktype') : undefined;
		return blocktype;
	}

	getBlockType(block, map) {
		var el = document.querySelectorAll('.the-fucking-' + map + '-map .block')[block];
		var blocktype = el ? el.getAttribute('data-blocktype') : undefined;
		//blUtil.log("getblocktype() blocknumber:"+block+", blocktype:"+blocktype);
		return blocktype;
	}

	getBlockLeftByID(block) {
		var column = block % globals.mapwidth;
		column = column;
		var leftpx = column * globals.gridunitpx;
		console.log('getBlockLeftByID');
		console.log({ column });
		console.log({ leftpx });
		console.log('globals.gridunitpx', globals.gridunitpx);
		console.log('globals.mapwidth', globals.mapwidth);
		return leftpx;
		//alert(leftpx);
	}

	getBlockTopByID(block) {
		var row = block / globals.mapwidth;
		row = parseInt(row);
		var toppx = row * globals.gridunitpx;
		console.log('getBlockTopByID');
		console.log({ row });
		console.log({ toppx });
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
		var el = document.querySelector('.objectId-' + id);
		var x = el ? getComputedStyle(el).left : '0px';
		return x;
	}

	getObjectCurrentPositionY(id) {
		var el = document.querySelector('.objectId-' + id);
		var y = el ? getComputedStyle(el).top : '0px';
		return y;
	}

	setObjectCurrentPositionX(id, newx) {
		var el = document.querySelector('.objectId-' + id);
		if (el) el.style.left = newx + (typeof newx === 'number' ? 'px' : '');
	}

	setObjectCurrentPositionY(id, newy) {
		var el = document.querySelector('.objectId-' + id);
		if (el) el.style.top = newy + (typeof newy === 'number' ? 'px' : '');
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
		var block = row * globals.mapwidth - globals.mapwidth;
		block = block + col;
		if (id == 1) {
			this.log('row:' + row + '  |  col:' + col + '  |  object id:' + id + ' is at block:' + block);
		}
		return block;
	}

	getObjectDirection(id, name) {
		var direction;
		var selecteditem = this.getSelectedItem();
		var playergraphic;
		if (
			(selecteditem == 'sword' ||
				selecteditem == 'shovel' ||
				selecteditem == 'bike' ||
				selecteditem == 'skiis') &&
			name == 'player'
		) {
			playergraphic = '-' + selecteditem;
		} else {
			playergraphic = '';
		}

		var el = document.querySelector('.objectId-' + id);
		if (el) {
			if (el.classList.contains(name + '-direction-down')) {
				direction = 'down';
			} else if (el.classList.contains(name + '-direction-up')) {
				direction = 'up';
			} else if (el.classList.contains(name + '-direction-left')) {
				direction = 'left';
			} else if (el.classList.contains(name + '-direction-right')) {
				direction = 'right';
			}
		}

		return direction;
	}

	teleportObjectToBlock(objectId, destinationMap, destinationBlock) {
		var left = this.getBlockLeftByID(destinationBlock);
		var top = this.getBlockTopByID(destinationBlock);

		console.log('teleportObjectToBlock');
		console.log({ left });
		console.log({ top });

		this.setObjectCurrentPositionX(objectId, left);
		this.setObjectCurrentPositionY(objectId, top);
	}

	stripPX(css) {
		var px = css.replace(/px/g, '');
		px = parseInt(px);
		return px;
	}

	addPX(css) {
		var px = css.toString() + 'px';
		return px;
	}

	displayConsoleMessage(text) {
		var consoleUl = document.querySelector('.the-fucking-console > ul');
		if (consoleUl) consoleUl.insertAdjacentHTML('beforeend', '<li>' + text + '</li>');
	}
}
