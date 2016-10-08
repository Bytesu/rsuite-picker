import React from 'react';

import Picker from '../src/Picker';
import users from './data/users';

const SimpleExample = React.createClass({
    render(){
        return (
            <Picker options={users} />
        );
    }
});

export default SimpleExample;
