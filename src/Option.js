import React from 'react';

const Option = React.createClass({
    propTypes: {
        selected: React.PropTypes.bool,
        value: React.PropTypes.any,
        label: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        onClick: React.PropTypes.func
    },
    render() {
        const { selected, label, value,  onClick, ...props } = this.props;
        return (
            <a
                {...props}
                className={'selectOption' + (selected ? ' active' : '')}
                href=''
                role="menuitem"
                data-value={value}
                onClick={(event) => {
                    onClick && onClick(event);
                    event.preventDefault();
                } }>
                {label}
            </a>
        );
    }
});

export default Option;
