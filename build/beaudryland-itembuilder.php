<?php
    include 'config.php';
    ob_start();
    session_start();
?>

<?php include 'header.php'; ?>

    <body class="page-itemworkshop">
        <div class="container clearfix">
            <h1>Thing Workshop</h1>

            <div class="panel-left">
                <section>
                    <h2>Tools</h2>
                    <?php include 'php/ui-colorpicker.php'; ?>
                    
                    <h2>Canvas</h2>

                    <nav class="pixelpainter-nav">
                        <a href="#" class="button-reset">Reset</a>
                    </nav>

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
                    <h2>Properties</h2>

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

                    <h2>Things</h2>

                    <div class="block-palette clearfix"></div>
                    <div class="bl-table-contain">
                        <table class="bl-table items-table">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Image</td>
                                    <td>Name</td>
                                    <td>Description</td>
                                    <td>Recipe</td>
                                    <!-- <td>Animated</td> -->
                                    <td>Lifeform</td>
                                    <td>Equipable</td>
                                    <td>Useable</td>
                                    <td>Peoperties</td>
                                </tr>
                            </thead>
                            <tbody>
                                <?php include 'php/loaditems.php'; ?>
                            </tbody>
                        </table>
                    </div>
                </section>
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