<?php
    include 'config.php';
    ob_start();
    session_start();
?>

<?php include 'header.php'; ?>

    <body>
        
        <div class="container clearfix">

            <h1>Sprite Painter</h1>

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

                    <div id="itemsvg"></div>

                    <form class="item-builder" action="php/createnewitem.php" method="post">
                        <ul>
                            <li>
                                <label for="name">Name</label>
                                <input class="form-name" type="text" name="name" placeholder="My Item">
                            </li>
                            <li>
                                <input type="submit" class="create-image" value="Save Item">
                            </li>
                        </ul>
                    </form>

                </section>
               
            </div>

            <div class="panel-right">
                </section>

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
                        <span class="white"></span>
                        <span class="transparent"></span>
                    </div>
                </section>

            </div>

            <div >
                <section class="panel-bottom clearfix">
                    <h2>Sprite Gallery</h2>

                    <?php

                        $mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
                        if(mysqli_connect_errno()){ echo mysqli_connect_error(); }

                        if ( $result = $mysqli->query("SELECT * FROM beaudryland_sprites ORDER BY spriteid DESC") ) {
                            if($result->num_rows > 0) {
                                while($row = $result->fetch_assoc()) {
                                    $name = $row['name'];
                                    //$slug = $row['slug'];
                                    //$recipe = $row['recipe'];
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
    var svg = $('#itemsvg').html();
    var name = $('.item-builder .form-name').val();
    $.post('php/createnewsprite.php', {name: name, image:svg}, function(data) {
        //console.log(svg);
    });
    location.reload();
    event.preventDefault();
    location.reload();
    itemPreview();
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

</script>



    </body>
</html>

<?php 
    $mysqli->close();
    ob_end_flush();
?>