<?php
include 'config.php';
ob_start();

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$result = $mysqli->query(
    "SELECT * FROM beaudryland_items ORDER BY itemid DESC"
) or die(mysql_error() );

$infohtml = '';

if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $name = $row['name'];
        $slug = $row['slug'];
        $image = $row['image'];
        // has_animation
        $image_animated = $row['image_animated'];
        //$recipe = $row['recipe'];
        $description = $row['description'];
        
        // is lifeform
        $image_lifeform_front = $row['image_lifeform_front'];
        $image_lifeform_back = $row['image_lifeform_back'];
        $image_lifeform_left = $row['image_lifeform_left'];
        $image_lifeform_right = $row['image_lifeform_right'];

        // is equipable
        $image_item_front = $row['image_item_front'];
        $image_item_back = $row['image_item_back'];
        $image_item_left = $row['image_item_left'];
        $image_item_right = $row['image_item_right'];

        // is useable
        $image_item_swing_front = $row['image_item_swing_front'];
        $image_item_swing_back = $row['image_item_swing_back'];
        $image_item_swing_left = $row['image_item_swing_left'];
        $image_item_swing_right = $row['image_item_swing_right'];

        $infohtml .= '<tr>';

        $infohtml .= '<td>'.$name.'</td>';
        $infohtml .= '<td><div class="svg-wrap"><img src="items/'.$image.'"></div></td>';
        $infohtml .= '<td><div id="image_animated" class="svg-wrap"><img src="items/'.$image_animated.'"></div></td>';
        $infohtml .= '<td></td>';
        $infohtml .= '<td>'.$description.'</td>';
        $infohtml .= '<td>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$image_lifeform_front.'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$image_lifeform_back.'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$image_lifeform_left.'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$image_lifeform_right.'"></div>';
        $infohtml .= '</td>';
        $infohtml .= '<td>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$image_item_front.'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$image_item_back.'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$image_item_left.'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$image_item_right.'"></div>';
        $infohtml .= '</td>';
        $infohtml .= '<td>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$image_item_swing_front.'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$image_item_swing_back.'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$image_item_swing_left.'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$image_item_swing_right.'"></div>';
        $infohtml .= '</td>';

        //$infohtml .= '<td>'.$properties.'</td>';

        $infohtml .= '</tr>';
    }
}

echo $infohtml;

?>