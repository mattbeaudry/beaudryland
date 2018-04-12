<?php
    include 'config.php';
    ob_start();
    session_start();
?>

<?php include 'header.php'; ?>

<body>
    <div class="container-fullwidth clearfix">

        <h1>Beaudryland Synth</h1>

        <!-- 
        <p data-height="600" data-theme-id="dark" data-slug-hash="jqqMOE" data-default-tab="result" data-user="mattbeaudry" data-embed-version="2" data-pen-title="jqqMOE" class="codepen">See the Pen <a href="https://codepen.io/mattbeaudry/pen/jqqMOE/">jqqMOE</a> by Matt Beaudry (<a href="https://codepen.io/mattbeaudry">@mattbeaudry</a>) on <a href="https://codepen.io">CodePen</a>.</p>
        <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script> 
        -->

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
            <div class="bui-synth-panel">
                <h3 class="bui-knob-title">Drum Pad</h3>
                <div class="bui-drumpads">
                    <button class="bui-drumpad" id="bui-synth-kick">Kick</button>
                    <button class="bui-drumpad" id="bui-synth-snare">Snare</button>
                    <button class="bui-drumpad" id="bui-synth-hh">HH</button>
                    <button class="bui-drumpad" id="bui-synth-openhh">Open HH</button>
                    <button class="bui-drumpad" id="bui-synth-crash">Crash</button>
                    <button class="bui-drumpad" id="bui-synth-tom1">Tom 1</button>
                    <button class="bui-drumpad" id="bui-synth-tom2">Tom 3</button>
                    <button class="bui-drumpad" id="bui-synth-cowbell">Cowbell</button>
                </div>
            </div>
            <div class="bui-synth-panel bui-iflex">
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">Wave</h3>
                    <div class="bui-select">
                        <select id="bui-synth-wave">
                            <option value="sine">sine</option>
                            <option value="square">Square</option>
                            <option value="sawtooth">Sawtooth</option>
                            <option value="triangle">Triangle</option>
                        </select>
                    </div>
                </div>
                <div class="bui-synth-knob ">
                    <h3 class="bui-knob-title">Gain</h3>
                    <input type="range" min="0" max="100" data-degree-range="270" data-degree-offset="45" step="0.5" value="50" class="bui-knob bui-knob-white" id="bui-synth-gain">
                </div>
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">Sustain</h3>
                    <input type="range" min="0" max="100" data-degree-range="270" data-degree-offset="45" step="0.5" value="50" class="bui-knob bui-knob-white" id="bui-synth-sustain">
                </div>
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">Delay</h3>
                    <input type="range" min="0" max="100" data-degree-range="270" data-degree-offset="45" step="0.5" value="50" class="bui-knob bui-knob-white" id="bui-synth-feedback">
                </div>
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">D. Time</h3>
                    <input type="range" min="0" max="100" data-degree-range="270" data-degree-offset="45" step="0.5" value="50" class="bui-knob bui-knob-white" id="bui-synth-delay">
                </div>
                <div class="bui-synth-knob">
                    <h3 class="bui-knob-title">Filter</h3>
                    <input type="range" min="0" max="100" data-degree-range="270" data-degree-offset="45" step="0.5" value="50" class="bui-knob bui-knob-white" id="bui-synth-filter">
                </div>
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
            </div>
            <div class="bui-synth-panel">
                <h3 class="bui-knob-title">Oscilloscope</h3>
                <div id="oscilloscope" class="bui-oscilloscope">

                </div>
            </div>
            <div class="bui-synth-panel">
                <h3 class="bui-knob-title">Drum Machine</h3>
                <div class="bui-drummachine">

                </div>
            </div>
            <div class="bui-synth-panel">
                <h3 class="bui-knob-title">Sequencer</h3>
                <div class="bui-sequencer">

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