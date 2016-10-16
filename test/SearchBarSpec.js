import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import $ from 'teaspoon';
import ReactDOM from 'react-dom';
import SearchBar from '../src/SearchBar';


describe('SearchBar', () => {

    it('Should output a input', () => {

        let instance = ReactTestUtils.renderIntoDocument(
            <SearchBar />
        );

        assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
        assert.equal(ReactDOM.findDOMNode(instance).querySelector('input').nodeName, 'INPUT');
    });


    it('renders with searchBar-input class', () => {
        $(<SearchBar />)
            .shallowRender()
            .single('div.searchBar input.searchBar-input');
    });


    it('Should support value', () => {
        let instance = ReactTestUtils.renderIntoDocument(
            <SearchBar value="123" onChange={() => { } } />
        );
        assert.equal(ReactDOM.findDOMNode(instance).querySelector('input').value, '123');
    });


    it('Should support onChange', () => {
        let flag = false;
        $(
            <SearchBar onChange={(value) => {
                flag = value;
            }} />
        ).shallowRender().find('input').trigger('change', '123');

        assert.equal(flag, '123');
    });

});
