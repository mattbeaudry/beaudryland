<?php
include '../config.php';
ob_start();
session_start();
$username = $_SESSION['username'];
$inventory = $_POST['inventory'];
$playerdiv = $_POST['playerdiv'];
$selecteditem = $_POST['selecteditem'];
$signs = $_POST['signs'];
$achievements = $_POST['achievements'];

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$result = $mysqli->query(
	"INSERT INTO beaudryland_users 
	(username,inventory,playerdiv,selecteditem,signs,achievements) VALUES ('".$username."','".$inventory."','".$playerdiv."','".$selecteditem."','".$signs."','".$achievements."')"
) or die(mysql_error() );

return $result;

$mysqli->close();
ob_end_flush();
?>