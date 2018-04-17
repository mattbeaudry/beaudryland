<?php
    include 'config.php';
    ob_start();
    session_start();
?>

<?php include 'header.php'; ?>

<body>

    <div class="container-fullwidth clearfix">

        <h1>Character Editor</h1>
        
        <div class="bl-character-editor">
            <div class="">
                <fieldset id="canvas-character" class="canvas-frame">
                    <label for="name">Character</label>
                    <?php include 'php/part-canvas.php'; ?>
                    <br>
                    <div class="svg-preview" id="image"></div>
                </fieldset>
            </div>
            <div id="character-shirt-color">
                <label>Shirt color</label>
                <?php include 'php/ui-colorpicker.php'; ?>
            </div>
            <div id="character-shoe-color">
                <label>Shoes color</label>
                <?php include 'php/ui-colorpicker.php'; ?>
            </div>
            <div id="character-skin-color">
                <label>Skin color</label>
                <?php include 'php/ui-colorpicker.php'; ?>
            </div>
            <div id="character-hair-style">
                <label>Hair style</label>
                <div class="bui-select">
                    <select class="character-hair-style">
                        <option value="short">Short</option>
                        <option value="medium">Medium</option>
                        <option value="long">Long</option>
                    </select>
                </div>
            </div>
            <div id="character-hair-color">
                <label>Hair color</label>
                <?php include 'php/ui-colorpicker.php'; ?>
            </div>
            <br>
            <div class="">
                <button id="character-draw" class="bui-button">Draw Character</button>
            </div>
        </div>

    </div>

    <script src="js/vendor/jquery-2.1.1.js"></script>
    <script src="js/vendor/raphael-min.js"></script>
    <script src="js/plugins.js"></script>
    <script src="js/app-bundle.js"></script>

</body>
</html>

<?php 
    $mysqli->close();
    ob_end_flush();
?>