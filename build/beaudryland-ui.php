<?php
    include 'config.php';
    ob_start();
    session_start();
?>

<?php include 'header.php'; ?>

    <body>
        <div class="container clearfix">
            <h1>Beaudryland UI</h1>

            <p data-height="265" data-theme-id="dark" data-slug-hash="veaOLr" data-default-tab="result" data-user="mattbeaudry" data-embed-version="2" data-pen-title="Beaudryland UI" class="codepen">See the Pen <a href="https://codepen.io/mattbeaudry/pen/veaOLr/">Beaudryland UI</a> by Matt Beaudry (<a href="https://codepen.io/mattbeaudry">@mattbeaudry</a>) on <a href="https://codepen.io">CodePen</a>.</p>
            <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
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