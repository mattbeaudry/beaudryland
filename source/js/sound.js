import * as globals from './globals';

export class Sound {

	constructor() {
		this.guitarFirstNote = true;
		this.keyboardFirstNote = true;
		this.drumsFirstNote = true;
		var AudioContext = window.AudioContext // Default
    	|| window.webkitAudioContext // Safari and old versions of Chrome
    	|| false; 
		this.sound = new AudioContext;
	}

	playSound(freq) {
		var time = this.sound.currentTime;
		var maxDelayTime = 5;
		this.sound.osc = this.sound.createOscillator();
		this.sound.gain = this.sound.createGain();
		//this.sound.delay = this.sound.createDelay(maxDelayTime);

		this.sound.osc.connect(this.sound.gain);
		this.sound.gain.connect(this.sound.destination);

		this.sound.osc.frequency.setValueAtTime(freq, time);
		this.sound.gain.gain.setValueAtTime(0.02, time);

		this.sound.osc.start(time);
		//this.sound.delay.connect(this.sound.destination);
		this.sound.osc.stop(time + 0.2);
	}

	playPiano(freq) {
		achievementCompleted("jammingout");
		//unlock beach map
		if ((this.keyboardFirstNote == true) && ($('.the-fucking-beach-map').length == 0)){ 
			drawNewBeachMap(); 
			createBeachSigns();
			this.keyboardFirstNote = false; 
		}
		sin = T("sin", freq);
		env = T("adsr", 10, 500);
		syn = T("*", sin, env).play();
		sin.bang();
		env.bang();
	}

	playDrums(freq) {
		achievementCompleted("jammingout");
		//unlock beach map
		if ((this.drumsFirstNote == true) && ($('.the-fucking-space-map').length == 0)){ 
			drawNewSpaceMap(); 
			//createBeachSigns();
			this.keyboardFirstNote = false; 
		}
		sin = T("sin", freq);
		env = T("adsr", 10, 500);
		syn = T("*", sin, env).play();
		sin.bang();
		env.bang();
	}

	playMusic() {
		var mml = T("mml", "t100 o3 $ l2 a l1 <b0<d0g+>> l2 d l1 <a0<c+0f+>> l2 a l1 <b0<d0g+>> l2 f l1 <a0<c+0f+>>");     
		mml.synth = T("efx.reverb");
		mml.synthdef = function(freq, opts) {
		    var synth = T("*", T("+", 
		                       T("tri", freq - 1, 0.25)),
		                       T("adsr", "24db", 100, 2500, 0.6, 1500));
		    synth.keyon = function(opts) {
		        synth.args[1].bang();
		    };
		    synth.keyoff = function(opts) {
		        synth.args[1].keyoff();
		    };
		    return synth;
		};
		mml.synth.onplay = function() {
		    mml.on().bang();
		};
		mml.synth.onpause = function() {
		    mml.off();
		};
		mml.synth.play();
	}

	setupSynth() {

		var context = new AudioContext;
		var oscillator = context.createOscillator();

		function buiSynthKey(context) {
			this.context = context;
		};

		buiSynthKey.prototype.setup = function() {
			this.osc = this.context.createOscillator();
			this.gain = this.context.createGain();
			this.delay = this.context.createDelay();
			this.feedback = this.context.createGain();
			this.filter = this.context.createBiquadFilter();

			this.osc.connect(this.gain);
			this.delay.connect(this.feedback);
			this.feedback.connect(this.filter);
		    this.filter.connect(this.delay);
		    this.osc.connect(this.delay);
		    this.osc.connect(this.context.destination);
		    this.delay.connect(this.context.destination);
			this.gain.connect(this.context.destination);
		};

		buiSynthKey.prototype.trigger = function(time, freq, gain, sustain, wave, delay, feedback, filter) {
			this.setup();
			this.osc.frequency.setValueAtTime(freq, time);
			this.osc.type = wave;

			this.delay.delayTime.value = delay;
			this.feedback.gain.value = feedback;
			this.filter.frequency.value = filter;

			this.osc.start(time);
			this.gain.gain.setValueAtTime(0, time);
			this.gain.gain.linearRampToValueAtTime(gain, time + 0.01);
			this.gain.gain.exponentialRampToValueAtTime(0.001, time + sustain);
			this.osc.stop(time + sustain);

		};

		$('.bui-synth-keys .bui-key').on("click", function() {
			var gain = $('#bui-synth-gain').val();
			gain = gain / 100;
			var sustain = $('#bui-synth-sustain').val();
			sustain = (sustain / 100) * 2;
			var delay = $('#bui-synth-delay').val();
			delay = delay / 100;
			var feedback = $('#bui-synth-feedback').val();
			feedback = feedback / 100;
			var filter = $('#bui-synth-filter').val();
			filter = filter * 20;
			var wave = $('#bui-synth-wave').val();
			var note = $(this).attr("data-key");
			var key = new buiSynthKey(context);
			var now = context.currentTime;
			var freq;

			switch(note) {
				case "c": freq = 523.25; break;
				case "cs": freq = 554.37; break;
				case "d": freq = 587.33; break;
				case "ds": freq = 622.25; break;
				case "e": freq = 659.25; break;
				case "f": freq = 698.46; break;
				case "fs": freq = 739.99; break;
				case "g": freq = 783.99; break;
				case "gs": freq = 830.61; break;
				case "a": freq = 880.00; break;
				case "as": freq = 932.33; break;
				case "b": freq = 987.77; break;
				case "c2": freq = 1046.50; break;
			}

			key.trigger(now, freq, gain, sustain, wave, delay, feedback, filter);
		});

	}

	setupDrums() {

		var context = new AudioContext;
		var oscillator = context.createOscillator();

		/* KICK DRUM */

		function blKick(context) {
		  this.context = context;
		};

		blKick.prototype.setup = function() {
		  this.osc = this.context.createOscillator();
		  this.gain = this.context.createGain();
		  this.osc.connect(this.gain);
		  this.gain.connect(this.context.destination)
		};

		blKick.prototype.trigger = function(time) {
		  this.setup();
		  this.osc.frequency.setValueAtTime(150, time);
		  this.gain.gain.setValueAtTime(1, time);
		  this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
		  this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
		  this.osc.start(time);
		  this.osc.stop(time + 0.5);
		};

		$('#bui-synth-kick').on("click", function() {
		  var kick = new blKick(context);
		  var now = context.currentTime;
		  kick.trigger(now); //kick.trigger(now + 0.5);
		});

		/* SNARE DRUM */

		function blSnare(context) {
			this.context = context;
		};

		blSnare.prototype.noiseBuffer = function() {
			var bufferSize = this.context.sampleRate;
			var buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
			var output = buffer.getChannelData(0);
			for (var i = 0; i < bufferSize; i++) {
				output[i] = Math.random() * 2 - 1;
			}
			return buffer;
		};

		blSnare.prototype.setup = function() {
			this.noise = this.context.createBufferSource();
			this.noise.buffer = this.noiseBuffer();
			var noiseFilter = this.context.createBiquadFilter();
			noiseFilter.type = 'highpass';
			noiseFilter.frequency.value = 1000;
			this.noise.connect(noiseFilter);
		  
			this.noiseEnvelope = this.context.createGain();
			noiseFilter.connect(this.noiseEnvelope);
			this.noiseEnvelope.connect(this.context.destination);

			this.osc = this.context.createOscillator();
			this.osc.type = 'triangle';
			this.oscEnvelope = this.context.createGain();
			this.osc.connect(this.oscEnvelope);
			this.oscEnvelope.connect(this.context.destination);
		};

		blSnare.prototype.trigger = function(time) {
			this.setup();

			this.noiseEnvelope.gain.setValueAtTime(1, time);
			this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
			this.noise.start(time);

			this.osc.frequency.setValueAtTime(100, time);
			this.oscEnvelope.gain.setValueAtTime(0.7, time);
			this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
			this.osc.start(time);

			this.osc.stop(time + 0.2);
			this.noise.stop(time + 0.2);
		};

		$('#bui-synth-snare').on("click", function() {
		  var snare = new blSnare(context);
		  var now = context.currentTime;
		  snare.trigger(now);
		});
	}

}

// var context = new AudioContext;
// var oscillator = context.createOscillator();

// $('.play').on("click", function() {
//   oscillator = context.createOscillator();
//   oscillator.frequency = 261.6;
//   oscillator.connect(context.destination);
//   oscillator.start(0);
// });

// $('.stop').on("click", function() {
//   oscillator.stop(0);
// });




// $('.sequence-play').on("click", function() {
//   $('.step').addClass("");
// });
	