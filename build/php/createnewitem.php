<?php
include '../config.php';
ob_start();
session_start();

// get item data
$name = stripslashes($_POST['name']);
$slug = stripslashes($_POST['slug']);
$description = stripslashes($_POST['description']);
$user = stripslashes($_POST['user']);
$is_craftable = stripslashes($_POST['is_craftable']);
$is_collectable = stripslashes($_POST['is_collectable']);
$is_cutable = stripslashes($_POST['is_cutable']);
$is_edible = stripslashes($_POST['is_edible']);
$is_placeable = stripslashes($_POST['is_placeable']);
$is_blocking = stripslashes($_POST['is_blocking']);
$is_ingredient = stripslashes($_POST['is_ingredient']);
$has_animation = stripslashes($_POST['has_animation']);
$is_lifeform = stripslashes($_POST['is_lifeform']);
$is_equipable = stripslashes($_POST['is_equipable']);
$is_useable = stripslashes($_POST['is_useable']);

$image = stripslashes($_POST['image']);
$image_animated = stripslashes($_POST['image_animated']);
$image_lifeform_front = stripslashes($_POST['image_lifeform_front']);
$image_lifeform_back = stripslashes($_POST['image_lifeform_back']);
$image_lifeform_left = stripslashes($_POST['image_lifeform_left']);
$image_lifeform_right = stripslashes($_POST['image_lifeform_right']);
$image_item_front = stripslashes($_POST['image_item_front']);
$image_item_back = stripslashes($_POST['image_item_back']);
$image_item_left = stripslashes($_POST['image_item_left']);
$image_item_right = stripslashes($_POST['image_item_right']);
$image_item_swing_front = stripslashes($_POST['image_item_swing_front']);
$image_item_swing_back = stripslashes($_POST['image_item_swing_back']);
$image_item_swing_left = stripslashes($_POST['image_item_swing_left']);
$image_item_swing_right = stripslashes($_POST['image_item_swing_right']);

$image_filename = '';
$image_animated_filename = '';
$image_lifeform_front_filename = '';
$image_lifeform_back_filename = '';
$image_lifeform_left_filename = '';
$image_lifeform_right_filename = '';
$image_item_front_filename = '';
$image_item_back_filename = '';
$image_item_left_filename = '';
$image_item_right_filename = '';
$image_item_swing_front_filename = '';
$image_item_swing_back_filename = '';
$image_item_swing_left_filename = '';
$image_item_swing_right_filename = '';

// connect to db
$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

function saveSVG($slug, $svg) {
	$filename = $slug.'.svg';
    $svgfile = '../items/'.$filename;
	$currentfile = file_get_contents($svgfile);
	$currentfile = $svg;
	file_put_contents($svgfile, $currentfile);

	$cssfile = '../css/svg-items.css';
	$currentcss = file_get_contents($cssfile);
	$currentcss .= '.block-'.$slug.' { background-image:url('.$svgfile.');'.' }' . PHP_EOL;
	file_put_contents($cssfile, $currentcss);

	return $filename;
}

$image_filename = saveSVG($slug, $image);

if ($has_animation) {
	echo 'save animated';
	$image_animated_filename = saveSVG($slug.'_animated', $image_animated);
}
if ($is_lifeform) {
	echo 'save lifeform';
	$image_lifeform_front_filename = saveSVG($slug.'_lifeform_front', $image_lifeform_front);
	$image_lifeform_back_filename = saveSVG($slug.'_lifeform_back', $image_lifeform_back);
	$image_lifeform_left_filename = saveSVG($slug.'_lifeform_left', $image_lifeform_left);
	$image_lifeform_right_filename = saveSVG($slug.'_lifeform_right', $image_lifeform_right);
}
if ($is_equipable) {
	echo 'save item';
	$image_item_front_filename = saveSVG($slug.'_item_front', $image_item_front);
	$image_item_back_filename = saveSVG($slug.'_item_back', $image_item_back);
	$image_item_left_filename = saveSVG($slug.'_item_left', $image_item_left);
	$image_item_right_filename = saveSVG($slug.'_item_right', $image_item_right);
}
if ($is_useable) {
	echo 'save swing';
	$image_item_swing_front_filename = saveSVG($slug.'_item_swing_front', $image_item_swing_front);
	$image_item_swing_back_filename = saveSVG($slug.'_item_swing_back', $image_item_swing_back);
	$image_item_swing_left_filename = saveSVG($slug.'_item_swing_left', $image_item_swing_left);
	$image_item_swing_right_filename = saveSVG($slug.'_item_swing_right', $image_item_swing_right);
}


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
		is_useable,
		image_lifeform_front,
		image_lifeform_back,
		image_lifeform_left,
		image_lifeform_right,
		image_item_front,
		image_item_back,
		image_item_left,
		image_item_right,
		image_item_swing_front,
		image_item_swing_back,
		image_item_swing_left,
		image_item_swing_right
	) VALUES (
		'".$name."',
		'".$slug."',
		'".$image_filename."',
		'".$description."',
		'".$user."',
		'".$has_animation."',
		'".$image_animated_filename."',
		'".$is_craftable."',
		'".$is_collectable."',
		'".$is_cutable."',
		'".$is_edible."',
		'".$is_placeable."',
		'".$is_blocking."',
		'".$is_ingredient."',
		'".$is_lifeform."',
		'".$is_equipable."',
		'".$is_useable."',
		'".$image_lifeform_front_filename."',
		'".$image_lifeform_back_filename."',
		'".$image_lifeform_left_filename."',
		'".$image_lifeform_right_filename."',
		'".$image_item_front_filename."',
		'".$image_item_back_filename."',
		'".$image_item_left_filename."',
		'".$image_item_right_filename."',
		'".$image_item_swing_front_filename."',
		'".$image_item_swing_back_filename."',
		'".$image_item_swing_left_filename."',
		'".$image_item_swing_right_filename."'
	)"
) or die(mysql_error() );

echo 'after query';

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


/*
echo $result;
return $result;
*/

$mysqli->close();
ob_end_flush();
?>