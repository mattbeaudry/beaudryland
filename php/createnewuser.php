<?php
include '../config.php';
ob_start();
session_start();

$newusername = $_POST['new_username'];
$newpassword = $_POST['new_password'];
$newemail = $_POST['new_email'];
$maptype = $_POST['maptype'];

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$newusername = stripslashes($newusername);
$newpassword = stripslashes($newpassword);
$newemail = stripslashes($newemail);

$result = $mysqli->query(
	"INSERT INTO beaudryland_users 
	(username,password,email) VALUES ('".$newusername."','".$newpassword."','".$newemail."')"
) or die(mysql_error() );

if($result){
	session_start();
	$_SESSION["username"] = $newusername;
	$url = "location:../beaudryland.php";
	if (isset($maptype)){ $url .= "?maptype=".$maptype; }
	header($url);
} else {
	//echo "Create new user function failed.";
	$url = "location:../index.php?error=registerfailed";
	header($url);
}

$mysqli->close();
ob_end_flush();
?>