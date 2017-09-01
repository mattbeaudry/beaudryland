import * as globals from './globals';

export class Sound {

	constructor() {
		this.guitarFirstNote = true;
		this.keyboardFirstNote = true;
		this.drumsFirstNote = true;
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

	// switch(note){
	//   case "c": freq = 150; break;
	//   case "d": freq = 175; break;
	//   case "e": freq = 200; break;
	//   case "f": freq = 225; break;
	//   case "g": freq = 250; break;
	//   case "a": freq = 300; break;
	//   case "b": freq = 350; break;
	//   case "c": freq = 400; break;
	//   case "d": freq = 450; break;
	//   case "e": freq = 500; break;
	// }

	// playSound(freq) {
	// 	achievementCompleted("jammingout");
	// 	//unlock winter map
	// 	if ((this.guitarFirstNote == true) && ($('.the-fucking-winter-map').length == 0)){ 
	// 		drawNewWinterMap(); 
	// 		createWinterSigns();
	// 		this.guitarFirstNote = false; 
	// 	}
	// 	sin = T("sin", freq);
	// 	env = T("adsr", 10, 500);
	// 	syn = T("*", sin, env).play();
	// 	sin.bang();
	// 	env.bang();
	// }

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

// /* KICK DRUM */

// function Kick(context) {
//   this.context = context;
// };

// Kick.prototype.setup = function() {
//   this.osc = this.context.createOscillator();
//   this.gain = this.context.createGain();
//   this.osc.connect(this.gain);
//   this.gain.connect(this.context.destination)
// };

// Kick.prototype.trigger = function(time) {
//   this.setup();
//   this.osc.frequency.setValueAtTime(150, time);
//   this.gain.gain.setValueAtTime(1, time);
//   this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
//   this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
//   this.osc.start(time);
//   this.osc.stop(time + 0.5);
// };

// $('.kick').on("click", function() {
//   var kick = new Kick(context);
//   var now = context.currentTime;
//   kick.trigger(now); //kick.trigger(now + 0.5);
// });

// /* SNARE DRUM */

// function Snare(context) {
// 	this.context = context;
// };

// Snare.prototype.noiseBuffer = function() {
// 	var bufferSize = this.context.sampleRate;
// 	var buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
// 	var output = buffer.getChannelData(0);
// 	for (var i = 0; i < bufferSize; i++) {
// 		output[i] = Math.random() * 2 - 1;
// 	}
// 	return buffer;
// };

// Snare.prototype.setup = function() {
// 	this.noise = this.context.createBufferSource();
// 	this.noise.buffer = this.noiseBuffer();
// 	var noiseFilter = this.context.createBiquadFilter();
// 	noiseFilter.type = 'highpass';
// 	noiseFilter.frequency.value = 1000;
// 	this.noise.connect(noiseFilter);
  
// 	this.noiseEnvelope = this.context.createGain();
//   noiseFilter.connect(this.noiseEnvelope);
//   this.noiseEnvelope.connect(this.context.destination);
  
//   this.osc = this.context.createOscillator();
//   this.osc.type = 'triangle';
//   this.oscEnvelope = this.context.createGain();
//   this.osc.connect(this.oscEnvelope);
//   this.oscEnvelope.connect(this.context.destination);
// };

// Snare.prototype.trigger = function(time) {
// 	this.setup();

// 	this.noiseEnvelope.gain.setValueAtTime(1, time);
// 	this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
// 	this.noise.start(time);

// 	this.osc.frequency.setValueAtTime(100, time);
// 	this.oscEnvelope.gain.setValueAtTime(0.7, time);
// 	this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
// 	this.osc.start(time);

// 	this.osc.stop(time + 0.2);
// 	this.noise.stop(time + 0.2);
// };

// $('.snare').on("click", function() {
//   var snare = new Snare(context);
//   var now = context.currentTime;
//   snare.trigger(now);
// });

// function Key(context) {
//   this.context = context;
// };

// Key.prototype.setup = function() {
//   this.osc = this.context.createOscillator();
//   this.gain = this.context.createGain();
//   this.osc.connect(this.gain);
//   this.gain.connect(this.context.destination);
// };

// Key.prototype.trigger = function(time, freq) {
//   this.setup();
//   this.osc.frequency.setValueAtTime(freq, time);
//   this.gain.gain.setValueAtTime(1, time);
//   this.osc.start(time);
//   this.osc.stop(time + 0.2);
// };

// $('.key').on("click", function() {
//   var note = $(this).attr("data-key");
//   var key = new Key(context);
//   var now = context.currentTime;
//   switch(note){
//     case "c": freq = 150; break;
//     case "d": freq = 175; break;
//     case "e": freq = 200; break;
//     case "f": freq = 225; break;
//     case "g": freq = 250; break;
//     case "a": freq = 300; break;
//     case "b": freq = 350; break;
//     case "c": freq = 400; break;
//     case "d": freq = 450; break;
//     case "e": freq = 500; break;
//   }
//   key.trigger(now, freq);
// });

// $('.sequence-play').on("click", function() {
//   $('.step').addClass("");
// });
	