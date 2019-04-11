import React, { FunctionComponent, useState } from "react";
import "./App.scss";
import Button from "./components/Button";
import Cell from "./components/Cell";

const App: FunctionComponent<{ initial?: number }> = ({ initial = 0 }) => {
  const renderCell = () => {};
  return (
    <div className="App">
      <section className="game-pane">
        <Cell />
      </section>
      <Button />
    </div>
  );
};

export default App;
