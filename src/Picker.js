import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import DropdownToggle from './DropdownToggle';
import Dropdown from './Dropdown';

import PickerMixin from './mixins/PickerMixin';

const Picker = React.createClass({
    mixins: [PickerMixin],
    propTypes: {
        options: PropTypes.array,
        onChange: PropTypes.func,
        height: PropTypes.number,
        dropup: PropTypes.bool,
        value: PropTypes.any    // default value
    },
    formatOption(option) {
        if (typeof (option) === 'string') {
            return {
                value: option,
                label: option
            };
        }
        return option;
    },

    getOptionByValue(value, options) {
        if (!value || !options) {
            return;
        }
        for (let i = 0, len = options.length; i < len; i++) {
            let option = this.formatOption(options[i]);
            // if item has items property, this item is a group
            // try to find target in this group
            if (option.items) {
                let ret = this.getOptionByValue(value, option.items);
                if (ret) {
                    return ret;
                }
            } else if (option.value === value) {
                return option;
            }
        }
    },

    getDefaultSelect(options) {
        const firstOption = (function getFirstOption(options) {
            for (let i = 0, len = options.length; i < len; i++) {
                if (options[i]) {
                    if (options[i].items) {
                        let ret = getFirstOption(options[i].items);
                        if (ret) {
                            return ret;
                        }
                    } else {
                        return options[i];
                    }
                }
            }
        })(options) || {};

        return this.formatOption(firstOption);
    },

    getInitialState() {
        const { value, options } = this.props;

        return {
            open: false,
            currentSelected: this.getOptionByValue(value, options) || this.getDefaultSelect(options)
        };
    },

    componentWillReceiveProps(nextProps) {
        const { value, options } = nextProps;
        this.setState({
            open: false,
            currentSelected: this.getOptionByValue(value, options) || this.getDefaultSelect(options)
        });
    },
    handleSelect(item, open = false) {
        const { onChange } = this.props;
        this.setState({
            currentSelected: item,
            open
        });

        onChange && onChange(item.value);
    },

    render() {

        const { options, height, className, inverse} = this.props;
        const { open, currentSelected, dropup } = this.state;
        const formattedOptions = options.map(this.formatOption);
        const classes = classNames('rsuite-Picker', className, {
            'expand': open,
            'inverse': inverse
        });

        return (
            <div className={classes}  >
                <DropdownToggle
                    placeholder={currentSelected.label}
                    onClick={this.toggleDropdown}
                    onKeyDown={this.handleKeyDown}
                    />
                {open && <Dropdown
                    ref='dropdown'
                    value={currentSelected.value}
                    options={formattedOptions}
                    height={height}
                    onSelect={this.handleSelect}
                    onKeyDown={this.handleKeyDown}
                    dropup={dropup}
                    onClose={this.handleClose}
                    />
                }
            </div>
        );
    }
});

export default Picker;
