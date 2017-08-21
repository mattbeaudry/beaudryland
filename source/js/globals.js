export const gridunitpx = 20; //must change this px value in css as well
export var totalmapblocks = 0;
export var mapwidth = 0;
export var mapheight = 0;
export var mapwidthpx = 0;
export var mapheightpx = 0;

export const inventoryslots = 74;
export const enemyspeed = 200;
export const playerspeed = 50;
export const animalspeed = 2000;
export const projectilespeed = 50;
export const bikespeed = 100;
export const playerid = 1;
export const totalhearts = 5;

export var disablekeyboardevents = false;
export var globalmapblockcount = 0;
export var isnightime = false;

export var currentMap = 'forest';
export var currentCubeSide = 'front';

export const mobtypes = new Array (
	/*players*/		"player",
	/*enemies*/		"enemy",
	/*animals*/		"deer"
);

export const blocktypes = new Array (
	/*forest map*/	"grass", "dirt", "water", "tree", "rock", "hole",
	/*winter map*/  "snow", "frozendirt", "ice", "pinetree", "icerock", "snowhole",
	/*beach map*/  	"sand", "wetsand", "wave", "palmtree", "sandstone", "sandhole",
	/*space map*/   "space", "star", "earth", "redgalaxy", "bluegalaxy", "sun",
	/*items*/     	"shovel", "fire", "door", "door-open", "frisbee", "sign",
	/*furniture*/	"table","chair","chest","bed","toilet","sink","bathtub",
	/*weapons*/		"sword", "spear", "axe", "bow", "arrow",
	/*instruments*/ "guitar", "piano","drumsticks","bassdrum","snare","hihat","cymbal","tom",
	/*technology*/	"telescope","computer","2dprinter","portal-a","portal-b",
	/*transport*/	"bike", "skiis", "canoe", "car", "rocket",
	/*treasure*/  	"diamond", "gold", "silver", "oil", "clay",
	/*holes*/		"diamond-hole", "gold-hole", "silver-hole", "oil-hole", "clay-hole",
	/*blocks*/     	"rockbrick", "icerockbrick", "sandstonebrick", "claybrick", "road",
	/*organic*/		"wood","pinewood","palmwood","applewood","appletree","heart","flowers","talltree",
	/*food*/		"apple","mushroom","bluemushroom","blackmushroom","yellowmushroom","greenmushroom","carrot","carrot-inground"
);

export const isplaceable = new Array (
	/*forest map*/	"grass", "dirt", "water", "tree", "rock",
	/*winter map*/  "snow", "frozendirt", "ice", "pinetree", "icerock",
	/*beach map*/  	"sand", "wetsand", "palmtree", "sandstone",
	/*items*/     	"wood", "fire", "door", "sign",
	/*furniture*/	"table","chair","chest","bed","toilet","sink","bathtub",
	/*technology*/	"telescope","computer","2dprinter","portal-a","portal-b",
	/*instrument*/	"guitar", "piano","drumsticks","bassdrum","snare","hihat","cymbal","tom",
	/*treasure*/  	"diamond", "gold", "silver", "oil", "clay",
	/*blocks*/     	"rockbrick", "icerockbrick", "sandstonebrick", "claybrick", "road",
	/* organic */	"wood","pinewood","palmwood","applewood","appletree","flowers","talltree",
	/* food */		"apple","mushroom","bluemushroom","blackmushroom","yellowmushroom","greenmushroom","carrot"
);

export const isingredient = new Array (
	/*forest map*/	"tree", "rock",
	/*winter map*/  "pinetree", "icerock",
	/*beach map*/  	"palmtree",
	/*items*/     	"fire",
	/*treasure*/  	"diamond", "gold", "silver", "oil", "clay",
	/*organic*/		"wood","pinewood","palmwood","applewood"
);

/* isequipable is used for items with player graphics + animation */
export const isequipable = new Array (
	/*items*/     	"shovel",
	/*weapons*/		"sword", "axe", "bow",
	/*transport*/	"bike", "skiis", "canoe", "car", "rocket",
	/*instrument*/	"guitar", "piano","drumsticks","bassdrum","snare","hihat","cymbal","tom"
);

export const iscollectable = new Array (
	/*forest map*/	"tree", "rock",
	/*winter map*/  "pinetree", "icerock",
	/*beach map*/  	"palmtree", "sandstone",
	/*items*/     	"fire",
	/*furniture*/	"table","chair","chest","bed","toilet","sink","bathtub",
	/*technology*/	"telescope","computer","2dprinter",
	/*treasure*/  	"diamond", "gold", "silver", "oil", "clay",
	/*instrument*/	"guitar", "piano","drumsticks","bassdrum","snare","hihat","cymbal","tom",
	/*holes*/		"diamond-hole", "gold-hole", "silver-hole", "oil-hole", "clay-hole",
	/*blocks*/     	"rockbrick", "icerockbrick", "sandstonebrick", "claybrick", "road",
	/* organic */	"wood","pinewood","palmwood","applewood","appletree","heart","flowers","talltree",
	/* food */		"apple","mushroom","bluemushroom","blackmushroom","yellowmushroom","greenmushroom","carrot-inground"
);

export const objecttypes = new Array (
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

export const allblockclasses = function() {
	var allblockclasses = ""; 
	$.each(blocktypes, function(i, v) { 
		allblockclasses += "block-"+v+" "; 
	});
	return allblockclasses;
};

export const objectshtml = function() {
	var objectshtml = ""; 
	$.each(objecttypes, function(i, v) { 
	    objectshtml += '<div class="block '+v+'" data-blocktype="'+v+'"></div>'; 
	});
	return objectshtml;
};

export const objectsArray = [0,2,3];

export const uniqueObjectID = function() {
	var id = objectsArray.length + 1;
	console.log("uniqueID:"+id);
	objectsArray.push(id);
	return id;
};

export const cubeSidesArray = {
	front: {
		up: 'top',
		right: 'right',
		down: 'bottom',
		left: 'left',
		map: 'forest'
	},
	right: {
		up: 'top',
		right: 'back',
		down: 'bottom',
		left: 'front',
		map: 'winter'
	},
	back: {
		up: 'top',
		right: 'left',
		down: 'bottom',
		left: 'right',
		map: 'beach'
	},
	left: {
		up: 'top',
		right: 'front',
		down: 'bottom',
		left: 'back',
		map: 'jungle'
	},
	bottom: {
		up: 'front',
		right: 'right',
		down: 'back',
		left: 'left',
		map: 'desert'
	},
	top: {
		up: 'back',
		right: 'right',
		down: 'front',
		left: 'left',
		map: 'islands'
	}
}
