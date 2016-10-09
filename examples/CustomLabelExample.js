import React from 'react';

import Picker from '../src/Picker';
import userGroups from './data/userGroups';

const OptionGroupExample = React.createClass({
    render() {
        const options = userGroups.map((group) => {
            let items = group.items || [];
            return {
                value: group.value,
                label: <div><i className="fa fa-group"></i>  {group.label}</div>,
                items: items.map((item) => {
                    return {
                        value: item.value,
                        label: <div><i className="fa fa-user"></i>  {item.label}</div>
                    };
                })
            };
        });

        return (
            <Picker options={options} />
        );
    }
});

export default OptionGroupExample;
