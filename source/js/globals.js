import { Items } from './item/items';
var blItems = new Items();

export const blocktypes = blItems.getItemSlugs();
export const hasanimationn = blItems.getItemSlugsByProperty('has_animation');
export const iscraftable = blItems.getItemSlugsByProperty('is_craftable');
export const iscollectable = blItems.getItemSlugsByProperty('is_collectable');
export const iscutable = blItems.getItemSlugsByProperty('is_cutable');
export const isedible = blItems.getItemSlugsByProperty('is_edible');
export const isplaceable = blItems.getItemSlugsByProperty('is_placeable');
export const isblocking = blItems.getItemSlugsByProperty('is_blocking');
export const isingredient = blItems.getItemSlugsByProperty('is_ingredient');
export const isground = blItems.getItemSlugsByProperty('is_ground');
export const isdiggable = blItems.getItemSlugsByProperty('is_diggable');
export const islifeform = blItems.getItemSlugsByProperty('is_lifeform');
export const isequipable = blItems.getItemSlugsByProperty('is_equipable');
export const isuseable = blItems.getItemSlugsByProperty('is_useable');

export const mobtypes = new Array (
	"player",
	"enemy",
	"deer"
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

export const buiColor = {
	white: "#FFFFFF",
	black: "#000000",
	red50: "#FA694A",
	orange50: "#E08F33",
	yellow50: "#E7DB57",
	green50: "#37DB2F",
	forest50: "#61A461",
	blue50: "#329ADB",
	cyan50: "#06C7D9",
	purple50: "#A247A6"
};

export const gridunitpx = 20; //must change this px value in css as well
export var totalmapblocks = 0;
export var mapWidthMobile = 16;
export var mapHeightMobile = 16; 
export var mapWidthDesktop = 26;
export var mapHeightDesktop = 26;
export var mapwidth = 0;
export var mapheight = 0;
export var mapWidthPx = 0;
export var mapHeightPx = 0;
export var currentMap = 'forest';
export var currentCubeSide = 'front';

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

export var guitarFirstNote = true;
export var keyboardFirstNote = true;
export var trumpetFirstNote = true;
export var bassFirstNote = true;
export var drumsFirstNote = true;
export var rocketFirstFlight = true;

export const WEBDB_shortName = 'beaudryland';
export const WEBDB_version = '0.1';
export const WEBDB_displayName = 'beaudryland';
export const WEBDB_maxSize = 65536;

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
