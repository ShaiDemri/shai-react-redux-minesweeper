import React from 'react';
import PropTypes from 'prop-types';

const OpenCell = ({count, hasMine}) => (
    <div className="Cell__cover Cell__cover--opened">
        {hasMine === false &&
        <span className={`Cell__number${count}`}>{count}</span>}
        {hasMine &&
        <span className="Cell__bomb">b</span>}
    </div>
);
OpenCell.propTypes = {
    count: PropTypes.number.isRequired,
    hasMine: PropTypes.bool.isRequired,
};

const ClosedCell = () => (
    <div className="Cell__cover" />
);

const FlaggedCell = () => (
    <div className="Cell__flag" />
);

const Cell = ({id, count, hasMine, isOpen, hasFlag, onOpen, onFlagToggle}) => (
    <td className="Cell" onClick={(k) => {
        if (!k.shiftKey) {
            onOpen(id)
        }else{
            onFlagToggle(id);
        }}
    }
    >
        {!isOpen && !hasFlag && <ClosedCell/>}
        {!isOpen && hasFlag && <FlaggedCell/>}
        {isOpen && <OpenCell hasMine={hasMine} count={count}/>}
    </td>
);

Cell.propTypes= {
    ...OpenCell.PropTypes,
    id: PropTypes.string.isRequired,
    hasFlag: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired,
    onFlagToggle: PropTypes.func.isRequired
};


export default Cell;
