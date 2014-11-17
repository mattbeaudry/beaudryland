

/////////////
//  *PLAYER
/////////////

refillHearts = function() {
	$('.the-fucking-hearts ul').html('<li></li><li></li><li></li><li></li><li></li>');
};
addHeart = function() {
	$('.the-fucking-hearts ul').append('<li></li>');
};
removeHeart = function() {
	var hearts = totalHearts();
	if (hearts > 1) {
		$('.the-fucking-hearts li').last().remove();
	} else {
		$('.the-fucking-hearts li').remove();
		gameOver();
	}
};
gameOver = function() {
	alert("Game Over!");
	refillHearts();
};
totalHearts = function() {
	var hearts = $('.the-fucking-hearts li').length;
	return hearts;
};


createPlayer = function(id) {
	trace("Create Player");
	//var playerstartblock = 466;
	//changeBlockType(playerstartblock, "grass"); //make sure player doesn't start overtop an obstacle
	//var id = uniqueObjectID();
	var id = 1;
	$('.the-fucking-map').append('<div data-id='+id+' class=" objectid-'+id+' the-fucking-player player-direction-down"></div>');
};
savePlayer = function() {
	var playerdiv = $('.the-fucking-player').prop("outerHTML");
	//playerdiv = playerdiv.toString();
	var selecteditem = $('.the-fucking-inventory .selected-item').attr("data-blocktype");
	//var selecteditem = "sword";
	trace("playerdiv"+playerdiv);
	trace("seleted item"+selecteditem);
    var inventoryItems = new Array();
	for (i=1; i<=inventoryslots; i++){ 
		inventoryItems[i]=new Object();
	}
	$('.the-fucking-inventory > div').each(function(index){
		var amount = $(this).html();
		var blocktype = $(this).attr('data-blocktype');
		trace("inventory slot "+index+" = "+amount+blocktype);
		inventoryItems[index] = {type:blocktype, amount:amount};
	});
	trace("saved inventory");
	inventoryItems = JSON.stringify(inventoryItems);

	//saving signs
	var signs = new Array();
	$('.maps-wrap .block-sign').each(function(index) {
		var blockid = $(this).attr('data-blockid');
		var signmessage = $(this).attr('data-text');
		trace("signid:"+blockid+"---"+signmessage);
		signs[index] = {id:blockid, text:signmessage};
	});
	trace("saved signs");
	signs = JSON.stringify(signs);

	//trace('signs'+signs);

	/*
		var signmessages = new Array();
		for (i=1; i<=inventoryslots; i++){ 
			inventoryItems[i]=new Object();
		}
	    for (i=0; i<=total; i++){
	    	var blocktype = $('.the-fucking-map div:eq('+i+')').attr('data-blocktype');
			mapblocks[i] = blocktype;
			if (blocktype == sign) {
				var signmsg = $('.the-fucking-map div:eq('+i+')').attr('data-text');
			}
		}
		signmessages = JSON.stringify(signmessages);
	*/

	$.post('php/saveplayer.php', {inventory: inventoryItems, playerdiv: playerdiv, selecteditem: selecteditem, signs: signs}, function(data) {
        trace("saved player: "+data);
    });
};
loadPlayer = function(id) {
	trace("loadplayer");
	$.post('php/loadplayer.php', {}, function(data) {
    	var inventoryitems = JSON.parse(data.inventory);
    	var playerdiv = data.playerdiv;
    	var selecteditem = data.selecteditem;
    	trace("loading playerdiv="+playerdiv);
    	$('.the-fucking-map').append(playerdiv);
        trace("loading inv");
    	for (var i = 0; i < (inventoryitems.length-1); i++) {
    		$('.the-fucking-inventory > div:eq('+i+')').html(inventoryitems[i].amount);
    		if (inventoryitems[i].amount !== "0"){
    			$('.the-fucking-inventory > div:eq('+i+')').attr('data-blocktype', inventoryitems[i].type);
    			$('.the-fucking-inventory > div:eq('+i+')').removeClass('empty');
    			$('.the-fucking-inventory > div:eq('+i+')').addClass('block block-'+inventoryitems[i].type);
    		}
		}
		trace("loading selected item");
    	$('.the-fucking-inventory div').not('.the-fucking-inventory .block-'+selecteditem).removeClass('selected-item');
    	$('.the-fucking-inventory .block-'+selecteditem).addClass('selected-item');

    	// LOADING SIGNS
    	var signs = JSON.parse(data.signs);
    	trace('loading signs...'+signs);

    	for (var j=0;j<signs.length;j++){

    		var signid = signs[j].id;
    		var signtext = signs[j].text;
    		if (signtext!=null) {
    			//trace($(".maps-wrap").find("[data-blockid='"+signid+"']"));
    			trace(signid+'--'+signtext);
    			//trace($('.block').find("[data-blockid='"+signid+"']").data("text",signtext) );

    			$('.maps-wrap').find("[data-blockid='"+signid+"']").attr("data-text",signtext);

    			//console.log(sign);



    			//sign[0].attr('data-blocktype',signtext);
    			//$('.block').find("[data-blockid='"+signid+"']").attr("data-text",signtext);
    			//trace('');
    		}
    		//$("ul").find("[data-slide='" + current + "']");
    		
    	}

    }, "json");
};


