import { WavyJones } from './vendor/wavy-jones.js';
var Reverb = require('soundbank-reverb');
import * as globals from './globals';
import { Utility } from './utility';
import { Achievement } from './achievement';
var blUtil = new Utility();

export class Synth {
	constructor() {
		this.guitarFirstNote = true;
		this.keyboardFirstNote = true;
		this.drumsFirstNote = true;
		var AudioContext = window.AudioContext || false;
		this.sound = new AudioContext();
	}

	setupSynth() {
		var context = new AudioContext();
		var oscillator = context.createOscillator();
		var oscilloscope = new WavyJones(context, 'oscilloscope');
		oscilloscope.lineColor = '#FFFFFF';
		oscilloscope.lineThickness = 2;

		function buiSynthKey(context) {
			this.context = context;
		}

		buiSynthKey.prototype.setup = function () {
			this.osc = this.context.createOscillator();
			this.gain = this.context.createGain();
			this.delay = this.context.createDelay();
			this.feedback = this.context.createGain();
			this.filter = this.context.createBiquadFilter();
			this.reverb = Reverb(this.context);

			this.osc.connect(this.filter);
			this.filter.connect(this.gain);

			this.gain.connect(this.delay);
			this.delay.connect(this.feedback);
			this.feedback.connect(this.filter);
			this.feedback.connect(this.delay);
			this.feedback.connect(this.context.destination);

			this.gain.connect(this.reverb);
			this.reverb.connect(oscilloscope);
			oscilloscope.connect(this.context.destination);
		};

		buiSynthKey.prototype.trigger = function (
			time,
			freq,
			gain,
			sustain,
			wave,
			delay,
			feedback,
			filter,
			filtertype,
			filterq,
			reverbtime
		) {
			this.setup();
			this.osc.frequency.setValueAtTime(freq, time);
			this.osc.type = wave;

			this.delay.delayTime.value = delay;
			this.feedback.gain.value = feedback;
			this.filter.frequency.value = filter;
			this.filter.type = filtertype;
			this.filter.Q.value = filterq;

			this.reverb.time = reverbtime; //seconds
			this.reverb.wet.value = 0.8;
			this.reverb.dry.value = 1;

			this.reverb.filterType = 'lowpass';
			this.reverb.cutoff.value = 8000; //Hz

			this.osc.start(time);
			this.gain.gain.setValueAtTime(0, time);
			this.gain.gain.linearRampToValueAtTime(gain, time + 0.01);
			this.gain.gain.exponentialRampToValueAtTime(0.001, time + sustain);
			this.osc.stop(time + sustain);
		};

		[...document.querySelectorAll('.bui-synth-keys .bui-key')].forEach(function (keyEl) {
			keyEl.addEventListener('click', function () {
				var gain = document.querySelector('#bui-synth-gain').value;
				gain = gain / 100;
				gain = gain * 0.1;
				var sustain = document.querySelector('#bui-synth-sustain').value;
				sustain = (sustain / 100) * 2;
				var delay = document.querySelector('#bui-synth-delay').value;
				delay = delay / 100;
				var feedback = document.querySelector('#bui-synth-feedback').value;
				feedback = feedback / 100;
				var filter = document.querySelector('#bui-synth-filter').value;
				filter = filter / 100;
				filter = filter * 5000;
				var wave = document.querySelector('#bui-synth-wave').value;
				var filtertype = document.querySelector('#bui-synth-filtertype').value;
				var filterq = document.querySelector('#bui-synth-q').value;
				var reverbtime = document.querySelector('#bui-synth-reverb').value;
				reverbtime = (reverbtime / 100) * 10;

				var note = keyEl.getAttribute('data-key');
				var key = new buiSynthKey(context);
				var now = context.currentTime;
				var freq;

				switch (note) {
					case 'c':
						freq = 523.25;
						break;
					case 'cs':
						freq = 554.37;
						break;
					case 'd':
						freq = 587.33;
						break;
					case 'ds':
						freq = 622.25;
						break;
					case 'e':
						freq = 659.25;
						break;
					case 'f':
						freq = 698.46;
						break;
					case 'fs':
						freq = 739.99;
						break;
					case 'g':
						freq = 783.99;
						break;
					case 'gs':
						freq = 830.61;
						break;
					case 'a':
						freq = 880.0;
						break;
					case 'as':
						freq = 932.33;
						break;
					case 'b':
						freq = 987.77;
						break;
					case 'c2':
						freq = 1046.5;
						break;
				}

				key.trigger(
					now,
					freq,
					gain,
					sustain,
					wave,
					delay,
					feedback,
					filter,
					filtertype,
					filterq,
					reverbtime
				);
			});
		});

		[...document.querySelectorAll('.bui-drummachine .drummachine-step')].forEach(function (el) {
			el.addEventListener('click', function () {
				el.classList.toggle('step-on');
			});
		});

		var is_playing = false;
		var beatTime;
		var count = 1;

		function beatStep() {
			if (count % 4 == 0) {
				document.querySelector('.drummachine-position').style.left = '7px';
			} else {
				var newPosX = getComputedStyle(document.querySelector('.drummachine-position')).left;
				newPosX = blUtil.stripPX(newPosX);
				newPosX += 20;
				newPosX = blUtil.addPX(newPosX);
				//alert(newPosX);
				document.querySelector('.drummachine-position').style.left = newPosX;
			}
			beatTime = setTimeout(beatStep, 500); // repeat thought
			count++;
		}

		function beatPlay() {
			document.querySelector('.drummachine-playstop span').innerHTML = 'stop';
			beatTime = setTimeout(beatStep, 500);
			is_playing = true;
		}

		function beatStop() {
			document.querySelector('.drummachine-playstop span').innerHTML = 'play';
			is_playing = false;
			count = 1;
			clearTimeout(beatTime);
			document.querySelector('.drummachine-position').style.left = '7px';
		}

		document.querySelector('.drummachine-playstop').addEventListener('click', function () {
			if (is_playing) {
				// press stop
				beatStop();
			} else {
				// press play
				beatPlay();
			}
		});

		window.addEventListener('keydown', function (event) {
			switch (event.keyCode) {
				case 65:
					/* A */ document.querySelector('.key-c').dispatchEvent(new Event('click'));
					break;
				case 87:
					/* W */ document.querySelector('.key-cs').dispatchEvent(new Event('click'));
					break;
				case 83:
					/* S */ document.querySelector('.key-d').dispatchEvent(new Event('click'));
					break;
				case 69:
					/* E */ document.querySelector('.key-ds').dispatchEvent(new Event('click'));
					break;
				case 68:
					/* D */ document.querySelector('.key-e').dispatchEvent(new Event('click'));
					break;
				case 70:
					/* F */ document.querySelector('.key-f').dispatchEvent(new Event('click'));
					break;
				case 84:
					/* T */ document.querySelector('.key-fs').dispatchEvent(new Event('click'));
					break;
				case 71:
					/* G */ document.querySelector('.key-g').dispatchEvent(new Event('click'));
					break;
				case 89:
					/* Y */ document.querySelector('.key-gs').dispatchEvent(new Event('click'));
					break;
				case 72:
					/* H */ document.querySelector('.key-a').dispatchEvent(new Event('click'));
					break;
				case 85:
					/* U */ document.querySelector('.key-as').dispatchEvent(new Event('click'));
					break;
				case 74:
					/* J */ document.querySelector('.key-b').dispatchEvent(new Event('click'));
					break;
				case 75:
					/* K */ document.querySelector('.key-c2').dispatchEvent(new Event('click'));
					break;

				case 49:
					/* 1 */ document.querySelector('#bui-synth-kick').dispatchEvent(new Event('click'));
					break;
				case 50:
					/* 2 */ document.querySelector('#bui-synth-snare').dispatchEvent(new Event('click'));
					break;
				// case 51: /* 3 */ $('.bui-synth-hh').click(); break;
				// case 52: /* 4 */ $('.bui-synth-openhh').click(); break;
				// case 53: /* 5 */ $('.bui-synth-crash').click(); break;
				// case 54: /* 6 */ $('.bui-synth-tom1').click(); break;
				// case 55: /* 7 */ $('.bui-synth-tom2').click(); break;
				// case 56: /* 8 */ $('.bui-synth-cowbell').click(); break;

				default:
					break;
			}
		});
	}

	setupDrums() {
		var context = new AudioContext();
		var oscillator = context.createOscillator();

		/* KICK DRUM */

		function blKick(context) {
			this.context = context;
		}

		blKick.prototype.setup = function () {
			this.osc = this.context.createOscillator();
			this.gain = this.context.createGain();
			this.osc.connect(this.gain);
			this.gain.connect(this.context.destination);
		};

		blKick.prototype.trigger = function (time) {
			this.setup();
			this.osc.frequency.setValueAtTime(150, time);
			this.gain.gain.setValueAtTime(1, time);
			this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
			this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
			this.osc.start(time);
			this.osc.stop(time + 0.5);
		};

		document.querySelector('#bui-synth-kick').addEventListener('click', function () {
			var kick = new blKick(context);
			var now = context.currentTime;
			kick.trigger(now); //kick.trigger(now + 0.5);
		});

		/* SNARE DRUM */

		function blSnare(context) {
			this.context = context;
		}

		blSnare.prototype.noiseBuffer = function () {
			var bufferSize = this.context.sampleRate;
			var buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
			var output = buffer.getChannelData(0);
			for (var i = 0; i < bufferSize; i++) {
				output[i] = Math.random() * 2 - 1;
			}
			return buffer;
		};

		blSnare.prototype.setup = function () {
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

		blSnare.prototype.trigger = function (time) {
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

		document.querySelector('#bui-synth-snare').addEventListener('click', function () {
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
