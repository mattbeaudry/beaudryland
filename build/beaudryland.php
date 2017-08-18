<?php
	session_start();
	if (!(isset($_SESSION['username']) && $_SESSION['username'] != '')) {
		header("location:index.php");
	}
?>

<script>
	<?php 
		if (isset($_GET['maptype'])){
			$maptype = $_GET['maptype'];
			echo "var maptype = '".$maptype."';";
		}
	?>
</script>

<?php include 'header.php'; ?>

	<body class="page-game container version-desktop">

		<div class="the-fucking-hearts">
			<ul>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>

		<div class="the-fucking-map-overlay"></div>

		<div class="maps-container cube-container">
		    <div class="maps-wrap cube cube-show-front clearfix"></div>
		</div>
	    
		<div class="sticky-inventory clearfix">
		
			<div class="crafting-table-wrap horizonal-spacing clearfix">
			    <div class="the-fucking-crafting-table pixel-corners">
			    	<div class="block slot-1 empty" data-blocktype="empty"></div>
			    	<div class="block slot-2 empty" data-blocktype="empty"></div>
			    	<div class="block slot-3 empty" data-blocktype="empty"></div>
			    </div>
			    <!--<img class="crafting-arrow-right" src="img/arrow-right.png">-->
			    <div class="the-fucking-crafted-item pixel-corners">
			    	<div class="slot empty" data-blocktype="empty"></div>
			    </div>
			    <div class="nav-username">
              		<?php if(isset($_SESSION['username'])){echo $_SESSION['username'];} ?>
              	</div>
              	<div class="nav-buttons">
              		<ul>
              			<li><a class="nav-toggle-inventory button-black" href="javascript:void(0);">INV</a></li>
              			<li><a class="nav-toggle-menu button-black" href="javascript:void(0);">MENU</a></li>
              		</ul>
              	</div>
		    </div>

        	<div class="the-fucking-inventory clearfix"></div>

		    <div class="the-fucking-navigation clearfix">
                <nav class="beaudryland-nav">
                  <ul class="nav-extra">
                    <li class="link-mapeditor">
                      <div class="button-wrap button-wrap-large button-wrap-outline">
                        <a target="_blank" href="mapgallery.php">Map Gallery</a>
                      </div>
                    </li>
                    <li class="link-itemeditor">
                      <div class="button-wrap button-wrap-large button-wrap-outline">
                        <a target="_blank" href="spritepainter.php">Item Editor</a>
                      </div>
                    </li>
                    <li class="link-mapeditor">
                      <div class="button-wrap button-wrap-large button-wrap-outline">
                        <a target="_blank" href="mapeditor.php">Map Editor</a>
                      </div>
                    </li>
                  </ul>
                  <ul>
                    <li class="link-savemap">
                      <div class="button-wrap">
                        <a>Save</a>
                      </div>
                    </li>
                    <!--
                    <li class="link-multiplayer">
                      <div class="button-wrap">
                        <a target="_blank" href="mapgallery.php">Globe</a>
                      </div>
                    </li>
                	-->
                    <li class="link-help">
                      <div class="button-wrap">
                        <a href="#help">Help</a>
                      </div>
                    </li>
                    <li class="link-items">
                      <div class="button-wrap">
                        <a href="#items">Items</a>
                      </div>
                    </li>
                    <li class="link-help">
                      <div class="button-wrap button-wrap-large">
                        <a href="#achievements">Achievements</a>
                      </div>
                    </li>
                    <li class="link-logout">
                      <div class="button-wrap">
                        <a href="logout.php">Logout</a>
                      </div>
                    </li>
                   </ul>

                   <!--
					hunt 10 animals
					kill 10 enemies
					create all items
					unlock all maps
					build a house
					build a road
					ride a bike
					canoe
					skiing
					drive a car
					astronaut
					groceries - get all types of food
					fisherman
					scientist - build all tech items
               		-->

                </nav>
            </div>

		</div>

        <div class="the-fucking-controller">
        
        	<div class="d-pad">
        		<div href="javascript:void(0)" class="btn-up"></div>
        		<div href="javascript:void(0)" class="btn-down"></div>
        		<div href="javascript:void(0)" class="btn-left"></div>
        		<div href="javascript:void(0)" class="btn-right"></div>
        	</div>
        	<div href="javascript:void(0)" class="btn-a"></div>
        	
        </div>


        <div class="the-fucking-dev-panel">
	    	<h2>Developer Console</h2>
	    	<nav>
	    		<ul class="dev-console clearfix">
	    			
	    		</ul>
	    	</nav>
	    </div>
		
		<div id="react-map-test"></div>
               
        <div class="the-fucking-gameinfo">

        	<section>
        		<a id="help"></a>
		        <h2>Help</h2>
		        
		        <ul>
		        	<li>*** Don't forget to save your map before you leave! ***</li>
		        	<li>Use the arrow keys to move around, use spacebar to collect and place blocks</li>
		        	<li>Start by collecting some trees and rocks and clearing an area to build your shelter.</li>
		        	<li>Combine things you have collected to create new items. For example, you can create wood blocks with the trees you have collected.</li>
		        	<li>Using the <em>item formulas</em> listed below you can create items like the sword, shovel, door, fire and bike.</li>
		        	<li>Build and use the shovel to go digging to find treasure.</li>
					<li>Once you create and start swinging the sword you will summon an enemy and need to defend yourself.</li>
					<li>If you build the guitar and jam out, you will unlock a new map.</li>
					<li>If you unlock the winter map and you create the skiis, you can go skiing.</li>
					<li>Thanks for taking part in the Beaudryland experiment.</li>
		        </ul>
		        
		    </section>

		    <section>

		    	<a id="achievements"></a>
		    
		        <h2>Achievements</h2>
		        
		        <ul class="item-achievements clearfix">
		        	<li data-achievementid="1" data-achievementname="genesis" class="achievement-genesis status-completed">
		        		<!--<img src="img/icon-check-grey.png">-->
		        		<h3>Genesis</h3>
		        		<p>Created a new game and generated a randomized map.</p>
		        	</li>
		        	<li data-achievementid="2" data-achievementname="cuttingwood" class="achievement-cuttingwood">
		        		<!--<img src="img/icon-check-grey.png">-->
		        		<h3>Cutting Wood</h3>
		        		<p>Cut down trees and use them to create wood blocks.</p>
		        	</li>
		        	<li data-achievementid="3" data-achievementname="keepingwarm" class="achievement-keepingwarm">
		        		<h3>Keeping Warm</h3>
		        		<p>Use rocks and wood to build a fire.</p>
		        	</li>
		        	<li data-achievementid="4" data-achievementname="saveyourgame" class="achievement-saveyourgame">
		        		<!--<img src="img/icon-check-grey.png">-->
		        		<h3>Save your Game</h3>
		        		<p>Save your game for the first time. You should do tbis periodically whikle playing.</p>
		        	</li>
		        	<li data-achievementid="5" data-achievementname="treasurehunter" class="achievement-treasurehunter">
		        		<h3>Treasure Hunter</h3>
		        		<p>Build a shovel, learn how to dig, and find some treasure.</p>
		        	</li>
		        	<li data-achievementid="6" data-achievementname="takingshelter" class="achievement-takingshelter">
		        		<h3>Taking Shelter</h3>
		        		<p>Build a door and use some wood or solid blocks to create a cabin.</p>
		        	</li>
		        	<li data-achievementid="7" data-achievementname="jammingout" class="achievement-jammingout">
		        		<h3>Jamming Out</h3>
		        		<p>Build a guitar or keyboard.</p>
		        	</li>
		        </ul>

		    </section>
		   
		    <section>

		    	<a id="items"></a>
		    
		        <h2>Item Formulas</h2>
		        
		        <p>The item formulas are not very intuitive yet, so for now I will list them here.</p>
		        
		        <ul class="item-formulas">
		        	<li>
		        		<h3>Wood</h3>
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/arrow-right.png">
		        		<img src="img/block-wood.png" title="Wood">
		        		<ul>
		        			<li>can be placed on map</li>
		        			<li>can be picked up</li>
		        			<li>used to build other items</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Shovel</h3>
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-shovel.png" title="Shovel">
		        		<ul>
		        			<li>used to dig holes</li>
		        			<li>used to pick up treasure</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Sword</h3>
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-sword.png" title="Sword">
		        		<ul>
		        			<li>press space to swing sword</li>
		        			<li>used to kill enemy</li>
		        			<li>selecting the sword will spawn an enemy</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Axe</h3>
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-axe.png" title="Axe">
		        		<ul>
		        			<li>press space to swing axe</li>
		        			<li>used to pick up doors </li>
		        			<li>used to pick up fire pits</li>
		        			<li>used to pick up signs</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Fire Pit</h3>
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-fire-3.gif" title="Fire">
		        		<ul>
		        			<li>can be placed on map</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Door</h3>
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-door-closed.png" title="Door">
		        		<ul>
		        			<li>can be placed on map</li>
		        			<li>can be opened and closed</li>
		        			<li>requires the axe to pick up</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Guitar</h3>
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-guitar.png" title="Guitar">
		        		<ul>
		        			<li>can be played with arrow keys/control pad</li>
		        			<li>disables walking while selected</li>
		        			<li>playing the guitar unlocks the winter and beach maps</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Piano</h3>
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-silver.png" title="Silver">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-piano.png" title="Piano">
		        	</li>
		        	<li>
		        		<h3>Sign</h3>
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-sign.png" title="Sign">
		        		<ul>
		        			<li>can be placed on map</li>
		        			<li>you can read messages on signs</li>
		        			<li>you can write a message while placing a sign</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Spear</h3>
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-silver.png" title="Silver">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-spear.png" title="Spear">
		        		<ul>
		        			<li>can be thrown</li>
		        			<li>selecting the spear with spawn an animal</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Frisbee</h3>
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-diamond.png" title="Diamond">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-frisbee.png" title="Frisbee">
		        		<ul>
		        			<li>can be thrown</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Bike</h3>
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-diamond.png" title="Diamond">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-bike.png" title="Bike">
		        		<ul>
		        			<li>you can get on the bike</li>
		        			<li>used to travel automatically</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Skiis</h3>
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-diamond.png" title="Diamond">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-skiis.png" title="Skiis">
		        		<ul>
		        			<li>you can put on the skiis</li>
		        			<li>used to scroll the winter map</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Canoe</h3>
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-canoe.png" title="Canoe">
		        		<ul>
		        			<li>you can get in the canoe</li>
		        			<li>used to travel on water</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Car</h3>
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-oil.png" title="Oil">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-car.png" title="Car">
		        		<ul>
		        			<li>you can get in the car</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Road</h3>
		        		<img src="img/block-clay.png" title="Clay">
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-clay.png" title="Clay">
		        		<img src="img/arrow-right.png">
		        		<img src="img/block-road.png" title="Road">
		        		<ul>
		        			<li>can be placed on map</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Rock Brick</h3>
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/arrow-right.png">
		        		<img src="img/block-rockbrick.png" title="Rock Bricks">
		        		<ul>
		        			<li>can be placed on map</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Ice Brick</h3>
		        		<img src="img/block-icerock.png" title="Icerock">
		        		<img src="img/block-icerock.png" title="Icerock">
		        		<img src="img/block-icerock.png" title="Icerock">
		        		<img src="img/arrow-right.png">
		        		<img src="img/block-icerockbrick.png" title="Icerock Bricks">
		        		<ul>
		        			<li>can be placed on map</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Sand Brick</h3>
		        		<img src="img/block-sandstone.png" title="Sandstone">
		        		<img src="img/block-sandstone.png" title="Sandstone">
		        		<img src="img/block-sandstone.png" title="Sandstone">
		        		<img src="img/arrow-right.png">
		        		<img src="img/block-sandstonebrick.png" title="Sandstone Bricks">
		        		<ul>
		        			<li>can be placed on map</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Clay Brick</h3>
		        		<img src="img/block-clay.png" title="Clay">
		        		<img src="img/block-clay.png" title="Clay">
		        		<img src="img/block-clay.png" title="Clay">
		        		<img src="img/arrow-right.png">
		        		<img src="img/block-claybrick.png" title="Clay Bricks">
		        		<ul>
		        			<li>can be placed on map</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Table</h3>
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-pinetree.png" title="Pinetree">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-table.png" title="Table">
		        		<ul>
		        			<li>can be placed on map</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Chair</h3>
		        		<img src="img/block-pinetree.png" title="Pinetree">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-chair.png" title="Chair">
		        		<ul>
		        			<li>can be placed on map</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Chest</h3>
		        		<img src="img/block-pinetree.png" title="Pinetree">
		        		<img src="img/block-pinetree.png" title="Pinetree">
		        		<img src="img/block-pinetree.png" title="Pinetree">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-chest.png" title="Chest">
		        		<ul>
		        			<li>can be placed on map</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Bed</h3>
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-pinetree.png" title="Pinetree">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-bed.png" title="Bed">
		        		<ul>
		        			<li>can be placed on map</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Telescope</h3>
		        		<img src="img/block-diamond.png" title="Diamond">
		        		<img src="img/block-silver.png" title="Silver">
		        		<img src="img/block-gold.png" title="Gold">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-telescope.png" title="Telescope">
		        		<ul>
		        			<li>can be placed on map</li>
		        		</ul>
		        	</li>
		        	<li>
		        		<h3>Computer</h3>
		        		<img src="img/block-diamond.png" title="Diamond">
		        		<img src="img/block-silver.png" title="Silver">
		        		<img src="img/block-diamond.png" title="Diamond">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-computer.png" title="Computer">
		        		<ul>
		        			<li>can be placed on map</li>
		        		</ul>
		        	</li>
		        	
		        </ul>
		        
		    </section>

		</div>
        
        <!--
        //Dirty way to preload images
        -->
        <div class="preload-images visuallyhidden">
        	<?php foreach(glob('img/*.*') as $filename){ echo '<img src="'.$filename.'" />'; } ?>
        </div>

        <script>
        	window.jQuery || document.write('<script src="js/vendor/jquery-2.1.1.js"><\/script>');
        </script>

        <script src="js/vendor/timbre.dev.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/app-bundle.js"></script>

        <script type="text/javascript">
        
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