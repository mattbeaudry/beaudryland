<?php
    include 'config.php';
    ob_start();
    session_start();
?>

<?php include 'header.php'; ?>

<body>
    <div class="container clearfix">
        
        <h1>Beaudryland UI</h1>

        <section class="bui-section">
            <h2 class="bui-sectiontitle">Contents</h2>
            <ul>
                <li><a href="#color">Color</a></li>
                <li>Font</li>
                <li><a href="#typography">Typography</a></li>
                <li><a href="#buttons">Buttons</a></li>
                <li><a href="#inputs">Inputs</a></li>
                <li><a href="#colorpicker">Color picker</a></li>
                <li><a href="#slider">Slider</a></li>
                <li><a href="#knob">Knob</a></li>
                <li>Grid</li>
                <li>Flex</li>
                <li>Table</li>
                <li>Card</li>
                <li>Stat</li>
                <li>Menu</li>
                <li>Shadow</li>
                <li>Toasts</li>
                <li>Validation</li>
                <li>Motion</li>
                <li>Dark &amp; Light themes</li>
            </ul>
        </section>

        <!-- 
            <p data-height="265" data-theme-id="dark" data-slug-hash="veaOLr" data-default-tab="result" data-user="mattbeaudry" data-embed-version="2" data-pen-title="Beaudryland UI" class="codepen">See the Pen <a href="https://codepen.io/mattbeaudry/pen/veaOLr/">Beaudryland UI</a> by Matt Beaudry (<a href="https://codepen.io/mattbeaudry">@mattbeaudry</a>) on <a href="https://codepen.io">CodePen</a>.</p>
            <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script> 
        -->

        <div class="bui-components">
            <section class="bui-section">
                <a id="color"></a>
                <h2 class="bui-sectiontitle">Color</h2>
                <div class="bui-colorpalette">
                    <?php include 'php/part-colors.php'; ?>
                </div>
            </section>
            <section class="bui-section typography">
                <a id="typography"></a>
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
                <a id="buttons"></a>
                <h2 class="bui-sectiontitle">Buttons</h2>
                    <a class="bui-button" href="#">Button</a>
                <button class="bui-button bui-color--green">Button</button>
                <div class="bui-button bui-color--red"">
                    <span>Button</span>
                </div>
            </section>
            <section class="bui-section input">
                <a id="inputs"></a>
                <h2 class="bui-sectiontitle">Inputs</h2>
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
                    <div class="bui-select">
                        <select>
                            <option>Option 1</option>
                            <option>Option 2</option>
                        </select>
                    </div>
                </div>
            </section>
            <section class="bui-section">
                <a id="colorpicker"></a>
                <h2 class="bui-sectiontitle">Color picker</h2>
                <?php include 'php/ui-colorpicker.php'; ?>
            </section>
            <section class="bui-section">
                <a id="slider"></a>
                <h2 class="bui-sectiontitle">Slider</h2>
                <div class="bui-slider">
                    <input type="range" min="1" max="100" value="50" class="bui-slider-input">
                </div>
            </section>
            <section class="bui-section">
                <a id="knob"></a>
                <h2 class="bui-sectiontitle">Knob</h2>
                <input type="range" min="5" max="50" data-degree-range="270" data-degree-offset="45" step="0.5" value="12.5" class="bui-knob bui-knob-white">
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