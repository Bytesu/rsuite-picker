import React, { PropTypes } from 'react';
import Picker from './Picker';
import CheckListPicker from './CheckListPicker';

export default React.createClass({
    propTypes: {
        multiple: PropTypes.bool
    },
    render() {
        const { multiple, ...props } = this.props;
        if(multiple){
            return <CheckListPicker {...props} />;
        }
        return <Picker {...props} />;
    }
});
