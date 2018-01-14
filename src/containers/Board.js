//import React from 'react';
import {connect} from 'react-redux';
import Board from "../components/Board"
import * as BoardHelpers from "../reducers/boardHelpers";

const mapStateToProps = ({board}) => {
    const boardDim = Math.sqrt(Object.keys(board).length);
    const table = [];
    BoardHelpers.forBoardSize(boardDim,(coordinate,row,col)=>{
      if(!table[row]) { table[row]=[]; }
      table[row][col] = board[coordinate];

    });

    return {table, activeLevel: BoardHelpers.currentGameLevelId(board) }

};

const Container = connect(mapStateToProps)(Board);
export {Container as default, mapStateToProps};
