


/////////////
//  *CHEATS 
/////////////

var getAllItems = function() {
	var inventoryhtml = '';
	$.each(blocktypes, function(index, value) {
		if ( value != "diamond-hole" &&
		 value != "gold-hole" &&
		 value != "silver-hole" &&
		 value != "oil-hole" &&
		 value != "clay-hole" ){

			inventoryhtml += '<div class="slot-'+index+' block block-'+value+' ';
			if(index==0){ inventoryhtml += 'selected-item'; }
			inventoryhtml += '" data-blocktype="'+value+'">99</div>';
		}
	});
	$('.the-fucking-inventory').html(inventoryhtml);
	setupMouseEvents();
	/*for 

	'<div class="slot-1 empty selected-item" data-blocktype="empty">0</div>'
	'<div class="slot-2 empty" data-blocktype="empty">0</div>''*/
};




/////////////
//  *HELPER FUNCTIONS
/////////////


getObjectMap = function(id) {
	//return which map the object is on
	return maptype;
};
getSelectedItem = function() {
	var blocktype = $('.the-fucking-inventory > .selected-item').attr("data-blocktype");
	return blocktype;
};
getBlockType = function(block) {
	var blocktype = $('.block:eq('+block+')').attr("data-blocktype");
	//trace("getblocktype() blocknumber:"+block+", blocktype:"+blocktype);
	return blocktype;
};
getBlockLeftByID = function(block) {
	var column = block % mapwidth;
	column = column;
	var leftpx = column * gridunitpx;
	return leftpx;
	//alert(leftpx);
};
getBlockTopByID = function(block) {
	var row = block / mapwidth;
	row = parseInt(row);
	var toppx = row * gridunitpx;
	//trace("block "+block+", row"+row+", toppx"+toppx);
	return toppx;
};
/*
getBlockCurrentCol = function(block) {
	var left = getBlockLeftByID();
	console.log("XXX-LEFT:"+left)

}
*/
getObjectCurrentPositionX = function(id) {
	var x = $('.objectid-'+id).css("left");
	//trace("X--"+x);
	return x;
};
getObjectCurrentPositionY = function(id) {
	var y = $('.objectid-'+id).css("top");
	return y;
};
getObjectCurrentCol = function(id) {
	var x = getObjectCurrentPositionX(id);
	x = stripPX(x);
	var y = getObjectCurrentPositionY(id);
	y = stripPX(y);
	var col = x / gridunitpx;
	col = parseInt(col);
	col = col + 1;
	return col;
};
getObjectCurrentRow = function(id) {
	var y = getObjectCurrentPositionY(id);
	y = stripPX(y);
	var row = y / gridunitpx;
	row = parseInt(row);
	row = row + 1;
	return row;
};
getObjectCurrentBlock = function(id) {
	var row = getObjectCurrentRow(id);
	var col = getObjectCurrentCol(id);
	var block = (row * mapwidth) - mapwidth;
	block = block + col;
	//trace(object+" is at block# "+block);
	//trace("block"+block);
	return block;
};
stripPX = function(css) {
	px = css.replace( /px/g , "" );
	px = parseInt(px);
	return px;
};
addPX = function(css) {
	px = css.toString() + "px";
	return px;
};
trace = function(msg) {
	console.log(msg);
};