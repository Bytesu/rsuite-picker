import React from 'react';
import ReactDOM from 'react-dom';
import Option from './Option';
import { toggleClass } from 'dom-lib';


const OptionGroup = React.createClass({
    handleClickGroup() {

        toggleClass(ReactDOM.findDOMNode(this.refs.title).parentNode, 'contract');
    },
    render() {
        const { selected, label, items, onClick } = this.props;
        return (
            <div className="selectGroup">
                <div className="selectGroup-title" ref='title' onClick={this.handleClickGroup}>
                    <span>{label}</span>
                    <span className="arrow"></span>
                </div>
                {
                    items.map((item, idx) =>
                        <Option key={idx} select={selected === item.value} label={item.label} onClick={onClick.bind(null, item) } />
                    )
                }
            </div>
        );
    }
});

export default OptionGroup;
