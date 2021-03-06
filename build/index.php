<?php 
	if (isset($_GET['error'])){ $error = $_GET['error']; }else{ $error = ""; }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Beaudryland Login</title>
        
        <meta name="description" content="javascript/CSS game">
        <meta name="viewport" content="width=device-width">
        
        <link href="favicon.ico" rel="icon" type="image/x-icon" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
		
		<link href="http://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.bundle.css">
    </head>

    <body class="page-home version-desktop">
        
        <div class="site-wrap container">

	        <div class="the-fucking-header">
	        
		        <h1 class="logo-beaudryland">
		        	<a href="http://www.beaudryland.com"><img src="items/tree.svg" title="Beaudryland Tree Logo" />Beaudryland</a>
		        </h1>
					    
			    <div class="clearfix">
			    	<div class="row beaudryland-panel">
			    		<div class="col-2 col-left">
			    			<h2>New?</h2>
							<p><strong>What is Beaudryland?</strong> <br>Beaudryland is a Minecraft inspired javascript game that is in the early stages of development.</p>
							<p>You can contact <a href="http://www.mattbeaudry.com">Matt Beaudry</a> on <a href="http://www.twitter.com/mattbeaudry">Twitter</a> or at <a href="mailto:beaudrymatt@gmail.com">beaudrymatt@gmail.com</a> for help, questions and suggestions.</p>
						</div>
						<div class="col-2 col-right">
							<div class="the-fucking-login clearfix">
								<form class="beaudrylandregister" name="beaudrylandregister" method="post" action="php/createnewuser.php">
									<h3>Create New Land</h3>
									<input class="form-field required" name="new_username" type="text" id="new_username" placeholder="land name">
									<input class="form-field required" name="new_password" type="password" id="new_password" placeholder="password">
									<!--<input class="form-field email" name="new_email" type="text" id="new_email" placeholder="email">-->
									<fieldset class="maptype">
										<label>
											<input type="radio" name="maptype" value="game" checked>Start with nothing. Read signs for clues.<br>
										</label>
										<label>
											<input type="radio" name="maptype" value="creative">Start with all items and maps.<br>
										</label>
									</fieldset>
									<?php if ($error == "registerfailed"){ ?><span class="error error-login">Register Failed.</span><?php } ?>
									<input class="button" type="submit" name="newuser" value="Create Land">
								</form>
							</div>
						</div>
			    	</div>

			    	<div class="row beaudryland-panel">
					    <div class="col-2 col-left">
					        <h2>Returning?</h2>
					    	<p>See what people are building in Beaudryland at the <a href="mapgallery.php">Map Gallery</a>.</p>
					    	<p>Create your own items for the game with the <a href="spritepainter.php">Item Builder</a>.</p>
					    	<p>Create your own maps for the game with the <a href="mapeditor.php">Map Editor</a>.</p>
					    	<p>Play with a very early demo of <a href="https://rocky-escarpment-1406.herokuapp.com/">Beaudryland Multiplayer</a>.</p>
					    </div>
					    <div class="col-2 col-right">
					        <div class="the-fucking-login clearfix">
						        <form class="beaudrylandlogin" name="beaudrylandlogin" method="post" action="checklogin.php">
						        	<h3>Revisit Your Land</h3>
									<input class="form-field" name="username" type="text" id="username" placeholder="land name">
									<input class="form-field" name="password" type="password" id="password" placeholder="password">
									<?php if ($error == "loginfailed"){ ?><span class="error error-login">Login Failed.</span><?php } ?>
									<input class="button" type="submit" name="submit" value="Enter Land">
								</form>
							</div>
						</div>
		        	</div>
		        </div>
			</div>
			
			<section class="the-fucking-gameinfo">
					<h2>Update History</h2>
					<article class="beaudryland-panel">
						<h3>Beaudryland v0.7<br>Winter 2015</h3>
						<ul class="multi-column-2">
							<li>iOS app in the app store (coming soon)</li>
							<li>item builder tool! design your own items and blocks and add them to the game</li>
							<li>map builder</li>
							<li>character creator</li>
							<li>level creator</li>
							<li>more interesting random terrain generation (lakes, forests, plants, objects)</li>
							<li>achievements!</li>
							<li>mushrooms, flowers, carrots</li>
							<li>portals, bow &amp; arrow</li>
							<li>more interesting digging</li>
							<li>animal &amp; hunting</li>
							<li>new animation engine &amp; game global timer</li>
							<li>night time &amp; lighting effects</li>
							<li>improved sound and playing of musical instruments</li>
							<li>airplane</li>
							<li>weapons &amp; armor</li>
						</ul>
		        	</article>
					<article class="beaudryland-panel">
						<h3>Beaudryland v0.6<br>Fall 2014 <br>The Space Update</h3>
						<ul class="multi-column-2">
							<li>the space map: space, star, earth, sun, planets, galaxies</li>
							<li>new items: signs, telescope, computer, 2D printer, rocket</li>
							<li>furniture! table, chair, chest, bed, sink, bathtub, toilet</li>
							<li>the drum kit! hithat, bass drum, snare, tom and cymbal</ll>
							<li>write/read messages on signs</li>
							<li>creative and story game modes</li>
							<li>life gauge and hearts! enemies can hurt you now</li>
							<li>apple trees and apples! eat apples to restore hearts</li>
						</ul>
		        	</article>
					<article class="beaudryland-panel">
						<h3>Beaudryland v0.5<br>December 2013<br>The Beach Update</h3>
						<img class="banner-beaudryland" src="img/banner-beaudryland-0.5.png" title="Beaudryland Banner" />
						<ul class="multi-column-2">
							<li>beach map: sand, plamtrees, sandstone, wetsand, animated waves</li>
							<li>new items: keyboard, axe, spear</li>
							<li>new treasure: oil, clay</li>
							<li>new blocks: rockbricks, icerockbricks, sandstone, claybrick</li>
							<li>car and roads</li>
							<li>projectiles: throwable items (spear and frisbee)</li>
						</ul>
		        	</article>
		        	<article class="beaudryland-panel">
		        		<h3>Beaudryland v0.4<br>March 2013<br>The Winter Update</h3>
		        		<img class="banner-beaudryland" src="img/banner-beaudryland-0.4.png">
			        	<ul class="multi-column-2">
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
		        	<article class="beaudryland-panel">
		        		<h3>Beaudryland v0.3<br>January, 2013<br>The Items Update</h3>
		        		<img class="banner-beaudryland" src="img/banner-beaudryland-0.3.png">
		        		<ul class="multi-column-2">
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
		        	<article class="beaudryland-panel">
		        		<h3><a href="http://www.mattbeaudry.com/beaudryland-0.2/">Beaudryland v0.2</a><br>December 24, 2012<br>The Texture Update</h3>
		        		<ul class="multi-column-2">
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
		        	<article class="beaudryland-panel">
		        		<h3><a href="http://www.mattbeaudry.com/beaudryland-0.1/">Beaudryland v0.1</a><br>Dec 17, 2012<br>The Game Engine Update</h3>
		        		<ul class="multi-column-2">
		        			<li>random map generation</li>
		        			<li>terrain blocks (grass, trees, water, rocks)</li>
		        			<li>player movement</li>
		        			<li>keyboard/mouse events</li>
		        			<li>collect trees</li>
		        			<li>crafting table</li>
		        			<li>inventory</li>
		        			<li>crafting wood</li>
		        			<li>onscreen controller for touch devices</li>
		        		</ul>
		        	</article>
		       
	        	
	        </section>

	        <section class="beaudryland-panel">
	        	<h3>&copy; <?php echo date('Y'); ?> <a href="http://www.mattbeaudry.com">Matt Beaudry</a></h3>
	        </section>
        
        </div>

        <script>window.jQuery || document.write('<script src="js/vendor/jquery-2.1.1.js"><\/script>')</script>
        <script src="js/vendor/jquery.validate.js"></script>
        <script src="js/plugins.js"></script>

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