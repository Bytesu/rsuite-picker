import React from 'react';
import ReactDOM from 'react-dom';
import CheckItem from './CheckItem';
import { toggleClass } from 'dom-lib';

const CheckGroup = React.createClass({
    propTypes: {
        items: React.PropTypes.array,
        excludeItems: React.PropTypes.array,
        label: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        onClick: React.PropTypes.func
    },
    handleClickGroup() {
        toggleClass(ReactDOM.findDOMNode(this.refs.title).parentNode, 'contract');
    },
    render() {
        const { items = [], label, onClick, excludeItems = []} = this.props;
        let checkList = items.filter((item) => {
            let flag = true;
            excludeItems.forEach((excItem) => {
                if (item.value === excItem.value) {
                    flag = false;
                }
            });
            return flag;
        });

        if (!checkList.length) {
            return null;
        }

        checkList = checkList.map((item, idx) => {
            return <CheckItem key={idx} check={item.check} label={item.label} onClick={onClick.bind(null, item) } />;
        });

        return (
            <div className="selectGroup">
                <div className="selectGroup-title" ref='title' onClick={this.handleClickGroup}>
                    <span>{label}</span>
                    <span className="arrow"></span>
                </div>
                { checkList }
            </div>
        );
    }
});

export default CheckGroup;
