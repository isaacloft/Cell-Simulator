import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import Cell from "./components/Cell";
import ICell from "./interfaces/cell-type";

import "./App.scss";

const App = () => {
  const [cellArray, setCellArray] = useState();
  const [simulationStatus, setsimulationStatus] = useState(false);
  const [inGeneration, setInGeneration] = useState(false);
  const [generationInterval, setGenerationInterval] = useState();
  const [activatedCellNO, setActivatedCellNO] = useState(0);

  useEffect(() => {
    renderCell();
  }, [simulationStatus]);

  const renderCell = () => {
    const cellArray = [];
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        cellArray.push({ id: `cell-x.${j}.y${i}`, isActivated: false, x: j, y: i });
      }
      setCellArray(cellArray);
    }
  };
  const cellOnClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const id = String((event.target as HTMLInputElement).id);
    updateCells(id, "activated");
  };

  const activatedCellNOCounterHandler = () => {
    setActivatedCellNO(activatedCellNO + 1);
  };

  const startNextGenerationHandler = (): any => {
    if (!inGeneration) {
      setInGeneration(true);
      const interval = setInterval(() => {
        const updatedCellArray = cellArray.map((cell: any) => {
          cell = runSimulation(cell);
          return cell;
        });
        setCellArray(updatedCellArray);
      }, 1000);
      setGenerationInterval(interval);
    }
  };

  const resetButtonOnClickHandler = () => {
    setInGeneration(false);
    setsimulationStatus(!simulationStatus);
    clearInterval(generationInterval);
  };

  const updateCells = (id: string, type: string) => {
    const updatedCellArray =
      cellArray &&
      cellArray.map((cell: ICell) => {
        if (type === "activated") {
          if (cell.id === id) {
            cell.isActivated = !cell.isActivated;
          }
        }
        return cell;
      });
    setCellArray(updatedCellArray);
  };

  const runSimulation = (cell: ICell) => {
    if (cell.isActivated === true && countNeighbours(cell.x, cell.y, cell.id) < 2) {
      cell.isActivated = false;
      return cell;
    }
    if (
      (cell.isActivated === true && countNeighbours(cell.x, cell.y, cell.id) === 2) ||
      (cell.isActivated === true && countNeighbours(cell.x, cell.y, cell.id) === 3)
    ) {
      return cell;
    }
    if (cell.isActivated === true && countNeighbours(cell.x, cell.y, cell.id) > 3) {
      cell.isActivated = false;
      return cell;
    }
    if (cell.isActivated === false && countNeighbours(cell.x, cell.y, cell.id) === 3) {
      cell.isActivated = true;
      return cell;
    }
    return cell;
  };

  const countNeighbours = (x: number, y: number, id: string) => {
    let neighbours = 0;
    const coordinateDiff = [[-1, 1], [0, 1], [1, 1], [-1, 0], [1, 0], [-1, -1], [1, -1]];

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
    </div>
  );
};

export default App;
