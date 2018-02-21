<?php

include '../config.php';
ob_start();
session_start();
$username = $_SESSION['username'];
$maptype = $_POST['maptype'];

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$result = $mysqli->query(
	"SELECT * FROM beaudryland_maps 
	WHERE user LIKE '".$username."' AND maptype LIKE '".$maptype."'
	ORDER BY mapid 
	DESC 
	LIMIT 1"
) or die(mysql_error() );

if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$mapdata = $row['mapdata'];
	}
	echo $mapdata;
} else { echo $mapdata = false;	}

$mysqli->close();
ob_end_flush();

?>