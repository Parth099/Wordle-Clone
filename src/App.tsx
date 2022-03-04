import React from "react";
import "./App.css";
import NavBar from "./components/header";
import GuessBox from "./components/input-grid";

//components

function App() {
    return (
        <div className="main">
            <NavBar name="Wordle" />
            <GuessBox />
        </div>
    );
}

export default App;
