<?php
include 'config.php';
ob_start();

$mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

$result = $mysqli->query(
    "SELECT * FROM beaudryland_items ORDER BY itemid ASC"
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

            // ITEM INFO
            $infohtml .= '<td>'.$itemid.'</td>';
            $infohtml .= '<td><div class="svg-wrap"><img src="items/'.$image.'"></div></td>';
            $infohtml .= '<td>'.$name.'</td>';
            $infohtml .= '<td>'.$description.'</td>';

            // CRAFTING RECIPE
            if ($row['is_craftable']) {
                $infohtml .= '<td><div id="recipe" class="svg-wrap">'.$row['recipe'].'</td>';
            } else {
                $infohtml .= '<td></td>';
            }

            // ANIMATED
            // if ($row['has_animation']) {
            //     $infohtml .= '<td><div id="image_animated" class="svg-wrap"><img src="items/'.$row['image_animated'].'"></div></td>';
            // } else { $infohtml .= '<td></td>'; }
            
            // LIFEFORM MOVEMENT SPRITES
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
        
            // PLAYER HOLDING ITEM SPRITES
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

            // SWING ANIMATION SPRITES
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

            // PROPERTIES
            $infohtml .= '<td>';
            $infohtml .= '<select>';
                if ($row['is_craftable']) { $infohtml .= '<option>is_craftable</option>'; }
                if ($row['is_collectable']) { $infohtml .= '<option>is_collectable</option>'; }
                if ($row['is_cutable']) { $infohtml .= '<option>is_cutable</option>'; }
                if ($row['is_edible']) { $infohtml .= '<option>is_edible</option>'; }
                if ($row['is_placeable']) { $infohtml .= '<option>is_placeable</option>'; }
                if ($row['is_blocking']) { $infohtml .= '<option>is_blocking</option>'; }
                if ($row['is_ingredient']) { $infohtml .= '<option>is_ingredient</option>'; }
                if ($row['is_ground']) { $infohtml .= '<option>is_ground</option>'; }
                if ($row['is_diggable']) { $infohtml .= '<option>is_diggable</option>'; }
                if ($row['is_lifeform']) { $infohtml .= '<option>is_lifeform</option>'; }
                if ($row['is_equipable']) { $infohtml .= '<option>is_equipable</option>'; }
                if ($row['is_useable']) { $infohtml .= '<option>is_useable</option>'; }
            $infohtml .= '</select>';
            $infohtml .= '</td>';

        $infohtml .= '</tr>';
    }
}

echo $infohtml;

?>