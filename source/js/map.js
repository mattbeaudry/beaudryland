import * as globals from './globals';
import { Utility } from './utility';
var blUtil = new Utility();

export class Map {

	constructor() {
		this.mapsContainer = $('.maps-wrap');
		this.overlayhtml = '';
	}

	setupMap() {
		blUtil.log("Map Setup");
		globals.totalmapblocks = globals.mapwidth * globals.mapheight;
		globals.mapwidthpx = globals.mapwidth * globals.gridunitpx;
		globals.mapheightpx = globals.mapheight * globals.gridunitpx;
		var mapwidth = globals.mapwidth;
		var terrain_circle = [
			-1, -2, -3, -4, -5, -6,
			-(1+mapwidth), -(2+mapwidth), -(3+mapwidth), -(4+mapwidth), -(5+mapwidth), -(6+mapwidth),
			-(1-mapwidth), -(2-mapwidth), -(3-mapwidth), -(4-mapwidth), -(5-mapwidth), -(6-mapwidth),
			-(2+mapwidth*2), -(3+mapwidth*2), -(4+mapwidth*2), -(5+mapwidth*2),
			-(2-mapwidth*2), -(3-mapwidth*2), -(4-mapwidth*2), -(5-mapwidth*2)
		];
		$('.the-fucking-forest-map').css("width", globals.mapwidthpx+"px");
		$('.the-fucking-forest-map').css("height", globals.mapheightpx+"px");
	}

	loadExistingMap(maptype) {
		$.post('php/loadmap.php', {maptype:maptype}, function(data) {
			blUtil.log("existing user");
			var mapblocks = JSON.parse(data);
			var mapdata = "";
			var total = globals.totalmapblocks;
			for (var i=0; i<total; i++) {
				mapdata += '<div data-blockid="'+globals.globalmapblockcount+'" data-blocktype="'+mapblocks[i]+'" data-blockhealth="10" class="block block-'+mapblocks[i]+'"></div>';
				globals.globalmapblockcount++;
			}
			if (maptype == 'forest') {
				$('.maps-wrap').append('<div class="the-fucking-forest-map cube-side cube-front" data-maptype="forest"></div>');
				$('.the-fucking-forest-map').html(mapdata);
			} else if (maptype == 'winter') {
				$('.maps-wrap').append('<div class="the-fucking-winter-map cube-side cube-right" data-maptype="winter"></div>');
				$('.the-fucking-winter-map').css("width", globals.mapwidthpx+"px");
				$('.the-fucking-winter-map').css("height", globals.mapheightpx+"px");
				$('.the-fucking-winter-map').html(mapdata);
			} else if (maptype == 'beach') {
				$('.maps-wrap').append('<div class="the-fucking-beach-map cube-side cube-back" data-maptype="beach"></div>');
				$('.the-fucking-beach-map').css("width", globals.mapwidthpx+"px");
				$('.the-fucking-beach-map').css("height", globals.mapheightpx+"px");
				$('.the-fucking-beach-map').html(mapdata);
				//startWaves();
			}
		});
	}

	saveMap() {
		blUtil.log("save map");
		var playerdiv = $('.the-fucking-player').prop("outerHTML");
		$('.the-fucking-player').remove();
		//save forest map
		var mapblocks = new Array();
		var total = globals.totalmapblocks;
	    for (var i=0; i<=total; i++){
	    	var blocktype = $('.the-fucking-forest-map div:eq('+i+')').attr('data-blocktype');
			mapblocks[i] = blocktype;
		}
		var jsonmapblocks = JSON.stringify(mapblocks);
	    $.post('php/savemap.php', {mapdata: jsonmapblocks, maptype:'forest'}, function(data) {
	        //$('body').append(data);
	        blUtil.log("save mapdata: "+data);
	    });
	    //save winter map
	    if ($('.the-fucking-winter-map').length) {
			var wintermapblocks = new Array();
			var total = globals.totalmapblocks;
			for (var i=0; i<=total; i++){
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
		        blUtil.log("save mapdata: "+data);
		    });
		}
		//save beach map
		if ($('.the-fucking-beach-map').length) {
			//save winter map
			var beachmapblocks = new Array();
			var total = globals.totalmapblocks;
			for (var i=0; i<=total; i++){
				var blocktype = $('.the-fucking-beach-map div:eq('+i+')').attr('data-blocktype');
				beachmapblocks[i] = blocktype;
			}
			//alert("winter map exists");
			var jsonbeachmapblocks = JSON.stringify(beachmapblocks);
		    $.post('php/savemap.php', {mapdata: jsonbeachmapblocks, maptype:'beach'}, function(data) {
		        //$('body').append(data);
		        blUtil.log("save mapdata: "+data);
		    });
		}
	    $('.the-fucking-forest-map').append(playerdiv);
	}

	changeBlockType(block, newtype, map) {
		blUtil.log("changing block "+block+" to "+newtype);
		var blockClass = '.the-fucking-'+map+'-map .block:eq('+block+')';
		$(blockClass).removeClass(globals.allblockclasses);
		$(blockClass).addClass("block block-"+newtype);
		$(blockClass).attr("data-blocktype", newtype);
	}

	loadNewMap(maptype, cubeside) {

		//CREATE RANDOM FOREST TERRAIN
		this.mapsContainer.append('<div class="the-fucking-'+maptype+'-map cube-side cube-'+cubeside+'" data-maptype="'+maptype+'"></div>');
		var map = $('.the-fucking-'+maptype+'-map');
		var maphtml = '';
		map.css("width", globals.mapwidthpx+"px");
		map.css("height", globals.mapheightpx+"px");
		
		switch (maptype) {
			case 'forest':
				for (var f = 0; f <= (globals.totalmapblocks - 1); f++){
					var r = Math.random();
					var blocktype;
					if (r<0.7) { blocktype = "grass"; }
					else if (r>0.98) { blocktype = "rock"; }
					else if (r>0.96) { blocktype = "appletree"; }
					/*
					else if (r>0.96) { blocktype = "carrot-inground"; }
					else if (r>0.94) { blocktype = "flowers"; }
					else if (r>0.92) { blocktype = "mushroom"; }
					else if (r>0.90) { blocktype = "appletree"; }
					*/
					else if (r>0.8) { blocktype = "tree"; }
					else { blocktype = "water"; }

					maphtml += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'">'+f+'</div>';
				}
				break;

			case 'winter':
				for (var f = 0; f <= (globals.totalmapblocks - 1); f++){
					//random block generation
					var r = Math.random();
					var blocktype;
					if (r<0.9) { blocktype = "snow"; }
					else if (r>0.98) { blocktype = "icerock"; }
					else if (r>0.96) { blocktype = "pinetree"; }
					else { blocktype = "ice"; }
					maphtml += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
				}
				break;

			case 'beach':
				var maphalf = 0.5 * globals.mapwidth;
				var shoreedge = maphalf;
				for (var f = 0; f <= (globals.totalmapblocks - 1); f++){
					var r = Math.random();
					var blocktype;
					var rowposition = f % globals.mapwidth;
					if (rowposition == 0) {
						shoreedge = parseInt(Math.random() * 3) + 2;
						blUtil.log(shoreedge);
					}
					if (rowposition <= (maphalf-shoreedge)) {
						if (r<0.96) { blocktype = "sand"; }
						else if (r>0.98) { blocktype = "sandstone"; }
						else if (r>0.96) { blocktype = "palmtree"; }
					} else {
						if (r<=0.98) { blocktype = "water"; }
						else if (r>0.98) { blocktype = "wave"; }
					}
					maphtml += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
				}
				break;

			case 'jungle':
				for (var f = 0; f <= (globals.totalmapblocks - 1); f++){
					var r = Math.random();
					var blocktype;
					if (r>0.97) { blocktype = "flowers"; }
					else if (r>0.8) { blocktype = "pinetree"; }
					else if (r>0.7) { blocktype = "appletree"; }
					else if (r>0.6) { blocktype = "palmtree"; }
					else if (r>0.5) { blocktype = "oaktree"; }
					else if (r>0.4) { blocktype = "talltree"; }
					else if (r>0.3) { blocktype = "tree"; } 
					else { blocktype = "grass"; }
					maphtml += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
				}
				break;

			case 'desert':
				for (var f = 0; f <= (globals.totalmapblocks - 1); f++){
					var r = Math.random();
					var blocktype;
					if (r<0.9) { blocktype = "sand"; }
					else if (r>0.98) { blocktype = "palmtree"; }
					else if (r>0.976) { blocktype = "sandstone"; }
					else if (r>0.972) { blocktype = "bluemushroom"; }
					else if (r>0.968) { blocktype = "water"; }
					else if (r>0.966) { blocktype = "wetsand"; }
					else { blocktype = "sand"; }
					maphtml += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
				}
				break;

			case 'islands':
				for (var f = 0; f <= (globals.totalmapblocks - 1); f++){
					var r = Math.random();
					var blocktype;
					if (r<0.9) { blocktype = "water"; }
					else if (r>0.98) { blocktype = "water"; }
					else if (r>0.976) { blocktype = "wave"; }
					/*
					else if (r>0.972) { blocktype = "palmtree"; }
					else if (r>0.968) { blocktype = "earth"; }
					else if (r>0.966) { blocktype = "sun"; }
					*/
					else { blocktype = "water"; }
					maphtml += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
				}
				break;

			case 'space':
				for (var f = 0; f <= (globals.totalmapblocks - 1); f++){
					var r = Math.random();
					var blocktype;
					if (r<0.9) { blocktype = "space"; }
					else if (r>0.98) { blocktype = "star"; }
					else if (r>0.976) { blocktype = "bluegalaxy"; }
					else if (r>0.972) { blocktype = "redgalaxy"; }
					else if (r>0.968) { blocktype = "earth"; }
					else if (r>0.966) { blocktype = "sun"; }
					else { blocktype = "space"; }
					maphtml += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
				}
				break;

			default:
				break;
		}
			
		map.append(maphtml);

		/* CREATE LARGER MAP TERRAIN FEATURES - lakes, forests */
		// var terrainblocks = ["water","tree","grass","water","tree","grass","grass","appletree"];
		// $.each(terrainblocks, function(index, value){
		// 	var randomblockid = randomBlockID();
		// 	$.each(terrain_circle, function(index, offset){
		// 		changeBlockType((randomblockid+offset), value, "forest");
		// 	});
		// });

		/* ADD SOME SPECIAL BLOCKS TO THE MAP */
		// var terrainblocks = [
		// 	"carrot-inground","carrot-inground","flowers","flowers",
		// 	"bluemushroom","bluemushroom","mushroom","mushroom","talltree","talltree","talltree"
		// ];
		// $.each(terrainblocks, function(index, value){
		// 	var randomblockid = randomBlockID();
		// 	changeBlockType(randomblockid, value, "forest");
		// });

	}

	mapPerspective() {
		$('.cube-container').addClass("map-view-perspective");
		setTimeout(
			function() {
				$('.cube-container').removeClass("map-view-perspective");
			}, 
		30000);
	}

};

// var drawNewWinterMap = function() {

// 	/* LOAD WINTER MAP FUNCTION */
// 	$('.maps-wrap').append('<div class="the-fucking-winter-map cube-side cube-right" data-maptype="winter"></div>');
// 	$('.the-fucking-winter-map').css("width", globals.mapwidthpx+"px");
// 	$('.the-fucking-winter-map').css("height", globals.mapheightpx+"px");
// 	var mapdata = "";
// 	for (var f = 0; f <= (totalmapblocks - 1); f++){
// 		//random block generation
// 		var r = Math.random();
// 		var blocktype;
// 		if (r<0.9) { blocktype = "snow"; }
// 		else if (r>0.98) { blocktype = "icerock"; }
// 		else if (r>0.96) { blocktype = "pinetree"; }
// 		else { blocktype = "ice"; }
// 		mapdata += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
// 	}
// 	$('.the-fucking-winter-map').html(mapdata);

// 	/* CREATE MAP TERRAIN FEATURES */
// 	var terrainblocks = ["pinetree","ice", "ice", "pinetree", "snow"];
// 	$.each(terrainblocks, function(index, value){
// 		var randomblockid = randomBlockID();
// 		$.each(terrain_circle, function(index, offset){
// 			changeBlockType((randomblockid+offset), value, "winter");
// 		});
// 	});

// };

// var drawNewBeachMap = function() {

// 	/* LOAD BEACH MAP FUNCTION */
// 	$('.maps-wrap').append('<div class="the-fucking-beach-map cube-side cube-back" data-maptype="beach"></div>');
// 	$('.the-fucking-beach-map').css("width", globals.mapwidthpx+"px");
// 	$('.the-fucking-beach-map').css("height", globals.mapheightpx+"px");
// 	var mapdata = "";
// 	var maphalf = 0.5 * globals.mapwidth;
// 	var shoreedge = maphalf;
// 	for (var f = 0; f <= (totalmapblocks - 1); f++){
// 		//random block generation
// 		var r = Math.random();
// 		var blocktype;
// 		var rowposition = f % globals.mapwidth;
// 		if (rowposition == 0) {
// 			shoreedge = parseInt(Math.random() * 3) + 2;
// 			blUtil.log(shoreedge);
// 		}
// 		if (rowposition <= (maphalf-shoreedge)) {
// 			if (r<0.96) { blocktype = "sand"; }
// 			else if (r>0.98) { blocktype = "sandstone"; }
// 			else if (r>0.96) { blocktype = "palmtree"; }
// 		} else {
// 			if (r<=0.98) { blocktype = "water"; }
// 			else if (r>0.98) { blocktype = "wave"; }
// 		}
// 		//blUtil.log(blocktype+rowposition+maphalf);
// 		mapdata += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
// 	}
// 	$('.the-fucking-beach-map').html(mapdata);

// 	/* CREATE MAP TERRAIN FEATURES */
// 	var terrainblocks = ["sandstone","palmtree","wetsand"];
// 	$.each(terrainblocks, function(index, value){
// 		var randomblockid = Math.floor((Math.random() * totalmapblocks) + 1);
// 		$.each(terrain_circle, function(index, offset){
// 			changeBlockType((randomblockid+offset), value, "beach");
// 		});
// 	});

// 	//startWaves();
// };

// var drawNewSpaceMap = function() {
// 	// LOAD SPACE MAP FUNCTION
// 	$('.maps-wrap').append('<div class="the-fucking-space-map cube-outside" data-maptype="space"></div>');
// 	$('.the-fucking-space-map').css("width", globals.mapwidthpx+"px");
// 	$('.the-fucking-space-map').css("height", globals.mapheightpx+"px");
// 	var mapdata = "";
// 	for (var f = 0; f <= (totalmapblocks - 1); f++){
// 		//random block generation
// 		var r = Math.random();
// 		var blocktype;
// 		if (r<0.9) { blocktype = "space"; }
// 		else if (r>0.98) { blocktype = "star"; }
// 		else if (r>0.976) { blocktype = "bluegalaxy"; }
// 		else if (r>0.972) { blocktype = "redgalaxy"; }
// 		else if (r>0.968) { blocktype = "earth"; }
// 		else if (r>0.966) { blocktype = "sun"; }
// 		else { blocktype = "space"; }
// 		mapdata += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
// 	}
// 	$('.the-fucking-space-map').html(mapdata);
// };

// var drawNewJungleMap = function() {
// 	// LOAD SPACE MAP FUNCTION
// 	$('.maps-wrap').append('<div class="the-fucking-jungle-map cube-side cube-left" data-maptype="jungle"></div>');
// 	$('.the-fucking-jungle-map').css("width", globals.mapwidthpx+"px");
// 	$('.the-fucking-jungle-map').css("height", globals.mapheightpx+"px");
// 	var mapdata = "";
// 	for (var f = 0; f <= (totalmapblocks - 1); f++){
// 		//random block generation
// 		var r = Math.random();
// 		var blocktype;
// 		if (r>0.97) { blocktype = "flowers"; }
// 		else if (r>0.8) { blocktype = "pinetree"; }
// 		else if (r>0.7) { blocktype = "appletree"; }
// 		else if (r>0.6) { blocktype = "palmtree"; }
// 		else if (r>0.5) { blocktype = "oaktree"; }
// 		else if (r>0.4) { blocktype = "talltree"; }
// 		else if (r>0.3) { blocktype = "tree"; } 
// 		else { blocktype = "grass"; }
// 		mapdata += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
// 	}
// 	$('.the-fucking-jungle-map').html(mapdata);

// 	/* CREATE MAP TERRAIN FEATURES */
// 	var terrainblocks = ["grass","grass","grass","water","water","water","appletree","pinetree","palmtree"];
// 	$.each(terrainblocks, function(index, value){
// 		var randomblockid = randomBlockID();
// 		$.each(terrain_circle, function(index, offset){
// 			changeBlockType((randomblockid+offset), value, "jungle");
// 		});
// 	});

// 	/* ADD SOME SPECIAL BLOCKS TO THE MAP */
// 	var terrainblocks = [
// 		"redmushroom","carrot-inground","flowers","flowers","apple","apple",
// 		"bluemushroom","bluemushroom","sand","sand","diamond","gold","silver",
// 		"portal-a","portal-b"
// 	];
// 	$.each(terrainblocks, function(index, value){
// 		var randomblockid = randomBlockID();
// 		changeBlockType(randomblockid, value, "jungle");
// 	});
// };

// var drawNewDesertMap = function() {
// 	// LOAD SPACE MAP FUNCTION
// 	$('.maps-wrap').append('<div class="the-fucking-desert-map cube-side cube-top" data-maptype="desert"></div>');
// 	$('.the-fucking-desert-map').css("width", globals.mapwidthpx+"px");
// 	$('.the-fucking-desert-map').css("height", globals.mapheightpx+"px");
// 	var mapdata = "";
// 	for (var f = 0; f <= (totalmapblocks - 1); f++){
// 		//random block generation
// 		var r = Math.random();
// 		var blocktype;
// 		if (r<0.9) { blocktype = "sand"; }
// 		else if (r>0.98) { blocktype = "palmtree"; }
// 		else if (r>0.976) { blocktype = "sandstone"; }
// 		else if (r>0.972) { blocktype = "bluemushroom"; }
// 		else if (r>0.968) { blocktype = "water"; }
// 		else if (r>0.966) { blocktype = "wetsand"; }
// 		else { blocktype = "sand"; }
// 		mapdata += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
// 	}
// 	$('.the-fucking-desert-map').html(mapdata);

// 	/* CREATE MAP TERRAIN FEATURES */
// 	var terrainblocks = ["water","wetsand"];
// 	$.each(terrainblocks, function(index, value){
// 		var randomblockid = randomBlockID();
// 		$.each(terrain_circle, function(index, offset){
// 			changeBlockType((randomblockid+offset), value, "desert");
// 		});
// 	});

// 	/* ADD SOME SPECIAL BLOCKS TO THE MAP */
// 	var terrainblocks = [
// 		"redmushroom","flowers","flowers"
// 	];
// 	$.each(terrainblocks, function(index, value){
// 		var randomblockid = randomBlockID();
// 		changeBlockType(randomblockid, value, "desert");
// 	});
// };

// var drawNewIslandMap = function() {
// 	// LOAD SPACE MAP FUNCTION
// 	$('.maps-wrap').append('<div class="the-fucking-island-map cube-side cube-bottom" data-maptype="island"></div>');
// 	$('.the-fucking-island-map').css("width", globals.mapwidthpx+"px");
// 	$('.the-fucking-island-map').css("height", globals.mapheightpx+"px");
// 	var mapdata = "";
// 	for (var f = 0; f <= (totalmapblocks - 1); f++){
// 		//random block generation
// 		var r = Math.random();
// 		var blocktype;
// 		if (r<0.9) { blocktype = "water"; }
// 		else if (r>0.98) { blocktype = "water"; }
// 		else if (r>0.976) { blocktype = "wave"; }
// 		/*
// 		else if (r>0.972) { blocktype = "palmtree"; }
// 		else if (r>0.968) { blocktype = "earth"; }
// 		else if (r>0.966) { blocktype = "sun"; }
// 		*/
// 		else { blocktype = "water"; }
// 		mapdata += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
// 	}
// 	$('.the-fucking-island-map').html(mapdata);

// 	/* CREATE MAP TERRAIN FEATURES */
// 	var terrainblocks = ["grass","grass","grass","grass","grass","grass","grass","grass","sand",
// 	"grass","grass","grass","grass","grass","grass","grass","grass","sand",
// 	"grass","grass","grass","grass","grass","grass","grass","grass","sand"];
// 	$.each(terrainblocks, function(index, value){
// 		var randomblockid = randomBlockID();
// 		$.each(terrain_circle, function(index, offset){
// 			changeBlockType((randomblockid+offset), value, "island");
// 		});
// 	});

// 	/* ADD SOME SPECIAL BLOCKS TO THE MAP */
// 	var terrainblocks = [
// 		"redmushroom","carrot-inground","flowers","flowers","apple","apple",
// 		"bluemushroom","bluemushroom","sand","sand","diamond","gold","silver",
// 		"portal-a","portal-b"
// 	];
// 	$.each(terrainblocks, function(index, value){
// 		var randomblockid = randomBlockID();
// 		changeBlockType(randomblockid, value, "island");
// 	});
// };