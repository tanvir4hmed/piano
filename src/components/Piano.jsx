import React, { useState, useEffect } from "react";
import "./Piano.css";

// White keys
const whiteKeys = ["C", "D", "E", "F", "G", "A", "B"];
// Black keys renamed to -sharp
const blackKeys = ["C-sharp", "D-sharp", "F-sharp", "G-sharp", "A-sharp"];

// Keyboard mapping
const keyMap = {
  // White keys
  a: 0, s: 1, d: 2, f: 3, g: 4, h: 5, j: 6,
  // Black keys
  w: 0, e: 1, t: 2, y: 3, u: 4,
};

// Black key left positions (px)
const blackKeyPositions = {
  "C-sharp": 45,
  "D-sharp": 108,
  "F-sharp": 232,
  "G-sharp": 295,
  "A-sharp": 357,
};

export default function Piano() {
  const [pressedWhite, setPressedWhite] = useState([]);
  const [pressedBlack, setPressedBlack] = useState([]);

  const playKey = (type, index) => {
    const note = type === "white" ? whiteKeys[index] : blackKeys[index];
    if (!note) return;

    const basePath = import.meta.env.BASE_URL;
    const audio = new Audio(`${basePath}sounds/${note}.mp3`);
    audio.play();

    if (type === "white") {
      setPressedWhite([index]);
      setTimeout(() => setPressedWhite([]), 150);
    } else {
      setPressedBlack([index]);
      setTimeout(() => setPressedBlack([]), 150);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (keyMap[key] !== undefined) {
        if (["w", "e", "t", "y", "u"].includes(key)) {
          playKey("black", keyMap[key]);
        } else {
          playKey("white", keyMap[key]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="piano-container">
      <div className="white-keys">
        {whiteKeys.map((note, i) => (
          <div
            key={i}
            className={`white-key ${pressedWhite.includes(i) ? "pressed" : ""}`}
            onMouseDown={() => playKey("white", i)}
          />
        ))}
      </div>

      <div className="black-keys">
        {blackKeys.map((note, i) => (
          <div
            key={i}
            className={`black-key ${pressedBlack.includes(i) ? "pressed" : ""}`}
            onMouseDown={() => playKey("black", i)}
            style={{ left: `${blackKeyPositions[note]}px` }}
          />
        ))}
      </div>
    </div>
  );
}
