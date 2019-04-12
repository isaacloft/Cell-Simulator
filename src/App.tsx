import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import Button from './components/Button';
import Cell from './components/Cell';
import ICell from './interfaces/cell-type';

import './App.scss';

const App = () => {
  const [cellArray, setCellArray] = useState();
  const [simulationStatus, setsimulationStatus] = useState(false);
  const [inGeneration, setInGeneration] = useState(false);
  const [activatedCellNO, setActivatedCellNO] = useState(0);
  const [generationCounter, setGenerationCounter] = useState(0);

  useEffect(() => {}, [cellArray]);

  useEffect(() => {
    let timeout: any;
    if (generationCounter !== 0) {
      timeout = setTimeout(() => {
        if (inGeneration) {
          simulationFactory();
        }
      }, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [generationCounter]);

  useEffect(() => {
    setCellArray([]);
    renderCell();
  }, [simulationStatus]);

  const renderCell = () => {
    const initialCellArray = [];
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        initialCellArray.push({ id: `cell-x.${j}.y${i}`, isActivated: false, x: j, y: i });
      }
    }
    setCellArray(initialCellArray);
  };
  const cellOnClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const id = String((event.target as HTMLInputElement).id);
    updateCells(id, 'activated');
  };

  const activatedCellNOCounterHandler = () => {
    setActivatedCellNO(activatedCellNO + 1);
  };

  const simulationFactory = (): void => {
    const newArray = [];
    for (let i = 0; i < cellArray.length; i++) {
      const newCell = { ...cellArray[i] };
      newArray.push(runSimulation(newCell));
    }
    setGenerationCounter(generationCounter + 1);
    setCellArray(newArray);
  };

  const startNextGenerationHandler = (): any => {
    setInGeneration(true);
    simulationFactory();
  };

  const resetButtonOnClickHandler = () => {
    setInGeneration(false);
    setsimulationStatus(!simulationStatus);
  };

  const updateCells = (id: string, type: string) => {
    const updatedCellArray =
      cellArray &&
      cellArray.map((cell: ICell) => {
        if (type === 'activated') {
          if (cell.id === id) {
            cell.isActivated = !cell.isActivated;
          }
        }
        return cell;
      });
    setCellArray(updatedCellArray);
  };

  const runSimulation = (cell: ICell) => {
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
        const neighborX = x + coordinate[0];
        const neighborY = y + coordinate[1];
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
                activatedCellNOCounterHandler={activatedCellNOCounterHandler}
              />
            );
          })}
      </section>
      <div className="control-pane">
        {!inGeneration ? (
          <Button text="Start" event="generation" btnClass="btn red" clickHandler={startNextGenerationHandler} />
        ) : (
          <Button text="Generating..." event="generating" btnClass="btn blue" clickHandler={() => {}} />
        )}
        <Button text="Reset" event="reset" btnClass="btn" clickHandler={resetButtonOnClickHandler} />
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
