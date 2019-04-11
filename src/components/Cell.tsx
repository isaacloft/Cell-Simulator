import React, { useEffect } from 'react';
import ICell from '../interfaces/cell-type';

const Cell = (props: ICell) => {
  const { id, cellOnClickHandler, isActivated } = props;

  useEffect(() => {}, [isActivated]);

  const cellClassName = `cell-container ${isActivated ? 'isActivated' : 'isDeactivated'}`;
  return <div id={id} className={cellClassName} onClick={cellOnClickHandler} />;
};

export default Cell;
