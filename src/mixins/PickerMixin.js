import React from 'react';
import ReactDOM from 'react-dom';
import { on } from 'dom-lib';

const PickerMixin = {
    getDefaultProps() {
        return {
            height: 320,
            options: []
        };
    },
    handleDocumentClick(e) {
        if (!ReactDOM.findDOMNode(this).contains(e.target)) {
            this.setState({ active: false});
        }
    },
    toggleDropdown() {
        this.setState({ active: !this.state.active });
    },
    autoAdjustDropdownPosition() {
        const { height, dropup } = this.props;
        const { active } = this.state;
        if (dropup) {
            this.setState({ dropup });
            return;
        }
        let el = ReactDOM.findDOMNode(this);
        if (el.getBoundingClientRect().bottom + height > window.innerHeight
            && el.getBoundingClientRect().top - height > 0
        ) {
            this.setState({ dropup: true });
        } else {
            this.setState({ dropup: false });
        }
    },
    componentDidMount() {
        this.autoAdjustDropdownPosition();
        this._eventScroll = on(document, 'scroll', this.autoAdjustDropdownPosition);
        this._eventResize = on(window, 'resize', this.autoAdjustDropdownPosition);
        this._eventClick = on(document, 'click', this.handleDocumentClick);
    },
    componentWillUnmount() {
        this._eventScroll.off();
        this._eventResize.off();
        this._eventClick.off();
    }
};

export default PickerMixin;
