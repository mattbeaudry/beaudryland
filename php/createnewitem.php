<?php
include '../config.php';
ob_start();
session_start();

$newitemname = $_POST['name'];
$newitemslug = $_POST['slug'];
$recipe = $_POST['recipe'];
$properties = $_POST['properties'];

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$newitemname = stripslashes($newitemname);
$newitemslug = stripslashes($newitemslug);
$recipe = stripslashes($recipe);
$properties = stripslashes($properties);

$result = $mysqli->query(
	"INSERT INTO beaudryland_items 
	(name,slug,recipe,properties) VALUES ('".$newitemname."','".$newitemslug."','".$recipe."','".$properties."')"
) or die(mysql_error() );

if($result){
	header("location:../spritepainter.php");
} else {
	header("location:../spritepainter.php?error=registerfailed");
}

$mysqli->close();
ob_end_flush();
?>