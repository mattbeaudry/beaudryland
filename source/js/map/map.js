import * as globals from '../globals';
import { Terrain } from './terrain';
import { Utility } from '../utility';

var blUtil = new Utility();
var blTerrain = new Terrain();

export class Map {

	constructor() {
		this.mapsContainer = $('.maps-wrap');
		this.overlayhtml = '';
		this.mapHeight = globals.mapheight;
		this.mapWidth = globals.mapwidth;
		this.mapHeightPx;
		this.mapWidthPx;
		this.mapTotalBlocks;
		this.globalMapBlockCount;
	}

	setupMap(mapsize) {
		blUtil.log("Map Setup");
		blUtil.log("map width"+globals.mapWidthDesktop);

		if (mapsize == 'mobile'){
			globals.mapwidth = globals.mapWidthMobile;
			globals.mapheight = globals.mapHeightMobile;
			globals.totalmapblocks = globals.mapWidthMobile * globals.mapHeightMobile;
			this.mapWidth = globals.mapWidthMobile;
			this.mapHeight = globals.mapHeightMobile;
			this.mapTotalBlocks = globals.mapWidthMobile * globals.mapHeightMobile;
			this.mapWidthPx = globals.mapWidthMobile * globals.gridunitpx;
			this.mapHeightPx = globals.mapHeightMobile * globals.gridunitpx;
		} else {
			globals.mapwidth = globals.mapWidthDesktop;
			globals.mapheight = globals.mapHeightDesktop;
			globals.totalmapblocks = globals.mapWidthDesktop * globals.mapHeightDesktop;
			this.mapWidth = globals.mapWidthDesktop;
			this.mapHeight = globals.mapHeightDesktop;
			this.mapTotalBlocks = globals.mapWidthDesktop * globals.mapHeightDesktop;
			this.mapWidthPx = globals.mapWidthDesktop * globals.gridunitpx;
			this.mapHeightPx = globals.meapHeightDesktop * globals.gridunitpx;
		}
		$('.the-fucking-forest-map').css("width", this.mapWidthPx+"px");
		$('.the-fucking-forest-map').css("height", this.mapHeightPx+"px");
	}

	loadExistingMap(maptype) {
		$.post('php/loadmap.php', {maptype:maptype}, function(data) {
			blUtil.log("existing user");
			var mapblocks = JSON.parse(data);
			var mapdata = "";
			var total = this.mapTotalBlocks;
			for (var i=0; i<total; i++) {
				mapdata += '<div data-blockid="'+this.globalMapBlockCount+'" data-blocktype="'+mapblocks[i]+'" data-blockhealth="10" class="block block-'+mapblocks[i]+'"></div>';
				this.globalMapBlockCount++;
			}
			if (maptype == 'forest') {
				$('.maps-wrap').append('<div class="the-fucking-forest-map cube-side cube-front" data-maptype="forest"></div>');
				$('.the-fucking-forest-map').html(mapdata);
			} else if (maptype == 'winter') {
				$('.maps-wrap').append('<div class="the-fucking-winter-map cube-side cube-right" data-maptype="winter"></div>');
				$('.the-fucking-winter-map').html(mapdata);
			} else if (maptype == 'beach') {
				$('.maps-wrap').append('<div class="the-fucking-beach-map cube-side cube-back" data-maptype="beach"></div>');
				$('.the-fucking-beach-map').html(mapdata);
			} else if (maptype == 'jungle') { 
				$('.maps-wrap').append('<div class="the-fucking-jungle-map cube-side cube-left" data-maptype="jungle"></div>');
				$('.the-fucking-jungle-map').html(mapdata);
			} else if (maptype == 'desert') {
				$('.maps-wrap').append('<div class="the-fucking-desert-map cube-side cube-bottom" data-maptype="desert"></div>');
				$('.the-fucking-desert-map').html(mapdata);
			} else if (maptype == 'islands') {
				$('.maps-wrap').append('<div class="the-fucking-islands-map cube-side cube-top" data-maptype="islands"></div>');
				$('.the-fucking-islands-map').html(mapdata);
			}
		});
	}

	saveMap() {
		blUtil.log("save map");
		var playerdiv = $('.the-fucking-player').prop("outerHTML");
		$('.the-fucking-player').remove();
		//save forest map
		var mapblocks = new Array();
		var total = this.mapTotalBlocks;
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
			for (var i=0; i<=this.mapTotalBlocks; i++){
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
			for (var i=0; i<=this.mapTotalBlocks; i++){
				var blocktype = $('.the-fucking-beach-map div:eq('+i+')').attr('data-blocktype');
				beachmapblocks[i] = blocktype;
			}
			var jsonbeachmapblocks = JSON.stringify(beachmapblocks);
		    $.post('php/savemap.php', {mapdata: jsonbeachmapblocks, maptype:'beach'}, function(data) {
		        //$('body').append(data);
		        blUtil.log("save mapdata: "+data);
		    });
		}
		//save jungle map
		if ($('.the-fucking-jungle-map').length) {
			var junglemapblocks = new Array();
			for (var i=0; i<=this.mapTotalBlocks; i++){
				var blocktype = $('.the-fucking-jungle-map div:eq('+i+')').attr('data-blocktype');
				junglemapblocks[i] = blocktype;
			}
			var jsonjunglemapblocks = JSON.stringify(junglemapblocks);
		    $.post('php/savemap.php', {mapdata: jsonjunglemapblocks, maptype:'jungle'}, function(data) {
		        //$('body').append(data);
		        blUtil.log("save mapdata: "+data);
		    });
		}
		//save desert map
		if ($('.the-fucking-desert-map').length) {
			var desertmapblocks = new Array();
			for (var i=0; i<=this.mapTotalBlocks; i++){
				var blocktype = $('.the-fucking-desert-map div:eq('+i+')').attr('data-blocktype');
				desertmapblocks[i] = blocktype;
			}
			var jsondesertmapblocks = JSON.stringify(desertmapblocks);
		    $.post('php/savemap.php', {mapdata: jsondesertmapblocks, maptype:'desert'}, function(data) {
		        //$('body').append(data);
		        blUtil.log("save mapdata: "+data);
		    });
		}
		//save islands map
		if ($('.the-fucking-islands-map').length) {
			var islandsmapblocks = new Array();
			for (var i=0; i<=this.mapTotalBlocks; i++){
				var blocktype = $('.the-fucking-islands-map div:eq('+i+')').attr('data-blocktype');
				islandsmapblocks[i] = blocktype;
			}
			//alert("winter map exists");
			var jsonislandsmapblocks = JSON.stringify(islandsmapblocks);
		    $.post('php/savemap.php', {mapdata: jsonislandsmapblocks, maptype:'islands'}, function(data) {
		        //$('body').append(data);
		        blUtil.log("save mapdata: "+data);
		    });
		}
	    $('.the-fucking-forest-map').append(playerdiv);
	}

	changeBlockType(block, newtype, map) {
		//blUtil.log("changing block "+block+" to "+newtype);
		var blockClass = '.the-fucking-'+map+'-map .block:eq('+block+')';
		$(blockClass).removeClass(globals.allblockclasses);
		$(blockClass).addClass("block block-"+newtype);
		$(blockClass).attr("data-blocktype", newtype);
	}

	loadNewMap(maptype, cubeside) {
		var lakeBlocks = [];
		var specialBlocks = [];
		var riverBlocksX = [];
		var riverBlocksY = [];
		var cabin = false;
		var total = globals.totalmapblocks;

		console.log('****loadNewMap****');
		console.log('this.mapWidth'+this.mapWidth);

		if (cubeside == 'background'){
			$('.maps-container').append('<div class="the-fucking-'+maptype+'-map" data-maptype="'+maptype+'"></div>');
		} else {
			this.mapsContainer.append('<div class="the-fucking-'+maptype+'-map cube-side cube-'+cubeside+'" data-maptype="'+maptype+'"></div>');
		}
		
		var map = $('.the-fucking-'+maptype+'-map');
		var maphtml = '';

		console.log("*********LOADMAP"+maptype);

		console.log('this.mapWidth'+this.mapWidth);
		
		switch (maptype) {
			case 'forest':
				for (var f = 0; f <= (total - 1); f++) {
					var r = Math.random();
					var blocktype;
					if (r<0.7) { blocktype = "grass"; }
					else if (r>0.98) { blocktype = "rock"; }
					else if (r>0.96) { blocktype = "appletree"; }
					else if (r>0.94) { blocktype = "carrot-inground"; }
					else if (r>0.92) { blocktype = "flower"; }
					else if (r>0.90) { blocktype = "mushroom"; }
					else if (r>0.88) { blocktype = "appletree"; }
					else if (r>0.8) { blocktype = "tree"; }
					else { blocktype = "grass"; }
					maphtml += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'">'+f+'</div>';
				}
				lakeBlocks = ["water","tree","grass","water","tree","grass","appletree","water"];
				specialBlocks = [
					"carrot-inground","carrot-inground","flower","flower",
					"bluemushroom","bluemushroom","mushroom","mushroom"
				];
				riverBlocksX = ["water"];
				riverBlocksY = ["water"];
				cabin = true;
				break;

			case 'winter':
				for (var f = 0; f <= (total - 1); f++) {
					// console.log("step");
					var r = Math.random();
					var blocktype;
					if (r<0.9) { blocktype = "snow"; }
					else if (r>0.98) { blocktype = "icerock"; }
					else if (r>0.96) { blocktype = "pinetree"; }
					else { blocktype = "ice"; }

					maphtml += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
				}

				lakeBlocks = ["pinetree","ice", "ice", "pinetree", "snow"];
				specialBlocks = ["apple"];
				riverBlocksX = ['water'];
				riverBlocksY = ['water'];
				break;

			case 'beach':
				console.log('this.mapWidth'+this.mapWidth);
				console.log('BEACH!');
				console.log('this.mapWidth: '+this.mapWidth);
				var maphalf = 0.5 * this.mapWidth;
				console.log('maphalf: '+maphalf);
				var shoreedge = maphalf;
				console.log('shoreedge: '+shoreedge);
				for (var f = 0; f <= (total - 1); f++){
					var r = Math.random();
					var blocktype;
					var rowposition = f % this.mapWidth;
					if (rowposition == 0) {
						shoreedge = parseInt(Math.random() * 3) + 2;
						blUtil.log(shoreedge);
					}
					if (rowposition <= (maphalf-shoreedge)) {
						if (r<0.96) { blocktype = "sand"; }
						else if (r>0.98) { blocktype = "sandstone"; }
						else if (r>0.96) { blocktype = "palmtree"; }
					} else {
						if (r<=0.995) { blocktype = "water"; }
						else if (r>0.995) { blocktype = "wave"; }
					}
					maphtml += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
				}
				lakeBlocks = ["sand", "grass"];
				specialBlocks = ["canoe"];
				riverBlocksX = ['water'];
				riverBlocksY = ['water'];
				break;

			case 'jungle':
				for (var f = 0; f <= (total - 1); f++){
					var r = Math.random();
					var blocktype;
					if (r>0.97) { blocktype = "flowers"; }
					else if (r>0.8) { blocktype = "pinetree"; }
					else if (r>0.7) { blocktype = "appletree"; }
					else if (r>0.6) { blocktype = "palmtree"; }
					//else if (r>0.5) { blocktype = "oaktree"; }
					//else if (r>0.4) { blocktype = "talltree"; }
					else if (r>0.5) { blocktype = "tree"; } 
					else { blocktype = "grass"; }
					maphtml += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
				}
				lakeBlocks = ["grass","grass","grass","water","water","water","appletree","pinetree","palmtree"];
				specialBlocks = [
					"redmushroom","carrot-inground","flowers","flowers","apple","apple",
					"bluemushroom","bluemushroom","sand","sand","diamond","gold","silver",
					"portal-a","portal-b"
				];
				riverBlocksX = ['water'];
				riverBlocksY = ['water'];
				break;

			case 'desert':
				for (var f = 0; f <= (total - 1); f++){
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
				lakeBlocks = ["water","wetsand"];
				specialBlocks = [
					"redmushroom","flowers","flowers"
				];
				riverBlocksX = ['water'];
				riverBlocksY = ['water'];
				break;

			case 'islands':
				for (var f = 0; f <= (total - 1); f++){
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
				lakeBlocks = [
					"grass","grass","grass","grass","grass","grass","grass","grass","sand",
					"grass","grass","grass","grass","grass","grass","grass","grass","sand",
					"grass","grass","grass","grass","grass","grass","grass","grass","sand"
				];
				specialBlocks = [
					"redmushroom","carrot-inground","flowers","flowers","apple","apple",
					"bluemushroom","bluemushroom","sand","sand","diamond","gold","silver",
					"portal-a","portal-b"
				];
				riverBlocksX = ['water'];
				riverBlocksY = ['water'];
				break;

			case 'space':
				for (var f = 0; f <= (total - 1); f++){
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
				lakeBlocks = [];
				specialBlocks = [];
				riverBlocksX = [];
				riverBlocksY = [];
				break;

			default:
				break;
		}

		// console.log('maphtml:'+maphtml);
		$('.the-fucking-'+maptype+'-map').append(maphtml);

		for (var i = 0; i<lakeBlocks.length; i++) {
		    var randomBlockId = blUtil.randomBlockID();
		    var blockType = lakeBlocks[i];
		    var terrainBlocks = blTerrain.terrainLake(this.mapWidth);
		    for (var j = 0; j<terrainBlocks.length; j++) {
		    	var offset = terrainBlocks[j];
		    	this.changeBlockType((randomBlockId+offset), blockType, maptype);
			}
		}

		for (var i = 0; i<specialBlocks.length; i++) {
			var randomBlockId = blUtil.randomBlockID();
			this.changeBlockType(randomBlockId, blockType, maptype);
		}

		for (var i = 0; i<riverBlocksX.length; i++) {
		    var randomBlockId = blUtil.randomBlockID();
		    var blockType = riverBlocksX[i];
		    var terrainBlocks = blTerrain.terrainRiverX(this.mapWidth);
		    for (var j = 0; j<terrainBlocks.length; j++) {
		    	var offset = terrainBlocks[j];
		    	this.changeBlockType((randomBlockId+offset), blockType, maptype);
			}
		}

		for (var i = 0; i<riverBlocksY.length; i++) {
		    var randomBlockId = blUtil.randomBlockID();
		    var blockType = riverBlocksY[i];
		    var terrainBlocks = blTerrain.terrainRiverY(this.mapWidth);
		    for (var j = 0; j<terrainBlocks.length; j++) {
		    	var offset = terrainBlocks[j];
		    	this.changeBlockType((randomBlockId+offset), blockType, maptype);
			}
		}

		if (cabin == true) {
			var randomBlockId = blUtil.randomBlockID();
			var terrainBlocks = blTerrain.terrainCabin();
			var canvasWidth = 5;
			var rowOffset = 0;
			var rowIndex = 0;
			for (var j = 0; j<terrainBlocks.length; j++) {

				var blockType = terrainBlocks[j];
				var newRow = j % canvasWidth;

				if (newRow == 0) {
					rowOffset++;
					rowIndex = 0;
				} else { 
					rowIndex++;
				}

				console.log("********** CABIN ******** this.mapWidth: "+this.mapWidth);

				var blockId = randomBlockId + rowIndex + (rowOffset * this.mapWidth);

				switch(blockType) {
					case '-': blockType = 'none'; break;
					case 'W': blockType = 'wood'; break;
					case 'F': blockType = 'fire'; break;
					case 'D': blockType = 'door'; break;
					default: blockType = 'none'; break;
				}

				if (blockType != 'none') {
					this.changeBlockType(blockId, blockType, maptype);
				}
				
			}
		}

		//blAchievement.updateStats();

	}

	mapPerspective() {
		$('.cube-container').toggleClass("map-view-perspective");
	}

	hallucinate() {
		$('body').toggleClass("mushrooms");
	}

};