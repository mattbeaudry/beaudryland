<?php
    include 'config.php';
    ob_start();
    session_start();
?>

<?php include 'header.php'; ?>

    <body>
        
        <div class="container clearfix">

            <h1>Item Builder</h1>

            <div class="panel-left">

                <section>
                    <h2>Canvas</h2>

                    <nav class="pixelpainter-nav">
                        <ul>
                            <li><a href="#" class="button-reset">Reset</a></li>
                            <li><a href="#" class="button-preview">Preview</a></li>
                        </ul>
                    </nav>

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
                                <fieldset>
                                    <legend for="properties">Properties:</legend>
                                    <input class="form-property" type="checkbox" name="properties" value="isplaceable" checked> Is Placeable<br>
                                    <input class="form-property" type="checkbox" name="properties" value="isingredient"> Is Ingredient<br>
                                    <!--<input class="form-property" type="checkbox" name="properties" value="isequipable"> Is Equipable<br>-->
                                    <input class="form-property" type="checkbox" name="properties" value="iscollectable" checked> Is Collectable<br>
                                    <input class="form-property" type="checkbox" name="properties" value="iscollectable" checked> Is Craftable <em>(Recipe Below)</em><br>
                                
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
                                </fieldset>
                            </li>
                            <li>
                                <input type="submit" class="create-image" value="Save Item">
                            </li>
                        </ul>
                    </form>

                </section>
               
            </div>

            <div class="panel-right">

                <section>
                    <h2>Preview</h2>
                    <div id="itemsvg"></div>
                    <div id="itemsvg-large"></div>
                    <div class="iteminfo"></div>
                </section>

                 <section>

                    <h2>Save item</h2>

                    <form class="color-code">
                        <input class="form-color" type="text" name="hexcode" placeholder="#000000" value="#000000">
                    </form>

                    <div class="color-palette clearfix">
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
                        <span class="white"></span>
                        <span class="transparent"></span>
                    </div>
                </section>

            </div>

            <div >
                <section class="panel-bottom clearfix">
                    <h2>Item Gallery</h2>

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

$('.button-reset').on("click", function(){
    $('.canvas-pixel').css("background-color","transparent");
    $('.canvas-pixel').attr("data-color","transparent");
});

$('.button-preview').on("click", function(){
    itemPreview();
});

$('.color-palette span').on("click", function() {
    var color = $(this).css("background-color");
    $('.color-code .form-color').css("background-color", color);
    $('.color-code .form-color').val(color);
});

$('.item-builder').submit(function(e) {
    itemPreview();
    var svg = $('#itemsvg').html();
    //console.log(svg);
    var name = $('.item-builder .form-name').val();
    var slug = $('.item-builder .form-slug').val();
    var recipe1 = $('.item-builder .form-recipe-1').val();
    var recipe2 = $('.item-builder .form-recipe-2').val();
    var recipe3 = $('.item-builder .form-recipe-3').val();
    var recipe = recipe1+recipe2+recipe3;
    $.post('php/createnewitem.php', {name: name, slug: slug, recipe: recipe, image:svg}, function(data) {
        //console.log(svg);
    });
    location.reload();
    //header("location:spritepainter.php");
    event.preventDefault();
    location.reload();
});

$('.button-saveitem').on("click", function() {
    itemPreview();
    var svg = $('#itemsvg').html();
    //console.log(svg);
    var name = $('.item-builder .form-name').val();
    if (!name) { name = 'unnamed' }
    var slug = $('.item-builder .form-slug').val();
    var recipe1 = $('.item-builder .form-recipe-1').val();
    var recipe2 = $('.item-builder .form-recipe-2').val();
    var recipe3 = $('.item-builder .form-recipe-3').val();
    var recipe = recipe1+recipe2+recipe3;
    $.post('php/createnewitem.php', {name: name, slug: slug, recipe: recipe, image:svg}, function(data) {
        //console.log(svg);
    });
    location.reload();
    //header("location:spritepainter.php");
    event.preventDefault();
    location.reload();
});

var itemPreview = function() {
    createSVG();
    var name = $('.item-builder .form-name').val();
    var slug = $('.item-builder .form-slug').val();
    var recipe1 = $('.item-builder .form-recipe-1').val();
    var recipe2 = $('.item-builder .form-recipe-2').val();
    var recipe3 = $('.item-builder .form-recipe-3').val();
    var recipe = recipe1+recipe2+recipe3;
};

var paper;
var createSVG = function() {
    $('#itemsvg svg').remove();
    var w = 30;
    var h = 30;
    var pixelwidth = w / 5;
    //paper = Raphael(document.getElementById('itemsvg'), 30, 30);
    paper = Raphael(document.getElementById('itemsvg'));
    paper.setViewBox(0, 0, w, h, true);
    paper.canvas.setAttribute('preserveAspectRatio', 'none');
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
                y = y + pixelwidth;
                x = 0;
            } else {
                x = (i%5) * pixelwidth;
            }
        }
        pixels[i] = paper.rect(x, y, pixelwidth, pixelwidth);
        pixels[i].attr("fill", color);
        pixels[i].attr("stroke", "transparent");
    });
};



/*
var w = 600;
var h = 400;
var paper = Raphael("wrap");
paper.setViewBox(0,0,w,h,true);

// ok, raphael sets width/height even though a viewBox has been set, so let's rip out those attributes (yes, this will not work for VML)
var svg = document.querySelector("svg");
svg.removeAttribute("width");
svg.removeAttribute("height");


// draw some random vectors:
var path = "M " + w / 2 + " " + h / 2;
for (var i = 0; i < 100; i++){
    var x = Math.random() * w;
    var y = Math.random() * h;
    paper.circle(x,y,
                 Math.random() * 60 + 2).
                 attr("fill", "rgb("+Math.random() * 255+",0,0)").
                 attr("opacity", 0.5);
    path += "L " + x + " " + y + " ";
}
paper.path(path).attr("stroke","#ffffff").attr("stroke-opacity", 0.2);
paper.text(200,100,"Resize the window").attr("font","30px Arial").attr("fill","#ffffff");
*/

</script>



    </body>
</html>

<?php 
    $mysqli->close();
    ob_end_flush();
?>