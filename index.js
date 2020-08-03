import Robot from "./js/Robot.js";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Knob from "./js/Knob.js";
import LEDButton from "./js/LEDButton.js";
import "./index.css";
import "./ledbutton.css";

function App() {
  const PRIMARY_FREQ_MIN = 30;
  const PRIMARY_FREQ_MAX = 80;
  const [primaryFreq, setPrimaryFreq] = useState(50);

  const MODULATION_FREQ_MIN = 0;
  const MODULATION_FREQ_MAX = 3;
  const [modulationFreq, setModulationFreq] = useState(0);

  const MODULATION_AMOUNT_MIN = 0;
  const MODULATION_AMOUNT_MAX = 3;
  const [modulationAmount, setModulationAmount] = useState(0);

  const [isOn, setIsOn] = useState(false);

  const [rustModule, setRustModule] = useState(null);
  const [fm, setFm] = useState(null);

  useEffect(function () {
    async function loadModule() {
      const rust_module = await import("./pkg");
      setRustModule(rust_module);
    }
    loadModule();
  }, []);

  useEffect(
    function () {
      if (fm) {
        fm.set_note(primaryFreq);
      }
      if (fm) {
        fm.set_fm_frequency(modulationFreq);
      }

      if (fm) {
        fm.set_fm_amount(modulationAmount);
      }
    },
    [fm, modulationAmount, modulationFreq, primaryFreq]
  );

  return (
    <div className="container">
      <div className="mainPlate">
        <div
          id="robot1"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "upright",
          }}
        >
          ROBOT1
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
          }}
        >
          {/* Primary frequency */}
          <div className="knobModule">
            <div className="label">
              Primary
              <br />
              frequency
            </div>

            <Knob
              onChange={(value) => {
                setPrimaryFreq(value);
              }}
              min={PRIMARY_FREQ_MIN}
              max={PRIMARY_FREQ_MAX}
              value={primaryFreq}
            />
          </div>
          <div className="knobModule">
            <div className="label">
              Modulation <br />
              frequency
            </div>
            <Knob
              onChange={(value) => {
                setModulationFreq(value);
              }}
              type="range"
              min={MODULATION_FREQ_MIN}
              max={MODULATION_FREQ_MAX}
              value={modulationFreq}
            />
          </div>
          <div className="knobModule">
            <div className="label">
              Modulation
              <br />
              amount
            </div>

            <Knob
              onChange={(value) => {
                setModulationAmount(value);
              }}
              type="range"
              min={MODULATION_AMOUNT_MIN}
              max={MODULATION_AMOUNT_MAX}
              value={modulationAmount}
            />
          </div>
        </div>

        <LEDButton
          checked={isOn}
          onChange={() => {
            setIsOn((prev) => !prev);
            if (fm === null) {
              const fm = new rustModule.FmOsc();
              fm.set_note(50);
              fm.set_fm_frequency(0);
              fm.set_fm_amount(0);
              fm.set_gain(0.8);
              setFm(fm);
            } else {
              fm.free();
              setFm(null);
            }
          }}
        />
        <div style={{ padding: "0px 10px" }}>
          <Robot
            primaryFreq={{
              max: PRIMARY_FREQ_MAX,
              min: PRIMARY_FREQ_MIN,
              current: primaryFreq,
            }}
            modulationAmount={{
              max: MODULATION_AMOUNT_MAX,
              min: MODULATION_AMOUNT_MIN,
              current: modulationAmount,
            }}
            modulationFreq={{
              max: MODULATION_AMOUNT_MAX,
              min: MODULATION_AMOUNT_MIN,
              current: modulationFreq,
            }}
            isOn={isOn}
          />
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
