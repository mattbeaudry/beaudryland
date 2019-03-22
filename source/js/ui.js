import * as globals from './globals';

export class UI {

	constructor() {
		
	}

	setupUI() {

		// TOAST

		$('.bui-toast-trigger').on("click", function() {
			var toastText = $(this).attr("data-text");
			triggerToast(toastText);
		});

		var triggerToast = function(text) {
			var id = 1;
			var toastHtml = '<div id="toast-'+id+'" class="bui-toast bui-toast-white bui-toast-bottomright">';
			toastHtml += '<div class="bui-toast-close">X</div>';
			toastHtml += '<p>'+text+'</p>';
			toastHtml += '</div>';
			$('body').append(toastHtml);
			$('.bui-toast-close').on("click", function() {
				$(this).parents('.bui-toast').remove();
			});
			setTimeout(function() {
				console.log("timeout trig");
				$('#toast-'+id+'').remove();
			}, 5000);
		};


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

		$('.bui-colorpicker .bui-colorpicker-eraser').on("click", function() {
			var colorCode = 'transparent';
			var colorInput = $(this).parents('.bui-colorpicker').children('.bui-colorpicker-input');
			colorInput.css('background-color', colorCode);
			colorInput.val(colorCode);
		});

		$('.bui-menu').on("click", function() {
			if ($(this).children('.bui-menu-dropdown').is(":visible")) {
				$('.bui-menu-dropdown').hide();
				$(this).children('.bui-menu-dropdown').hide();
			} else {
				$('.bui-menu-dropdown').hide();
				$(this).children('.bui-menu-dropdown').show();
			}
		});


		// KNOB

		var tagBase = "knob";
		var newElms = ["input", "face", "hand"];
		var newPos;

		newElms.forEach(function(newElm) {
			document.registerElement(tagBase + "-" + newElm, {
				prototype: Object.create(HTMLElement.prototype)
			});
		});

		function rangeKnob(elm, progWidth, progColor, className) {
			var focused = null;
			var mouse = {};
			var speed =  1;
			var minVal, maxVal, min, max, degRange, valRange, rosetta, label, step, startingValue;

			if (!className) {
				className= "";
			}
		
			for (var i = 0; i<elm.length; i++) {
				var node = elm[i];
				step = node.getAttribute("step");
				maxVal = node.max;
				minVal = node.min;
				min = node.getAttribute("data-degree-offset");
				degRange = node.getAttribute("data-degree-range");
				max = parseInt(min) + parseInt(degRange);
				valRange = maxVal- minVal;
				rosetta = degRange / valRange;
				startingValue = node.getAttribute("value");	
				var parent = node.parentNode;
				var sibling = node.nextSibling;   	
				var wrapper = document.createElement("div");
				var knob = document.createElement(tagBase + "-input");
				knob.className = "knobInput " + className + " "+ node.className;
				node.className = node.className + " hidden";
				var face = document.createElement(tagBase + "-face");
				face.className = "knobInput-face";
				rotate(face, min);
				var label = document.createElement("label");
				label.className = "knobInput-label";
				var progress = document.createElement("canvas");
				progress.className = "knob-progress";
				label.innerHTML = node.value;
				knob.setAttribute("data-original-element", node.id);
				knob.setAttribute("data-rosetta", rosetta);
				knob.setAttribute("min", minVal);
				var hand = document.createElement(tagBase + "-hand");
				knob.appendChild(face);
				knob.appendChild(progress);
				knob.appendChild(label);
				face.appendChild(hand);
				knob.appendChild(node);

				if (sibling) {
					parent.insertBefore(knob, sibling)
				} else{
					parent.appendChild(knob);
				}

				if(startingValue) {
					var degrees = (startingValue - minVal) * rosetta;
					degrees = parseInt(degrees) + parseInt(min);
					rotate(face, degrees);
					var rad = parseInt(getCSS(face, "width"))/ 2;
				}
		        
				knob.addEventListener("mousedown", function(e){
					focused = this;
					mouse.clickPos = e.pageY;
					mouse.lastPos = e.pageY;
					document.body.className += "noSelection";
				});

				document.addEventListener("mousemove", function(e){
					if(focused){

						if(!mouse.lastPos){
							mouse.lastPos = mouse.clickPos;
						}

						var originalNode = focused.childNodes[3];
						var min = originalNode.getAttribute("data-degree-offset");
						var degRange = originalNode.getAttribute("data-degree-range");
						var max = parseInt(min) + parseInt(degRange);
						newPos = e.pageY;
						var diff = (mouse.lastPos - newPos) * speed;
						var rot = focused.firstChild.style.transform || 0; 

						if(rot !== 0){
							rot=parseInt(rot.replace("rotate(", "").replace("deg)", ""));
						}

						var newRot = rot + diff * speed; 

						if(newRot < min){
							newRot = min;
						}

						if(newRot > max){
							newRot = max;
						}

						var newVal = (newRot-min) / focused.getAttribute("data-rosetta") + parseInt(focused.getAttribute("min"));
						var step = originalNode.getAttribute("step");
						var stepped = (~~(newVal/step) * step);
						var lastVal = originalNode.value;
						originalNode.value = stepped;
						var rad = parseInt(getCSS(focused.firstChild, "width"))/ 2;

						if(stepped == minVal){
							clearCanvas(focused.firstChild.nextSibling);
						} else{
							drawArc(focused.firstChild.nextSibling, rad * 2, newRot, min, progWidth, progColor);
						}

						//focused.firstChild.style.transform = "rotate("+ newRot +"deg)";

						rotate(focused.firstChild, newRot);
						focused.childNodes[2].innerHTML = stepped;
						mouse.lastPos = newPos;

						if(lastVal !== stepped){ //only trigger event if value is new
							simulateEvent('input', originalNode);
						}
					}	
				});
			
				document.addEventListener("mouseup", function(e){
					focused = null;
					document.body.className = document.body.className.replace("noSelection", "");
				});
			
				var w = parseInt(getCSS(face, "width"));
				w = w + progWidth;
				progress.setAttribute("height", w * 2);
				progress.setAttribute("width", w * 2);
				progress.style.width = w+"px";
				progress.style.height = w+"px";
				face.style.marginTop = (progWidth/2)+"px";
				face.style.marginLeft = (progWidth/2)+"px";

				drawArc(progress, rad * 2, degrees, parseInt(min), progWidth, progColor);
			} //end loop

		}

		function clearCanvas(canvas){
			var ctx = canvas.getContext("2d");
			ctx.clearRect ( 0 , 0 , canvas.width,   canvas.height );
		}

		function drawArc(canvas, radius, deg, min, lw, col){
			//console.log(canvas, radius, deg, min, lw, col);
			var ctx = canvas.getContext("2d");
			clearCanvas(canvas);
			ctx.beginPath();          
			ctx.arc(canvas.width / 2, canvas.height / 2,radius, toRad(90 + parseInt(min)), toRad(90+ deg), false); 
			ctx.strokeStyle = col;
			ctx.lineWidth = lw * 2;
			ctx.stroke();
		}

		function simulateEvent(ev, elm) {
			var event = new Event('input', {
				'view': window
			});
			var cb = elm;
			cb.dispatchEvent(event);
		}

		function toRad(deg){
			var rad = deg / (180 / Math.PI);
			return rad;
		}

		function rotate(elm, deg){
			elm.style.transform = "rotate("+ deg +"deg)"; 
		}

		function getCSS(elm, prop){
			return window.getComputedStyle(elm, prop).getPropertyValue(prop);
		}

		// rangeKnob(document.querySelectorAll('.bui-knob-white'), 5, globals.buiColor["white"]);
		// rangeKnob(document.querySelectorAll('.bui-knob-blue'), 5, "#525AD9");
		// rangeKnob(document.querySelectorAll('.bui-knob-green'), 5, "#525AD9");
		// rangeKnob(document.querySelectorAll('.bui-knob-red'), 5, "#525AD9");
		// rangeKnob(document.querySelectorAll('.bui-knob-purple'), 5, "#525AD9");
		// rangeKnob(document.querySelectorAll('.bui-knob-orange'), 5, "#525AD9");
		
		rangeKnob(document.querySelectorAll('.bui-knob'), 5, "#FFFFFF");

	}

}