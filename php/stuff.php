
<script>

/*
drawInputBubble = function(object, text) {
	if (text) {
		//$('.the-fucking-'+object).append('<div class="speech-bubble">'+text+'</div>');
		var html = '<div class="bubble-wrap">';
				html += '<a href="#" class="bubble-link bubble-save">';
		  			html += '';
		    			
		  			html += '';
		  		html += '</a>';
		  	html += '<span class="bubble-hangdown-1"></span>';
		  	html += '<span class="bubble-hangdown-2"></span>';
		html += '</div>';	
		$('.the-fucking-'+object).append(html);	
	} else {
		//$('.the-fucking-'+object).append('<div class="speech-bubble"><form class="bubble-form" action="submit"><textarea class="bubble-text" rows="2" cols="30"></textarea></form></div>');
		var html = '<div class="bubble-wrap">';
				html += '<div class="bubble-link">';
		  			html += '<form class="bubble-form" action="submit">';
		    			//html += '<input class="bubble-input" type="text" placeholder="Text">';
		    			html += '<textarea class="bubble-text bubble-input" rows="2" cols="30" placeholder="type message"></textarea>';
		  			html += '</form>';
		  		html += '</div>';
		  	html += '<span class="bubble-hangdown-1"></span>';
		  	html += '<span class="bubble-hangdown-2"></span>';
		html += '</div>';
		$('.the-fucking-'+object).append(html);
	}

	$('.bubble-text').focus();
	
	setTimeout('$(".speech-bubble").remove();', 1000);
};

drawThoughtBubble = function(object, text) {
	$('.the-fucking-'+object).append('<div class="speech-bubble">'+text+'</div>');
	setTimeout('$(".speech-bubble").remove();', 1000);
};
$( "#target" ).submit(function( event ) {
  alert( "Handler for .submit() called." );
  event.preventDefault();
});
*/

/*
writeTextToSign = function() {
	if ($('.speech-bubble').length > 0){
		var message = $('.bubble-text').val();
		trace("sign message:"+message);

		//find block that the player is facing
		var id = 1;
		var direction = getObjectDirection(id, "player");
		var block = getObjectCurrentBlock(id);

		switch (direction) {
			case "up": block = block - (mapwidth+1); break;
			case "down": block = block + (mapwidth-1); break;
			case "left": block = block - 2; break;
			case "right": block = block; break;
		}
		
		$('.block:eq('+block+')').attr("data-text", message);

		$('.speech-bubble').remove();
	} 
	//else {
		//drawInputBubble("player");
	//}
};
*/

</script>
<nav class="beaudryland-nav">
	<ul class="clearfix">
		<li class="link-savemap"><a>save game</a></li>
		<li class="link-logout"><a class="link-logout" href="logout.php"><?php echo $_SESSION['username']; ?> logout</a></li>
		<li class="link-multiplayer"><a href="mapgallery.php"  target="_blank">map gallery</a></li>
		<li class="link-itemlist"><a href="#itemlist">Items</a></li>
	</ul>
</nav>

<?php 
/*
//RANDOM ENEMY MOVEMENT
if (enemyrandom<=0.25) { moveObjectUp("enemy"); }
else if (enemyrandom>=0.5) { moveObjectDown("enemy"); }
else if (enemyrandom>=0.75) { moveObjectRight("enemy"); }
else { moveObjectLeft("enemy"); }
*/

/*
	"SELECT * FROM beaudryland_maps
	WHERE maptype LIKE 'forest'
	GROUP BY user
	ORDER BY mapid DESC"
*/
/*
while ($row = mysql_fetch_assoc($result)) {
    foreach ($row as $key => $value) {
        if ($key == 'Yen_Price') {
            echo "Hello";
        }
        echo "<td>$value</td>";
    }
}
*/

/*
$result = $mysqli->query(
	"SELECT * FROM beaudryland_maps 
	WHERE user LIKE '".$username."' 
	ORDER BY mapid 
	DESC 
	LIMIT 1"
) or die(mysql_error() );
*/

/*
$result = $mysqli->query(
	"SELECT * FROM beaudryland_maps 
	ORDER BY mapid 
	DESC"
) or die(mysql_error() );
*/
/*
$result = $mysqli->query(
	"SELECT * FROM beaudryland_maps
	WHERE mapid IN (
    SELECT MAX(mapid)
    FROM beaudryland_maps
    GROUP BY user
    ) ORDER BY mapid DESC"
) or die(mysql_error() );
*/


/*
savePlayerInventory = function() {
	
	var inventoryItems = new Array();
	for (i=1; i<=inventoryslots; i++){ inventoryItems[i]=new Object(); }
	
	$('.the-fucking-inventory > div').each(function(index){
		var amount = $(this).html();
		var blocktype = $(this).attr('data-blocktype');
		console.log("inventory slot "+index+" = "+amount+blocktype);
		inventoryItems[index] = {type:blocktype, amount:amount};
	});

	console.log("saved inventory = "+inventoryItems);
	inventoryItems = JSON.stringify(inventoryItems);
	
	$.post('php/saveinventory.php', {inventory: inventoryItems}, function(data) {

        console.log("saved inventory: "+data);
        
    });
	
};

loadPlayerInventory = function() {
	
	$.post('php/loadinventory.php', function(data) {
    
        //$('.the-fucking-map').append(data);
        console.log("loading inv");
        
        if (data == false) {
        	//alert("inv query fail");
        }
        
        var inventoryitems = JSON.parse(data);
    	
    	for (var i = 0; i < (inventoryitems.length-1); i++) {
    	
    		$('.the-fucking-inventory > div:eq('+i+')').html(inventoryitems[i].amount);
    		
    		if (inventoryitems[i].amount !== "0"){
    			$('.the-fucking-inventory > div:eq('+i+')').attr('data-blocktype', inventoryitems[i].type);
    			$('.the-fucking-inventory > div:eq('+i+')').removeClass('empty');
    			$('.the-fucking-inventory > div:eq('+i+')').addClass('block block-'+inventoryitems[i].type);
    		}
    		
		    console.log("loadinventory item "+i+inventoryitems[i].type+inventoryitems[i].amount);

		}
        
    });
	
};

saveMap = function(){
	console.log("save map");
	
	//loop through blocks and create array, then jason stringify 
	
    var mapdata = $(".the-fucking-map").html();
    
    $.post('php/savemap.php', {mapdata: mapdata}, function(data) {
    
        $('body').append(data);
        console.log("save mapdata: "+data);
        
        $('.link-savemap').append(' <span><strong>map saved.</strong></span>');
		//$('.the-fucking-'+object).css("marginTop","-60px");
		setTimeout('$(".link-savemap span").remove();', 2000);
        
    });
};
*/

function createDatabase(){
	if (mysql_query("CREATE DATABASE beaudryland",$mysql_connect)) {
	  	echo "Database created";
	} else {
	  	echo "Error creating database: " . mysql_error();
	}
}

// SYNTH and AUDIO REFERENCE CODE

		//osc = T("osc", "sin", 440, 0.25).play();
		//fil = T("filtre", "lpf", 440, osc);
		
		
		// push [bang] button to execute the below code
		
		// Oscillator's bang() resets the phase
		//syn.addEventListener("bang", function() {
		    
		//});
		
		
		// Envelope's bang() triggers the envelope
		//syn.addEventListener("bang", function() {    
		    
		//});
		
		
		/*
		object.mul   // [Number] Output will be multiplied by this value
		object.add   // [Number]    and will be added to the output
		
		object.args  // [Readonly] Input objects which will be processed (Extended Array)
		object.isOn  // [Readonly] on?
		object.isOff // [Readonly] off?
		object.isAr  // [Readonly] audio rate?
		object.isKr  // [Readonly] control rate?
		*/
		
		/*
		var bpm = 132;
		var seq, s1, s2, hh, hh_env, sd, sd_env, bd, bd_env;
		var metro, drumkit, beam;
		
		// hihat
		hh = T("*", T("hpf", 8000, T("noise")),
		            hh_env = T("perc", "32db", 30));
		hh.i = 2;
		
		// snare
		sd = T("*", T("rlpf", 5000, 0.4, T("pink")),
		            sd_env = T("perc", "32db", 120));
		sd.i = 3;
		
		// bass drum
		bd = T("clip", T("*", T("rlpf", 40, 0.5, T("pulse", 40, 2)),
		                      bd_env = T("perc", "32db", 60)));
		bd.i = 4;
		
		// metro
		metro = T("interval", timbre.utils.bpm2msec(bpm, 16), function() {
		    var i = metro.count % p[0].length;
		    
		    if (p[s1.i][i]) s1(s1.freqs[i & 7]);
		    if (p[s2.i][i] || beam) s2();
		    beam = false;
		    
		    if (p[hh.i][i]) {
		        hh_env.mul = [0.4, 0.6][i & 1];
		        hh_env.bang();
		    }
		    if (p[sd.i][i]) {
		        sd_env.mul = [0.4, 0.2][i & 1];
		        sd_env.d   = [180, 120][i & 1];
		        sd_env.bang();
		    }
		    if (p[bd.i][i]) {
		        bd_env.bang();
		    }
		});
		
		// drumkit
		drumkit = T("dac", seq, hh, sd, bd);
		
		drumkit.onbang = function() {
		    beam = true;
		};
		drumkit.onplay = function() {
		    interval.on();
		};
		drumkit.onpause = function() {
		    interval.off();
		};
		
		drumkit.play();
		*/
		
// SYNTH and AUDIO REFERENCE CODE

		//osc = T("osc", "sin", 440, 0.25).play();
		//fil = T("filtre", "lpf", 440, osc);
		
		
		// push [bang] button to execute the below code
		
		// Oscillator's bang() resets the phase
		//syn.addEventListener("bang", function() {
		    
		//});
		
		
		// Envelope's bang() triggers the envelope
		//syn.addEventListener("bang", function() {    
		    
		//});
		
		
		/*
		object.mul   // [Number] Output will be multiplied by this value
		object.add   // [Number]    and will be added to the output
		
		object.args  // [Readonly] Input objects which will be processed (Extended Array)
		object.isOn  // [Readonly] on?
		object.isOff // [Readonly] off?
		object.isAr  // [Readonly] audio rate?
		object.isKr  // [Readonly] control rate?
		*/
		
		/*
		var bpm = 132;
		var seq, s1, s2, hh, hh_env, sd, sd_env, bd, bd_env;
		var metro, drumkit, beam;
		
		// hihat
		hh = T("*", T("hpf", 8000, T("noise")),
		            hh_env = T("perc", "32db", 30));
		hh.i = 2;
		
		// snare
		sd = T("*", T("rlpf", 5000, 0.4, T("pink")),
		            sd_env = T("perc", "32db", 120));
		sd.i = 3;
		
		// bass drum
		bd = T("clip", T("*", T("rlpf", 40, 0.5, T("pulse", 40, 2)),
		                      bd_env = T("perc", "32db", 60)));
		bd.i = 4;
		
		// metro
		metro = T("interval", timbre.utils.bpm2msec(bpm, 16), function() {
		    var i = metro.count % p[0].length;
		    
		    if (p[s1.i][i]) s1(s1.freqs[i & 7]);
		    if (p[s2.i][i] || beam) s2();
		    beam = false;
		    
		    if (p[hh.i][i]) {
		        hh_env.mul = [0.4, 0.6][i & 1];
		        hh_env.bang();
		    }
		    if (p[sd.i][i]) {
		        sd_env.mul = [0.4, 0.2][i & 1];
		        sd_env.d   = [180, 120][i & 1];
		        sd_env.bang();
		    }
		    if (p[bd.i][i]) {
		        bd_env.bang();
		    }
		});
		
		// drumkit
		drumkit = T("dac", seq, hh, sd, bd);
		
		drumkit.onbang = function() {
		    beam = true;
		};
		drumkit.onplay = function() {
		    interval.on();
		};
		drumkit.onpause = function() {
		    interval.off();
		};
		
		drumkit.play();
		*/
?>


<?php
include '../config.php';
ob_start();
session_start();
$username = $_SESSION['username'];   

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$result = $mysqli->query(
	"SELECT * FROM beaudryland_users 
	WHERE username LIKE '".$username."' 
	ORDER BY userid 
	DESC 
	LIMIT 1"
) or die(mysql_error() );

if($result->num_rows > 0) { 
	while($row = $result->fetch_assoc()) {
		$inventory = $row['inventory'];
	}
}

//echo $inventory;
return $inventory;

$mysqli->close();
ob_end_flush();
?>




<?php
include '../config.php';
ob_start();
session_start();
$username = $_SESSION['username']; 
$mapdata = $_POST['mapdata'];

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$result = $mysqli->query(
	"INSERT INTO beaudryland_users
	(username,inventory) VALUES ('$username','$inventory')"
) or die(mysql_error() );

return $result;

$mysqli->close();
ob_end_flush();
?>
