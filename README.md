# rsuite-picker

A react component for replacing default select and dropdown.


## Documents

http://rsuite.github.io/rsuite-picker/


## Install

```
npm install rsuite-picker --save
```

## Example

```js

import React from 'react';
import Picker from 'rsuite-picker';

const users = [{
    label: 'Eugenia',
    value: 'Eugenia'
},{
    label: 'Kariane',
    value: 'Kariane'
},
    ...
];

export default React.createClass({
    render(){
        return (
            <Picker options={users} />
        );
    }
});

```

