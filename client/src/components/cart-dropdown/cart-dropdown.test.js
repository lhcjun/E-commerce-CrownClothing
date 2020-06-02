import React from 'react';
import { shallow } from 'enzyme';
import { CartDropdown } from './cart-dropdown.component';
import CartItem from '../cart-item/cart-item.component';
import { toggleCartHiddenAct } from '../../redux/cart/cart.actions';

describe('CartDropdown component', () => {
    let wrapper;
    let mockHistory;
    let mockDispatch;
    const mockCartItems = [ { id: 1 }, { id: 2 }, { id: 3 } ];

    beforeEach(() => {
        mockHistory = { push: jest.fn() };
        mockDispatch = jest.fn();
        const mockProps = {
            cartItems: mockCartItems,
            history: mockHistory,
            dispatch: mockDispatch
        };
        
        wrapper = shallow(<CartDropdown {...mockProps} />);
    });

    it('should render CartDropdown component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should call history.push when button is clicked', () => {
        wrapper.find('CartDropdownButton').simulate('click');
        expect(mockHistory.push).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith(toggleCartHiddenAct());
    });

    it('should render an equal number of CartItem components as the cartItems prop', () => {
        expect(wrapper.find(CartItem).length).toEqual(mockCartItems.length);
    });

    it('should render EmptyMessageContainer if cartItems prop is empty', () => {
        const newMockProps = {
            cartItems: [],
            history: mockHistory,
            dispatch: mockDispatch
        };
        const newWrapper = shallow(<CartDropdown {...newMockProps} />);
        expect(newWrapper.exists('EmptyMessageContainer')).toBe(true);
    });
});