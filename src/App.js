import React, { useEffect, useState } from "react";
import "./App.css";
import Seminars from "./Seminars.js";
function App() {
  return (
    <div className="App">
      <h1>Наши продукты</h1>
      {/* Отрисовываем компонент с семинарами */}
      <Seminars />
    </div>
  );
}
export default App;
