import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from './menu-item.component';

describe('MenuItem component', () => {
    let wrapper;
    let mockMatch;
    let mockHistory;
    const mockLinkUrl = '/hats';
    const mockSize = 'large';
    const mockImageUrl = 'testImg.com';

    beforeEach(() => {
        mockMatch = { url: '/shop' };
        mockHistory = { push: jest.fn() };

        const mockProps = {
            title: 'Hats', 
            linkUrl: mockLinkUrl, 
            size: mockSize, 
            imageUrl: mockImageUrl, 
            history: mockHistory, 
            match: mockMatch
        };

        wrapper = shallow(<MenuItem {...mockProps} />);
    });

    it('should render MenuItem component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should call history.push with the right string when MenuItemContainer is clicked', () => {
        wrapper.find('MenuItemContainer').simulate('click');
        expect(mockHistory.push).toHaveBeenCalledWith(`${mockMatch.url}${mockLinkUrl}`);
    });

    it('should pass size to MenuItemContainer as the prop size', () => {
        expect(wrapper.find('MenuItemContainer').prop('size')).toBe(mockSize);
    });

    it('should pass imageUrl to BackgroundImageContainer as the prop imageUrl', () => {
        expect(wrapper.find('BackgroundImageContainer').prop('imageUrl')).toBe(mockImageUrl);
    });
});