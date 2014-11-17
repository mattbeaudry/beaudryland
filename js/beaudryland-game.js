
/////////////
//  *GAME LOGIC, ACHIVEMENTS, STORY
/////////////

/* PHONEGAP / IPHONE ONLY */
if ( $('body').hasClass("version-phonegap") ){

	/* MOBILE */
	var mapwidth = 16;
	var mapheight = 75;

	$(document).ready(function() {

		console.log("MOBILE VERSION");

		setMapSize();
	    loadNewMap();
	    createPlayer();
		
	    //websql_openDatabase();
	    //websql_createTable();
	    /*
	    drawNewWinterMap();
	    drawNewBeachMap();
	    drawNewSpaceMap();
	    */
	    
	    //websql_loadMap();

		setupKeyboardEvents();
		setupMouseEvents();
		setupControlPadEvents();

	});

	jQuery('.inventory-close').on("click", function(){
		toggleInventory();
	});
	var toggleInventory = function() {
		$('.sticky-inventory').fadeToggle(0);
	}; 

	var db;
	var shortName='beaudryland';
	var version='0.1';
	var displayName='beaudryland';
	var maxSize = 65536;

	var hideControlPad = function() {
		$('.the-fucking-controller').fadeToggle();
	};

	var websql_openDatabase = function() {
		db = openDatabase(shortName,version,displayName,maxSize);
	};

	var websql_createTable = function() {
		 db.transaction(
			function(transaction) {
				transaction.executeSql(
		            'CREATE TABLE IF NOT EXISTS beaudryland_maps ' +
					' (mapid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
					' username TEXT NOT NULL,' +
					' mapdata TEXT NOT NULL);'
				);
			}
		 );
	};

	var websql_insertRow = function() {
		 var username = "matt";
		 var mapdata = '<div class="block block-grass" data-blocktype="grass"></div>';
		 db.transaction(
			function(transaction) {
				console.log('Attempting to insert ' + username + ' and mapdata');
				transaction.executeSql(
					'INSERT INTO beaudryland_maps (username,mapdata) VALUES (?,?);',
					[username,mapdata],
					null,
					errorHandler
				);
			}
		 );
	};

	var websql_selectRow = function() {
		 db.transaction(
			function(transaction) {
					transaction.executeSql(
						'SELECT mapid, username, mapdata FROM beaudryland_maps;',
						[],
						function (transaction, result) {
							for (var i=0; i < result.rows.length; i++) {
								var row = result.rows.item(i);
								console.log('mapid is ' + row.mapid + ', username is ' + row.username + ' Map Data is ' + row.mapdata);
							}
						},
						errorHandler
					);
			}
		 );
	};

	// This function here is used to write out any errors I get to the console.
	function errorHandler(transaction, error) {
		console.log('Oops. Error was '+error.message+' (Code '+error.code+')');
		return true;
	}

	//save map
	var websql_saveMap = function() {
		var username = "username";
		var mapdata = $('.maps-wrap').html();

		db.transaction(
			function(transaction) {
				console.log('Attempting to insert ' + username + ' and mapdata');
				transaction.executeSql(
					'INSERT INTO beaudryland_maps (username,mapdata) VALUES (?,?);',
					[username,mapdata],
					null,
					errorHandler
				);
			}
		);
	};

	//load map
	var websql_loadMap = function() {
		 db.transaction(
			function(transaction) {
					transaction.executeSql(
						'SELECT mapid, username, mapdata FROM beaudryland_maps;',
						[],
						function (transaction, result) {
							for (var i=0; i < result.rows.length; i++) {
								$('.maps-wrap').html("");
								var row = result.rows.item(i);
								console.log('mapid is ' + row.mapid + ', username is ' + row.username + ' Map Data is ' + row.mapdata);
								$('.maps-wrap').html(row.mapdata);
							}
						},
						errorHandler
					);
			}
		 );
	};


/* DESKTOP ONLY */

} else if ( $('body').hasClass("version-desktop") ) {

	var mapwidth = 40;
	var mapheight = 30;

	$(document).ready(function() {

		console.log("DESKTOP VERSION");

		setMapSize();
		loadGame();

		//load NewGame() ???

		setupKeyboardEvents();
		setupMouseEvents();
		setupControlPadEvents();

	});

	//alert/ask player to save before they close the page
	/*
	window.onbeforeunload = confirmExit;
	function confirmExit() {
		return "Sure you don't wanna SAVE first? You should use the SAVE button before you leave!";
	}
	*/

}


var loadNewGame = function() {
	trace("new user & brand new map");
	trace("map type is "+maptype);
    loadNewMap();
    createPlayer();
    if (maptype == 'creative'){
    	drawNewWinterMap();
	    drawNewBeachMap();
	    drawNewSpaceMap();
	    getAllItems();
	    createForestSigns();
    } else if (maptype == 'game') {
    	createForestSigns();
    	createAnimal();
    	createAnimal();
    }
};
loadGame = function(){
	trace("load game");
    $.post('php/loadmap.php', {maptype:'forest'}, function(data) {
    	if (data == false){
    		loadNewGame();
    	} else {
    	    loadMap('forest');
    		$.post('php/loadmap.php', {maptype:'winter'}, function(data) {
    			if (data){
    				trace("loadwintermap");
    				loadMap('winter');
    			}
			});
			$.post('php/loadmap.php', {maptype:'beach'}, function(data) {
				if (data){
					trace("loadbeachmap");
					loadMap('beach');
				}
			});
			loadPlayer();
    	}	
    });
};


/* VARIABLES THAT NEED TO BE CREATED AFTER GAME LOGIC RUNS */

var totalmapblocks = mapwidth * mapheight;
var mapwidthpx = mapwidth * gridunitpx;
var mapheightpx = mapheight * gridunitpx;


//////////
//  *STORY
//////////

createForestSigns = function(){
	trace("add forest sign clues");
	 var forestSigns = [
	 	"You shall collect trees and rocks to create wood and other items.",
	 	"You shall build a shovel in order to find treasure.",
	 	"You shall build a guitar in order to unlock a new area."
	 ];
	 $.each(forestSigns,function(index,value){
	 	var blockid = Math.floor((Math.random() * totalmapblocks) + 1);
	 	changeBlockType(blockid,"sign");
	 	$('.the-fucking-map .block:eq('+blockid+')').attr("data-text", value);
	 });
};
/*
createWinterSigns = function(){
	trace("add winter sign clues");
	 var forestSigns = [
	 	"Message 1",
	 	"Message 2",
	 	"Message 3"
	 ];
	 $.each(forestSigns,function(index,value){
	 	var blockid = Math.floor((Math.random() * totalmapblocks) + 1);
	 	changeBlockType(blockid,"sign");
	 	$('.the-fucking-winter-map .block:eq('+blockid+')').attr("data-text", value);
	 });
};
createBeachSigns = function(){
	trace("add beach sign clues");
	var forestSigns = [
		"Message 1",
		"Message 2",
		"Message 3"
	];
	$.each(forestSigns,function(index,value){
		var blockid = Math.floor((Math.random() * totalmapblocks) + 1);
		changeBlockType(blockid,"sign");
		$('.the-fucking-beach-map .block:eq('+blockid+')').attr("data-text", value);
	});
};
*/





/////////////
//  *ACHIEVEMENTS & NOTIFICATIONS
/////////////

displayDialog = function(text) {

	console.log("displayDialog");

	var html = '<div class="bubble-wrap bubble-dialog">';
				html += '<div class="bubble-link">';
		  			html += '<form class="bubble-form" action="#">';
		  				html += '<h3>'+text+'</h3>';
		    			//html += '<input class="bubble-input" type="text" placeholder="Text">';
		    			//html += '<textarea class="bubble-text bubble-input" rows="2" cols="30" placeholder="type message"></textarea>';
		    			html += '<input type="submit" value="Okay!" >';
		  			html += '</form>';
		  		html += '</div>';
		html += '</div>';

	$('.page-game').append(html);

	$('.bubble-dialog .bubble-form').submit(function(e) {

		$('.bubble-wrap').remove();
		event.preventDefault();

	});
};

/*
var achievements = [
        {
            "title": "Cutting Wood",
            "slug", "cuttingwood",
            "description": "Cut down trees and use them to create wood blocks.",
            "status": "incompleted"
        },
        {
            "title": "Keeping Warm",
            "slug", "keepingwarm",
            "description": "Use rocks and wood to build a fire.",
            "status": "incompleted"
        },
        {
            "title": "Taking Shelter",
            "slug", "takingshelter",
            "description": "Build a door and use some wood or solid blocks to create a cabin.",
            "status": "incompleted"
        },
        {
            "title": "Treasure Hunter",
            "slug", "treasurehunter",
            "description": "Build a shovel and dig for treasure.",
            "status": "incompleted"
        },
        {
            "title": "Jamming Out",
            "slug", "jammingout",
            "description": "Build a guitar or keyboard.",
            "status": "incompleted"
        }
    ]
}
*/

// fill in the achivement in page content
// for loop for above object


completeAchievement = function(achievement) {



};
