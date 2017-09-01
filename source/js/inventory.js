import * as globals from './globals';

import { Utility } from './utility'; 
var blUtil = new Utility();

export class Inventory {

	constructor() {
		this.invslothtml = "";
		this.inventorySlots = globals.inventoryslots;
	}

	setupInventorySlots() {
		console.log(this.inventorySlots);
		this.invslothtml += '<div class="slot-1 empty selected-item" data-blocktype="empty">0</div>';
		for (var i = 1; i <= this.inventorySlots; i += 1){
			this.invslothtml += '<div class="slot-'+i+' empty" data-blocktype="empty">0</div>';
		}
		$('.the-fucking-inventory').html(this.invslothtml);
	}

	addToInventory(blocktype, quantitytoadd) {
		if(!quantitytoadd) { quantitytoadd == "1"; }
		quantitytoadd = parseInt(quantitytoadd);
		var slotwithsameitem = $('.the-fucking-inventory > .block-'+blocktype).index();
		// add to slot with matching item
		if ( slotwithsameitem != -1 ) {
			blUtil.log("adding "+quantitytoadd+" "+blocktype+" to stack in inv.");
			var quantity = $('.the-fucking-inventory > div:eq('+slotwithsameitem+')').html();
			quantity = parseInt(quantity) + quantitytoadd;
			$('.the-fucking-inventory > div:eq('+slotwithsameitem+')').html(quantity);
		// add to empty slot
		} else {
			blUtil.log("adding "+quantitytoadd+" "+blocktype+" to empty slot in inv.");
			$('.the-fucking-inventory > .empty').first().addClass('block block-'+blocktype);
			$('.the-fucking-inventory > .empty').first().attr('data-blocktype', blocktype);
			$('.the-fucking-inventory > .empty').first().html(quantitytoadd);
			var index = $('.the-fucking-inventory > .empty').first().index();
			index = index + 1;
			$('.the-fucking-inventory > .empty').first().removeClass('empty');
		}
	}

	removeFromInventory(blocktype) {
		//minus one item from stack
		var quantity = $('.the-fucking-inventory > .block-'+blocktype).html();
		quantity = parseInt(quantity) - 1;
		$('.the-fucking-inventory > .block-'+blocktype).html(quantity);
		//empty slot if stack runs out for items
		if (quantity == 0) {
			var slotindex = $('.the-fucking-inventory > .block-'+blocktype).index();
			//alert("make arrow empty"+slotindex);
			$('.the-fucking-inventory > .block-'+blocktype).addClass('empty');
			$('.the-fucking-inventory > .block-'+blocktype).attr('data-blocktype', 'empty');
			$('.the-fucking-inventory > .block-'+blocktype).removeClass('block block-'+blocktype);
		}
	}

	moveItemToCraftingTable(blocktype) {
		if ( $('.the-fucking-crafting-table > .slot-1').hasClass("empty") ) {
			$('.the-fucking-crafting-table > .slot-1').addClass("block-"+blocktype);
			$('.the-fucking-crafting-table > .slot-1').removeClass("empty");
			$('.the-fucking-crafting-table > .slot-1').attr('data-blocktype', blocktype);
			$('.the-fucking-crafting-table > .slot-1').html("1");
			this.removeFromInventory(blocktype);
		} else if ( $('.the-fucking-crafting-table > .slot-2').hasClass("empty") ) {
			$('.the-fucking-crafting-table > .slot-2').addClass("block-"+blocktype);
			$('.the-fucking-crafting-table > .slot-2').removeClass("empty");
			$('.the-fucking-crafting-table > .slot-2').attr('data-blocktype', blocktype);
			$('.the-fucking-crafting-table > .slot-2').html("1");
			this.removeFromInventory(blocktype);
		} else if ( $('.the-fucking-crafting-table > .slot-3').hasClass("empty") ) {
			$('.the-fucking-crafting-table > .slot-3').addClass("block-"+blocktype);
			$('.the-fucking-crafting-table > .slot-3').removeClass("empty");
			$('.the-fucking-crafting-table > .slot-3').attr('data-blocktype', blocktype);
			$('.the-fucking-crafting-table > .slot-3').html("1");
			this.removeFromInventory(blocktype);
		}	
		this.checkCraftingTableForItem();
	}

	removeAllItemsFromCraftingTable() {
		$('.the-fucking-crafting-table > div').removeClass(globals.allblockclasses);
		$('.the-fucking-crafting-table > div').attr("data-blocktype", "empty");
		$('.the-fucking-crafting-table > div').addClass("empty");
		$('.the-fucking-crafting-table > div').html("0");
	}

	createCraftedItem(blocktype, amount) {
		if (amount == null) { amount = 1; }
		$('.the-fucking-crafted-item > .slot').addClass("block block-"+blocktype);
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', blocktype);
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html(amount);
	}

	checkCraftingTableForItem() {
		blUtil.log("Check for Craftable Item");
		var slot1type = $('.the-fucking-crafting-table > .slot-1').attr("data-blocktype");
		var slot2type = $('.the-fucking-crafting-table > .slot-2').attr("data-blocktype");
		var slot3type = $('.the-fucking-crafting-table > .slot-3').attr("data-blocktype");
		var recipe = slot1type + slot2type + slot3type;

		switch (recipe) {
			case "treeemptyempty": this.createCraftedItem("wood",3); break;
			case "treetreeempty": this.createCraftedItem("wood",6); break;
			case "treetreetree": this.createCraftedItem("wood",10); break;
			case "rockwoodwood": this.createCraftedItem("shovel",1); break;
			case "rockrockwood": this.createCraftedItem("sword",1); break;
			case "woodwoodrock": this.createCraftedItem("fire",10); break;
			case "woodwoodwood": this.createCraftedItem("door",10); break;

			case "treewoodwood": this.createCraftedItem("guitar",1); break;
			case "treewoodsilver": this.createCraftedItem("piano",1); break;
			case "treegoldgold": this.createCraftedItem("trumpet",1); break;
			case "treediamonddiamond": this.createCraftedItem("bass",1); break;
			case "treesilvergold": this.createCraftedItem("microphone",1); break;
			case "palmtreepalmwoodpalmtree": this.createCraftedItem("drumsticks",1); break;

			case "woodwooddiamond": this.createCraftedItem("frisbee",1); break;
			case "treewooddiamond": this.createCraftedItem("bike",1); break;
			case "treetreediamond": this.createCraftedItem("skiis",1); break;
			case "woodtreewood": this.createCraftedItem("canoe",1); break;
			case "woodtreeoil": this.createCraftedItem("car",1); break;
			case "clayrockclay": this.createCraftedItem("road",10); break;
			case "rockrockrock": this.createCraftedItem("rockbrick",10); break;
			case "icerockicerockicerock": this.createCraftedItem("icerockbrick",10); break;
			case "sandstonesandstonesandstone": this.createCraftedItem("sandstonebrick",10); break;
			case "clayclayclay": this.createCraftedItem("claybrick",10); break;
			case "treetreesilver": this.createCraftedItem("spear",1); break;
			case "woodwoodtree": this.createCraftedItem("sign",5); break;
			case "rockrocktree": this.createCraftedItem("axe",1); break;
			case "silveroilfire": this.createCraftedItem("rocket",1); break;
			case "treepinetreetree": this.createCraftedItem("table",5); break;
			case "pinetreewoodwood": this.createCraftedItem("chair",5); break;
			case "pinetreepalmpinetree": this.createCraftedItem("bed",5); break;
			case "woodpinetreewood": this.createCraftedItem("chest",5); break;
			case "diamondsilvergold": this.createCraftedItem("telescope",1); break;
			case "diamondsilverdiamond": this.createCraftedItem("computer",1); break;
			case "pinetreeemptyempty": this.createCraftedItem("pinewood",3); break;
			case "pinetreepinetreeempty": this.createCraftedItem("pinewood",6); break;
			case "pinetreepinetreepinetree": this.createCraftedItem("pinewood",10); break;
			case "palmtreeemptyempty": this.createCraftedItem("palmwood",3); break;
			case "palmtreepalmtreeempty": this.createCraftedItem("palmwood",5); break;
			case "palmtreepalmtreepalmtree": this.createCraftedItem("palmwood",10); break;
			case "appletreeemptyempty": this.createCraftedItem("applewood",3); break;
			case "appletreeappletreeempty": this.createCraftedItem("applewood",6); break;
			case "appletreeappletreeappletree": this.createCraftedItem("applewood",10); break;
			case "palmpalmwood": this.createCraftedItem("bow",1); break;
			case "woodpalmpalm": this.createCraftedItem("arrow",1); break;
			case "silversilversilver": this.createCraftedItem("portala",1); break;
			case "goldgoldgold": this.createCraftedItem("portalb",1); break;

			default:
				$('.the-fucking-crafted-item > .slot').removeClass(globals.allblockclasses);
				$('.the-fucking-crafted-item > .slot').addClass("empty");
				$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'empty');
				$('.the-fucking-crafted-item > .slot').html("0");
		}	
	}

}