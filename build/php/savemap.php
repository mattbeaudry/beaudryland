<?php
include '../config.php';
ob_start();
session_start();
$username = $_SESSION['username']; 
$mapdata = $_POST['mapdata'];
$maptype = $_POST['maptype'];

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$result = $mysqli->query(
	"INSERT INTO beaudryland_maps(mapdata,user,maptype)VALUES('$mapdata','$username','$maptype')"
) or die(mysql_error() );

return $result;

echo $result;

$mysqli->close();
ob_end_flush();
?>