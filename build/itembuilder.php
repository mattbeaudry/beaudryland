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

                    <h2>Tools</h2>

                    <?php include 'php/ui-colorpicker.php'; ?>

                    <div>
                        <nav class="pixelpainter-nav">
                            <ul>
                                <li><a href="#" class="button-reset">Reset</a></li>
                                <!-- <li><a href="#" class="button-preview">Preview</a></li> -->
                            </ul>
                        </nav>
                    </div>

                    <h2>Graphics</h2>

                    <div class="clearfix">
                        <fieldset class="canvas-frame canvas-image">
                            <label for="name">Main image</label>
                    		<?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image"></div>
                        </fieldset>

                        <div>
                            <label>
                                <input class="form-has_animation" type="checkbox" name="has_animation">
                                <span>has animation</span>
                            </label>
                        </div>

                        <fieldset class="canvas-frame canvas-image_animated">
                            <label for="name">Animated (Frame 2)</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image_animated"></div>
                        </fieldset>
                    </div>

                    <label>
                        <input class="form-is_lifeform" type="checkbox" name="is_lifeform" value="is_lifeform">
                        <span>is lifeform</span>
                    </label>

                    <div class="clearfix is_lifeform-images">
                        <fieldset class="canvas-frame canvas-image_lifeform_front">
                            <label for="name">Lifeform front</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image_lifeform_front"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-image_lifeform_back">
                            <label for="name">Lifeform back</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image_lifeform_back"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-image_lifeform_left">
                            <label for="name">Lifeform left</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image_lifeform_left"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-image_lifeform_right">
                            <label for="name">Lifeform right</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image_lifeform_right"></div>
                        </fieldset>
                    </div>

                    <label>
                        <input class="form-is_equipable" type="checkbox" name="is_equipable" value="is_equipable">
                        <span>is equipable</span>
                    </label>
                    
                    <div class="clearfix is_equipable-images">
                        <fieldset class="canvas-frame canvas-image_item_front">
                            <label for="name">Equipped item front</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image_item_front"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-image_item_back">
                            <label for="name">Equipped item back</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image_item_back"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-image_item_left">
                            <label for="name">Equipped item left</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image_item_left"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-image_item_right">
                            <label for="name">Equipped item right</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image_item_right"></div>
                        </fieldset>
                    </div>

                    <label>
                        <input class="form-is_useable" type="checkbox" name="is_useable" value="is_useable">
                        <span>is useable</span>
                    </label>

                    <div class="clearfix is_useable-images">
                        <fieldset class="canvas-frame canvas-image_item_swing_front">
                            <label for="name">Item swing front</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image_item_swing_front"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-image_item_swing_back">
                            <label for="name">Item swing back</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image_item_swing_back"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-image_item_swing_left">
                            <label for="name">Item swing left</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image_item_swing_left"></div>
                        </fieldset>
                        <fieldset class="canvas-frame canvas-image_item_swing_right">
                            <label for="name">Item swing right</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image_item_swing_right"></div>
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
                                    <input class="form-is_ground" type="checkbox" name="is_ground" value="is_ground">
                                    <span>is ground</span>
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input class="form-is_diggable" type="checkbox" name="is_diggable" value="is_diggable">
                                    <span>is diggable</span>
                                </label>
                            </li>
                            <li>
                                <input type="submit" class="bui-button create-image" value="Save Item">
                            </li>
                        </ul>
                    </form>

                </section>

            </div>

            <div>
                <section class="panel-bottom clearfix">
                    <h2>Items</h2>
                    
                    <table class="bl-table items-table">
                        <thead>
                            <tr>
                                <td>Image</td>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Recipe</td>
                                <td>Animated</td>
                                <td>Lifeform</td>
                                <td>Equipable</td>
                                <td>Useable</td>
                            </tr>
                        </thead>
                        <tbody>
                            <?php include 'php/loaditems.php'; ?>
                        </tbody>
                    </table>

                    <div class="block-palette clearfix">

                    </div>
                </section>
            </div>

		</div>
        
        <script src="js/vendor/jquery-2.1.1.js"></script>
        <script src="js/vendor/raphael-min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/app-bundle.js"></script>
    
        <script>

$('.canvas-pixel').on("click", function() { 
    var pixelID = $(this).attr("data-pixel");
    var colorCode = $('.bui-colorpicker .bui-colorpicker-input').val();
    // validate hex code
    $(this).css("background-color", colorCode);
    $(this).attr("data-color", colorCode);
    itemPreview();
});

$('.button-reset').on("click", function(){
    $('.canvas-pixel').css("background-color","transparent");
    $('.canvas-pixel').attr("data-color","transparent");
    itemPreview();
});

$('.item-builder').submit(function(e) {
    //itemPreview();
    var image = $('#image').html();
    var name = $('.item-builder .form-name').val();
    var slug = $('.item-builder .form-slug').val();
    var description = $('.item-builder .form-description').val();
    var user = $('.item-builder .form-user').val();
    var has_animation = Number($('.item-builder .form-has_animation').is(":checked"));
    var image_animated = $('#image_animated').html();
    var is_craftable = Number($('.item-builder .form-is_craftable').is(":checked"));
    var recipe1a = $('.item-builder .form-recipe-1a').val();
    var recipe1b = $('.item-builder .form-recipe-1b').val();
    var recipe1c = $('.item-builder .form-recipe-1c').val();
    var recipe = recipe1a+recipe1b+recipe1c;
    var is_collectable = Number($('.item-builder .form-is_collectable').is(":checked"));
    var is_cutable = Number($('.item-builder .form-is_cutable').is(":checked"));
    var is_edible = Number($('.item-builder .form-is_edible').is(":checked"));
    var is_placeable = Number($('.item-builder .form-is_placeable').is(":checked"));
    var is_blocking = Number($('.item-builder .form-is_blocking').is(":checked"));
    var is_ingredient = Number($('.item-builder .form-is_ingredient').is(":checked"));
    var is_ground = Number($('.item-builder .form-is_ground').is(":checked"));
    var is_diggable = Number($('.item-builder .form-is_diggable').is(":checked"));
    var is_lifeform = Number($('.item-builder .form-is_lifeform').is(":checked"));
    var is_equipable = Number($('.item-builder .form-is_equipable').is(":checked"));
    var is_useable = Number($('.item-builder .form-is_useable').is(":checked"));
    var image_lifeform_front = $('#image_lifeform_front').html();
    var image_lifeform_back = $('#image_lifeform_back').html();
    var image_lifeform_left = $('#image_lifeform_left').html();
    var image_lifeform_right = $('#image_lifeform_right').html();
    var image_item_front = $('#image_item_front').html();
    var image_item_back = $('#image_item_back').html();
    var image_item_left = $('#image_item_left').html();
    var image_item_right = $('#image_item_right').html();
    var image_item_swing_front = $('#image_item_swing_front').html();
    var image_item_swing_back = $('#image_item_swing_back').html();
    var image_item_swing_left = $('#image_item_swing_left').html();
    var image_item_swing_right = $('#image_item_swing_right').html();

    $.post('php/createnewitem.php', {
        image: image,
        name: name,
        slug: slug,
        description: description,
        user: user,
        has_animation: has_animation,
        image_animated: image_animated,
        is_craftable: is_craftable,
        recipe: recipe,
        is_collectable: is_collectable,
        is_cutable: is_cutable,
        is_edible: is_edible,
        is_placeable: is_placeable,
        is_blocking: is_blocking,
        is_ingredient: is_ingredient,
        is_ground: is_ground,
        is_diggable: is_diggable,
        is_lifeform: is_lifeform,
        is_equipable: is_equipable,
        is_useable: is_useable,
        image_lifeform_front: image_lifeform_front,
        image_lifeform_back: image_lifeform_back,
        image_lifeform_left: image_lifeform_left,
        image_lifeform_right: image_lifeform_right,
        image_item_front: image_item_front,
        image_item_back: image_item_back,
        image_item_left: image_item_left,
        image_item_right: image_item_right,
        image_item_swing_front: image_item_swing_front,
        image_item_swing_back: image_item_swing_back,
        image_item_swing_left: image_item_swing_left,
        image_item_swing_right: image_item_swing_right
    }, function(data) {
        console.log(data);
    });

    //location.reload();
    //header("location:itemcreator.php");
    event.preventDefault();
    location.reload();

});

var itemPreview = function() {
    createSVG();
};

var w = 30;
var h = 30;
var pixelwidth = w / 5;

var renderPreviewSVG = function(name, is_animated) {
    $('#'+name+' svg').remove();
    
    var previewSVG;
    var pixels = [];
    var x = 0;
    var y = 0;

    previewSVG = Raphael(document.getElementById(name));
    previewSVG.setViewBox(0, 0, w, h, true);
    previewSVG.canvas.setAttribute('preserveAspectRatio', 'none');


    $('.canvas-'+name+' .canvas-pixel').each(function(i) {
        var color = $(this).attr("data-color");
        if (i == 0) {
            x = 0;
            y = 0;
        } else {
            if (i%5 == 0){
                y = y + pixelwidth;
                x = 0;
            } else {
                x = (i%5) * pixelwidth;
            }
        }
        pixels[i] = previewSVG.rect(x, y, pixelwidth, pixelwidth);
        pixels[i].attr("fill", color);
        pixels[i].attr("stroke", color);
    });

    if (is_animated) {
        previewSVG.canvas.setAttribute("class","svg_animated");

        $('.canvas-image .canvas-pixel').each(function(i) {
            var color = $(this).attr("data-color");
            var offset = w;
            if (i == 0) {
                x = 0;
                y = 0;
            } else {
                if (i%5 == 0) {
                    y = y + pixelwidth;
                    x = 0;
                } else {
                    x = (i%5) * pixelwidth;
                }
            }
            pixels[i] = previewSVG.rect(x + 30, y, pixelwidth, pixelwidth);
            pixels[i].attr("fill", color);
            pixels[i].attr("stroke", color);
        });

        var style = '<style>';
        style += '@keyframes svgAnimate {';
        style += '0% { transform: translateX(0px); }';
        style += '50% { transform: translateX(-30px); }';
        style += '100% { transform: translateX(0px); }';
        style += '}';
        style += '.svg_animated rect {';
        style += 'animation: svgAnimate 2s steps(1) infinite;';
        style += '}';
        style += '</style>';
        $('#image_animated svg').append(style);
    }
}

var itemSVG;
var createSVG = function() {

    renderPreviewSVG("image", false);

    if (has_animation == true) { 
        renderPreviewSVG("image_animated", true); 
    }

    if (is_lifeform == true) {
        renderPreviewSVG("image_lifeform_front", false);
        renderPreviewSVG("image_lifeform_back", false);
        renderPreviewSVG("image_lifeform_left", false);
        renderPreviewSVG("image_lifeform_right", false);
    }

    if (is_equipable == true) {
        renderPreviewSVG("image_item_front", false);
        renderPreviewSVG("image_item_back", false);
        renderPreviewSVG("image_item_left", false);
        renderPreviewSVG("image_item_right", false);
    }

    if (is_useable == true) {
        renderPreviewSVG("image_item_swing_front", false);
        renderPreviewSVG("image_item_swing_back", false);
        renderPreviewSVG("image_item_swing_left", false);
        renderPreviewSVG("image_item_swing_right", false);
    }

};

var loadItemSelects = function() {
    $.post('php/loaditemsJSON.php', {}, function(data) {
        if (data == false) {
            console.log("failed gettins items json");
        } else {
            for (var i=0; i < data.length; i++) {
                $('.form-recipe-1a, .form-recipe-1b, .form-recipe-1c').append('<option value="'+data[i].slug+'">'+data[i].name+'</option>');
            }
        }   
    }, "json");
};

loadItemSelects();

var has_animation = '';
var is_craftable = '';
var is_lifeform = '';
var is_equipable = '';
var is_useable = '';

$('.form-has_animation').change(function() {
    if(this.checked) {
        has_animation = true;
        $('.canvas-image_animated').show();
    } else {
        has_animation = false;
        $('.canvas-image_animated').hide();
        $('.canvas-image_animated .svg-preview svg').remove();
    }
    itemPreview();
});

$('.form-is_craftable').change(function() {
    if(this.checked) {
        is_craftable = true;
        $('.is_craftable-recipe').show();
    } else {
        is_craftable = false;
        $('.is_craftable-recipe').hide();
    }
    itemPreview();
});

$('.form-is_lifeform').change(function() {
    if(this.checked) {
        is_lifeform = true;
        $('.is_lifeform-images').show();
    } else {
        is_lifeform = false;
        $('.is_lifeform-images').hide();
        $('.is_lifeform-images .svg-preview svg').remove();
    }
    itemPreview();
});

$('.form-is_equipable').change(function() {
    if(this.checked) {
        is_equipable = true;
        $('.is_equipable-images').show();
    } else {
        is_equipable = false;
        $('.is_equipable-images').hide();
        $('.is_equipable-images .svg-preview svg').remove();
    }
    itemPreview();
});

$('.form-is_useable').change(function() {
    if(this.checked) {
        is_useable = true;
        $('.is_useable-images').show();
    } else {
        is_craftable = false;
        $('.is_useable-images').hide();
        $('.is_useable-images .svg-preview svg').remove();
    }
    itemPreview();
});

var displaySlug = function() {

};

// display game blocks
var blocktypes = new Array (

    /*forest map*/  "grass", "dirt", "water", "tree", "rock", "hole",
    /*winter map*/  "snow", "frozendirt", "ice", "pinetree", "icerock", "snowhole",
    /*beach map*/   "sand", "wetsand", "wave", "palmtree", "sandstone", "sandhole",
    /*space map*/   "space", "star", "earth", "redgalaxy", "bluegalaxy", "sun",

    /*items*/       "shovel", "wood", "fire", "door", "door-open", "frisbee", "sign",
    /*furniture*/   "table","chair","chest","bed","toilet","sink","bathtub",
    /*weapons*/     "sword", "spear", "axe",
    /*instruments*/ "guitar", "piano","bassdrum","snare","hihat","cymbal","tom",
    /*technology*/  "telescope","computer","2dprinter",
    /*transport*/   "bike", "skiis", "canoe", "car", "rocket",

    /*treasure*/    "diamond", "gold", "silver", "oil", "clay",
    /*holes*/       "diamond-hole", "gold-hole", "silver-hole", "oil-hole", "clay-hole",
    /*blocks*/      "rockbrick", "icerockbrick", "sandstonebrick", "claybrick", "road",

    "appletree", "heart", "apple"
);
var blockhtml = ""; 
$.each(blocktypes, function(i, v) { 
    blockhtml += '<div class="block block-'+v+'" data-blocktype="'+v+'"></div>'; 
});

var objecttypes = new Array (
    "player-direction-up","player-direction-down","player-direction-left","player-direction-right",
    "player-direction-up-sword","player-direction-down-sword","player-direction-left-sword ","player-direction-right-sword",
    "player-direction-up-sword-swing","player-direction-down-sword-swing","player-direction-left-sword-swing","player-direction-right-sword-swing",
    "player-direction-up-shovel","player-direction-down-shovel","player-direction-left-shovel","player-direction-right-shovel",
    "player-direction-up-shovel-swing","player-direction-down-shovel-swing","player-direction-left-shovel-swing","player-direction-right-shovel-swing",
    "player-direction-up-axe","player-direction-down-axe","player-direction-left-axe","player-direction-right-axe",
    "player-direction-up-axe-swing","player-direction-down-axe-swing","player-direction-left-axe-swing","player-direction-right-axe-swing",
    "player-direction-up-bike","player-direction-down-bike","player-direction-left-bike","player-direction-right-bike",
    "player-direction-up-skiis","player-direction-down-skiis","player-direction-left-skiis","player-direction-right-skiis",
    "player-direction-up-canoe","player-direction-down-canoe","player-direction-left-canoe","player-direction-right-canoe",
    "player-direction-up-car","player-direction-down-car", "player-direction-left-car","player-direction-right-car",
    "player-direction-up-rocket","player-direction-down-rocket","player-direction-left-rocket","player-direction-right-rocket",
    "enemy-direction-up","enemy-direction-down","enemy-direction-left","enemy-direction-right",
    "deer-direction-up","deer-direction-down","deer-direction-left","deer-direction-right"
);
var blockhtml = "";
$.each(blocktypes, function(i, v) { 
    blockhtml += '<div class="block block-'+v+'" data-blocktype="'+v+'"></div>'; 
});
$.each(objecttypes, function(i, v) { 
    blockhtml += '<div class="block '+v+'" data-blocktype="'+v+'"></div>'; 
});

$('.block-palette').append(blockhtml);

        </script>

    </body>
</html>

<?php 
    $mysqli->close();
    ob_end_flush();
?>