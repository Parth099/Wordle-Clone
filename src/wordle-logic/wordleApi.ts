enum LetterStatus {
    WRONG,
    MISPLACED,
    CORRECT,
}

export default class WordleApi {
    private readonly targetWord: string;
    public readonly WORDLEN: number;

    //employ singleton pattern? maybe later
    constructor(target: string) {
        this.targetWord = target.toLowerCase();
        this.WORDLEN = target.length;
    }

    get target() {
        return this.targetWord; //no setter
    }

    /*
        How this works: [v1]
            Iteration 1 - 2: Mark off all correct words and remove the correct positions from the guess
            
            Iteration 3 : 
                Check for misplacements by seeing if a valid index is present for a given present letter
                in guess. If this letter is removed *once* from target 
                
            
    */
    checkAccuracy(guess: string) {
        let targetCopy = this.targetWord;

        //array can only hold 0, 1 or 2
        const checkedArr: Array<LetterStatus> = new Array(targetCopy.length).fill(LetterStatus.WRONG);

        //collect correct letters 1st
        for (let i = 0; i < this.WORDLEN; i++) {
            if (guess[i] === targetCopy[i]) {
                checkedArr[i] = LetterStatus.CORRECT;
            }
        }

        //guess and target letter replacement
        let newCopy = "";
        let newGuess = "";
        for (let j = 0; j < this.WORDLEN; j++) {
            if (checkedArr[j] === LetterStatus.CORRECT) {
                newCopy += "_";
                newGuess += "_";
            } else {
                newCopy += targetCopy[j];
                newGuess += guess[j];
            }
        }

        //copied over new vars to make this easy to follow
        targetCopy = newCopy;
        guess = newGuess;

        //checking for misplacements
        for (let k = 0; k < this.WORDLEN; k++) {
            //only those that are wrong can be possibly misplaced
            //note LetterStatus.WRONG will skip over '_' (replacements)
            if (checkedArr[k] === LetterStatus.WRONG && targetCopy.indexOf(guess[k]) >= 0) {
                //default (non regex) behavior of replace is replacement of first instance
                targetCopy = targetCopy.replace(guess[k], "_");
                checkedArr[k] = LetterStatus.MISPLACED;
            }
        }
        return checkedArr;
    }
}
