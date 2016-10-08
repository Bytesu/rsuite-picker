import React from 'react';

const Option = React.createClass({
    propTypes: {
        select: React.PropTypes.bool,
        label: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        onClick: React.PropTypes.func
    },
    render() {
        const { select, label, onClick } = this.props;
        return (
            <div className={'selectOption' + (select ? ' active' : '') } onClick={onClick}>
                {label}
            </div>
        );
    }
});

export default Option;
