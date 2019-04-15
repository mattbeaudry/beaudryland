<?php
    include 'config.php';
    ob_start();
    session_start();
?>

<?php include 'header.php'; ?>

    <body>
        
        <div class="container clearfix">

            <h1>Beaudryland Paint</h1>

            <div class="panel-left">

                <section>
                    <h2>Canvas</h2>

                    <nav class="pixelpainter-nav">
                        <ul>
                            <li><a href="#" class="button-reset">Reset</a></li>
                        </ul>
                    </nav>
                    
                    <div>
                		<fieldset class="canvas-frame canvas-image">
                            <label for="name">Main image</label>
                            <?php include 'php/part-canvas.php'; ?>
                            <br>
                            <div class="svg-preview" id="image"></div>
                        </fieldset>
                    </div>

                    <form class="item-builder" action="php/createnewitem.php" method="post">
                        <ul>
                            <li>
                                <label for="name">Name</label>
                                <input class="form-name" type="text" name="name" placeholder="My Item">
                            </li>
                            <li>
                                <input type="submit" class="create-image" value="Save">
                            </li>
                        </ul>
                    </form>

                </section>
               
            </div>

            <div class="panel-right">
                 <section>
                    <h2>Color</h2>
                    <?php include 'php/ui-colorpicker.php'; ?>
                </section>
            </div>

            <div>
                <section class="panel-bottom clearfix">
                    <h2>Sprite Gallery</h2>

                    <?php
                        $mysqli = new mysqli($host, $sqlusername, $sqlpassword, $db_name);
                        if (mysqli_connect_errno()) { echo mysqli_connect_error(); }
                        if ($result = $mysqli->query("SELECT * FROM beaudryland_sprites ORDER BY spriteid DESC")) {
                            if($result->num_rows > 0) {
                                while($row = $result->fetch_assoc()) {
                                    $name = $row['name'];
                                    //$slug = $row['slug'];
                                    //$recipe = $row['recipe'];
                                    $svg = $row['image'];
                                    $infohtml = '';
                                    //$infohtml += 'Slug: '.$slug.'<br>';
                                    //$infohtml += 'Recipe: '.$recipe.'<br>';
                                    $infohtml .= '<div class="svg-wrap" style="display: inline-block; margin: 0 16px 16px 0;">';
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
    itemPreview();
    var svg = $('#image').html();
    var name = $('.item-builder .form-name').val();
    $.post('php/createnewsprite.php', {name: name, image:svg}, function(data) {
        //// console.log(svg);
    });
    location.reload();
    event.preventDefault();
    location.reload();
    itemPreview();
});

var itemPreview = function() {
    createSVG();
};

var paper;
var createSVG = function() {
    $('#image svg').remove();
    var w = 30;
    var h = 30;
    var pixelwidth = w / 5;
    //paper = Raphael(document.getElementById('itemsvg'), 30, 30);
    paper = Raphael(document.getElementById('image'));
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