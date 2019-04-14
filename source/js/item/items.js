// load items from db
// create global items json

// move item builder code to here
// populate select menus for choose crafting recipes
// create item list under inventory (incl. recipies)

export class Items {
	constructor() {
		this.itemData;
	}

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

	initItemBuilder() {
		console.log('initItemBuilder');

		// COLOR PALETTE
		$('.canvas-pixel').on("click", function() { 
			console.log('canvas-pixelclick');
			//var pixelID = $(this).attr("data-pixel");
			var colorCode = $('.bui-colorpicker .bui-colorpicker-input').val();
			console.log(colorCode);
			// validate hex code
			$(this).css("background-color", colorCode);
			$(this).attr("data-color", colorCode);
			itemPreview();
		});

		// RESET BUTTON
		$('.button-reset').on("click", function(){
			$('.canvas-pixel').css("background-color","transparent");
			$('.canvas-pixel').attr("data-color","transparent");
			itemPreview();
		});

		// SUBMIT ITEM
		$('.item-builder').submit(function(e) {
			//itemPreview();
			var image = $('#image').html();
			var name = $('.item-builder .form-name').val();
			var slug = $('.item-builder .form-slug').val();
			var description = $('.item-builder .form-description').val();
			var user = $('.item-builder .form-user').val();
			var has_animation = Number($('.item-builder .form-has_animation').is(":checked"));
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
			var is_lifeform = Number($('.item-builder .form-is_lifeform').is(":checked"));
			var is_equipable = Number($('.item-builder .form-is_equipable').is(":checked"));
			var is_useable = Number($('.item-builder .form-is_useable').is(":checked"));
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
			}, function(data) {
			// console.log(data);
			});
			// location.reload();
			// header("location:itemcreator.php");
			event.preventDefault();
		});

		var itemPreview = function() {
			console.log('itemPreview');
			createSVG();
		};

		var w = 30;
		var h = 30;
		var pixelwidth = w / 5;

		var renderPreviewSVG = function(name, is_animated) {
			console.log('renderPreviewSVG');
			$('#'+name+' svg').remove();
			
			var previewSVG;
			var pixels = [];
			var x = 0;
			var y = 0;
			previewSVG = Raphael(document.getElementById(name));
			previewSVG.setViewBox(0, 0, w, h, true);
			previewSVG.canvas.setAttribute('preserveAspectRatio', 'none');

			$('.canvas-'+name+' .canvas-pixel').each(function(i) {
				var color = $(this).attr("data-color");
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
				pixels[i].attr("stroke", color);
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
					pixels[i] = previewSVG.rect(x + 30, y, pixelwidth, pixelwidth);
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

		var itemSVG;
		var createSVG = function() {
			console.log('createSVG');

			renderPreviewSVG("image", false);
			if (has_animation == true) { 
				renderPreviewSVG("image_animated", true); 
			}
			if (is_lifeform == true) {
				renderPreviewSVG("image_lifeform_front", false);
				renderPreviewSVG("image_lifeform_back", false);
				renderPreviewSVG("image_lifeform_left", false);
				renderPreviewSVG("image_lifeform_right", false);
			}
			if (is_equipable == true) {
				renderPreviewSVG("image_item_front", false);
				renderPreviewSVG("image_item_back", false);
				renderPreviewSVG("image_item_left", false);
				renderPreviewSVG("image_item_right", false);
			}
			if (is_useable == true) {
				renderPreviewSVG("image_item_swing_front", false);
				renderPreviewSVG("image_item_swing_back", false);
				renderPreviewSVG("image_item_swing_left", false);
				renderPreviewSVG("image_item_swing_right", false);
			}
		};

		var loadItemSelects = function() {
			$.post('php/loaditemsJSON.php', {}, function(data) {
				if (data == false) {
				// console.log("failed gettins items json");
				} else {
					for (var i=0; i < data.length; i++) {
						$('.form-recipe-1a, .form-recipe-1b, .form-recipe-1c').append('<option value="'+data[i].slug+'">'+data[i].name+'</option>');
					}
				}   
			}, "json");
		};

		loadItemSelects();

		var has_animation = '';
		var is_craftable = '';
		var is_lifeform = '';
		var is_equipable = '';
		var is_useable = '';

		$('.form-has_animation').change(function() {
			if(this.checked) {
				has_animation = true;
				$('.canvas-image_animated').show();
			} else {
				has_animation = false;
				$('.canvas-image_animated').hide();
				$('.canvas-image_animated .svg-preview svg').remove();
			}
			itemPreview();
		});

		$('.form-is_craftable').change(function() {
			if(this.checked) {
				is_craftable = true;
				$('.is_craftable-recipe').show();
			} else {
				is_craftable = false;
				$('.is_craftable-recipe').hide();
			}
			itemPreview();
		});

		$('.form-is_lifeform').change(function() {
			if(this.checked) {
				is_lifeform = true;
				$('.is_lifeform-images').show();
			} else {
				is_lifeform = false;
				$('.is_lifeform-images').hide();
				$('.is_lifeform-images .svg-preview svg').remove();
			}
			itemPreview();
		});

		$('.form-is_equipable').change(function() {
			if(this.checked) {
				is_equipable = true;
				$('.is_equipable-images').show();
			} else {
				is_equipable = false;
				$('.is_equipable-images').hide();
				$('.is_equipable-images .svg-preview svg').remove();
			}
			itemPreview();
		});

		$('.form-is_useable').change(function() {
			if(this.checked) {
				is_useable = true;
				$('.is_useable-images').show();
			} else {
				is_craftable = false;
				$('.is_useable-images').hide();
				$('.is_useable-images .svg-preview svg').remove();
			}
			itemPreview();
		});

		var blocktypes = new Array (
			/*forest map*/	"grass", "dirt", "water", "rock", "hole",
			/*winter map*/  "snow", "ice",  "icerock", // "frozendirt", "snowhole",
			/*beach map*/  	"sand", "wave", "sandstone", // "wetsand", "sandhole",
			/*space map*/   "space", "star", "earth", "redgalaxy", "bluegalaxy", "sun",
			/*items*/     	"shovel", "fire", "door", "door-open", "frisbee", "sign",
			/*weapons*/		"sword", "spear", "axe", "bow", "arrow",
			/*instruments*/ "guitar", "piano", "trumpet", "bass", "microphone", "drumsticks", "bassdrum", "snare", "hihat", "cymbal", "tom",
			/*technology*/	"telescope","computer","2dprinter","portal-a","portal-b",
			/*transport*/	"bike", "skiis", "canoe", "car", "rocket",
			/*furniture*/	"table", "chair", "chest", "bed", "toilet", "sink", "bathtub",
			/*treasure*/  	"diamond", "gold", "silver", "oil", "clay",
			/*holes*/		// "diamond-hole", "gold-hole", "silver-hole", "oil-hole", "clay-hole",
			/*organic*/		"tree", "pinetree", "appletree", "palmtree", "flowers", "heart", //"talltree",
			/*food*/		"apple","mushroom","bluemushroom","blackmushroom","yellowmushroom","greenmushroom","carrot","carrot-inground",
			/*new*/			"fence-metal",
			/*blocks*/     	"wood", "pinewood", "palmwood", "applewood", "rockbrick", "icerockbrick", "sandstonebrick", "claybrick", "road",
		);
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

}

/*
--------------
ITEM PROPERTIES
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
NEW PROP IDEAS
--------------
has_map_mechanism
is_throwable
type * NEW
[
	lifeform: player, animal, enemy
	item: tool, weapon, technology, transportation
		map items, vs lifeform items
	ground:
	object: rock, wood, bricks, 
	plant: trees, flowers, 
	food: mushroom, vegetables, fruit, meat
]
is_item - instead of is_equipable
has_swing_animation - instead of is useable
is_transport
bgcolor - for ground blocks on diff maps


export const blocktypes = new Array (
/*forest map*	"grass", "dirt", "water", "rock", "hole",
/*winter map/  "snow", "ice",  "icerock", // "frozendirt", "snowhole",
/*beach map/  	"sand", "wave", "sandstone", // "wetsand", "sandhole",
/*space map/   "space", "star", "earth", "redgalaxy", "bluegalaxy", "sun",
/*items/     	"shovel", "fire", "door", "door-open", "frisbee", "sign",
/*weapons/		"sword", "spear", "axe", "bow", "arrow",
/*instruments/ "guitar", "piano", "trumpet", "bass", "microphone", "drumsticks", "bassdrum", "snare", "hihat", "cymbal", "tom",
/*technology/	"telescope","computer","2dprinter","portal-a","portal-b",
/*transport/	"bike", "skiis", "canoe", "car", "rocket",
/*furniture/	"table", "chair", "chest", "bed", "toilet", "sink", "bathtub",
/*treasure/  	"diamond", "gold", "silver", "oil", "clay",
/*holes/		// "diamond-hole", "gold-hole", "silver-hole", "oil-hole", "clay-hole",
/*organic/		"tree", "pinetree", "appletree", "palmtree", "flowers", "heart", //"talltree",
/*food/		"apple","mushroom","bluemushroom","blackmushroom","yellowmushroom","greenmushroom","carrot","carrot-inground",
/*new/			"fence-metal",
/*blocks/     	"wood", "pinewood", "palmwood", "applewood", "rockbrick", "icerockbrick", "sandstonebrick", "claybrick", "road",
);
*/

// export const isingredient = new Array (
// 	/*forest map/	"tree", "rock",
// 	/*winter map/  "pinetree", "icerock",
// 	/*beach map/  	"palmtree",
// 	/*items/     	"fire",
// 	/*treasure/  	"diamond", "gold", "silver", "oil", "clay",
// 	/*organic/		"wood", "pinewood", "palmwood", "applewood"
// );

// /* isequipable is used for items with player graphics + animation */
// export const isequipable = new Array (
// 	/*items/     	"shovel",
// 	/*weapons/		"sword", "axe", "bow",
// 	/*transport/	"bike", "skiis", "canoe", "car", "rocket",
// 	/*instrument/  "guitar", "piano", "trumpet", "bass", "microphone", "drumsticks", "bassdrum", "snare", "hihat", "cymbal", "tom",
// );

// export const iscollectable = new Array (
// 	/*forest map*/	"tree", "rock",
// 	/*winter map*/  "pinetree", "icerock",
// 	/*beach map*/  	"palmtree", "sandstone",
// 	/*items*/     	"fire",
// 	/*furniture*/	"table","chair","chest","bed","toilet","sink","bathtub",
// 	/*technology*/	"telescope","computer","2dprinter",
// 	/*treasure*/  	"diamond", "gold", "silver", "oil", "clay",
// 	/*instrument*/  "guitar", "piano", "trumpet", "bass", "microphone", "drumsticks", "bassdrum", "snare", "hihat", "cymbal", "tom",
// 	/*holes*/		"diamond-hole", "gold-hole", "silver-hole", "oil-hole", "clay-hole",
// 	/*blocks*/     	"rockbrick", "icerockbrick", "sandstonebrick", "claybrick", "road",
// 	/* organic */	"wood","pinewood","palmwood","applewood","appletree","heart","flowers","talltree",
// 	/* food */		"apple","mushroom","bluemushroom","blackmushroom","yellowmushroom","greenmushroom","carrot-inground"
// );
