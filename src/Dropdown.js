import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import classNames from 'classnames';
import SearchBar from './SearchBar';
import DropdownMenu from './DropdownMenu';

const Dropdown = React.createClass({
    _displayOptionsNoGroup: [],
    propTypes: {
        value: PropTypes.any,
        options: PropTypes.array,
        height: PropTypes.number,
        onSelect: PropTypes.func,
        dropup: PropTypes.bool,
        multiple: PropTypes.bool
    },

    getDefaultProps() {
        return {
            options: []
        };
    },

    getInitialState() {
        return {
            searchText: ''
        };
    },

    handleSearchTextChange(e) {
        let nextSearchText = e.target.value;
        this.setState({
            searchText: nextSearchText
        });
    },
    shouldDisplay(item) {

        const { searchText } = this.state;
        if (typeof item.label === 'string') {
            return ~item.label.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase());
        }

        if (React.isValidElement(item.label)) {
            return ~ReactDOMServer.renderToStaticMarkup(item.label).toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase());
        }

        return false;
    },
    handleListClick(item) {
        const { onSelect } = this.props;
        onSelect && onSelect(item);
    },
    findNextOption(items) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].items && items[i].items.length) {
                this.findNextOption(items[i].items);
            } else {
                this._displayOptionsNoGroup.push(items[i]);
            }
        }
    },
    handleKeyDown(event) {

        const { onSelect, value, multiple } = this.props;

        if(multiple){
            return ;
        }

        this._displayOptionsNoGroup = [];
        this.findNextOption(this.getDisplayOptions());

        const keyCode = event.keyCode;
        const options = this._displayOptionsNoGroup;

        let activeIndex = -1;
        let activeItem = null;
        let showDorpdown = true;

        for (let i = 0; i < options.length; i++) {
            if (options[i].value === value) {
                activeIndex = i;
            }
        }

        switch (keyCode) {
            //down
            case 40:
                activeItem = options[activeIndex + 1];
                break;
            //up
            case 38:
                activeItem = options[activeIndex - 1];
                break;
            //enter
            case 13:
                activeItem = options[activeIndex];
                showDorpdown = false;
                break;
            default:
                break;
        }

        activeItem && onSelect && onSelect(activeItem, showDorpdown);
    },

    getDisplayOptions() {
        const { options } = this.props;
        return options.map(o => {
            // if is a item group
            if (o.items) {
                return Object.assign({}, o, {
                    items: o.items.filter(this.shouldDisplay)
                });
            }
            // else is a item
            if (this.shouldDisplay(o)) {
                return o;
            }
        }).filter(o => !!o && (!o.items || o.items.length > 0)) || [];
    },


    render() {

        const { value, dropup, height, className, multiple, onClearSelected  } = this.props;
        const classes = classNames('selectDropdown', {
            'checkListDropdown' : multiple,
            dropup
        }, className);

        return (
            <div className={ classes }  onKeyDown={this.handleKeyDown}>
                <SearchBar  onChange={this.handleSearchTextChange} value={this.state.searchText} />
                <DropdownMenu
                    multiple={multiple}
                    selected={value}
                    onClearSelected={onClearSelected}
                    items={this.getDisplayOptions() }
                    onClick={this.handleListClick }
                    height={height }
                    />
            </div>
        );
    }
});

export default Dropdown;
