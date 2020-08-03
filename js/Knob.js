import React, { useEffect, useState } from "react";

export default function Knob({ onChange, min, max, value }) {
  const [id] = useState(Math.random() * 58390);
  function scale([domainMin, domainMax], [rangeMin, rangeMax]) {
    return function (value) {
      // domain = x
      const domainNormalized = (value - domainMin) / (domainMax - domainMin);
      return (rangeMax - rangeMin) * domainNormalized + rangeMin;
    };
  }
  const toDeg = scale([min, max], [-180, 180]);
  const toVal = scale([-180, 180], [min, max]);

  // null | {initialX, initialY, lastX, lastY}
  const [dragging, setDragging] = useState(null);
  // const [rotation, setRotation] = useState(0);

  function mouseUpHander() {
    if (dragging) {
      setDragging(null);
    }
  }

  function mouseMoveHandler({ clientX, clientY }) {
    if (dragging) {
      const { lastY, initialX, initialY } = dragging;
      const delta = lastY - clientY;
      setDragging({ lastX: clientX, lastY: clientY, initialX, initialY });

      let rotation = toDeg(value);
      let newRot = rotation + delta;
      if (newRot < -180) {
        newRot = -180;
      } else if (newRot > 180) {
        newRot = 180;
      }

      onChange(toVal(newRot));
    }
  }

  useEffect(() => {
    document.addEventListener("mouseup", mouseUpHander);
    document.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      document.removeEventListener("mouseup", mouseUpHander);
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  });

  let rotation = toDeg(value);

  return (
    <svg
      onMouseDown={({ clientX, clientY }) => {
        setDragging({
          lastX: clientX,
          lastY: clientY,
          initialX: event.clientX,
          initialY: event.clientY,
        });
      }}
      version="1.1"
      viewBox="-16 -16 32 32"
      style={{
        width: "64px",
        height: "64px",
        userSelect: "none",
        outline: "none",
      }}
    >
      <defs>
        <linearGradient id="shape-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgb(80, 80, 81)" />
          <stop offset="100%" stopColor="rgb(30, 30, 31)" />
        </linearGradient>
        <radialGradient
          id="metal-rings"
          fx="50%"
          fy="50%"
          r="10%"
          spreadMethod="reflect"
        >
          <stop offset="30%" stopColor="white" stopOpacity="0.66"></stop>
          <stop offset="50%" stopColor="white" stopOpacity="0.69"></stop>
          <stop offset="70%" stopColor="white" stopOpacity="0.66"></stop>
        </radialGradient>
        <path
          id="shape"
          d="
      M14.876 -5.890A-16 -16 0 0 0 14.876 5.890A16 16 0 0 112.539 9.938A-16 -16 0 0 0 2.337 15.828
      A16 16 0 0 1-2.337 15.828A-16 -16 0 0 0 -12.539 9.938A16 16 0 0 1-14.876 5.890A-16 -16 0 0 0 -14.876 -5.890
      A16 16 0 0 1-12.539 -9.938A-16 -16 0 0 0 -2.337 -15.828A16 16 0 0 12.337 -15.828A-16 -16 0 0 0 12.539 -9.938
      A16 16 0 0 114.876 -5.890"
        ></path>
        <clipPath
          id={`shape-mask-${id}`}
          style={{ transform: `rotate(${rotation}deg) scale(0.87)` }}
        >
          <use href="#shape" />
        </clipPath>
        <filter id="lights">
          <feDropShadow
            dx="0"
            dy="-0.3"
            stdDeviation="0.1"
            floodOpacity="0.7"
            floodColor="white"
          />
        </filter>
        <filter id="shadow">
          <feDropShadow
            dx="0"
            dy="1.5"
            stdDeviation="0.5"
            floodOpacity="0.9"
            floodColor="black"
          />
        </filter>
      </defs>
      <circle
        cx="0"
        cy="0"
        r="15.0"
        fill="rgb(36, 36, 37)"
        stroke="rgb(28, 28, 29)"
        strokeWidth="0.5"
      ></circle>
      <g filter="url(#shadow)">
        <g filter="url(#lights)">
          <g clipPath={`url(#shape-mask-${id})`}>
            <rect
              x="-16"
              y="-16"
              width="32"
              height="32"
              fill="url(#shape-fill)"
            ></rect>
            <circle
              cx="0"
              cy="-37"
              r="32"
              fill="rgba(250, 250, 255, .16)"
            ></circle>
          </g>
        </g>
      </g>
      <g style={{ transform: `rotate(${rotation}deg)` }}>
        <circle cx="0" cy="-11" r="1.1" fill="black"></circle>
        <circle cx="0" cy="-11" r="0.8" fill="white"></circle>
      </g>
      <circle
        cx="0"
        cy="0"
        r="9"
        fill="url(#metal-rings)"
        stroke="rgb(50, 50, 51)"
        strokeWidth="0.7"
      ></circle>
    </svg>
  );
}
