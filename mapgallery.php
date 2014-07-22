<?php
ob_start();
session_start();
if ($_SESSION['username']){$loggedin = true;}else{$loggedin=false;}
?>
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
        <meta name="viewport" content="user-scalable=no,width=device-width">
        
        <link href="favicon.ico" rel="icon" type="image/x-icon" />
        <link rel="apple-touch-icon" href="apple-touch-icon-144x144-precomposed.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="apple-touch-icon-57x57-precomposed.png" />
		<link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-72x72-precomposed.png" />
		<link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-114x114-precomposed.png" />
		<link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-144x144-precomposed.png" />

		<link href="http://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/blocks.css">
        
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    
    <body class="page-mapgallery">
        
        <div class="the-fucking-header container">
        
	        <h1 class="logo-beaudryland"><img src="img/block-tree.png" title="Beaudryland Tree Logo" />Beaudryland</h1>
	        
	        <div class="the-fucking-user clearfix">
	        	<nav class="beaudryland-nav">
	        		<?php if ($loggedin) { ?>
		        		<ul>
		        			<li><a href="beaudryland.php">back to game</a></li>
	        				<li><?php echo $_SESSION['username']; ?> | <a class="link-logout" href="logout.php">logout</a></li>
	        			</ul>	
	        		<?php } else { ?>
	        			<ul>
		        			<li><a href="beaudryland.php">What is Beaudryland?</a></li>
		        		</ul>
	        		<?php } ?>
	        	</nav>
	        </div>
 
	    </div>
	    
	    
	    
	    <div class="the-fucking-map-gallery container">
	    
	    	<!--<p>Each one of these squares belongs to a fellow beaudrylander.</p>-->
	    	
	    </div>
	    
        <!--
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        -->
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-2.0.0.min.js"><\/script>')</script>
        <script src="js/vendor/jquery.color.js"></script>
        <script src="js/vendor/timbre.js"></script>
        <script src="js/plugins.js"></script>
        <!--<script src="js/beaudryland.js"></script>-->

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