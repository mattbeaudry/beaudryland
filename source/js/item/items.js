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
