<?php
include '../config.php';
ob_start();
session_start();

// get item data
$image = stripslashes($_POST['image']);
$name = stripslashes($_POST['name']);
$slug = stripslashes($_POST['slug']);
$description = stripslashes($_POST['description']);
$user = stripslashes($_POST['user']);
$has_animation = stripslashes($_POST['has_animation']);
$image_animated = stripslashes($_POST['image_animated']);
$is_craftable = stripslashes($_POST['is_craftable']);
$is_collectable = stripslashes($_POST['is_collectable']);
$is_cutable = stripslashes($_POST['is_cutable']);
$is_edible = stripslashes($_POST['is_edible']);
$is_placeable = stripslashes($_POST['is_placeable']);
$is_blocking = stripslashes($_POST['is_blocking']);
$is_ingredient = stripslashes($_POST['is_ingredient']);
$is_lifeform = stripslashes($_POST['is_lifeform']);
$is_equipable = stripslashes($_POST['is_equipable']);
$is_useable = stripslashes($_POST['is_useable']);

// connect to db
$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

// send data to db
$result = $mysqli->query(
	"INSERT INTO beaudryland_items (
		name,
		slug,
		image,
		description,
		user,
		has_animation,
		image_animated,
		is_craftable,
		is_collectable,
		is_cutable,
		is_edible,
		is_placeable,
		is_blocking,
		is_ingredient,
		is_lifeform,
		is_equipable,
		is_useable
	) VALUES (
		'".$name."',
		'".$slug."',
		'".$image."',
		'".$description."',
		'".$user."',
		'".$has_animation."',
		'".$image_animated."',
		'".$is_craftable."',
		'".$is_collectable."',
		'".$is_cutable."',
		'".$is_edible."',
		'".$is_placeable."',
		'".$is_blocking."',
		'".$is_ingredient."',
		'".$is_lifeform."',
		'".$is_equipable."',
		'".$is_useable."'

	)"
) or die(mysql_error() );

// redirect
/*
if($result){
	header("location:../spritepainter.php");
} else {
	header("location:../spritepainter.php?error=registerfailed");
}
*/

// save svg to file here 
//$file = 'item-'.$newitemslug.'.txt';

$svgfile = '../svg/item-'.$slug.'.svg';
$currentfile = file_get_contents($svgfile);
$currentfile = $image;
file_put_contents($svgfile, $currentfile);

$cssfile = '../css/svg-items.css';
$currentcss = file_get_contents($cssfile);
$currentcss .= '.block-'.$slug.' { background-image:url('.$svgfile.');'.' }' . PHP_EOL;
file_put_contents($cssfile, $currentcss);

/*
echo $result;
return $result;
*/

$mysqli->close();
ob_end_flush();
?>