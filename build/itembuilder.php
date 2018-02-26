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

                    <fieldset>
                        <label for="name">Image</label>
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
                    <fieldset>

                    <div id="itemsvg"></div>
                    <div class="iteminfo"></div>

                    <nav class="pixelpainter-nav">
                        <ul>
                            <li><a href="#" class="button-reset">Reset</a></li>
                            <!-- <li><a href="#" class="button-preview">Preview</a></li> -->
                        </ul>
                    </nav>

                    <section>

                    <h2>Tools</h2>

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
                        <span clas s="white"></span>
                        <span class="transparent"></span>
                    </div>

                    <div class="color-palette clearfix">
                        <span class="c-ground-grass"></span>
                        <span class="c-ground-space"></span>
                        <span class="c-ground-snow"></span>
                        <span class="c-ground-water"></span>
                        <span class="c-ground-sand"></span>
                        <span class="c-ground-dirt"></span>
                        <span class="c-ground-ice"></span>
                    </div>

                    <div class="color-palette clearfix">
                        <span class="c-green-1"></span>
                        <span class="c-green-2"></span>
                        <span class="c-green-3"></span>
                        <span class="c-green-4"></span>
                        <span class="c-green-5"></span>
                        <span class="c-green-6"></span>
                        <br>
                        <span class="c-brown-1"></span>
                        <span class="c-brown-2"></span>
                        <span class="c-brown-3"></span>
                        <span class="c-brown-4"></span>
                        <span class="c-brown-5"></span>
                        <span class="c-brown-6"></span>
                        <br>
                        <span class="c-blue-1"></span>
                        <span class="c-blue-2"></span>
                        <span class="c-blue-3"></span>
                        <span class="c-blue-4"></span>
                        <span class="c-blue-5"></span>
                        <span class="c-blue-6"></span>
                        <br>
                        <span class="c-red-1"></span>
                        <span class="c-red-2"></span>
                        <span class="c-red-3"></span>
                        <span class="c-orange-1"></span>
                        <span class="c-orange-2"></span>
                        <span class="c-orange-3"></span>
                        <br>
                        <span class="c-yellow-1"></span>
                        <span class="c-yellow-2"></span>
                        <span class="c-yellow-3"></span>
                        <span class="c-yellow-4"></span>
                        <span class="c-yellow-5"></span>
                        <span class="c-yellow-6"></span>
                        <br>
                        <span class="c-purple-1"></span>
                        <span class="c-purple-2"></span>
                        <span class="c-purple-3"></span>
                        <span class="c-pink-1"></span>
                        <span class="c-peach-1"></span>
                        <span class="c-peach-2"></span>
                        <br>
                        <span class="c-black-1"></span>
                        <span class="c-grey-1"></span>
                        <span class="c-grey-2"></span>
                        <span class="c-grey-3"></span>
                        <span class="c-grey-4"></span>
                        <span class="c-white-1"></span>
                        <br>
                    </div>

                </section>
               
            </div> 

            <div class="panel-right">

                <section>

                    <h2>Propeties</h2>

                    <form class="item-builder" action="php/createnewitem.php" method="post">
                        <ul>
                            <li>
                                <label for="name">name</label>
                                <input class="form-name" type="text" name="name" placeholder="My Item" required>
                            </li>
                            <li>
                                <label for="slug">slug</label>
                                <input class="form-slug" type="text" name="slug" placeholder="my-item" required>
                            </li>
                            <li>
                                <label for="description">description</label>
                                <input class="form-description" type="text" name="description" placeholder="item-description">
                            </li>
                            <li>
                                <label for="user">user</label>
                                <input class="form-user" type="text" name="user" placeholder="beaudryland" value="beaudryland">
                            </li>
                            <li>
                                <label for="has_animation">
                                    <input class="form-has_animation" type="checkbox" name="has_animation">
                                    <span>has animation</span>
                                </label>
                            </li>
                            <!-- insert animation image upload - ask for animated gif upload? animnated svg? -->
                            <li>
                                <label for="is_craftable">
                                    <input class="form-is_craftable" type="checkbox" name="is_craftable">
                                    <span>is craftable</span>
                                </label>
                            </li>
                            <li>
                                <fieldset>
                                    <legend for="recipe-1">recipe #1:</legend>
                                    <label>
                                        <select class="form-recipe-1a" name="recipe-1a">
                                            <option value="null">Choose...</option>
                                        </select>
                                        <select class="form-recipe-1b" name="recipe-1b">
                                            <option value="null">Choose...</option>
                                        </select>
                                        <select class="form-recipe-1c" name="recipe-1c">
                                            <option value="null">Choose...</option>
                                        </select>
                                    </label>
                                    <legend for="recipe-2">recipe #2:</legend>
                                    <label>
                                        <select class="form-recipe-2a" name="recipe-2a">
                                            <option value="null">Choose...</option>
                                        </select>
                                        <select class="form-recipe-2b" name="recipe-2b">
                                            <option value="null">Choose...</option>
                                        </select>
                                        <select class="form-recipe-2c" name="recipe-2c">
                                            <option value="null">Choose...</option>
                                        </select>
                                    </label>
                                    <legend for="recipe-3">recipe #3:</legend>
                                    <label>
                                        <select class="form-recipe-3a" name="recipe-3a">
                                            <option value="null">Choose...</option>
                                            <option value="tree">tree</option>
                                            <option value="rock">rock</option>
                                        </select>
                                        <select class="form-recipe-3b" name="recipe-3b">
                                            <option value="null">Choose...</option>
                                            <option value="tree">tree</option>
                                            <option value="rock">rock</option>
                                        </select>
                                        <select class="form-recipe-3c" name="recipe-3c">
                                            <option value="null">Choose...</option>
                                            <option value="tree">tree</option>
                                            <option value="rock">rock</option>
                                        </select>
                                    </label>
                                </fieldset>
                            </li>
                            <li>
                                <label>
                                    <input class="form-is_collectable" type="checkbox" name="is_collectable" value="is_collectable" checked>
                                    <span>is collectable</span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input class="form-is_cutable" type="checkbox" name="is_cutable" value="is_cutable" checked> 
                                    <span>is cutable</span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input class="form-is_edible" type="checkbox" name="is_edible" value="is_edible"> 
                                    <span>is edible</span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input class="form-is_placeable" type="checkbox" name="is_placeable" value="is_placeable" checked> 
                                    <span>is placeable</span>
                                </label>
                            </li>
                            
                            <li>
                                <label>
                                    <input class="form-is_blocking" type="checkbox" name="is_blocking" value="is_blocking" checked> 
                                    <span>is blocking</span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input class="form-is_ingredient" type="checkbox" name="is_ingredient" value="is_ingredient">
                                    <span>is ingredient</span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input class="form-is_lifeform" type="checkbox" name="is_lifeform" value="is_lifeform"> 
                                    <span>is lifeform</span>
                                    <!--
                                        lifeform front
                                        lifeform back
                                        lifeform left
                                        lifeform right
                                    -->
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input class="form-is_equipable" type="checkbox" name="is_equipable" value="is_equipable">
                                    <span>is equipable</span>
                                    <!--
                                        player + item image front
                                        player + item image back
                                        player + item image left
                                        player + item image right
                                    -->
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input class="form-is_useable" type="checkbox" name="is_useable" value="is_useable">
                                    <span>is useable</span>
                                    <!--
                                        player + item image front
                                        player + item image back
                                        player + item image left
                                        player + item image right
                                    -->
                                </label>
                            </li>
        
                            <li>
                                <input type="submit" class="create-image" value="Save Item">
                            </li>
                        </ul>
                    </form>

                </section>

            </div>

            <div >
                <section class="panel-bottom clearfix">
                    <h2>Items</h2>

                    <?php

                        $mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
                        if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

                        if ( $result = $mysqli->query("SELECT * FROM beaudryland_items ORDER BY itemid DESC") ) {
                            if($result->num_rows > 0) {
                                while($row = $result->fetch_assoc()) {
                                    $name = $row['name'];
                                    $slug = $row['slug'];
                                    //$recipe = $row['recipes'];
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
        <script src="js/vendor/raphael-min.js"></script>
        <script src="js/plugins.js"></script>
    
<script>

$('.canvas-pixel').on("click", function() { 
    var pixelid = $(this).attr("data-pixel");
    var colorcode = $('.color-code input').val();
    // validate hex code
    $(this).css("background-color",colorcode);
    $(this).attr("data-color",colorcode);
    itemPreview();
});

$('.button-reset').on("click", function(){
    $('.canvas-pixel').css("background-color","transparent");
    $('.canvas-pixel').attr("data-color","transparent");
    itemPreview();
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
    var image = $('#itemsvg').html();
    var name = $('.item-builder .form-name').val();
    var slug = $('.item-builder .form-slug').val();
    var description = $('.item-builder .form-description').val();
    var user = $('.item-builder .form-user').val();
    var has_animation = Number($('.item-builder .form-has_animation').is(":checked"));
    var is_craftable = Number($('.item-builder .form-is_craftable').is(":checked"));
    //var recipe1a = $('.item-builder .form-recipe-1a').val();
    //var recipe1b = $('.item-builder .form-recipe-1b').val();
    //var recipe1c = $('.item-builder .form-recipe-1c').val();
    //var recipes = recipe1a+recipe1b+recipe1c;
    var is_collectable = Number($('.item-builder .form-is_collectable').is(":checked"));
    var is_cutable = Number($('.item-builder .form-is_cutable').is(":checked"));
    var is_edible = Number($('.item-builder .form-is_edible').is(":checked"));
    var is_placeable = Number($('.item-builder .form-is_placeable').is(":checked"));
    var is_blocking = Number($('.item-builder .form-is_blocking').is(":checked"));
    var is_ingredient = Number($('.item-builder .form-is_ingredient').is(":checked"));
    var is_lifeform = Number($('.item-builder .form-is_lifeform').is(":checked"));
    var is_equipable = Number($('.item-builder .form-is_equipable').is(":checked"));
    var is_useable = Number($('.item-builder .form-is_useable').is(":checked"));

    $.post('php/createnewitem.php', {
        image: image,
        name: name,
        slug: slug,
        description: description,
        user: user,
        has_animation: has_animation,
        is_craftable: is_craftable,
        // recipes: recipes,
        is_collectable: is_collectable,
        is_cutable: is_cutable,
        is_edible: is_edible,
        is_placeable: is_placeable,
        is_blocking: is_blocking,
        is_ingredient: is_ingredient,
        is_lifeform: is_lifeform,
        is_equipable: is_equipable,
        is_useable: is_useable
    }, function(data) {
        //console.log(svg);
    });
    location.reload();
    //header("location:itemcreator.php");
    event.preventDefault();
    location.reload();
});

var itemPreview = function() {
    createSVG();
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

var loadItemSelects = function() {
    $.post('php/loaditemsJSON.php', {}, function(data) {
        if (data == false) {
            console.log("failed gettins items json");
        } else {
            for (var i=0; i < data.length; i++) {
                $('.form-recipe-1a, .form-recipe-1b, .form-recipe-1c, .form-recipe-2a, .form-recipe-2b, .form-recipe-2c, .form-recipe-3a, .form-recipe-3b, .form-recipe-3c').append('<option value="'+data[i].slug+'">'+data[i].name+'</option>');
            }
        }   
    }, "json");

};

loadItemSelects();

</script>



    </body>
</html>

<?php 
    $mysqli->close();
    ob_end_flush();
?>