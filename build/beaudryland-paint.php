<?php
    include 'config.php';
    ob_start();
    session_start();
?>

<?php include 'header.php'; ?>

<body class="page-spritepainter">
    <div class="container clearfix">
        <h1>Beaudryland Paint</h1>
        <div class="panel-left">
            <section>
                <h2>Tools</h2>

                <?php include 'php/ui-colorpicker.php'; ?>

                <h2>Canvas</h2>
                
                <div>
                    <fieldset class="canvas-frame canvas-sprite">
                        <label for="name">Main image</label>
                        <?php include 'php/part-canvas.php'; ?>
                    </fieldset>
                </div>
                <nav class="pixelpainter-nav">
                    <a href="#" class="button-reset">Reset</a>
                </nav>
            </section>
        </div>

        <div class="panel-right">
                <section>
                <h2>Info</h2>
                <div class="svg-preview" id="sprite"></div>
                <form class="sprite-painter">
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
                                $svg = $row['image'];
                                $infohtml = '';
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
console.log("sprite painer");

$('.canvas-sprite .canvas-pixel').on("click", function() { 
    var pixelID = $(this).attr("data-pixel");
    var colorCode = $('.bui-colorpicker .bui-colorpicker-input').val();
    // validate hex code
    $(this).css("background-color", colorCode);
    $(this).attr("data-color", colorCode);
    spritePreview();
});

$('.pixelpainter-nav .button-reset').on("click", function(){
    $('.canvas-sprite .canvas-pixel').css("background-color","transparent");
    $('.canvas-sprite .canvas-pixel').attr("data-color","transparent");
    spritePreview();
});

$('.sprite-painter').submit(function(e) {
    spritePreview();
    var svg = $('#sprite').html();
    var name = $('.sprite-painter .form-name').val();
    $.post('php/createnewsprite.php', { name: name, image:svg });
    event.preventDefault();
    spritePreview();
    setTimeout(() => {
        location.reload();
    }, 100);
});

var spritePreview = function() {
    createSpriteSVG();
};

var paper;
var createSpriteSVG = function() {
    $('#sprite svg').remove();
    var w = 20;
    var h = 20;
    var pixelwidth = 4;
    paper = Raphael(document.getElementById('sprite'));
    paper.setViewBox(0, 0, w, h, true);
    //paper.canvas.setAttribute('preserveAspectRatio', 'none');
    var pixels = [];
    var x = 0;
    var y = 0;
    $('.canvas-sprite .canvas-pixel').each(function(i) {
        var color = $(this).attr("data-color");
        if (i == 0) {
            x = 0;
            y = 0;
        } else {
            if (i % 5 == 0){
                y = y + pixelwidth;
                x = 0;
            } else {
                x = (i % 5) * pixelwidth;
            }
        }
        pixels[i] = paper.rect(x, y, pixelwidth, pixelwidth);
        pixels[i].attr("fill", color);
        pixels[i].attr("stroke", color);
        pixels[i].attr("stroke-width", '0');
    });
};
</script>

</body>
</html>

<?php 
    $mysqli->close();
    ob_end_flush();
?>