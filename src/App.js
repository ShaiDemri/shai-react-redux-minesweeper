import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './App.css';
import minesweeperReducer from "./reducers/minesweeperReducer";
import Minesweeper from "./components/Minesweeper"
import {RESET_BOARD} from "./action/actionTypes";

const initAction = {
    type: RESET_BOARD,
    gLevel: "BEGINNER",
};

class App extends Component {
    render() {
        const store = createStore(
            minesweeperReducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
        store.dispatch(initAction);
        return (
            <Provider store={store}>
                <Minesweeper/>
            </Provider>
        );
    }
}

export default App;
