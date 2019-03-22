<?php
    include 'config.php';
    ob_start();
    session_start();
?>

<?php include 'header.php'; ?>

<body>
    <div class="container-fullwidth clearfix">

        <h1>Beaudryland Synth</h1>

        <div class="bui-synth-controls">
            <button class="bui-button">Stop all sounds</button>
            <button class="bui-button">Mute</button>
        </div>
        
        <div class="bui-synth">
            <div class="bui-synth-panel">
                <div class="bui-synth-keys">
                    <div data-key="c" class="bui-key key-c"><span>a</span></div><!--
                    --><div data-key="cs" class="bui-key key-cs bui-key-black"><span>w</span></div><!--
                    --><div data-key="d" class="bui-key key-d"><span>s</span></div><!--
                    --><div data-key="ds" class="bui-key key-ds bui-key-black"><span>e</span></div><!--
                    --><div data-key="e" class="bui-key key-e"><span>d</span></div><!--
                    --><div data-key="f" class="bui-key key-f"><span>f</span></div><!--
                    --><div data-key="fs" class="bui-key key-fs bui-key-black"><span>t</span></div><!--
                    --><div data-key="g" class="bui-key key-g"><span>g</span></div><!--
                    --><div data-key="gs" class="bui-key key-gs bui-key-black"><span>y</span></div><!--
                    --><div data-key="a" class="bui-key key-a"><span>h</span></div><!--
                    --><div data-key="as" class="bui-key key-as bui-key-black"><span>u</span></div><!--
                    --><div data-key="b" class="bui-key key-b"><span>j</span></div><!--
                    --><div data-key="c2" class="bui-key key-c2"><span>k</span></div>
                </div>
            </div>
            <div class="bui-synth-panel bui-iflex">
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">Wave</h3>
                    <div class="bui-select">
                        <select id="bui-synth-wave">
                            <option value="sawtooth">Sawtooth</option>
                            <option value="square">Square</option>
                            <option value="sine">sine</option>
                            <option value="triangle">Triangle</option>
                        </select>
                    </div>
                </div>
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">Gain</h3>
                    <input type="range" min="0" max="100" data-degree-range="270" data-degree-offset="10" step="0.5" value="20" class="bui-knob bui-knob-white" id="bui-synth-gain">
                </div>
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">Sustain</h3>
                    <input type="range" min="0" max="100" data-degree-range="270" data-degree-offset="45" step="0.5" value="70" class="bui-knob bui-knob-white" id="bui-synth-sustain">
                </div>
            </div>
            <div class="bui-synth-panel bui-iflex">
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">Filter</h3>
                    <div class="bui-select">
                        <select id="bui-synth-filtertype">
                            <option value="lowpass">lowpass</option>
                            <option value="highpass">highpass</option>
                            <option value="bandpass">bandpass</option>
                            <option value="lowshelf">lowshelf</option>
                            <option value="highshelf">highshelf</option>
                            <option value="peaking">peaking</option>
                            <option value="notch">notch</option>
                            <option value="allpass">allpass</option>
                        </select>
                    </div>
                </div>
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">Freq</h3>
                    <input type="range" min="0" max="100" data-degree-range="270" data-degree-offset="45" step="0.5" value="50" class="bui-knob bui-knob-white" id="bui-synth-filter">
                </div>
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">Q</h3>
                    <input type="range" min="0" max="100" data-degree-range="270" data-degree-offset="45" step="0.5" value="1" class="bui-knob bui-knob-white" id="bui-synth-q">
                </div>
            </div>
            <div class="bui-synth-panel bui-iflex">
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">Delay</h3>
                    <input type="range" min="0" max="100" data-degree-range="270" data-degree-offset="45" step="0.5" value="20" class="bui-knob bui-knob-white" id="bui-synth-feedback">
                </div>
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">D.Time</h3>
                    <input type="range" min="0" max="100" data-degree-range="270" data-degree-offset="45" step="0.5" value="50" class="bui-knob bui-knob-white" id="bui-synth-delay">
                </div>
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">Compress *</h3>
                    <input type="range" min="0" max="100" data-degree-range="270" data-degree-offset="45" step="0.5" value="50" class="bui-knob bui-knob-white" id="bui-synth-compress">
                </div>
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">Reverb</h3>
                    <input type="range" min="0" max="100" data-degree-range="270" data-degree-offset="45" step="0.5" value="10" class="bui-knob bui-knob-white" id="bui-synth-reverb">
                </div>
            </div>
            <div class="bui-synth-panel">
                <h3 class="bui-knob-title">Oscilloscope</h3>
                <div id="oscilloscope" class="bui-oscilloscope">

                </div>
            </div>
            <div class="bui-synth-panel">
                <h3 class="bui-knob-title">Sequencer *</h3>
                <div class="bui-sequencer">

                </div>
            </div>
            <div class="bui-synth-panel">
                <h3 class="bui-knob-title">Drum Pad *</h3>
                <div class="bui-drumpads">
                    <button class="bui-drumpad" id="bui-synth-kick">Kick<br><br>(1)</button>
                    <button class="bui-drumpad" id="bui-synth-snare">Snare<br><br>(2)</button>
                    <button class="bui-drumpad" id="bui-synth-hh">HH<br><br>(3)</button>
                    <button class="bui-drumpad" id="bui-synth-openhh">Open HH<br><br>(4)</button>
                    <button class="bui-drumpad" id="bui-synth-crash">Crash<br><br>(5)</button>
                    <button class="bui-drumpad" id="bui-synth-tom1">Tom 1<br><br>(6)</button>
                    <button class="bui-drumpad" id="bui-synth-tom2">Tom 2<br><br>(7)</button>
                    <button class="bui-drumpad" id="bui-synth-cowbell">Cowbell<br><br>(8)</button>
                </div>
            </div>
            <div class="bui-synth-panel">
                <h3 class="bui-knob-title">Drum Machine</h3>
                <div class="bui-drummachine">
                    <div class="drummachine-playstop">
                        <span>play</span>
                    </div>
                    <div class="drummachine-row">
                        <div class="drummachine-drum" id="drummachine-drum-kick">Kick</div>
                        <div class="drummachine-steps">
                            <div class="drummachine-position"></div>
                            <div class="drummachine-step" id="kick-step-1"></div>
                            <div class="drummachine-step" id="kick-step-2"></div>
                            <div class="drummachine-step" id="kick-step-3"></div>
                            <div class="drummachine-step" id="kick-step-4"></div>
                        </div>
                    </div>
                    <div class="drummachine-row">
                        <div class="drummachine-drum" id="drummachine-drum-snare">Snare</div>
                        <div class="drummachine-steps">
                            <div class="drummachine-step" id="snare-step-1"></div>
                            <div class="drummachine-step" id="snare-step-2"></div>
                            <div class="drummachine-step" id="snare-step-3"></div>
                            <div class="drummachine-step" id="snare-step-4"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bui-synth-panel">
                <h3 class="bui-knob-title">Tempo</h3>
                <div class="bui-tempo">

                </div>
            </div>
            <div class="bui-synth-panel">
                <h3 class="bui-knob-title">Tape</h3>
                <div class="bui-tape">

                </div>
            </div>
        </div>

    </div>

    <script src="js/vendor/jquery-2.1.1.js"></script>
    <script src="js/vendor/raphael-min.js"></script>
    <script src="js/plugins.js"></script>
    <script src="js/app-bundle.js"></script>

</body>
</html>

<?php 
    $mysqli->close();
    ob_end_flush();
?>