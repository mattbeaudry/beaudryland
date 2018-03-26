import * as globals from './globals';

export class UI {

	constructor() {

	}

	setupUI() {

		// COLOR PICKER

		$('.bui-colorpicker .bui-colorpicker-input').on('click', function() {
			$(this).siblings('.bui-colorpalette').toggle();
		});

		$('.bui-colorpicker .bui-colorpalette .bui-swatch').on("click", function() {
		    var colorCode = $(this).css('background-color');
		    var colorInput = $(this).parents('.bui-colorpicker').children('.bui-colorpicker-input');
		    colorInput.css('background-color', colorCode);
		    colorInput.val(colorCode);
		    $(this).parents('.bui-colorpalette').toggle();
		});

	}

}