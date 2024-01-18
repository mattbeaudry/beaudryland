import { WavyJones } from './vendor/wavy-jones.js';
var Reverb = require('soundbank-reverb');
import * as globals from './globals';
import { Utility } from './utility'; 
import { Achievement } from './achievement'; 
var blUtil = new Utility();

export class Sound {

	constructor() {
		this.guitarFirstNote = true;
		this.keyboardFirstNote = true;
		this.drumsFirstNote = true;
		this.sound = new AudioContext;
		this.drumToggle = false;
	}

	playInstrumentNote(instrument, direction) {
		console.log("playInstrumentNote");
		let pitch = 880;

		switch (direction) {
			case 'up':
				pitch = 440;
				break;
			case 'down':
				pitch = 523;
				break;
			case 'right':
				pitch = 587;
				break;
			case 'left':
				pitch = 659;
				break;
		}

		switch (instrument) {
			case 'guitar':
				this.playGuitar(pitch);
				break;
			case 'piano':
				this.playSound(pitch);
				break;
			case 'trumpet':
				this.playTrumpet(pitch);
				break;
			case 'bass':
				this.playBass(pitch);
				break;
			case 'drumsticks':
				this.playDrums();
				break;
		}

	}

	playSound(freq) {
		console.log("playSound");
		var time = this.sound.currentTime;
		var maxDelayTime = 5;
		this.sound.osc = this.sound.createOscillator();
		this.sound.gain = this.sound.createGain();
		//this.sound.delay = this.sound.createDelay(maxDelayTime);

		this.sound.osc.connect(this.sound.gain);
		this.sound.gain.connect(this.sound.destination);

		this.sound.osc.frequency.setValueAtTime(freq, time);
		this.sound.gain.gain.setValueAtTime(0.05, time);

		this.sound.osc.start(time);
		//this.sound.delay.connect(this.sound.destination);
		this.sound.osc.stop(time + 0.2);
	}

	// playPiano(freq) {
	// 	sin = T("sin", freq);
	// 	env = T("adsr", 10, 500);
	// 	syn = T("*", sin, env).play();
	// 	sin.bang();
	// 	env.bang();
	// }

	playGuitar(freq) {
		// Create an oscillator to generate the guitar string sound
		const oscillator = this.sound.createOscillator();

		// Create an envelope generator for the volume
		const envelope = this.sound.createGain();

		// Connect the oscillator to the envelope and the envelope to the destination (speakers)
		oscillator.connect(envelope);
		envelope.connect(this.sound.destination);

		// Set the oscillator type to a "sawtooth" wave for a guitar-like sound
		oscillator.type = 'sawtooth';

		// Set the initial frequency and detune it slightly for a more natural sound
		oscillator.frequency.setValueAtTime(220, this.sound.currentTime);
		oscillator.detune.setValueAtTime(5, this.sound.currentTime);

		// Set the envelope parameters (attack, decay, sustain, release)
		envelope.gain.setValueAtTime(0, this.sound.currentTime);
		envelope.gain.linearRampToValueAtTime(0.1, this.sound.currentTime + 0.01); // Attack
		envelope.gain.linearRampToValueAtTime(0.05, this.sound.currentTime + 0.2); // Decay
		envelope.gain.setValueAtTime(0.025, this.sound.currentTime + 0.5); // Sustain
		envelope.gain.linearRampToValueAtTime(0, this.sound.currentTime + 1); // Release
		// Start the oscillator
		oscillator.start();

		// Stop the oscillator after the desired duration (in seconds)
		const duration = 1; // Adjust this to control the duration of the plucking sound
		oscillator.stop(this.sound.currentTime + duration);
	}

	playBass(freq) {
		  // Create an oscillator to generate the bass guitar string sound
		  const oscillator = this.sound.createOscillator();

		  // Create an envelope generator for the volume
		  const envelope = this.sound.createGain();
		
		  // Connect the oscillator to the envelope and the envelope to the destination (speakers)
		  oscillator.connect(envelope);
		  envelope.connect(this.sound.destination);
		
		  // Set the oscillator type to a "sine" wave for a deep bass-like sound
		  oscillator.type = 'sine';
		
		  // Set the initial frequency and detune it slightly for a more natural sound
		  oscillator.frequency.setValueAtTime(80, this.sound.currentTime); // Adjust this value for the desired bass pitch
		  oscillator.detune.setValueAtTime(0, this.sound.currentTime);
		
		  // Set the envelope parameters (attack, decay, sustain, release)
		  envelope.gain.setValueAtTime(0, this.sound.currentTime);
		  envelope.gain.linearRampToValueAtTime(0.1, this.sound.currentTime + 0.01); // Attack
		  envelope.gain.linearRampToValueAtTime(0.05, this.sound.currentTime + 0.2); // Decay
		  envelope.gain.setValueAtTime(0.05, this.sound.currentTime + 0.5); // Sustain
		  envelope.gain.linearRampToValueAtTime(0, this.sound.currentTime + 1); // Release
		
		  // Start the oscillator
		  oscillator.start();
		
		  // Stop the oscillator after the desired duration (in seconds)
		  const duration = 1; // Adjust this to control the duration of the plucking sound
		  oscillator.stop(this.sound.currentTime + duration);
	}

	playTrumpet(freq) {
		// Create an oscillator to generate the main trumpet tone
		const mainOscillator = this.sound.createOscillator();
		mainOscillator.type = 'sawtooth'; // Adjust the type for the desired tone
	  
		// Create an oscillator for the trumpet-like timbre
		const timbreOscillator = this.sound.createOscillator();
		timbreOscillator.type = 'sine'; // Adjust the type for the desired timbre
	  
		// Create an envelope generator for the volume
		const envelope = this.sound.createGain();
	  
		// Connect the oscillators to the envelope and the envelope to the destination (speakers)
		mainOscillator.connect(envelope);
		timbreOscillator.connect(envelope);
		envelope.connect(this.sound.destination);
	  
		// Set the initial frequencies and detune for both oscillators
		mainOscillator.frequency.setValueAtTime(220, this.sound.currentTime); // Adjust the frequency as needed
		mainOscillator.detune.setValueAtTime(0, this.sound.currentTime);
		timbreOscillator.frequency.setValueAtTime(880, this.sound.currentTime); // Adjust the frequency as needed
		timbreOscillator.detune.setValueAtTime(0, this.sound.currentTime);
	  
		// Set the envelope parameters (attack, decay, sustain, release)
		envelope.gain.setValueAtTime(0, this.sound.currentTime);
		envelope.gain.linearRampToValueAtTime(0.1, this.sound.currentTime + 0.1); // Attack
		envelope.gain.linearRampToValueAtTime(0.07, this.sound.currentTime + 0.3); // Decay
		envelope.gain.setValueAtTime(0.05, this.sound.currentTime + 0.5); // Sustain (adjust as needed)
		envelope.gain.linearRampToValueAtTime(0, this.sound.currentTime + 0.7); // Release
	  
		// Start the oscillators
		mainOscillator.start();
		timbreOscillator.start();
	  
		// Stop the oscillators after the desired duration (in seconds)
		const duration = 0.7; // Adjust this to control the duration of the trumpet-like sound
		mainOscillator.stop(this.sound.currentTime + duration);
		timbreOscillator.stop(this.sound.currentTime + duration);
	}

	playSnare() {
		// Create a noise generator using a buffer source
		const noiseBuffer = this.sound.createBuffer(1, this.sound.sampleRate * 0.1, this.sound.sampleRate);
		const noiseData = noiseBuffer.getChannelData(0);
		for (let i = 0; i < noiseData.length; i++) {
			noiseData[i] = Math.random() * 2 - 1; // Generate white noise
		}
		const noiseSource = this.sound.createBufferSource();
		noiseSource.buffer = noiseBuffer;

		// Create an envelope generator for the volume
		const envelope = this.sound.createGain();

		// Connect the noise source to the envelope and the envelope to the destination (speakers)
		noiseSource.connect(envelope);
		envelope.connect(this.sound.destination);

		// Set the envelope parameters (fast attack and decay for a short, snappy sound)
		envelope.gain.setValueAtTime(0.1, this.sound.currentTime);
		envelope.gain.exponentialRampToValueAtTime(0.001, this.sound.currentTime + 0.02); // Fast decay

		// Start the noise source
		noiseSource.start();

		// Stop the noise source after the desired duration (in seconds)
		const duration = 0.2; // Adjust this to control the duration of the snare drum sound
		noiseSource.stop(this.sound.currentTime + duration);
	}

	playKick() {
		// Create an oscillator to generate the bass drum sound (sine wave for a thud-like sound)
		const oscillator = this.sound.createOscillator();
		oscillator.type = 'sine';

		// Create an envelope generator for the volume
		const envelope = this.sound.createGain();

		// Connect the oscillator to the envelope and the envelope to the destination (speakers)
		oscillator.connect(envelope);
		envelope.connect(this.sound.destination);

		// Set the oscillator frequency (adjust as needed for the desired pitch)
		oscillator.frequency.setValueAtTime(80, this.sound.currentTime); // Adjust the frequency as needed

		// Set the envelope parameters (fast attack and decay for a short, punchy sound)
		envelope.gain.setValueAtTime(0.1, this.sound.currentTime);
		envelope.gain.exponentialRampToValueAtTime(0.001, this.sound.currentTime + 0.2); // Fast decay

		// Start the oscillator
		oscillator.start();

		// Stop the oscillator after the desired duration (in seconds)
		const duration = 0.2; // Adjust this to control the duration of the bass drum sound
		oscillator.stop(this.sound.currentTime + duration);
	}

	playDrums() {
		if (this.drumToggle) {
			this.playSnare();
		} else {
			this.playKick();
		}
		this.drumToggle = !this.drumToggle;
		// achievementCompleted("jammingout");
		//unlock beach map
		// if ((this.drumsFirstNote == true) && ($('.the-fucking-space-map').length == 0)){ 
		// 	drawNewSpaceMap(); 
		// 	//createBeachSigns();
		// 	this.keyboardFirstNote = false; 
		// }
		// sin = T("sin", freq);
		// env = T("adsr", 10, 500);
		// syn = T("*", sin, env).play();
		// sin.bang();
		// env.bang();

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

}

	// todo move to synth.js 

// 	setupSynth() {
// 		var context = new AudioContext;
// 		var oscillator = context.createOscillator();
// 		var oscilloscope = new WavyJones(context, 'oscilloscope');
// 		oscilloscope.lineColor = '#FFFFFF';
// 		oscilloscope.lineThickness = 2;

// 		function buiSynthKey(context) {
// 			this.context = context;
// 		};

// 		buiSynthKey.prototype.setup = function() {
// 			this.osc = this.context.createOscillator();
// 			this.gain = this.context.createGain();
// 			this.delay = this.context.createDelay();
// 			this.feedback = this.context.createGain();
// 			this.filter = this.context.createBiquadFilter();
// 			this.reverb = Reverb(this.context);

// 			this.osc.connect(this.filter);
// 			this.filter.connect(this.gain);

// 			this.gain.connect(this.delay);
// 			this.delay.connect(this.feedback);
// 			this.feedback.connect(this.filter);
// 		  this.feedback.connect(this.delay);
// 		  this.feedback.connect(this.context.destination);

// 		 	this.gain.connect(this.reverb); 
// 			this.reverb.connect(oscilloscope);
// 			oscilloscope.connect(this.context.destination);
// 		};

// 		buiSynthKey.prototype.trigger = function(time, freq, gain, sustain, wave, delay, feedback, filter, filtertype, filterq, reverbtime) {
// 			this.setup();
// 			this.osc.frequency.setValueAtTime(freq, time);
// 			this.osc.type = wave;

// 			this.delay.delayTime.value = delay;
// 			this.feedback.gain.value = feedback;
// 			this.filter.frequency.value = filter;
// 			this.filter.type = filtertype;
// 			this.filter.Q.value = filterq;

// 			this.reverb.time = reverbtime; //seconds
// 			this.reverb.wet.value = 0.8;
// 			this.reverb.dry.value = 1;

// 			this.reverb.filterType = 'lowpass';
// 			this.reverb.cutoff.value = 8000; //Hz

// 			this.osc.start(time);
// 			this.gain.gain.setValueAtTime(0, time);
// 			this.gain.gain.linearRampToValueAtTime(gain, time + 0.01);
// 			this.gain.gain.exponentialRampToValueAtTime(0.001, time + sustain);
// 			this.osc.stop(time + sustain);
// 		};

// 		$('.bui-synth-keys .bui-key').on("click", function() {
// 			var gain = $('#bui-synth-gain').val();
// 			gain = gain / 100;
// 			gain = gain * 0.10;
// 			var sustain = $('#bui-synth-sustain').val();
// 			sustain = (sustain / 100) * 2;
// 			var delay = $('#bui-synth-delay').val();
// 			delay = delay / 100;
// 			var feedback = $('#bui-synth-feedback').val();
// 			feedback = feedback / 100;
// 			var filter = $('#bui-synth-filter').val();
// 			filter = filter / 100;
// 			filter = filter * 5000;
// 			var wave = $('#bui-synth-wave').val();
// 			var filtertype = $('#bui-synth-filtertype').val();
// 			var filterq = $('#bui-synth-q').val();
// 			var reverbtime = $('#bui-synth-reverb').val();
// 			reverbtime = (reverbtime / 100) * 10;

// 			var note = $(this).attr("data-key");
// 			var key = new buiSynthKey(context);
// 			var now = context.currentTime;
// 			var freq;

// 			switch(note) {
// 				case "c": freq = 523.25; break;
// 				case "cs": freq = 554.37; break;
// 				case "d": freq = 587.33; break;
// 				case "ds": freq = 622.25; break;
// 				case "e": freq = 659.25; break;
// 				case "f": freq = 698.46; break;
// 				case "fs": freq = 739.99; break;
// 				case "g": freq = 783.99; break;
// 				case "gs": freq = 830.61; break;
// 				case "a": freq = 880.00; break;
// 				case "as": freq = 932.33; break;
// 				case "b": freq = 987.77; break;
// 				case "c2": freq = 1046.50; break;
// 			}

// 			key.trigger(now, freq, gain, sustain, wave, delay, feedback, filter, filtertype, filterq, reverbtime);
// 		});

// 		$('.bui-drummachine .drummachine-step').on("click", function() {
// 			$(this).toggleClass('step-on');
// 		});

// 		var is_playing = false;
// 		var beatTime;
// 		var count = 1;

// 		function beatStep() {
// 			if (count % 4 == 0) {
// 				$('.drummachine-position').css("left", "7px");
// 			} else {
// 				var newPosX = $('.drummachine-position').css("left");
// 				newPosX = blUtil.stripPX(newPosX);
// 				newPosX += 20;
// 				newPosX = blUtil.addPX(newPosX);
// 				//alert(newPosX);
// 				$('.drummachine-position').css("left", newPosX);
// 			}
// 			beatTime = setTimeout(beatStep, 500); // repeat thought
// 			count++;
// 		}

// 		function beatPlay() {
// 			$('.drummachine-playstop span').html("stop");
// 			beatTime = setTimeout(beatStep, 500);
// 			is_playing = true;
// 		}

// 		function beatStop() {
// 			$('.drummachine-playstop span').html("play");
// 			is_playing = false;
// 			count = 1;
// 			clearTimeout(beatTime);
// 			$('.drummachine-position').css("left", "7px");
// 		}

// 		$('.drummachine-playstop').on("click", function() {
// 			if (is_playing) {
// 				// press stop
// 				beatStop();
// 			} else {
// 				// press play
// 				beatPlay();
// 			}
// 		});

// 		window.addEventListener('keydown', function(event) {
// 			switch (event.keyCode) {
// 				case 65: /* A */ $('.key-c').click(); break;
// 				case 87: /* W */ $('.key-cs').click(); break;
// 				case 83: /* S */ $('.key-d').click(); break;
// 				case 69: /* E */ $('.key-ds').click(); break;
// 				case 68: /* D */ $('.key-e').click(); break;
// 				case 70: /* F */ $('.key-f').click(); break;
// 				case 84: /* T */ $('.key-fs').click(); break;
// 				case 71: /* G */ $('.key-g').click(); break;
// 				case 89: /* Y */ $('.key-gs').click(); break;
// 				case 72: /* H */ $('.key-a').click(); break;
// 				case 85: /* U */ $('.key-as').click(); break;
// 				case 74: /* J */ $('.key-b').click(); break;
// 				case 75: /* K */ $('.key-c2').click(); break;

// 				case 49: /* 1 */ $('#bui-synth-kick').click(); break;
// 				case 50: /* 2 */ $('#bui-synth-snare').click(); break;
// 				// case 51: /* 3 */ $('.bui-synth-hh').click(); break;
// 				// case 52: /* 4 */ $('.bui-synth-openhh').click(); break;
// 				// case 53: /* 5 */ $('.bui-synth-crash').click(); break;
// 				// case 54: /* 6 */ $('.bui-synth-tom1').click(); break;
// 				// case 55: /* 7 */ $('.bui-synth-tom2').click(); break;
// 				// case 56: /* 8 */ $('.bui-synth-cowbell').click(); break;

// 				default: 
// 					break;
// 			}
// 		});

// 	}

// 	setupDrums() {

// 		var context = new AudioContext;
// 		var oscillator = context.createOscillator();

// 		/* KICK DRUM */

// 		function blKick(context) {
// 		  this.context = context;
// 		};

// 		blKick.prototype.setup = function() {
// 		  this.osc = this.context.createOscillator();
// 		  this.gain = this.context.createGain();
// 		  this.osc.connect(this.gain);
// 		  this.gain.connect(this.context.destination)
// 		};

// 		blKick.prototype.trigger = function(time) {
// 		  this.setup();
// 		  this.osc.frequency.setValueAtTime(150, time);
// 		  this.gain.gain.setValueAtTime(1, time);
// 		  this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
// 		  this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
// 		  this.osc.start(time);
// 		  this.osc.stop(time + 0.5);
// 		};

// 		$('#bui-synth-kick').on("click", function() {
// 		  var kick = new blKick(context);
// 		  var now = context.currentTime;
// 		  kick.trigger(now); //kick.trigger(now + 0.5);
// 		});

// 		/* SNARE DRUM */

// 		function blSnare(context) {
// 			this.context = context;
// 		};

// 		blSnare.prototype.noiseBuffer = function() {
// 			var bufferSize = this.context.sampleRate;
// 			var buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
// 			var output = buffer.getChannelData(0);
// 			for (var i = 0; i < bufferSize; i++) {
// 				output[i] = Math.random() * 2 - 1;
// 			}
// 			return buffer;
// 		};

// 		blSnare.prototype.setup = function() {
// 			this.noise = this.context.createBufferSource();
// 			this.noise.buffer = this.noiseBuffer();
// 			var noiseFilter = this.context.createBiquadFilter();
// 			noiseFilter.type = 'highpass';
// 			noiseFilter.frequency.value = 1000;
// 			this.noise.connect(noiseFilter);
		  
// 			this.noiseEnvelope = this.context.createGain();
// 			noiseFilter.connect(this.noiseEnvelope);
// 			this.noiseEnvelope.connect(this.context.destination);

// 			this.osc = this.context.createOscillator();
// 			this.osc.type = 'triangle';
// 			this.oscEnvelope = this.context.createGain();
// 			this.osc.connect(this.oscEnvelope);
// 			this.oscEnvelope.connect(this.context.destination);
// 		};

// 		blSnare.prototype.trigger = function(time) {
// 			this.setup();

// 			this.noiseEnvelope.gain.setValueAtTime(1, time);
// 			this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
// 			this.noise.start(time);

// 			this.osc.frequency.setValueAtTime(100, time);
// 			this.oscEnvelope.gain.setValueAtTime(0.7, time);
// 			this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
// 			this.osc.start(time);

// 			this.osc.stop(time + 0.2);
// 			this.noise.stop(time + 0.2);
// 		};

// 		$('#bui-synth-snare').on("click", function() {
// 		  var snare = new blSnare(context);
// 		  var now = context.currentTime;
// 		  snare.trigger(now);
// 		});
// 	}

// }

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
