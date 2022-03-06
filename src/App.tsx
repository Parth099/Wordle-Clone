import React from "react";
import "./App.css";
import NavBar from "./components/header";
import GuessBox from "./components/input-grid";

//components

function App() {
    return (
        <React.Fragment>
            <NavBar name="Wordle" />
            <div>
                <GuessBox />
            </div>
        </React.Fragment>
    );
}

export default App;
