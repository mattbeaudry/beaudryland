<?php
include '../config.php';
ob_start();
session_start();

// get item data
$newitemname = $_POST['name'];
$newitemslug = $_POST['slug'];
$recipe = $_POST['recipe'];
$properties = $_POST['properties'];
$image = $_POST['image'];

// filter item data
$newitemname = stripslashes($newitemname);
$newitemslug = stripslashes($newitemslug);
$recipe = stripslashes($recipe);
$properties = stripslashes($properties);

// connect to db
$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

// send data to db
$result = $mysqli->query(
	"INSERT INTO beaudryland_items 
	(name,slug,recipe,properties,image) VALUES ('".$newitemname."','".$newitemslug."','".$recipe."','".$properties."','".$image."')"
) or die(mysql_error() );

// redirect

if($result){
	header("location:../spritepainter.php");
} else {
	header("location:../spritepainter.php?error=registerfailed");
}


$mysqli->close();
ob_end_flush();
?>