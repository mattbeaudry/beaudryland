export var initializeNavigation = function(testVar, testObject) {

	console.log("** INIT NAVIGATION **");

	$('.nav-toggle-inventory').on("click", function() {
		if ( $('body').hasClass("version-phonegap") ) {
			$('.the-fucking-navigation').hide();
			$('.tab-inventory').toggle();
		} else {
			$('.tab-inventory').toggleClass("the-fucking-inventory-collapsed");
		}
	});

	$('.nav-toggle-menu').on("click", function() {
		if ( $('body').hasClass("version-phonegap") ) {
			$('.tab-inventory').hide();
			$('.the-fucking-navigation').toggle();
		} else {
			$('.nav-extra').toggle();
		}
	});

};