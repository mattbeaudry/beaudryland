<?php
include '../config.php';
ob_start();
session_start();

$newusername = $_POST['new_username'];
$newpassword = $_POST['new_password'];
$newemail = $_POST['new_email'];

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
	header("location:../beaudryland.php");
} else {
	//echo "Create new user function failed.";
	header("location:../index.php?error=registerfailed");
}

$mysqli->close();
ob_end_flush();
?>