import React from 'react';

import Picker from '../src';
import userGroups from './data/userGroups';

const MultipleExample = React.createClass({
    render(){
        return (
            <Picker options={userGroups} multiple />
        );
    }
});

export default MultipleExample;
