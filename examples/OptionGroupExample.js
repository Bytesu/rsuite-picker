import React from 'react';

import Picker from '../src/Picker';
import userGroups from './data/userGroups';

const OptionGroupExample = React.createClass({
    render(){
        return (
            <Picker options={userGroups} />
        );
    }
});

export default OptionGroupExample;
