import {RESET_BOARD, OPEN_CELL, TOGGLE_CELL_FLAG} from "../action/actionTypes";
import minesweeperReducer from "./minesweeperReducer";
import defaultStore from "./defaultStore";

it("defines a board", () => {
    expect(minesweeperReducer().board).toBeDefined();
});


describe("board action", () => {
    let initState;
    let initAction;
    const defaultInitAction = {
        type: RESET_BOARD,
        boardSize: 3,
        mineLocations: ["1,1", "2,2"]
    };
    const createInitState = () => minesweeperReducer(defaultStore, initAction);

    describe("RESET_BOARD", () =>{

        beforeEach(() => {
            initAction = defaultInitAction;
            initState = createInitState();
        });

    it("sets the correct true values", () => {
        expect(initState.board["1,1"].hasMine).toEqual(true);
        expect(initState.board["2,2"].hasMine).toEqual(true);
    });

    it("sets the correct false values", () => {
        expect(initState.board["0,0"].hasMine).toEqual(false);
        expect(initState.board["0,1"].hasMine).toEqual(false);
        expect(initState.board["0,2"].hasMine).toEqual(false);
        expect(initState.board["1,0"].hasMine).toEqual(false);
        expect(initState.board["1,2"].hasMine).toEqual(false);
        expect(initState.board["2,0"].hasMine).toEqual(false);
        expect(initState.board["2,1"].hasMine).toEqual(false);
    });


    it("check the count values", () => {
        expect(initState.board["0,0"].count).toEqual(1);
        expect(initState.board["0,1"].count).toEqual(1);
        expect(initState.board["0,2"].count).toEqual(1);
        expect(initState.board["1,0"].count).toEqual(1);
        expect(initState.board["1,2"].count).toEqual(2);
        expect(initState.board["2,0"].count).toEqual(1);
        expect(initState.board["2,1"].count).toEqual(2);

    });
});
describe("flag and open action", () => {
    const openAction = {type: OPEN_CELL, id: "0,1"};

    describe("OPEN_CELL", () => {

        it("sets isOpen for id", () => {
            expect(initState.board["0,1"].isOpen).toEqual(false);
            const newState = minesweeperReducer(initState, openAction);
            expect(newState.board["0,1"].isOpen).toEqual(true);
        });

        describe("when hsaFlag is true", () => {
            let hasFlagState;
            beforeEach(() => {
                const toggleAction = {type: TOGGLE_CELL_FLAG, id: "0,1"};
                hasFlagState = minesweeperReducer(initState, toggleAction);
            });
            it("does not set isOpen", () => {
                const newState = minesweeperReducer(hasFlagState, openAction);
                expect(newState.board["0,1"].hasFlag).toEqual(true);
                expect(newState.board["0,1"].isOpen).toEqual(false);
            });
        });
    });

    describe("TOGGLE_CELL_FLAG", () => {
        const toggleAction = {type: TOGGLE_CELL_FLAG, id: "0,1"};

        describe("flag changes from false to true", () => {
            it("sets isFlag for id", () => {
                const newState = minesweeperReducer(initState, toggleAction);
                expect(newState.board["0,1"].hasFlag).toEqual(true);
            });
        });
        describe("when already isOpen", () => {
            let toggledState;
            beforeEach(() => {
                toggledState = minesweeperReducer(initState, openAction);
            });
            it("can not change hasFlag", () => {
                const newState = minesweeperReducer(toggledState, toggleAction);
                expect(newState.board["0,1"].isOpen).toEqual(true);
                expect(newState.board["0,1"].hasFlag).toEqual(false);

            });
        });

        describe("flag changes from true to false", () => {
            let toggledState;
            beforeEach(() => {
                toggledState = minesweeperReducer(initState, toggleAction);
            });

            it("sets isFlag for id", () => {
                const newState = minesweeperReducer(toggledState, toggleAction);
                expect(newState.board["0,1"].hasFlag).toEqual(false);
            });
        });
    });
});
describe("test openAround", () => {
    const openAroundInitAction = {
        type: RESET_BOARD,
        boardSize: 5,
        mineLocations: ["1,3", "3,3"]
    };

    beforeEach(()=>{
       initAction=openAroundInitAction;
       initState = createInitState();
    });

    describe("when opening a zero cell", () => {
        const openAction = {type: OPEN_CELL, id: "1,1"};

        it("open cells around", () => {

            const newState = minesweeperReducer(initState, openAction);

            expect(newState.board["0,0"].isOpen).toEqual(true);
            expect(newState.board["0,1"].isOpen).toEqual(true);
            expect(newState.board["0,2"].isOpen).toEqual(true);

            expect(newState.board["0,3"].isOpen).toEqual(false);
            expect(newState.board["0,4"].isOpen).toEqual(false);

            expect(newState.board["1,0"].isOpen).toEqual(true);
            expect(newState.board["1,1"].isOpen).toEqual(true);
            expect(newState.board["1,2"].isOpen).toEqual(true);

            expect(newState.board["1,3"].isOpen).toEqual(false);
            expect(newState.board["1,4"].isOpen).toEqual(false);

            expect(newState.board["2,0"].isOpen).toEqual(true);
            expect(newState.board["2,1"].isOpen).toEqual(true);
            expect(newState.board["2,2"].isOpen).toEqual(true);

            expect(newState.board["2,3"].isOpen).toEqual(false);
            expect(newState.board["2,4"].isOpen).toEqual(false);

            expect(newState.board["3,0"].isOpen).toEqual(true);
            expect(newState.board["3,1"].isOpen).toEqual(true);
            expect(newState.board["3,2"].isOpen).toEqual(true);

            expect(newState.board["3,3"].isOpen).toEqual(false);
            expect(newState.board["3,4"].isOpen).toEqual(false);

            expect(newState.board["4,0"].isOpen).toEqual(true);
            expect(newState.board["4,1"].isOpen).toEqual(true);
            expect(newState.board["4,2"].isOpen).toEqual(true);

            expect(newState.board["4,3"].isOpen).toEqual(false);
            expect(newState.board["4,4"].isOpen).toEqual(false);

        });
    });
});
});
