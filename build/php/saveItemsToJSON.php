<?php
include '../config.php';
ob_start();

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$result = $mysqli->query(
    "SELECT * FROM beaudryland_items ORDER BY itemid ASC"
) or die(mysql_error() );

$items = array();

if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $items[] = array(
            'name' => $row['name'],
            'slug' => $row['slug'],
            'description' => $row['description'],
            'user' => $row['user'],

            'is_craftable' => $row['is_craftable'],
            'recipe' => $row['recipe'],

            'is_collectable' => $row['is_collectable'],
            'is_cutable' => $row['is_cutable'],
            'is_edible' => $row['is_edible'],
            'is_placeable' => $row['is_placeable'],
            'is_blocking' => $row['is_blocking'],
            'is_ingredient' => $row['is_ingredient'],
            'is_ground' => $row['is_ground'],
            'is_diggable' => $row['is_diggable'],
            'is_instrument' => $row['is_instrument'],

            'image' => $row['image'],
            'has_animation' => $row['has_animation'],
            'image_animated' => $row['image_animated'],

            'is_lifeform' => $row['is_lifeform'],
            'image_lifeform_front' => $row['image_lifeform_front'],
            'image_lifeform_back' => $row['image_lifeform_back'],
            'image_lifeform_left' => $row['image_lifeform_left'],
            'image_lifeform_right' => $row['image_lifeform_right'],

            'is_equipable' => $row['is_equipable'],
            'image_item_front' => $row['image_item_front'],
            'image_item_back' => $row['image_item_back'],
            'image_item_left' => $row['image_item_left'],
            'image_item_right' => $row['image_item_right'],

            'is_useable' => $row['is_useable'],
            'image_item_swing_front' => $row['image_item_swing_front'],
            'image_item_swing_back' => $row['image_item_swing_back'],
            'image_item_swing_left' => $row['image_item_swing_left'],
            'image_item_swing_right' => $row['image_item_swing_right']
            
        );
    }
}

$items_json = json_encode($items);

$fp = fopen('../json/items.json', 'w');
fwrite($fp, $items_json);
fclose($fp);

?>