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
        $svg = $row['image'];

        $infohtml .= '<tr>';

        $infohtml .= '<td>'.$name.'</td>';

        $infohtml .= '<td>';
        $infohtml .= '<div class="svg-wrap" title="'.$name.'">';
        $infohtml .= $svg;
        $infohtml .= '</div>';
        $infohtml .= '</td>';

        $infohtml .= '<td>';
        $infohtml .= '<div class="item-recipe-wrap" title="'.$name.'">';
        $infohtml .= '<img src="img/block-tree.png" title="Tree">';
        $infohtml .= '<img src="img/block-tree.png" title="Tree">';
        $infohtml .= '<img src="img/block-tree.png" title="Tree">';
        $infohtml .= '</div>';
        $infohtml .= '</td>';

        $infohtml .= '<td>';
        $infohtml .= '<ul>';
        $infohtml .= '<li>- does a thing</li>';
        $infohtml .= '<li>- does a thing</li>';
        $infohtml .= '</ul>';
        $infohtml .= '</td>';

        $infohtml .= '</tr>';
    }
}

echo $infohtml;

?>