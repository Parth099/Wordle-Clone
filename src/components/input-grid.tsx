import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import useLetterTracker from "../helpers/useLetterTracker";
import wordList from "../helpers/word_list.json";

//compoment for the guess grid (shows what you got right / wrong)

function GuessBox() {
    //custom hook allows for a new abstraction layer
    const [secretWord, setSecretWord] = useState("array");
    const numGuess = 6;

    const [validWordList, setValidWordList] = useState<string[]>([]);
    console.log(secretWord);

    const min = 5;
    const max = 9;

    useEffect(() => {
        const length = Math.floor(Math.random() * (max - min) + min); //picks int between 5 and 8 inclusive
        const wordArr: string[] = [];
        for (const property in wordList) {
            //console.log(property);
            if (property.length === length) {
                wordArr.push(property);
            }
        }
        const randword = wordArr[Math.floor(Math.random() * wordArr.length)];
        setSecretWord(randword);
        setValidWordList(wordArr);

        //console.log(secretWord);
    }, []);

    const { letterHistory, accTracker, pushLetter, popLetter, cementLayer } = useLetterTracker(secretWord, numGuess, validWordList);

    //runs once on mount (empty deps), adds keypress listener

    useEffect(() => {
        const KeyDownEvent = function (e: KeyboardEvent) {
            if (e.key === "Enter") {
                cementLayer();
            }
            if (e.key === "Backspace") {
                popLetter();
            }
            if (!/^[a-z]$/i.test(e.key)) {
                //regex test for alphabet, i - ignorecase
                return;
            }
            const keypress = e.key.toLowerCase(); //at this point we know its either a lc letter or up letter
            pushLetter(keypress);
        };

        window.addEventListener("keydown", KeyDownEvent);
        return () => {
            window.removeEventListener("keydown", KeyDownEvent);
        };
    }, [letterHistory, accTracker, pushLetter, popLetter, cementLayer, secretWord]);

    //render helpers
    const getColorClass = (correctness: number) => {
        let rval = "";
        switch (correctness) {
            case 0:
                rval = "wrong";
                break;
            case 1:
                rval = "misplaced";
                break;

            case 2:
                rval = "correct";
                break;
            default:
                break;
        }

        if (rval) {
            return rval + " decided";
        }
        return rval;
    };

    return (
        <div className="grid-container mx-auto w-min mt-4 px-9">
            <div className={`guess-box grid grid-cols-${secretWord.length} grid-rows-${numGuess} gap-2 w-[500px] h-[${100 * numGuess}px]`}>
                {new Array(numGuess).fill(0).map(function (_, idx) {
                    const board: JSX.Element[] = [];

                    letterHistory[idx].forEach((value, sidx) => {
                        board.push(
                            <div className="square" key={sidx + "" + idx}>
                                <div className={`content box ${getColorClass(accTracker[idx][sidx])}`}>
                                    <span>{value.toUpperCase()}</span>
                                </div>
                            </div>
                        );
                    });

                    return board;
                })}
            </div>
        </div>
    );
}

export default GuessBox;
