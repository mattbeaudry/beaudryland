<?php
    include 'config.php';
    ob_start();
    session_start();
?>

<?php include 'header.php'; ?>

    <body>
        <div class="container clearfix">
            <h1>Beaudryland UI</h1>

            <!-- 
                <p data-height="265" data-theme-id="dark" data-slug-hash="veaOLr" data-default-tab="result" data-user="mattbeaudry" data-embed-version="2" data-pen-title="Beaudryland UI" class="codepen">See the Pen <a href="https://codepen.io/mattbeaudry/pen/veaOLr/">Beaudryland UI</a> by Matt Beaudry (<a href="https://codepen.io/mattbeaudry">@mattbeaudry</a>) on <a href="https://codepen.io">CodePen</a>.</p>
                <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script> 
            -->

            <div class="bui-components">
                <section class="bui-section">
                    <h2 class="bui-sectiontitle">Colors</h2>
                    <div class="bui-colorpalette">
                        <span class="bui-swatch c-green-1"></span>
                    </div>
                </section>
                <section class="bui-section typography">
                    <h2 class="bui-sectiontitle">Typography</h2>
                    <h1>First Heading</h1>
                    <h2>Second Heading</h2>
                    <h3>Third Heading</h3>
                    <h4>Fourth Heading</h4>
                    <p>Paragraph with <a href="#">a link</a>, <b>some text that is bold</b> and <i>some text that is italic</i>.</p>
                    <p>An unordered list:</p>
                    <ul>
                        <li>List item #1</li>
                        <li>List item #2</li>
                        <li>List item #3</li>
                    </ul>
                    <p>An ordered list:</p>
                    <ol>
                        <li>List item #1</li>
                        <li>List item #2</li>
                        <li>List item #3</li>
                    </ol>
                </section>
                <section class="bui-section button">
                    <h2 class="bui-sectiontitle">Buttons</h2>
                    <a class="bui-button" href="#">Button</a>
                    <button class="bui-button bui-color--green">Button</button>
                    <div class="bui-button bui-color--red"">
                        <span>Button</span>
                    </div>
                </section>
                <section class="bui-section input">
                    <h2 class="bui-sectiontitle">Form inputs</h2>
                    <div class="bui-field">
                        <label class="bui-label">Text</label>
                        <input class="bui-textinput" type="text" placeholder="Placeholder...">
                    </div>
                    <div class="bui-field">
                        <label class="bui-label">Textarea</label>
                        <textarea class="bui-textarea" placeholder="Placeholder..."></textarea>
                    </div>
                    <div class="bui-field">
                        <input class="bui-checkbox" type="checkbox">
                        <label class="bui-label">Checkbox</label>
                    </div>
                    <div class="bui-field">
                        <input class="bui-radio" type="radio">
                        <label class="bui-label">Radio</label>
                    </div>
                    <div class="bui-field">
                        <label class="bui-label">Select</label>
                        <select class="bui-select">
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                    </div>
                </section>
                <section class="bui-section">
                    <h2 class="bui-sectiontitle">Color picker</h2>
                    <div class="bui-colorpicker">
                        <input class="bui-textinput bui-colorpicker-input" type="text" name="hexcode" value="#000000">
                        <div class="bui-colorpicker-eraser"></div>
                        <div class="bui-colorpicker-palette clearfix"> 
                            <span class="bui-colorpicker-swatch c-green-1"></span>
                            <span class="bui-colorpicker-swatch c-green-2"></span>
                            <span class="bui-colorpicker-swatch c-green-3"></span>
                            <span class="bui-colorpicker-swatch c-green-4"></span>
                            <span class="bui-colorpicker-swatch c-green-5"></span>
                            <span class="bui-colorpicker-swatch c-green-6"></span>
                            <span class="bui-colorpicker-swatch c-green-1"></span>
                            <span class="bui-colorpicker-swatch c-green-2"></span>
                            <span class="bui-colorpicker-swatch c-green-3"></span>
                            <span class="bui-colorpicker-swatch c-green-4"></span>

                            <span class="bui-colorpicker-swatch c-green-1"></span>
                            <span class="bui-colorpicker-swatch c-green-2"></span>
                            <span class="bui-colorpicker-swatch c-green-3"></span>
                            <span class="bui-colorpicker-swatch c-green-4"></span>
                            <span class="bui-colorpicker-swatch c-green-5"></span>
                            <span class="bui-colorpicker-swatch c-green-6"></span>
                            <span class="bui-colorpicker-swatch c-green-1"></span>
                            <span class="bui-colorpicker-swatch c-green-2"></span>
                            <span class="bui-colorpicker-swatch c-green-3"></span>
                            <span class="bui-colorpicker-swatch c-green-4"></span>
                        </div>
                    </div>
                </section>
            </div>

        </div>

        <script src="js/vendor/jquery-2.1.1.js"></script>
        <script src="js/vendor/raphael-min.js"></script>
        <script src="js/plugins.js"></script>
    </body>
</html>

<?php 
    $mysqli->close();
    ob_end_flush();
?>