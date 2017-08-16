import * as globals from './globals';

export class Inventory {

	constructor() {
		this.invslothtml = "";
		this.inventorySlots = globals.inventorySlots;
	}

	setupInventorySlots() {
		this.invslothtml += '<div class="slot-1 empty selected-item" data-blocktype="empty">0</div>';
		for (var i = 1; i <= this.inventorySlots; i += 1){
			this.invslothtml += '<div class="slot-'+i+' empty" data-blocktype="empty">0</div>';
		}
		$('.the-fucking-inventory').html(this.invslothtml);
	}

};