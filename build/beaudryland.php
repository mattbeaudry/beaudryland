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

	<body class="page-game version-desktop theme-day">

		<div class="container">

			<header class="game-header">
				<div class="header-nav">
					<div class="the-fucking-navigation clearfix">
						<nav class="beaudryland-nav">
							<div class="d-flex align-items-center justify-content-between">
								<div class="d-flex align-items-center">
									<a class="tabs-close bui-button" href="javascript:void(0);">
										<span>< BACK</span>
									</a><!--
									--><a class="tab-menuitem nav-selected-item block" href="javascript:void(0);" data-tabmenu="tab-inventory">
										<span></span>
									</a><!--
									--><a class="tab-menuitem bui-button button-icon" href="javascript:void(0);" data-tabmenu="tab-achievements">
										<i class="block i-check-white"></i>
									</a><!--
									--><a class="tab-menuitem bui-button" href="javascript:void(0);" data-tabmenu="tab-navigation">
										<span>?</span>
									</a>
								</div>
								<div>
									<a class="link-savemap bui-button" href="javascript:void(0);">Save</a>
									<div class="bui-menu">
					                    <button class="bui-menu-button bui-button">
					                    	<?php if(isset($_SESSION['username'])){echo $_SESSION['username'];} ?> +
					                    </button>
					                    <div class="bui-menu-dropdown bui-menu-left">
					                        <div class="bui-menu-item">
					                            <a href="beaudryland-account.php">Account</a>
					                        </div>
					                        <div class="bui-menu-item">
					                            <a class="link-logout" href="logout.php">Logout</a>
					                        </div>
					                    </div>
					                </div>
								</div>
							</div>
						</nav>
					</div>
				</div>
			</header>

			<div class="tab-game" data-tab="tab-game">
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
				    <div class="maps-wrap cube cube-show-front clearfix">
						<div class="test-satelite"></div>
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
			</div>

			<div class="tabs">

				<div class="tab tab-inventory" data-tab="tab-inventory">
					<section>
						<h2>Inventory</h2>
						<div class="the-fucking-inventory clearfix"></div>
						<div class="crafting-table-wrap horizonal-spacing clearfix">
							<div class="the-fucking-crafting-table pixel-corners">
								<div class="block slot-1 empty" data-blocktype="empty"></div>
								<div class="block slot-2 empty" data-blocktype="empty"></div>
								<div class="block slot-3 empty" data-blocktype="empty"></div>
							</div>
							<div class="the-fucking-crafted-item pixel-corners">
								<div class="slot empty" data-blocktype="empty"></div>
							</div>
						</div>
					</section>

					<table class="bl-table items-table">
						<thead>
							<tr>
                                <td>Image</td>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Recipe</td>
                                <td>Animated</td>
                                <td>Lifeform</td>
                                <td>Equipable</td>
                                <td>Useable</td>
                            </tr>
						</thead>
						<tbody>
							<?php include 'php/loaditems.php'; ?>
						</tbody>
					</table>
				</div>

				<div class="tab tab-navigation" data-tab="tab-navigation">
					<div class="the-fucking-navigation clearfix">
						<nav class="beaudryland-nav">

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
 
							<!-- 
							<h2>Game info</h2>
							<ul>
								<li class="link-help">
									<div class="button-wrap">
										<a class="tab-menuitem tab-help" data-tabmenu="tab-help" href="javascript:void(0)">Help</a>
									</div>
								</li>
								<li class="link-items">
									<div class="button-wrap">
										<a class="tab-menuitem tab-items" data-tabmenu="tab-items" href="javascript:void(0)">Items</a>
									</div>
								</li> 
								<li class="link-achievements">
									<div class="button-wrap button-wrap-large">
										<a class="tab-menuitem tab-achievements" data-tabmenu="tab-achievements" href="javascript:void(0)">Achievements</a>
									</div>
								</li>
								<li class="link-console">
									<div class="button-wrap button-wrap-large">
										<a class="tab-menuitem tab-devconsole" data-tabmenu="tab-devconsole" href="javascript:void(0)">Console</a>
									</div>
								</li>
							</ul>
 							-->

							<h2>Extras</h2>
							<ul class="nav-extra">
								<li class="link-mapeditor">
									<div class="button-wrap button-wrap-large button-wrap-outline">
										<a target="_blank" href="beaudryland-mapgallery.php">Map Gallery ></a>
									</div>
								</li>
								<li class="link-itemeditor">
									<div class="button-wrap button-wrap-large button-wrap-outline">
										<a target="_blank" href="beaudryland-itembuilder.php">Item Builder ></a>
									</div>
								</li>
								<li class="link-itemeditor">
									<div class="button-wrap button-wrap-large button-wrap-outline">
										<a target="_blank" href="beaudryland-paint.php">Sprite Painter ></a>
									</div>
								</li>
								<li class="link-mapeditor">
									<div class="button-wrap button-wrap-large button-wrap-outline">
										<a target="_blank" href="beaudryland-mapeditor.php">Map Editor ></a>
									</div>
								</li>
								<li class="link-synth">
									<div class="button-wrap button-wrap-large button-wrap-outline">
										<a target="_blank" href="beaudryland-synth.php">Synth ></a>
									</div>
								</li>
								<li class="link-pong">
									<div class="button-wrap button-wrap-large button-wrap-outline">
										<a target="_blank" href="beaudryland-pong.php">Pong ></a>
									</div>
								</li>
								<li class="link-ui">
									<div class="button-wrap button-wrap-large button-wrap-outline">
										<a target="_blank" href="beaudryland-ui.php">BL UI ></a>
									</div>
								</li>
							</ul>

							<div class="the-fucking-dev-panel">
								<h2>Developer Console</h2>
								<nav>
									<ul class="dev-console clearfix"></ul>
								</nav>
							</div>

						</nav>
					</div>
				</div>

				<div class="tab tab-achievements">
					<section>
						<a id="achievements"></a>
						<h2>Achievements</h2>

						<div class="gamestats bui-flex">
							<div class="gamestat completion">
								<span class="stat"><span class="completion-percentage">0</span>%</span><br>game completion
							</div>
							<div class="gamestat achievements">
								<span class="stat"><span class="achievements-complete">0</span>/<span class="achievements-total">12</span></span><br>achivements
							</div>
							<div class="gamestat items">
								<span class="stat"><span class="items-collected">0</span>/<span class="items-total">89</span></span><br>blocks
							</div>
							<div class="gamestat maps">
								<span class="stat"><span class="maps-unlocked">1</span>/<span class="maps-total">6</span></span><br>maps
							</div>
						</div>

						<table class="bl-table item-achievements clearfix">
							<thead>
								<tr>
									<td>Completed</td>
									<td>Achievement</td>
									<td>Description</td>
								</tr>
							</thead>
							<tbody>
								<tr data-achievementid="1" data-achievementname="genesis" class="achievement-genesis status-completed">
									<td class="achievement-completion"></td>
									<td>Genesis</td>
									<td>Created a new game and generated a randomized map.</td>
								</tr>
								<tr data-achievementid="2" data-achievementname="cuttingwood" class="achievement-cuttingwood">
									<td class="achievement-completion"></td>
									<td>Cutting Wood</td>
									<td>Cut down trees and use them to create wood blocks.</td>
								</tr>
								<tr data-achievementid="3" data-achievementname="keepingwarm" class="achievement-keepingwarm">
									<td class="achievement-completion"></td>
									<td>Keeping Warm</td>
									<td>Use rocks and wood to build a fire.</td>
								</tr>
								<tr data-achievementid="4" data-achievementname="saveyourgame" class="achievement-saveyourgame">
									<td class="achievement-completion"></td>
									<td>Save your Game</td>
									<td>Save your game for the first time. You should do tbis periodically whikle playing.</td>
								</tr>
								<tr data-achievementid="5" data-achievementname="treasurehunter" class="achievement-treasurehunter">
									<td class="achievement-completion"></td>
									<td>Treasure Hunter</td>
									<td>Build a shovel, learn how to dig, and find some treasure.</td>
								</tr>
								<tr data-achievementid="6" data-achievementname="takingshelter" class="achievement-takingshelter">
									<td class="achievement-completion"></td>
									<td>Taking Shelter</td>
									<td>Build a door and use some wood or solid blocks to create a cabin.</td>
								</tr>
								<tr data-achievementid="7" data-achievementname="playtheguitar" class="achievement-playtheguitar">
									<td class="achievement-completion"></td>
									<td>Play the guitar</td>
									<td></td>
								</tr>
								<tr data-achievementid="8" data-achievementname="playthekeys" class="achievement-playthekeys">
									<td class="achievement-completion"></td>
									<td>Play the keys</td>
									<td></td>
								</tr>
								<tr data-achievementid="9" data-achievementname="playthetrumpet" class="achievement-playthetrumpet">
									<td class="achievement-completion"></td>
									<td>Play the trumpet</td>
									<td></td>
								</tr>
								<tr data-achievementid="10" data-achievementname="playthebass" class="achievement-playthebass">
									<td class="achievement-completion"></td>
									<td>Play the bass</td>
									<td></td>
								</tr>
								<tr data-achievementid="11" data-achievementname="bringinthebeat" class="achievement-bringinthebeat">
									<td class="achievement-completion"></td>
									<td>Bring in the beat</td>
									<td></td>
								</tr>
								<tr data-achievementid="12" data-achievementname="gotospace" class="achievement-gotospace">
									<td class="achievement-completion"></td>
									<td>Go to space</td>
									<td></td>
								</tr>
							</tbody>
						</table>
						</section>
				</div>

			</div>

		</div>

		<!-- 
		<div class="sticky-inventory clearfix">
		
		</div> 

		<div id="react-map-test"></div>

		<div class="the-fucking-gameinfo">
        	
		</div>
		-->


        <!-- Dirty way to preload images -->
        <div class="preload-images visuallyhidden">
        	<?php foreach(glob('img/*.*') as $filename){ echo '<img src="'.$filename.'" />'; } ?>
        </div>

        <script>window.jQuery || document.write('<script src="js/vendor/jquery-2.1.1.js"><\/script>');</script>

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