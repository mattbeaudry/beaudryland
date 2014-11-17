
/////////////
//  *INVENTORY / CRAFTING
/////////////



addToInventory = function(blocktype, quantitytoadd) {
	if(!quantitytoadd) { quantitytoadd == "1"; }
	quantitytoadd = parseInt(quantitytoadd);
	var slotwithsameitem = $('.the-fucking-inventory > .block-'+blocktype).index();
	// add to slot with matching item
	if ( slotwithsameitem != -1 ) {
		trace("adding "+quantitytoadd+" "+blocktype+" to stack in inv.");
		var quantity = $('.the-fucking-inventory > div:eq('+slotwithsameitem+')').html();
		quantity = parseInt(quantity) + quantitytoadd;
		$('.the-fucking-inventory > div:eq('+slotwithsameitem+')').html(quantity);
	// add to empty slot
	} else {
		trace("adding "+quantitytoadd+" "+blocktype+" to empty slot in inv.");
		$('.the-fucking-inventory > .empty').first().addClass('block block-'+blocktype);
		$('.the-fucking-inventory > .empty').first().attr('data-blocktype', blocktype);
		$('.the-fucking-inventory > .empty').first().html(quantitytoadd);
		var index = $('.the-fucking-inventory > .empty').first().index();
		index = index + 1;
		$('.the-fucking-inventory > .empty').first().removeClass('empty');
	}
};
removeFromInventory = function(blocktype) {
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
};
moveItemToCraftingTable = function(blocktype) {
	if ( $('.the-fucking-crafting-table > .slot-1').hasClass("empty") ) {
		$('.the-fucking-crafting-table > .slot-1').addClass("block-"+blocktype);
		$('.the-fucking-crafting-table > .slot-1').removeClass("empty");
		$('.the-fucking-crafting-table > .slot-1').attr('data-blocktype', blocktype);
		$('.the-fucking-crafting-table > .slot-1').html("1");
		removeFromInventory(blocktype);
	} else if ( $('.the-fucking-crafting-table > .slot-2').hasClass("empty") ) {
		$('.the-fucking-crafting-table > .slot-2').addClass("block-"+blocktype);
		$('.the-fucking-crafting-table > .slot-2').removeClass("empty");
		$('.the-fucking-crafting-table > .slot-2').attr('data-blocktype', blocktype);
		$('.the-fucking-crafting-table > .slot-2').html("1");
		removeFromInventory(blocktype);
	} else if ( $('.the-fucking-crafting-table > .slot-3').hasClass("empty") ) {
		$('.the-fucking-crafting-table > .slot-3').addClass("block-"+blocktype);
		$('.the-fucking-crafting-table > .slot-3').removeClass("empty");
		$('.the-fucking-crafting-table > .slot-3').attr('data-blocktype', blocktype);
		$('.the-fucking-crafting-table > .slot-3').html("1");
		removeFromInventory(blocktype);
	}	
	checkCraftingTableForItem();
};
removeAllItemsFromCraftingTable = function() {
	$('.the-fucking-crafting-table > div').removeClass(allblockclasses);
	$('.the-fucking-crafting-table > div').attr("data-blocktype", "empty");
	$('.the-fucking-crafting-table > div').addClass("empty");
	$('.the-fucking-crafting-table > div').html("0");
};
checkCraftingTableForItem = function() {
	trace("Check for Craftable Item");
	var slot1type = $('.the-fucking-crafting-table > .slot-1').attr("data-blocktype");
	var slot2type = $('.the-fucking-crafting-table > .slot-2').attr("data-blocktype");
	var slot3type = $('.the-fucking-crafting-table > .slot-3').attr("data-blocktype");
	var recipe = slot1type + slot2type + slot3type;
	createCraftedItem = function(blocktype, amount) {
		if (amount == null){ amount = 1; }
		$('.the-fucking-crafted-item > .slot').addClass("block block-"+blocktype);
		$('.the-fucking-crafted-item > .slot').attr('data-blocktype', blocktype);
		$('.the-fucking-crafted-item > .slot').removeClass("empty");
		$('.the-fucking-crafted-item > .slot').html(amount);
	};
	switch (recipe) {
		case "treeemptyempty": createCraftedItem("wood",3); break;
		case "treetreeempty": createCraftedItem("wood",6); break;
		case "treetreetree": createCraftedItem("wood",10); break;
		case "rockwoodwood": createCraftedItem("shovel",1); break;
		case "rockrockwood": createCraftedItem("sword",1); break;
		case "woodwoodrock": createCraftedItem("fire",10); break;
		case "woodwoodwood": createCraftedItem("door",10); break;
		case "treewoodwood": createCraftedItem("guitar",1); break;
		case "woodwooddiamond": createCraftedItem("frisbee",1); break;
		case "treewooddiamond": createCraftedItem("bike",1); break;
		case "treetreediamond": createCraftedItem("skiis",1); break;
		case "woodtreewood": createCraftedItem("canoe",1); break;
		case "woodtreeoil": createCraftedItem("car",1); break;
		case "clayrockclay": createCraftedItem("road",10); break;
		case "rockrockrock": createCraftedItem("rockbrick",10); break;
		case "icerockicerockicerock": createCraftedItem("icerockbrick",10); break;
		case "sandstonesandstonesandstone": createCraftedItem("sandstonebrick",10); break;
		case "clayclayclay": createCraftedItem("claybrick",10); break;
		case "treewoodsilver": createCraftedItem("piano",1); break;
		case "treetreesilver": createCraftedItem("spear",1); break;
		case "woodwoodtree": createCraftedItem("sign",5); break;
		case "rockrocktree": createCraftedItem("axe",1); break;
		case "silveroilfire": createCraftedItem("rocket",1); break;

		case "treepinetreetree": createCraftedItem("table",5); break;
		case "pinetreewoodwood": createCraftedItem("chair",5); break;
		case "pinetreepinetreepinetree": createCraftedItem("bed",5); break;
		case "woodpinetreewood": createCraftedItem("chest",5); break;
		case "diamondsilvergold": createCraftedItem("telescope",1); break;
		case "diamondsilverdiamond": createCraftedItem("computer",1); break;

		default:
			$('.the-fucking-crafted-item > .slot').removeClass(allblockclasses);
			$('.the-fucking-crafted-item > .slot').addClass("empty");
			$('.the-fucking-crafted-item > .slot').attr('data-blocktype', 'empty');
			$('.the-fucking-crafted-item > .slot').html("0");
	}	
};

