<?php
include '../config.php';
ob_start();
session_start();

// get item data
$image = stripslashes($_POST['image']);
$name = stripslashes($_POST['name']);

// connect to db
$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

// send data to db
$result = $mysqli->query(
	"INSERT INTO beaudryland_sprites (
		name,
		image
	) VALUES (
		'".$name."',
		'".$image."'
	)"
) or die(mysql_error() );

// $svgfile = '../sprites/item-'.$slug.'.svg';
// $currentfile = file_get_contents($svgfile);
// $currentfile = $image;
// file_put_contents($svgfile, $currentfile);

// $cssfile = '../css/svg-items.css';
// $currentcss = file_get_contents($cssfile);
// $currentcss .= '.block-'.$slug.' { background-image:url('.$svgfile.');'.' }' . PHP_EOL;
// file_put_contents($cssfile, $currentcss);

$mysqli->close();
ob_end_flush();
?>