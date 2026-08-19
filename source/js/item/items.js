/*
--------------
ITEM PROPS
--------------
image
background
name
slug
description
user
has_animation
 image_animated
is_craftable
 recipes
is_collectable
is_cutable
is_edible
is_placeable
is_blocking
is_ingredient
is_ground *NEW                                                                                                                                                            
is_diggable *NEW
is_lifeform
 image_lifeform_front
 image_lifeform_back
 image_lifeform_left
 image_lifeform_right
is_equipeable
 image_item_front
 image_item_back
 image_item_left
 image_item_right
is_useable
 image_item_swing_front
 image_item_swing_back
 image_item_swing_left
 image_item_swing_right

--------------
NEW ITEM PROP IDEAS
--------------
is_projectile/is_throwable? - front, back, left, right svgs
is_map_mechanism - if played presses actionm while facing this block this event occurs
soaks_water - if can be placed on water to form a bridge
is_item - instead of is_equipable
has_swing_animation - instead of is useable
is_transport
bgcolor - for ground blocks on diff maps
type [
	lifeform: player, animal, robot, girlfriend
	  	tool: weapon, tool, technology
	  	transport: bike, canoe, car, skiis
	  	mechanism: sign, door, portal, chest
	ground: diff map blocks
	object: rock, wood, bricks,
	plant: trees, flowers, 
	food: mushroom, vegetables, fruit, meat
]
*/

import * as globals from '../globals';

export class Items {
	constructor() {
		this.itemData;
		this.has_animation = false;
		this.is_craftable = false;
		this.is_lifeform = false;
		this.is_equipable = false;
		this.is_useable = false;
	}

	initItemBuilder() {
		console.log('initItemBuilder');
		this.itemSubmitForm();
		this.loadItemSelects();
		this.initItemBuilderForm();
		this.getAllItemImages();
		this.setupCanvas();
	}

	itemHasAnimation(item) {
		return globals.hasanimation.indexOf(item) > -1;
	}
	itemIsCraftable(item) {
		return globals.iscraftable.indexOf(item) > -1;
	}
	itemIsCollectable(item) {
		return globals.iscollectable.indexOf(item) > -1;
	}
	itemIsCutable(item) {
		return globals.iscutable.indexOf(item) > -1;
	}
	itemIsEdible(item) {
		return globals.isedible.indexOf(item) > -1;
	}
	itemIsPlaceable(item) {
		return globals.isplaceable.indexOf(item) > -1;
	}
	itemIsBlocking(item) {
		return globals.isblocking.indexOf(item) > -1;
	}
	itemIsIngredient(item) {
		return globals.isingredient.indexOf(item) > -1;
	}
	itemIsGround(item) {
		return globals.isground.indexOf(item) > -1;
	}
	itemIsDiggable(item) {
		return globals.isdiggable.indexOf(item) > -1;
	}
	itemIsLifeform(item) {
		return globals.islifeform.indexOf(item) > -1;
	}
	itemIsEquipable(item) {
		return globals.isequipable.indexOf(item) > -1;
	}
	itemIsUseable(item) {
		return globals.isuseable.indexOf(item) > -1;
	}
	itemIsInstrument(item) {
		return globals.isinstrument.indexOf(item) > -1;
	}

	updateItemsJSONFile() {
		console.log('updateItemsJSONFile');
		fetch('php/saveItemsToJSON.php').then((r) => r.json());
	}

	getItemsJSONFile() {
		// TODO: convert to async fetch
		var json = null;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '../json/items.json', false); // synchronous
		xhr.send(null);
		if (xhr.status === 200) {
			json = JSON.parse(xhr.responseText);
		}
		return json;
	}

	getItemSlugs() {
		const itemsJSON = this.getItemsJSONFile();
		const itemSlugs = itemsJSON.map((i) => {
			return i.slug;
		});
		return itemSlugs;
	}

	getItemSlugsByProperty(property) {
		const itemsJSON = this.getItemsJSONFile();
		var itemSlugs = itemsJSON.reduce(function (filtered, item) {
			if (item[property] == 1) {
				var itemSlug = item.slug;
				filtered.push(itemSlug);
			}
			return filtered;
		}, []);
		return itemSlugs;
	}

	loadItemSelects() {
		fetch('php/loaditemsJSON.php', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({}),
		})
			.then((r) => r.json())
			.then(function (data) {
				if (data == false) {
				} else {
					for (var i = 0; i < data.length; i++) {
						var optionHtml = '<option value="' + data[i].slug + '">' + data[i].name + '</option>';
						[
							...document.querySelectorAll('.form-recipe-1a, .form-recipe-1b, .form-recipe-1c'),
						].forEach(function (el) {
							el.insertAdjacentHTML('beforeend', optionHtml);
						});
					}
				}
			});
	}

	itemPreview() {
		console.log('itemPreview');
		this.createSVG();
	}

	createSVG() {
		console.log('createSVG');

		this.renderPreviewSVG('image', false);

		if (this.has_animation == true) {
			this.renderPreviewSVG('image_animated', true);
		}
		if (this.is_lifeform == true) {
			this.renderPreviewSVG('image_lifeform_front', false);
			this.renderPreviewSVG('image_lifeform_back', false);
			this.renderPreviewSVG('image_lifeform_left', false);
			this.renderPreviewSVG('image_lifeform_right', false);
		}
		if (this.is_equipable == true) {
			this.renderPreviewSVG('image_item_front', false);
			this.renderPreviewSVG('image_item_back', false);
			this.renderPreviewSVG('image_item_left', false);
			this.renderPreviewSVG('image_item_right', false);
		}
		if (this.is_useable == true) {
			this.renderPreviewSVG('image_item_swing_front', false);
			this.renderPreviewSVG('image_item_swing_back', false);
			this.renderPreviewSVG('image_item_swing_left', false);
			this.renderPreviewSVG('image_item_swing_right', false);
		}
	}

	renderPreviewSVG(name, is_animated) {
		var w = 20;
		var h = 20;
		var pixelwidth = 4;

		console.log('renderPreviewSVG');
		[...document.querySelectorAll('#' + name + ' svg')].forEach((el) => el.remove());

		var previewSVG;
		var pixels = [];
		var x = 0;
		var y = 0;
		previewSVG = Raphael(document.getElementById(name));
		previewSVG.setViewBox(0, 0, w, h, true);
		//previewSVG.canvas.setAttribute('preserveAspectRatio', 'none');
		console.log('renderPreviewSVG');

		[...document.querySelectorAll('.canvas-' + name + ' .canvas-pixel')].forEach(function (el, i) {
			var color = el.getAttribute('data-color');
			console.log(color);
			console.log('renderPreviewSVG');
			if (i == 0) {
				x = 0;
				y = 0;
			} else {
				if (i % 5 == 0) {
					y = y + pixelwidth;
					x = 0;
				} else {
					x = (i % 5) * pixelwidth;
				}
			}
			pixels[i] = previewSVG.rect(x, y, pixelwidth, pixelwidth);
			pixels[i].attr('fill', color);
			pixels[i].attr('stroke', 'transparent');
			//pixels[i].attr("stroke-width", '0');
		});

		if (is_animated) {
			previewSVG.canvas.setAttribute('class', 'svg_animated');

			[...document.querySelectorAll('.canvas-image .canvas-pixel')].forEach(function (el, i) {
				var color = el.getAttribute('data-color');
				var offset = w;
				if (i == 0) {
					x = 0;
					y = 0;
				} else {
					if (i % 5 == 0) {
						y = y + pixelwidth;
						x = 0;
					} else {
						x = (i % 5) * pixelwidth;
					}
				}
				pixels[i] = previewSVG.rect(x + w, y, pixelwidth, pixelwidth);
				pixels[i].attr('fill', color);
				pixels[i].attr('stroke', color);
			});

			var style = '<style>';
			style += '@keyframes svgAnimate {';
			style += '0% { transform: translateX(0px); }';
			style += '50% { transform: translateX(-20px); }';
			style += '100% { transform: translateX(0px); }';
			style += '}';
			style += '.svg_animated rect {';
			style += 'animation: svgAnimate 2s steps(1) infinite;';
			style += '}';
			style += '</style>';
			document.querySelector('#image_animated svg').insertAdjacentHTML('beforeend', style);
		}
	}

	initItemBuilderForm() {
		var _self = this;

		document.querySelector('.form-has_animation').addEventListener('change', function () {
			if (this.checked) {
				_self.has_animation = true;
				document.querySelector('.canvas-image_animated').style.display = '';
			} else {
				_self.has_animation = false;
				document.querySelector('.canvas-image_animated').style.display = 'none';
				[...document.querySelectorAll('.canvas-image_animated .svg-preview svg')].forEach((el) =>
					el.remove()
				);
			}
			_self.itemPreview();
		});

		document.querySelector('.form-is_craftable').addEventListener('change', function () {
			if (this.checked) {
				_self.is_craftable = true;
				document.querySelector('.is_craftable-recipe').style.display = '';
			} else {
				_self.is_craftable = false;
				document.querySelector('.is_craftable-recipe').style.display = 'none';
			}
			_self.itemPreview();
		});

		document.querySelector('.form-is_lifeform').addEventListener('change', function () {
			if (this.checked) {
				_self.is_lifeform = true;
				document.querySelector('.is_lifeform-images').style.display = '';
			} else {
				_self.is_lifeform = false;
				document.querySelector('.is_lifeform-images').style.display = 'none';
				[...document.querySelectorAll('.is_lifeform-images .svg-preview svg')].forEach((el) =>
					el.remove()
				);
			}
			_self.itemPreview();
		});

		document.querySelector('.form-is_equipable').addEventListener('change', function () {
			if (this.checked) {
				_self.is_equipable = true;
				document.querySelector('.is_equipable-images').style.display = '';
			} else {
				_self.is_equipable = false;
				document.querySelector('.is_equipable-images').style.display = 'none';
				[...document.querySelectorAll('.is_equipable-images .svg-preview svg')].forEach((el) =>
					el.remove()
				);
			}
			_self.itemPreview();
		});

		document.querySelector('.form-is_useable').addEventListener('change', function () {
			if (this.checked) {
				_self.is_useable = true;
				document.querySelector('.is_useable-images').style.display = '';
			} else {
				_self.is_craftable = false;
				document.querySelector('.is_useable-images').style.display = 'none';
				[...document.querySelectorAll('.is_useable-images .svg-preview svg')].forEach((el) =>
					el.remove()
				);
			}
			_self.itemPreview();
		});
	}

	itemSubmitForm() {
		var _self = this;
		document.querySelector('.item-builder').addEventListener('submit', function (e) {
			//itemPreview();
			var image = document.querySelector('#image').innerHTML;
			var name = document.querySelector('.item-builder .form-name').value;
			var slug = document.querySelector('.item-builder .form-slug').value;
			var description = document.querySelector('.item-builder .form-description').value;
			var user = document.querySelector('.item-builder .form-user').value;
			var has_animation = Number(document.querySelector('.form-has_animation').checked);
			var image_animated = document.querySelector('#image_animated').innerHTML;
			var is_craftable = Number(document.querySelector('.item-builder .form-is_craftable').checked);
			var recipe1a = document.querySelector('.item-builder .form-recipe-1a').value;
			var recipe1b = document.querySelector('.item-builder .form-recipe-1b').value;
			var recipe1c = document.querySelector('.item-builder .form-recipe-1c').value;
			var recipe = recipe1a + recipe1b + recipe1c;
			var is_collectable = Number(
				document.querySelector('.item-builder .form-is_collectable').checked
			);
			var is_cutable = Number(document.querySelector('.item-builder .form-is_cutable').checked);
			var is_edible = Number(document.querySelector('.item-builder .form-is_edible').checked);
			var is_placeable = Number(document.querySelector('.item-builder .form-is_placeable').checked);
			var is_blocking = Number(document.querySelector('.item-builder .form-is_blocking').checked);
			var is_ingredient = Number(
				document.querySelector('.item-builder .form-is_ingredient').checked
			);
			var is_ground = Number(document.querySelector('.item-builder .form-is_ground').checked);
			var is_diggable = Number(document.querySelector('.item-builder .form-is_diggable').checked);
			var is_instrument = Number(
				document.querySelector('.item-builder .form-is_instrument').checked
			);

			var is_lifeform = Number(document.querySelector('.form-is_lifeform').checked);
			var is_equipable = Number(document.querySelector('.form-is_equipable').checked);
			var is_useable = Number(document.querySelector('.form-is_useable').checked);
			var image_lifeform_front = document.querySelector('#image_lifeform_front').innerHTML;
			var image_lifeform_back = document.querySelector('#image_lifeform_back').innerHTML;
			var image_lifeform_left = document.querySelector('#image_lifeform_left').innerHTML;
			var image_lifeform_right = document.querySelector('#image_lifeform_right').innerHTML;
			var image_item_front = document.querySelector('#image_item_front').innerHTML;
			var image_item_back = document.querySelector('#image_item_back').innerHTML;
			var image_item_left = document.querySelector('#image_item_left').innerHTML;
			var image_item_right = document.querySelector('#image_item_right').innerHTML;
			var image_item_swing_front = document.querySelector('#image_item_swing_front').innerHTML;
			var image_item_swing_back = document.querySelector('#image_item_swing_back').innerHTML;
			var image_item_swing_left = document.querySelector('#image_item_swing_left').innerHTML;
			var image_item_swing_right = document.querySelector('#image_item_swing_right').innerHTML;

			fetch('php/createnewitem.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({
					image: image,
					name: name,
					slug: slug,
					description: description,
					user: user,
					has_animation: has_animation,
					image_animated: image_animated,
					is_craftable: is_craftable,
					recipe: recipe,
					is_collectable: is_collectable,
					is_cutable: is_cutable,
					is_edible: is_edible,
					is_placeable: is_placeable,
					is_blocking: is_blocking,
					is_ingredient: is_ingredient,
					is_ground: is_ground,
					is_diggable: is_diggable,
					is_lifeform: is_lifeform,
					is_equipable: is_equipable,
					is_useable: is_useable,
					is_instrument: is_instrument,
					image_lifeform_front: image_lifeform_front,
					image_lifeform_back: image_lifeform_back,
					image_lifeform_left: image_lifeform_left,
					image_lifeform_right: image_lifeform_right,
					image_item_front: image_item_front,
					image_item_back: image_item_back,
					image_item_left: image_item_left,
					image_item_right: image_item_right,
					image_item_swing_front: image_item_swing_front,
					image_item_swing_back: image_item_swing_back,
					image_item_swing_left: image_item_swing_left,
					image_item_swing_right: image_item_swing_right,
				}),
			}).then(function () {
				_self.updateItemsJSONFile();
			});
			// location.reload();
			// header("location:itemcreator.php");
			e.preventDefault();
		});
	}

	getAllItemImages() {
		// draw small preview ofall items above items tables
		const blocktypes = this.getItemSlugs();
		var blockhtml = '';
		blocktypes.forEach(function (v) {
			blockhtml += '<div class="block block-' + v + '" data-blocktype="' + v + '"></div>';
		});
		var objecttypes = new Array(
			'player-direction-up',
			'player-direction-down',
			'player-direction-left',
			'player-direction-right',
			'player-direction-up-sword',
			'player-direction-down-sword',
			'player-direction-left-sword ',
			'player-direction-right-sword',
			'player-direction-up-sword-swing',
			'player-direction-down-sword-swing',
			'player-direction-left-sword-swing',
			'player-direction-right-sword-swing',
			'player-direction-up-shovel',
			'player-direction-down-shovel',
			'player-direction-left-shovel',
			'player-direction-right-shovel',
			'player-direction-up-shovel-swing',
			'player-direction-down-shovel-swing',
			'player-direction-left-shovel-swing',
			'player-direction-right-shovel-swing',
			'player-direction-up-axe',
			'player-direction-down-axe',
			'player-direction-left-axe',
			'player-direction-right-axe',
			'player-direction-up-axe-swing',
			'player-direction-down-axe-swing',
			'player-direction-left-axe-swing',
			'player-direction-right-axe-swing',
			'player-direction-up-bike',
			'player-direction-down-bike',
			'player-direction-left-bike',
			'player-direction-right-bike',
			'player-direction-up-skiis',
			'player-direction-down-skiis',
			'player-direction-left-skiis',
			'player-direction-right-skiis',
			'player-direction-up-canoe',
			'player-direction-down-canoe',
			'player-direction-left-canoe',
			'player-direction-right-canoe',
			'player-direction-up-car',
			'player-direction-down-car',
			'player-direction-left-car',
			'player-direction-right-car',
			'player-direction-up-rocket',
			'player-direction-down-rocket',
			'player-direction-left-rocket',
			'player-direction-right-rocket',
			'enemy-direction-up',
			'enemy-direction-down',
			'enemy-direction-left',
			'enemy-direction-right',
			'deer-direction-up',
			'deer-direction-down',
			'deer-direction-left',
			'deer-direction-right'
		);
		objecttypes.forEach(function (v) {
			blockhtml += '<div class="block ' + v + '" data-blocktype="' + v + '"></div>';
		});
		document.querySelector('.block-palette').insertAdjacentHTML('beforeend', blockhtml);
	}

	// might need to move to paint.js
	setupCanvas() {
		console.log('setup-canvas');
		var _self = this;
		// COLOR PALETTE
		[...document.querySelectorAll('.canvas-pixel')].forEach(function (el) {
			el.addEventListener('click', function () {
				console.log('canvas-pixelclick');
				//var pixelID = el.getAttribute("data-pixel");
				var colorCode = document.querySelector('.bui-colorpicker .bui-colorpicker-input').value;
				console.log(colorCode);
				// validate hex code
				el.style.backgroundColor = colorCode;
				el.setAttribute('data-color', colorCode);
				_self.itemPreview();
			});
		});

		// RESET BUTTON
		document.querySelector('.button-reset').addEventListener('click', function () {
			[...document.querySelectorAll('.canvas-pixel')].forEach(function (el) {
				el.style.backgroundColor = 'transparent';
				el.setAttribute('data-color', 'transparent');
			});
			_self.itemPreview();
		});
	}
}
