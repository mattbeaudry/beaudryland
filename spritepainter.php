<?php
include 'config.php';
ob_start();
session_start();
?>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        
        <meta name="description" content="">
        <!-- <meta name="viewport" content="width=device-width"> -->
        
        <link href="favicon.ico" rel="icon" type="image/x-icon" />
        <link rel="apple-touch-icon" href="apple-touch-icon-144x144-precomposed.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="apple-touch-icon-57x57-precomposed.png" />
		<link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-72x72-precomposed.png" />
		<link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-114x114-precomposed.png" />
		<link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-144x144-precomposed.png" />

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
<style>
.panel-left {
    float:left;
    width:50%;
    padding-right:20px;
}
.panel-right {
    float:left;
    width:50%;
    padding-left:20px;
}
.panel-bottom {
    float:left;
    width:100%;
}
.the-fucking-canvas {
    border:solid 2px #000;
    padding:10px;
    display:inline-block;
    width:180px;

}
.canvas-pixel {
    float:left;
    width:30px;
    height:30px;
    border:solid 2px #000;
    cursor:pointer;
    background-color:#fff;
}
.color-code {

}
.item-builder {

}
.item-builder ul {
    list-style:none;
    padding:0;
}
.item-builder li {
    margin-bottom:5px;
}
input[type="text"] {
    box-shadow:none;
    border:solid 2px #000;
    padding:5px 10px;
}
.create-image {
    color:#fff;
    background-color:#000;
    padding:5px 10px;
    border:none;
}
#itemsvg {
    width: 154px;
    height: 154px;
    border: solid 2px #000;
    background-color:#fff;
    border-width: 3px 2px 2px 2px;
}
.color-palette {
    margin:5px 0;
}
.color-palette span {
    display:inline-block;
    width:20px;
    height:20px;
    cursor:pointer;
}
.color-palette span:hover {
    border:dashed 2px #000;
}
.pine { background-color:#0b3607; }
.tree { background-color:#195513; }
.grass { background-color:#36ac2a; }

.hole { background-color:#1d1101; }
.trunk { background-color:#362001; }
.dirt { background-color:#6a4107; }
.wood { background-color:#916d33; }
.board { background-color:#c59f42; }
.sand { background-color:#d8cea0; }

.ocean { background-color:#068bd7; }
.water { background-color:#00a2ff; }
.diamond { background-color:#47d0f3; }
.ice { background-color:#d4f4fc; }
.snow { background-color:#f5fdff; }

.brick { background-color:#bd401a; }
.red { background-color:#d93b0a; }
.fire { background-color:#d94e03; }
.clay { background-color:#d7710d; }
.gold { background-color:#e6bb27; }

.black { background-color:#000000; }
.road { background-color:#313131; }
.rock { background-color:#606469; }
.silver { background-color:#cbcbcb; }

section {
    background-color:#efefef;
    padding:20px 20px 20px;
    margin-bottom:40px;
}
section h2 {
    margin-top:0px;
}

</style>

    </head>
    <body>
        
        <div class="container clearfix">

            <h1>Item Builder</h1>

            <div class="panel-left">
                <section>
                    <h2>Pixel Painter</h2>
            		<div class="the-fucking-canvas clearfix">
                        <div class="canvas-pixel" data-pixel="1" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="2" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="3" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="4" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="5" data-color="transparent"></div>

                        <div class="canvas-pixel" data-pixel="6" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="7" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="8" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="9" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="0" data-color="transparent"></div>

                        <div class="canvas-pixel" data-pixel="11" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="12" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="13" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="14" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="15" data-color="transparent"></div>

                        <div class="canvas-pixel" data-pixel="16" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="17" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="18" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="19" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="20" data-color="transparent"></div>

                        <div class="canvas-pixel" data-pixel="21" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="22" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="23" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="24" data-color="transparent"></div>
                        <div class="canvas-pixel" data-pixel="25" data-color="transparent"></div>
            		</div>
                </section>

                <section>
                    <h2>Color Selector</h2>
                    <form class="color-code">
                        <input class="form-color" type="text" name="hexcode" placeholder="#000000" value="#000000">
                    </form>
                    <div class="color-palette">
                        <span class="pine"></span>
                        <span class="tree"></span>
                        <span class="grass"></span>
                        <br>
                        <span class="hole"></span>
                        <span class="trunk"></span>
                        <span class="dirt"></span>
                        <span class="wood"></span>
                        <span class="board"></span>
                        <span class="sand"></span>
                        <br>
                        <span class="ocean"></span>
                        <span class="water"></span>
                        <span class="diamond"></span>
                        <span class="ice"></span>
                        <span class="snow"></span>
                        <br>
                        <span class="brick"></span>
                        <span class="red"></span>
                        <span class="fire"></span>
                        <span class="clay"></span>
                        <span class="gold"></span>
                        <br>
                        <span class="black"></span>
                        <span class="road"></span>
                        <span class="rock"></span>
                        <span class="silver"></span>
                    </div>
                </section>

                <section>
                    <h2>Item Info</h2>
                    <form class="item-builder" action="php/createnewitem.php" method="post">
                        <ul>
                            <li>
                                <label for="name"></label>
                                <input class="form-name" type="text" name="name" placeholder="Item Name">
                            </li>
                            <li>
                                <label for="slug"></label>
                                <input class="form-slug" type="text" name="slug" placeholder="item-slug">
                            </li>
                            <li>
                                <label>Crafting Recipe:</label><br>
                                <select class="form-recipe-1" name="recipe-1">
                                    <option value="tree">tree</option>
                                    <option value="rock">rock</option>
                                    <option value="pinetree">pinetree</option>
                                    <option value="icerock">icerock</option>
                                    <option value="palmtree">palmtree</option>
                                    <option value="wood">wood</option>
                                    <option value="fire">fire</option>
                                    <option value="diamond">diamond</option>
                                    <option value="gold">gold</option>
                                    <option value="silver">silver</option>
                                    <option value="oil">oil</option>
                                    <option value="clay">clay</option>
                                </select>
                                <select class="form-recipe-2" name="recipe-2">
                                    <option value="tree">tree</option>
                                    <option value="rock">rock</option>
                                    <option value="pinetree">pinetree</option>
                                    <option value="icerock">icerock</option>
                                    <option value="palmtree">palmtree</option>
                                    <option value="wood">wood</option>
                                    <option value="fire">fire</option>
                                    <option value="diamond">diamond</option>
                                    <option value="gold">gold</option>
                                    <option value="silver">silver</option>
                                    <option value="oil">oil</option>
                                    <option value="clay">clay</option>
                                </select>
                                <select class="form-recipe-3" name="recipe-3">
                                    <option value="tree">tree</option>
                                    <option value="rock">rock</option>
                                    <option value="pinetree">pinetree</option>
                                    <option value="icerock">icerock</option>
                                    <option value="palmtree">palmtree</option>
                                    <option value="wood">wood</option>
                                    <option value="fire">fire</option>
                                    <option value="diamond">diamond</option>
                                    <option value="gold">gold</option>
                                    <option value="silver">silver</option>
                                    <option value="oil">oil</option>
                                    <option value="clay">clay</option>
                                </select>
                            </li>
                            <li>
                                <fieldset>
                                    <legend for="properties">Properties:</legend>
                                    <input class="form-property" type="checkbox" name="properties" value="isplaceable"> Is Placeable<br>
                                    <input class="form-property" type="checkbox" name="properties" value="isingredient"> Is Ingredient<br>
                                    <input class="form-property" type="checkbox" name="properties" value="isequipable"> Is Equipable<br>
                                    <input class="form-property" type="checkbox" name="properties" value="iscollectable"> Is Collectable<br>
                                </fieldset>
                            </li>
                            <li>
                                <input type="submit" class="create-image" value="Generate Item">
                            </li>
                        </ul>
                    </form>
                </section>
            </div>

            <div class="panel-right">
                <section>
                    <h2>Generated Item</h2>
                    <div id="itemsvg"></div>
                </section>

                <section>
                    <h2>Items List</h2>


<?php

    $mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
    if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

    if ( $result = $mysqli->query("SELECT * FROM beaudryland_items") ) {
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $name = $row['name'];
                $slug = $row['slug'];
                $recipe = $row['recipe'];
                echo 'Name: '.$name.'<br>';
                echo 'Slug: '.$slug.'<br>';
                echo 'Recipe: '.$recipe;
                echo '<br><br>';
            }
        }
    } else {
        mysql_error();
    }

?>


                </section>
            </div>

		</div>
        
        <script src="js/vendor/jquery-2.1.1.js"></script>
        <script src="js/vendor/jquery.color.js"></script>
        <script src="js/vendor/raphael-min.js"></script>
        <script src="js/plugins.js"></script>
        <!--<script src="js/beaudryland.js"></script>-->
    
<script>

$('.canvas-pixel').on("click", function() {
    var pixelid = $(this).attr("data-pixel");
    var colorcode = $('.color-code input').val();
    // validate hex code
    $(this).css("background-color",colorcode);
    $(this).attr("data-color",colorcode);
});

$('.color-palette span').on("click", function() {
    var color = $(this).css("background-color");
    $('.color-code .form-color').css("background-color", color);
    $('.color-code .form-color').val(color);
});

$('.item-builder').submit(function(e) {
    createSVG();
    var name = $('.item-builder .form-name').val();
    var slug = $('.item-builder .form-slug').val();
    var recipe1 = $('.item-builder .form-recipe-1').val();
    var recipe2 = $('.item-builder .form-recipe-2').val();
    var recipe3 = $('.item-builder .form-recipe-3').val();
    var recipe = recipe1+recipe2+recipe3;
    $.post('php/createnewitem.php', {name: name, slug: slug, recipe: recipe}, function(data) {
        //alert("saved item");

    });
    event.preventDefault();
});

var paper;
var createSVG = function() {
    $('#itemsvg svg').remove();
    paper = Raphael(document.getElementById('itemsvg'), 150, 150);
    var pixels = [];
    var x = 0;
    var y = 0;
    $('.canvas-pixel').each(function(i) {
        var color = $(this).attr("data-color");
        //color = hexc(color);
        if (i == 0) {
            x = 0;
            y = 0;
        } else {
            if (i%5 == 0){
                //multiple of 5 or 0]
                y = y + 30;
                x = 0;
            } else {
                x = (i%5) * 30;
            }
        }
        pixels[i] = paper.rect(x, y, 30, 30);
        pixels[i].attr("fill", color);
        pixels[i].attr("stroke", color);
    });
};

</script>



    </body>
</html>

<?php 
    $mysqli->close();
    ob_end_flush();
?>