import React from 'react';


const CheckItem = React.createClass({
    propTypes: {
        check: React.PropTypes.bool,
        label: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        onClick: React.PropTypes.func
    },
    render() {
        const { check, label, onClick } = this.props;
        return (
            <div className={'selectOption checkItem' + (check ? ' check' : '') } onClick={onClick}>
                <input className="checkItem-checkbox" type="checkbox" />
                <label className="checkItem-label">{ label }</label>
            </div>
        );
    }
});
export default CheckItem;
