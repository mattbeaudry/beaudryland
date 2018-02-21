<?php

    $mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
    if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

    if ( $result = $mysqli->query("SELECT * FROM beaudryland_items ORDER BY itemid DESC") ) {
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $name = $row['name'];
                $slug = $row['slug'];
                $recipe = $row['recipe'];
                $svg = $row['image'];
                $infohtml = '';
                //$infohtml += 'Slug: '.$slug.'<br>';
                //$infohtml += 'Recipe: '.$recipe.'<br>';
                $infohtml .= '<div class="svg-wrap">';
                $infohtml .= $svg;
                $infohtml .= '<br>'.$name;
                $infohtml .= '</div>';
                echo $infohtml;
            }
        }
    } else {
        mysql_error();
    }

?>