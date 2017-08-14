
/* SETUP MOBILE DATABASE, LOAD MAP IF EXISTS */
var db = '';
const shortName = 'beaudryland';
const version = '0.1';
const displayName = 'beaudryland';
const maxSize = 65536;


/* MOBILE ONLY FUNCTIONS */
export var saveGameMobile = function() {
	//achievementCompleted("saveyourgame");
	websql_saveMap();
};

export var loadGameMobile = function() {
	websql_loadMap();
};

export var websql_openDatabase = function() {
	db = openDatabase(shortName, version, displayName, maxSize);
};

export var websql_createTable = function() {
	 db.transaction(
		function(transaction) {
			transaction.executeSql(
	            'CREATE TABLE IF NOT EXISTS beaudryland_maps ' +
				' (mapid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
				' username TEXT NOT NULL, ' +
				' mapdata TEXT NOT NULL, ' +
				' invdata TEXT NOT NULL, ' +
				' achievements TEXT NOT NULL);'
			);
		}
	 );
};

export var websql_insertRow = function() {
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

export var websql_selectRow = function() {
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

//save map
export var websql_saveMap = function() {
	var username = "username";
	var mapdata = $('.maps-wrap').html();
	var invdata = $('.the-fucking-inventory').html();

	// var achievements = [];
	// $('.item-achievements .status-completed').each(function(index){
	// 	var achievementname = $(this).attr('data-achievementname');
	// 	achievements[index] = achievementname;
	// 	trace(achievementname);
	// });s
	// achievements = JSON.stringify(achievements);

	db.transaction(
		function(transaction) {
			console.log('Attempting to insert ' + username + ' and mapdata');
			transaction.executeSql(
				'INSERT INTO beaudryland_maps (username,mapdata,invdata,achievements) VALUES (?,?,?,?);',
				[username,mapdata,invdata,achievements],
				null,
				errorHandler
			);
		}
	);
};

//load map
export var websql_loadMap = function() {
	 db.transaction(
		function(transaction) {
			transaction.executeSql(
				'SELECT mapid, username, mapdata, invdata, achievements FROM beaudryland_maps;',
				[],
				function (transaction, result) {
					for (var i=0; i < result.rows.length; i++) {
						$('.maps-wrap').html("");
						$('.the-fucking-inventory').html("");
						var row = result.rows.item(i);
						//console.log('mapid is ' + row.mapid + ', username is ' + row.username + ' Map Data is ' + row.mapdata);
						$('.maps-wrap').html(row.mapdata);
						$('.the-fucking-inventory').html(row.invdata);
						
						// achievements = row.achievements;
						// achievements = achievements.split(',');
				    	// for (var k=0;k<achievements.length;k++){
				    	// 	var achievementname = achievements[k];
				    	// 	trace(achievementname);
				    	// 	$('.item-achievements .achievement-'+achievementname).addClass("status-completed");
				    	// }
					}
					setupMouseEvents();
				},
				errorHandler
			);
		}
	 );

};
