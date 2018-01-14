import {emptyBoard, hasLost, hasWon} from "./boardHelpers";


const boardFixture = {
    "0,0": {hasMine: true, hasFlag: false, isOpen: false, count: 0, id: "0,0"},
    "0,1": {hasMine: false, hasFlag: false, isOpen: false, count: 1, id: "0,1"},
    "1,0": {hasMine: false, hasFlag: false, isOpen: false, count: 1, id: "1,0"},
    "1,1": {hasMine: false, hasFlag: false, isOpen: false, count: 1, id: "1,1"}
};

const wonBoardFixture = {
    "0,0": {hasMine: true, hasFlag: true, isOpen: false},
    "0,1": {hasMine: false, hasFlag: false, isOpen: true},
    "1,0": {hasMine: true, hasFlag: true, isOpen: false},
    "1,1": {hasMine: false, hasFlag: false, isOpen: true}
};


const lostBoardFixture = {
    ...boardFixture, "0,0": {hasMine: true, hasFlag: false, isOpen: true, count: 0, id: "0,0"}
};

const playing1BoardFixture = {
    ...boardFixture, "1,0": {hasMine: false, hasFlag: false, isOpen: true}
};

const playing2BoardFixture = {
    ...boardFixture, "1,0": {hasMine: true, hasFlag: true, isOpen: false}
};

const playing3BoardFixture = {
    ...boardFixture, "1,0": {hasMine: false, hasFlag: true, isOpen: false}
};




describe("hasLost", () => {
    it("returns false when you haven't lost", () => {
        expect(hasLost(boardFixture)).toBeFalsy();
    });

    it("returns false when play in progress", () => {
        expect(hasLost(playing1BoardFixture)).toBeFalsy();
        expect(hasLost(playing2BoardFixture)).toBeFalsy();
        expect(hasLost(playing3BoardFixture)).toBeFalsy();

    });

    it("returns true when you have lost", () => {
        expect(hasLost(lostBoardFixture)).toBeTruthy();
    });
});

describe("hasWon ", () => {
    it("returns false when you haven't won", () => {
        expect(hasWon(boardFixture)).toBeFalsy();
    });

    it("returns false when you lose", () => {
        expect(hasWon(lostBoardFixture)).toBeFalsy();
    });

    it("returns false when play in progress", () => {
        expect(hasWon(playing1BoardFixture)).toBeFalsy();
        expect(hasWon(playing2BoardFixture)).toBeFalsy();
        expect(hasWon(playing3BoardFixture)).toBeFalsy();

    });

    it("returns true when you have win", () => {
        expect(hasWon(wonBoardFixture)).toBeTruthy();
    });
});


describe("empty board", () => {
    it("builds an object /w 9x9 = 81 keys", () => {
        expect(Object.keys(emptyBoard(9)).length).toEqual(81);
        expect(emptyBoard(9)["3,3"]).toBeDefined();
        expect(emptyBoard(9)["2,2"].id).toEqual("2,2");
    });
    it("sets the properties for each cell", () => {
        expect(Object.keys(emptyBoard(9)["3,3"])).toEqual(["hasMine", "hasFlag", "isOpen", "count", "id"]);

    })
});