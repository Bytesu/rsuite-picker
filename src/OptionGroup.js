import React from 'react';
import ReactDOM from 'react-dom';
import Option from './Option';
import { toggleClass } from 'dom-lib';


const OptionGroup = React.createClass({
    handleClickGroup() {
        toggleClass(ReactDOM.findDOMNode(this), 'shrink');
    },
    renderOption(item, index){

        const { selected, onSelect, onKeyDown } = this.props;
        return (
            <Option
                key={index}
                onKeyDown={onKeyDown}
                selected={selected === item.value}
                label={item.label}
                value={item.value}
                onSelect={ onSelect && onSelect.bind(null, item) }
                />
        );
    },
    render() {

        const {  label, items = [], children,  ...props } = this.props;
        return (
            <div
                className="selectGroup"
                {...props}
            >
                <div className="selectGroup-title" ref='title' onClick={this.handleClickGroup}>
                    <span>{label}</span>
                    <span className="arrow"></span>
                </div>
                {
                    items.length ? items.map((item, index) => this.renderOption(item, index)) :
                    children
                }
            </div>
        );
    }
});

export default OptionGroup;
