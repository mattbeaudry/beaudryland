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
    background-color: #ddd;
    border: solid 2px #000;
    border-width: 3px 2px 2px 2px;
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
                        <input type="text" name="hexcode" placeholder="#000000" value="#000000">
                    </form>
                </section>

                <section>
                    <h2>Item Info</h2>
                    <form class="item-builder" action="php/createnewitem.php" method="post">
                        <ul>
                            <li>
                                <label for="name"></label>
                                <input type="text" name="name" placeholder="Item Name">
                            </li>
                            <li>
                                <label for="slug"></label>
                                <input type="text" name="slug" placeholder="item-slug">
                            </li>
                            <li>
                                <label for="recipe-1">Crafting Recipe:</label><br>
                                <select name="recipe-1">
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
                                <select name="recipe-2">
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
                                <select name="recipe-3">
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
                                    <input type="checkbox" name="properties" value="isplaceable"> Is Placeable<br>
                                    <input type="checkbox" name="properties" value="isingredient"> Is Ingredient<br>
                                    <input type="checkbox" name="properties" value="isequipable"> Is Equipable<br>
                                    <input type="checkbox" name="properties" value="iscollectable"> Is Collectable<br>
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
            </div>

		</div>
        
        <!--
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        -->
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-2.1.1.js"><\/script>')</script>
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
/*
$('.item-builder').submit(function(e) {
    createSVG();
    event.preventDefault();
});
*/

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

        //var x = (i%5) * 30;
        //var y = 0;
        pixels[i] = paper.rect(x, y, 30, 30);
        //pixels[i] = paper.rect(0, 0, 30, 30);
        pixels[i].attr("fill", color);
        pixels[i].attr("stroke", color);
    });

    //var rectangle1 = paper.rect(0, 0, 30, 30);
    //rectangle1.attr("fill", "#000");
    //rectangle1.attr("stroke", "#000");

};

</script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. 
        <script>
        	/*
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
            */
        </script>
        -->
    </body>
</html>
