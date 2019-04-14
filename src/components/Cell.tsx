import React, { useEffect, useState } from 'react';
import ICell from '../interfaces/cell-type';

const Cell = (props: ICell) => {
  const { id, cellOnClickHandler, isActivated } = props;
  const [cellColorModifier, setCellColorModifier] = useState('');

  // By using this useEffect, the cellColorModifier is only called at the first time
  useEffect(() => {
    setCellColorModifier(randomColorfulCell());
  }, []);

  const randomColorfulCell = () => {
    const arrayOfColors = ['-green-cell', '-yellow-cell', '-blue-cell', '-brown-cell', '-black-cell'];
    const maximum = arrayOfColors.length;
    const minimum = 0;
    const randomIndex = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

    return arrayOfColors[randomIndex];
  };

  // const = randomColorfulCell();
  const cellClassName = `game-pane__cell-container ${
    isActivated ? '-isActivated' : '-isDeactivated'
  } ${cellColorModifier}`;

  return <div id={id} className={cellClassName} onClick={cellOnClickHandler} />;
};

export default Cell;
