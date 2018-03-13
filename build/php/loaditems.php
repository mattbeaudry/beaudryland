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
        $image = $row['image'];
        $name = $row['name'];
        $slug = $row['slug'];
        $description = $row['description'];
        
        // $user = $row['user'];
        // $is_collectable = $row['is_collectable'];
        // $is_cutable = $row['is_cutable'];
        // $is_edible = $row['is_edible'];
        // $is_placeable = $row['is_placeable'];
        // $is_blocking = $row['is_blocking'];
        // $is_ingredient = $row['is_ingredient'];

        $infohtml .= '<tr>';
        $infohtml .= '<td><div class="svg-wrap"><img src="items/'.$image.'"></div></td>';
        $infohtml .= '<td>'.$name.'</td>';
        $infohtml .= '<td>'.$description.'</td>';

        if ($row['is_craftable']) {
            $infohtml .= '<td><div id="recipe" class="svg-wrap">'.$row['recipe'].'</td>';
        } else {
            $infohtml .= '<td></td>';
        }

        if ($row['has_animation']) {
            $infohtml .= '<td><div id="image_animated" class="svg-wrap"><img src="items/'.$row['image_animated'].'"></div></td>';
        } else {
            $infohtml .= '<td></td>';
        }

        if ($row['is_lifeform']) {
            $infohtml .= '<td>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$row['image_lifeform_front'].'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$row['image_lifeform_back'].'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$row['image_lifeform_left'].'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$row['image_lifeform_right'].'"></div>';
            $infohtml .= '</td>';
        } else {
            $infohtml .= '<td></td>';
        }

        if ($row['is_equipable']) {
            $infohtml .= '<td>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$row['image_item_front'].'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$row['image_item_back'].'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$row['image_item_left'].'"></div>';
            $infohtml .= '<div class="svg-wrap"><img src="items/'.$row['image_item_right'].'"></div>';
            $infohtml .= '</td>';
        } else {
            $infohtml .= '<td></td>';
        }

        if ($row['is_useable']) {
            $infohtml .= '<td>';
                $infohtml .= '<div class="svg-wrap"><img src="items/'.$row['image_item_swing_front'].'"></div>';
                $infohtml .= '<div class="svg-wrap"><img src="items/'.$row['image_item_swing_back'].'"></div>';
                $infohtml .= '<div class="svg-wrap"><img src="items/'.$row['image_item_swing_left'].'"></div>';
                $infohtml .= '<div class="svg-wrap"><img src="items/'.$row['image_item_swing_right'].'"></div>';
            $infohtml .= '</td>';
        } else {
            $infohtml .= '<td></td>';
        }

        $infohtml .= '</tr>';
    }
}

echo $infohtml;

?>