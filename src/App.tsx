import React from "react";
import useStore from "@store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const { bears, increasePopulation, decreasePopulation, removeAllBears } =
    useStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
