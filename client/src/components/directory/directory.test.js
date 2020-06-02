import React from 'react';
import { shallow } from 'enzyme';
import { Directory } from './directory.component';
import MenuItem from '../menu-item/menu-item.component';

describe('Directory component', () => {
    const mockSection = [ { id: 1 }, { id: 2 } ];
    const wrapper = shallow(<Directory section={mockSection} />)

    it('should render Directory component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render an equal number of MenuItem components as the section prop', () => {
        expect(wrapper.find(MenuItem).length).toEqual(mockSection.length);
    }); 
});