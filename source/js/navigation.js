export var initializeNavigation = function (testVar, testObject) {
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

	document.querySelector('.tabs-close').style.display = 'none';
	[...document.querySelectorAll('.tabs .tab')].forEach((t) => (t.style.display = 'none'));
	document.querySelector('.tab-game').style.display = '';

	[...document.querySelectorAll('.tab-menuitem')].forEach(function (el) {
		el.addEventListener('click', function () {
			var tabName = el.getAttribute('data-tabmenu');
			// console.log("tabName:"+tabName);
			[...document.querySelectorAll('.tabs .tab')].forEach((t) => (t.style.display = 'none'));
			document.querySelector('.' + tabName).style.display = '';
			document.querySelector('.tabs-close').style.display = '';
		});
	});

	document.querySelector('.tabs-close').addEventListener('click', function () {
		[...document.querySelectorAll('.tabs .tab')].forEach((t) => (t.style.display = 'none'));
		document.querySelector('.tab-game').style.display = '';
		document.querySelector('.tabs-close').style.display = 'none';
	});
};
