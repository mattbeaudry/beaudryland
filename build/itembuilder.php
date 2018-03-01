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

                    <h2>Colors</h2>

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

                <section>
                    <h2>Art</h2>

                    <div class="clearfix">
                        <fieldset class="canvas-frame canvas-frame-1">
                            <label for="name">Image</label>
                    		<?php include 'php/part-canvas.php'; ?>
                        </fieldset>

                        <fieldset class="canvas-frame canvas-frame-2">
                            <label for="name">Animation frame</label>
                            <?php include 'php/part-canvas.php'; ?>
                        </fieldset>
                    </div>

                    <div>
                        <div class="svg-preview" id="itemsvg"></div>
                        <div class="svg-preview" id="itemsvg_animated"></div>

                        <nav class="pixelpainter-nav">
                            <ul>
                                <li><a href="#" class="button-reset">Reset</a></li>
                                <!-- <li><a href="#" class="button-preview">Preview</a></li> -->
                            </ul>
                        </nav>
                    </div>

                    <div class="clearfix is_lifeform-images">
                        <fieldset class="canvas-frame canvas-is_lifeform-front">
                            <label for="name">Lifeform front</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="itemsvg_lifeform_front"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-is_lifeform-back">
                            <label for="name">Lifeform back</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="itemsvg_lifeform_back"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-is_lifeform-left">
                            <label for="name">Lifeform left</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="itemsvg_lifeform_left"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-is_lifeform-right">
                            <label for="name">Lifeform right</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="itemsvg_lifeform_right"></div>
                        </fieldset>
                    </div>

                    <div class="clearfix is_equipable-images">
                        <fieldset class="canvas-frame canvas-is_equipable-front">
                            <label for="name">Equipped item front</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="itemsvg_lifeform_front"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-is_equipable-back">
                            <label for="name">Equipped item back</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="itemsvg_lifeform_back"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-is_equipable-left">
                            <label for="name">Equipped item left</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="itemsvg_lifeform_left"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-is_equipable-right">
                            <label for="name">Equipped item right</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="itemsvg_lifeform_right"></div>
                        </fieldset>
                    </div>

                    <div class="clearfix is_useable-images">
                        <fieldset class="canvas-frame canvas-is_useable-front">
                            <label for="name">Item swing front</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="itemsvg_lifeform_front"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-is_useable-back">
                            <label for="name">Item swing back</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="itemsvg_lifeform_back"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-is_useable-left">
                            <label for="name">Item swing left</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="itemsvg_lifeform_left"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-is_useable-right">
                            <label for="name">Item swing right</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="itemsvg_lifeform_right"></div>
                        </fieldset>
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
                                <label>
                                    <input class="form-has_animation" type="checkbox" name="has_animation">
                                    <span>has animation</span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input class="form-is_craftable" type="checkbox" name="is_craftable">
                                    <span>is craftable</span>
                                </label>
                            </li>
                            <li class="is_craftable-recipe">
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
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input class="form-is_equipable" type="checkbox" name="is_equipable" value="is_equipable">
                                    <span>is equipable</span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input class="form-is_useable" type="checkbox" name="is_useable" value="is_useable">
                                    <span>is useable</span>
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
                                    $svg = $row['image'];
                                    $infohtml = '';
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
    var image_animated = $('#itemsvg_animated').html();
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
        image_animated: image_animated,
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

////////////////////////////////
// create a function for make svg
// inputs: name, animated
////////////////////////////////

var renderPreviewSVG = function() {
    
}

var itemSVG;
var createSVG = function() {
    $('#itemsvg svg').remove();
    $('#itemsvg_animated svg').remove();

    var w = 30;
    var h = 30;
    var pixelwidth = w / 5;

    // create regular image

    itemSVG = Raphael(document.getElementById('itemsvg'));
    itemSVG.setViewBox(0, 0, w, h, true);
    itemSVG.canvas.setAttribute('preserveAspectRatio', 'none');

    var pixels = [];
    var x = 0;
    var y = 0;

    $('.canvas-frame-1 .canvas-pixel').each(function(i) {
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
        pixels[i] = itemSVG.rect(x, y, pixelwidth, pixelwidth);
        pixels[i].attr("fill", color);
        pixels[i].attr("stroke", "transparent");
    });

    // create animated svg image

    if (has_animation == true) {

        itemSVG_animated = Raphael(document.getElementById('itemsvg_animated'));
        itemSVG_animated.setViewBox(0, 0, w, h, true);
        itemSVG_animated.canvas.setAttribute('preserveAspectRatio', 'none');

        var pixels = [];
        var x = 0;
        var y = 0;

        $('.canvas-frame-1 .canvas-pixel').each(function(i) {
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
            pixels[i] = itemSVG_animated.rect(x, y, pixelwidth, pixelwidth);
            pixels[i].attr("fill", color);
            pixels[i].attr("stroke", "transparent");
        });

        $('.canvas-frame-2 .canvas-pixel').each(function(i) {
            var color = $(this).attr("data-color");
            //color = hexc(color);
            var offset = w;
            if (i == 0) {
                x = 0;
                y = 0;
            } else {
                if (i%5 == 0) {
                    //multiple of 5 or 0]
                    y = y + pixelwidth;
                    x = 0;
                } else {
                    x = (i%5) * pixelwidth;
                }
            }
            pixels[i] = itemSVG_animated.rect(x + 30, y, pixelwidth, pixelwidth);
            pixels[i].attr("fill", color);
            pixels[i].attr("stroke", "transparent");
        });

        var style = '<style>';
        style += '#itemsvg_animated svg rect {';
        style += 'animation: svgAnimate 2s steps(1) infinite;';
        style += '}';
        style += '</style>';

        $('#itemsvg_animated svg').append(style);
    }
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

var has_animation = '';

$('.form-has_animation').change(function() {
    if(this.checked) {
        has_animation = true;
        $('.canvas-frame-2').show();
    } else {
        has_animation = false;
        $('.canvas-frame-2').hide();
    }
    itemPreview();
});

var is_craftable = '';

$('.form-is_craftable').change(function() {
    if(this.checked) {
        is_craftable = true;
        $('.is_craftable-recipe').show();
    } else {
        is_craftable = false;
        $('.is_craftable-recipe').hide();
    }
});

var is_lifeform = '';

$('.form-is_lifeform').change(function() {
    if(this.checked) {
        is_craftable = true;
        $('.is_lifeform-images').show();
    } else {
        is_craftable = false;
        $('.is_lifeform-images').hide();
    }
});

var is_equipable = '';

$('.form-is_equipable').change(function() {
    if(this.checked) {
        is_equipable = true;
        $('.is_equipable-images').show();
    } else {
        is_equipable = false;
        $('.is_equipable-images').hide();
    }
});

var is_useable = '';

$('.form-is_useable').change(function() {
    if(this.checked) {
        is_useable = true;
        $('.is_useable-images').show();
    } else {
        is_craftable = false;
        $('.is_useable-images').hide();
    }
});

</script>



    </body>
</html>

<?php 
    $mysqli->close();
    ob_end_flush();
?>