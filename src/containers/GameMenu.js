import {connect} from 'react-redux';
import GameMenu from "../components/GameMenu";
import * as BoardHelpers from "../reducers/boardHelpers";
import {RESET_BOARD} from "../action/actionTypes";

const mapStateToProps = ({ board }) => {
    const flagCount = BoardHelpers.flagCount(board);
    const mineCount = BoardHelpers.mineCount(board);

    let gameStatus = "playing";
    if (BoardHelpers.hasWon(board)) {
        gameStatus = "winner";
    } else if (BoardHelpers.hasLost(board)) {
        gameStatus = "loser";
    } else if (BoardHelpers.notPlaying(board)) {
        gameStatus = "notPlaying";
    }

    return { gameStatus, flagCount, mineCount };
};

const mapDispatchToProps = (dispatch) => ({
    resetGame: () => {
        dispatch({ type: RESET_BOARD });
    }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(GameMenu);

export {Container as default, mapStateToProps}