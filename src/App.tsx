import React from "react";
import "./App.css";
import NavBar from "./components/header";
import GuessBox from "./components/input-grid";

//components

function App() {
    return (
        <React.Fragment>
            <NavBar name="Wordle" />
            <GuessBox />
        </React.Fragment>
    );
}

export default App;
