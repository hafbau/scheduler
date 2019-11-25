import React from "react";

import "./Button.scss";
const classNames = require("classnames");

export default function Button(props) {
  const buttonClass = classNames("button", props.className, {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={buttonClass}
    >
      {props.children}
    </button>
  );
}
