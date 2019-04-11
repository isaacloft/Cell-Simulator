import React, { useEffect, useState } from "react";
import ICell from "../interfaces/cell-type";

const Cell = (props: ICell) => {
  const [isActivated, setActivation] = useState(false);
  useEffect(() => {
    // console.log("cell status changed");
  }, [isActivated]);

  const cellClickHandler = () => {
    // const id = Number((event.target as HTMLInputElement).dataset.id);
    setActivation(!isActivated);
  };
  const cellClassName = `cell-container ${isActivated ? "isActivated" : "isDeactivated"}`;
  return <div className={cellClassName} id={props.id} onClick={cellClickHandler} />;
};

export default Cell;
