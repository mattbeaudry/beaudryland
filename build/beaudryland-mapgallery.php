<?php 
	ob_start(); session_start();
	if ($_SESSION['username']){ $loggedin = true; } else { $loggedin=false; } 
?>

<?php include 'header.php'; ?>
    
    <body class="page-mapgallery">
        
        <div class="the-fucking-header">
        
	        <h1 class="logo-beaudryland"><img src="img/block-tree.png" title="Beaudryland Tree Logo" />Beaudryland</h1>
	        
	        <div class="the-fucking-user clearfix">
	        	<nav class="beaudryland-nav">
	        		<?php if ($loggedin) { ?>
		        		<ul>
		        			<li><a class="button-black" href="beaudryland.php">back to game</a></li>
	        				<li><span class="button-black"><?php echo $_SESSION['username']; ?></span></li>
	        				<li><a class="link-logout button-black" href="logout.php">logout</a></li>
	        			</ul>	
	        		<?php } else { ?>
	        			<ul>
		        			<li><a href="beaudryland.php">What is Beaudryland?</a></li>
		        		</ul>
	        		<?php } ?>
	        	</nav>
	        </div>
 
	    </div>
	    
	    <div class="the-fucking-map-gallery">
	    
	    	<!--<p>Each one of these squares belongs to a fellow beaudrylander.</p>-->
	    	
	    </div>
	    
        <!--
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        -->
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-2.1.1.js"><\/script>')</script>
        <script src="js/plugins.js"></script>

        <script type="text/javascript">

			//$('.the-fucking-map-gallery').css("width","800px");
        
			loadUserMaps = function(){
			
				console.log("load user maps");
			
				$.post('php/getmapgallery.php', {}, function(usermapdata) {
					
					//console.log("usermapdata:"+usermapdata);
					
					$(".the-fucking-map-gallery").append(usermapdata);
					
					//alert(usermapdata);
			        
			    });
			    
			};
			
			loadUserMaps();


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
<?php
ob_end_flush();
?>