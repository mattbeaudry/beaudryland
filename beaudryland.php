<?php
session_start();
if (!(isset($_SESSION['username']) && $_SESSION['username'] != '')) {
	header("location:loginregister.php");
}
?>
<?php include 'header.php'; ?> 

	    <div class="maps-wrap container clearfix">
	    
	    	<div class="the-fucking-map" data-maptype="forest"></div>
	    	
	    </div>
		   
		<div class="sticky-inventory">
		
		    <div class="the-fucking-inventory container clearfix">
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
		    
			<div class="crafting-table-wrap container horizonal-spacing clearfix">
			    <div class="the-fucking-crafting-table">
			    
			    	<div class="slot-1 empty" data-blocktype="empty"></div>
			    	<div class="slot-2 empty" data-blocktype="empty"></div>
			    	<div class="slot-3 empty" data-blocktype="empty"></div>
			    	
			    </div>
			    <!--<img src="img/arrow-right.png">-->
			    <div class="the-fucking-crafted-item">
			    
			    	<div class="slot empty" data-blocktype="empty"></div>
			    	
			    </div>
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
		        
		        <ul class="item-formulas multi-column-2">
		        	<li>
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/arrow-right.png">
		        		<img src="img/block-wood.png" title="Wood">
		        	</li>
		        	<li>
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-shovel.png" title="Shovel">
		        	</li>
		        	<li>
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-sword.png" title="Sword">
		        	</li>
		        	<li>
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-axe.png" title="Axe">
		        	</li>
		        	<li>
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-fire-3.gif" title="Fire">
		        	</li>
		        	<li>
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-door-closed.png" title="Door">
		        	</li>
		        	<li>
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-guitar.png" title="Guitar">
		        	</li>
		        	<li>
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-silver.png" title="Silver">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-piano.png" title="Piano">
		        	</li>
		        	<li>
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-sign.png" title="Sign">
		        	</li>
		        	<li>
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-silver.png" title="Silver">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-spear.png" title="Spear">
		        	</li>
		        	<li>
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-diamond.png" title="Diamond">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-frisbee.png" title="Frisbee">
		        	</li>
		        	<li>
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-diamond.png" title="Diamond">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-bike.png" title="Bike">
		        	</li>
		        	<li>
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-diamond.png" title="Diamond">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-skiis.png" title="Skiis">
		        	</li>
		        	<li>
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-canoe.png" title="Canoe">
		        	</li>
		        	<li>
		        		<img src="img/block-wood.png" title="Wood">
		        		<img src="img/block-tree.png" title="Tree">
		        		<img src="img/block-oil.png" title="Oil">
		        		<img src="img/arrow-right.png">
		        		<img src="img/item-car.png" title="Car">
		        	</li>
		        	<li>
		        		<img src="img/block-clay.png" title="Clay">
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-clay.png" title="Clay">
		        		<img src="img/arrow-right.png">
		        		<img src="img/block-road.png" title="Road">
		        	</li>
		        	<li>
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/block-rock.png" title="Rock">
		        		<img src="img/arrow-right.png">
		        		<img src="img/block-rockbrick.png" title="Rock Bricks">
		        	</li>
		        	<li>
		        		<img src="img/block-icerock.png" title="Icerock">
		        		<img src="img/block-icerock.png" title="Icerock">
		        		<img src="img/block-icerock.png" title="Icerock">
		        		<img src="img/arrow-right.png">
		        		<img src="img/block-icerockbrick.png" title="Icerock Bricks">
		        	</li>
		        	<li>
		        		<img src="img/block-sandstone.png" title="Sandstone">
		        		<img src="img/block-sandstone.png" title="Sandstone">
		        		<img src="img/block-sandstone.png" title="Sandstone">
		        		<img src="img/arrow-right.png">
		        		<img src="img/block-sandstonebrick.png" title="Sandstone Bricks">
		        	</li>
		        	<li>
		        		<img src="img/block-clay.png" title="Clay">
		        		<img src="img/block-clay.png" title="Clay">
		        		<img src="img/block-clay.png" title="Clay">
		        		<img src="img/arrow-right.png">
		        		<img src="img/block-claybrick.png" title="Clay Bricks">
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

        <script>window.jQuery || document.write('<script src="js/vendor/jquery-2.0.0.min.js"><\/script>')</script>
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