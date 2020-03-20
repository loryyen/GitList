import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import GitList from "components/gitList";
import "assets/styles/index.sass";

const App = () => {
  return (
    <div className="calacator-wrapper">
      <GitList></GitList>
    </div>
  );
};

ReactDOM.render(<App></App>, document.getElementById("app"));
