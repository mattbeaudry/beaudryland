import * as globals from '../globals';
import { Terrain } from './terrain';
import { Utility } from '../utility';

var blUtil = new Utility();
var blTerrain = new Terrain();

export class Map {
	constructor() {
		this.mapsContainer = document.querySelector('.maps-wrap');
		this.overlayhtml = '';
		this.mapHeightPx;
		this.mapWidthPx;
		this.globalMapBlockCount;
	}

	setupMap(mapsize) {
		blUtil.log('Map Setup');
		blUtil.log('map width' + globals.mapWidthDesktop);

		if (mapsize == 'mobile') {
			this.mapWidth = globals.mapWidthMobile;
			this.mapHeight = globals.mapHeightMobile;
			this.mapTotalBlocks = globals.mapWidthMobile * globals.mapHeightMobile;
			this.mapWidthPx = globals.mapWidthMobile * globals.gridunitpx;
			this.mapHeightPx = globals.mapHeightMobile * globals.gridunitpx;
		} else {
			this.mapWidth = globals.mapWidthDesktop;
			this.mapHeight = globals.mapHeightDesktop;
			this.mapTotalBlocks = globals.mapWidthDesktop * globals.mapHeightDesktop;
			this.mapWidthPx = globals.mapWidthDesktop * globals.gridunitpx;
			this.mapHeightPx = globals.mapHeightDesktop * globals.gridunitpx;
		}

		console.log('setupMap');
		console.log('this.mapTotalBlocks' + globals.totalmapblocks);

		document.querySelector('.the-fucking-forest-map').style.width = this.mapWidthPx + 'px';
		document.querySelector('.the-fucking-forest-map').style.height = this.mapHeightPx + 'px';
	}

	loadExistingMap(maptype) {
		fetch('php/loadmap.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({ maptype: maptype }),
		})
			.then((r) => r.text())
			.then(function (data) {
				blUtil.log('existing user');
				var mapblocks = JSON.parse(data);
				var mapdata = '';
				var total = globals.totalmapblocks;
				for (var i = 0; i < total; i++) {
					mapdata +=
						'<div data-blockid="' +
						i +
						'" data-blocktype="' +
						mapblocks[i] +
						'" data-blockhealth="10" class="block block-' +
						mapblocks[i] +
						'"></div>';
				}
				if (maptype == 'forest') {
					document
						.querySelector('.maps-wrap')
						.insertAdjacentHTML(
							'beforeend',
							'<div class="the-fucking-forest-map cube-side cube-front" data-maptype="forest"></div>'
						);
					document.querySelector('.the-fucking-forest-map').innerHTML = mapdata;
				} else if (maptype == 'winter') {
					document
						.querySelector('.maps-wrap')
						.insertAdjacentHTML(
							'beforeend',
							'<div class="the-fucking-winter-map cube-side cube-right" data-maptype="winter"></div>'
						);
					document.querySelector('.the-fucking-winter-map').innerHTML = mapdata;
				} else if (maptype == 'beach') {
					document
						.querySelector('.maps-wrap')
						.insertAdjacentHTML(
							'beforeend',
							'<div class="the-fucking-beach-map cube-side cube-back" data-maptype="beach"></div>'
						);
					document.querySelector('.the-fucking-beach-map').innerHTML = mapdata;
				} else if (maptype == 'jungle') {
					document
						.querySelector('.maps-wrap')
						.insertAdjacentHTML(
							'beforeend',
							'<div class="the-fucking-jungle-map cube-side cube-left" data-maptype="jungle"></div>'
						);
					document.querySelector('.the-fucking-jungle-map').innerHTML = mapdata;
				} else if (maptype == 'desert') {
					document
						.querySelector('.maps-wrap')
						.insertAdjacentHTML(
							'beforeend',
							'<div class="the-fucking-desert-map cube-side cube-bottom" data-maptype="desert"></div>'
						);
					document.querySelector('.the-fucking-desert-map').innerHTML = mapdata;
				} else if (maptype == 'islands') {
					document
						.querySelector('.maps-wrap')
						.insertAdjacentHTML(
							'beforeend',
							'<div class="the-fucking-islands-map cube-side cube-top" data-maptype="islands"></div>'
						);
					document.querySelector('.the-fucking-islands-map').innerHTML = mapdata;
				}
			});
	}

	saveMap() {
		blUtil.log('save map');
		var playerEl = document.querySelector('.the-fucking-player');
		var playerdiv = playerEl ? playerEl.outerHTML : '';
		if (playerEl) playerEl.remove();
		//save forest map
		var mapblocks = new Array();
		var total = globals.totalmapblocks;
		var forestDivs = document.querySelectorAll('.the-fucking-forest-map div');
		for (var i = 0; i <= total; i++) {
			var blocktype = forestDivs[i] ? forestDivs[i].getAttribute('data-blocktype') : undefined;
			mapblocks[i] = blocktype;
		}
		var jsonmapblocks = JSON.stringify(mapblocks);
		fetch('php/savemap.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({ mapdata: jsonmapblocks, maptype: 'forest' }),
		})
			.then((r) => r.text())
			.then(function (data) {
				blUtil.log('save mapdata: ' + data);
			});
		//save winter map
		if (document.querySelectorAll('.the-fucking-winter-map').length) {
			var wintermapblocks = new Array();
			var winterDivs = document.querySelectorAll('.the-fucking-winter-map div');
			for (let i = 0; i <= globals.totalmapblocks; i++) {
				let blocktype = winterDivs[i] ? winterDivs[i].getAttribute('data-blocktype') : undefined;
				wintermapblocks[i] = blocktype;
			}
			//alert("winter map exists");
			var jsonwintermapblocks = JSON.stringify(wintermapblocks);
			fetch('php/savemap.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({ mapdata: jsonwintermapblocks, maptype: 'winter' }),
			})
				.then((r) => r.text())
				.then(function (data) {
					blUtil.log('save mapdata: ' + data);
				});
		}
		//save beach map
		if (document.querySelectorAll('.the-fucking-beach-map').length) {
			var beachmapblocks = new Array();
			var beachDivs = document.querySelectorAll('.the-fucking-beach-map div');
			for (let i = 0; i <= this.mapTotalBlocks; i++) {
				let blocktype = beachDivs[i] ? beachDivs[i].getAttribute('data-blocktype') : undefined;
				beachmapblocks[i] = blocktype;
			}
			var jsonbeachmapblocks = JSON.stringify(beachmapblocks);
			fetch('php/savemap.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({ mapdata: jsonbeachmapblocks, maptype: 'beach' }),
			})
				.then((r) => r.text())
				.then(function (data) {
					blUtil.log('save mapdata: ' + data);
				});
		}
		//save jungle map
		if (document.querySelectorAll('.the-fucking-jungle-map').length) {
			var junglemapblocks = new Array();
			var jungleDivs = document.querySelectorAll('.the-fucking-jungle-map div');
			for (let i = 0; i <= this.mapTotalBlocks; i++) {
				let blocktype = jungleDivs[i] ? jungleDivs[i].getAttribute('data-blocktype') : undefined;
				junglemapblocks[i] = blocktype;
			}
			var jsonjunglemapblocks = JSON.stringify(junglemapblocks);
			fetch('php/savemap.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({ mapdata: jsonjunglemapblocks, maptype: 'jungle' }),
			})
				.then((r) => r.text())
				.then(function (data) {
					blUtil.log('save mapdata: ' + data);
				});
		}
		//save desert map
		if (document.querySelectorAll('.the-fucking-desert-map').length) {
			var desertmapblocks = new Array();
			var desertDivs = document.querySelectorAll('.the-fucking-desert-map div');
			for (let i = 0; i <= this.mapTotalBlocks; i++) {
				let blocktype = desertDivs[i] ? desertDivs[i].getAttribute('data-blocktype') : undefined;
				desertmapblocks[i] = blocktype;
			}
			var jsondesertmapblocks = JSON.stringify(desertmapblocks);
			fetch('php/savemap.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({ mapdata: jsondesertmapblocks, maptype: 'desert' }),
			})
				.then((r) => r.text())
				.then(function (data) {
					blUtil.log('save mapdata: ' + data);
				});
		}
		//save islands map
		if (document.querySelectorAll('.the-fucking-islands-map').length) {
			var islandsmapblocks = new Array();
			var islandsDivs = document.querySelectorAll('.the-fucking-islands-map div');
			for (let i = 0; i <= this.mapTotalBlocks; i++) {
				let blocktype = islandsDivs[i] ? islandsDivs[i].getAttribute('data-blocktype') : undefined;
				islandsmapblocks[i] = blocktype;
			}
			var jsonislandsmapblocks = JSON.stringify(islandsmapblocks);
			fetch('php/savemap.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({ mapdata: jsonislandsmapblocks, maptype: 'islands' }),
			})
				.then((r) => r.text())
				.then(function (data) {
					blUtil.log('save mapdata: ' + data);
				});
		}
		document.querySelector('.the-fucking-forest-map').insertAdjacentHTML('beforeend', playerdiv);
	}

	changeBlockType(block, newtype, map) {
		var blockEl = document.querySelectorAll('.the-fucking-' + map + '-map .block')[block];
		if (!blockEl) return;
		blockEl.className = blockEl.className
			.replace(
				new RegExp(
					'\\b' + globals.allblockclasses().trim().split(' ').join('\\b|\\b') + '\\b',
					'g'
				),
				''
			)
			.trim();
		blockEl.classList.add('block', 'block-' + newtype);
		blockEl.setAttribute('data-blocktype', newtype);
	}

	loadNewMap(maptype, cubeside) {
		var lakeBlocks = [];
		var specialBlocks = [];
		var riverBlocksX = [];
		var riverBlocksY = [];
		var cabin = false;

		if (cubeside == 'background') {
			document
				.querySelector('.space-container')
				.insertAdjacentHTML(
					'afterbegin',
					'<div class="the-fucking-' + maptype + '-map" data-maptype="' + maptype + '"></div>'
				);
		} else {
			this.mapsContainer.insertAdjacentHTML(
				'beforeend',
				'<div class="the-fucking-' +
					maptype +
					'-map cube-side cube-' +
					cubeside +
					'" data-maptype="' +
					maptype +
					'"></div>'
			);
		}

		// var map = $('.the-fucking-'+maptype+'-map');
		var maphtml = '';

		switch (maptype) {
			case 'forest':
				for (var f = 0; f <= globals.totalmapblocks - 1; f++) {
					var r = Math.random();
					var blocktype;
					if (r < 0.7) {
						blocktype = 'grass';
					} else if (r > 0.98) {
						blocktype = 'rock';
					} else if (r > 0.96) {
						blocktype = 'appletree';
					} else if (r > 0.8) {
						blocktype = 'tree';
					} else {
						blocktype = 'grass';
					}
					maphtml +=
						'<div data-blockid="' +
						f +
						'" data-blocktype="' +
						blocktype +
						'" data-blockhealth="10" class="block block-' +
						blocktype +
						'">' +
						f +
						'</div>';
				}
				lakeBlocks = ['water', 'tree', 'grass', 'water', 'tree', 'grass', 'appletree', 'water'];
				riverBlocksX = ['water'];
				riverBlocksY = ['water'];
				cabin = true;
				specialBlocks = ['flower', 'mushroom', 'appletree', 'carrot-inground'];
				break;

			case 'winter':
				for (let f = 0; f <= globals.totalmapblocks - 1; f++) {
					let r = Math.random();
					let blocktype;
					if (r < 0.9) {
						blocktype = 'snow';
					} else if (r > 0.98) {
						blocktype = 'icerock';
					} else if (r > 0.96) {
						blocktype = 'pinetree';
					} else {
						blocktype = 'ice';
					}

					maphtml +=
						'<div data-blockid="' +
						f +
						'" data-blocktype="' +
						blocktype +
						'" data-blockhealth="10" class="block block-' +
						blocktype +
						'"></div>';
				}

				lakeBlocks = ['pinetree', 'ice', 'ice', 'pinetree', 'snow'];
				specialBlocks = ['apple'];
				riverBlocksX = ['water'];
				riverBlocksY = ['water'];
				break;

			case 'beach':
				var maphalf = 0.5 * this.mapWidth;
				var shoreedge = maphalf;
				for (let f = 0; f <= globals.totalmapblocks - 1; f++) {
					let r = Math.random();
					let blocktype;
					let rowposition = f % this.mapWidth;
					if (rowposition == 0) {
						shoreedge = parseInt(Math.random() * 3) + 2;
						blUtil.log(shoreedge);
					}
					if (rowposition <= maphalf - shoreedge) {
						if (r < 0.96) {
							blocktype = 'sand';
						} else if (r > 0.98) {
							blocktype = 'sandstone';
						} else if (r > 0.96) {
							blocktype = 'palmtree';
						}
					} else {
						if (r <= 0.997) {
							blocktype = 'water';
						} else if (r > 0.997) {
							blocktype = 'wave';
						}
					}
					maphtml +=
						'<div data-blockid="' +
						f +
						'" data-blocktype="' +
						blocktype +
						'" data-blockhealth="10" class="block block-' +
						blocktype +
						'"></div>';
				}
				specialBlocks = [
					'canoe',
					'palmtree',
					'palmtree',
					'palmtree',
					'palmtree',
					'palmtree',
					'palmtree',
					'palmtree',
					'palmtree',
					'rock',
					'rock',
					'rock',
					'rock',
					'rock',
					'wave',
					'wave',
				];
				break;

			case 'jungle':
				for (let f = 0; f <= globals.totalmapblocks - 1; f++) {
					let r = Math.random();
					let blocktype;
					if (r > 0.97) {
						blocktype = 'flower';
					} else if (r > 0.8) {
						blocktype = 'pinetree';
					} else if (r > 0.7) {
						blocktype = 'appletree';
					} else if (r > 0.6) {
						blocktype = 'palmtree';
					} else if (r > 0.5) {
						blocktype = 'tree';
					} else {
						blocktype = 'grass';
					}
					maphtml +=
						'<div data-blockid="' +
						f +
						'" data-blocktype="' +
						blocktype +
						'" data-blockhealth="10" class="block block-' +
						blocktype +
						'"></div>';
				}
				lakeBlocks = [
					'grass',
					'grass',
					'grass',
					'water',
					'water',
					'water',
					'appletree',
					'pinetree',
					'palmtree',
				];
				specialBlocks = [
					'redmushroom',
					'carrot-inground',
					'flower',
					'flower',
					'apple',
					'apple',
					'bluemushroom',
					'bluemushroom',
					'sand',
					'sand',
					'diamond',
					'gold',
					'silver',
					'portal-a',
					'portal-b',
				];
				riverBlocksX = ['water'];
				riverBlocksY = ['water'];
				break;

			case 'desert':
				for (let f = 0; f <= globals.totalmapblocks - 1; f++) {
					let r = Math.random();
					let blocktype;
					if (r < 0.9) {
						blocktype = 'sand';
					} else if (r > 0.98) {
						blocktype = 'palmtree';
					} else if (r > 0.976) {
						blocktype = 'sandstone';
					} else if (r > 0.972) {
						blocktype = 'bluemushroom';
					} else if (r > 0.968) {
						blocktype = 'water';
					} else if (r > 0.966) {
						blocktype = 'dirt';
					} else {
						blocktype = 'sand';
					}
					maphtml +=
						'<div data-blockid="' +
						f +
						'" data-blocktype="' +
						blocktype +
						'" data-blockhealth="10" class="block block-' +
						blocktype +
						'"></div>';
				}
				//lakeBlocks = ["water"];
				specialBlocks = ['redmushroom', 'flower', 'flower'];
				// riverBlocksX = ['water'];
				// riverBlocksY = ['water'];
				break;

			case 'islands':
				for (let f = 0; f <= globals.totalmapblocks - 1; f++) {
					let r = Math.random();
					let blocktype;
					if (r < 0.9) {
						blocktype = 'water';
					} else if (r > 0.98) {
						blocktype = 'water';
					} else if (r > 0.976) {
						blocktype = 'wave';
					} else {
						blocktype = 'water';
					}
					maphtml +=
						'<div data-blockid="' +
						f +
						'" data-blocktype="' +
						blocktype +
						'" data-blockhealth="10" class="block block-' +
						blocktype +
						'"></div>';
				}
				lakeBlocks = ['grass'];
				riverBlocksY = ['wave', 'wave'];
				specialBlocks = ['portal-a', 'portal-b', 'canoe', 'wave', 'wave'];
				break;

			case 'space':
				for (let f = 0; f <= globals.totalmapblocks - 1; f++) {
					let r = Math.random();
					let blocktype;
					if (r < 0.9) {
						blocktype = 'space';
					} else if (r > 0.98) {
						blocktype = 'star';
					} else if (r > 0.976) {
						blocktype = 'bluegalaxy';
					} else if (r > 0.972) {
						blocktype = 'redgalaxy';
					} else if (r > 0.968) {
						blocktype = 'earth';
					} else if (r > 0.966) {
						blocktype = 'sun';
					} else {
						blocktype = 'space';
					}
					maphtml +=
						'<div data-blockid="' +
						f +
						'" data-blocktype="' +
						blocktype +
						'" data-blockhealth="10" class="block block-' +
						blocktype +
						'"></div>';
				}
				lakeBlocks = [];
				specialBlocks = [];
				riverBlocksX = [];
				riverBlocksY = [];
				break;

			default:
				break;
		}

		document
			.querySelector('.the-fucking-' + maptype + '-map')
			.insertAdjacentHTML('beforeend', maphtml);

		for (let i = 0; i < lakeBlocks.length; i++) {
			let randomBlockId = blUtil.randomBlockID();
			let blockType = lakeBlocks[i];
			let terrainBlocks = blTerrain.terrainLake(this.mapWidth);
			for (let j = 0; j < terrainBlocks.length; j++) {
				let offset = terrainBlocks[j];
				this.changeBlockType(randomBlockId + offset, blockType, maptype);
			}
		}

		for (let i = 0; i < riverBlocksX.length; i++) {
			let randomBlockId = blUtil.randomBlockID();
			let blockType = riverBlocksX[i];
			let terrainBlocks = blTerrain.terrainRiverX(this.mapWidth);
			for (let j = 0; j < terrainBlocks.length; j++) {
				let offset = terrainBlocks[j];
				this.changeBlockType(randomBlockId + offset, blockType, maptype);
			}
		}

		for (let i = 0; i < riverBlocksY.length; i++) {
			let randomBlockId = blUtil.randomBlockID();
			let blockType = riverBlocksY[i];
			let terrainBlocks = blTerrain.terrainRiverY(this.mapWidth);
			for (let j = 0; j < terrainBlocks.length; j++) {
				let offset = terrainBlocks[j];
				this.changeBlockType(randomBlockId + offset, blockType, maptype);
			}
		}

		if (cabin == true) {
			let randomBlockId = blUtil.randomBlockID();
			let terrainBlocks = blTerrain.terrainCabin();
			var canvasWidth = 5;
			var rowOffset = 0;
			var rowIndex = 0;
			for (var j = 0; j < terrainBlocks.length; j++) {
				let blockType = terrainBlocks[j];
				var newRow = j % canvasWidth;

				if (newRow == 0) {
					rowOffset++;
					rowIndex = 0;
				} else {
					rowIndex++;
				}

				var blockId = randomBlockId + rowIndex + rowOffset * this.mapWidth;

				switch (blockType) {
					case '-':
						blockType = 'none';
						break;
					case 'W':
						blockType = 'wood';
						break;
					case 'F':
						blockType = 'fire';
						break;
					case 'D':
						blockType = 'door';
						break;
					default:
						blockType = 'none';
						break;
				}

				if (blockType != 'none') {
					this.changeBlockType(blockId, blockType, maptype);
				}
			}
		}

		for (let i = 0; i < specialBlocks.length; i++) {
			let randomBlockId = blUtil.randomBlockID();
			this.changeBlockType(randomBlockId, specialBlocks[i], maptype);
		}

		// blAchievement.updateStats();
	}

	mapPerspective() {
		document.querySelector('.cube-container').classList.toggle('map-view-perspective');
	}

	hallucinate() {
		document.body.classList.toggle('mushrooms');
	}
}
