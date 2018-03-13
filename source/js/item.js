import * as globals from './globals';

import { Utility } from './utility';

var blUtil = new Utility();

export class Item {

	constructor() {

	}

	initItems() {
		// load "built-in" items
		// load "user generated" items from db
		// create global item variables + JSON object
		// (item creator) = build select menus for craftable items
		// create item list under inventory (incl. recipies)
	}

}

// MODEL

/*

image
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


NEW PROP IDEAS
--------------
has_map_mechanism
is_throwable
background_color
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
*/
