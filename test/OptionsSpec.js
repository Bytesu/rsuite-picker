import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import $ from 'teaspoon';
import ReactDOM from 'react-dom';
import Option from '../src/Option';


describe('Option', () => {

    it('Should render correctly', () => {
        $(
            <Option id="foo" />)
            .shallowRender()
            .single('a#foo.selectOption ');
    });

    it('Should support selected', () => {
        $(
            <Option selected />
        )
            .shallowRender()
            .single('a.active');
    });

    it('Should support value', () => {
        $(
            <Option value='foo' />
        )
            .shallowRender()
            .single('a[data-value="foo"]');
    });

    it('Should support custom label', () => {
        $(
            <Option label={
                <div className='lable'>test</div>
            } />
        )
            .shallowRender()
            .single('a div.lable');
    });

    it('Should support onSelect', () => {
        let flag = false;
        $(
            <Option onClick={(value) => {
                flag = value;
            }} />
        ).shallowRender().trigger('click', '123');
        assert.equal(flag, '123');
    });

});
