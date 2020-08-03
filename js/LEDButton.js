import React from "react";

export default function LEDButton({ checked, onChange }) {
  return (
    <>
      <input
        id="askldjf;asdf"
        checked={checked}
        onChange={onChange}
        type="checkbox"
        className="button"
      />
      <label className="button" htmlFor="askldjf;asdf"></label>
    </>
  );
}
