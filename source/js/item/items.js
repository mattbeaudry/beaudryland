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

	itemHasAnimation(item) { return $.inArray(item, globals.hasanimation) > -1; }
	itemIsCraftable(item) { return $.inArray(item, globals.iscraftable) > -1; }
	itemIsCollectable(item) { return $.inArray(item, globals.iscollectable) > -1; }
	itemIsCutable(item) { return $.inArray(item, globals.iscutable) > -1; }
	itemIsEdible(item) { return $.inArray(item, globals.isedible) > -1; }
	itemIsPlaceable(item) { return $.inArray(item, globals.isplaceable) > -1; }
	itemIsBlocking(item) { return $.inArray(item, globals.isblocking) > -1; }
	itemIsIngredient(item) { return $.inArray(item, globals.isingredient) > -1; }
	itemIsGround(item) { return $.inArray(item, globals.isground) > -1; }
	itemIsDiggable(item) { return $.inArray(item, globals.isdiggable) > -1; }
	itemIsLifeform(item) { return $.inArray(item, globals.islifeform) > -1; }
	itemIsEquipable(item) { return $.inArray(item, globals.isequipable) > -1; }
	itemIsUseable(item) { return $.inArray(item, globals.isuseable) > -1; }

	updateItemsJSONFile() {
		$.ajax({
			url: 'php/saveItemsToJSON.php',
			dataType: 'json'
		});
	}

	getItemsJSONFile() {
		var json = (function() {
			var json = null;
			$.ajax({
				'async': false,
				'global': false,
				'url': "../json/items.json",
				'dataType': "json",
				'success': function (data) {
					json = data;
				}
			});
			return json;
		})();
		return json;
	}

	getItemSlugs() {
		const itemsJSON = this.getItemsJSONFile();
		const itemSlugs = itemsJSON.map(i => {
			return i.slug;
		});
		return itemSlugs;
	}

	getItemSlugsByProperty(property) {
		const itemsJSON = this.getItemsJSONFile();
		var itemSlugs = itemsJSON.reduce(function(filtered, item) {
			if (item[property] == 1) {
			   var itemSlug = item.slug;
			   filtered.push(itemSlug);
			}
			return filtered;
		}, []);
		return itemSlugs;
	}

	loadItemSelects() {
		$.post('php/loaditemsJSON.php', {}, function(data) {
			if (data == false) {
			} else {
				for (var i=0; i < data.length; i++) {
					$('.form-recipe-1a, .form-recipe-1b, .form-recipe-1c').append('<option value="'+data[i].slug+'">'+data[i].name+'</option>');
				}
			}   
		}, "json");
	}

	itemPreview() {
		console.log('itemPreview');
		this.createSVG();
	}

	createSVG() {
		console.log('createSVG');

		this.renderPreviewSVG("image", false);

		if (this.has_animation == true) { 
			this.renderPreviewSVG("image_animated", true);
		}
		if (this.is_lifeform == true) {
			this.renderPreviewSVG("image_lifeform_front", false);
			this.renderPreviewSVG("image_lifeform_back", false);
			this.renderPreviewSVG("image_lifeform_left", false);
			this.renderPreviewSVG("image_lifeform_right", false);
		}
		if (this.is_equipable == true) {
			this.renderPreviewSVG("image_item_front", false);
			this.renderPreviewSVG("image_item_back", false);
			this.renderPreviewSVG("image_item_left", false);
			this.renderPreviewSVG("image_item_right", false);
		}
		if (this.is_useable == true) {
			this.renderPreviewSVG("image_item_swing_front", false);
			this.renderPreviewSVG("image_item_swing_back", false);
			this.renderPreviewSVG("image_item_swing_left", false);
			this.renderPreviewSVG("image_item_swing_right", false);
		}
	};

	renderPreviewSVG(name, is_animated) {
		var w = 20;
		var h = 20;
		var pixelwidth = 4;

		console.log('renderPreviewSVG');
		$('#'+name+' svg').remove();
		
		var previewSVG;
		var pixels = [];
		var x = 0;
		var y = 0;
		previewSVG = Raphael(document.getElementById(name));
		previewSVG.setViewBox(0, 0, w, h, true);
		//previewSVG.canvas.setAttribute('preserveAspectRatio', 'none');
		console.log('renderPreviewSVG');
		
		$('.canvas-'+name+' .canvas-pixel').each(function(i) {
			var color = $(this).attr("data-color");
			console.log(color);
			console.log('renderPreviewSVG');
			if (i == 0) {
				x = 0;
				y = 0;
			} else {
				if (i%5 == 0){
					y = y + pixelwidth;
					x = 0;
				} else {
					x = (i%5) * pixelwidth;
				}
			}
			pixels[i] = previewSVG.rect(x, y, pixelwidth, pixelwidth);
			pixels[i].attr("fill", color);
			pixels[i].attr("stroke", 'transparent');
			//pixels[i].attr("stroke-width", '0');
		});

		if (is_animated) {
			previewSVG.canvas.setAttribute("class","svg_animated");

			$('.canvas-image .canvas-pixel').each(function(i) {
				var color = $(this).attr("data-color");
				var offset = w;
				if (i == 0) {
					x = 0;
					y = 0;
				} else {
					if (i%5 == 0) {
						y = y + pixelwidth;
						x = 0;
					} else {
						x = (i%5) * pixelwidth;
					}
				}
				pixels[i] = previewSVG.rect(x + w, y, pixelwidth, pixelwidth);
				pixels[i].attr("fill", color);
				pixels[i].attr("stroke", color);
			});

			var style = '<style>';
			style += '@keyframes svgAnimate {';
			style += '0% { transform: translateX(0px); }';
			style += '50% { transform: translateX(-30px); }';
			style += '100% { transform: translateX(0px); }';
			style += '}';
			style += '.svg_animated rect {';
			style += 'animation: svgAnimate 2s steps(1) infinite;';
			style += '}';
			style += '</style>';
			$('#image_animated svg').append(style);
		}
	}

	initItemBuilderForm() {
		var _self = this;

		$('.form-has_animation').change(function() {
			if(this.checked) {
				_self.has_animation = true;
				$('.canvas-image_animated').show();
			} else {
				_self.has_animation = false;
				$('.canvas-image_animated').hide();
				$('.canvas-image_animated .svg-preview svg').remove();
			}
			_self.itemPreview();
		});

		$('.form-is_craftable').change(function() {
			if(this.checked) {
				_self.is_craftable = true;
				$('.is_craftable-recipe').show();
			} else {
				_self.is_craftable = false;
				$('.is_craftable-recipe').hide();
			}
			_self.itemPreview();
		});

		$('.form-is_lifeform').change(function() {
			if(this.checked) {
				_self.is_lifeform = true;
				$('.is_lifeform-images').show();
			} else {
				_self.is_lifeform = false;
				$('.is_lifeform-images').hide();
				$('.is_lifeform-images .svg-preview svg').remove();
			}
			_self.itemPreview();
		});

		$('.form-is_equipable').change(function() {
			if(this.checked) {
				_self.is_equipable = true;
				$('.is_equipable-images').show();
			} else {
				_self.is_equipable = false;
				$('.is_equipable-images').hide();
				$('.is_equipable-images .svg-preview svg').remove();
			}
			_self.itemPreview();
		});

		$('.form-is_useable').change(function() {
			if(this.checked) {
				_self.is_useable = true;
				$('.is_useable-images').show();
			} else {
				_self.is_craftable = false;
				$('.is_useable-images').hide();
				$('.is_useable-images .svg-preview svg').remove();
			}
			_self.itemPreview();
		});
	}

	itemSubmitForm() {
		var _self = this;
		$('.item-builder').submit(function(e) {
			//itemPreview();
			var image = $('#image').html();
			var name = $('.item-builder .form-name').val();
			var slug = $('.item-builder .form-slug').val();
			var description = $('.item-builder .form-description').val();
			var user = $('.item-builder .form-user').val();
			var has_animation = Number($('.form-has_animation').is(":checked"));
			var image_animated = $('#image_animated').html();
			var is_craftable = Number($('.item-builder .form-is_craftable').is(":checked"));
			var recipe1a = $('.item-builder .form-recipe-1a').val();
			var recipe1b = $('.item-builder .form-recipe-1b').val();
			var recipe1c = $('.item-builder .form-recipe-1c').val();
			var recipe = recipe1a+recipe1b+recipe1c;
			var is_collectable = Number($('.item-builder .form-is_collectable').is(":checked"));
			var is_cutable = Number($('.item-builder .form-is_cutable').is(":checked"));
			var is_edible = Number($('.item-builder .form-is_edible').is(":checked"));
			var is_placeable = Number($('.item-builder .form-is_placeable').is(":checked"));
			var is_blocking = Number($('.item-builder .form-is_blocking').is(":checked"));
			var is_ingredient = Number($('.item-builder .form-is_ingredient').is(":checked"));
			var is_ground = Number($('.item-builder .form-is_ground').is(":checked"));
			var is_diggable = Number($('.item-builder .form-is_diggable').is(":checked"));

			var is_lifeform = Number($('.form-is_lifeform').is(":checked"));
			var is_equipable = Number($('.form-is_equipable').is(":checked"));
			var is_useable = Number($(' .form-is_useable').is(":checked"));
			var image_lifeform_front = $('#image_lifeform_front').html();
			var image_lifeform_back = $('#image_lifeform_back').html();
			var image_lifeform_left = $('#image_lifeform_left').html();
			var image_lifeform_right = $('#image_lifeform_right').html();
			var image_item_front = $('#image_item_front').html();
			var image_item_back = $('#image_item_back').html();
			var image_item_left = $('#image_item_left').html();
			var image_item_right = $('#image_item_right').html();
			var image_item_swing_front = $('#image_item_swing_front').html();
			var image_item_swing_back = $('#image_item_swing_back').html();
			var image_item_swing_left = $('#image_item_swing_left').html();
			var image_item_swing_right = $('#image_item_swing_right').html();

			$.post('php/createnewitem.php', {
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
				image_item_swing_right: image_item_swing_right
			}, function() {
				_self.updateItemsJSONFile();
			});
			// location.reload();
			// header("location:itemcreator.php");
			event.preventDefault();
		});
	}

	getAllItemImages() {
		// draw small preview ofall items above items tables
		const blocktypes = this.getItemSlugs();
		var blockhtml = ""; 
		$.each(blocktypes, function(i, v) { 
			blockhtml += '<div class="block block-'+v+'" data-blocktype="'+v+'"></div>'; 
		});
		var objecttypes = new Array (
			"player-direction-up","player-direction-down","player-direction-left","player-direction-right",
			"player-direction-up-sword","player-direction-down-sword","player-direction-left-sword ","player-direction-right-sword",
			"player-direction-up-sword-swing","player-direction-down-sword-swing","player-direction-left-sword-swing","player-direction-right-sword-swing",
			"player-direction-up-shovel","player-direction-down-shovel","player-direction-left-shovel","player-direction-right-shovel",
			"player-direction-up-shovel-swing","player-direction-down-shovel-swing","player-direction-left-shovel-swing","player-direction-right-shovel-swing",
			"player-direction-up-axe","player-direction-down-axe","player-direction-left-axe","player-direction-right-axe",
			"player-direction-up-axe-swing","player-direction-down-axe-swing","player-direction-left-axe-swing","player-direction-right-axe-swing",
			"player-direction-up-bike","player-direction-down-bike","player-direction-left-bike","player-direction-right-bike",
			"player-direction-up-skiis","player-direction-down-skiis","player-direction-left-skiis","player-direction-right-skiis",
			"player-direction-up-canoe","player-direction-down-canoe","player-direction-left-canoe","player-direction-right-canoe",
			"player-direction-up-car","player-direction-down-car", "player-direction-left-car","player-direction-right-car",
			"player-direction-up-rocket","player-direction-down-rocket","player-direction-left-rocket","player-direction-right-rocket",
			"enemy-direction-up","enemy-direction-down","enemy-direction-left","enemy-direction-right",
			"deer-direction-up","deer-direction-down","deer-direction-left","deer-direction-right"
		);
		$.each(objecttypes, function(i, v) { 
			blockhtml += '<div class="block '+v+'" data-blocktype="'+v+'"></div>'; 
		});
		$('.block-palette').append(blockhtml);
	}

	// might need to move to paint.js
	setupCanvas() {
		console.log('setup-canvas');
		var _self = this;
		// COLOR PALETTE
		$('.canvas-pixel').on("click", function() { 
			console.log('canvas-pixelclick');
			//var pixelID = $(this).attr("data-pixel");
			var colorCode = $('.bui-colorpicker .bui-colorpicker-input').val();
			console.log(colorCode);
			// validate hex code
			$(this).css("background-color", colorCode);
			$(this).attr("data-color", colorCode);
			_self.itemPreview();
		});

		// RESET BUTTON
		$('.button-reset').on("click", function(){
			$('.canvas-pixel').css("background-color","transparent");
			$('.canvas-pixel').attr("data-color","transparent");
			_self.itemPreview();
		});
	}
}