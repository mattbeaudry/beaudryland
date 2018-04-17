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
        <title>Beaudryland Map Editor</title>
        
        <meta name="description" content="">
        <!-- <meta name="viewport" content="width=device-width"> -->
        
        <link href="favicon.ico" rel="icon" type="image/x-icon" />
        <link rel="apple-touch-icon" href="apple-touch-icon-144x144-precomposed.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="apple-touch-icon-57x57-precomposed.png" />
		<link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-72x72-precomposed.png" />
		<link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-114x114-precomposed.png" />
		<link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-144x144-precomposed.png" />

        <link rel="stylesheet" href="css/normalize.css">

        <link rel="stylesheet" href="css/blocks.css">
        <link rel="stylesheet" href="css/svg-items.css">
        <link rel="stylesheet" href="css/main.bundle.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>

        <style>
            .maps-wrap { 
                padding-top:0px;
            }
            .block-palette .block {
                border:dotted 3px transparent;
                width:30px;
                height:30px;
                margin:2px;
            }
            .block-palette .active {
                border:dotted 3px #000;
            }
        </style>

    </head>
    <body>
        
        <div class="container clearfix">

            <h1>Map Editor</h1>

            <div class="maps-wrap clearfix">
                <div class="the-fucking-forest-map" data-maptype="forest"></div>
            </div>

            <section class="beaudryland-panel">
                <h2>Blocks</h2>

                <div class="block-palette clearfix">
                    <!--<span class="pine"></span>-->
                </div>
            </section>

            <nav class="pixelpainter-nav">
                <ul>
                    <li><a href="#" class="button-reset">Reset Map</a></li>
                </ul>
            </nav>

		</div>
        
        <script src="js/vendor/jquery-2.1.1.js"></script>
        <script src="js/vendor/jquery.color.js"></script>
        <script src="js/vendor/raphael-min.js"></script>
        <script src="js/plugins.js"></script>
        <!--<script src="js/beaudryland.js"></script>-->
    
<script>
var mapwidth = 40;
var mapheight = 30;
var totalmapblocks = mapwidth * mapheight;

loadNewMap = function(type) {

    var maphtml = "";
    var overlayhtml = "";

    for (var f = 0; f <= (totalmapblocks - 1); f++){
        //random block generation
        var r = Math.random();
        var blocktype;
        if (r<0.7) { blocktype = "grass"; }
        else if (r>0.98) { blocktype = "rock"; }
        else if (r>0.8) { blocktype = "tree"; }
        else { blocktype = "water"; }
        maphtml += '<div data-blockid="'+f+'" data-blocktype="'+blocktype+'" data-blockhealth="10" class="block block-'+blocktype+'"></div>';
    }

    $('.the-fucking-forest-map').append(maphtml);

};

loadNewMap();

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
$.each(objecttypes, function(i, v) { 
    blockhtml += '<div class="block '+v+'" data-blocktype="'+v+'"></div>'; 
});

$('.block-palette').append(blockhtml);

$('.maps-wrap .block').on("click", function() { 
    var blocktype = $('.block-palette .active').attr("data-blocktype");
    //var colorcode = $('.color-code input').val();
    // validate hex code
    $(this).removeClass();
    $(this).addClass('block block-'+blocktype);
    $(this).attr("data-blocktype",blocktype);
});
$('.block-palette div').on("click", function() {
    $('.block-palette div').removeClass("active");
    $(this).addClass("active");
    //var color = $(this).css("background-color");
    //$('.color-code .form-color').css("background-color", color);
    //$('.color-code .form-color').val(color);
});

/*
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
        pixels[i].attr("stroke", color);
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