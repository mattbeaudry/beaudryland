
/////////////
//  *MAPS & SIGNS
/////////////

loadMap = function(maptype){
	$.post('php/loadmap.php', {maptype:maptype}, function(data) {
		trace("existing user");
		var mapblocks = JSON.parse(data);
		var mapdata = "";
		var total = totalmapblocks;
		for (i=0; i<total; i++){
			mapdata += '<div data-blockid="'+globalmapblockcount+'" data-blocktype="'+mapblocks[i]+'" data-blockhealth="10" class="block block-'+mapblocks[i]+'"></div>';
			globalmapblockcount++;
		}
		if (maptype == 'forest'){
			$('.the-fucking-map').html(mapdata);
		} else if (maptype == 'winter'){
			$('.maps-wrap').append('<div class="the-fucking-winter-map" data-maptype="winter"></div>');
			$('.the-fucking-winter-map').css("width", mapwidthpx+"px");
			$('.the-fucking-winter-map').css("height", mapheightpx+"px");
			$('.the-fucking-winter-map').html(mapdata);
		} else if (maptype == 'beach'){
			$('.maps-wrap').append('<div class="the-fucking-beach-map" data-maptype="beach"></div>');
			$('.the-fucking-beach-map').css("width", mapwidthpx+"px");
			$('.the-fucking-beach-map').css("height", mapheightpx+"px");
			$('.the-fucking-beach-map').html(mapdata);
			startWaves();
		}
	});
};
setMapSize = function() {
	trace("Set Map Size");
	$('.the-fucking-map').css("width", mapwidthpx+"px");
	$('.the-fucking-map').css("height", mapheightpx+"px");
};
loadNewMap = function(type) {

	//console.log("about to create new forest map");

	var maphtml = "";

	for (var f = 0; f <= (totalmapblocks - 1); f++){
		//random block generation
		var r = Math.random();
		//console.log("asdfasdf"+r);
		//console.log("sdfasd");
		var blocktype;
		if (r<0.7) { blocktype = "grass"; }
		else if (r>0.98) { blocktype = "rock"; }
		else if (r>0.8) { blocktype = "tree"; }
		else { blocktype = "water"; }
		maphtml += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
	}
	$('.the-fucking-map').append(maphtml);

	//console.log("why didnt it work?");

	/* FOREST BIOME */

	
	var terrainblocks = ["water","tree","grass","water","tree","grass","appletree"];
	$.each(terrainblocks, function(index, value){

		var randomblockid = Math.floor((Math.random() * totalmapblocks) + 1);

		changeBlockType(randomblockid, value);

		changeBlockType( (randomblockid-1), value);
		changeBlockType( (randomblockid-2), value);
		changeBlockType( (randomblockid-3), value);                
		changeBlockType( (randomblockid-4), value);

		changeBlockType( (randomblockid-1+mapwidth), value);
		changeBlockType( (randomblockid-2+mapwidth), value);
		changeBlockType( (randomblockid-3+mapwidth), value);
		changeBlockType( (randomblockid-4+mapwidth), value);
		changeBlockType( (randomblockid-5+mapwidth), value);

		changeBlockType( (randomblockid-1-mapwidth), value);
		changeBlockType( (randomblockid-2-mapwidth), value);
		changeBlockType( (randomblockid-3-mapwidth), value);
		changeBlockType( (randomblockid-4-mapwidth), value);
		changeBlockType( (randomblockid-5-mapwidth), value);
		changeBlockType( (randomblockid-6-mapwidth), value);
		changeBlockType( (randomblockid-7-mapwidth), value);

		changeBlockType( (randomblockid-1+mapwidth*2), value);
		changeBlockType( (randomblockid-2+mapwidth*2), value);
		changeBlockType( (randomblockid-3+mapwidth*2), value);
		changeBlockType( (randomblockid-4+mapwidth*2), value);
		changeBlockType( (randomblockid-5+mapwidth*2), value);
		
		changeBlockType( (randomblockid-1-mapwidth*2), value);          
		changeBlockType( (randomblockid-2-mapwidth*2), value);
		changeBlockType( (randomblockid-3-mapwidth*2), value);
		changeBlockType( (randomblockid-4-mapwidth*2), value);
		changeBlockType( (randomblockid-5-mapwidth*2), value);
		changeBlockType( (randomblockid-6-mapwidth*2), value);

	});
	

};
saveMap = function(){
	trace("save map");
	var playerdiv = $('.the-fucking-player').prop("outerHTML");
	$('.the-fucking-player').remove();
	//save forest map
	var mapblocks = new Array();
	var total = totalmapblocks;
    for (i=0; i<=total; i++){
    	var blocktype = $('.the-fucking-map div:eq('+i+')').attr('data-blocktype');
		mapblocks[i] = blocktype;
	}
	var jsonmapblocks = JSON.stringify(mapblocks);
    $.post('php/savemap.php', {mapdata: jsonmapblocks, maptype:'forest'}, function(data) {
        //$('body').append(data);
        trace("save mapdata: "+data);
    });
    //save winter map
    if ($('.the-fucking-winter-map').length) {
		var wintermapblocks = new Array();
		var total = totalmapblocks;
		for (i=0; i<=total; i++){
			var blocktype = $('.the-fucking-winter-map div:eq('+i+')').attr('data-blocktype');
			//snowing on blocks and cleaning up map
			/*if (blocktype == "dirt") { blocktype = "snow"; }
			if (blocktype == "hole") { blocktype = "snow"; }
			if (blocktype == "frozendirt") { blocktype = "snow"; }
			if (blocktype == "icehole") { blocktype = "snow"; }*/

			wintermapblocks[i] = blocktype;
		}
    	//alert("winter map exists");
		var jsonwintermapblocks = JSON.stringify(wintermapblocks);
	    $.post('php/savemap.php', {mapdata: jsonwintermapblocks, maptype:'winter'}, function(data) {
	        //$('body').append(data);
	        trace("save mapdata: "+data);
	    });
	}
	//save beach map
	if ($('.the-fucking-beach-map').length) {
		//save winter map
		var beachmapblocks = new Array();
		var total = totalmapblocks;
		for (i=0; i<=total; i++){
			var blocktype = $('.the-fucking-beach-map div:eq('+i+')').attr('data-blocktype');
			beachmapblocks[i] = blocktype;
		}
		//alert("winter map exists");
		var jsonbeachmapblocks = JSON.stringify(beachmapblocks);
	    $.post('php/savemap.php', {mapdata: jsonbeachmapblocks, maptype:'beach'}, function(data) {
	        //$('body').append(data);
	        trace("save mapdata: "+data);
	    });
	}
    $('.the-fucking-map').append(playerdiv);
};
drawNewBeachMap = function() {

	/* LOAD BEACH MAP FUNCTION */
	$('.maps-wrap').append('<div class="the-fucking-beach-map" data-maptype="beach"></div>');
	$('.the-fucking-beach-map').css("width", mapwidthpx+"px");
	$('.the-fucking-beach-map').css("height", mapheightpx+"px");
	var mapdata = "";
	var maphalf = 0.5 * mapwidth;
	var shoreedge = maphalf;
	for (var f = 0; f <= (totalmapblocks - 1); f++){
		//random block generation
		var r = Math.random();
		var blocktype;
		var rowposition = f % mapwidth;
		if (rowposition == 0) {
			shoreedge = parseInt(Math.random() * 3) + 2;
			trace(shoreedge);
		}
		if (rowposition <= (maphalf-shoreedge)) {
			if (r<0.96) { blocktype = "sand"; }
			else if (r>0.98) { blocktype = "sandstone"; }
			else if (r>0.96) { blocktype = "palmtree"; }
		} else {
			if (r<=0.98) { blocktype = "water"; }
			else if (r>0.98) { blocktype = "wave"; }
		}
		//trace(blocktype+rowposition+maphalf);
		mapdata += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
	}
	$('.the-fucking-beach-map').html(mapdata);

	var terrainblocks = ["sandstone","palmtree","wetsand"];
	
	$.each(terrainblocks, function(index, value){

		var randomblockid = Math.floor((Math.random() * totalmapblocks) + 1);

		changeBlockType(randomblockid, value);

		changeBlockType( (randomblockid-1), value);
		changeBlockType( (randomblockid-2), value);
		changeBlockType( (randomblockid-3), value);
		changeBlockType( (randomblockid-4), value);

		changeBlockType( (randomblockid-1+mapwidth), value);
		changeBlockType( (randomblockid-2+mapwidth), value);
		changeBlockType( (randomblockid-3+mapwidth), value);
		changeBlockType( (randomblockid-4+mapwidth), value);
		changeBlockType( (randomblockid-5+mapwidth), value);

		changeBlockType( (randomblockid-1-mapwidth), value);
		changeBlockType( (randomblockid-2-mapwidth), value);
		changeBlockType( (randomblockid-3-mapwidth), value);
		changeBlockType( (randomblockid-4-mapwidth), value);
		changeBlockType( (randomblockid-5-mapwidth), value);
		changeBlockType( (randomblockid-6-mapwidth), value);
		changeBlockType( (randomblockid-7-mapwidth), value);

		changeBlockType( (randomblockid-1+mapwidth*2), value);
		changeBlockType( (randomblockid-2+mapwidth*2), value);
		changeBlockType( (randomblockid-3+mapwidth*2), value);
		changeBlockType( (randomblockid-4+mapwidth*2), value);
		changeBlockType( (randomblockid-5+mapwidth*2), value);
		
		changeBlockType( (randomblockid-1-mapwidth*2), value);
		changeBlockType( (randomblockid-2-mapwidth*2), value);
		changeBlockType( (randomblockid-3-mapwidth*2), value);
		changeBlockType( (randomblockid-4-mapwidth*2), value);
		changeBlockType( (randomblockid-5-mapwidth*2), value);
		changeBlockType( (randomblockid-6-mapwidth*2), value);

	});

	startWaves();
};
drawNewWinterMap = function() {
	/* LOAD WINTER MAP FUNCTION */
	$('.maps-wrap').append('<div class="the-fucking-winter-map" data-maptype="winter"></div>');
	$('.the-fucking-winter-map').css("width", mapwidthpx+"px");
	$('.the-fucking-winter-map').css("height", mapheightpx+"px");
	var mapdata = "";
	for (var f = 0; f <= (totalmapblocks - 1); f++){
		//random block generation
		var r = Math.random();
		var blocktype;
		if (r<0.9) { blocktype = "snow"; }
		else if (r>0.98) { blocktype = "icerock"; }
		else if (r>0.96) { blocktype = "pinetree"; }
		else { blocktype = "ice"; }
		mapdata += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
	}
	$('.the-fucking-winter-map').html(mapdata);

	var terrainblocks = ["sandstone","pinetree","ice"];
	$.each(terrainblocks, function(index, value){

		var randomblockid = Math.floor((Math.random() * totalmapblocks) + 1);

		changeBlockType(randomblockid, value);

		changeBlockType( (randomblockid-1), value);
		changeBlockType( (randomblockid-2), value);
		changeBlockType( (randomblockid-3), value);
		changeBlockType( (randomblockid-4), value);

		changeBlockType( (randomblockid-1+mapwidth), value);
		changeBlockType( (randomblockid-2+mapwidth), value);
		changeBlockType( (randomblockid-3+mapwidth), value);
		changeBlockType( (randomblockid-4+mapwidth), value);
		changeBlockType( (randomblockid-5+mapwidth), value);

		changeBlockType( (randomblockid-1-mapwidth), value);
		changeBlockType( (randomblockid-2-mapwidth), value);
		changeBlockType( (randomblockid-3-mapwidth), value);
		changeBlockType( (randomblockid-4-mapwidth), value);
		changeBlockType( (randomblockid-5-mapwidth), value);
		changeBlockType( (randomblockid-6-mapwidth), value);
		changeBlockType( (randomblockid-7-mapwidth), value);

		changeBlockType( (randomblockid-1+mapwidth*2), value);
		changeBlockType( (randomblockid-2+mapwidth*2), value);
		changeBlockType( (randomblockid-3+mapwidth*2), value);
		changeBlockType( (randomblockid-4+mapwidth*2), value);
		changeBlockType( (randomblockid-5+mapwidth*2), value);
		
		changeBlockType( (randomblockid-1-mapwidth*2), value);
		changeBlockType( (randomblockid-2-mapwidth*2), value);
		changeBlockType( (randomblockid-3-mapwidth*2), value);
		changeBlockType( (randomblockid-4-mapwidth*2), value);
		changeBlockType( (randomblockid-5-mapwidth*2), value);
		changeBlockType( (randomblockid-6-mapwidth*2), value);

	});

};
drawNewSpaceMap = function() {
	// LOAD SPACE MAP FUNCTION
	$('.maps-wrap').append('<div class="the-fucking-space-map" data-maptype="space"></div>');
	$('.the-fucking-space-map').css("width", mapwidthpx+"px");
	$('.the-fucking-space-map').css("height", mapheightpx+"px");
	var mapdata = "";
	for (var f = 0; f <= (totalmapblocks - 1); f++){
		//random block generation
		var r = Math.random();
		var blocktype;
		if (r<0.9) { blocktype = "space"; }
		else if (r>0.98) { blocktype = "star"; }
		else if (r>0.976) { blocktype = "bluegalaxy"; }
		else if (r>0.972) { blocktype = "redgalaxy"; }
		else if (r>0.968) { blocktype = "earth"; }
		else if (r>0.966) { blocktype = "sun"; }
		else { blocktype = "space"; }
		mapdata += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
	}
	$('.the-fucking-space-map').html(mapdata);
};
changeBlockType = function(block, newtype) {
	//trace("8-changing block "+block+" to "+newtype);
	$('.block:eq('+block+')').removeClass(allblockclasses);
	$('.block:eq('+block+')').addClass("block block-"+newtype);
	$('.block:eq('+block+')').attr("data-blocktype", newtype);
};








/////////////
//  SIGNS
/////////////


placeSign = function(objectid, block) {

	/*var html = '<div class="speech-bubble">';
	html    +=   '<form class="bubble-form" action="submit">';
	html    +=     '<textarea class="bubble-text" rows="2" cols="30"></textarea>';
	html    +=   '</form>';
	html    += '</div>';
	$('.objectid-'+objectid).append(html);*/

	var html = '<div class="bubble-wrap">';
				html += '<div class="bubble-link">';
		  			html += '<form class="bubble-form" action="#">';
		    			//html += '<input class="bubble-input" type="text" placeholder="Text">';
		    			html += '<textarea class="bubble-text bubble-input" rows="2" cols="30" placeholder="type message"></textarea>';
		    			html += '<input type="submit" value="Write Message" >';
		  			html += '</form>';
		  		html += '</div>';
		  	html += '<span class="bubble-hangdown-1"></span>';
		  	html += '<span class="bubble-hangdown-2"></span>';
		  	html += '<span class="bubble-hangdown-3"></span>';
		  	html += '<span class="bubble-hangdown-4"></span>';
		html += '</div>';

	$('.objectid-'+objectid).append(html);
	$('.bubble-form').submit(function(e) {

		var message = $('.bubble-text').val();

		//find block that the player is facing
		var id = 1;
		var direction = getObjectDirection(id, "player");
		var block = getObjectCurrentBlock(id);
		switch (direction) {
			case "up": block = block - (mapwidth+1); break;
			case "down": block = block + (mapwidth-1); break;
			case "left": block = block - 2; break;
			case "right": block = block; break;
		}
		
		$('.block:eq('+block+')').attr("data-text", message);
		//$('.block:eq('+block+')').remove();

		console.log('write message to block #: ' + block);
		console.log('write message: ' + message);

		$('.bubble-wrap').remove();
		disablekeyboardevents = false;

		event.preventDefault();

	});

	disablekeyboardevents = true;

	$('.bubble-text').focus();
};
readSign = function(block) {
	var message = $('.block:eq('+block+')').attr("data-text");
	//alert(message);
	var html = '<div class="bubble-wrap">';
				html += '<div class="bubble-link">';
		  			html += '<form class="bubble-form" action="#">';
		  				html += '<h3>'+message+'</h3>';
		    			//html += '<input class="bubble-input" type="text" placeholder="Text">';
		    			//html += '<textarea class="bubble-text bubble-input" rows="2" cols="30" placeholder="type message"></textarea>';
		    			html += '<input type="submit" value="Okay!" >';
		  			html += '</form>';
		  		html += '</div>';
		  	html += '<span class="bubble-hangdown-1"></span>';
		  	html += '<span class="bubble-hangdown-2"></span>';
		  	html += '<span class="bubble-hangdown-3"></span>';
		  	html += '<span class="bubble-hangdown-4"></span>';
		html += '</div>';

	$('.objectid-'+1).append(html);

	$('.bubble-form').submit(function(e) {

		//var message = $('.bubble-text').val();

		//find block that the player is facing
		var id = 1;
		var direction = getObjectDirection(id, "player");
		var block = getObjectCurrentBlock(id);
		switch (direction) {
			case "up": block = block - (mapwidth+1); break;
			case "down": block = block + (mapwidth-1); break;
			case "left": block = block - 2; break;
			case "right": block = block; break;
		}
		
		$('.block:eq('+block+')').attr("data-text", message);
		//$('.block:eq('+block+')').remove();

		//console.log('write message to block #: ' + block);
		//console.log('write message: ' + message);

		$('.bubble-wrap').remove();

		event.preventDefault();

	});
};

