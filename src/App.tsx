import React, { FunctionComponent, useEffect, useState } from "react";
import "./App.scss";
import Button from "./components/Button";
import Cell from "./components/Cell";

const App: FunctionComponent<{ initial?: number }> = ({ initial = 0 }) => {
  const [cellArray, setCellArray] = useState();
  const [inPlay, setInPlay] = useState(false);
  /**
   * This is useEffect works as componentWillMount function, which is triggered once only
   */
  useEffect(() => {
    renderCell();
  });

  useEffect(() => {
    return () => {};
  }, [inPlay]);

  const renderCell = () => {
    const cellArray = [];
    let key = 0;
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        cellArray.push({ id: `cell-no.${key}`, isActive: false, x: j, y: i });
        key++;
      }
      setCellArray(cellArray);
    }
  };

  return (
    <div className="App">
      <section className="game-pane">
        {cellArray &&
          cellArray.map((cell: any, index: any) => {
            return <Cell key={index} id={cell.id} />;
          })}
      </section>
      <div className="control-pane">
        <Button text="Next Generation" event="generation" btnClass="btn red" />
        <Button text="Reset" event="reset" btnClass="btn" />
      </div>
    </div>
  );
};

export default App;
