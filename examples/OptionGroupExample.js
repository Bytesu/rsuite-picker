import React from 'react';

import Picker from '../src';
import userGroups from './data/userGroups';

export default React.createClass({
    render(){
        return (
            <Picker options={userGroups} />
        );
    }
});
