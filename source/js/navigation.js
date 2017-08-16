export var initializeNavigation = function(testVar, testObject) {

	console.log("** INIT NAVIGATION **");

	$('.nav-toggle-inventory').on("click", function() {
		if ( $('body').hasClass("version-phonegap") ) {
			$('.the-fucking-navigation').hide();
			$('.the-fucking-inventory').toggle();
		} else {
			$('.the-fucking-inventory').toggleClass("the-fucking-inventory-collapsed");
		}
	});

	$('.nav-toggle-menu').on("click", function() {
		if ( $('body').hasClass("version-phonegap") ) {
			$('.the-fucking-inventory').hide();
			$('.the-fucking-navigation').toggle();
		} else {
			$('.nav-extra').toggle();
		}
	});

};