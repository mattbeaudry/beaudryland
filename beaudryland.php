<?php
session_start();
if (!(isset($_SESSION['username']) && $_SESSION['username'] != '')) {
	header("location:loginregister.php");
}
?>
<?php include 'header.php'; ?> 

	<body class="page-game container">

	    <div class="maps-wrap clearfix">
	    
	    	<div class="the-fucking-map" data-maptype="forest"></div>
	    	
	    </div>

	    <div class="the-fucking-dev-panel">
	    	<h2>Developer Console</h2>
	    	<nav>
	    		<ul class="dev-console clearfix">
	    			<li><a href="javascript:void(0);" onclick="playMusic();return false">Play Sound</a></li>
	    			<li><a href="javascript:void(0);" onclick="enableKeyboardEvents();return false">Enable Keyboard Events</a></li>
	    			<li><a href="javascript:void(0);" onclick="disableKeyboardEvents();return false">Disable Keyboard Events</a></li>
	    			<li><a href="javascript:void(0);" onclick="createEnemy();return false">Create Enemy</a></li>
	    			<li><a href="javascript:void(0);" onclick="killEnemy();return false">Kill Enemy</a></li>
	    			<li><a href="javascript:void(0);" onclick="createAnimal();return false">Create Animal</a></li>
	    			<li><a href="javascript:void(0);" onclick="killAnimal();return false">Kill Animal</a></li>
	    			<li><a href="javascript:void(0);" onclick="drawNewWinterMap();return false">Draw New Winter Map</a></li>
	    			<li><a href="javascript:void(0);" onclick="drawNewBeachMap();return false">Draw New Beach Map</a></li>
	    			<li><a href="javascript:void(0);" onclick="drawNewSpaceMap();return false">Draw New Space Map</a></li>
	    			<!--
		    			<li><a href="javascript:void(0);" onclick="playMusic();return false"></a></li>
		    			<li><a href="javascript:void(0);" onclick="playMusic();return false"></a></li>
		    			<li><a href="javascript:void(0);" onclick="playMusic();return false"></a></li>
	    			-->
	    		</ul>
	    	</nav>
	    </div>
		   
		<div class="sticky-inventory ">
		
		    <div class="the-fucking-inventory clearfix">
		    	<div class="slot-1 empty selected-item" data-blocktype="empty">0</div>
		    	<div class="slot-2 empty" data-blocktype="empty">0</div>
		    	<div class="slot-3 empty" data-blocktype="empty">0</div>
		    	<div class="slot-4 empty" data-blocktype="empty">0</div>
		    	<div class="slot-5 empty" data-blocktype="empty">0</div>
		    	<div class="slot-6 empty" data-blocktype="empty">0</div>
		    	<div class="slot-7 empty" data-blocktype="empty">0</div>
		    	<div class="slot-8 empty" data-blocktype="empty">0</div>
		    	<div class="slot-9 empty" data-blocktype="empty">0</div>
		    	<div class="slot-10 empty" data-blocktype="empty">0</div>
		    	<div class="slot-11 empty" data-blocktype="empty">0</div>
		    	<div class="slot-12 empty" data-blocktype="empty">0</div>
		    	<div class="slot-13 empty" data-blocktype="empty">0</div>
		    	<div class="slot-14 empty" data-blocktype="empty">0</div>
		    	<div class="slot-15 empty" data-blocktype="empty">0</div>
		    	<div class="slot-16 empty" data-blocktype="empty">0</div>
		    	<div class="slot-17 empty" data-blocktype="empty">0</div>
		    	<div class="slot-18 empty" data-blocktype="empty">0</div>
		    	<div class="slot-19 empty" data-blocktype="empty">0</div>
		    	<div class="slot-20 empty" data-blocktype="empty">0</div>
		    	<div class="slot-21 empty" data-blocktype="empty">0</div>
		    	<div class="slot-22 empty" data-blocktype="empty">0</div>
		    	<div class="slot-23 empty" data-blocktype="empty">0</div>
		    	<div class="slot-24 empty" data-blocktype="empty">0</div>
		    	<div class="slot-25 empty" data-blocktype="empty">0</div>
		    	<div class="slot-26 empty" data-blocktype="empty">0</div>
		    	<div class="slot-27 empty" data-blocktype="empty">0</div>
		    	<div class="slot-28 empty" data-blocktype="empty">0</div>
		    	<div class="slot-29 empty" data-blocktype="empty">0</div>
		    	<div class="slot-30 empty" data-blocktype="empty">0</div>
		    	<div class="slot-31 empty" data-blocktype="empty">0</div>
		    	<div class="slot-32 empty" data-blocktype="empty">0</div>
		    	<div class="slot-33 empty" data-blocktype="empty">0</div>
		    	<div class="slot-34 empty" data-blocktype="empty">0</div>
		    	<div class="slot-35 empty" data-blocktype="empty">0</div>
		    	<div class="slot-36 empty" data-blocktype="empty">0</div>
		    	<div class="slot-37 empty" data-blocktype="empty">0</div>
		    	<div class="slot-38 empty" data-blocktype="empty">0</div>
		    	<div class="slot-39 empty" data-blocktype="empty">0</div>
		    	<div class="slot-40 empty" data-blocktype="empty">0</div>
		    	<div class="slot-41 empty" data-blocktype="empty">0</div>
		    	<div class="slot-42 empty" data-blocktype="empty">0</div>
		    	<div class="slot-43 empty" data-blocktype="empty">0</div>
		    	<div class="slot-44 empty" data-blocktype="empty">0</div>
		    </div>
		    
			<div class="crafting-table-wrap horizonal-spacing clearfix">
			    <div class="the-fucking-crafting-table">
			    
			    	<div class="block slot-1 empty" data-blocktype="empty"></div>
			    	<div class="block slot-2 empty" data-blocktype="empty"></div>
			    	<div class="block slot-3 empty" data-blocktype="empty"></div>
			    	
			    </div>
			    <!--<img src="img/arrow-right.png">-->
			    <div class="the-fucking-crafted-item">
			    
			    	<div class="slot empty" data-blocktype="empty"></div>
			    	
			    </div>

		    </div>

		    <div class="the-fucking-navigation clearfix">
                <nav class="beaudryland-nav">
                  <ul>
                  	<li class="nav-username">
                  		<?php if(isset($_SESSION['username'])){echo $_SESSION['username'];} ?>
                  	</li>
                    <li class="link-savemap">
                      <div class="button-wrap">
                        <a>Save</a>
                      </div>
                    </li>
                    <li class="link-multiplayer">
                      <div class="button-wrap">
                        <a target="_blank" href="mapgallery.php">Globe</a>
                      </div>
                    </li>
                    <li class="link-help">
                      <div class="button-wrap">
                        <a href="#help">Help</a>
                      </div>
                    </li>
                    <li class="link-logout">
                      <div class="button-wrap">
                        <a href="logout.php">Logout</a>
                      </div>
                    </li>
                  </ul>
                </nav>
            </div>

		</div>

	    
	    <!--
        <nav class="mapnav">
	        <a class="link-mapanimate-start" href="javascript:moveMap()">Animate Map</a> | 
	        <a class="link-mapanimate-stop" href="javascript:stopMap()">Stop Map</a>
        </nav>
        -->
        
        <div class="the-fucking-controller">
        
        	<div class="d-pad">
        		<div href="javascript:void(0)" class="btn-up"></div>
        		<div href="javascript:void(0)" class="btn-down"></div>
        		<div href="javascript:void(0)" class="btn-left"></div>
        		<div href="javascript:void(0)" class="btn-right"></div>
        	</div>
        	<div href="javascript:void(0)" class="btn-a"></div>
        	
        </div>
        
               
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
        	<?php 
        	foreach(glob('img/*.*') as $filename){
        	     echo '<img src="'.$filename.'" />';
        	}
        	?>
        </div>

        <script>window.jQuery || document.write('<script src="js/vendor/jquery-2.1.1.js"><\/script>')</script>
        <script src="js/vendor/jquery.color.js"></script>
        <script src="js/vendor/timbre.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/beaudryland.js"></script>

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