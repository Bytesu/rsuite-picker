import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { getHeight, scrollTop, hasClass, removeClass} from 'dom-lib';

import OptionGroup from './OptionGroup';
import Option from './Option';

import CheckGroup from './CheckGroup';
import CheckItem from './CheckItem';

const DropdownMenu = React.createClass({
    propTypes: {
        selected: PropTypes.any,
        items: PropTypes.array,
        height: PropTypes.number,
        onClick: PropTypes.func,
        multiple: PropTypes.bool
    },
    componentWillReceiveProps(nextProps) {

        if (!nextProps.multiple && nextProps.selected !== this.props.selected) {

            const node = ReactDOM.findDOMNode(this);
            const options = Array.from(node.querySelectorAll('.selectOption, .selectGroup-title'));
            const groups = Array.from(node.querySelectorAll('.selectGroup'));
            const { height } = this.props;
            if (!options.length) {
                return;
            }

            const itemHeight = getHeight(options[0]) || 32;
            const dropdownDOM = ReactDOM.findDOMNode(this.refs.menu);
            let activeIndex = 0;

            for (let i = 0; i < options.length; i++) {
                if (hasClass(options[i], 'active')) {
                    activeIndex = i;
                }
            }

            for (let i = 0; i < groups.length; i++) {
                removeClass(groups[i], 'contract');
            }

            scrollTop(dropdownDOM, (activeIndex + 2) * itemHeight - height);

        }
    },
    renderOptions() {
        const { selected, items, onClick } = this.props;
        return items.map((item, idx) => {
            if (item.items) {
                return <OptionGroup key={idx} selected={selected} items={item.items} label={item.label} onClick={onClick} />;
            }
            return <Option  key={idx}  select={selected === item.value} label={item.label} onClick={onClick.bind(null, item) } />;
        });
    },
    getCheckedItem(checkedItem) {
        const { items } = this.props;
        let checked = true;

        items.forEach((group) => {
            if (checkedItem.value === group.value) {
                checked = group.check;
            }
            if (group.items && group.items.length) {
                group.items.forEach((item) => {
                    if (checkedItem.value === item.value) {
                        checked = item.check;
                    }
                });
            }
        });
        return Object.assign({}, checkedItem, {
            check: checked
        });;
    },
    renderCheckList() {

        const { items, onClick } = this.props;
        const { checkedItems = []} = this.state;
        const options = items.filter((item) => {
            let flag = true;
            checkedItems.forEach((excItem) => {
                if (item.value === excItem.value) {
                    flag = false;
                }
            });
            return flag;
        }).map((item, idx) => {
            if (item.items) {
                return <CheckGroup key={idx} label={item.label} items={item.items} excludeItems={checkedItems} onClick={onClick} />;
            }
            return <CheckItem key={idx} check={item.check} label={item.label} onClick={onClick.bind(null, item) } />;
        });

        if (checkedItems.length) {
            options.unshift(<hr key={Math.random() * 1E18}/>);
            options.unshift(checkedItems.map((item, idx) => {
                let newItem = this.getCheckedItem(item);
                return <CheckItem key={idx} check={newItem.check } label={newItem.label} onClick={onClick.bind(null, newItem) } />;
            }));
            options.unshift(<div key={Math.random() * 1E18}><a className="btnClear">Clear selected</a></div>);
        }

        return options;
    },

    componentWillMount() {
        const { items } = this.props;
        let checkedItems = items.filter((item) => {
            return item.check;
        });

        items.forEach((group) => {
            if (group.items && group.items.length) {
                let subItems = group.items.filter((item) => {
                    return item.check;
                });
                checkedItems = checkedItems.concat(subItems);
            }
        });

        this.setState({ checkedItems });
    },
    render() {
        const { multiple, height } = this.props;
        const classes = multiple ? 'checkList' : 'selectList';
        return (
            <div className={classes} key  ref='menu'  style={{ maxHeight: height }}>
                {multiple ? this.renderCheckList() : this.renderOptions() }
            </div>
        );
    }
});

export default DropdownMenu;
