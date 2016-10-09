import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import Container from './Container';
import Dropdown from './Dropdown';

import FormGroupMixin from './mixins/FormGroupMixin';
import PickerMixin from './mixins/PickerMixin';

const Picker = React.createClass({
    mixins: [FormGroupMixin, PickerMixin],
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
        const { value: groupValue } = this.getFormGroup();
        const { value, options } = this.props;

        return {
            active: false,
            currentSelected: this.getOptionByValue(groupValue || value, options) || this.getDefaultSelect(options)
        };
    },

    componentWillReceiveProps(nextProps) {
        const { value, options } = nextProps;
        const { value: groupValue } = this.getFormGroup();
        this.setState({
            active: false,
            currentSelected: this.getOptionByValue(groupValue || value, options) || this.getDefaultSelect(options)
        });
    },
    handleSelect(item, active = false) {
        const { onChange } = this.props;
        const { onChange: onGroupChange } = this.getFormGroup();
        this.setState({
            currentSelected: item,
            active
        });

        let currentSelectedValue = item.value;

        onChange && onChange(currentSelectedValue);
        onGroupChange && onGroupChange(item.value);
    },
    render() {

        const { options, height, className, inverse} = this.props;
        const { active, currentSelected, dropup } = this.state;
        const formattedOptions = options.map(this.formatOption);
        const classes = classNames('rsuite-Picker', className, {
            'expand': active,
            'inverse': inverse
        });

        return (
            <div className={classes}  >
                <Container
                    placeholder={currentSelected.label}
                    onClick={this.toggleDropdown}
                    />
                { active && <Dropdown
                    value={currentSelected.value}
                    options={formattedOptions}
                    height={height}
                    onSelect={this.handleSelect}
                    dropup={dropup}
                    />
                }
            </div>
        );
    }
});

export default Picker;
