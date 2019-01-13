import {OPEN_CELL, RESET_BOARD, TOGGLE_CELL_FLAG} from "../action/actionTypes";
import minesweeperReducer from "./minesweeperReducer";
import {open, resetBoard, toggleFlag} from "./boardHelpers";
// import defaultStore from "./defaultStore";
// import {forBoardSize} from "./boardHelpers";

it("defines a board", () => {
    expect(minesweeperReducer().board).toBeDefined();
});


describe("board action", () => {
    //let initState;
    //let initAction;
    let board;
    //const defaultInitAction = {
    //    type: RESET_BOARD,
    //    boardSize: 3,
    //    mineLocations: ["1,1", "2,2"]

   // };
    //const createInitState = () => minesweeperReducer(defaultStore, initAction);

    describe("RESET_BOARD", () =>{

        beforeEach(() => {
             const boardSize = 3;
             const mineLocations= ["1,1", "2,2"];
            board = resetBoard(boardSize, mineLocations);
     //       initAction = defaultInitAction;
     //       initState = createInitState();
        });

    it("sets the correct true values", () => {
        expect(board["1,1"].hasMine).toEqual(true);
        expect(board["2,2"].hasMine).toEqual(true);
    });

    it("sets the correct false values", () => {
        expect(board["0,0"].hasMine).toEqual(false);
        expect(board["0,1"].hasMine).toEqual(false);
        expect(board["0,2"].hasMine).toEqual(false);
        expect(board["1,0"].hasMine).toEqual(false);
        expect(board["1,2"].hasMine).toEqual(false);
        expect(board["2,0"].hasMine).toEqual(false);
        expect(board["2,1"].hasMine).toEqual(false);
    });


    it("check the count values", () => {
        expect(board["0,0"].count).toEqual(1);
        expect(board["0,1"].count).toEqual(1);
        expect(board["0,2"].count).toEqual(1);
        expect(board["1,0"].count).toEqual(1);
        expect(board["1,2"].count).toEqual(2);
        expect(board["2,0"].count).toEqual(1);
        expect(board["2,1"].count).toEqual(2);

    });
});
describe("flag and open action", () => {
    //const openAction = {type: OPEN_CELL, id: "0,1"};
    let board;
    const boardSize = 3;
    const mineLocations = ["1,1", "2,2"];

    describe("OPEN_CELL", () => {

        beforeEach(() => {
            board = resetBoard(boardSize, mineLocations);
        });

        it("sets isOpen for id", () => {
            expect(board["0,1"].isOpen).toEqual(false);
            //const newState = minesweeperReducer(initState, openAction);
            const newState = open(board, "0,1");
            expect(newState["0,1"].isOpen).toEqual(true);
        });

        describe("when hsaFlag is true", () => {
            beforeEach(() => {
                board = resetBoard(boardSize, mineLocations);
                board["0,1"].hasFlag = true;
            });

            // let hasFlagState;
            // beforeEach(() => {
            //     const toggleAction = {type: TOGGLE_CELL_FLAG, id: "0,1"};
            //     hasFlagState = minesweeperReducer(initState, toggleAction);
            // });
            it("does not set isOpen", () => {
                //const newState = minesweeperReducer(hasFlagState, openAction);
                const newState = open(board, "0,1");
                expect(newState["0,1"].hasFlag).toEqual(true);
                expect(newState["0,1"].isOpen).toEqual(false);
            });
        });
    });

    describe("TOGGLE_CELL_FLAG", () => {
        //const toggleAction = {type: TOGGLE_CELL_FLAG, id: "0,1"};

        describe("flag changes from false to true", () => {
            beforeEach(() => {
                board = resetBoard(boardSize, mineLocations);
                board["0,1"].hasFlag = false;
            });
            it("sets isFlag for id", () => {
                //const newState = minesweeperReducer(initState, toggleAction);
                const newState = toggleFlag(board, "0,1");
                    expect(newState["0,1"].hasFlag).toEqual(true);
            });
        });
        describe("when already isOpen", () => {
            //let toggledState;
            //beforeEach(() => {
                //toggledState = minesweeperReducer(initState, openAction);

            //});
            beforeEach(() => {
                board = resetBoard(boardSize, mineLocations);
                board["0,1"].isOpen = true;
            });
            it("can not change hasFlag", () => {
                //const newState = minesweeperReducer(toggledState, toggleAction);
                const newState = toggleFlag(board, "0,1");
                expect(newState["0,1"].isOpen).toEqual(true);
                expect(newState["0,1"].hasFlag).toEqual(false);

            });
        });

        describe("flag changes from true to false", () => {
            // let toggledState;
            // beforeEach(() => {
            //     toggledState = minesweeperReducer(initState, toggleAction);
            // });

            it("sets isFlag for id", () => {
                //const newState = minesweeperReducer(toggledState, toggleAction);
                const newState = toggleFlag(board, "0,1");
                expect(newState["0,1"].hasFlag).toEqual(false);
            });
        });
    });
});
describe("test openAround", () => {
    // const openAroundInitAction = {
    //     type: RESET_BOARD,
    //     boardSize: 5,
    //     mineLocations: ["1,3", "3,3"]
    // };
    //
    // beforeEach(()=>{
    //    initAction=openAroundInitAction;
    //    initState = createInitState();
    // });
    let board;
    const boardSize = 5;
    const mineLocations = ["1,3", "3,3"];

    beforeEach(() => {
        board = resetBoard(boardSize, mineLocations);
    });

    describe("when opening a zero cell", () => {
        // const openAction = {type: OPEN_CELL, id: "1,1"};


        it("open cells around", () => {

        //    const newState = minesweeperReducer(initState, openAction);
            const newState = open(board, "1,1");

            expect(newState["0,0"].isOpen).toEqual(true);
            expect(newState["0,1"].isOpen).toEqual(true);
            expect(newState["0,2"].isOpen).toEqual(true);

            expect(newState["0,3"].isOpen).toEqual(false);
            expect(newState["0,4"].isOpen).toEqual(false);

            expect(newState["1,0"].isOpen).toEqual(true);
            expect(newState["1,1"].isOpen).toEqual(true);
            expect(newState["1,2"].isOpen).toEqual(true);

            expect(newState["1,3"].isOpen).toEqual(false);
            expect(newState["1,4"].isOpen).toEqual(false);

            expect(newState["2,0"].isOpen).toEqual(true);
            expect(newState["2,1"].isOpen).toEqual(true);
            expect(newState["2,2"].isOpen).toEqual(true);

            expect(newState["2,3"].isOpen).toEqual(false);
            expect(newState["2,4"].isOpen).toEqual(false);

            expect(newState["3,0"].isOpen).toEqual(true);
            expect(newState["3,1"].isOpen).toEqual(true);
            expect(newState["3,2"].isOpen).toEqual(true);

            expect(newState["3,3"].isOpen).toEqual(false);
            expect(newState["3,4"].isOpen).toEqual(false);

            expect(newState["4,0"].isOpen).toEqual(true);
            expect(newState["4,1"].isOpen).toEqual(true);
            expect(newState["4,2"].isOpen).toEqual(true);

            expect(newState["4,3"].isOpen).toEqual(false);
            expect(newState["4,4"].isOpen).toEqual(false);

        });
    });
});
});
