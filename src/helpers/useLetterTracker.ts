import { useState } from "react";
import WordleApi from "../wordle-logic/wordleApi";

/*
    Outline:

    This hook is meant to track the users keypresses thus we would want to simulate these things:
    
        1. Addition of letters 
            This will occur via a 2dim char array
        2. Submitting a guess
            This will occur via a call to our WordleApi and preserving the output of that function
        3. Deleting a letter off their current layer

    The 3 actions stated above lay out a clear API model and what actions we need to expose

    Notes
        Layer: The current amount of guesses someone has made

    
    Technical Outline:
        We need 3 pieces of state
            1. Correctness 2D array
            2. User guess 2d Array
            3. Current Layer


*/

enum LetterStatus {
    WRONG,
    MISPLACED,
    CORRECT,
}

function _pushLetter(letter: string, layer: number, letterArr: Array<string[]>, setLetterArr: Function) {}
function _popLetter(layer: number, letterArr: Array<string[]>, setLetterArr: Function) {}
function _cementLayer(layer: number, setLayer: Function, accArray: Array<LetterStatus[]>, setAccArray: Function, matcher: Function) {}

//exposed functions ONLY for outside calling

function useLetterTracker(targetWord: string, layerMax: number) {
    const API = new WordleApi(targetWord);
    const matcher = API.checkAccuracy;

    //correctness array
    const [accArray, setAccArray] = useState(
        Array(layerMax)
            .fill(0)
            .map((row) => new Array<LetterStatus>(targetWord.length).fill(-1))
    );

    //guess array
    const [letterArr, setLetterArr] = useState(
        Array(layerMax)
            .fill(0)
            .map((row) => new Array<string>(targetWord.length).fill(""))
    );

    const [layer, setLayer] = useState(0);

    function pushLetter(letter: string) {
        _pushLetter(letter, layer, letterArr, setLetterArr);
    }
    function popLetter() {
        _popLetter(layer, letterArr, setLetterArr);
    }

    function cementLayer() {
        _cementLayer(layer, setLayer, accArray, setAccArray, matcher);
    }

    //exposure
    return [pushLetter, popLetter, cementLayer];
}

export default useLetterTracker;
