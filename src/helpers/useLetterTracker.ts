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
            1. Correctness object
            2. User guess object
            3. Current Layer



*/

enum LetterStatus {
    WRONG,
    MISPLACED,
    CORRECT,
}

const emptyNumSpace = -1;
const emptyString = "";

//index type for type-safety
interface defaultObj<T> {
    [prop: number]: T[];
}

function genDefaultObject<T>(layerMax: number, arrLength: number, defaultValue: T) {
    const obj: defaultObj<T> = {};
    for (let i = 0; i < layerMax; i++) {
        obj[i] = new Array(arrLength).fill(defaultValue);
    }

    return obj;
}

//we will assume that all exposed calls are VALID calls.
function _pushLetter(
    letter: string,
    layer: number,
    letterHistory: defaultObj<string>,
    setLetterHistory: React.Dispatch<React.SetStateAction<defaultObj<string>>>
) {
    const workingLayer = [...letterHistory[layer]];
    const firstOpenIndex = workingLayer.indexOf(emptyString);
    if (firstOpenIndex < 0) return; //no spots left to push

    workingLayer[firstOpenIndex] = letter;
    const newHistory = Object.assign({}, letterHistory);
    newHistory[layer] = [...workingLayer];

    setLetterHistory(newHistory);
}
function _popLetter(layer: number, letterHistory: defaultObj<string>, setLetterHistory: Function) {}

function _cementLayer(layer: number, setLayer: Function, accTracker: defaultObj<LetterStatus>, setAccTracker: Function, matcher: Function) {}

//exposed functions ONLY for outside calling

function useLetterTracker(targetWord: string, layerMax: number) {
    const API = new WordleApi(targetWord);
    const matcher = API.checkAccuracy;

    //correctness array
    const [accTracker, setAccTracker] = useState(genDefaultObject(layerMax, targetWord.length, emptyNumSpace));

    //guess array
    let [letterHistory, setLetterHistory] = useState(() => {
        return genDefaultObject(layerMax, targetWord.length, emptyString);
    });
    const [layer, setLayer] = useState(0);

    function pushLetter(letter: string) {
        _pushLetter(letter, layer, letterHistory, setLetterHistory);
    }
    function popLetter() {
        return;
        //_popLetter(layer, letterHistory, setLetterHistory);
    }

    function cementLayer() {
        //_cementLayer(layer, setLayer, accTracker, setAccTracker, matcher);
    }

    //exposure
    return { letterHistory, accTracker, pushLetter, popLetter, cementLayer };
}

export default useLetterTracker;
