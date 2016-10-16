import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import $ from 'teaspoon';
import ReactDOM from 'react-dom';
import Option from '../src/Option';


describe('Option', () => {

    it('Should output a div', () => {

        let instance = ReactTestUtils.renderIntoDocument(
            <Option />
        );

        assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
    });



});
