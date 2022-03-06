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
type setStateFunc<T> = React.Dispatch<React.SetStateAction<defaultObj<T>>>;

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
function _pushLetter(letter: string, layer: number, letterHistory: defaultObj<string>, setLetterHistory: setStateFunc<string>) {
    /*
        finds a VALID spot on our current layer and pushes the letter updating the state
    */

    const workingLayer = [...letterHistory[layer]];
    const firstOpenIndex = workingLayer.indexOf(emptyString);
    if (firstOpenIndex < 0) return; //no spots left to push

    workingLayer[firstOpenIndex] = letter;
    const newHistory = Object.assign({}, letterHistory);
    newHistory[layer] = [...workingLayer]; //NTS : test w/o [...arr]

    setLetterHistory(newHistory);
}
function _popLetter(layer: number, letterHistory: defaultObj<string>, setLetterHistory: setStateFunc<string>) {
    /*
        attemps to find the last pushed letter by finding the lastest `emptyString`
    */

    const workingLayer = [...letterHistory[layer]];
    const lastOpenIndex = workingLayer.indexOf(emptyString);

    if (lastOpenIndex === 0) return; //nothing to remove
    if (lastOpenIndex === -1) {
        workingLayer[workingLayer.length - 1] = emptyString;
    } else {
        //its not at the start or at the end
        workingLayer[lastOpenIndex - 1] = emptyString; //set the prev index to empty
    }

    const newHistory = Object.assign({}, letterHistory);
    newHistory[layer] = [...workingLayer]; //NTS : test w/o [...arr]

    setLetterHistory(newHistory);
}

function _cementLayer(
    layer: number,
    setLayer: Function,
    letterHistory: defaultObj<string>,
    accTracker: defaultObj<LetterStatus>,
    setAccTracker: setStateFunc<LetterStatus>,
    matcher: (s: string) => LetterStatus[],
    layerMax: number
) {
    const isCompletedLayer = letterHistory[layer].indexOf(emptyString) === -1;
    if (!isCompletedLayer) return;

    //adds up the letters
    const usrGuess = letterHistory[layer].reduce((prevLetter, currletter) => prevLetter + currletter, "");
    const usrValidity = matcher(usrGuess);

    //state setup
    const newAccTracker = Object.assign({}, accTracker);
    newAccTracker[layer] = [...usrValidity];
    setAccTracker(newAccTracker);

    const userScore = usrValidity.reduce((prev, curr) => prev + curr, 0);
    if (userScore === usrValidity.length * 2) {
        setLayer(layerMax); //blocks user input after hitting max layer
    } else {
        setLayer(layer + 1);
    }
}

//exposed functions ONLY for outside calling

function useLetterTracker(targetWord: string, layerMax: number) {
    //makes it so we cannot alter the api calls
    const API = new WordleApi(targetWord);
    const matcher = API.checkAccuracy.bind(API);

    //correctness array
    const [accTracker, setAccTracker] = useState(genDefaultObject(layerMax, targetWord.length, emptyNumSpace));

    //guess array
    let [letterHistory, setLetterHistory] = useState(() => {
        return genDefaultObject(layerMax, targetWord.length, emptyString);
    });
    const [layer, setLayer] = useState(0);

    function pushLetter(letter: string) {
        if (layer === layerMax) return;
        _pushLetter(letter, layer, letterHistory, setLetterHistory);
    }
    function popLetter() {
        if (layer === layerMax) return;
        _popLetter(layer, letterHistory, setLetterHistory);
    }

    function cementLayer() {
        if (layer === layerMax) return;
        _cementLayer(layer, setLayer, letterHistory, accTracker, setAccTracker, matcher, layerMax);
    }

    //exposure
    return { letterHistory, accTracker, pushLetter, popLetter, cementLayer };
}

export default useLetterTracker;
