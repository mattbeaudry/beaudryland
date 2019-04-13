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
        $itemid = $row['itemid'];
        $description = $row['description'];

        $infohtml .= '<tr>';
        $infohtml .= '<td>'.$itemid.'</td>';
        $infohtml .= '<td><div class="svg-wrap"><img src="items/'.$image.'"></div></td>';
        $infohtml .= '<td>'.$name.'</td>';
        $infohtml .= '<td>'.$description.'</td>';

        if ($row['is_craftable']) {
            $infohtml .= '<td><div id="recipe" class="svg-wrap">'.$row['recipe'].'</td>';
        } else {
            $infohtml .= '<td></td>';
        }

        // if ($row['has_animation']) {
        //     $infohtml .= '<td><div id="image_animated" class="svg-wrap"><img src="items/'.$row['image_animated'].'"></div></td>';
        // } else {
        //     $infohtml .= '<td></td>';
        // }

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

        // Properties
        $infohtml .= '<td>';
        if ($row['is_craftable']) { $infohtml .= 'is_craftable<br>'; }
        if ($row['is_collectable']) { $infohtml .= 'is_collectable<br>'; }
        if ($row['is_cutable']) { $infohtml .= 'is_cutable<br>'; }
        if ($row['is_edible']) { $infohtml .= 'is_edible<br>'; }
        if ($row['is_placeable']) { $infohtml .= 'is_placeable<br>'; }
        if ($row['is_blocking']) { $infohtml .= 'is_blocking<br>'; }
        if ($row['is_ingredient']) { $infohtml .= 'is_ingredient<br>'; }
        if ($row['is_ground']) { $infohtml .= 'is_ground<br>'; }
        if ($row['is_diggable']) { $infohtml .= 'is_diggable<br>'; }
        if ($row['is_lifeform']) { $infohtml .= 'is_lifeform<br>'; }
        if ($row['is_equipable']) { $infohtml .= 'is_equipable<br>'; }
        if ($row['is_useable']) { $infohtml .= 'is_useable<br>'; }
        $infohtml .= '</td>';

        $infohtml .= '</tr>';
    }
}

echo $infohtml;

?>