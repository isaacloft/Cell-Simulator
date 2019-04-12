import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import Cell from './components/Cell';
import ICell from './interfaces/cell-type';

import './App.scss';

const PANE_WIDTH = parseInt(process.env.REACT_APP_WIDTH_NO || '25');
const PANE_HEIGHT = parseInt(process.env.REACT_APP_HEIGHT_NO || '25');

const App = () => {
  // All cell objects are stored in cellArray
  const [cellArray, setCellArray] = useState();
  // simulationStatus can be true or false, it's used to check reset status
  const [simulationStatus, setsimulationStatus] = useState(false);
  // inNextGeneration means if the Next Generation is happening
  const [inNextGeneration, setInNextGeneration] = useState(false);
  // This is a counter used to keep cells generating
  const [generationCounter, setGenerationCounter] = useState(0);

  // The generationCounter self-increments and trigger Next Generation
  useEffect(() => {
    let timeout: any;
    if (generationCounter !== 0) {
      timeout = setTimeout(() => {
        if (inNextGeneration) {
          startNextGeneration();
        }
      }, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [generationCounter]);

  // If reset is clicked
  useEffect(() => {
    // setCellArray([]);
    renderInitialCells();
  }, [simulationStatus]);

  const renderInitialCells = () => {
    const initialCellArray = [];
    for (let i = 0; i < PANE_WIDTH; i++) {
      for (let j = 0; j < PANE_HEIGHT; j++) {
        initialCellArray.push({ id: `cell-x.${j}.y${i}`, isActivated: false, x: j, y: i });
      }
    }
    setCellArray(initialCellArray);
  };
  const cellOnClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const id = String((event.target as HTMLInputElement).id);
    updateCells(id, 'activated');
  };

  const startNextGeneration = (): void => {
    const newArray = [];
    for (let i = 0; i < cellArray.length; i++) {
      const newCell = { ...cellArray[i] };
      newArray.push(cellEvolve(newCell));
    }
    setGenerationCounter(generationCounter + 1);
    setCellArray(newArray);
  };

  const startNextGenerationHandler = (): any => {
    setInNextGeneration(true);
    startNextGeneration();
  };

  const resetButtonOnClickHandler = () => {
    setInNextGeneration(false);
    setsimulationStatus(!simulationStatus);
  };

  const updateCells = (id: string, type: string) => {
    const updatedCellArray = [];
    for (let i = 0; i < cellArray.length; i++) {
      const newCell = { ...cellArray[i] };
      if (type === 'activated') {
        if (newCell.id === id) {
          newCell.isActivated = !newCell.isActivated;
        }
      }
      updatedCellArray.push(newCell);
    }
    if (inNextGeneration) {
      // setInNextGeneration(false);
      // setsimulationStatus(!simulationStatus);
      setGenerationCounter(0);
      setCellArray(updatedCellArray);
      setGenerationCounter(generationCounter + 1);
    } else {
      setCellArray(updatedCellArray);
    }
  };

  const cellEvolve = (cell: ICell) => {
    const newCell = { ...cell };
    if (cell.isActivated) {
      if (countNeighbours(cell.x, cell.y, cell.id) < 2) {
        newCell.isActivated = false;
      }
      if (countNeighbours(cell.x, cell.y, cell.id) === 2 || countNeighbours(cell.x, cell.y, cell.id) === 3) {
        newCell.isActivated = true;
      }
      if (countNeighbours(cell.x, cell.y, cell.id) > 3) {
        newCell.isActivated = false;
      }
    } else {
      if (countNeighbours(cell.x, cell.y, cell.id) === 3) {
        newCell.isActivated = true;
      }
    }
    return newCell;
  };

  const countNeighbours = (x: number, y: number, id: string) => {
    let neighbours = 0;
    const coordinateDiff = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

    if (cellArray && cellArray.find((cell: ICell) => cell.id === id)) {
      coordinateDiff.map(coordinate => {
        const neighborX = x + coordinate[0] > 0 ? x + coordinate[0] : x + coordinate[0] + PANE_WIDTH;
        const neighborY = y + coordinate[1] > 0 ? y + coordinate[1] : y + coordinate[1] + PANE_HEIGHT;
        const neighborId = `cell-x.${neighborX}.y${neighborY}`;
        const neighborDOM = cellArray.find((cell: ICell) => cell.id === neighborId);
        if (neighborDOM && neighborDOM.isActivated) {
          neighbours++;
        }
      });
    }
    return neighbours;
  };

  return (
    <div className="App">
      <header>
        <h1>Cell Simulator</h1>
      </header>
      <section className="game-pane">
        {cellArray &&
          cellArray.map((cell: ICell, index: number) => {
            return (
              <Cell
                key={index}
                id={cell.id}
                isActivated={cell.isActivated}
                x={cell.x}
                y={cell.y}
                cellOnClickHandler={cellOnClickHandler}
              />
            );
          })}
      </section>
      <div className="control-pane">
        {!inNextGeneration ? (
          <Button text="Start" event="generation" btnClass="btn red" clickHandler={startNextGenerationHandler} />
        ) : (
          <Button text="Evolving..." event="generating" btnClass="btn blue" clickHandler={() => {}} />
        )}
        <Button text="Pause/Reset" event="reset" btnClass="btn" clickHandler={resetButtonOnClickHandler} />
      </div>
      <footer style={{ marginTop: '50px' }}>
        Author:
        <a href="https://www.linkedin.com/in/isaacguanloft/" target="_blank" style={{ marginLeft: '10px' }}>
          Isaac Guan
        </a>
      </footer>
    </div>
  );
};

export default App;
