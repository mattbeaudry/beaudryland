<?php
    include 'config.php';
    ob_start();
    session_start();
?>

<?php include 'header.php'; ?>

    <body>
        
        <div class="container clearfix">

            <h1>Beaudryland Pong</h1>

            <p data-height="600" data-theme-id="dark" data-slug-hash="WQNjzp" data-default-tab="result" data-user="mattbeaudry" data-embed-version="2" data-pen-title="Ping Pong CSS Game" class="codepen">See the Pen <a href="https://codepen.io/mattbeaudry/pen/WQNjzp/">Ping Pong CSS Game</a> by Matt Beaudry (<a href="https://codepen.io/mattbeaudry">@mattbeaudry</a>) on <a href="https://codepen.io">CodePen</a>.</p>
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