import React from 'react';
import Picker from '../src';
import users from './data/users';

export default React.createClass({
    render() {
        return (
            <Picker options={users} />
        );
    }
});


