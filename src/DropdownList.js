import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { getHeight, scrollTop, hasClass, removeClass} from 'dom-lib';

import OptionGroup from './OptionGroup';
import Option from './Option';

const DropdownList = React.createClass({
    propTypes: {
        selected: PropTypes.any,
        items: PropTypes.array,
        height: PropTypes.number,
        onClick: PropTypes.func
    },
    componentWillReceiveProps(nextProps) {

        if (nextProps.selected !== this.props.selected) {

            const node = ReactDOM.findDOMNode(this);
            const options = Array.from(node.querySelectorAll('.selectOption, .selectGroup-title'));
            const groups = Array.from(node.querySelectorAll('.selectGroup'));

            const { height } = this.props;

            if (!options.length) {
                return;
            }

            const itemHeight = getHeight(options[0]) || 32;
            const dropdownDOM = ReactDOM.findDOMNode(this.refs.dropdownList);
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
    render() {
        const { selected, items, onClick, height } = this.props;
        const options = items.map((item, idx) => {
            if (item.items) {
                return <OptionGroup key={idx} selected={selected} items={item.items} label={item.label} onClick={onClick} />;
            }
            return <Option ref='item'  select={selected === item.value} key={idx} label={item.label} onClick={onClick.bind(null, item) } />;
        });

        return (
            <div className="selectList" ref='dropdownList'  style={{ maxHeight: height }}>
                {options}
            </div>
        );
    }
});

export default DropdownList;
