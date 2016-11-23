import React, { PropTypes } from 'react';
import Picker from './Picker';
import CheckListPicker from './CheckListPicker';
import FormGroupMixin from './mixins/FormGroupMixin';

export default React.createClass({
    mixins: [FormGroupMixin],
    propTypes: {
        multiple: PropTypes.bool,
        onChange: PropTypes.func,
        height: PropTypes.number
    },
     getDefaultProps() {
        return {
            height: 320
        };
    },
    handleChange(value){
        const { onChange } = this.props;
        const { onChange: onFormGroupChange } = this.getFormGroup();

        onFormGroupChange && onFormGroupChange(value);
        onChange && onChange(value);
    },
    render() {

        const { multiple, ...props } = this.props;
        const { value } = this.getFormGroup();
        let customProps = {
            ...props,
            onChange: this.handleChange
        };


        if(multiple){
            return <CheckListPicker {...customProps} />;
        }

        if(value){
            customProps = Object.assign({}, customProps, { value });
        }

        return <Picker {...customProps} />;
    }
});
