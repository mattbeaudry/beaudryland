<?php
include '../config.php';
ob_start();
session_start();
$username = $_SESSION['username'];   

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$result = $mysqli->query(
	"SELECT * FROM beaudryland_users 
	WHERE username LIKE '".$username."' 
	ORDER BY userid 
	DESC 
	LIMIT 1"
) or die(mysql_error() );

if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$inventory = $row['inventory'];
		$playerdiv = $row['playerdiv'];
		$selecteditem = $row['selecteditem'];
		$signs = $row['signs'];
		$achievements = $row['achievements'];
	}
}

//$playerdata = array("inventory" => $inventory, "playerdiv" => $playerdiv, "selecteditem" => $selecteditem);
$playerdata = array("inventory" => $inventory, "playerdiv" => $playerdiv, "selecteditem" => $selecteditem, "signs" => $signs, "achievements" => $achievements);
echo json_encode(array("inventory" => $inventory, "playerdiv" => $playerdiv, "selecteditem" => $selecteditem, "signs" => $signs, "achievements" => $achievements));
//echo json_encode($playerdata);
//echo $inventory;
//echo $playerdata;

$mysqli->close();
ob_end_flush();
?>