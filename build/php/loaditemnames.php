<?php
include 'config.php';
ob_start();

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$result = $mysqli->query(
    "SELECT * FROM beaudryland_items ORDER BY itemid DESC"
) or die(mysql_error() );

$itemNames = ();

if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $name = $row['name'];
        $slug = $row['slug'];

        $itemNames +=
    }
}

echo json_encode(array());

?>



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