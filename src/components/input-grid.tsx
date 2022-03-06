import { useEffect } from "react";
import useLetterTracker from "../helpers/useLetterTracker";

//compoment for the guess grid (shows what you got right / wrong)

function GuessBox() {
    const numGuess = 6;

    //custom hook allows for a new abstraction layer
    const { targetWord, letterHistory, accTracker, pushLetter, popLetter, cementLayer } = useLetterTracker(numGuess);

    console.log(letterHistory, accTracker);

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
            //return is used to clean up and add the new pointers
            window.removeEventListener("keydown", KeyDownEvent);
        };
    }, [letterHistory, accTracker, pushLetter, popLetter, cementLayer, targetWord]);

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
            <div className={`guess-box grid grid-cols-${targetWord.length} grid-rows-${numGuess} gap-2 w-[500px] h-[${100 * numGuess}px]`}>
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
