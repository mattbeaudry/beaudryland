<?php
include '../config.php';
ob_start();

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$result = $mysqli->query(
    "SELECT * FROM beaudryland_items ORDER BY itemid DESC"
) or die(mysql_error() );

$items = array();

if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $name = $row['name'];
        $slug = $row['slug'];
        $items[] = array(
            'name' => $name,
            'slug' => $slug
        );
    }
}

echo json_encode($items);

?>