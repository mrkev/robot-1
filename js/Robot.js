import React from "react";

function domainForRange(range) {
  return function ({ max, min, current }) {
    const currentNormalized = (current - min) / (max - min);
    return (range.max - range.min) * currentNormalized + range.min;
  };
}

export default function Robot({
  primaryFreq,
  modulationFreq,
  modulationAmount,
  isOn,
}) {
  const primaryFreqToEyeSize = domainForRange({ min: 27.5, max: 22.5 });
  const eyeSize = primaryFreqToEyeSize(primaryFreq);
  const modulating =
    modulationAmount.current !== 0 && modulationFreq.current !== 0;

  const jawY = isOn ? 3 : 0;
  const jawX = modulating ? -3 : 0;

  const modFrqTransform = domainForRange({ min: -3, max: 0 });
  const eyeAsym = modulating ? modFrqTransform(modulationFreq) : 0;

  const modAmtToExtraJaw = domainForRange({ min: 0, max: 3 });
  const extraJaw = isOn ? modAmtToExtraJaw(modulationAmount) : 0;

  return (
    <div style={{ width: 72, height: 72 }}>
      <div
        style={{ background: "black", border: "2px solid #4D4E4D", padding: 2 }}
      >
        <svg
          shapeRendering="crispEdges"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="RadialGradient1">
              <stop offset="0%" stopColor="#232A25" />
              <stop offset="100%" stopColor="#0E120E" />
            </radialGradient>
          </defs>
          <rect
            width="64"
            height="64"
            fill="url(#RadialGradient1)"
            stroke="#0B0F0A"
            strokeWidth="0.5"
          />
          {/* EYES */}
          <path
            d={`M20.5 ${eyeSize + eyeAsym}H27.5V29.5H20.5V${
              eyeSize + eyeAsym
            }Z`}
            stroke="#5CA168"
          />
          <path
            d={`M36.5 ${eyeSize}H43.5V29.5H36.5V${eyeSize}Z`}
            stroke="#5CA168"
          />
          <path
            d="M7.15926 24.5104L9.99103 24.5376C10.3178 24.5407 10.5725 24.8046 10.5695 25.1175L10.5132 30.969C10.5102 31.2816 10.2507 31.5404 9.92366 31.5373L7.0919 31.5101C6.76487 31.5069 6.51038 31.2432 6.51339 30.9306L6.5697 25.0791C6.57272 24.7662 6.8325 24.5073 7.15926 24.5104Z"
            stroke="#5CA168"
          />
          <path
            d="M54.1562 24.5104L56.9879 24.5376C57.3147 24.5407 57.5695 24.8046 57.5664 25.1175L57.5101 30.969C57.5071 31.2816 57.2476 31.5404 56.9206 31.5373L54.0888 31.5101C53.7618 31.5069 53.5073 31.2432 53.5103 30.9306L53.5666 25.0791C53.5696 24.7662 53.8294 24.5073 54.1562 24.5104Z"
            stroke="#5CA168"
          />
          <path
            d="M1.86239 25.5083L4.12781 25.5301C4.38608 25.5326 4.49335 25.7083 4.4924 25.8069L4.45185 30.0201C4.4509 30.1187 4.34027 30.2923 4.082 30.2899L1.81658 30.2681C1.55831 30.2656 1.45104 30.0899 1.45199 29.9913L1.49254 25.7781C1.49348 25.6795 1.60412 25.5058 1.86239 25.5083Z"
            stroke="#5CA168"
          />
          <path
            d="M59.9178 25.5083L62.1832 25.5301C62.4415 25.5326 62.5488 25.7083 62.5478 25.8069L62.5073 30.0201C62.5063 30.1187 62.3957 30.2923 62.1374 30.2899L59.872 30.2681C59.6137 30.2656 59.5065 30.0899 59.5074 29.9913L59.548 25.7781C59.5489 25.6795 59.6595 25.5058 59.9178 25.5083Z"
            stroke="#5CA168"
          />
          <mask id="path-7-inside-1" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M52 38H12V38.5786C12 43.7819 16.1843 48 21.3458 48H42.6542C47.8157 48 52 43.7819 52 38.5786V38Z"
            />
          </mask>
          <path
            d="M12 38V37H11V38H12ZM52 38H53V37H52V38ZM12 39H52V37H12V39ZM11 38V38.5786H13V38H11ZM11 38.5786C11 44.3266 15.6244 49 21.3458 49V47C16.7441 47 13 43.2372 13 38.5786H11ZM21.3458 49H42.6542V47H21.3458V49ZM42.6542 49C48.3756 49 53 44.3266 53 38.5786H51C51 43.2372 47.2559 47 42.6542 47V49ZM53 38.5786V38H51V38.5786H53Z"
            fill="#5CA168"
            mask="url(#path-7-inside-1)"
            transform={`translate(${jawX}, ${jawY + extraJaw})`}
          />
          <mask id="path-9-inside-2" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M52 39H12L12 21.6906C12 16.3386 16.1843 12 21.3458 12H42.6542C47.8157 12 52 16.3386 52 21.6906V39Z"
            />
          </mask>
          <path
            d="M52 39V40H53V39H52ZM12 39H11V40H12V39ZM52 38H12V40H52V38ZM11 21.6906L11 39H13L13 21.6906H11ZM21.3458 11C15.5981 11 11 15.8208 11 21.6906H13C13 16.8564 16.7704 13 21.3458 13V11ZM42.6542 11H21.3458V13H42.6542V11ZM53 21.6906C53 15.8208 48.4019 11 42.6542 11V13C47.2296 13 51 16.8564 51 21.6906H53ZM53 39V21.6906H51V39H53Z"
            fill="#5CA168"
            mask="url(#path-9-inside-2)"
          />
        </svg>
      </div>
    </div>
  );
}
