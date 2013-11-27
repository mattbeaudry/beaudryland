<?php if ($_GET['error']) { $error = $_GET['error']; } ?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Beaudryland</title>
        
        <meta name="description" content="javascript/CSS game">
        <meta name="viewport" content="width=device-width">
        
        <link href="favicon.ico" rel="icon" type="image/x-icon" />
        <link rel="apple-touch-icon" href="apple-touch-icon-144x144-precomposed.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="apple-touch-icon-57x57-precomposed.png" />
		<link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-72x72-precomposed.png" />
		<link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-114x114-precomposed.png" />
		<link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-144x144-precomposed.png" />
		
		<link href="http://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body class="page-home">
        
        <div class="the-fucking-header container">
        
	        <h1 class="logo-beaudryland">
	        	<a href="http://www.beaudryland.com"><img src="img/block-tree.png" title="Beaudryland Tree Logo" />Beaudryland</a>
	        </h1>
	        
	        <p><strong>What is Beaudryland?</strong><br />Beaudryland is a Minecraft inspired javascript game that is in the early stages of development. You can contact <a href="http://www.mattbeaudry.com">Matt Beaudry</a> on <a href="http://www.twitter.com/mattbeaudry">Twitter</a> or at beaudrymatt@gmail.com for help, questions and suggestions.</p>
	        
	        <p>See what people are doing in Beaudryland at the <a href="mapgallery.php">Map Gallery</a>.</p>
	        
	        <div class="the-fucking-login clearfix">
	        
		        <form class="beaudrylandlogin" name="beaudrylandlogin" method="post" action="checklogin.php">
					<input class="form-field" name="username" type="text" id="username" placeholder="username">
					<input class="form-field" name="password" type="password" id="password" placeholder="password">
					<?php if ($error == "loginfailed"){ ?><span class="error error-login">Login Failed.</span><?php } ?>
					<input class="button" type="submit" name="submit" value="login">
				</form>
		
				<form class="beaudrylandregister" name="beaudrylandregister" method="post" action="php/createnewuser.php">
					<input class="form-field required" name="new_username" type="text" id="new_username" placeholder="username">
					<input class="form-field required" name="new_password" type="password" id="new_password" placeholder="password">
					<input class="form-field email" name="new_email" type="text" id="new_email" placeholder="email">
					<?php if ($error == "registerfailed"){ ?><span class="error error-login">Register Failed.</span><?php } ?>
					<input class="button" type="submit" name="newuser" value="register">
				</form>
				
			</div>
	        
	        
	        
		</div>
		
		<section class="the-fucking-gameinfo">
		
			<article class="recent-updates">
			
				<img class="banner-beaudryland" src="img/banner-beaudryland-0.5.png" title="Beaudryland Banner" />
			
				<article>
					<span><strong>Beaudryland 5 - November 2013</strong></span>
					<ul>
						<li>beach map</li>
						<li>new items and treasure: oil, clay, brick, keyboard, signs</li>
						<!--<li>first shot at some music and sound</li>-->
						<!--<li>beaudryland multiplayer: chat, realtime sword fights</li>-->
						<!--<li>tutorial/story speech bubbles</li>-->
						<li>wrap code in beaudryland class and do some mother fucking refactoring</li>
					</ul>
				</article>
				
        	</article>
        	
        	<h2>Previous Versions</h2>
        	
        	<article>
        		<img class="banner-beaudryland" src="img/banner-beaudryland-0.4.png" title="Beaudryland Banner" />
        	
	        	<h3>Beaudryland 4 - March 2013</h3>
	        	
	        	<ul>
	        		<li>safer/smarter map and inventory saving</li>
	        		<li>game now open to new users through register form on homepage</li>
	        		<li>new map: winter</li>
	        		<li>new blocks: snow, ice, frozendirt, pinetree, icerock</li>
	        		<li>new items: bike, skiis</li>
	        		<li>picking up and placing treasure, water, dirt, grass</li>
	        		<li>riding bike logic</li>
	        		<li>skiis cause scrolling on the winter map</li>
	        		<li>new treasure: silver, gold</li>
	        		<li>player holding and swinging animations for shovel, bike and skiis</li>
	        		<li>updated inventory and crafting system</li>
	        		<li>updated map gallery</li>
	        		<li>digging/collecting/placing ice blocks</li>
	        		<li>placing water</li>
	        	</ul>
	        </article>
		
        	<article>
        		<h3><a href="http://www.mattbeaudry.com/beaudryland-0.3/">Beaudryland 3</a> - Jan 15, 2013</h3>
        		<ul>
        			<li>updated inventory/crafting system</li>
        			<li>inventory function arrows used for crafting</li>
        			<li>inventory items are selectable</li>
        			<li>placing blocks</li>
        			<li>craft up to 3 wood at a time</li>
        			<li>doors and door mechanism</li>
        			<li>enemy sprites and early intelligence</li>
					<li>playable guitar with audio and arrow keys</li>
        			<li>login system</li>
        			<li>user specific map saving and loading</li>
        			<li>users can save their game (map and inventory)</li>
        			<li>player can collect dirt by digging holes</li>
        			<li>player can fill water and holes with dirt</li>
        			<li>diamonds, find them by digging</li>
        			<li>smarter enemy ai</li>
        			<li>press M/K keys to spawn/kill an enemy [for testing]</li>
        			<li>sword swing animation and graphics</li>
        			<li>map gallery</li>
					<li>throwable frisbee</li>
        		</ul>
        	</article>
			
        	<article>
        		<h3><a href="http://www.mattbeaudry.com/beaudryland-0.2/">Beaudryland 2</a> - Dec 24, 2012</h3>
        		<ul>
        			<li>player graphics</li>
        			<li>map terrain graphics</li>
        			<li>collect rocks</li>
        			<li>block data attributes (blockid, blockhealth, blocktype)</li>
        			<li>craftable shovel</li>
        			<li>map size can be changed</li>
        			<li>digging holes with shovel</li>
        			<li>growing grass</li>
        			<li>craftable sword</li>
        			<li>craftable fire with animation</li>
        		</ul>
        	</article>
        
        	<article>
        		<h3><a href="http://www.mattbeaudry.com/beaudryland-0.1/">Beaudryland 1</a> - Dec 17, 2012</h3>
        		<ul>
        			<li>random map generation</li>
        			<li>terrain blocks (grass, trees, water, rocks)</li>
        			<li>player movement</li>
        			<li>keyboard/mouse events</li>
        			<li>collect trees</li>
        			<li>crafting table</li>
        			<li>inventori</li>
        			<li>crafting wood</li>
        			<li>onscreen controller for touch devices</li>
        		</ul>
        	</article>
        		
        </section>
        
        <!--
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        -->
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-2.0.0.min.js"><\/script>')</script>
        <!-- <script src="js/vendor/jquery.color.js"></script> -->
        <script src="js/vendor/jquery.validate.js"></script>
        <!-- <script src="js/vendor/timbre.js"></script> -->
        <script src="js/plugins.js"></script>
        <!-- <script src="js/beaudryland.js"></script> -->

		
        <script type="text/javascript">
        
        $('.beaudrylandregister').validate();
        $('.beaudrylandlogin').validate();

		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-37415514-1']);
		  _gaq.push(['_trackPageview']);
		
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();

		</script>
        
    </body>
</html>