import React from 'react';
import PropTypes from "prop-types";

const LevelMenu = ({gameLevels, changeLevel, activeLevel}) => (
    <div className="MineSweeper__level">
        {gameLevels.map((gameLevel) => {
            const checked = gameLevel.id === activeLevel;
            return (
                <label>
                    <input
                        type="radio"
                        name="level"
                        onChange={() => changeLevel(gameLevel.id)}
                        checked={checked}/>
                    {gameLevel.name}
                </label>
            );
        })
        }
    </div>

);

LevelMenu.propTypes = {
    gameLevels: PropTypes.arrayOf(PropTypes.object).isRequired,
    changeLevel: PropTypes.func.isRequired,
    activeLevel: PropTypes.string.isRequired
};

export default LevelMenu;