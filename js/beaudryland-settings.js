
/////////////
//  GAME SETTINGS & GLOBALS
/////////////


var mobtypes = new Array (
	/*players*/		"player",
	/*enemies*/		"enemy",
	/*animals*/		"deer"
);
var blocktypes = new Array (
	/*forest map*/	"grass", "dirt", "water", "tree", "rock", "hole",
	/*winter map*/  "snow", "frozendirt", "ice", "pinetree", "icerock", "snowhole",
	/*beach map*/  	"sand", "wetsand", "wave", "palmtree", "sandstone", "sandhole",
	/*items*/     	"shovel", "wood", "fire", "door", "door-open", "frisbee", "sign",
	/*furniture*/	"table","chair","chest","bed","toilet","sink","bathtub",
	/*weapons*/		"sword", "spear", "axe",
	/*instruments*/ "guitar", "piano","bassdrum","snare","hihat","cymbal","tom",
	/*technology*/	"telescope","computer","2dprinter",
	/*transport*/	"bike", "skiis", "canoe", "car", "rocket",
	/*treasure*/  	"diamond", "gold", "silver", "oil", "clay",
	/*holes*/		"diamond-hole", "gold-hole", "silver-hole", "oil-hole", "clay-hole",
	/*blocks*/     	"rockbrick", "icerockbrick", "sandstonebrick", "claybrick", "road",

	"appletree", "heart", "apple"
);
var allblockclasses = ""; 
$.each(blocktypes, function(i, v) { allblockclasses += "block-"+v+" "; });
var isplaceable = new Array (
	/*forest map*/	"grass", "dirt", "water", "tree", "rock",
	/*winter map*/  "snow", "frozendirt", "ice", "pinetree", "icerock",
	/*beach map*/  	"sand", "wetsand", "palmtree", "sandstone",
	/*items*/     	"wood", "fire", "door", "sign",
	/*furniture*/	"table","chair","chest","bed","toilet","sink","bathtub",
	/*technology*/	"telescope","computer","2dprinter",
	/*instrument*/	"guitar", "piano","bassdrum","snare","hihat","cymbal","tom",
	/*treasure*/  	"diamond", "gold", "silver", "oil", "clay",
	/*blocks*/     	"rockbrick", "icerockbrick", "sandstonebrick", "claybrick", "road",

	"appletree"
);
var isingredient = new Array (
	/*forest map*/	"tree", "rock",
	/*winter map*/  "pinetree", "icerock",
	/*beach map*/  	"palmtree",
	/*items*/     	"wood", "fire",
	/*treasure*/  	"diamond", "gold", "silver", "oil", "clay"
);
/* isequipable is used for items with player graphics */
var isequipable = new Array (
	/*items*/     	"shovel",
	/*weapons*/		"sword", "axe",
	/*transport*/	"bike", "skiis", "canoe", "car", "rocket"
);
var iscollectable = new Array (
	/*forest map*/	"tree", "rock",
	/*winter map*/  "pinetree", "icerock",
	/*beach map*/  	"palmtree", "sandstone",
	/*items*/     	"wood", "fire",
	/*furniture*/	"table","chair","chest","bed","toilet","sink","bathtub",
	/*technology*/	"telescope","computer","2dprinter",
	/*treasure*/  	"diamond", "gold", "silver", "oil", "clay",
	/*instrument*/	"guitar", "piano","bassdrum","snare","hihat","cymbal","tom",
	/*holes*/		"diamond-hole", "gold-hole", "silver-hole", "oil-hole", "clay-hole",
	/*blocks*/     	"rockbrick", "icerockbrick", "sandstonebrick", "claybrick", "road",

	"appletree","heart","apple"
);

//var craftableblockclasses = "";
var inventoryslots = 44;
var gridunitpx = 20; //must change this px value in css as well
var enemyspeed = 200;
var playerspeed = 50;
var animalspeed = 1000;
var projectilespeed = 50;
var bikespeed = 100;
var disablekeyboardevents = false;
var playerid = 1;
var objectsArray = [0,2,3];
uniqueObjectID = function() {
	var id = objectsArray.length + 1;
	trace("uniqueID:"+id);
	objectsArray.push(id);
	return id;
};

var globalmapblockcount = 0;
