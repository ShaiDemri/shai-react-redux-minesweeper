import {RESET_BOARD, OPEN_CELL, TOGGLE_CELL_FLAG} from "../action/actionTypes";
import defaultStore from './defaultStore';
import * as BoardHelpers from "./boardHelpers";
import Levels, {mineLocationFor} from "./Levels";

const LEVELS = Levels();

const minesweeperReducer = (state = defaultStore, action = {type: ""}) => {
    switch (action.type) {
        case RESET_BOARD: {
            const level = action.gLevel || BoardHelpers.currentGameLevelId(state.board);
            const { boardSize } = LEVELS[level];
            const mineLocations = mineLocationFor(level);
            const board = BoardHelpers.resetBoard(boardSize, mineLocations);
            return {
                ...state, board
            };
        }

        case OPEN_CELL: {
            const board = BoardHelpers.open(state.board, action.id);
            return {...state.board, board};
        }

        case TOGGLE_CELL_FLAG: {
            const board = BoardHelpers.toggleFlag(state.board, action.id);
            return {...state, board};
        }

        default:
            return state;
    }
};
export {minesweeperReducer as default}
