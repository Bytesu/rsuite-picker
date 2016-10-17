import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import $ from 'teaspoon';
import ReactDOM from 'react-dom';
import OptionGroup from '../src/OptionGroup';
import Option from '../src/Option';


describe('OptionGroup', () => {

    it('Should render correctly', () => {

        $(<OptionGroup id="foo" label='Group' />)
            .shallowRender()
            .single('div#foo.selectGroup .selectGroup-title ');
    });


    it('Should support items', () => {
        $(
            <OptionGroup id="foo" label='Group' items={[{ value: 'foo', label: 'foo' }]} />
        )
            .render()
            .single('div#foo.selectGroup a.selectOption');
    });


    it('Should support children', () => {
        $(
            <OptionGroup id="foo" label='Group' >
                <Option value='test' label='test' />
            </OptionGroup>
        )
            .render()
            .single('div#foo.selectGroup a.selectOption');
    });

});
