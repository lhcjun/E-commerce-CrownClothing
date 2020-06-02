import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutItem } from './checkout-item.component';

describe('CheckoutItem component', () => {
    let wrapper;
    let mockAddItem;
    let mockRemoveItem;
    let mockClearItem;

    beforeEach(() => {
        mockAddItem = jest.fn();
        mockRemoveItem = jest.fn();
        mockClearItem = jest.fn();

        const mockProps = {
            cartItem: {
                name: 'hats', 
                imageUrl: 'www.testImg.com', 
                price: 100, 
                quantity: 1
            }, 
            addItem: mockAddItem, 
            removeItem: mockRemoveItem,
            clearItem: mockClearItem
        };

        wrapper = shallow(<CheckoutItem {...mockProps} />);
    });

    it('should render CheckoutItem component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should call addItem when right arrow is clicked', () => {
        wrapper.find('.quantity').childAt(2).simulate('click');
         expect(mockAddItem).toHaveBeenCalled();
    });

    it('should call removeItem when left arrow is clicked', () => {
        wrapper.find('.quantity').childAt(0).simulate('click');
        expect(mockRemoveItem).toHaveBeenCalled();
    });

    it('should call clearItem when X button is clicked', () => {
        wrapper.find('.remove-button').simulate('click');
        expect(mockClearItem).toHaveBeenCalled();
    });
});