import React from 'react';
import ReactDOM from 'react-dom';
import Option from './Option';
import { toggleClass } from 'dom-lib';


const OptionGroup = React.createClass({
    handleClickGroup() {

        toggleClass(ReactDOM.findDOMNode(this.refs.title).parentNode, 'contract');
    },
    render() {
        const { selected, label, items, onSelect, onKeyDown } = this.props;
        return (
            <div className="selectGroup">
                <div className="selectGroup-title" ref='title' onClick={this.handleClickGroup}>
                    <span>{label}</span>
                    <span className="arrow"></span>
                </div>
                {
                    items.map((item, index) =>
                        <Option
                            key={index}
                            onKeyDown={onKeyDown}
                            selected={selected === item.value}
                            label={item.label}
                            value={item.value}
                            onClick={onSelect.bind(null, item)}
                            />
                    )
                }
            </div>
        );
    }
});

export default OptionGroup;
