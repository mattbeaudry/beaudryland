import * as globals from './globals';
// import { HCI } from './hci'; 

// var blHCI = new HCI();

export class Mobile {

	constructor() {
		this.db = '';
	}

	saveGameMobile() {
		//achievementCompleted("saveyourgame");
		this.websql_saveMap();
	}

	loadGameMobile() {
		this.websql_loadMap();
	}

	websql_openDatabase() {
		this.db = openDatabase(
			globals.WEBDB_shortName, 
			globals.WEBDB_version,
			globals.WEBDB_displayName, 
			globals.WEBDB_maxSize
		);
	}

	websql_createTable() {
		this.db.transaction(
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
	}

	websql_insertRow() {
		 var username = "matt";
		 var mapdata = '<div class="block block-grass" data-blocktype="grass"></div>';
		 this.db.transaction(
			function(transaction) {
				console.log('Attempting to insert ' + username + ' and mapdata');
				transaction.executeSql(
					'INSERT INTO beaudryland_maps (username,mapdata) VALUES (?,?);',
					[username,mapdata],
					null
				);
			}
		 );
	}

	websql_selectRow() {
		 this.db.transaction(
			function(transaction) {
				transaction.executeSql(
					'SELECT mapid, username, mapdata FROM beaudryland_maps;',
					[],
					function (transaction, result) {
						for (var i=0; i < result.rows.length; i++) {
							var row = result.rows.item(i);
							console.log('mapid is ' + row.mapid + ', username is ' + row.username + ' Map Data is ' + row.mapdata);
						}
					}
				);
			}
		 );
	}

	//save map
	websql_saveMap() {
		var username = "username";
		var mapdata = $('.maps-wrap').html();
		var invdata = $('.the-fucking-inventory').html();

		var achievements = [];
		// $('.item-achievements .status-completed').each(function(index){
		// 	var achievementname = $(this).attr('data-achievementname');
		// 	achievements[index] = achievementname;
		// 	trace(achievementname);
		// });s
		// achievements = JSON.stringify(achievements);

		this.db.transaction(
			function(transaction) {
				console.log('Attempting to insert ' + username + ' and mapdata');
				transaction.executeSql(
					'INSERT INTO beaudryland_maps (username,mapdata,invdata,achievements) VALUES (?,?,?,?);',
					[username,mapdata,invdata,achievements],
					null
				);
			}
		);
	}

	//load map
	websql_loadMap() {
		this.db.transaction(
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
						//blHCI.setupMouseEvents();
					}
				);
			}
		);
	}

}