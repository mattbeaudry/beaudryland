export var initializeNavigation = function(testVar, testObject) {

	// console.log("** INIT NAVIGATION **");

	// $('.nav-toggle-inventory').on("click", function() {
	// 	if ( $('body').hasClass("version-phonegap") ) {
	// 		$('.the-fucking-navigation').hide();
	// 		$('.tab-inventory').toggle();
	// 	} else {
	// 		$('.tab-inventory').toggleClass("the-fucking-inventory-collapsed");
	// 	}
	// });

	// $('.nav-toggle-menu').on("click", function() {
	// 	if ( $('body').hasClass("version-phonegap") ) {
	// 		$('.tab-inventory').hide();
	// 		$('.the-fucking-navigation').toggle();
	// 	} else {
	// 		$('.nav-extra').toggle();
	// 	}
	// });
	
	$('.tabs-close').hide();
	$('.tabs .tab').hide();
	$('.tab-game').show();
	
	$('.tab-menuitem').on("click", function() {
		var tabName = $(this).attr("data-tabmenu");
		// console.log("tabName:"+tabName);
		$('.tabs .tab').hide();
		$('.'+tabName).show();
		$('.tabs-close').show();
	});

	$('.tabs-close').on("click", function() {
		$('.tabs .tab').hide();
		$('.tab-game').show();
		$('.tabs-close').hide();
	});

};