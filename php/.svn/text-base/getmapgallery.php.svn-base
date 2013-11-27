<?php
include '../config.php';
ob_start();
session_start();
$username = $_SESSION['username'];

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$forestmaps = $mysqli->query(
	"SELECT * 
	FROM beaudryland_maps
	WHERE mapid IN (
    	SELECT MAX(mapid)
    	FROM beaudryland_maps
    	WHERE maptype = 'forest'
    	GROUP BY user
    ) ORDER BY mapid DESC"
) or die(mysql_error() );

if($forestmaps->num_rows > 0) {
	
	while($forestrows = $forestmaps->fetch_assoc()) {
		
		$mapblocks = json_decode($forestrows['mapdata']);
		
		echo '<article class="gallery-map-wrap map-forest">';
		echo '<h3>'.$forestrows['user'].'land</h3>';
		foreach($mapblocks as $blocktype) {
		    echo '<div data-blocktype="'.$blocktype.'" data-blockhealth="10" class="block block-'.$blocktype.'"></div>';
		}
		echo '</article>';
		
	}
	
}

$wintermaps = $mysqli->query(
	"SELECT * 
	FROM beaudryland_maps
	WHERE mapid IN (
    	SELECT MAX(mapid)
    	FROM beaudryland_maps
    	WHERE maptype = 'winter'
    	GROUP BY user
    ) ORDER BY mapid DESC"
) or die(mysql_error() );

if($wintermaps->num_rows > 0) {
	
	while($winterrows = $wintermaps->fetch_assoc()) {
		
		$mapblocks = json_decode($winterrows['mapdata']);
		
		echo '<article class="gallery-map-wrap map-winter">';
		echo '<h3>'.$winterrows['user'].'land</h3>';
		foreach($mapblocks as $blocktype) {
		    echo '<div data-blocktype="'.$blocktype.'" data-blockhealth="10" class="block block-'.$blocktype.'"></div>';
		}
		echo '</article>';
		
		//echo $row['mapdata'];
		
	}
	
}

$beachmaps = $mysqli->query(
	"SELECT * 
	FROM beaudryland_maps
	WHERE mapid IN (
    	SELECT MAX(mapid)
    	FROM beaudryland_maps
    	WHERE maptype = 'beach'
    	GROUP BY user
    ) ORDER BY mapid DESC"
) or die(mysql_error() );

if($beachmaps->num_rows > 0) {
	
	while($beachrows = $beachmaps->fetch_assoc()) {
		
		$mapblocks = json_decode($beachrows['mapdata']);
		
		echo '<article class="gallery-map-wrap map-beach">';
		echo '<h3>'.$beachrows['user'].'land</h3>';
		foreach($mapblocks as $blocktype) {
		    echo '<div data-blocktype="'.$blocktype.'" data-blockhealth="10" class="block block-'.$blocktype.'"></div>';
		}
		echo '</article>';
		
		//echo $row['mapdata'];
		
	}
	
}

$mysqli->close();
ob_end_flush();
?>