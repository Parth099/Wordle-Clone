import WordleApi from "../wordleApi";

/*
    This file tests the wordleAPI's abilty to check how correct a word really is
        This means checking with letters are right/wrong/out of place

    Key:
         LetterStatus {WRONG, MISPLACED, CORRECT} --> {0, 1, 2}

*/

// target = ARRAY
const target = "array";
const W1 = new WordleApi(target);

test(`T = "${target}", G = "rated"`, () => {
    const result = W1.checkAccuracy("rated");
    expect(result).toEqual([1, 1, 0, 0, 0]);
});

test(`T = "${target}", G = "cream"`, () => {
    const result = W1.checkAccuracy("cream");
    expect(result).toEqual([0, 2, 0, 2, 0]);
});

test(`T = "${target}", G = "roate"`, () => {
    const result = W1.checkAccuracy("roate");
    expect(result).toEqual([1, 0, 1, 0, 0]);
});

//wordle 255
//rupee
const target2 = "rupee";
const W2 = new WordleApi(target2);

test(`T = "${target2}", G = "rusty"`, () => {
    const result = W2.checkAccuracy("rusty");
    expect(result).toEqual([2, 2, 0, 0, 0]);
});

//nothing correct
test(`T = "${target2}", G = "nails"`, () => {
    const result = W2.checkAccuracy("nails");
    expect(result).toEqual([0, 0, 0, 0, 0]);
});

//invalid word yet tests an important presedence
test(`T = "${target2}", G = "pppee"`, () => {
    const result = W2.checkAccuracy("pppee");
    expect(result).toEqual([0, 0, 2, 2, 2]);
});

//correct word
test(`T = "${target2}", G = "rupee"`, () => {
    const result = W2.checkAccuracy("rupee");
    expect(result).toEqual([2, 2, 2, 2, 2]);
});

//harder tests

//T: balloon
//all incorrect
const target3 = "balloon";
const W3 = new WordleApi(target3);

test(`T = "${target3}", G = "nooball"`, () => {
    const result = W3.checkAccuracy("nooball");
    expect(result).toEqual([1, 1, 1, 1, 1, 1, 1]);
});

test(`T = "${target3}", G = "baboons"`, () => {
    const result = W3.checkAccuracy("baboons");
    expect(result).toEqual([2, 2, 0, 1, 2, 1, 0]);
});

test(`T = "${target3}", G = "twizzle"`, () => {
    const result = W3.checkAccuracy("twizzle");
    expect(result).toEqual([0, 0, 0, 0, 0, 1, 0]);
});
