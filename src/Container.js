import React  from 'react';

const Container = ({ placeholder = '', onClick } = props) => (
    <div className="selectContainer" onClick={onClick}>
        <div className="selectContainer-placeholder">{ placeholder }</div>
        <span className="selectContainer-arrow"></span>
    </div>
);

export default Container;
