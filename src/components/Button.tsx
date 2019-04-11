import React from "react";
import IButton from "../interfaces/button-type";

const Button = (props: IButton) => {
  const btnClass = props.btnClass;
  return <a className={btnClass}>{props.text}</a>;
};

export default Button;
