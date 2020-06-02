import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { CollectionPreview } from './collection-preview.component';

describe('CollectionPreview component', () => {
    let wrapper;
    const mockRouteName = 'hats';

    beforeEach(() => {
        const mockProps = {
            title: 'hats', 
            items: [], 
            routeName: mockRouteName
        };

        wrapper = shallow(<CollectionPreview {...mockProps} />);
    });

    it('should render CollectionPreview component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should call Link with the right string when TitleContainer clicked', () => {
        wrapper.find('TitleContainer').simulate('click');
        expect(wrapper.find(Link).props().to).toBe(`/shop/${mockRouteName}`);
    });
});