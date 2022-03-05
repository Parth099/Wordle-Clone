import { useEffect, useState } from "react";
import useLetterTracker from "../helpers/useLetterTracker";

//compoment for the guess grid (shows what you got right / wrong)

function GuessBox() {
    //custom hook allows for a new abstraction layer
    const { letterHistory, accTracker, pushLetter, popLetter, cementLayer } = useLetterTracker("array", 6);
    //runs once on mount (empty deps), adds keypress listener
    useEffect(() => {
        const KeyDownEvent = function (e: KeyboardEvent) {
            if (e.key === "Enter") {
                //cementLayer();
            }
            if (e.key === "Backspace") {
                //popLetter();
            }
            if (!/^[a-z]$/i.test(e.key)) {
                //regex test for alphabet, i - ignorecase
                return;
            }
            const keypress = e.key.toLowerCase(); //at this point we know its either a lc letter or up letter
            pushLetter(keypress);
        };

        window.addEventListener("keydown", KeyDownEvent);
        console.log("!");
        return () => {
            window.removeEventListener("keydown", KeyDownEvent);
        };
    }, [letterHistory, accTracker, pushLetter, popLetter, cementLayer]);

    return (
        <div className="grid-container mx-auto w-min mt-4 px-9">
            <div className="guess-box grid grid-cols-5 grid-rows-5 gap-2 w-[500px] h-[525px]">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
                <div>12</div>
                <div>13</div>
                <div>14</div>
                <div>15</div>
                <div>16</div>
                <div>17</div>
                <div>18</div>
                <div>19</div>
                <div>20</div>
                <div>21</div>
                <div>22</div>
                <div>23</div>
                <div>24</div>
                <div>25</div>
            </div>
        </div>
    );
}

export default GuessBox;
